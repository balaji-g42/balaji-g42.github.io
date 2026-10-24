import { trips } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const SPANS = [
  "col-span-2 row-span-2",
  "lg:row-span-2",
  "",
  "",
  "lg:row-span-2",
  "lg:col-span-2",
  "lg:row-span-2",
  "",
  "",
];

export default function OffDuty() {
  if (trips.length === 0) return null;
  return (
    <section id="offduty" className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
      <SectionTitle kicker="Off duty" title="On the road" />
      <Reveal>
        <p className="mb-8 max-w-xl text-muted">Solo rides, hikes and whatever sky was on the way. This is what the day job and the night shift are for.</p>
      </Reveal>
      <div className="grid grid-cols-2 auto-rows-[150px] gap-3 sm:auto-rows-[200px] lg:grid-cols-4 lg:gap-4">
        {trips.map((t, i) => (
          <Reveal key={t.file} delay={(i % 4) * 0.08} className={`h-full ${SPANS[i] ?? ""}`}>
            <figure className="h-full overflow-hidden rounded-xl border border-line">
              <img src={`/trips/${t.file}`} alt={t.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
