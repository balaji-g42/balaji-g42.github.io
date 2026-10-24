import { about } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
      <SectionTitle kicker="Synopsis" title="About" />
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <p className="text-2xl font-semibold sm:text-3xl">{about.lead}</p>
          {about.body.map((b) => (
            <p key={b} className="mt-5 leading-relaxed text-muted">
              {b}
            </p>
          ))}
        </Reveal>
        <div className="grid grid-cols-2 gap-4">
          {about.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="rounded-xl border border-line bg-panel p-5">
                <div className="font-display text-5xl text-accent">{s.value}</div>
                <div className="mt-1 text-sm text-muted">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
