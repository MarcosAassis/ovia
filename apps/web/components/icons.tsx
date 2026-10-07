export function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.5 3.5A11 11 0 0 0 2.1 16.7L1 23l6.5-1.1A11 11 0 0 0 20.5 3.5zM12 20.2a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.9.7.7-3.8-.2-.3A9.2 9.2 0 1 1 12 20.2zm5.1-6.9c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.5 7.5 0 0 1-2.2-1.4 8.3 8.3 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.2-.4s0-.3-.1-.4-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.4a10.7 10.7 0 0 0 4 3.6c.6.2 1 .4 1.3.5a3 3 0 0 0 1.4.1c.4-.1 1.6-.6 1.8-1.3s.2-1.1.2-1.2-.2-.2-.5-.3z" />
    </svg>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 10h12M12 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="4.5" width="14" height="12" rx="2" />
      <path d="M3 8.5h14M7 3.5v2.5M13 3.5v2.5" strokeLinecap="round" />
    </svg>
  );
}

export function CloudIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M10 22h12.2a4.8 4.8 0 0 0 .5-9.58A6.4 6.4 0 0 0 11 11.2 4.6 4.6 0 0 0 10 22Z" strokeLinejoin="round" />
      <path d="M12 22.5v2M16 22.5v3M20 22.5v2" strokeLinecap="round" />
    </svg>
  );
}

export function BrainIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M12 8.5a3.2 3.2 0 0 0-3.4 4.2A3.4 3.4 0 0 0 8 19a3.3 3.3 0 0 0 3.2 4.6" strokeLinecap="round" />
      <path d="M20 8.5a3.2 3.2 0 0 1 3.4 4.2A3.4 3.4 0 0 1 24 19a3.3 3.3 0 0 1-3.2 4.6" strokeLinecap="round" />
      <path d="M12 8.5C12 6.6 13.6 5 16 5s4 1.6 4 3.5M11.2 23.6c.8 1.6 2.5 2.9 4.8 2.9s4-1.3 4.8-2.9" strokeLinecap="round" />
      <path d="M16 9v14M12.5 13.5H16M16 17.5h3.5" strokeLinecap="round" />
    </svg>
  );
}

export function ChartIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M6 25h20" strokeLinecap="round" />
      <path d="M9 25V16M15 25V10M21 25V14M27 25V7" strokeLinecap="round" />
    </svg>
  );
}

export function TargetIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="14" cy="14" r="9" />
      <circle cx="14" cy="14" r="4.5" />
      <circle cx="14" cy="14" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GearIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="14" cy="14" r="3" />
      <path
        strokeLinejoin="round"
        d="M14 4.5 15.2 7l2.6-.6.9 2.4 2.4.9-.6 2.6L23.5 14l-3 1.7.6 2.6-2.4.9-.9 2.4-2.6-.6L14 23.5 12.8 21l-2.6.6-.9-2.4-2.4-.9.6-2.6L4.5 14l3-1.7-.6-2.6 2.4-.9.9-2.4 2.6.6L14 4.5Z"
      />
    </svg>
  );
}
