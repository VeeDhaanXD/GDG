import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/utils";

/**
 * "Built Together." — vertical scrolling drives a pinned horizontal gallery.
 * Desktop/tablet landscape only; smaller screens keep a vertical stack.
 */
export function pastEventsHorizontal(scope) {
  if (prefersReducedMotion()) return null;

  const q = gsap.utils.selector(scope);
  const track = q("[data-events-track]")[0];
  if (!track) return null;

  const mm = gsap.matchMedia();

  mm.add(
    {
      desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { desktop } = context.conditions;
      if (!desktop) return undefined;

      const distance = () => Math.max(1, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          anticipatePin: 1,
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      });

      const cards = q("[data-event-card]");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.9, opacity: 0.4, filter: "brightness(0.75)" },
          {
            scale: 1,
            opacity: 1,
            filter: "brightness(1)",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 92%",
              end: "left 42%",
              scrub: true,
            },
          },
        );
      });

      gsap.fromTo(
        q("[data-events-progress]"),
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: 0.4,
          },
        },
      );

      return () => {
        gsap.set(track, { clearProps: "transform" });
      };
    },
  );

  return () => mm.revert();
}

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
