// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { profile } from '../data/profile';

// Web3Forms access keys are designed to be public (they only allow sending to the owner's inbox).
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export const isContactConfigured = Boolean(ACCESS_KEY);

export function mailtoHref(subject, body = '') {
  const query = `subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
  return `mailto:${profile.contact.email}?${query}`;
}

export async function sendContact(message) {
  if (!ACCESS_KEY) {
    window.location.href = mailtoHref(
      `Portfolio enquiry from ${message.name}`,
      `${message.message}\n\n${message.name} · ${message.email}`,
    );
    return { ok: true, via: 'mailto' };
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `Portfolio message from ${message.name}`,
        from_name: 'Chetan Goyal · Portfolio',
        name: message.name,
        email: message.email,
        message: message.message,
      }),
    });
    const data = await response.json();
    return data.success
      ? { ok: true, via: 'web3forms' }
      : { ok: false, error: data.message ?? 'The message could not be sent.' };
  } catch {
    return { ok: false, error: 'Network error. Please try again or email me directly.' };
  }
}
