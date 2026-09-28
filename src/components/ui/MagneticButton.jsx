import { useGsap } from "../../lib/useGsap";
import { gsap } from "../../lib/gsap";
import { isFinePointer, prefersReducedMotion } from "../../lib/utils";

/**
 * Button/anchor that leans toward the cursor. Magnetic behaviour is only
 * enabled for fine pointers and is fully skipped for reduced-motion users.
 */
export default function MagneticButton({
  href,
  children,
  className = "",
  strength = 0.32,
  onClick,
  ariaLabel,
  type = "button",
  ...rest
}) {
  const ref = useGsap((self, scope) => {
    if (!isFinePointer() || prefersReducedMotion()) return undefined;

    const inner = scope.querySelector("[data-magnetic-inner]");
    const xTo = gsap.quickTo(scope, "x", { duration: 0.65, ease: "power3" });
    const yTo = gsap.quickTo(scope, "y", { duration: 0.65, ease: "power3" });
    const ixTo = inner ? gsap.quickTo(inner, "x", { duration: 0.55, ease: "power3" }) : null;
    const iyTo = inner ? gsap.quickTo(inner, "y", { duration: 0.55, ease: "power3" }) : null;

    const onMove = (event) => {
      const rect = scope.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
      if (ixTo) ixTo(dx * strength * 0.4);
      if (iyTo) iyTo(dy * strength * 0.4);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
      if (ixTo) ixTo(0);
      if (iyTo) iyTo(0);
    };

    scope.addEventListener("mousemove", onMove);
    scope.addEventListener("mouseleave", onLeave);

    return () => {
      scope.removeEventListener("mousemove", onMove);
      scope.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const Tag = href ? "a" : "button";

  return (
    <Tag
      ref={ref}
      href={href}
      type={href ? undefined : type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
      {...rest}
    >
      <span data-magnetic-inner className="inline-flex items-center gap-2.5">
        {children}
      </span>
    </Tag>
  );
}
