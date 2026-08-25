"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const STEPS = [
  {
    detailImage: "/images/steps/step-1-detail.jpg",
    detailAlt: "Bola dan garis lapangan mini soccer dari dekat",
    wideImage: "/images/steps/step-1-wide.jpg",
    wideAlt:
      "Pemandangan udara lapangan sepak bola dengan lampu sorot malam hari",
    caption:
      "Cari dan pilih lapangan mini soccer sesuai lokasi serta jadwal yang kamu inginkan.",
  },
  {
    detailImage: "/images/hero-mini-soccer-1.jpg",
    detailAlt:
      "Pemain beraksi di lapangan mini soccer berpagar saat siang hari",
    wideImage: "/images/hero-mini-soccer-2.jpg",
    wideAlt: "Pemandangan udara dua lapangan sepak bola dengan lampu sorot",
    caption:
      "Booking dan bayar langsung dari aplikasi, lalu datang dan main sesuai jadwalmu.",
  },
];

export function BookingSteps() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  function goTo(index: number) {
    setActive((index + STEPS.length) % STEPS.length);
  }

  return (
    <section id="jadwal" className="bg-white px-9 py-16 sm:px-14 sm:py-20">
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl">
          <AnimatePresence initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={step.detailImage}
                alt={step.detailAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-6 pt-16 pb-6">
                <p className="text-center text-sm leading-relaxed text-white">
                  {step.caption}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative aspect-3/2 overflow-hidden rounded-3xl">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={step.wideImage}
                  alt={step.wideAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-end gap-3">
            <motion.button
              type="button"
              aria-label="Langkah sebelumnya"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goTo(active - 1)}
              className="group flex size-12 items-center justify-center rounded-full border border-zinc-200 text-black transition-colors hover:bg-zinc-100"
            >
              <ArrowLeft
                className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                strokeWidth={1.75}
              />
            </motion.button>
            <motion.button
              type="button"
              aria-label="Langkah berikutnya"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goTo(active + 1)}
              className="group flex size-12 items-center justify-center rounded-full bg-zinc-900 text-white transition-colors hover:bg-zinc-800"
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
