import { steps } from "@/content/site";

export function About() {
  return (
    <section id="sobre" className="scroll-mt-24 border-t border-white/5">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-cyan-300">SOBRE NÓS</p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Tecnologia com um destino claro: a decisão.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-300">
            A OVIA Tech ajuda empresas a organizar a base de TI, automatizar o que consome o time e enxergar a
            operação em dados confiáveis. O trabalho começa pelo problema do negócio e termina em algo que a
            gestão consegue usar.
          </p>
        </div>
        <ol className="grid gap-4">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">0{index + 1}</p>
              <h3 className="font-display mt-2 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
