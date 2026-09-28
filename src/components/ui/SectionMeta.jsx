/** Editorial section marker: `01 — Introduction` with an expanding rule. */
export default function SectionMeta({ num, label, className = "", align = "left" }) {
  return (
    <div
      className={`flex items-center gap-4 ${align === "right" ? "justify-end" : ""} ${className}`}
      data-section-meta
    >
      <span className="eyebrow !text-white/45">{num}</span>
      <span
        aria-hidden="true"
        data-section-rule
        className="h-px w-10 bg-white/25 sm:w-16"
      />
      <span className="eyebrow">{label}</span>
    </div>
  );
}
