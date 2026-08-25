"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "@/app/components/hero";

gsap.registerPlugin(ScrollTrigger);

export function HeroStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Shrinks to 0.95 over the first 20% of the pin range, matching
      // Intro's reveal start (see the -mt-[100svh] on Intro's wrapper in
      // page.tsx). The navbar is scaled from this same callback (instead
      // of its own separate ScrollTrigger) so both always read the exact
      // same progress value in the exact same tick, with zero drift.
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const shrinkProgress = Math.min(self.progress / 0.2, 1);
          const scale = 1 - shrinkProgress * 0.05;
          gsap.set(cardRef.current, { scale });

          // The card shrinks toward its own center, so its top edge drops
          // by half the height it loses. Push the navbar down by the same
          // amount so it stays flush against the card's top edge, just
          // like before any scrolling happened.
          const nav = document.querySelector<HTMLElement>("[data-navbar]");
          const cardHeight = cardRef.current?.offsetHeight ?? 0;
          const shiftDown = (cardHeight * (1 - scale)) / 2;
          nav?.style.setProperty(
            "transform",
            `translateY(${shiftDown}px) scale(${scale})`,
          );
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} data-hero-stack className="relative h-[225svh]">
      <div className="sticky top-0">
        <Hero ref={cardRef} />
      </div>
    </div>
  );
}
