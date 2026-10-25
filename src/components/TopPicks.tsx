import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import ProjectOverlay from "./ProjectOverlay";

export default function TopPicks() {
  const rail = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<{ p: Project; id: string } | null>(null);
  const picks = projects.slice(0, 10);
  const scroll = (dir: number) => rail.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
  return (
    <section id="top-picks" className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-20">
      <div className="flex items-end justify-between gap-4">
        <SectionTitle kicker={`Top ${picks.length} · this week in my portfolio`} title="Balaji's Top Picks" />
        <div className="mb-10 hidden gap-2 sm:flex">
          {[-1, 1].map((d) => (
            <button
              key={d}
              onClick={() => scroll(d)}
              aria-label={d < 0 ? "Scroll left" : "Scroll right"}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-panel text-lg transition-colors hover:border-accent hover:bg-accent/20"
            >
              {d < 0 ? "‹" : "›"}
            </button>
          ))}
        </div>
      </div>
      <Reveal>
        <div ref={rail} className="rail -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
          {picks.map((p, i) => (
            <div key={p.title} className="group relative flex h-[240px] shrink-0 snap-start items-end sm:h-[300px]">
              <span
                aria-hidden
                className="top-num -mr-5 select-none font-display leading-[0.78] sm:-mr-8"
                style={{ fontSize: i === 9 ? "clamp(8rem, 22vw, 14rem)" : "clamp(10rem, 26vw, 18rem)", letterSpacing: i === 9 ? "-0.06em" : 0 }}
              >
                {i + 1}
              </span>
              <motion.button
                type="button"
                layoutId={`tp-${p.title}`}
                onClick={() => setOpen({ p, id: `tp-${p.title}` })}
                aria-label={`Number ${i + 1}: ${p.title}, details`}
                className="relative z-10 flex h-[85%] w-[140px] flex-col justify-between overflow-hidden rounded-lg border border-white/10 p-3 text-left shadow-[-12px_0_30px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:-translate-y-2 sm:w-[170px]"
                style={{ background: `linear-gradient(160deg, hsl(${p.hue} 70% 32%), hsl(${p.hue} 60% 9%) 75%)` }}
              >
                <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/70">{p.kind}</span>
                <span>
                  <span className="block font-display text-2xl leading-[0.95] tracking-wide">{p.title}</span>
                  <span className="mt-1 line-clamp-3 block text-[11px] leading-snug text-white/75">{p.pitch}</span>
                </span>
              </motion.button>
            </div>
          ))}
        </div>
      </Reveal>
      <AnimatePresence>{open && <ProjectOverlay p={open.p} layoutId={open.id} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
