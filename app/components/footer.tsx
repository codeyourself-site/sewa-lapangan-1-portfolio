"use client";

import type { SVGProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";

const LINK_GROUPS = [
  {
    title: "Perusahaan",
    links: [
      { label: "Tentang Kami", href: "/tentang" },
      { label: "Karier", href: "/tentang#karier" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Layanan",
    links: [
      { label: "Sewa Lapangan", href: "#lapangan" },
      { label: "Cara Booking", href: "#jadwal" },
      { label: "Promo", href: "/promo" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Hubungi Kami", href: "/kontak" },
      { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
    ],
  },
];

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8.5 19L4 20Z" />
      <path d="M9 10c0 3 2.5 5 5 5" />
    </svg>
  );
}

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Section anchors like "#faq" only resolve on the homepage — from any
  // other page they need the leading "/" so Next.js navigates there first.
  function resolveHref(href: string) {
    if (!href.startsWith("#")) return href;
    return isHome ? href : `/${href}`;
  }

  return (
    <footer
      id="kontak"
      className="scroll-mt-24 bg-zinc-950 px-9 py-16 text-zinc-400 sm:px-14 sm:py-20"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_2fr]">
        <div>
          <span className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Golin
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Platform sewa lapangan mini soccer paling gampang. Cari, booking,
            dan main tanpa ribet.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://instagram.com/golin.id"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
            >
              <InstagramIcon className="size-[18px]" />
            </a>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
            >
              <WhatsAppIcon className="size-[18px]" />
            </a>
            <a
              href="mailto:halo@golin.id"
              aria-label="Email"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
            >
              <Mail className="size-[18px]" strokeWidth={1.75} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-medium text-white">{group.title}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={resolveHref(link.href)}
                      className="text-sm transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 sm:col-span-1">
            <p className="text-sm font-medium text-white">Kontak</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} />
                <span>Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" strokeWidth={1.75} />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" strokeWidth={1.75} />
                <span>halo@golin.id</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2026 Golin. Seluruh hak cipta dilindungi.</p>
        <div className="flex items-center gap-6">
          <Link
            href="/kebijakan-privasi"
            className="transition-colors hover:text-white"
          >
            Kebijakan Privasi
          </Link>
          <Link
            href="/syarat-ketentuan"
            className="transition-colors hover:text-white"
          >
            Syarat & Ketentuan
          </Link>
        </div>
      </div>
    </footer>
  );
}
