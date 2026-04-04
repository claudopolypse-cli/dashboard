export default function SectionLabel({
  children,
  center = false,
}: {
  children: string;
  center?: boolean;
}) {
  return (
    <span
      className={`font-mono text-xs tracking-[3px] uppercase text-[var(--accent)] mb-4 flex items-center gap-2.5 ${
        center ? "justify-center" : ""
      }`}
    >
      <span className="text-[var(--amber)] font-bold">{"//"}</span> {children}
    </span>
  );
}
