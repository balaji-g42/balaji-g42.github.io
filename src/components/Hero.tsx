import { motion } from "framer-motion";
import { person, profiles, type ProfileId } from "../data/portfolio";
import Orbit from "./Orbit";
import HeroMeta from "./HeroMeta";

const cards = [
  { tag: "Mission", text: "Regression: days to under 10h", pos: "left-[-10%] top-[10%]", depth: 18 },
  { tag: "Crew", text: "3 healthcare products, 10+ dashboards", pos: "right-[-8%] top-[4%]", depth: 28 },
];

export default function Hero({ profile }: { profile: ProfileId }) {
  const p = profiles[profile];
  return (
    <section
      id="top"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", String((e.clientX - r.left) / r.width - 0.5));
        e.currentTarget.style.setProperty("--my", String((e.clientY - r.top) / r.height - 0.5));
      }}
      className="relative flex min-h-screen items-start overflow-hidden sm:items-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(229,34,47,0.55),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-[5] h-40 bg-gradient-to-t from-ink to-transparent" />
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
        className="absolute inset-x-0 bottom-0 mx-auto aspect-[1086/1448] w-[calc(44vh*0.75)] max-w-[90vw] sm:inset-x-auto sm:right-[5vw] sm:mx-0 sm:w-[calc(88vh*0.75)]"
      >
        <div className="pointer-events-none absolute inset-x-[-4%] top-[8%] bottom-[18%] z-[1] rounded-full border border-accent/40 shadow-[0_0_80px_10px_rgba(229,34,47,0.35),inset_0_0_60px_rgba(229,34,47,0.25)]" />
        <img src={person.photo} alt="Portrait of Balaji G" className="relative z-10 h-full w-full object-contain object-bottom" />
        <Orbit />
        {cards.map((c) => (
          <div
            key={c.tag}
            className={`pointer-events-none absolute z-30 hidden rounded-lg border border-white/15 bg-white/5 px-3 py-2 backdrop-blur-md sm:block ${c.pos}`}
            style={{ transform: `translate(calc(var(--mx, 0) * ${-c.depth}px), calc(var(--my, 0) * ${-c.depth}px))` }}
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-accent">{c.tag}</p>
            <p className="mt-0.5 text-xs font-semibold text-white/90">{c.text}</p>
          </div>
        ))}
      </motion.div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 sm:px-8 sm:pt-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-accent">A personal series</p>
          <h1 className="font-display text-7xl leading-[0.9] tracking-wide sm:text-9xl">
            <span className="name-shimmer">{person.series}</span>
            <span className="block text-4xl text-white/80 sm:text-6xl">{person.subtitle}</span>
          </h1>
          <p className="mt-6 text-lg font-semibold">{person.headline}</p>
          <p className="mt-2 text-muted">{p.tagline}</p>
          <HeroMeta />
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`#${p.ctaTarget}`} className="rounded bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-white/80">
              ▶ {p.cta}
            </a>
            <a href="#about" className="rounded bg-white/20 px-6 py-3 font-semibold backdrop-blur transition-colors hover:bg-white/30">
              ⓘ More info
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
