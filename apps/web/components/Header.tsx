"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { ArrowIcon, WhatsAppIcon } from "@/components/icons";
import { nav, whatsappLink } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");
  const chat = whatsappLink();

  useEffect(() => {
    const elements = nav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.15, 0.4] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#040918]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#inicio" aria-label="OVIA Tech, início" onClick={() => setActive("#inicio")}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActive(item.href)}
              className={`text-sm transition ${
                active === item.href ? "text-cyan-300" : "text-slate-300 hover:text-white"
              }`}
            >
              <span className={active === item.href ? "border-b border-cyan-300 pb-1" : ""}>{item.label}</span>
            </a>
          ))}
        </nav>

        <a
          {...chat}
          className="hidden items-center gap-2 rounded-full border border-cyan-300/70 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/10 lg:inline-flex"
        >
          Fale com um especialista
          {chat.target ? <WhatsAppIcon /> : <ArrowIcon />}
        </a>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Abrir menu</span>
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            {open ? <path d="M5 5l10 10M15 5 5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {open ? (
        <div id="menu-mobile" className="border-t border-white/5 px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-1 text-slate-200"
                onClick={() => {
                  setActive(item.href);
                  setOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              {...chat}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/70 px-4 py-2 text-sm text-cyan-100"
              onClick={() => setOpen(false)}
            >
              Fale com um especialista
              {chat.target ? <WhatsAppIcon /> : <ArrowIcon />}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
