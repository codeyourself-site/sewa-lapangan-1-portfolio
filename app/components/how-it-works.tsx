"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const STEPS = [
  {
    title: "Cari Lapangan",
    description:
      "Cari lapangan mini soccer sesuai lokasi, jadwal, dan ukuran yang kamu mau lewat halaman pencarian kami.",
    image: "/images/fields/field-c.jpg",
    alt: "Lapangan mini soccer dengan pemandangan gunung",
  },
  {
    title: "Booking & Bayar",
    description:
      "Pilih jam main yang tersedia, lalu selesaikan pembayaran langsung dari aplikasi.",
    image: "/images/steps/step-1-wide.jpg",
    alt: "Pemandangan udara lapangan sepak bola dengan lampu sorot malam hari",
  },
  {
    title: "Main Bareng Tim",
    description:
      "Datang ke lapangan sesuai jadwal, dan langsung main bareng tim kesayanganmu.",
    image: "/images/hero-mini-soccer-1.jpg",
    alt: "Pemain beraksi di lapangan mini soccer berpagar saat siang hari",
  },
];

const STEP_DURATION = 5000;

export function HowItWorks() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((prev) => (prev + 1) % STEPS.length);
    }, STEP_DURATION);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <section
      id="fasilitas"
      className="grid grid-cols-1 gap-10 bg-white px-9 py-16 sm:px-14 sm:py-20 md:grid-cols-2 md:items-stretch md:gap-16"
    >
      <div>
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
          <span className="size-1.5 rounded-full bg-zinc-400" />
          Cara Kerja
        </div>

        <h2 className="mt-4 text-3xl leading-tight font-medium text-black sm:text-4xl md:text-5xl">
          Booking lapangan makin gampang cuma dengan 3 langkah simpel
        </h2>

        <div className="mt-10 flex flex-col">
          {STEPS.map((step, index) => {
            const isActive = index === active;

            return (
              <div key={step.title}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  className="flex w-full flex-col gap-3 py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-zinc-400">
                      ({String(index + 1).padStart(2, "0")})
                    </span>
                    <span className="text-base font-medium text-black">
                      {step.title}
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden pl-10 text-sm leading-relaxed text-zinc-500"
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>

                <div className="relative h-px w-full bg-zinc-200">
                  {isActive && (
                    <motion.div
                      key={active}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: STEP_DURATION / 1000,
                        ease: "linear",
                      }}
                      className="absolute inset-y-0 left-0 bg-zinc-900"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group mt-10 flex w-fit items-center gap-3 rounded-full border border-zinc-200 bg-white py-2 pr-2 pl-6 text-base font-medium text-black transition-colors hover:bg-zinc-50"
        >
          Booking Sekarang
          <span className="flex size-10 items-center justify-center rounded-full bg-zinc-900 text-white">
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </span>
        </motion.button>
      </div>

      <div className="relative min-h-96 overflow-hidden rounded-3xl">
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={STEPS[active].image}
              alt={STEPS[active].alt}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
