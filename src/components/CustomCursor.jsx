import { useEffect, useRef, useState } from "react";
import { useGsap } from "../lib/useGsap";
import { gsap } from "../lib/gsap";
import { isFinePointer, prefersReducedMotion } from "../lib/utils";

/**
 * Desktop-only custom cursor: a smooth follower that grows over interactive
 * elements and a soft trailing ring. Disabled entirely on touch devices and
 * when the user prefers reduced motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    setEnabled(isFinePointer() && !prefersReducedMotion());
  }, []);

  const ref = useGsap(
    (self, scope) => {
      if (!isFinePointer() || prefersReducedMotion()) return undefined;

      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return undefined;

      const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
      const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
      const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
      const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

      const scaleRing = gsap.quickTo(ring, "scale", { duration: 0.35, ease: "power3" });
      const scaleDot = gsap.quickTo(dot, "scale", { duration: 0.35, ease: "power3" });

      gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

      const onMove = (event) => {
        dotX(event.clientX);
        dotY(event.clientY);
        ringX(event.clientX);
        ringY(event.clientY);
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3, overwrite: "auto" });
      };

      const onOver = (event) => {
        const el = event.target.closest?.("a, button, [data-cursor='hover'], input, textarea");
        if (el) {
          scaleRing(2.4);
          scaleDot(0.35);
        } else {
          scaleRing(1);
          scaleDot(1);
        }
      };

      const onLeave = () => {
        gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3, overwrite: "auto" });
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseover", onOver, { passive: true });
      document.addEventListener("mouseleave", onLeave);

      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseover", onOver);
        document.removeEventListener("mouseleave", onLeave);
      };
    },
    [enabled],
  );

  if (!enabled) return null;

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden lg:block">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-10 w-10 rounded-full border border-white/35"
      />
      <div ref={dotRef} className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white" />
    </div>
  );
}
