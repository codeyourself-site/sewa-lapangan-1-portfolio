"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const ALL = "Semua";

const ARTICLES = [
  {
    title: "5 Tips Booking Lapangan Biar Nggak Kehabisan Slot",
    excerpt:
      "Jam-jam ramai sering bikin slot favorit ludes duluan. Ini strategi biar kamu selalu kebagian jadwal.",
    category: "Tips",
    date: "12 Agustus 2026",
    readTime: "4 menit baca",
    image: "/images/steps/step-1-wide.jpg",
    alt: "Pemandangan udara lapangan sepak bola dengan lampu sorot malam hari",
  },
  {
    title: "Rumput Sintetis vs Vinyl, Mana yang Cocok Buat Kamu?",
    excerpt:
      "Dua permukaan lapangan ini punya karakter beda. Kenali kelebihan masing-masing sebelum booking.",
    category: "Panduan",
    date: "28 Juli 2026",
    readTime: "6 menit baca",
    image: "/images/fields/field-c.jpg",
    alt: "Lapangan mini soccer dengan pemandangan gunung",
  },
  {
    title: "Golin Kini Hadir di 5 Kota Baru",
    excerpt:
      "Ekspansi terbaru kami menambah puluhan venue baru mitra Golin di luar Jabodetabek.",
    category: "Update",
    date: "15 Juli 2026",
    readTime: "3 menit baca",
    image: "/images/hero-mini-soccer-2.jpg",
    alt: "Pemandangan udara dua lapangan sepak bola dengan lampu sorot",
  },
  {
    title: "Aturan Dasar Mini Soccer Buat Pemula",
    excerpt:
      "Baru mau coba main mini soccer bareng teman kantor? Kenalan dulu sama aturan dasarnya di sini.",
    category: "Panduan",
    date: "2 Juli 2026",
    readTime: "5 menit baca",
    image: "/images/hero-mini-soccer-1.jpg",
    alt: "Pemain beraksi di lapangan mini soccer berpagar saat siang hari",
  },
  {
    title: "Cerita Komunitas: Liga Mini Soccer Kantoran Jakarta",
    excerpt:
      "Gimana rasanya main liga rutin tiap minggu? Kami ngobrol bareng salah satu kapten tim.",
    category: "Komunitas",
    date: "19 Juni 2026",
    readTime: "7 menit baca",
    image: "/images/fields/field-a.jpg",
    alt: "Lapangan mini soccer berpagar dikelilingi pepohonan",
  },
  {
    title: "Cara Reschedule Booking Tanpa Ribet",
    excerpt:
      "Ada halangan mendadak? Begini cara reschedule jadwal main kamu lewat aplikasi Golin.",
    category: "Tips",
    date: "5 Juni 2026",
    readTime: "3 menit baca",
    image: "/images/fields/field-d.jpg",
    alt: "Lapangan mini soccer merah hijau di area sekolah",
  },
];

const CATEGORIES = [
  ALL,
  ...Array.from(new Set(ARTICLES.map((article) => article.category))),
];

export function BlogContent() {
  const [activeCategory, setActiveCategory] = useState(ALL);

  const filtered = useMemo(
    () =>
      ARTICLES.filter(
        (article) =>
          activeCategory === ALL || article.category === activeCategory,
      ),
    [activeCategory],
  );

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2 sm:mt-12">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              category === activeCategory
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((article) => (
          <motion.article
            key={article.title}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col overflow-hidden rounded-3xl border border-zinc-200"
          >
            <div className="relative aspect-3/2 overflow-hidden">
              <Image
                src={article.image}
                alt={article.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                {article.category}
              </span>
              <p className="mt-3 font-medium text-black">{article.title}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500">
                {article.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-zinc-200 pt-4 text-xs text-zinc-400">
                <span>{article.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" strokeWidth={1.75} />
                  {article.readTime}
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </>
  );
}
