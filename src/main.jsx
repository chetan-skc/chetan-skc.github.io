// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/big-shoulders-display';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import './index.css';
import App from './App';

console.info(
  '%c🔥 Hey there, fellow dev!%c\nCurious how this forge works? Press ` for a terminal, Ctrl/⌘ + K for the command palette, or try the Konami code.\n→ https://github.com/chetan-skc',
  'font: 700 15px system-ui; color: #ff7a1a;',
  'font: 13px system-ui;',
);

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
