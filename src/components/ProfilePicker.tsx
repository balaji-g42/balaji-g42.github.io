import { motion } from "framer-motion";
import { person, profiles, type ProfileId } from "../data/portfolio";

const ids = Object.keys(profiles) as ProfileId[];

export default function ProfilePicker({ onPick }: { onPick: (p: ProfileId) => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.4em] text-accent">{person.series} · {person.subtitle}</p>
      <h1 className="font-display text-6xl tracking-wide sm:text-8xl">Who&apos;s watching?</h1>
      <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
        {ids.map((id, i) => (
          <motion.button
            key={id}
            onClick={() => onPick(id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-xl border border-line bg-panel p-6 text-left transition-colors hover:border-white"
          >
            <div
              className="mb-5 grid h-28 place-items-center rounded-lg font-display text-6xl"
              style={{ background: `linear-gradient(135deg, hsl(${355 - i * 70} 80% 45%), hsl(${355 - i * 70 + 40} 70% 20%))` }}
            >
              {profiles[id].label[0]}
            </div>
            <div className="text-lg font-semibold">{profiles[id].label}</div>
            <div className="text-sm text-muted">{profiles[id].blurb}</div>
          </motion.button>
        ))}
      </div>
      <p className="mt-14 max-w-md text-xs text-muted">
        A personal portfolio in the style of a streaming series. Not affiliated with, endorsed by or connected to Netflix.
      </p>
    </div>
  );
}
