import { insights } from "@/content/site";

export function Insights() {
  return (
    <section id="insights" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 pb-20">
        <p className="text-xs font-semibold tracking-[0.28em] text-cyan-300">INSIGHTS</p>
        <h2 className="font-display mt-3 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Leitura curta para quem decide tecnologia.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {insights.map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-[#071022]/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{item.tag}</p>
              <h3 className="font-display mt-3 text-lg font-semibold leading-snug text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
