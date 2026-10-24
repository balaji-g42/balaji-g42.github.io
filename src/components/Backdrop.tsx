const ticks = Array.from({ length: 12 }, (_, i) => i * 30);

export default function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <img src="/stark/hud.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.10]" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#f5b400 1px, transparent 1px), linear-gradient(90deg, #f5b400 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 75% 40%, #000, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 75% 40%, #000, transparent 70%)",
        }}
      />
      <svg viewBox="-200 -200 400 400" className="absolute -right-[18%] top-[8%] h-[90vmin] w-[90vmin] opacity-[0.14]">
        <g fill="none" stroke="#f5b400" strokeWidth="1.2">
          <circle r="190" />
          <circle r="150" strokeDasharray="3 7" />
          <circle r="110" />
          <circle r="70" strokeWidth="3" />
          <circle r="34" stroke="#e5222f" strokeWidth="2" />
        </g>
        <g className="spin-slow" stroke="#e5222f" strokeWidth="6" strokeLinecap="round">
          {ticks.map((a) => (
            <line key={a} x1="0" y1="-128" x2="0" y2="-108" transform={`rotate(${a})`} />
          ))}
        </g>
        <g className="spin-slow-rev" stroke="#f5b400" strokeWidth="2">
          {ticks.map((a) => (
            <line key={a} x1="0" y1="-190" x2="0" y2="-170" transform={`rotate(${a + 15})`} />
          ))}
        </g>
        <circle r="14" fill="#e5222f" opacity="0.6" />
      </svg>
    </div>
  );
}
