import { ArrowIcon, BrainIcon, ChartIcon, CloudIcon } from "@/components/icons";
import { solutions, whatsappUrl } from "@/content/site";

const icons = {
  cloud: CloudIcon,
  brain: BrainIcon,
  chart: ChartIcon,
};

export function Solutions() {
  return (
    <section id="solucoes" className="scroll-mt-24">
      <div className="mx-auto grid max-w-6xl gap-4 px-5 pb-4 md:grid-cols-3">
        {solutions.map((item) => {
          const Icon = icons[item.icon];
          const chat = whatsappUrl(`Olá, vim pelo site da OVIA Tech e quero falar sobre ${item.title}.`);
          return (
            <article
              key={item.title}
              className="group relative rounded-3xl border border-cyan-300/15 bg-[#071433]/80 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:border-cyan-300/40"
            >
              <div className="mb-5 flex items-center gap-3 text-cyan-300">
                <Icon />
                <h2 className="font-display text-lg font-semibold text-white">{item.title}</h2>
              </div>
              <p className="pr-10 text-sm leading-relaxed text-slate-300">{item.description}</p>
              <a
                href={chat ?? `/?interesse=${item.interest}#contato`}
                {...(chat ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={`Falar sobre ${item.title}`}
                className="absolute bottom-5 right-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/40 text-cyan-200 transition group-hover:bg-cyan-300 group-hover:text-[#041018]"
              >
                <ArrowIcon className="h-4 w-4" />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
