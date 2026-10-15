// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, Download, Mail, Phone, Send } from 'lucide-react';
import { useRef, useState } from 'react';
import { profile } from '../../data/profile';
import { isContactConfigured, sendContact } from '../../lib/contact';
import { copyText } from '../../lib/dom';
import { emitSparks } from '../../lib/sparks';
import { toast } from '../../lib/toast';
import { button, cx, displayTitle, field, fieldError, fieldInput, fieldLabel, honeypot, iconBtn, section, sectionTint } from '../ui/classes';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

const EMPTY = { name: '', email: '', message: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please tell me your name.';
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'That email address does not look right.';
  if (values.message.trim().length < 10) errors.message = 'A few more words, please (at least 10 characters).';
  return errors;
}

function ContactItem({ icon, label, children, action }) {
  return (
    <li className="grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-[0.9rem] rounded-2xl border border-line bg-surface px-4 py-[0.9rem] transition-[border-color,translate] duration-[250ms] ease-out-expo hover:translate-x-1 hover:border-ember/50">
      <span
        className="grid size-11 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--ember)_14%,var(--surface-2))] text-ember-text"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div>
        <p className="font-mono text-[0.7rem] leading-none font-semibold tracking-[0.12em] text-ink-3 uppercase">{label}</p>
        {children}
      </div>
      {action ?? null}
    </li>
  );
}

const VALUE_LINK = 'mt-[0.3rem] inline-block font-semibold no-underline wrap-anywhere hover:text-ember-text';

export function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState('idle');
  const [sentVia, setSentVia] = useState('web3forms');
  const [serverError, setServerError] = useState('');
  const [copied, setCopied] = useState(false);
  const formRef = useRef(null);
  const submitRef = useRef(null);
  const { email, phone, phoneHref, linkedin, linkedinLabel, github, githubUser } = profile.contact;

  const update = (name) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    if (website) {
      setStatus('sent');
      return;
    }

    setStatus('sending');
    const result = await sendContact({
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    });
    if (!result.ok) {
      setServerError(result.error);
      setStatus('error');
      return;
    }

    setSentVia(result.via);
    if (result.via === 'web3forms') {
      const rect = submitRef.current?.getBoundingClientRect();
      if (rect) emitSparks(rect.left + rect.width / 2, rect.top, 44, 1.25);
      setValues(EMPTY);
      toast({ title: 'Message sent!', description: 'Thanks for reaching out. I will reply by email soon.', tone: 'success', icon: '✉️' });
    }
    setStatus('sent');
  };

  const onCopy = async () => {
    if (await copyText(email)) {
      setCopied(true);
      toast({ title: 'Email copied to clipboard', tone: 'success', icon: '📋' });
      window.setTimeout(() => setCopied(false), 2000);
    } else {
      window.location.href = `mailto:${email}`;
    }
  };

  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: update(name),
    className: fieldInput,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
  });

  const errorText = (name) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className={fieldError}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <section id="contact" className={cx(section, sectionTint)} aria-labelledby="contact-title" tabIndex={-1}>
      <div className="site-container">
        <SectionHeader
          id="contact-title"
          index="06"
          eyebrow="Start a reaction"
          title={
            <>
              Let&apos;s forge <span className="text-molten">something great</span>
            </>
          }
          lead="Have a role, a project or just want to talk .NET and React? Send a message and I will get back to you."
        />

        <div className="grid items-start gap-[clamp(1.5rem,4vw,3rem)] min-[901px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Reveal>
            <ul className="grid gap-3" role="list">
              <ContactItem
                icon={<Mail size={18} />}
                label="Email"
                action={
                  <button type="button" className={iconBtn} onClick={onCopy} aria-label="Copy email address">
                    {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                  </button>
                }
              >
                <a className={VALUE_LINK} href={`mailto:${email}`}>
                  {email}
                </a>
              </ContactItem>
              <ContactItem icon={<Phone size={18} />} label="Phone">
                <a className={VALUE_LINK} href={phoneHref}>
                  {phone}
                </a>
              </ContactItem>
              <ContactItem icon={<LinkedinIcon size={18} />} label="LinkedIn">
                <a className={VALUE_LINK} href={linkedin} target="_blank" rel="noreferrer">
                  {linkedinLabel}
                </a>
              </ContactItem>
              <ContactItem icon={<GithubIcon size={18} />} label="GitHub">
                <a className={VALUE_LINK} href={github} target="_blank" rel="noreferrer">
                  github.com/{githubUser}
                </a>
              </ContactItem>
            </ul>
            <a className={cx(button('ghost'), 'mt-5')} href={profile.resumeUrl} download>
              <Download size={17} aria-hidden="true" /> Download résumé (PDF)
            </a>
          </Reveal>

          <Reveal
            className="rounded-3xl border border-line-strong bg-surface bg-[radial-gradient(80%_80%_at_100%_0%,rgb(255_110_20/0.08),transparent_60%)] p-[clamp(1.4rem,3vw,2rem)] shadow-(--shadow)"
            delay={0.1}
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  className="grid justify-items-center gap-[0.9rem] px-4 py-8 text-center"
                  role="status"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <motion.div
                    className="grid size-[86px] place-items-center rounded-full bg-(image:--molten) text-on-molten shadow-[0_0_40px_-6px_var(--ember-glow)]"
                    aria-hidden="true"
                    initial={{ scale: 1.8, rotate: -20, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                  >
                    <Check size={38} strokeWidth={3} />
                  </motion.div>
                  <h3 className={cx(displayTitle, 'text-[1.6rem] tracking-[0.04em]')}>
                    {sentVia === 'web3forms' ? 'Message forged & sent!' : 'Almost there!'}
                  </h3>
                  <p className="max-w-[42ch] text-ink-2">
                    {sentVia === 'web3forms'
                      ? 'Thanks for reaching out. I will reply to you by email soon.'
                      : `Your email app should open with the message pre-filled. If nothing happened, write to ${email}.`}
                  </p>
                  <button type="button" className={button('ghost', 'sm')} onClick={() => setStatus('idle')}>
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  className="grid gap-4"
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className={cx(displayTitle, 'text-[1.6rem] tracking-[0.04em]')}>Send a message</h3>
                  <div className="grid gap-4 min-[561px]:grid-cols-2">
                    <div className={field}>
                      <label className={fieldLabel} htmlFor="contact-name">
                        Name
                      </label>
                      <input autoComplete="name" placeholder="Your name" {...fieldProps('name')} />
                      {errorText('name')}
                    </div>
                    <div className={field}>
                      <label className={fieldLabel} htmlFor="contact-email">
                        Email
                      </label>
                      <input type="email" autoComplete="email" placeholder="you@company.com" {...fieldProps('email')} />
                      {errorText('email')}
                    </div>
                  </div>
                  <div className={field}>
                    <label className={fieldLabel} htmlFor="contact-message">
                      Message
                    </label>
                    <textarea rows={5} placeholder="Tell me about the role, project or idea…" {...fieldProps('message')} />
                    {errorText('message')}
                  </div>

                  <label className={honeypot} aria-hidden="true">
                    Website
                    <input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
                  </label>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-[0.6rem]">
                    <button ref={submitRef} type="submit" className={button('molten')} disabled={status === 'sending'}>
                      <Send size={16} aria-hidden="true" />
                      {status === 'sending' ? 'Sending…' : 'Send message'}
                    </button>
                    {isContactConfigured ? null : (
                      <p className="text-[0.82rem] text-ink-3">Opens your email app with the message pre-filled.</p>
                    )}
                  </div>
                  {status === 'error' ? (
                    <p className={fieldError} role="alert">
                      {serverError}{' '}
                      <a className="text-inherit" href={`mailto:${email}`}>
                        Email me directly
                      </a>
                    </p>
                  ) : null}
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
