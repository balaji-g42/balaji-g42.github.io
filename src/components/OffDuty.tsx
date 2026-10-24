import { trips } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

export default function OffDuty() {
  if (trips.length === 0) return null;
  return (
    <section id="offduty" className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
      <SectionTitle kicker="Off duty" title="On the road" />
      <Reveal>
        <p className="mb-8 max-w-xl text-muted">Solo rides, hikes and whatever sky was on the way. This is what the day job and the night shift are for.</p>
      </Reveal>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {trips.map((t, i) => (
          <Reveal key={t.file} delay={(i % 3) * 0.08} className="mb-4 break-inside-avoid">
            <figure className="overflow-hidden rounded-xl border border-line">
              <img src={`/trips/${t.file}`} alt={t.alt} loading="lazy" className="w-full transition-transform duration-500 hover:scale-105" />
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
