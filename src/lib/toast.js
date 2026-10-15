// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { EVENTS, emit } from './events';

export function toast(input) {
  emit(EVENTS.toast, typeof input === 'string' ? { title: input } : input);
}
