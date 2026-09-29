import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/utils";

/** "What's Coming Next?" — a single-rail queue timeline with sliding session cards. */
export function upcomingTimeline(scope) {
  if (prefersReducedMotion()) return null;

  const q = gsap.utils.selector(scope);
  const timeline = q("[data-timeline]")[0];
  if (!timeline) return null;

  const tl = gsap.timeline();

  gsap.set(q("[data-timeline-line]"), { scaleY: 0, transformOrigin: "top center" });
  tl.to(q("[data-timeline-line]"), {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
      trigger: timeline,
      start: "top 72%",
      end: "bottom 85%",
      scrub: 0.55,
    },
  });

  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    q("[data-timeline-item]").forEach((item) => {
      const dot = item.querySelector("[data-timeline-dot]");
      gsap.set(item, { autoAlpha: 0, x: 64, y: 18 });
      if (dot) gsap.set(dot, { scale: 0 });

      gsap.to(item, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 86%", once: true },
      });

      if (dot) {
        gsap.to(dot, {
          scale: 1,
          duration: 0.6,
          ease: "back.out(2)",
          scrollTrigger: { trigger: item, start: "top 86%", once: true },
        });
      }
    });
    return undefined;
  });

  mm.add("(max-width: 767px)", () => {
    q("[data-timeline-item]").forEach((item) => {
      const dot = item.querySelector("[data-timeline-dot]");
      gsap.set(item, { autoAlpha: 0, y: 44 });
      if (dot) gsap.set(dot, { scale: 0 });
      gsap.to(item, {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 90%", once: true },
      });
      if (dot) {
        gsap.to(dot, {
          scale: 1,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: { trigger: item, start: "top 90%", once: true },
        });
      }
    });
    return undefined;
  });

  return () => mm.revert();
}
