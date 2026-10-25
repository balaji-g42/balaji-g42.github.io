import { useEffect, useRef } from "react";

type Pill = { label: string; tone: "tech" | "metric"; ring: 0 | 1; phase: number };

const pills: Pill[] = [
  { label: "Selenium", tone: "tech", ring: 0, phase: 0.00 },
  { label: "Playwright", tone: "tech", ring: 0, phase: 1.26 },
  { label: "Behave BDD", tone: "tech", ring: 0, phase: 2.51 },
  { label: "Karate DSL", tone: "tech", ring: 0, phase: 3.77 },
  { label: "JMeter", tone: "tech", ring: 0, phase: 5.03 },
  { label: "Healthcare Suites", tone: "metric", ring: 1, phase: 0.60 },
  { label: "Agentic QA Framework", tone: "metric", ring: 1, phase: 1.86 },
  { label: "Page Object Framework", tone: "metric", ring: 1, phase: 3.11 },
  { label: "500+ scenarios", tone: "metric", ring: 1, phase: 4.37 },
  { label: "<10h regression", tone: "metric", ring: 1, phase: 5.63 },
];

const rings = [
  { a: 0.5, b: 0.1, cy: 0.38, speed: 0.22, tilt: -6 },
  { a: 0.4, b: 0.16, cy: 0.58, speed: -0.17, tilt: 5 },
];

export default function Orbit() {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const dot = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const place = (time: number) => {
      pills.forEach((p, i) => {
        const el = refs.current[i];
        if (!el) return;
        const r = rings[p.ring];
        const t = p.phase + time * r.speed;
        const depth = Math.sin(t);
        const scale = 0.82 + 0.18 * depth;
        el.style.left = `${50 + r.a * 100 * Math.cos(t)}%`;
        el.style.top = `${r.cy * 100 + r.b * 100 * depth}%`;
        el.style.transform = `translate(-50%, -50%) scale(${scale})`;
        el.style.opacity = String(0.55 + 0.45 * ((depth + 1) / 2));
        el.style.zIndex = depth > 0 ? "20" : "5";
      });
      if (dot.current) {
        const t = time * 0.5;
        dot.current.style.left = `${50 + 56 * Math.cos(t)}%`;
        dot.current.style.top = `${48 + 7 * Math.sin(t)}%`;
        dot.current.style.zIndex = Math.sin(t) > 0 ? "20" : "5";
      }
    };
    if (still) {
      place(0);
      return;
    }
    const start = performance.now();
    const loop = (now: number) => {
      place((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {rings.map((r, i) => (
        <div
          key={i}
          className="absolute rounded-[50%] border border-dashed border-cyan-300/20"
          style={{
            width: `${r.a * 200}%`,
            height: `${r.b * 200}%`,
            left: `${50 - r.a * 100}%`,
            top: `${(r.cy - r.b) * 100}%`,
            transform: `rotate(${r.tilt}deg)`,
            zIndex: 4,
          }}
        />
      ))}
      <span
        ref={dot}
        className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_3px_rgba(229,34,47,0.8)]"
      />
      {pills.map((p, i) => (
        <span
          key={p.label}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={`absolute items-center gap-1.5 whitespace-nowrap ${p.ring === 1 ? "hidden md:flex" : "flex"} rounded-full border border-white/15 bg-black/55 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/90 shadow-[0_0_18px_rgba(103,232,249,0.12)] backdrop-blur-sm sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[11px]`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              p.tone === "metric" ? "bg-accent shadow-[0_0_8px_2px_rgba(229,34,47,0.7)]" : "bg-cyan-300 shadow-[0_0_8px_2px_rgba(103,232,249,0.6)]"
            }`}
          />
          {p.label}
        </span>
      ))}
    </div>
  );
}
