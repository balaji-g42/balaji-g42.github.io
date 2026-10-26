import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Figurine() {
  const video = useRef<HTMLVideoElement>(null);
  const last = useRef(0);
  const [sound, setSound] = useState(false);
  const greeted = useRef(false);
  const [hi, setHi] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.5 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const speak = () => {
    const v = video.current;
    if (!v) return;
    v.muted = false;
    v.currentTime = 0;
    last.current = 0;
    v.play().then(
      () => setSound(true),
      () => {
        v.muted = true;
        void v.play().catch(() => {});
      },
    );
  };

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (sound) {
      v.muted = true;
      setSound(false);
    } else speak();
  };

  const greet = () => {
    if (greeted.current) return;
    greeted.current = true;
    speak();
  };

  const onTime = (v: HTMLVideoElement) => {
    const t = v.currentTime;
    setHi(t > 0.5 && t < 5);
    if (t < last.current - 1 && !v.muted) {
      v.muted = true;
      setSound(false);
    }
    last.current = t;
  };

  return (
    <div className="relative flex items-center justify-center pt-14">
      <div aria-hidden className="absolute inset-x-8 bottom-0 top-8 rounded-full bg-[radial-gradient(closest-side,rgba(229,34,47,0.35),rgba(224,176,74,0.12)_60%,transparent)] blur-2xl" />
      <div className="relative" onMouseEnter={greet}>
        <div className="relative aspect-[9/16] h-[26rem] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] ring-1 ring-[#e0b04a]/50 sm:h-[30rem]">
          <img src="/mini-me.webp" alt="3D figurine of Balaji" width={800} height={1200} className="absolute inset-0 h-full w-full object-cover" />
          <video
            ref={video}
            src="/mini-wave.mp4"
            poster="/mini-me.webp"
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden
            onTimeUpdate={(e) => onTime(e.currentTarget)}
            onPlaying={() => setPlaying(true)}
            onPause={(e) => {
              setPlaying(false);
              setHi(false);
              e.currentTarget.currentTime = 0;
            }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 motion-reduce:hidden ${playing ? "opacity-100" : "opacity-0"}`}
          />
          <button
            type="button"
            onClick={toggle}
            aria-label={sound ? "Mute greeting" : "Play greeting with sound"}
            aria-pressed={sound}
            className="absolute bottom-[5%] right-[5%] grid h-10 w-10 place-items-center rounded-full bg-black/70 text-base text-white backdrop-blur transition hover:bg-black/90"
          >
            <span aria-hidden>{sound ? "🔊" : "🔇"}</span>
          </button>
        </div>
        <AnimatePresence>
          {hi && (
            <motion.div
              key="hi"
              aria-hidden
              initial={{ opacity: 0, scale: 0.7, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 6 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="absolute bottom-full left-1/2 z-10 mb-4 -translate-x-1/2 whitespace-nowrap rounded-[1.4rem] border border-[#e0b04a] bg-white/15 px-5 py-2.5 text-sm font-semibold tracking-wide text-white shadow-[0_10px_40px_rgba(0,0,0,0.45),0_0_24px_rgba(224,176,74,0.25),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-xl backdrop-saturate-150 sm:text-base"
            >
              Hi! How are you today?
              <span aria-hidden className="absolute left-1/2 top-full -mt-1.5 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-[#e0b04a] bg-white/15 backdrop-blur-xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
