import { useEffect, useState } from "react";
import { about, achievements, projects, seasons, skills, type ProfileId, profiles } from "../data/portfolio";

const cards: Record<string, { title: string; teaser: string }> = {
  about: { title: "About", teaser: about.lead },
  journey: { title: "Journey", teaser: `${seasons.length} seasons from Omnicuris to HBox.ai` },
  projects: { title: "Originals", teaser: `${projects.length} projects, apps and automation` },
  skills: { title: "Skills", teaser: `${skills.length} skill groups` },
  achievements: { title: "Achievements", teaser: `${achievements.length} certifications` },
};

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ContinueExploring({ profile }: { profile: ProfileId }) {
  const ids = ["about", ...profiles[profile].order].filter((id) => id in cards);
  const [seen, setSeen] = useState<Record<string, number>>({});

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
        <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-flow-col sm:auto-cols-fr sm:overflow-visible sm:px-0">
          {ids.map((id) => {
            const c = cards[id];
            const pct = Math.round((seen[id] ?? 0) * 100);
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
                }}
                className="group w-56 shrink-0 snap-start rounded-lg border border-line bg-panel p-4 transition-colors hover:border-white/40 sm:w-auto"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">{c.title}</p>
                <p className="mt-2 line-clamp-2 min-h-10 text-sm text-white/80">{c.teaser}</p>
                <div className="mt-4 h-0.5 rounded-full bg-white/15" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${c.title} progress`}>
                  <div className={`h-full rounded-full bg-accent ${reduced() ? "" : "transition-[width] duration-500"}`} style={{ width: `${pct}%` }} />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
