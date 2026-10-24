import { skills } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
      <SectionTitle kicker="Cast & crew" title="Skills" />
      <div className="space-y-8">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.05}>
            <h3 className="mb-3 text-lg font-semibold">{g.group}</h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span key={s} className="rounded-full border border-line bg-panel px-4 py-1.5 text-sm transition-colors hover:border-accent">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
