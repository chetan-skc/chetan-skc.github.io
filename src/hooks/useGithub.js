// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { useEffect, useState } from 'react';
import { loadGithub } from '../lib/github';

/** Loads GitHub data once `enabled` turns true (e.g. when the section scrolls near the viewport). */
export function useGithub(user, enabled) {
  const [state, setState] = useState({ status: 'idle' });

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    loadGithub(user, controller.signal)
      .then((data) => setState({ status: 'ready', data }))
      .catch((error) => {
        if (controller.signal.aborted) return;
        setState({ status: 'error', error: error instanceof Error ? error.message : 'Could not reach GitHub.' });
      });
    return () => controller.abort();
  }, [user, enabled]);

  return enabled && state.status === 'idle' ? { status: 'loading' } : state;
}
