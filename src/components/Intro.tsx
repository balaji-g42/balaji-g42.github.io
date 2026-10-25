import { useEffect } from "react";
import { motion } from "framer-motion";
import { person } from "../data/portfolio";

export default function Intro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape") onDone();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-black"
      exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-[7vh] bg-black"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ delay: 5.4, duration: 0.8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[7vh] bg-black"
        initial={{ y: 0 }}
        animate={{ y: "100%" }}
        transition={{ delay: 5.4, duration: 0.8, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(229,34,47,0.35),transparent_60%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.35, 0.7, 0.5] }}
        transition={{ delay: 0.3, duration: 3, ease: "easeInOut" }}
      />
      <motion.p
        className="absolute top-1/2 -translate-y-1/2 text-xs font-semibold uppercase text-white/80 sm:text-base"
        initial={{ opacity: 0, letterSpacing: "0.2em" }}
        animate={{ opacity: [0, 1, 1, 0], letterSpacing: "0.45em" }}
        transition={{ delay: 0.4, duration: 2.4, times: [0, 0.3, 0.8, 1], ease: "easeOut" }}
      >
        Based on real life events
      </motion.p>
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ y: 0, scale: 1 }}
        animate={{ y: "-14vh", scale: 0.62 }}
        transition={{ delay: 4.2, duration: 1.1, ease: "easeInOut" }}
      >
        <motion.h1
          className="font-display text-[22vw] leading-none text-accent sm:text-[16vw]"
          initial={{ opacity: 0, scale: 1.3, letterSpacing: "0.5em", filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, letterSpacing: "0.04em", filter: "blur(0px)" }}
          transition={{ delay: 2.6, duration: 1.3, ease: "easeOut" }}
        >
          {person.series}
        </motion.h1>
        <motion.p
          className="font-display text-3xl uppercase text-white/85 sm:text-5xl"
          initial={{ opacity: 0, letterSpacing: "1.4em" }}
          animate={{ opacity: 1, letterSpacing: "0.7em" }}
          transition={{ delay: 3.6, duration: 1.1, ease: "easeOut" }}
        >
          {person.subtitle}
        </motion.p>
      </motion.div>
      <motion.button
        onClick={onDone}
        aria-label="Play"
        className="absolute bottom-[24%] grid h-20 w-20 place-items-center rounded-full border border-white/30 bg-accent/90 text-3xl text-white shadow-[0_0_40px_8px_rgba(229,34,47,0.55)] transition-transform hover:scale-110"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 5.2, duration: 0.6 }}
      >
        <span className="pl-1">▶</span>
      </motion.button>
      <button
        onClick={onDone}
        className="absolute bottom-6 right-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-white"
      >
        Skip intro
      </button>
    </motion.div>
  );
}
