import Image from "next/image";

const TEAM_AVATARS = [
  { src: "/images/avatars/team-1.jpg", alt: "Anggota tim Golin" },
  { src: "/images/avatars/team-2.jpg", alt: "Anggota tim Golin" },
  { src: "/images/avatars/team-3.jpg", alt: "Anggota tim Golin" },
];

export function Intro() {
  return (
    <section className="bg-white px-9 py-16 sm:px-14 sm:py-20">
      <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
        <h2 className="max-w-xl text-3xl leading-tight font-medium text-black sm:text-4xl md:text-[2.75rem]">
          Jadwal, harga, dan ketersediaan lapangan mini soccer favoritmu, akurat
          di ujung jarimu
        </h2>

        <div className="flex items-start gap-4 md:max-w-xs">
          <div
            className="flex shrink-0 -space-x-3"
            style={{ width: `${44 + (TEAM_AVATARS.length - 1) * 32}px` }}
          >
            {TEAM_AVATARS.map((avatar) => (
              <Image
                key={avatar.src}
                src={avatar.src}
                alt={avatar.alt}
                width={44}
                height={44}
                className="size-11 shrink-0 rounded-full object-cover ring-2 ring-white"
              />
            ))}
          </div>
          <p className="text-sm leading-relaxed text-zinc-500">
            Tim kami siap bantu kamu menentukan jadwal terbaik sebelum booking
            lapangan.
          </p>
        </div>
      </div>

      <div className="mt-12 border-t border-zinc-200 sm:mt-16" />
    </section>
  );
}
