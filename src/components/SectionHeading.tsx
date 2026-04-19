interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="bg-linear-to-r from-teal-300 to-cyan-200 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/60 md:text-base">
          {subtitle}
        </p>
      )}

      <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-linear-to-r from-teal-300 to-cyan-200" />
    </div>
  );
}
