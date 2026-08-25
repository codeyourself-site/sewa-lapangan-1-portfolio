import type { Metadata } from "next";
import { PageHeader } from "@/app/components/page-header";
import { LegalSection } from "@/app/components/legal-section";

export const metadata: Metadata = {
  title: "Kebijakan Privasi - Golin",
  description:
    "Bagaimana Golin mengumpulkan, menggunakan, dan melindungi data kamu.",
};

export default function KebijakanPrivasiPage() {
  return (
    <main className="min-h-svh bg-white px-9 pt-28 pb-16 sm:px-14 sm:pt-36 sm:pb-20">
      <div className="mx-auto max-w-3xl">
        <PageHeader
          eyebrow="Legal"
          title="Kebijakan Privasi"
          description="Terakhir diperbarui: 25 Agustus 2026"
        />

        <div className="mt-12 sm:mt-14">
          <LegalSection number={1} title="Data yang Kami Kumpulkan">
            <p>
              Kami mengumpulkan data yang kamu berikan langsung, seperti nama,
              nomor WhatsApp, dan email saat melakukan pemesanan atau
              menghubungi tim kami, serta data teknis dasar seperti jenis
              perangkat dan aktivitas booking.
            </p>
          </LegalSection>

          <LegalSection number={2} title="Penggunaan Data">
            <p>
              Data yang kami kumpulkan digunakan untuk memproses pemesanan,
              mengirim konfirmasi booking, memberikan dukungan pelanggan, dan
              meningkatkan kualitas layanan Golin.
            </p>
          </LegalSection>

          <LegalSection number={3} title="Keamanan Data">
            <p>
              Kami menerapkan langkah-langkah teknis dan organisasi yang wajar
              untuk melindungi data kamu dari akses, perubahan, atau
              pengungkapan yang tidak sah.
            </p>
          </LegalSection>

          <LegalSection number={4} title="Berbagi Data dengan Pihak Ketiga">
            <p>
              Data kamu hanya dibagikan dengan venue mitra sebatas yang
              diperlukan untuk memproses booking, dan dengan penyedia layanan
              pembayaran untuk memfasilitasi transaksi.
            </p>
          </LegalSection>

          <LegalSection number={5} title="Hak Pengguna">
            <p>
              Kamu berhak meminta akses, koreksi, atau penghapusan data pribadi
              yang kami simpan dengan menghubungi tim kami melalui halaman
              kontak.
            </p>
          </LegalSection>

          <LegalSection number={6} title="Kontak">
            <p>
              Pertanyaan seputar kebijakan privasi ini dapat disampaikan ke{" "}
              <a
                href="mailto:halo@golin.id"
                className="font-medium text-black underline underline-offset-4 hover:text-zinc-700"
              >
                halo@golin.id
              </a>
              .
            </p>
          </LegalSection>
        </div>
      </div>
    </main>
  );
}
