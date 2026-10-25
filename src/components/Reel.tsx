import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const slides = [
  { big: "7+", small: "years in healthcare tech" },
  { big: "500+", small: "regression scenarios automated" },
  { big: "Days → <10h", small: "regression cycle, cut down" },
  { big: "15,000+", small: "users on the products" },
  { big: "5+", small: "production releases a month" },
  { big: "AI Weather", small: "live on Google Play" },
];

const countdown = ["T-3", "T-2", "T-1", "Liftoff"];
const SLIDE_MS = 3500;
const COUNT_MS = 500;

export default function Reel({ onClose }: { onClose: () => void }) {
  const still = useRef(window.matchMedia("(prefers-reduced-motion: reduce)").matches).current;
  const [count, setCount] = useState(still ? -1 : 0);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [prog, setProg] = useState(0);

  const go = useCallback(
    (to: number) => {
      if (to < 0) return;
      if (to >= slides.length) {
        onClose();
        return;
      }
      setSlide(to);
      setProg(0);
    },
    [onClose]
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (count < 0) return;
    const t = window.setTimeout(() => setCount(count + 1 >= countdown.length ? -1 : count + 1), COUNT_MS);
    return () => window.clearTimeout(t);
  }, [count]);

  useEffect(() => {
    if (count >= 0 || paused || still) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setProg((p) => {
        const next = p + dt / SLIDE_MS;
        if (next >= 1) {
          queueMicrotask(() => go(slide + 1));
          return 1;
        }
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count, paused, still, slide, go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === " ") {
        e.preventDefault();
        setPaused((v) => !v);
      } else if (e.key === "ArrowRight") {
        if (count >= 0) setCount(-1);
        else go(slide + 1);
      } else if (e.key === "ArrowLeft" && count < 0) go(slide - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, slide, go, onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Intro reel"
      className="fixed inset-0 z-[90] grid place-items-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(229,34,47,0.35),transparent_60%)]" />
      <div className="absolute inset-x-4 top-4 flex gap-1.5 sm:inset-x-8 sm:top-6">
        {slides.map((_, i) => (
          <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full bg-accent"
              style={{ width: count >= 0 ? "0%" : i < slide ? "100%" : i === slide ? `${(still ? 1 : prog) * 100}%` : "0%" }}
            />
          </div>
        ))}
      </div>
      <button
        onClick={onClose}
        aria-label="Close reel"
        className="absolute right-4 top-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-lg text-white transition-colors hover:bg-white/25 sm:right-8 sm:top-12"
      >
        ✕
      </button>
      <AnimatePresence mode="wait">
        {count >= 0 ? (
          <motion.div
            key={`c${count}`}
            className="text-center"
            initial={{ opacity: 0, scale: 1.4, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <p className="font-display text-8xl tracking-[0.2em] text-accent sm:text-[10rem]">{countdown[count]}</p>
            <button
              onClick={() => setCount(-1)}
              className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-white"
            >
              Skip
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={`s${slide}`}
            className="px-6 text-center"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
            transition={{ duration: 0.45 }}
          >
            <p className="font-display text-7xl leading-none tracking-wide sm:text-[10rem]">{slides[slide].big}</p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.4em] text-accent sm:text-lg">{slides[slide].small}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-6 flex items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">
        {still ? (
          <button onClick={() => go(slide + 1)} className="transition-colors hover:text-white">
            Next →
          </button>
        ) : (
          count < 0 && (
            <button onClick={() => setPaused((v) => !v)} className="transition-colors hover:text-white">
              {paused ? "▶ Play" : "❚❚ Pause"}
            </button>
          )
        )}
      </div>
    </motion.div>
  );
}
