import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { person } from "../data/portfolio";

const timeline = [
  { at: 300, beat: 1 },
  { at: 2200, beat: 2 },
  { at: 3600, beat: 3 },
  { at: 4300, beat: 4 },
  { at: 5200, beat: 5 },
  { at: 5900, beat: 6 },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Intro({ onDone }: { onDone: () => void }) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [beat, setBeat] = useState(reduced ? 6 : 0);

  useEffect(() => {
    if (reduced) return;
    const timers = timeline.map(({ at, beat }) => window.setTimeout(() => setBeat(beat), at));
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape") onDone();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-black"
      exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
      transition={{ duration: 0.9, ease }}
      role="dialog"
      aria-label="Opening titles"
    >
      <motion.div className="absolute inset-x-0 top-0 z-30 h-[7vh] bg-black" initial={{ y: 0 }} animate={{ y: beat >= 6 ? "-100%" : 0 }} transition={{ duration: 1.2, ease }} />
      <motion.div className="absolute inset-x-0 bottom-0 z-30 h-[7vh] bg-black" initial={{ y: 0 }} animate={{ y: beat >= 6 ? "100%" : 0 }} transition={{ duration: 1.2, ease }} />

      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(60% 50% at 50% 55%, rgba(229,34,47,0.3), transparent 70%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: beat >= 2 ? [0, 0.9, 0.5, 1] : 0 }}
        transition={{ duration: 1.4 }}
      />

      <AnimatePresence>
        {beat === 1 && (
          <motion.div
            key="studio"
            className="absolute inset-0 flex items-center justify-center px-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="text-xs font-semibold uppercase text-white/80 sm:text-sm"
              initial={{ letterSpacing: "0.2em", opacity: 0 }}
              animate={{ letterSpacing: "0.32em", opacity: 1 }}
              transition={{ duration: 1.6, ease }}
            >
              Based on real life events
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-x-0 bottom-0 z-0 mx-auto flex h-[68vh] max-w-[900px] items-end justify-center"
        initial={{ opacity: 0, scale: 1.12, filter: "blur(18px) brightness(0.3)" }}
        animate={beat >= 4 ? { opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" } : {}}
        transition={{ duration: 1.6, ease }}
      >
        <img src={person.photo} alt="" className="h-full w-auto max-w-none object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_55%,transparent_98%)]" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 z-[1] bg-[radial-gradient(70%_60%_at_50%_40%,transparent_30%,rgba(0,0,0,0.85)_100%)]" />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          className="flex flex-col items-center"
          animate={{ y: beat >= 4 ? "-30vh" : 0 }}
          transition={{ duration: 1.3, ease }}
        >
          <h1
            aria-label={person.series}
            className="flex font-display leading-[0.82] tracking-[0.04em] text-[#f4f1ec] drop-shadow-[0_8px_40px_rgba(0,0,0,0.8)]"
            style={{ fontSize: "clamp(4.6rem, 20vw, 15rem)" }}
          >
            {person.series.split("").map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden
                className="inline-block"
                initial={{ opacity: 0, y: 24, scale: 1.25, filter: "blur(14px)" }}
                animate={beat >= 2 ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
                transition={{ delay: i * 0.17, duration: 0.55, ease }}
              >
                {ch}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="mt-2 text-sm font-bold uppercase text-accent [text-shadow:0_2px_20px_rgba(0,0,0,0.9)] sm:text-lg"
            initial={{ opacity: 0, letterSpacing: "1.4em" }}
            animate={beat >= 3 ? { opacity: 1, letterSpacing: "0.7em" } : {}}
            transition={{ duration: 1.1, ease }}
          >
            {person.subtitle}
          </motion.p>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-[9vh] z-20 flex flex-col items-center gap-5 px-4 text-center sm:gap-6">
        <motion.p
          className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f4f1ec]/90 sm:text-sm sm:tracking-[0.4em]"
          initial={{ opacity: 0, y: 14 }}
          animate={beat >= 5 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          {person.headline}
        </motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={beat >= 6 ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7, ease }}>
          <button
            type="button"
            onClick={onDone}
            tabIndex={beat >= 6 ? 0 : -1}
            aria-label="Play"
            className="cursor-play group flex items-center gap-3 rounded-full bg-[#f4f1ec] px-9 py-4 text-base font-bold tracking-wide text-ink shadow-[0_0_60px_rgba(229,34,47,0.45)] transition hover:bg-white"
          >
            <span className="text-lg transition-transform group-hover:scale-125">▶</span> PLAY
          </button>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={onDone}
        className="absolute right-4 top-[calc(7vh+12px)] z-40 rounded-full border border-white/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/60 hover:text-white"
      >
        Skip intro
      </button>
    </motion.div>
  );
}
