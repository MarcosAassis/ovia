import { ChartIcon, GearIcon, TargetIcon } from "@/components/icons";
import { pillars } from "@/content/site";

const icons = {
  target: TargetIcon,
  gear: GearIcon,
  chart: ChartIcon,
};

export function Pillars() {
  return (
    <section aria-label="Como a OVIA atua" className="mx-auto max-w-6xl px-5 pb-16 pt-4">
      <div className="grid gap-6 rounded-3xl border border-cyan-300/15 bg-[#071022]/80 px-6 py-5 md:grid-cols-3">
        {pillars.map((item) => {
          const Icon = icons[item.icon];
          return (
            <div key={item.title} className="flex gap-4">
              <span className="mt-0.5 text-cyan-300">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-sm font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
