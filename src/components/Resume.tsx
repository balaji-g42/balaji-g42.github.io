import { useState } from "react";
import { achievements, person, projects, seasons, skills, topMoments } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

function H({ children }: { children: string }) {
  return <h4 className="mb-3 mt-7 border-b border-white/10 pb-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-accent first:mt-0">{children}</h4>;
}

function Sheet() {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-[#e0b04a]/40 bg-[linear-gradient(180deg,#121218,#0c0c11)] p-6 shadow-[0_0_60px_-20px_rgba(224,176,74,0.35)] sm:p-10">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e0b04a]/80 to-transparent" />
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <p className="text-[10px] font-bold tracking-[0.34em] text-muted">STARRING</p>
          <h3 className="mt-1 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[0.9] tracking-wide">{person.name}</h3>
          <p className="mt-2 text-xs text-muted">{person.headline} · {person.location}</p>
        </div>
        <div className="text-xs leading-relaxed text-muted sm:text-right">
          <a href={`mailto:${person.email}`} className="block hover:text-white">{person.email}</a>
          <a href={person.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn ↗</a>
          {" · "}
          <a href={person.links.github} target="_blank" rel="noreferrer" className="hover:text-white">GitHub ↗</a>
        </div>
      </header>
      <div className="grid gap-x-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <H>Work Experience</H>
          {seasons.map((s) => (
            <div key={s.name} className="mb-5">
              <div className="flex flex-wrap justify-between gap-x-3">
                <p className="text-sm font-semibold">{s.place} — {s.role}</p>
                <p className="text-xs text-muted">{s.period}</p>
              </div>
              <ul className="mt-2 space-y-1.5">
                {s.episodes.map((e) => (
                  <li key={e.title} className="flex gap-2 text-xs leading-relaxed text-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span><span className="font-semibold text-white/85">{e.title}.</span> {e.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <H>Projects</H>
          {projects.map((p) => (
            <div key={p.title} className="mb-3">
              <div className="flex flex-wrap justify-between gap-x-3">
                <p className="text-sm font-semibold">{p.title}</p>
                {p.year && <p className="text-xs text-muted">{p.year}</p>}
              </div>
              <p className="text-xs text-muted">{p.stack.join(", ")}</p>
            </div>
          ))}
        </div>
        <div>
          <H>Skills</H>
          <div className="space-y-2">
            {skills.map((g) => (
              <p key={g.group} className="text-xs leading-relaxed text-muted">
                <span className="font-semibold text-white/85">{g.group}: </span>
                {g.items.join(", ")}
              </p>
            ))}
          </div>
          <H>Top Moments</H>
          <ul className="space-y-2">
            {topMoments.map((m) => (
              <li key={m.title} className="text-xs leading-relaxed text-muted">
                <span className="font-semibold text-white/85">{m.title} — {m.org}.</span> {m.detail}
              </li>
            ))}
          </ul>
          <H>Certifications</H>
          <ul className="space-y-1.5">
            {achievements.map((a) => (
              <li key={a.title} className="text-xs leading-relaxed text-muted">
                <span className="text-white/85">{a.title}</span> · {a.issuer}{a.year ? ` ${a.year}` : ""}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

const years = Math.floor((Date.now() - new Date(person.careerStart).getTime()) / (365.25 * 864e5));

export default function Resume() {
  const [open, setOpen] = useState(false);
  return (
    <section id="resume" className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-20">
      <SectionTitle kicker="The screenplay" title="The Full Story" />
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
          <div className="relative">
            <div className={`overflow-hidden transition-[max-height] duration-700 md:max-h-none ${open ? "max-h-[6000px]" : "max-h-[560px]"}`}>
              <Sheet />
            </div>
            {!open && (
              <div className="absolute inset-x-0 bottom-0 flex h-48 items-end justify-center rounded-b-2xl bg-gradient-to-t from-ink via-ink/85 to-transparent pb-4 md:hidden">
                <button type="button" onClick={() => setOpen(true)} className="min-h-11 rounded-full border border-line bg-panel px-5 text-sm font-semibold">
                  Read the full story ↓
                </button>
              </div>
            )}
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-display text-4xl leading-tight tracking-wide">Every season, on one page.</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Roles, projects, skills and {achievements.length} certifications. Read it here or take a copy with you.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a href={person.resume} download="Balaji_G_Resume.pdf" className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-6 font-semibold text-black transition-colors hover:bg-white/80">
                <span aria-hidden>⬇</span> Download resume
              </a>
              <a href={person.resume} target="_blank" rel="noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-md border border-line bg-panel px-6 font-semibold transition-colors hover:border-accent">
                Open original PDF ↗
              </a>
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/10 text-center">
              {[
                { v: `${years}+`, k: "Years" },
                { v: projects.length, k: "Originals" },
                { v: achievements.length, k: "Certs" },
              ].map((s) => (
                <div key={s.k} className="bg-panel px-2 py-4">
                  <dd className="font-display text-3xl leading-none">{s.v}</dd>
                  <dt className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">{s.k}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
