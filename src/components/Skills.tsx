import { skills, spotlights, type ProfileId } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

export default function Skills({ profile }: { profile: ProfileId }) {
  const spot = spotlights[profile];
  const rank = (g: string) => {
    const i = spot.groups.indexOf(g);
    return i < 0 ? spot.groups.length : i;
  };
  const ordered = [...skills].sort((a, b) => rank(a.group) - rank(b.group));
  const all = ordered.flatMap((g) => g.items);
  return (
    <section id="skills" className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-20">
      <SectionTitle kicker="Cast & crew" title="Skills" />
      <Reveal>
        <div className="mb-8 overflow-hidden rounded-2xl border border-[#e0b04a]/40 bg-gradient-to-br from-panel to-ink p-5 shadow-[0_0_60px_-20px_rgba(224,176,74,0.35)] sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#e0b04a]">{spot.kicker}</p>
          <h3 className="mt-2 font-display text-4xl leading-none tracking-wide sm:text-5xl">{spot.title}</h3>
          <p className="mt-3 max-w-2xl text-muted">{spot.blurb}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {spot.points.map((pt) => {
              const body = (
                <>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">{pt.label}</p>
                  <p className="mt-1.5 text-sm leading-snug text-white/90">{pt.text}</p>
                  {pt.href && <span aria-hidden className="mt-2 inline-block text-xs font-semibold text-[#e0b04a]">View pull request ↗</span>}
                </>
              );
              const cls = "block h-full rounded-xl border border-line bg-ink/60 p-4 transition-colors";
              return pt.href ? (
                <a key={pt.label} href={pt.href} target="_blank" rel="noreferrer" className={`${cls} hover:border-[#e0b04a]/70`}>
                  {body}
                </a>
              ) : (
                <div key={pt.label} className={cls}>
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
      <div className="marquee mb-8 overflow-hidden rounded-full border border-line bg-panel/60 py-2.5" aria-hidden>
        <div className="marquee-track flex w-max gap-6 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.25em] text-muted">
          {[...all, ...all].map((s, i) => (
            <span key={i} className="flex items-center gap-6">
              {s}
              <span className="h-1 w-1 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((g, i) => (
          <Reveal key={g.group} delay={(i % 3) * 0.06} className="h-full">
            <article className="group relative h-full overflow-hidden rounded-xl border border-line bg-panel p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/70 hover:shadow-[0_12px_40px_-12px_rgba(229,34,47,0.45)]">
              <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-sm tracking-[0.3em] text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-lg font-semibold">{g.group}</h3>
                </div>
                <span className="shrink-0 rounded-full border border-line px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted">
                  {g.items.length} tools
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="rounded-full border border-line bg-ink/60 px-3 py-1 text-sm transition-colors hover:border-accent hover:text-white">
                    {s}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
