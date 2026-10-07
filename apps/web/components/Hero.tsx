import { HeroVisual } from "@/components/HeroVisual";
import { ArrowIcon, CalendarIcon, WhatsAppIcon } from "@/components/icons";
import { site, whatsappLink } from "@/content/site";

export function Hero() {
  const schedule = whatsappLink("Olá, vim pelo site da OVIA Tech e quero agendar uma conversa.");

  return (
    <section id="inicio" className="scroll-mt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-8 pt-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:pb-6 lg:pt-14">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-cyan-300 sm:text-xs sm:tracking-[0.28em]">
            TECNOLOGIA • INTELIGÊNCIA • RESULTADOS
          </p>
          <h1 className="font-display mt-4 text-[2.15rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[2.85rem] xl:text-[3.15rem]">
            <span className="block">Transforme dados em</span>
            <span className="block bg-gradient-to-r from-[#6aa7ff] via-[#7d7bff] to-[#c084fc] bg-clip-text text-transparent">
              decisões inteligentes.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">{site.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#solucoes"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2ee9ff] px-5 py-3 text-sm font-semibold text-[#041018] shadow-[0_0_28px_rgba(46,233,255,0.35)] transition hover:bg-[#8ff6ff]"
            >
              Conheça nossas soluções
              <ArrowIcon />
            </a>
            <a
              {...schedule}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/50 hover:bg-white/10"
            >
              {schedule.target ? <WhatsAppIcon /> : <CalendarIcon />}
              Agende uma conversa
            </a>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
