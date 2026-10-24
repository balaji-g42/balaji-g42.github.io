import { useRef, useState, type PointerEvent } from "react";
import { motion } from "framer-motion";
import { seasons, type Season } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const FIRST = 2009;
const LAST = 2026;
const pct = (year: number) => ((LAST - year) / (LAST - FIRST)) * 100;

function Episodes({ s }: { s: Season }) {
  return (
    <ol className="divide-y divide-line rounded-xl border border-line bg-panel">
      {s.episodes.map((e, i) => (
        <li key={e.title} className="flex gap-4 p-4 sm:gap-5 sm:p-5">
          <span className="font-display text-3xl text-muted sm:text-4xl">{i + 1}</span>
          <div>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h4 className="text-lg font-semibold">{e.title}</h4>
              <span className="text-xs text-muted">{e.period}</span>
            </div>
            <p className="mt-1 text-muted">{e.text}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {e.tags.map((t) => (
                <span key={t} className="rounded bg-white/10 px-2 py-0.5 text-xs">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function Journey() {
  const [open, setOpen] = useState(0);
  const rail = useRef<HTMLDivElement>(null);
  const s = seasons[open];

  const scrub = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" && e.buttons === 0) return;
    const box = rail.current?.getBoundingClientRect();
    if (!box) return;
    const year = LAST - ((e.clientX - box.left) / box.width) * (LAST - FIRST);
    let best = 0;
    seasons.forEach((x, i) => {
      if (Math.abs(x.year - year) < Math.abs(seasons[best].year - year)) best = i;
    });
    setOpen(best);
  };

  return (
    <section id="journey" className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
      <SectionTitle kicker="Episodes" title="Journey" />

      <ol className="relative ml-3 space-y-10 border-l border-line sm:hidden">
        {seasons.map((x) => (
          <li key={x.name} className="relative pl-6">
            <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-accent shadow-[0_0_14px_3px_rgba(229,34,47,0.6)]" />
            <Reveal>
              <div className="font-display text-4xl leading-none">{x.year}</div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">{x.name}</div>
              <h3 className="mt-3 text-xl font-semibold">{x.role}</h3>
              <p className="mb-4 text-sm text-muted">
                {x.place} · {x.period}
              </p>
              <Episodes s={x} />
            </Reveal>
          </li>
        ))}
      </ol>

      <div className="hidden sm:block">
        <div
          ref={rail}
          onPointerMove={scrub}
          onPointerDown={scrub}
          className="relative mb-12 h-24 cursor-ew-resize select-none touch-pan-y"
        >
          <div className="absolute inset-x-0 top-10 h-px bg-line" />
          <motion.div
            className="absolute top-10 h-px bg-accent"
            style={{ left: 0 }}
            animate={{ width: `${pct(s.year)}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
          <motion.div
            className="absolute top-[34px] h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_24px_6px_rgba(229,34,47,0.7)]"
            animate={{ left: `${pct(s.year)}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
          {seasons.map((x, i) => (
            <button
              key={x.name}
              aria-pressed={i === open}
              aria-label={`${x.name}, ${x.year}`}
              onClick={() => setOpen(i)}
              className="absolute top-6 -translate-x-1/2 text-center"
              style={{ left: `${pct(x.year)}%` }}
            >
              <span className={`block font-display text-3xl leading-none transition-colors ${i === open ? "text-white" : "text-muted"}`}>{x.year}</span>
              <span className={`mt-5 block whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${i === open ? "text-accent" : "text-muted"}`}>
                {x.name}
              </span>
            </button>
          ))}
        </div>
        <Reveal key={s.name}>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold">{s.role}</h3>
            <p className="text-muted">
              {s.place} · {s.period}
            </p>
          </div>
          <Episodes s={s} />
        </Reveal>
      </div>
    </section>
  );
}
