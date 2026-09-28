import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/utils";

/**
 * Sequential, editorial reveal of the large team portrait cards.
 * Images scale up, copy slides in and a ghost number drifts with parallax.
 */
export function teamReveal(scope) {
  if (prefersReducedMotion()) return null;

  const q = gsap.utils.selector(scope);
  const cards = q("[data-team-card]");
  if (!cards.length) return null;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: q("[data-team-grid]")[0],
      start: "top 78%",
      once: true,
    },
  });

  gsap.set(q("[data-team-card]"), { autoAlpha: 0, y: 90 });
  gsap.set(q("[data-team-media]"), { scale: 1.16, autoAlpha: 0 });
  gsap.set(q("[data-team-number]"), { autoAlpha: 0, x: -30 });
  gsap.set(q("[data-team-body]"), { autoAlpha: 0, y: 34 });
  gsap.set(q("[data-team-social]"), { autoAlpha: 0, y: 18 });

  tl.to(cards, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.16, ease: "power3.out" })
    .to(
      q("[data-team-media]"),
      { scale: 1, autoAlpha: 1, duration: 1.25, stagger: 0.16, ease: "power3.out" },
      "-=0.95",
    )
    .to(q("[data-team-number]"), { autoAlpha: 1, x: 0, duration: 0.8, stagger: 0.14 }, "-=1.05")
    .to(q("[data-team-body]"), { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.14 }, "-=0.9")
    .to(q("[data-team-social]"), { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 }, "-=0.7");

  return tl;
}

/** Background decorations drift slower than the cards for depth. */
export function teamParallax(scope) {
  if (prefersReducedMotion()) return null;

  const q = gsap.utils.selector(scope);

  return gsap.to(q("[data-team-float]"), {
    y: -70,
    ease: "none",
    scrollTrigger: {
      trigger: scope,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.9,
    },
  });
}
