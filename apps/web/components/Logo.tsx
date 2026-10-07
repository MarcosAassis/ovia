import { useId } from "react";

export function Logo({ compact = false }: { compact?: boolean }) {
  const gradientId = `ovia-mark-${useId().replace(/:/g, "")}`;

  return (
    <span className="flex items-center gap-3">
      <svg viewBox="0 0 48 48" className="h-11 w-11 shrink-0" aria-hidden>
        <defs>
          <linearGradient id={gradientId} x1="8" y1="6" x2="42" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5ee7ff" />
            <stop offset="0.55" stopColor="#6d7cff" />
            <stop offset="1" stopColor="#c084fc" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="18" fill="none" stroke={`url(#${gradientId})`} strokeWidth="1.6" />
        <path
          d="M16 30c2.2-8 4.4-14 8-14s5.8 6 8 14"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="24" cy="18" r="2.2" fill="#7dd3fc" />
        <circle cx="17" cy="28" r="1.5" fill="#67e8f9" />
        <circle cx="31" cy="28" r="1.5" fill="#c4b5fd" />
      </svg>
      {compact ? (
        <span className="font-display text-lg font-semibold tracking-wide text-white">OVIA</span>
      ) : (
        <span className="leading-none">
          <span className="block font-display text-[1.35rem] font-semibold tracking-[0.08em] text-white">
            OVIA
          </span>
          <span className="mt-1 block text-[10px] font-semibold tracking-[0.42em] text-cyan-200/80">TECH</span>
        </span>
      )}
    </span>
  );
}
