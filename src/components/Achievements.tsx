import { useRef } from "react";
import { achievements, person, topMoments } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const hues = [350, 205, 28, 190, 275, 150];

function Laurel({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 30 64" className={`h-14 w-auto text-[#d9b46a] ${flip ? "-scale-x-100" : ""}`} aria-hidden>
      <path d="M26 62C10 52 4 36 8 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {[10, 18, 26, 34, 42, 50].map((y, i) => (
        <ellipse key={y} cx={8 + i * 1.6} cy={y} rx="5" ry="2.2" fill="currentColor" opacity="0.85" transform={`rotate(-40 ${8 + i * 1.6} ${y})`} />
      ))}
    </svg>
  );
}

export default function Achievements() {
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => rail.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  return (
    <section id="achievements" className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-20">
      <SectionTitle kicker="Awards season" title="Top Moments" />
      <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {topMoments.map((m, i) => (
          <Reveal key={m.title} delay={i * 0.08}>
            <article className="group relative flex h-full min-h-[320px] flex-col items-center overflow-hidden rounded-2xl bg-[radial-gradient(120%_80%_at_50%_0%,#2a1f10,#0d0b08_60%,#07070a)] px-5 pb-6 pt-8 text-center ring-1 ring-[#d9b46a]/20 transition duration-500 hover:-translate-y-1 hover:ring-[#d9b46a]/60">
              <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9b46a]/70 to-transparent" />
              <div aria-hidden className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#d9b46a]/10 blur-3xl transition duration-700 group-hover:bg-[#d9b46a]/25" />
              <div className="relative flex items-center gap-1">
                <Laurel />
                <p className="max-w-[7rem] text-[9px] font-bold uppercase leading-tight tracking-[0.24em] text-[#d9b46a]">{m.laurel}</p>
                <Laurel flip />
              </div>
              <h3 className="relative mt-6 font-display text-4xl leading-[0.92] tracking-wide">{m.title}</h3>
              <p className="relative mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d9b46a]">{m.org}</p>
              <p className="relative mt-4 text-[13px] leading-relaxed text-white/70">{m.detail}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="flex items-end justify-between gap-4">
        <SectionTitle kicker="Certified" title={`${achievements.length} Credentials`} />
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
