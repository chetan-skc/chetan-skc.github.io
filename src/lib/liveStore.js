// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { readStorage, writeStorage } from './dom';

// m1 is the darker shade (light theme text/borders), m2 the brighter one (dark theme).
export const METALS = [
  { id: 'copper', label: 'Copper', m1: '#9a5a22', m2: '#f0a875' },
  { id: 'gold', label: 'Gold', m1: '#8a6508', m2: '#ffd56b' },
  { id: 'silver', label: 'Silver', m1: '#6b7280', m2: '#e5e7eb' },
  { id: 'steel', label: 'Steel', m1: '#4b5563', m2: '#b6c2d1' },
  { id: 'titanium', label: 'Titanium', m1: '#556489', m2: '#c9d6f0' },
];

export const metalStyle = (id) => {
  const metal = METALS.find((item) => item.id === id) ?? METALS[3];
  return { '--m1': metal.m1, '--m2': metal.m2 };
};

/** Keep in sync with firestore.rules. */
export const LIMITS = { name: 40, message: 180, sparksPerWrite: 25, wallSize: 60 };

const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

export const isLiveConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);

const isMetal = (value) => METALS.some((metal) => metal.id === value);

export function sanitizeEntry(entry) {
  const clean = (text, max) => text.replace(/\s+/g, ' ').trim().slice(0, max);
  return {
    name: clean(entry.name, LIMITS.name),
    message: clean(entry.message, LIMITS.message),
    metal: isMetal(entry.metal) ? entry.metal : 'steel',
  };
}

const clampSparks = (amount) => Math.max(0, Math.min(LIMITS.sparksPerWrite, Math.floor(amount)));

let storePromise = null;

/** Firestore when configured (SDK loaded lazily), otherwise a browser-local demo store. */
export function getLiveStore() {
  storePromise ??= isLiveConfigured
    ? createFirebaseStore().catch((error) => {
        console.warn('[forge] Firebase unavailable, falling back to local storage.', error);
        return createLocalStore();
      })
    : Promise.resolve(createLocalStore());
  return storePromise;
}

async function createFirebaseStore() {
  const [{ initializeApp }, fs] = await Promise.all([import('firebase/app'), import('firebase/firestore')]);
  const db = fs.getFirestore(initializeApp(firebaseConfig));
  const sparksRef = fs.doc(db, 'stats', 'sparks');
  const wall = fs.collection(db, 'guestbook');

  return {
    mode: 'firebase',
    subscribeSparks(onValue, onError) {
      return fs.onSnapshot(sparksRef, (snap) => onValue(Number(snap.data()?.count ?? 0)), onError);
    },
    async addSparks(amount) {
      const n = clampSparks(amount);
      if (n > 0) await fs.setDoc(sparksRef, { count: fs.increment(n) }, { merge: true });
    },
    subscribeWall(onValue, onError) {
      const latest = fs.query(wall, fs.orderBy('createdAt', 'desc'), fs.limit(LIMITS.wallSize));
      return fs.onSnapshot(
        latest,
        (snap) => {
          onValue(
            snap.docs.map((doc) => {
              const data = doc.data({ serverTimestamps: 'estimate' });
              return {
                id: doc.id,
                name: String(data.name ?? ''),
                message: String(data.message ?? ''),
                metal: isMetal(data.metal) ? data.metal : 'steel',
                createdAt: data.createdAt instanceof fs.Timestamp ? data.createdAt.toMillis() : Date.now(),
              };
            }),
          );
        },
        onError,
      );
    },
    async addEntry(entry) {
      await fs.addDoc(wall, { ...sanitizeEntry(entry), createdAt: fs.serverTimestamp() });
    },
  };
}

const LOCAL_KEYS = { sparks: 'forge:sparks', wall: 'forge:wall' };

function createLocalStore() {
  const sparkListeners = new Set();
  const wallListeners = new Set();

  const readSparks = () => Number(readStorage(LOCAL_KEYS.sparks)) || 0;

  const readWall = () => {
    const raw = readStorage(LOCAL_KEYS.wall);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // Corrupted value: fall through and reseed.
      }
    }
    const seeded = [
      {
        id: 'welcome',
        name: 'Chetan',
        message: 'Welcome to the forge! Strike the anvil, leave a note and say hi. 🔥',
        metal: 'gold',
        createdAt: Date.now(),
      },
    ];
    writeStorage(LOCAL_KEYS.wall, JSON.stringify(seeded));
    return seeded;
  };

  window.addEventListener('storage', (event) => {
    if (event.key === LOCAL_KEYS.sparks) {
      const count = readSparks();
      sparkListeners.forEach((fn) => fn(count));
    }
    if (event.key === LOCAL_KEYS.wall) {
      const entries = readWall();
      wallListeners.forEach((fn) => fn(entries));
    }
  });

  return {
    mode: 'local',
    subscribeSparks(onValue) {
      sparkListeners.add(onValue);
      onValue(readSparks());
      return () => sparkListeners.delete(onValue);
    },
    async addSparks(amount) {
      const n = clampSparks(amount);
      if (n === 0) return;
      const next = readSparks() + n;
      writeStorage(LOCAL_KEYS.sparks, String(next));
      sparkListeners.forEach((fn) => fn(next));
    },
    subscribeWall(onValue) {
      wallListeners.add(onValue);
      onValue(readWall());
      return () => wallListeners.delete(onValue);
    },
    async addEntry(entry) {
      const id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const next = [{ ...sanitizeEntry(entry), id, createdAt: Date.now() }, ...readWall()].slice(0, LIMITS.wallSize);
      writeStorage(LOCAL_KEYS.wall, JSON.stringify(next));
      wallListeners.forEach((fn) => fn(next));
    },
  };
}
