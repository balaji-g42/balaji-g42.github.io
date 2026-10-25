import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { about } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const m = value.match(/^(\D*)([\d,]+)(.*)$/);
  const target = m ? Number(m[2].replace(/,/g, "")) : 0;
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!m || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);
  if (!m) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref} aria-label={value}>
      {m[1]}
      {n.toLocaleString("en-US")}
      {m[3]}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-20">
      <SectionTitle kicker="Synopsis" title="About" />
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
        <Reveal>
          <div className="scan-panel relative overflow-hidden rounded-2xl border border-line bg-panel/60 p-5 backdrop-blur sm:p-8">
            <p className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-accent">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Mission briefing
            </p>
            <p className="text-2xl font-semibold leading-snug sm:text-3xl">{about.lead}</p>
            {about.body.map((b) => (
              <p key={b} className="mt-5 leading-relaxed text-muted">
                {b}
              </p>
            ))}
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {about.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-xl border border-line bg-panel p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent sm:p-5">
                <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                <div className="font-display text-4xl text-accent sm:text-5xl">
                  <CountUp value={s.value} />
                </div>
                <div className="mt-1 text-sm text-muted">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
