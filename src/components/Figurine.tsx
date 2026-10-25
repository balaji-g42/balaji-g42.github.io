import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Figurine() {
  const video = useRef<HTMLVideoElement>(null);
  const [sound, setSound] = useState(false);
  const [hi, setHi] = useState(false);

  const toggleSound = () => {
    const v = video.current;
    if (!v) return;
    const next = !sound;
    v.muted = !next;
    if (next) {
      v.currentTime = 0;
      void v.play();
    }
    setSound(next);
  };

  return (
    <div className="relative flex items-center justify-center">
      <div aria-hidden className="absolute inset-x-8 bottom-0 top-8 rounded-full bg-[radial-gradient(closest-side,rgba(229,34,47,0.35),rgba(224,176,74,0.12)_60%,transparent)] blur-2xl" />
      <div className="relative">
        <div className="relative aspect-[9/16] h-[26rem] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] ring-1 ring-[#e0b04a]/50 sm:h-[30rem]">
          <img src="/mini-me.webp" alt="3D figurine of Balaji" width={800} height={1200} className="absolute inset-0 h-full w-full object-cover" />
          <video
            ref={video}
            src="/mini-wave.mp4"
            poster="/mini-me.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden
            onTimeUpdate={(e) => {
              const t = e.currentTarget.currentTime;
              setHi(t > 0.5 && t < 5);
            }}
            className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          />
          <span aria-hidden className="absolute bottom-[8%] right-[10%] h-[4%] w-[9%] rounded-full bg-[#3a3a3f] blur-[3px]" />
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={sound}
            aria-label={sound ? "Mute greeting" : "Play greeting with sound"}
            className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/65 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur transition hover:bg-black/85"
          >
            <span aria-hidden>{sound ? "🔊" : "🔇"}</span>
            {sound ? "Sound on" : "Tap for sound"}
          </button>
        </div>
        <AnimatePresence>
          {hi && (
            <motion.div
              key="hi"
              aria-hidden
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="absolute -top-3 right-2 z-10 origin-bottom-left rounded-2xl rounded-bl-sm bg-white px-4 py-2 font-display text-3xl leading-none tracking-wide text-ink shadow-[0_8px_30px_rgba(0,0,0,0.5)] sm:-right-6"
            >
              Hi! I'm Balaji 👋
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
