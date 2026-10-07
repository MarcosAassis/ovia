import { Logo } from "@/components/Logo";
import { nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Logo compact />
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400" aria-label="Rodapé">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}
