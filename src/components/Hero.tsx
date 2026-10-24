import { motion } from "framer-motion";
import { person, profiles, type ProfileId } from "../data/portfolio";

export default function Hero({ profile }: { profile: ProfileId }) {
  const p = profiles[profile];
  return (
    <section id="top" className="relative flex min-h-screen items-start overflow-hidden sm:items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(229,34,47,0.55),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-[5] h-40 bg-gradient-to-t from-ink to-transparent" />
      <motion.img
        src={person.photo}
        alt="Portrait of Balaji G"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
        className="absolute bottom-0 right-0 h-[44vh] max-h-[900px] w-auto max-w-[90vw] object-contain object-bottom sm:h-[88vh]"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 sm:px-8 sm:pt-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-accent">A personal series</p>
          <h1 className="font-display text-7xl leading-[0.9] tracking-wide sm:text-9xl">
            {person.series}
            <span className="block text-4xl text-white/80 sm:text-6xl">{person.subtitle}</span>
          </h1>
          <p className="mt-6 text-lg font-semibold">{person.headline}</p>
          <p className="mt-2 text-muted">{p.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
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
