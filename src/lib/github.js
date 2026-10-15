// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { readStorage, writeStorage } from './dom';

// Unauthenticated GitHub API calls are limited to 60/hour per IP, so results are cached locally.
const TTL_MS = 60 * 60 * 1000;
const cacheKey = (user) => `forge:github:${user}:v1`;

async function getJson(url, signal) {
  const response = await fetch(url, { signal, headers: { Accept: 'application/vnd.github+json' } });
  if (!response.ok) {
    throw new Error(
      response.status === 403 || response.status === 429
        ? 'GitHub rate limit reached. Please try again in a little while.'
        : `GitHub responded with ${response.status}.`,
    );
  }
  return await response.json();
}

function readCache(user) {
  const raw = readStorage(cacheKey(user));
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function loadGithub(user, signal) {
  const cached = readCache(user);
  if (cached && Date.now() - cached.fetchedAt < TTL_MS) return cached;

  try {
    const [account, repos] = await Promise.all([
      getJson(`https://api.github.com/users/${user}`, signal),
      getJson(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`, signal),
    ]);
    const snapshot = {
      login: account.login,
      publicRepos: account.public_repos,
      createdAt: Date.parse(account.created_at),
      avatarUrl: account.avatar_url,
      profileUrl: account.html_url,
      repos: repos.map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        fork: repo.fork,
        pushedAt: Date.parse(repo.pushed_at),
      })),
      fetchedAt: Date.now(),
    };
    writeStorage(cacheKey(user), JSON.stringify(snapshot));
    return snapshot;
  } catch (error) {
    if (cached && !signal?.aborted) return cached;
    throw error;
  }
}

export const LANGUAGE_COLORS = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  'C#': '#178600',
  'C++': '#f34b7d',
  C: '#8a8a8a',
  Python: '#3572a5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  EJS: '#a91e50',
  'Jupyter Notebook': '#da5b0b',
  Shell: '#89e051',
};
