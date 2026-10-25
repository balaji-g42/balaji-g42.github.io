import { useRef } from "react";
import { achievements, person } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const hues = [350, 205, 28, 190, 275, 150];

export default function Achievements() {
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => rail.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  return (
    <section id="achievements" className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-20">
      <div className="flex items-end justify-between gap-4">
        <SectionTitle kicker="Awards & certifications" title="Achievements" />
        <div className="mb-10 hidden gap-2 sm:flex">
          {[-1, 1].map((d) => (
            <button
              key={d}
              onClick={() => scroll(d)}
              aria-label={d < 0 ? "Scroll left" : "Scroll right"}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-panel text-lg transition-colors hover:border-accent hover:bg-accent/20"
            >
              {d < 0 ? "‹" : "›"}
            </button>
          ))}
        </div>
      </div>
      <Reveal>
        <div ref={rail} className="rail -mx-4 flex scroll-pl-4 snap-x sm:scroll-pl-8 snap-mandatory gap-4 overflow-x-auto px-4 pb-6 pt-3 sm:-mx-8 sm:px-8">
          {achievements.map((a, i) => (
            <article
              key={`${a.title}-${a.issuer}`}
              tabIndex={0}
              className="group relative aspect-[2/3] w-[62vw] max-w-[260px] shrink-0 snap-start overflow-hidden rounded-xl border border-line transition-all duration-300 hover:z-10 hover:-translate-y-2 hover:scale-[1.04] hover:border-accent focus-visible:scale-[1.04] sm:w-[240px]"
              style={{ background: `linear-gradient(160deg, hsl(${hues[i % hues.length]} 70% 22%), #0b0b0f 75%)` }}
            >
              <span className="pointer-events-none absolute -right-4 -top-6 select-none font-display text-[10rem] leading-none text-white/[0.07]">
                {a.issuer.charAt(0)}
              </span>
              <div className="relative flex h-full flex-col justify-between p-4">
                <span className="w-fit rounded bg-black/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur">
                  {a.issuer}
                </span>
                <div>
                  <h3 className="text-base font-semibold leading-snug">{a.title}</h3>
                  <p className="mt-1 text-xs text-white/60">{a.year ?? "Attended"}</p>
                  <a
                    href={person.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 rounded bg-white px-3 py-1.5 text-xs font-semibold text-black transition-all sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-y-0 sm:group-focus-visible:opacity-100 sm:focus-visible:translate-y-0 sm:focus-visible:opacity-100"
                  >
                    ▶ View on LinkedIn
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
