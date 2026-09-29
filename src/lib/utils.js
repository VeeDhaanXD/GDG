import { gsap } from "./gsap";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const isDesktop = () =>
  typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

/** Smoothly scrolls to an in-page anchor, accounting for the fixed navbar. */
export function scrollToId(id, offset = 76) {
  const target = document.getElementById(id);
  if (!target) return;

  if (prefersReducedMotion()) {
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo(0, Math.max(0, top));
    return;
  }

  gsap.to(window, {
    duration: 1.15,
    ease: "power3.inOut",
    overwrite: true,
    scrollTo: { y: target, offsetY: offset, autoKill: true },
  });
}

/** Client-side navigation for the tiny pathname-based router in App.jsx. */
export function navigateTo(path) {
  if (typeof window === "undefined") return;
  if (window.location.pathname === path) return;
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

/** Small helper so components can read the active section for nav indicators. */
export function observeSections(ids, onChange) {
  if (typeof IntersectionObserver === "undefined") return () => {};
  const visible = new Map();

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });
      let bestId = null;
      let bestRatio = 0;
      visible.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });
      if (bestId) onChange(bestId);
    },
    { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.15, 0.4, 0.75, 1] },
  );

  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });

  return () => io.disconnect();
}
