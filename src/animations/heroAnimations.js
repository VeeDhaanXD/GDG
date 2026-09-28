import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/utils";

/**
 * Cinematic first-load sequence for the hero.
 * Everything is scoped to the hero element via gsap.context.
 */
export function heroIntro(scope) {
  const q = gsap.utils.selector(scope);

  if (prefersReducedMotion()) {
    gsap.set(q("[data-hero-fade]"), { clearProps: "all" });
    return;
  }

  const tl = gsap.timeline({ delay: 0.12, defaults: { ease: "power3.out" } });

  tl.from(q("[data-hero-eyebrow] > *"), { yPercent: 120, autoAlpha: 0, duration: 0.75 })
    .from(
      q("[data-split-word]"),
      { yPercent: 115, duration: 1.05, stagger: 0.055, ease: "power4.out" },
      "-=0.42",
    )
    .from(q("[data-hero-campus]"), { yPercent: 110, autoAlpha: 0, duration: 0.9 }, "-=0.7")
    .from(q("[data-hero-rule]"), { scaleX: 0, transformOrigin: "left center", duration: 1 }, "-=0.75")
    .from(q("[data-hero-tag] > *"), { y: 22, autoAlpha: 0, duration: 0.7, stagger: 0.09 }, "-=0.65")
    .from(q("[data-hero-copy]"), { y: 28, autoAlpha: 0, duration: 0.85 }, "-=0.5")
    .from(q("[data-hero-cta]"), { y: 34, autoAlpha: 0, duration: 0.8 }, "-=0.6")
    .from(
      q("[data-hero-float]"),
      { y: 46, scale: 0.94, autoAlpha: 0, duration: 1, stagger: 0.11 },
      "-=0.85",
    )
    .from(q("[data-hero-scroll]"), { autoAlpha: 0, y: -14, duration: 0.7 }, "-=0.55");

  return () => tl.kill();
}

/** Infinite, subtle floating loops for the hero widgets. */
export function heroFloats(scope) {
  if (prefersReducedMotion()) return;

  const q = gsap.utils.selector(scope);
  const tweens = [];

  q("[data-hero-float]").forEach((el, i) => {
    const dist = 10 + (i % 3) * 5;
    tweens.push(
      gsap.to(el, {
        y: `-=${dist}`,
        duration: 3 + i * 0.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.25,
      }),
    );
  });

  q("[data-hero-particle]").forEach((el, i) => {
    tweens.push(
      gsap.to(el, {
        y: `-=${18 + (i % 5) * 7}`,
        x: `+=${(i % 2 ? 1 : -1) * (8 + (i % 4) * 4)}`,
        autoAlpha: 0.15 + (i % 5) * 0.12,
        duration: 4 + (i % 6),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: (i % 7) * 0.35,
      }),
    );
  });

  const orb = q("[data-hero-orb]");
  if (orb.length) {
    tweens.push(
      gsap.to(orb, { rotation: 360, duration: 60, ease: "none", repeat: -1 }),
      gsap.to(orb, { scale: 1.08, duration: 7, ease: "sine.inOut", yoyo: true, repeat: -1 }),
    );
  }

  return () => tweens.forEach((t) => t.kill());
}

/**
 * Mouse parallax (desktop only) + scroll parallax as the hero leaves.
 * Returns a cleanup function consumed by useGsap.
 */
export function heroParallax(scope) {
  const q = gsap.utils.selector(scope);
  const cleanups = [];

  if (!prefersReducedMotion()) {
    const layers = q("[data-parallax]");
    if (layers.length && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const setters = layers.map((el) => {
        const depth = parseFloat(el.dataset.parallax) || 1;
        return {
          el,
          depth,
          x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" }),
          y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" }),
        };
      });

      const onMove = (event) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (event.clientX - cx) / cx;
        const dy = (event.clientY - cy) / cy;
        setters.forEach((s) => {
          s.x(-dx * s.depth * 26);
          s.y(-dy * s.depth * 22);
        });
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      cleanups.push(() => window.removeEventListener("mousemove", onMove));
    }

    // scroll parallax — different speeds for background layers
    q("[data-scroll-speed]").forEach((el) => {
      const speed = parseFloat(el.dataset.scrollSpeed) || 1;
      gsap.to(el, {
        yPercent: speed * 18,
        ease: "none",
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    });

    gsap.to(q("[data-hero-copy], [data-hero-tag]"), {
      autoAlpha: 0,
      y: -40,
      ease: "none",
      scrollTrigger: { trigger: scope, start: "40% top", end: "bottom top", scrub: 0.5 },
    });
  }

  return () => cleanups.forEach((fn) => fn());
}
