import { motion } from "framer-motion";
import { person, profiles, type ProfileId } from "../data/portfolio";
import Avatar from "./Avatar";

const ids = Object.keys(profiles) as ProfileId[];

export default function ProfilePicker({ onPick }: { onPick: (p: ProfileId) => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.4em] text-accent">{person.series} · {person.subtitle}</p>
      <h1 className="font-display text-6xl tracking-wide sm:text-8xl">Who&apos;s watching?</h1>
      <div className="mt-12 flex flex-wrap items-start justify-center gap-6 sm:gap-10">
        {ids.map((id, i) => (
          <motion.button
            key={id}
            onClick={() => onPick(id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="group w-28 text-center sm:w-40"
          >
            <Avatar id={id} className="aspect-square w-full border-2 border-transparent transition-all group-hover:scale-105 group-hover:border-white group-focus-visible:border-white" />
            <div className="mt-3 text-lg text-muted transition-colors group-hover:text-white group-focus-visible:text-white">{profiles[id].label}</div>
            <div className="hidden text-xs text-muted sm:block">{profiles[id].blurb}</div>
          </motion.button>
        ))}
      </div>
      <p className="mt-14 max-w-md text-xs text-muted">
        A personal portfolio in the style of a streaming series. Not affiliated with, endorsed by or connected to Netflix.
      </p>
    </div>
  );
}
