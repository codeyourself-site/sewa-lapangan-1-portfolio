import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, HeartHandshake, ShieldCheck, Zap } from "lucide-react";
import { PageHeader } from "@/app/components/page-header";

export const metadata: Metadata = {
  title: "Tentang Kami - Golin",
  description:
    "Kenalan lebih dekat dengan Golin, platform sewa lapangan mini soccer yang bikin cari dan booking lapangan jadi gampang.",
};

const STATS = [
  { label: "Lapangan Terdaftar", value: "120+" },
  { label: "Kota di Indonesia", value: "15" },
  { label: "Booking Selesai", value: "8.000+" },
  { label: "Rating Rata-rata", value: "4.8/5" },
];

const VALUES = [
  {
    icon: Zap,
    title: "Cepat",
    description:
      "Cari dan booking lapangan cuma butuh hitungan menit, tanpa perlu telepon-teleponan ke admin venue.",
  },
  {
    icon: ShieldCheck,
    title: "Terpercaya",
    description:
      "Semua venue mitra kami diverifikasi langsung sebelum tayang, jadi info yang kamu lihat selalu akurat.",
  },
  {
    icon: HeartHandshake,
    title: "Transparan",
    description:
      "Harga yang kamu lihat adalah harga yang kamu bayar — tanpa biaya tersembunyi di menit terakhir.",
  },
];

const TEAM = [
  {
    name: "Raka Wibowo",
    role: "Founder & CEO",
    avatar: "/images/avatars/team-1.jpg",
  },
  {
    name: "Salsa Amelia",
    role: "Head of Operations",
    avatar: "/images/avatars/team-2.jpg",
  },
  {
    name: "Bima Nugraha",
    role: "Head of Partnerships",
    avatar: "/images/avatars/team-3.jpg",
  },
];

export default function TentangPage() {
  return (
    <main className="min-h-svh bg-white px-9 pt-28 pb-16 sm:px-14 sm:pt-36 sm:pb-20">
      <PageHeader
        eyebrow="Tentang Kami"
        title="Platform sewa lapangan yang bikin main bareng makin gampang"
        description="Golin menghubungkan kamu dengan lapangan mini soccer terbaik di kotamu — cari, bandingkan, dan booking langsung dari satu tempat."
      />

      <div className="mt-14 grid grid-cols-2 gap-4 sm:mt-16 sm:grid-cols-4 sm:gap-6">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-zinc-200 p-5"
          >
            <p className="text-2xl font-semibold text-black sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-zinc-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-10 sm:mt-20 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
          <Image
            src="/images/hero-mini-soccer-2.jpg"
            alt="Pemandangan udara dua lapangan sepak bola dengan lampu sorot"
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="max-w-md">
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
            <span className="size-1.5 rounded-full bg-zinc-400" />
            Cerita Kami
          </div>
          <h2 className="mt-4 text-2xl leading-tight font-medium text-black sm:text-3xl">
            Berawal dari susahnya cari lapangan kosong tiap akhir pekan
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">
            Golin dimulai dari pengalaman sederhana: capek bolak-balik chat
            admin lapangan cuma buat tahu jadwal kosong. Kami membangun satu
            platform di mana jadwal, harga, dan ketersediaan semua venue bisa
            dilihat langsung, real-time.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">
            Sekarang Golin sudah membantu ribuan pemain mini soccer di berbagai
            kota menemukan lapangan yang pas, tanpa drama.
          </p>
        </div>
      </div>

      <div className="mt-16 sm:mt-20">
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
          <span className="size-1.5 rounded-full bg-zinc-400" />
          Nilai Kami
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="rounded-3xl border border-zinc-200 p-6"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-zinc-100 text-black">
                <value.icon className="size-5" strokeWidth={1.75} />
              </span>
              <p className="mt-4 font-medium text-black">{value.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 sm:mt-20">
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
          <span className="size-1.5 rounded-full bg-zinc-400" />
          Tim Kami
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="flex items-center gap-4 rounded-2xl border border-zinc-200 p-5"
            >
              <Image
                src={member.avatar}
                alt={member.name}
                width={56}
                height={56}
                className="size-14 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-black">{member.name}</p>
                <p className="text-xs text-zinc-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        id="karier"
        className="mt-16 scroll-mt-28 rounded-3xl bg-zinc-950 px-8 py-12 text-center sm:mt-20 sm:px-14 sm:py-16"
      >
        <h2 className="text-2xl font-medium text-white sm:text-3xl">
          Tertarik gabung tim Golin?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
          Belum ada posisi yang lagi dibuka saat ini, tapi kami selalu senang
          kenalan sama talenta baru. Kirim CV kamu, siapa tahu ada peran yang
          cocok nanti.
        </p>
        <a
          href="mailto:karier@golin.id"
          className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
        >
          Kirim CV ke karier@golin.id
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <div className="mt-14 flex flex-col items-center gap-4 text-center sm:mt-16">
        <p className="text-sm text-zinc-500">
          Siap main? Cari lapangan favoritmu sekarang.
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
