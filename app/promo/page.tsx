import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Gift, Percent, Sunrise, Users } from "lucide-react";
import { PageHeader } from "@/app/components/page-header";

export const metadata: Metadata = {
  title: "Promo - Golin",
  description:
    "Diskon dan penawaran spesial buat booking lapangan mini soccer di Golin.",
};

const PROMOS = [
  {
    icon: Gift,
    title: "Diskon Booking Pertama",
    description:
      "Booking pertama kamu di Golin langsung dapat potongan 20%, berlaku untuk semua venue.",
    code: "WELCOME20",
    expiry: "Berlaku sampai 31 Desember 2026",
  },
  {
    icon: Sunrise,
    title: "Diskon Weekday Pagi",
    description:
      "Main pagi hari (06.00-10.00) di hari kerja? Dapat potongan 15% dari harga normal.",
    code: "PAGI15",
    expiry: "Berlaku Senin-Jumat",
  },
  {
    icon: Users,
    title: "Ajak Teman, Dapat Saldo",
    description:
      "Ajak teman baru daftar dan booking, kalian berdua sama-sama dapat saldo Rp50.000.",
    code: "AJAKTEMAN",
    expiry: "Tanpa batas waktu",
  },
  {
    icon: Percent,
    title: "Cashback Booking Mingguan",
    description:
      "Booking rutin tiap minggu di lapangan yang sama? Dapat cashback 10% tiap booking ke-4.",
    code: "RUTIN10",
    expiry: "Otomatis, tanpa kode",
  },
];

export default function PromoPage() {
  return (
    <main className="min-h-svh bg-white px-9 pt-28 pb-16 sm:px-14 sm:pt-36 sm:pb-20">
      <PageHeader
        eyebrow="Promo"
        title="Diskon dan penawaran spesial buat kamu"
        description="Main jangan sampai bolong cuma karena budget. Cek promo aktif kami sebelum booking lapangan berikutnya."
      />

      <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
        {PROMOS.map((promo) => (
          <div
            key={promo.title}
            className="flex flex-col rounded-3xl border border-zinc-200 p-6"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-zinc-100 text-black">
              <promo.icon className="size-5" strokeWidth={1.75} />
            </span>
            <p className="mt-4 font-medium text-black">{promo.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              {promo.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-4">
              <span className="rounded-full border border-dashed border-zinc-300 px-3 py-1 font-mono text-xs font-medium text-black">
                {promo.code}
              </span>
              <span className="text-xs text-zinc-400">{promo.expiry}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 max-w-2xl rounded-2xl bg-zinc-50 p-5 text-sm text-zinc-500 sm:mt-12">
        Syarat &amp; ketentuan promo dapat berubah sewaktu-waktu. Baca detail
        lengkapnya di{" "}
        <Link
          href="/syarat-ketentuan"
          className="font-medium text-black underline underline-offset-4 hover:text-zinc-700"
        >
          halaman Syarat &amp; Ketentuan
        </Link>
        .
      </div>

      <div className="mt-14 flex flex-col items-center gap-4 text-center sm:mt-16">
        <p className="text-sm text-zinc-500">
          Pakai kode promo saat booking berikutnya.
        </p>
        <Link
          href="/#lapangan"
          className="group flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Cari Lapangan
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </main>
  );
}
