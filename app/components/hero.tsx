"use client";

import Image from "next/image";
import { type Ref, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { scrollToHash } from "@/lib/lenis-instance";

const SLIDES = [
  {
    image: "/images/hero-mini-soccer-1.jpg",
    alt: "Pemain beraksi di lapangan mini soccer berpagar saat siang hari",
  },
  {
    image: "/images/hero-mini-soccer-2.jpg",
    alt: "Pemandangan udara lapangan sepak bola dengan lampu sorot di malam hari",
  },
];

interface HeroProps {
  ref?: Ref<HTMLDivElement>;
}

export function Hero({ ref }: HeroProps) {
  const [active, setActive] = useState(0);

  function goTo(index: number) {
    setActive((index + SLIDES.length) % SLIDES.length);
  }

  return (
    <section className="bg-white p-3 sm:p-4">
      <div
        ref={ref}
        className="relative flex h-[calc(100svh-1.5rem)] min-h-[640px] w-full flex-col overflow-hidden rounded-[28px] bg-black sm:rounded-[32px]"
      >
        {SLIDES.map((slide, index) => (
          <Image
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            quality={90}
            sizes="100vw"
            style={{ inset: "-1px" }}
            className={cn(
              "object-cover transition-opacity duration-700 ease-out",
              index === active ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />

        <div className="relative z-10 flex h-full flex-col">
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <h1 className="max-w-3xl text-4xl leading-[1.1] font-medium text-white sm:text-6xl md:text-7xl">
              <span className="font-display italic">
                Lapangan mini soccer terbaik
              </span>{" "}
              siap kamu sewa hari ini
            </h1>

            <motion.button
              type="button"
              onClick={() => {
                scrollToHash("#lapangan");
                window.history.pushState(null, "", "#lapangan");
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group mt-9 flex items-center gap-3 rounded-full bg-white py-2 pr-2 pl-6 text-base font-medium text-black transition-colors hover:bg-white/90"
            >
              Booking Sekarang
              <span className="flex size-10 items-center justify-center rounded-full bg-black text-white">
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </span>
            </motion.button>
          </div>

          <div className="flex items-center justify-between px-6 pb-6 sm:px-10 sm:pb-8">
            <motion.button
              type="button"
              aria-label="Sebelumnya"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goTo(active - 1)}
              className="group flex size-12 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
            >
              <ArrowLeft
                className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                strokeWidth={1.75}
              />
            </motion.button>

            <div className="flex items-center gap-1.5 text-sm font-medium tracking-wide text-white">
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                >
                  {String(active + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span className="text-white/40">
                /{String(SLIDES.length).padStart(2, "0")}
              </span>
            </div>

            <motion.button
              type="button"
              aria-label="Berikutnya"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goTo(active + 1)}
              className="group flex size-12 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
            >
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.75}
              />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
