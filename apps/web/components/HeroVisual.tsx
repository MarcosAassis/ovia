export function HeroVisual() {
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[560px] sm:h-[460px]" aria-hidden>
      <div className="absolute inset-x-[12%] top-[8%] h-[78%] rounded-full bg-[radial-gradient(circle,rgba(110,70,255,0.45),rgba(46,233,255,0.05)_45%,transparent_70%)] blur-2xl" />

      <div className="spin-slow absolute left-0 right-0 top-[8%] mx-auto h-64 w-64 rounded-full border border-dashed border-cyan-200/25 sm:h-72 sm:w-72" />
      <div className="absolute left-0 right-0 top-[14%] mx-auto h-48 w-48 rounded-full border border-violet-300/20 sm:h-56 sm:w-56" />

      <svg viewBox="0 0 320 320" className="absolute left-0 right-0 top-[6%] mx-auto w-[70%] drop-shadow-[0_0_24px_rgba(120,90,255,0.55)]">
        <defs>
          <radialGradient id="core" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#efe7ff" />
            <stop offset="35%" stopColor="#8b7cff" />
            <stop offset="100%" stopColor="#1230ff" />
          </radialGradient>
          <linearGradient id="link" x1="40" y1="40" x2="280" y2="280">
            <stop stopColor="#67e8f9" />
            <stop offset="1" stopColor="#c4b5fd" />
          </linearGradient>
        </defs>
        <g stroke="url(#link)" strokeWidth="1" opacity="0.85" fill="none">
          <path d="M160 70 L210 110 L250 160 L210 220 L160 255 L110 220 L70 160 L110 110 Z" />
          <path d="M160 70 L160 160 L250 160" />
          <path d="M110 110 L160 160 L210 220" />
          <path d="M70 160 L160 160 L160 255" />
          <path d="M110 220 L160 160 L210 110" />
          <path d="M128 98 L190 140 L196 196 L128 230 L96 170 Z" />
        </g>
        {[
          [160, 70],
          [210, 110],
          [250, 160],
          [210, 220],
          [160, 255],
          [110, 220],
          [70, 160],
          [110, 110],
          [128, 98],
          [190, 140],
          [196, 196],
          [128, 230],
          [96, 170],
          [160, 160],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={cx === 160 && cy === 160 ? 5 : 3.2} fill="#dbeafe" />
        ))}
        <circle cx="160" cy="158" r="28" fill="url(#core)" opacity="0.95" />
        <circle cx="160" cy="158" r="8" fill="#f8f7ff" />
      </svg>

      <div className="absolute inset-x-0 bottom-[7%] mx-auto h-16 w-40 sm:w-48">
        <div className="absolute inset-x-6 top-0 h-8 rounded-[100%] border border-cyan-300/50 bg-cyan-400/10 shadow-[0_0_30px_rgba(46,233,255,0.45)]" />
        <div className="absolute inset-x-2 top-3 h-8 rounded-[100%] border border-violet-300/30" />
        <div className="absolute inset-x-0 top-6 h-8 rounded-[100%] border border-cyan-200/20" />
      </div>

      <article className="float-slow absolute left-0 top-6 w-[138px] rounded-2xl border border-cyan-300/30 bg-[#07111f]/80 p-3 shadow-[0_10px_40px_rgba(46,233,255,0.12)] backdrop-blur-md">
        <p className="text-[10px] uppercase tracking-[0.16em] text-cyan-100/70">Receita</p>
        <svg viewBox="0 0 120 52" className="mt-2 h-12 w-full">
          <rect x="8" y="22" width="12" height="24" rx="2" fill="#22d3ee" />
          <rect x="30" y="12" width="12" height="34" rx="2" fill="#818cf8" />
          <rect x="52" y="18" width="12" height="28" rx="2" fill="#22d3ee" />
          <rect x="74" y="6" width="12" height="40" rx="2" fill="#c084fc" />
          <rect x="96" y="16" width="12" height="30" rx="2" fill="#67e8f9" />
        </svg>
      </article>

      <article className="float-delayed absolute right-0 top-2 hidden w-[132px] rounded-2xl border border-cyan-300/30 bg-[#07111f]/80 p-3 shadow-[0_10px_40px_rgba(120,80,255,0.18)] backdrop-blur-md sm:block">
        <p className="text-[10px] uppercase tracking-[0.16em] text-cyan-100/70">Pipeline</p>
        <svg viewBox="0 0 80 64" className="mx-auto mt-1 h-14 w-14">
          <circle cx="40" cy="32" r="20" fill="none" stroke="#1e293b" strokeWidth="8" />
          <circle
            cx="40"
            cy="32"
            r="20"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="8"
            strokeDasharray="82 126"
            strokeLinecap="round"
            transform="rotate(-90 40 32)"
          />
          <circle
            cx="40"
            cy="32"
            r="20"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="8"
            strokeDasharray="40 126"
            strokeDashoffset="-82"
            transform="rotate(-90 40 32)"
          />
        </svg>
      </article>

      <article className="float-delayed absolute bottom-16 left-0 w-[150px] rounded-2xl border border-cyan-300/25 bg-[#07111f]/80 p-3 backdrop-blur-md">
        <p className="text-[10px] uppercase tracking-[0.16em] text-cyan-100/70">Tendência</p>
        <svg viewBox="0 0 140 56" className="mt-2 h-12 w-full">
          <path d="M4 42 L28 34 L48 38 L70 22 L92 26 L120 10 L136 16" fill="none" stroke="#67e8f9" strokeWidth="2.4" />
          <circle cx="120" cy="10" r="3" fill="#e0f2fe" />
        </svg>
      </article>

      <article className="float-slow absolute right-0 top-40 hidden w-[146px] rounded-2xl border border-violet-300/30 bg-[#07111f]/80 p-3 backdrop-blur-md sm:block">
        <p className="text-[10px] uppercase tracking-[0.16em] text-cyan-100/70">Operação</p>
        <svg viewBox="0 0 140 56" className="mt-2 h-12 w-full">
          <path d="M4 40 C 24 40, 28 18, 48 22 S 78 46, 98 24 132 12, 136 16 L136 52 L4 52 Z" fill="rgba(124,108,255,0.35)" />
          <path d="M4 40 C 24 40, 28 18, 48 22 S 78 46, 98 24 132 12, 136 16" fill="none" stroke="#c4b5fd" strokeWidth="2" />
        </svg>
      </article>
    </div>
  );
}
