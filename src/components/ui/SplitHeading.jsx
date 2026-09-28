/**
 * Word-level split heading. Words are wrapped in an overflow-hidden mask so
 * GSAP can slide them upward (see `data-split-word`) without any layout shift.
 */
export default function SplitHeading({
  lines,
  as: Tag = "h2",
  className = "",
  wordClassName = "",
  ...rest
}) {
  const rows = Array.isArray(lines) ? lines : [lines];

  return (
    <Tag className={className} {...rest}>
      {rows.map((line, rowIndex) => {
        const words = String(line).split(" ");
        return (
          <span key={`row-${rowIndex}`} className="block">
            {words.map((word, wordIndex) => (
              <span
                key={`w-${rowIndex}-${wordIndex}`}
                className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
              >
                <span
                  data-split-word
                  className={`inline-block will-change-transform ${wordClassName}`}
                >
                  {word}
                </span>
                {wordIndex < words.length - 1 ? "\u00A0" : null}
              </span>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}
