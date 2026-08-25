"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Dimas Pratama",
    role: "Jakarta Selatan",
    avatar: "/images/avatars/review-1.jpg",
    rating: 5,
    quote:
      "Booking gampang banget, tinggal pilih jadwal terus langsung dapat konfirmasi. Lapangannya juga terawat rapi.",
  },
  {
    name: "Rizky Aditya",
    role: "Bekasi",
    avatar: "/images/avatars/review-2.jpg",
    rating: 5,
    quote:
      "Sering pesan buat main mingguan sama teman kantor. Harganya transparan, nggak ada biaya tersembunyi sama sekali.",
  },
  {
    name: "Farah Nabila",
    role: "Bandung",
    avatar: "/images/avatars/review-3.jpg",
    rating: 4,
    quote:
      "Suka banget sama fitur pencariannya, bisa filter lokasi dan jam main jadi cepat nemu lapangan yang masih kosong.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white px-9 py-16 sm:px-14 sm:py-20">
      <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
        <span className="size-1.5 rounded-full bg-zinc-400" />
        Kata Mereka
      </div>

      <h2 className="mt-4 max-w-2xl text-3xl leading-tight font-medium text-black sm:text-4xl md:text-5xl">
        Dipercaya ribuan pemain mini soccer di seluruh Indonesia
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="flex flex-col justify-between rounded-3xl border border-zinc-200 p-6"
          >
            <div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={
                      starIndex < testimonial.rating
                        ? "size-4 fill-zinc-900 text-zinc-900"
                        : "size-4 fill-zinc-200 text-zinc-200"
                    }
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={40}
                height={40}
                className="size-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-black">
                  {testimonial.name}
                </p>
                <p className="text-xs text-zinc-500">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
