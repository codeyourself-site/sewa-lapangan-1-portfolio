import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenisInstance() {
  return instance;
}

// Fixed navbar clearance so the scrolled-to section isn't tucked behind it.
const SCROLL_OFFSET = -100;

export function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;

  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(target, { offset: SCROLL_OFFSET });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
