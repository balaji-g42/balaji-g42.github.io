import { useEffect, useRef, useState } from "react";
import ExploreArt from "./ExploreArt";
import { about, achievements, projects, seasons, skills, type ProfileId, profiles } from "../data/portfolio";

const cards: Record<string, { title: string; teaser: string; hue: number; glyph: string; mins: number }> = {
  about: { title: "About", teaser: about.lead, hue: 350, glyph: "01", mins: 1 },
  journey: { title: "Journey", teaser: `${seasons.length} seasons from Omnicuris to HBox.ai`, hue: 28, glyph: "S3", mins: 3 },
  projects: { title: "Originals", teaser: `${projects.length} projects, apps and automation`, hue: 275, glyph: "10", mins: 4 },
  skills: { title: "Skills", teaser: `${skills.length} skill groups`, hue: 205, glyph: "{ }", mins: 2 },
  resume: { title: "The Full Story", teaser: "The resume, readable and downloadable", hue: 165, glyph: "CV", mins: 2 },
  achievements: { title: "Top Moments", teaser: `${achievements.length} certifications and results`, hue: 42, glyph: "★", mins: 2 },
};

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ContinueExploring({ profile }: { profile: ProfileId }) {
  const ids = ["about", ...profiles[profile].order].filter((id) => id in cards);
  const [seen, setSeen] = useState<Record<string, number>>({});
  const rail = useRef<HTMLDivElement>(null);
  const slide = (dir: number) => rail.current?.scrollBy({ left: dir * 420, behavior: reduced() ? "auto" : "smooth" });

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const next: Record<string, number> = {};
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        next[id] = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
      }
      setSeen((prev) => {
        const merged = { ...prev };
        for (const id of ids) merged[id] = Math.max(prev[id] ?? 0, next[id] ?? 0);
        return merged;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [profile]);

  return (
    <section aria-label="Continue exploring" className="relative z-10 mt-6 px-4 pb-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">Continue Exploring</h2>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">Mission progress</p>
        </div>
        <div className="group/rail relative">
        <div ref={rail} className="cw-rail -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 pt-2 sm:-mx-0 sm:gap-4 sm:px-0">
          {ids.map((id, i) => {
            const c = cards[id];
            const pct = Math.round((seen[id] ?? 0) * 100);
            const left = Math.max(1, Math.round(((100 - pct) / 100) * c.mins));
            const meta = pct === 0 ? "Start watching" : pct >= 98 ? "Watch again" : `${left} min left`;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
                }}
                className="cw-card group w-[80vw] max-w-[380px] shrink-0 snap-start sm:w-[calc((100%-3rem)/3.4)] sm:min-w-[300px] sm:max-w-none"
              >
                <div
                  className="relative aspect-video overflow-hidden rounded-lg ring-1 ring-white/10 transition duration-300 group-hover:ring-white/40"
                  style={{ background: `linear-gradient(135deg, hsl(${c.hue} 70% 34%), hsl(${c.hue} 60% 8%) 80%)` }}
                >
                  <span aria-hidden className="absolute -right-1 -top-3 select-none font-display text-7xl leading-none text-white/10">
                    {c.glyph}
                  </span>
                  <ExploreArt id={id} />
                  <span className="absolute left-3 top-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/70">S1:E{i + 1}</span>
                  <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/60 bg-black/50 pl-0.5 text-xs text-white backdrop-blur transition duration-300 group-hover:opacity-0">
                    ▶
                  </span>
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-16 w-16 scale-75 place-items-center rounded-full bg-accent pl-1 text-xl text-white opacity-0 shadow-[0_0_40px_rgba(229,34,47,0.6)] transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                      ▶
                    </span>
                  </span>
                  <span className="absolute inset-x-3 bottom-4 font-display text-2xl leading-none tracking-wide">{c.title}</span>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-white/25" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${c.title} progress`}>
                    <div className={`h-full bg-accent ${reduced() ? "" : "transition-[width] duration-500"}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className="mt-2 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{c.title}</p>
                    <p className="text-xs text-muted">{meta}</p>
                  </div>
                  <span aria-hidden className="text-lg leading-none text-muted transition-colors group-hover:text-white">⋮</span>
                </div>
              </a>
            );
          })}
        </div>
          {[-1, 1].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => slide(d)}
              aria-label={d < 0 ? "Scroll left" : "Scroll right"}
              className={`absolute top-[28%] z-20 hidden h-16 w-9 place-items-center bg-black/60 text-2xl text-white opacity-0 backdrop-blur transition group-hover/rail:opacity-100 hover:bg-black/85 sm:grid ${d < 0 ? "left-0 rounded-r-lg" : "right-0 rounded-l-lg"}`}
            >
              {d < 0 ? "‹" : "›"}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
