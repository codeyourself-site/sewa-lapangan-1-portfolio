import type { Metadata } from "next";
import { PageHeader } from "@/app/components/page-header";
import { LegalSection } from "@/app/components/legal-section";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan - Golin",
  description: "Syarat dan ketentuan penggunaan layanan Golin.",
};

export default function SyaratKetentuanPage() {
  return (
    <main className="min-h-svh bg-white px-9 pt-28 pb-16 sm:px-14 sm:pt-36 sm:pb-20">
      <div className="mx-auto max-w-3xl">
        <PageHeader
          eyebrow="Legal"
          title="Syarat & Ketentuan"
          description="Terakhir diperbarui: 25 Agustus 2026"
        />

        <div className="mt-12 sm:mt-14">
          <LegalSection number={1} title="Ketentuan Umum">
            <p>
              Dengan mengakses dan menggunakan platform Golin, kamu setuju untuk
              terikat dengan syarat dan ketentuan ini. Golin berhak mengubah
              ketentuan ini sewaktu-waktu, dan perubahan akan berlaku sejak
              dipublikasikan di halaman ini.
            </p>
          </LegalSection>

          <LegalSection number={2} title="Akun & Pemesanan">
            <p>
              Kamu bertanggung jawab atas kebenaran data yang diberikan saat
              melakukan pemesanan, termasuk nama, nomor WhatsApp, dan jadwal
              main. Satu pemesanan hanya berlaku untuk satu slot lapangan pada
              jadwal yang dipilih.
            </p>
          </LegalSection>

          <LegalSection number={3} title="Pembayaran">
            <p>
              Pembayaran dilakukan penuh di muka melalui metode yang tersedia di
              halaman checkout. Booking dianggap sah setelah pembayaran berhasil
              dikonfirmasi oleh sistem.
            </p>
          </LegalSection>

          <LegalSection number={4} title="Pembatalan & Reschedule">
            <p>
              Reschedule dapat dilakukan maksimal 24 jam sebelum jadwal main
              tanpa biaya tambahan. Pembatalan di luar ketentuan ini dapat
              dikenakan biaya sesuai kebijakan venue terkait.
            </p>
          </LegalSection>

          <LegalSection number={5} title="Tanggung Jawab Pengguna">
            <p>
              Pengguna wajib menjaga ketertiban dan keamanan selama menggunakan
              fasilitas lapangan. Golin tidak bertanggung jawab atas kehilangan
              barang pribadi atau cedera yang terjadi selama penggunaan venue.
            </p>
          </LegalSection>

          <LegalSection number={6} title="Perubahan Ketentuan">
            <p>
              Golin dapat memperbarui syarat dan ketentuan ini dari waktu ke
              waktu. Penggunaan layanan secara berkelanjutan setelah perubahan
              dianggap sebagai persetujuan atas ketentuan yang baru.
            </p>
          </LegalSection>
        </div>
      </div>
    </main>
  );
}
