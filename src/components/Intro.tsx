import { useEffect } from "react";
import { motion } from "framer-motion";
import { person } from "../data/portfolio";

export default function Intro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onDone, 2400);
    return () => window.clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 2.4, times: [0, 0.8, 1], ease: "easeInOut" }}
      onClick={onDone}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(229,34,47,0.35),transparent_60%)]" />
      <motion.h1
        className="relative font-display text-7xl text-accent sm:text-9xl"
        initial={{ opacity: 0, letterSpacing: "0.7em", filter: "blur(12px)" }}
        animate={{ opacity: 1, letterSpacing: "0.14em", filter: "blur(0px)" }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        {person.series}
      </motion.h1>
      <motion.p
        className="absolute bottom-[38%] text-xs font-semibold uppercase tracking-[0.5em] text-white/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        {person.subtitle}
      </motion.p>
    </motion.div>
  );
}
