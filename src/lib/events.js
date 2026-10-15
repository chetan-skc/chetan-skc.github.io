// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
export const EVENTS = {
  burst: 'forge:burst',
  toast: 'forge:toast',
  overheat: 'forge:overheat',
  palette: 'forge:palette',
  terminal: 'forge:terminal',
  theme: 'forge:theme',
  selectSkill: 'forge:select-skill',
};

export function emit(name, detail) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

export function listen(name, handler) {
  const fn = (event) => handler(event.detail);
  window.addEventListener(name, fn);
  return () => window.removeEventListener(name, fn);
}

export const openPalette = () => emit(EVENTS.palette);
export const openTerminal = () => emit(EVENTS.terminal);
export const triggerOverheat = () => emit(EVENTS.overheat);
