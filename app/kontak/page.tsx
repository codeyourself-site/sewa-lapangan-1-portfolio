import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/app/components/page-header";
import { KontakForm } from "@/app/kontak/kontak-form";

export const metadata: Metadata = {
  title: "Kontak - Golin",
  description:
    "Ada pertanyaan seputar booking atau kerja sama venue? Hubungi tim Golin.",
};

const CONTACT_INFO = [
  { icon: MapPin, label: "Alamat", value: "Jakarta, Indonesia" },
  { icon: Phone, label: "Telepon / WhatsApp", value: "+62 812-3456-7890" },
  { icon: Mail, label: "Email", value: "halo@golin.id" },
  {
    icon: Clock,
    label: "Jam Operasional",
    value: "Setiap hari, 06.00 - 22.00",
  },
];

export default function KontakPage() {
  return (
    <main className="min-h-svh bg-white px-9 pt-28 pb-16 sm:px-14 sm:pt-36 sm:pb-20">
      <PageHeader
        eyebrow="Kontak"
        title="Ada pertanyaan? Tim kami siap bantu"
        description="Isi form di bawah atau hubungi kami langsung lewat kontak yang tersedia, kami biasanya balas dalam 1x24 jam."
      />

      <div className="mt-14 grid grid-cols-1 gap-10 sm:mt-16 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-zinc-200 p-6 sm:p-8">
          <KontakForm />
        </div>

        <div className="flex flex-col gap-4">
          {CONTACT_INFO.map((info) => (
            <div
              key={info.label}
              className="flex items-start gap-3 rounded-2xl border border-zinc-200 p-5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-black">
                <info.icon className="size-4" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-xs text-zinc-400">{info.label}</p>
                <p className="mt-0.5 text-sm font-medium text-black">
                  {info.value}
                </p>
              </div>
            </div>
          ))}

          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-emerald-600 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Chat via WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
