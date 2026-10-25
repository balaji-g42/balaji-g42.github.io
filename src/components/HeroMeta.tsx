import { useCallback, useEffect, useRef, useState } from "react";
import { person } from "../data/portfolio";

const start = new Date(person.careerStart);
const totalMonths = Math.max(
  0,
  (new Date().getFullYear() - start.getFullYear()) * 12 + new Date().getMonth() - start.getMonth()
);
const span = (months: number) => `${Math.floor(months / 12)}y ${months % 12}m`;
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function HeroMeta() {
  const [t, setT] = useState(0);
  const raf = useRef(0);

  const play = useCallback(() => {
    cancelAnimationFrame(raf.current);
    if (reduced()) {
      setT(1);
      return;
    }
    const begin = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - begin) / 3800);
      setT(1 - Math.pow(1 - p, 3));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    play();
    return () => cancelAnimationFrame(raf.current);
  }, [play]);

  const year = (y: number) => ((y - start.getFullYear()) * 12) / totalMonths;
  const markers = [
    { at: 0, label: "2019 Omnicuris" },
    { at: Math.min(1, year(2025) + 4 / totalMonths), label: "2025 HBox.ai" },
  ];

  return (
    <div onMouseEnter={play} className="mt-5 max-w-xl text-sm">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-semibold">
        <span className="text-emerald-400">100% Match</span>
        <span className="text-white/80">2019 – Present</span>
        <span className="rounded border border-white/40 px-1.5 text-[10px] leading-4 text-white/80">HD</span>
        <span className="text-white/80">{totalMonths >= 12 ? `${Math.floor(totalMonths / 12)}+ years` : span(totalMonths)}</span>
        <span className="text-white/80">{person.country}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span aria-hidden className="text-accent">▶</span>
        <div className="relative h-1 flex-1 rounded-full bg-white/20">
          <div className="absolute inset-y-0 left-0 rounded-full bg-accent" style={{ width: `${t * 100}%` }} />
          <div
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(229,34,47,0.8)]"
            style={{ left: `${t * 100}%` }}
          />
          {markers.map((m) => (
            <span
              key={m.label}
              className={`absolute top-3 hidden ${m.at === 0 ? "" : "-translate-x-1/2"} whitespace-nowrap text-[10px] uppercase tracking-widest transition-colors sm:block ${t >= m.at ? "text-white/80" : "text-white/25"}`}
              style={{ left: `${m.at * 100}%` }}
            >
              {m.label}
            </span>
          ))}
        </div>
        <span className="w-24 text-right font-mono text-xs tabular-nums text-white/80">
          {span(Math.round(totalMonths * t))} / {span(totalMonths)}
        </span>
      </div>
      <p className="mt-7 text-[13px] text-white/70 sm:mt-8">
        <span className="text-white/40">Languages: </span>
        {person.languages.join(", ")}
      </p>
    </div>
  );
}
