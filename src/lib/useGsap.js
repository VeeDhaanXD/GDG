import { useCallback, useLayoutEffect, useRef } from "react";
import { gsap } from "./gsap";

/**
 * Runs a GSAP setup function against a scope element and guarantees a full
 * teardown (tweens, timelines, ScrollTriggers, inline styles, listeners).
 *
 * The callback may return a function (or array of functions) which is invoked
 * right before the gsap context is reverted — perfect for removing DOM
 * listeners registered inside the animation setup.
 */
export function useGsap(callback, deps = []) {
  const ref = useRef(null);
  const fn = useRef(callback);
  fn.current = callback;

  useLayoutEffect(() => {
    const scope = ref.current;
    if (!scope) return undefined;

    let teardown = [];
    const ctx = gsap.context((self) => {
      const result = fn.current(self, scope);
      if (typeof result === "function") teardown = [result];
      else if (Array.isArray(result)) teardown = result.filter(Boolean);
    }, scope);

    return () => {
      teardown.forEach((fn2) => {
        try {
          fn2();
        } catch {
          /* noop */
        }
      });
      teardown = [];
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/** Stable callback helper for values that must not retrigger effects. */
export function useEvent(fn) {
  const ref = useRef(fn);
  ref.current = fn;
  return useCallback((...args) => ref.current?.(...args), []);
}
