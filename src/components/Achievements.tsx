import { achievements } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

export default function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
      <SectionTitle kicker="Awards & certifications" title="Achievements" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <Reveal key={`${a.title}-${a.issuer}`} delay={(i % 3) * 0.05}>
            <article className="h-full rounded-lg border border-line bg-panel p-5 transition-colors hover:border-accent">
              <h3 className="text-lg font-semibold">{a.title}</h3>
              <p className="mt-1 text-sm text-muted">
                {a.issuer}
                {a.year && ` · ${a.year}`}
              </p>
              {a.note && <p className="mt-3 text-sm text-muted">{a.note}</p>}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
