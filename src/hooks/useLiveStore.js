// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { useEffect, useState } from 'react';
import { getLiveStore } from '../lib/liveStore';

/** Resolves the live store (Firestore or local) once `enabled` turns true, so the SDK loads only when needed. */
export function useLiveStore(enabled) {
  const [store, setStore] = useState(null);

  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    getLiveStore().then((resolved) => {
      if (alive) setStore(resolved);
    });
    return () => {
      alive = false;
    };
  }, [enabled]);

  return store;
}
