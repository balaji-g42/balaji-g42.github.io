import { motion, useReducedMotion } from "framer-motion";

const words = ["TO", "BE", "CONTINUED"];
const ease = [0.22, 1, 0.36, 1] as const;

export default function ToBeContinued() {
  const reduced = useReducedMotion();
  let n = 0;
  return (
    <h2 aria-label="To be continued" className="mt-4 flex flex-wrap items-center justify-center gap-x-[0.25em] font-display text-[clamp(3rem,13vw,9rem)] leading-[0.9]">
      <motion.span
        aria-hidden
        className="text-[#e0b04a] drop-shadow-[0_0_24px_rgba(224,176,74,0.55)]"
        initial={reduced ? false : { x: -80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease }}
      >
        ➤
      </motion.span>
      {words.map((w) => (
        <span key={w} aria-hidden className="inline-flex whitespace-nowrap">
          {w.split("").map((ch) => {
            const i = n++;
            return (
              <motion.span
                key={i}
                className="inline-block text-[#f4f1ec]"
                initial={reduced ? false : { opacity: 0, y: "0.4em", filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.5 + i * 0.07, duration: 0.5, ease }}
              >
                {ch}
              </motion.span>
            );
          })}
        </span>
      ))}
      <span aria-hidden className="inline-flex text-[#e0b04a]">
        {[0, 1, 2].map((d) => (
          <motion.span
            key={d}
            animate={reduced ? undefined : { opacity: [0.15, 1, 0.15] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: 1.6 + d * 0.25 }}
          >
            .
          </motion.span>
        ))}
      </span>
    </h2>
  );
}
