import { achievements, topMoments } from "../data/portfolio";
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
  const cards = [
    ...topMoments.map((m) => ({ ...m, cert: false })),
    ...achievements.map((c) => ({ laurel: "Certified", title: c.title, org: c.issuer, detail: c.year ?? "Attended", cert: true })),
  ];
  return (
    <section id="achievements" className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-20">
      <SectionTitle kicker="Awards season" title="Top Moments" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((m, i) => (
          <Reveal key={m.title} delay={(i % 3) * 0.08}>
            <article className="group relative flex h-full min-h-[300px] flex-col items-center overflow-hidden rounded-2xl bg-[radial-gradient(120%_80%_at_50%_0%,#2a1f10,#0d0b08_60%,#07070a)] px-5 pb-6 pt-8 text-center ring-1 ring-[#d9b46a]/20 transition duration-500 hover:-translate-y-1 hover:ring-[#d9b46a]/60">
              <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9b46a]/70 to-transparent" />
              <span aria-hidden className="top-num pointer-events-none absolute -bottom-8 -right-2 select-none font-display text-[10rem] leading-none opacity-60">{i + 1}</span>
              <div aria-hidden className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#d9b46a]/10 blur-3xl transition duration-700 group-hover:bg-[#d9b46a]/25" />
              <div className="relative flex items-center gap-1">
                <Laurel />
                <p className="max-w-[7rem] text-[9px] font-bold uppercase leading-tight tracking-[0.24em] text-[#d9b46a]">{m.laurel}</p>
                <Laurel flip />
              </div>
              <h3 className={`relative mt-6 font-display leading-[0.95] tracking-wide ${m.cert ? "text-2xl sm:text-3xl" : "text-4xl"}`}>{m.title}</h3>
              <p className="relative mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d9b46a]">{m.org}</p>
              <p className="relative mt-4 text-[13px] leading-relaxed text-white/70">{m.detail}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
