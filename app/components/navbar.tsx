"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/app/context/cart-context";
import { getLenisInstance } from "@/lib/lenis-instance";

// Fixed navbar clearance so the scrolled-to section isn't tucked behind it.
const SCROLL_OFFSET = -100;

function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;

  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(target, { offset: SCROLL_OFFSET });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Lapangan", href: "#lapangan" },
  { label: "Jadwal", href: "#jadwal" },
  { label: "Fasilitas", href: "#fasilitas" },
  { label: "Promo", href: "/promo" },
  { label: "Kontak", href: "#kontak" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    // Navbar lives in the root layout and never remounts across route
    // changes, but HeroStack does (it's per-page content) — so this must
    // re-run whenever `pathname` changes to (re)bind to the *current*
    // HeroStack DOM node. Without the `pathname` dependency, navigating
    // home -> elsewhere -> home again leaves the ScrollTrigger attached to
    // the old, now-detached HeroStack from the first visit, which reports
    // garbage progress and can make the navbar render solid/black at the
    // top of a fresh Hero.
    if (!isHome) return;

    const heroStack = document.querySelector<HTMLElement>("[data-hero-stack]");
    if (!heroStack) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: heroStack,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => setScrolled(self.progress > 0.9),
      });
      setScrolled(trigger.progress > 0.9);
    });

    return () => ctx.revert();
  }, [isHome]);

  useEffect(() => {
    // Handles arriving at "/" with a hash already in the URL — e.g. a nav
    // link clicked from another page (Link href="/#lapangan"). The browser's
    // own scroll-to-hash fires an instant native jump that fights with
    // Lenis's virtualized scroll position, so re-do it smoothly through
    // Lenis once the homepage content has settled.
    if (!isHome) return;
    const hash = window.location.hash;
    if (!hash) return;

    const timer = window.setTimeout(() => scrollToHash(hash), 120);
    return () => window.clearTimeout(timer);
  }, [isHome]);

  function handleNavLinkClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
  ) {
    if (!isHome) return; // let Link navigate to "/" + hash normally
    event.preventDefault();
    scrollToHash(hash);
    window.history.pushState(null, "", hash);
  }

  // On the homepage the navbar starts transparent over the Hero image and
  // becomes a solid pill once scrolled past it. Every other page has no
  // dark backdrop to sit on, so it skips that animation entirely and is
  // just always solid with black text.
  const solid = !isHome || scrolled;

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center",
        isHome
          ? cn(
              "transition-[padding] duration-500 ease-out",
              scrolled
                ? "px-7 pt-2 sm:px-12 sm:pt-3"
                : "px-4 pt-4 sm:px-6 sm:pt-6",
            )
          : "px-4 pt-4 sm:px-6 sm:pt-6",
      )}
    >
      <nav
        data-navbar
        className={cn(
          "flex w-full max-w-none items-center justify-between",
          isHome
            ? cn(
                "rounded-full border transition-all duration-500 ease-out",
                scrolled
                  ? "border-zinc-200/80 bg-white/95 px-5 py-2.5 shadow-lg shadow-black/5 backdrop-blur-md sm:px-7"
                  : "border-transparent bg-transparent px-2 py-2 shadow-none sm:px-4",
              )
            : "rounded-full border border-zinc-200/80 bg-white px-5 py-2.5 shadow-lg shadow-black/5 sm:px-7",
        )}
      >
        <Link
          href="/"
          className={cn(
            "text-xl font-semibold tracking-tight transition-colors duration-500 sm:text-2xl",
            solid ? "text-black" : "text-white",
          )}
        >
          Golin
        </Link>

        <ul className="hidden items-center gap-9 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => {
            const isHash = link.href.startsWith("#");

            return (
              <li key={link.href}>
                <Link
                  href={
                    isHash ? (isHome ? link.href : `/${link.href}`) : link.href
                  }
                  onClick={(event) =>
                    isHash && handleNavLinkClick(event, link.href)
                  }
                  className={cn(
                    "transition-colors duration-500",
                    solid
                      ? "text-black/70 hover:text-black"
                      : "text-white/90 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/cart" aria-label="Buka keranjang">
            <motion.span
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              className={cn(
                "group relative flex size-11 items-center justify-center rounded-full border backdrop-blur-sm transition-colors duration-500",
                solid
                  ? "border-zinc-200 bg-zinc-100 text-black hover:bg-zinc-200"
                  : "border-white/25 bg-white/10 text-white hover:bg-white/20",
              )}
            >
              <ShoppingCart
                className="size-[18px] transition-transform duration-300 group-hover:-rotate-12"
                strokeWidth={1.75}
              />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-semibold text-white"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.span>
          </Link>

          <Link href="/kontak">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "group flex items-center gap-3 rounded-full py-1.5 pr-1.5 pl-5 text-sm font-medium transition-colors duration-500",
                solid
                  ? "bg-black text-white hover:bg-black/85"
                  : "bg-white text-black hover:bg-white/90",
              )}
            >
              Hubungi Kami
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full transition-colors duration-500",
                  solid ? "bg-white text-black" : "bg-black text-white",
                )}
              >
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </span>
            </motion.span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
