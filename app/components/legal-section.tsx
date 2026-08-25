import type { ReactNode } from "react";

interface LegalSectionProps {
  number: number;
  title: string;
  children: ReactNode;
}

export function LegalSection({ number, title, children }: LegalSectionProps) {
  return (
    <section className="border-t border-zinc-200 py-8 first:border-t-0 first:pt-0">
      <h2 className="flex items-baseline gap-3 text-lg font-medium text-black sm:text-xl">
        <span className="text-sm font-normal text-zinc-400">
          {String(number).padStart(2, "0")}
        </span>
        {title}
      </h2>
      <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-zinc-600">
        {children}
      </div>
    </section>
  );
}
