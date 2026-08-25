interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
        <span className="size-1.5 rounded-full bg-zinc-400" />
        {eyebrow}
      </div>

      <h1 className="mt-4 text-3xl leading-tight font-medium text-black sm:text-4xl md:text-5xl">
        {title}
      </h1>

      {description && (
        <p className="mt-4 text-base leading-relaxed text-zinc-500">
          {description}
        </p>
      )}
    </div>
  );
}
