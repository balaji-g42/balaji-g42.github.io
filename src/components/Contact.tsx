import { useEffect, useState } from "react";
import { person } from "../data/portfolio";
import Reveal from "./Reveal";
import ToBeContinued from "./ToBeContinued";

const links = [
  ["LinkedIn", person.links.linkedin],
  ["GitHub", person.links.github],
  ["Instagram", person.links.instagram],
];

const clock = () => new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit" });

export default function Contact() {
  const [time, setTime] = useState(clock);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime(clock()), 1000);
    return () => clearInterval(id);
  }, []);

  const copy = () => {
    navigator.clipboard?.writeText(person.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-24 text-center sm:px-8">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-[0.16]"
        style={{
          backgroundImage: "url(/stark/reactor.webp)",
          maskImage: "linear-gradient(to bottom, transparent, #000 35%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 35%, transparent)",
        }}
        aria-hidden
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_60%,rgba(229,34,47,0.2),transparent_70%)]" />
      <Reveal>
        <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-accent">Next episode</p>
        <ToBeContinued />
        <p className="mx-auto mt-6 max-w-xl text-lg font-semibold sm:text-2xl">Got something to build, test, deploy or fix? Let&apos;s talk. I also set up self-hosted Docker, Proxmox and Linux server stacks.</p>

        <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-panel/80 px-4 py-2 text-xs backdrop-blur">
          <span className="jp-live h-2 w-2 rounded-full bg-emerald-400" />
          <span className="font-semibold uppercase tracking-[0.2em] text-muted">Open for missions</span>
          <span className="font-mono text-white">T+{time} IST</span>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${person.email}?subject=${encodeURIComponent("Let's build something")}`}
            className="rounded bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-white/80"
          >
            ▶ Let&apos;s build
          </a>
          <button type="button" onClick={copy} className="rounded bg-white/15 px-6 py-3 font-semibold backdrop-blur transition-colors hover:bg-white/25">
            {copied ? "Copied ✓" : person.email}
          </button>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
          {links.map(([label, href]) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer" className="rounded-full border border-line px-4 py-1.5 text-muted transition-colors hover:border-white/40 hover:text-white">
                {label} ↗
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">{person.location}</p>
      </Reveal>
    </section>
  );
}
