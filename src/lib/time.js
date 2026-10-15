// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]

/** First day in production (QBurst, July 2023). Experience is derived from this so the site never goes stale. */
export const CAREER_START = new Date(2023, 6, 1);

/** Whole years of experience, rounded down to the nearest half year (e.g. 3.25 → 3). */
export function yearsSince(start, now = new Date()) {
  const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  return Math.max(0, Math.floor((months / 12) * 2) / 2);
}

const relative = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

const UNITS = [
  ['year', 31_536_000],
  ['month', 2_592_000],
  ['week', 604_800],
  ['day', 86_400],
  ['hour', 3_600],
  ['minute', 60],
];

export function timeAgo(timestamp, now = Date.now()) {
  const seconds = (timestamp - now) / 1000;
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return relative.format(Math.round(seconds / size), unit);
  }
  return 'just now';
}

const integer = new Intl.NumberFormat('en-US');

export function formatNumber(value) {
  return integer.format(Math.round(value));
}
