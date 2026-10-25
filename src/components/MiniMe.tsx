export default function MiniMe() {
  return (
    <div className="mini-me relative mx-auto flex w-40 flex-col items-center sm:w-44" aria-label="Animated mini figurine of Balaji">
      <span className="mini-bubble absolute -top-2 left-[58%] whitespace-nowrap rounded-lg border border-[#e0b04a]/50 bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
        Hi, I'm Balaji
      </span>
      <svg viewBox="0 0 120 230" className="mini-body mt-6 h-52 w-auto overflow-visible" aria-hidden>
        <ellipse cx="60" cy="222" rx="34" ry="5" fill="rgba(0,0,0,0.55)" />
        <rect x="42" y="150" width="15" height="62" rx="6" fill="#1c2430" />
        <rect x="63" y="150" width="15" height="62" rx="6" fill="#1c2430" />
        <rect x="38" y="206" width="22" height="9" rx="4" fill="#f4f1ec" />
        <rect x="60" y="206" width="22" height="9" rx="4" fill="#f4f1ec" />
        <path d="M34 100q0-14 14-14h24q14 0 14 14v56H34z" fill="#15151b" stroke="#2a2a33" strokeWidth="1.5" />
        <path d="M54 86l6 10 6-10" fill="none" stroke="#2a2a33" strokeWidth="1.5" />
        <rect x="22" y="96" width="13" height="46" rx="6" fill="#15151b" stroke="#2a2a33" strokeWidth="1.5" />
        <circle cx="28" cy="146" r="6" fill="#d9a07a" />
        <g className="mini-arm" style={{ transformOrigin: "88px 98px" }}>
          <rect x="85" y="92" width="13" height="42" rx="6" fill="#15151b" stroke="#2a2a33" strokeWidth="1.5" transform="rotate(-8 88 98)" />
          <circle cx="94" cy="132" r="6" fill="#d9a07a" />
        </g>
        <rect x="52" y="78" width="16" height="12" rx="4" fill="#d9a07a" />
        <g className="mini-head" style={{ transformOrigin: "60px 78px" }}>
          <ellipse cx="60" cy="50" rx="27" ry="29" fill="#e0ac86" />
          <path d="M33 44q-2-26 27-26t27 26q-6-12-27-12T33 44z" fill="#14100e" />
          <path d="M35 58q2 26 25 26t25-26q-4 10-25 10T35 58z" fill="#2a1d17" />
          <path d="M50 70q10 6 20 0" fill="none" stroke="#e0ac86" strokeWidth="3" strokeLinecap="round" />
          <path d="M52 69q8 5 16 0" fill="none" stroke="#7a3b2e" strokeWidth="1.6" strokeLinecap="round" />
          <g fill="none" stroke="#e0b04a" strokeWidth="2">
            <rect x="40" y="43" width="17" height="13" rx="5" />
            <rect x="63" y="43" width="17" height="13" rx="5" />
            <line x1="57" y1="49" x2="63" y2="49" />
          </g>
          <g className="mini-eyes" style={{ transformOrigin: "60px 50px" }}>
            <circle cx="48.5" cy="50" r="2.6" fill="#111" />
            <circle cx="71.5" cy="50" r="2.6" fill="#111" />
          </g>
        </g>
        <circle cx="60" cy="116" r="7" fill="none" stroke="#e5222f" strokeWidth="2" />
        <circle cx="60" cy="116" r="2.6" fill="#e5222f" />
      </svg>
    </div>
  );
}
