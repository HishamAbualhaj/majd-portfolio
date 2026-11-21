"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Content is visible by default. Animation is a progressive enhancement:
// without JavaScript, IntersectionObserver, or motion permission, it stays readable.
export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = document.querySelectorAll<HTMLElement>("#main-content [data-reveal]");
    const animations = new Map<HTMLElement, Animation>();
    let observer: IntersectionObserver | undefined;

    function stop() {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    }

    function start() {
      if (preference.matches || !("IntersectionObserver" in window) || !("animate" in Element.prototype)) return;

      observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          const element = target as HTMLElement;
          observer?.unobserve(element);
          if (element.dataset.revealed === "true" || preference.matches) return;
          element.dataset.revealed = "true";

          // Never fade a control that already contains keyboard focus.
          if (element.contains(document.activeElement)) return;
          const delay = Math.min(Number(element.dataset.revealDelay) || 0, 240);
          const animation = element.animate(
            [{ opacity: 0, transform: "translateY(22px)" }, { opacity: 1, transform: "translateY(0)" }],
            { duration: 700, delay, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
          );
          animations.set(element, animation);
          animation.onfinish = () => animations.delete(element);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });

      elements.forEach((element) => observer?.observe(element));
    }

    function onPreferenceChange() {
      stop();
      start();
    }

    function onFocus(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      animations.forEach((animation, element) => {
        if (element.contains(event.target as Node)) {
          animation.cancel();
          animations.delete(element);
        }
      });
    }

    start();
    preference.addEventListener("change", onPreferenceChange);
    document.addEventListener("focusin", onFocus);
    return () => {
      stop();
      preference.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("focusin", onFocus);
    };
  }, [pathname]);

  return null;
}
