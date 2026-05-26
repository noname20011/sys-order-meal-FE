
export const Header = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center mb-2 relative max-w-2xl mx-auto">
    <h1 className="text-4xl md:text-6xl text-brand-black mb-4 font-extrabold tracking-tight">{title}</h1>
    {subtitle && <p className="text-brand-gray-900/40 font-medium text-sm md:text-base leading-relaxed">{subtitle}</p>}
  </div>
);
