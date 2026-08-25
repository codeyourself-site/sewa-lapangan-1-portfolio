"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "Bagaimana cara booking lapangan?",
    answer:
      "Pilih lapangan, tentukan jadwal dan jam main lewat halaman pencarian, lalu selesaikan pembayaran langsung dari aplikasi. Kamu akan langsung dapat konfirmasi otomatis.",
  },
  {
    question: "Apakah saya bisa reschedule jadwal?",
    answer:
      "Bisa. Reschedule dapat dilakukan maksimal 24 jam sebelum jadwal main tanpa biaya tambahan.",
  },
  {
    question: "Metode pembayaran apa saja yang didukung?",
    answer:
      "Kami mendukung transfer bank, e-wallet, dan kartu debit/kredit untuk mempermudah proses pembayaran kamu.",
  },
  {
    question: "Apakah ada minimum durasi booking?",
    answer:
      "Minimum booking adalah 1 jam, dan bisa diperpanjang sesuai ketersediaan jadwal lapangan.",
  },
  {
    question: "Bagaimana jika hujan atau lapangan tidak bisa dipakai?",
    answer:
      "Kamu bisa reschedule tanpa biaya tambahan, atau dapatkan refund penuh jika venue benar-benar tidak bisa digunakan.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section
      id="faq"
      className="scroll-mt-24 bg-white px-9 py-16 sm:px-14 sm:py-20"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
            <span className="size-1.5 rounded-full bg-zinc-400" />
            FAQ
          </div>
          <h2 className="mt-4 text-3xl leading-tight font-medium text-black sm:text-4xl md:text-5xl">
            Pertanyaan yang sering ditanyakan
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">
            Nggak nemu jawaban yang kamu cari? Hubungi tim kami langsung, kami
            siap bantu kapan pun kamu butuh.
          </p>
        </div>

        <div className="flex flex-col">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="border-b border-zinc-200">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-base font-medium text-black">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-200"
                  >
                    <ChevronDown className="size-4 text-zinc-500" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-zinc-500">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
