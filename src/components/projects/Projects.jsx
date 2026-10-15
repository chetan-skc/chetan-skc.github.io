// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Heart } from 'lucide-react';
import { Fragment, useRef } from 'react';
import { profile } from '../../data/profile';
import { ALLOYS, projects } from '../../data/projects';
import { useGithub } from '../../hooks/useGithub';
import { LANGUAGE_COLORS } from '../../lib/github';
import { timeAgo } from '../../lib/time';
import { button, chip, chipList, cx, monoLabel, section, sectionTint } from '../ui/classes';
import { GithubIcon } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

const EASE = [0.22, 1, 0.36, 1];

const alloyStyle = (alloy) => ({ '--alloy-a': ALLOYS[alloy].a, '--alloy-b': ALLOYS[alloy].b });

const langColor = (language) => LANGUAGE_COLORS[language] ?? 'var(--text-3)';

function Rivets() {
  return (
    <>
      <span className="rivet top-3 left-3" aria-hidden="true" />
      <span className="rivet top-3 right-3" aria-hidden="true" />
      <span className="rivet bottom-3 left-3" aria-hidden="true" />
      <span className="rivet right-3 bottom-3" aria-hidden="true" />
    </>
  );
}

function SpecimenTag({ project, featured }) {
  const parts = [project.specimen, ALLOYS[project.alloy].label, project.year];
  return (
    <p className="flex flex-wrap items-center gap-x-[0.6rem] gap-y-[0.35rem] font-mono text-[0.72rem] leading-tight font-semibold tracking-[0.1em] text-ink-3 uppercase">
      {parts.map((part, index) => (
        <Fragment key={part}>
          {index > 0 ? <span aria-hidden="true">·</span> : null}
          <span className={index === 0 ? 'text-ember-text' : undefined}>{part}</span>
        </Fragment>
      ))}
      {featured ? (
        <span className="rounded-full bg-(image:--molten) px-2 py-[0.22rem] text-on-molten">Featured</span>
      ) : null}
    </p>
  );
}

function MockFeed() {
  const posts = [
    { likes: 128, lines: [92, 70, 40] },
    { likes: 64, lines: [80, 55] },
    { likes: 256, lines: [88, 74, 60] },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--alloy-b)_40%,var(--border))] bg-base shadow-[0_30px_60px_-30px_rgb(0_0_0/0.7)] transition-transform duration-[600ms] ease-out-expo min-[901px]:[transform:perspective(900px)_rotateY(-8deg)_rotateX(4deg)] min-[901px]:group-hover:[transform:perspective(900px)_rotateY(0deg)_rotateX(0deg)]">
      <div className="flex items-center gap-[0.35rem] border-b border-line bg-surface-2 px-[0.8rem] py-[0.65rem]">
        <i className="size-[9px] rounded-full bg-[#ff5f57]" />
        <i className="size-[9px] rounded-full bg-[#febc2e]" />
        <i className="size-[9px] rounded-full bg-[#28c840]" />
        <span className="ml-[0.6rem] font-mono text-[0.72rem] leading-none font-medium text-ink-3">social.app/feed</span>
      </div>
      <div className="grid gap-[0.7rem] p-[0.9rem]">
        {posts.map((post, index) => (
          <div
            key={post.likes}
            className="grid animate-post grid-cols-[34px_1fr_auto] items-start gap-[0.7rem] rounded-xl border border-line bg-surface p-3"
            style={{ animationDelay: `${index * 0.6}s` }}
          >
            <div className="size-[34px] rounded-full bg-[linear-gradient(135deg,var(--alloy-b),var(--alloy-a))]" />
            <div className="grid gap-[0.4rem] pt-[0.2rem]">
              {post.lines.map((width, lineIndex) => (
                <b
                  key={width}
                  className={cx(
                    'h-[7px] rounded',
                    lineIndex === 0 ? 'bg-[color-mix(in_oklab,var(--alloy-b)_45%,var(--surface-3))]' : 'bg-surface-3',
                  )}
                  style={{ width: `${width}%` }}
                />
              ))}
            </div>
            <div className="inline-flex items-center gap-[0.3rem] font-mono text-[0.72rem] leading-none font-semibold text-ink-2">
              <Heart size={13} className="animate-heart fill-[#f43f5e] text-[#f43f5e]" />
              {post.likes}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturedProject({ project }) {
  return (
    <Reveal>
      <article
        className="group metal-plate grid items-center gap-[clamp(1.5rem,4vw,3rem)] p-[clamp(1.6rem,4vw,2.75rem)] min-[901px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
        style={alloyStyle(project.alloy)}
        aria-labelledby={`project-${project.id}`}
      >
        <Rivets />
        <div>
          <SpecimenTag project={project} featured />
          <h3
            id={`project-${project.id}`}
            className="mt-[0.8rem] font-display text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[0.95] font-black uppercase"
          >
            {project.name}
          </h3>
          <p className="mt-[0.4rem] font-[650] text-ember-text">{project.tagline}</p>
          <p className="mt-[0.9rem] text-ink-2">{project.description}</p>
          {project.highlights ? (
            <ul className="mt-4 mb-5 grid list-disc gap-[0.4rem] pl-[1.15rem] text-ink-2 marker:text-ember">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          ) : null}
          <ul className={chipList} role="list" aria-label="Tech stack">
            {project.tech.map((tech) => (
              <li key={tech} className={chip}>
                {tech}
              </li>
            ))}
          </ul>
          <a className={cx(button('molten'), 'mt-6')} href={project.repo} target="_blank" rel="noreferrer">
            <GithubIcon size={18} /> View the code
          </a>
        </div>
        <div className="max-[900px]:order-first" aria-hidden="true">
          <MockFeed />
        </div>
      </article>
    </Reveal>
  );
}

function ProjectPlate({ project, index }) {
  const reduced = useReducedMotion();
  return (
    <motion.li
      className="group metal-plate flex flex-col px-6 pt-[1.6rem] pb-[1.4rem] transition-[translate,border-color,box-shadow] duration-[350ms] ease-out-expo hover:-translate-y-1.5 hover:border-[color-mix(in_oklab,var(--alloy-b)_70%,var(--border))] hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--alloy-b)_45%,transparent),0_24px_50px_-24px_color-mix(in_oklab,var(--alloy-a)_70%,transparent)] focus-within:-translate-y-1.5"
      style={alloyStyle(project.alloy)}
      initial={{ opacity: 0, y: reduced ? 0 : 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: 0.07 * index, ease: EASE }}
    >
      <Rivets />
      <SpecimenTag project={project} />
      <h3 className="mt-3 font-display text-[1.9rem] leading-none font-extrabold uppercase">{project.name}</h3>
      <p className="mt-[0.3rem] text-[0.92rem] font-semibold text-ember-text">{project.tagline}</p>
      <p className="mt-[0.65rem] grow text-[0.95rem] text-ink-2">{project.description}</p>
      <ul className={cx(chipList, 'mt-4')} role="list" aria-label="Tech stack">
        {project.tech.map((tech) => (
          <li key={tech} className={chip}>
            {tech}
          </li>
        ))}
      </ul>
      {/* Stretched link: the whole plate is clickable. */}
      <a
        className="mt-[1.1rem] inline-flex items-center gap-[0.3rem] text-[0.92rem] font-[650] text-ink no-underline group-hover:text-ember-text after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-ember"
        href={project.repo}
        target="_blank"
        rel="noreferrer"
      >
        View code <ArrowUpRight size={16} aria-hidden="true" />
        <span className="sr-only"> for {project.name} on GitHub</span>
      </a>
    </motion.li>
  );
}

function TelemetryBody({ data }) {
  const original = data.repos.filter((repo) => !repo.fork && repo.name.toLowerCase() !== data.login.toLowerCase());
  const recent = [...original].sort((a, b) => b.pushedAt - a.pushedAt).slice(0, 5);
  const languageCounts = original.reduce((acc, repo) => {
    if (repo.language) acc[repo.language] = (acc[repo.language] ?? 0) + 1;
    return acc;
  }, {});
  const languages = Object.entries(languageCounts).sort((a, b) => b[1] - a[1]);
  const total = languages.reduce((sum, [, count]) => sum + count, 0) || 1;
  const percent = (count) => Math.round((count / total) * 100);
  const statCard = 'flex flex-col-reverse justify-end gap-[0.3rem] rounded-xl border border-line bg-surface-2 p-[0.8rem]';

  return (
    <div className="mt-[1.4rem] grid gap-[clamp(1.5rem,4vw,3rem)] min-[901px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div>
        <dl className="mb-[1.4rem] grid grid-cols-2 gap-[0.6rem] min-[481px]:grid-cols-3">
          {[
            ['Public repos', data.publicRepos],
            ['Original projects', original.length],
            ['On GitHub since', new Date(data.createdAt).getFullYear()],
          ].map(([label, value]) => (
            <div key={label} className={statCard}>
              <dt className="text-[0.78rem] leading-[1.3] text-ink-2">{label}</dt>
              <dd className="font-display text-[1.9rem] leading-none font-extrabold">{value}</dd>
            </div>
          ))}
        </dl>

        <p className={cx(monoLabel, 'mb-[0.7rem]')}>Languages across original repos</p>
        <div
          className="flex h-3 gap-[3px] overflow-hidden rounded-full"
          role="img"
          aria-label={languages.map(([language, count]) => `${language} ${percent(count)}%`).join(', ')}
        >
          {languages.map(([language, count]) => (
            <span
              key={language}
              className="shrink grow-0"
              style={{ flexBasis: `${(count / total) * 100}%`, background: langColor(language) }}
            />
          ))}
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-[0.4rem] text-[0.85rem] text-ink-2" role="list">
          {languages.map(([language, count]) => (
            <li key={language} className="inline-flex items-center gap-[0.4rem]">
              <i className="size-[9px] rounded-full" style={{ background: langColor(language) }} aria-hidden="true" />
              {language} <span className="font-mono text-ink-3">{percent(count)}%</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className={cx(monoLabel, 'mb-[0.7rem]')}>Recently pushed</p>
        <ul className="grid gap-[0.15rem]" role="list">
          {recent.map((repo) => (
            <li key={repo.name} className="border-b border-dashed border-line-strong py-[0.7rem] last:border-b-0">
              <a
                className="inline-flex items-center gap-[0.3rem] font-[650] no-underline hover:text-ember-text"
                href={repo.url}
                target="_blank"
                rel="noreferrer"
              >
                {repo.name}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <p className="mt-[0.15rem] line-clamp-1 text-[0.9rem] text-ink-2">{repo.description ?? 'No description yet.'}</p>
              <p className="mt-[0.35rem] flex flex-wrap gap-x-4 gap-y-[0.3rem] font-mono text-[0.76rem] leading-[1.3] font-medium text-ink-3">
                {repo.language ? (
                  <span className="inline-flex items-center gap-[0.4rem]">
                    <i className="size-[9px] rounded-full" style={{ background: langColor(repo.language) }} aria-hidden="true" />
                    {repo.language}
                  </span>
                ) : null}
                <span>★ {repo.stars}</span>
                <span>Updated {timeAgo(repo.pushedAt)}</span>
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-[0.8rem] font-mono text-[0.72rem] leading-none font-medium text-ink-3">
          Fetched {timeAgo(data.fetchedAt)} · refreshed hourly
        </p>
      </div>
    </div>
  );
}

function GithubTelemetry() {
  const ref = useRef(null);
  const near = useInView(ref, { once: true, margin: '400px 0px' });
  const state = useGithub(profile.contact.githubUser, near);
  const skeleton =
    'h-4 animate-shimmer rounded-lg bg-[linear-gradient(90deg,var(--surface-2),var(--surface-3),var(--surface-2))] bg-size-[200%_100%]';

  return (
    <Reveal>
      <div
        ref={ref}
        className="mt-[clamp(2.5rem,6vw,4rem)] rounded-3xl border border-line-strong bg-surface bg-[radial-gradient(70%_100%_at_0%_0%,rgb(255_110_20/0.07),transparent_60%)] p-[clamp(1.4rem,3vw,2rem)] shadow-(--shadow)"
        role="region"
        aria-labelledby="telemetry-title"
      >
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-[1.1rem]">
          <div>
            <p className="inline-flex items-center gap-[0.45rem] font-mono text-[0.72rem] leading-none font-semibold tracking-[0.12em] text-success uppercase">
              <i className="size-2 animate-pulse-dot rounded-full bg-current" aria-hidden="true" /> Live from GitHub
            </p>
            <h3
              id="telemetry-title"
              className="mt-[0.4rem] font-display text-[clamp(1.7rem,3vw,2.2rem)] leading-none font-extrabold uppercase"
            >
              Fresh from the furnace
            </h3>
          </div>
          <a className={button('ghost', 'sm')} href={profile.contact.github} target="_blank" rel="noreferrer">
            <GithubIcon size={16} /> @{profile.contact.githubUser}
          </a>
        </header>

        {state.status === 'ready' ? <TelemetryBody data={state.data} /> : null}
        {state.status === 'error' ? (
          <p className="mt-[1.2rem] text-ink-2">
            {state.error}{' '}
            <a className="text-ember-text" href={profile.contact.github} target="_blank" rel="noreferrer">
              Open my GitHub profile ↗
            </a>
          </p>
        ) : null}
        {state.status === 'idle' || state.status === 'loading' ? (
          <div className="mt-[1.4rem] grid gap-[0.7rem]" aria-label="Loading GitHub data">
            <span className={skeleton} />
            <span className={cx(skeleton, 'w-4/5')} />
            <span className={cx(skeleton, 'w-3/5')} />
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

export function Projects() {
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const others = projects.filter((project) => project !== featured);

  return (
    <section id="projects" className={cx(section, sectionTint)} aria-labelledby="projects-title" tabIndex={-1}>
      <div className="site-container">
        <SectionHeader
          id="projects-title"
          index="04"
          eyebrow="The workshop"
          title={
            <>
              Things I&apos;ve <span className="text-molten">forged</span>
            </>
          }
          lead="My production work is in the heat-treatment log above. These are specimens from my own workshop, plus a live feed straight from GitHub."
        />

        <FeaturedProject project={featured} />

        <ul className="mt-[1.1rem] grid grid-cols-[repeat(auto-fill,minmax(min(100%,330px),1fr))] gap-[1.1rem]" role="list">
          {others.map((project, index) => (
            <ProjectPlate key={project.id} project={project} index={index} />
          ))}
        </ul>

        <GithubTelemetry />
      </div>
    </section>
  );
}
