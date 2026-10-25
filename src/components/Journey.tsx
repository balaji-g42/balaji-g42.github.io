import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { seasons } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const code = (n: number) => String(n).padStart(2, "0");

export default function Journey() {
  const [open, setOpen] = useState(0);
  const rail = useRef<HTMLDivElement>(null);
  const s = seasons[open];
  const number = seasons.length - open;

  const pick = (i: number) => {
    setOpen(i);
    rail.current?.scrollTo({ left: 0 });
  };

  return (
    <section id="journey" className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
      <SectionTitle kicker="Episodes" title="Journey" />
      <p className="-mt-4 mb-6 max-w-xl text-sm text-muted">Every stage of the career told as a season. Pick one to see its episodes.</p>

      <div role="tablist" aria-label="Seasons" className="rail mb-8 gap-2">
        {seasons.map((x, i) => (
          <button
            key={x.name}
            role="tab"
            type="button"
            aria-selected={i === open}
            onClick={() => pick(i)}
            className={`relative shrink-0 rounded-full px-4 py-2.5 text-left transition-colors ${i === open ? "text-black" : "text-muted hover:text-white"}`}
          >
            {i === open && <motion.span layoutId="jp-season-pill" className="absolute inset-0 rounded-full bg-white" transition={{ duration: 0.4 }} />}
            <span className="relative block text-[10px] font-bold uppercase tracking-[0.24em]">
              {x.name} · {x.year}
            </span>
            <span className="relative block whitespace-nowrap text-sm font-semibold">{x.place.split(" (")[0]}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={s.name}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-display text-4xl tracking-wide sm:text-5xl">
              <span className="jp-outline mr-3 block text-3xl sm:inline sm:text-5xl">{s.name}</span>
              {s.role}
            </h3>
          </div>
          <p className="mt-2 text-sm text-muted">
            {s.place} · {s.period} · {s.episodes.length} {s.episodes.length === 1 ? "episode" : "episodes"}
          </p>

          <div ref={rail} className="rail jp-episodes mt-6 gap-4 py-2">
            {s.episodes.map((e, i) => (
              <motion.article
                key={e.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.45 }}
                whileHover={{ y: -6 }}
                className="jp-episode group relative flex w-[78vw] max-w-[22rem] flex-col rounded-xl border border-line bg-panel p-5 sm:w-80"
              >
                <div className="flex items-center justify-between">
                  <span className="jp-outline font-display text-4xl leading-none transition-colors group-hover:text-accent">E{code(i + 1)}</span>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">{e.period}</span>
                </div>
                <h4 className="mt-4 text-lg font-semibold leading-snug">{e.title}</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{e.text}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {e.tags.map((t) => (
                    <span key={t} className="rounded bg-white/10 px-2 py-0.5 text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 h-0.5 overflow-hidden rounded bg-white/10">
                  <div className="jp-bar h-full bg-accent" style={{ width: `${s.period.includes("present") ? ((i + 1) / (s.episodes.length + 1)) * 100 : 100}%` }} />
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <Reveal>
        <div className="mt-8 flex items-center gap-3 text-xs text-muted">
          <span className="font-semibold uppercase tracking-[0.25em]">Series progress</span>
          <div className="h-0.5 flex-1 overflow-hidden rounded bg-white/10">
            <motion.div className="h-full bg-accent" animate={{ width: `${((seasons.length - open) / seasons.length) * 100}%` }} transition={{ duration: 0.5 }} />
          </div>
          <span>
            {number} / {seasons.length}
          </span>
        </div>
      </Reveal>
    </section>
  );
}
