"use client";

import Image from "next/image";
import { type SubmitEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Search,
  ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDisclosure } from "@/app/hooks/use-disclosure";
import { useCart } from "@/app/context/cart-context";

const ALL = "Semua";

const WEEKDAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const DROPDOWN_TRANSITION = {
  duration: 0.16,
  ease: [0.16, 1, 0.3, 1] as const,
};

const FIELDS = [
  {
    id: "bukit-hijau",
    image: "/images/fields/field-a.jpg",
    alt: "Lapangan mini soccer berpagar dikelilingi pepohonan",
    name: "Lapangan Bukit Hijau",
    price: "Rp200.000/jam",
    priceValue: 200000,
    surface: "Rumput Sintetis",
    size: "7x7",
    location: "Bogor",
  },
  {
    id: "utama",
    image: "/images/hero-mini-soccer-2.jpg",
    alt: "Pemandangan udara dua lapangan sepak bola dengan lampu sorot",
    name: "Lapangan Utama",
    price: "Rp250.000/jam",
    priceValue: 250000,
    surface: "Rumput Sintetis",
    size: "7x7",
    location: "Jakarta",
  },
  {
    id: "merah-putih",
    image: "/images/fields/field-d.jpg",
    alt: "Lapangan mini soccer merah hijau di area sekolah",
    name: "Lapangan Merah Putih",
    price: "Rp190.000/jam",
    priceValue: 190000,
    surface: "Lantai Vinyl",
    size: "5x5",
    location: "Bandung",
  },
  {
    id: "biru-kota",
    image: "/images/fields/field-b.jpg",
    alt: "Lapangan mini soccer biru bergaya urban minimalis",
    name: "Lapangan Biru Kota",
    price: "Rp175.000/jam",
    priceValue: 175000,
    surface: "Lantai Vinyl",
    size: "5x5",
    location: "Tangerang",
  },
  {
    id: "merdeka",
    image: "/images/hero-mini-soccer-1.jpg",
    alt: "Pemain beraksi di lapangan mini soccer berpagar saat siang hari",
    name: "Lapangan Merdeka",
    price: "Rp180.000/jam",
    priceValue: 180000,
    surface: "Rumput Sintetis",
    size: "5x5",
    location: "Jakarta",
  },
  {
    id: "panorama",
    image: "/images/fields/field-c.jpg",
    alt: "Lapangan mini soccer dengan pemandangan gunung",
    name: "Lapangan Panorama",
    price: "Rp260.000/jam",
    priceValue: 260000,
    surface: "Lantai Vinyl",
    size: "7x7",
    location: "Bogor",
  },
  {
    id: "senja",
    image: "/images/steps/step-1-wide.jpg",
    alt: "Pemandangan udara lapangan sepak bola dengan lampu sorot malam hari",
    name: "Lapangan Senja",
    price: "Rp220.000/jam",
    priceValue: 220000,
    surface: "Rumput Sintetis",
    size: "7x7",
    location: "Bekasi",
  },
  {
    id: "garuda",
    image: "/images/steps/step-1-detail.jpg",
    alt: "Bola dan garis lapangan mini soccer dari dekat",
    name: "Lapangan Garuda",
    price: "Rp150.000/jam",
    priceValue: 150000,
    surface: "Rumput Sintetis",
    size: "5x5",
    location: "Bekasi",
  },
];

function uniqueOptions(key: "surface" | "size" | "location") {
  return [ALL, ...Array.from(new Set(FIELDS.map((field) => field[key])))];
}

const SURFACE_OPTIONS = uniqueOptions("surface");
const SIZE_OPTIONS = uniqueOptions("size");
const LOCATION_OPTIONS = uniqueOptions("location");

interface Filters {
  surface: string;
  size: string;
  location: string;
}

const DEFAULT_FILTERS: Filters = { surface: ALL, size: ALL, location: ALL };

function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

function getCalendarDays(viewDate: Date) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const startOffset = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return [
    ...Array<null>(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  const { open, setOpen, ref } = useDisclosure();

  return (
    <div ref={ref} className="relative">
      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        className="flex min-w-40 items-center gap-6 rounded-full border border-zinc-200 px-5 py-2.5 text-left transition-colors hover:border-zinc-300 hover:bg-zinc-50"
      >
        <div className="flex-1">
          <p className="text-xs text-zinc-400">{label}</p>
          <p className="text-sm font-medium text-black">{value}</p>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={DROPDOWN_TRANSITION}
        >
          <ChevronDown className="size-4 shrink-0 text-zinc-400" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={DROPDOWN_TRANSITION}
            style={{ transformOrigin: "top" }}
            className="absolute top-[calc(100%+8px)] left-0 z-20 min-w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white py-1.5 whitespace-nowrap shadow-lg"
          >
            {options.map((option) => (
              <li key={option} role="option" aria-selected={option === value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center px-4 py-2 text-left text-sm transition-colors hover:bg-zinc-50",
                    option === value
                      ? "font-medium text-black"
                      : "text-zinc-600",
                  )}
                >
                  {option}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function DatePicker({ label, value, onChange }: DatePickerProps) {
  const { open, setOpen, ref } = useDisclosure();
  const today = new Date();
  const initial = value ? new Date(`${value}T00:00:00`) : today;
  const [viewDate, setViewDate] = useState(
    new Date(initial.getFullYear(), initial.getMonth(), 1),
  );
  const [direction, setDirection] = useState(1);

  const days = getCalendarDays(viewDate);
  const todayIso = toISODate(today);
  const monthKey = `${viewDate.getFullYear()}-${viewDate.getMonth()}`;

  function goToMonth(delta: number) {
    setDirection(delta);
    setViewDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1),
    );
  }

  function selectDay(day: number) {
    onChange(
      toISODate(new Date(viewDate.getFullYear(), viewDate.getMonth(), day)),
    );
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={open}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        className="group flex min-w-40 items-center gap-6 rounded-full border border-zinc-200 px-5 py-2.5 text-left transition-colors hover:border-zinc-300 hover:bg-zinc-50"
      >
        <div className="flex-1">
          <p className="text-xs text-zinc-400">{label}</p>
          <p className="text-sm font-medium text-black">
            {value ? formatDisplayDate(value) : "Pilih tanggal"}
          </p>
        </div>
        <Calendar className="size-4 shrink-0 text-zinc-400 transition-transform duration-300 group-hover:scale-110" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={DROPDOWN_TRANSITION}
            style={{ transformOrigin: "top" }}
            className="absolute top-[calc(100%+8px)] left-0 z-20 w-72 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <motion.button
                type="button"
                aria-label="Bulan sebelumnya"
                onClick={() => goToMonth(-1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="group flex size-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100"
              >
                <ChevronLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              </motion.button>
              <p className="text-sm font-medium text-black">
                {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
              </p>
              <motion.button
                type="button"
                aria-label="Bulan berikutnya"
                onClick={() => goToMonth(1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="group flex size-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100"
              >
                <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </motion.button>
            </div>

            <div className="mt-3 grid grid-cols-7 text-center text-xs text-zinc-400">
              {WEEKDAYS.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="relative mt-1 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={monthKey}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -16 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-7 gap-y-1 text-center text-sm"
                >
                  {days.map((day, index) => {
                    if (day === null) return <span key={`blank-${index}`} />;

                    const iso = toISODate(
                      new Date(
                        viewDate.getFullYear(),
                        viewDate.getMonth(),
                        day,
                      ),
                    );
                    const isSelected = iso === value;
                    const isToday = iso === todayIso;

                    return (
                      <button
                        key={iso}
                        type="button"
                        onClick={() => selectDay(day)}
                        className={cn(
                          "mx-auto flex size-8 items-center justify-center rounded-full transition-colors hover:bg-zinc-100",
                          isSelected &&
                            "bg-zinc-900 text-white hover:bg-zinc-900",
                          !isSelected && isToday && "font-semibold text-black",
                        )}
                      >
                        {day}
                      </button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FieldListing() {
  const { addItem } = useCart();
  const [draft, setDraft] = useState<Filters>(DEFAULT_FILTERS);
  const [playDate, setPlayDate] = useState("");
  const [applied, setApplied] = useState<Filters>(DEFAULT_FILTERS);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const results = useMemo(() => {
    return FIELDS.filter(
      (field) =>
        (applied.surface === ALL || field.surface === applied.surface) &&
        (applied.size === ALL || field.size === applied.size) &&
        (applied.location === ALL || field.location === applied.location),
    );
  }, [applied]);

  function handleSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setApplied(draft);
  }

  function handleReset() {
    setDraft(DEFAULT_FILTERS);
    setPlayDate("");
    setApplied(DEFAULT_FILTERS);
  }

  function handleAddToCart(field: (typeof FIELDS)[number]) {
    addItem({
      id: field.id,
      name: field.name,
      image: field.image,
      price: field.priceValue,
      location: field.location,
    });
    setJustAdded(field.id);
    window.setTimeout(() => setJustAdded(null), 1500);
  }

  return (
    <section id="lapangan" className="bg-white px-9 py-16 sm:px-14 sm:py-20">
      <h2 className="text-center text-3xl font-medium text-black sm:text-4xl md:text-5xl">
        Sewa Lapangan Impianmu Sekarang
      </h2>

      <form
        onSubmit={handleSearch}
        className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10"
      >
        <FilterSelect
          label="Jenis Permukaan"
          value={draft.surface}
          options={SURFACE_OPTIONS}
          onChange={(value) =>
            setDraft((prev) => ({ ...prev, surface: value }))
          }
        />
        <FilterSelect
          label="Ukuran Lapangan"
          value={draft.size}
          options={SIZE_OPTIONS}
          onChange={(value) => setDraft((prev) => ({ ...prev, size: value }))}
        />
        <FilterSelect
          label="Lokasi"
          value={draft.location}
          options={LOCATION_OPTIONS}
          onChange={(value) =>
            setDraft((prev) => ({ ...prev, location: value }))
          }
        />
        <DatePicker
          label="Tanggal Main"
          value={playDate}
          onChange={setPlayDate}
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="group flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          <Search
            className="size-4 transition-transform duration-300 group-hover:scale-110"
            strokeWidth={2}
          />
          Cari
        </motion.button>
      </form>

      <AnimatePresence mode="wait">
        {results.length > 0 ? (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:mt-14 md:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {results.map((field, index) => (
                <motion.div
                  key={field.name}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  className="flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-indigo-50">
                    <Image
                      src={field.image}
                      alt={field.alt}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  <p className="mt-4 font-medium text-black">{field.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Tersedia di venue kami
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-black">
                      {field.price}
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => handleAddToCart(field)}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.92 }}
                      aria-label={`Pesan sekarang ${field.name}`}
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-300",
                        justAdded === field.id
                          ? "bg-emerald-600"
                          : "bg-zinc-900 hover:bg-zinc-800",
                      )}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {justAdded === field.id ? (
                          <motion.span
                            key="check"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Check className="size-4" strokeWidth={2.25} />
                          </motion.span>
                        ) : (
                          <motion.span
                            key="cart"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            <ShoppingCart
                              className="size-4"
                              strokeWidth={1.75}
                            />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-zinc-200 py-16 text-center sm:mt-14"
          >
            <p className="text-sm text-zinc-500">
              Tidak ada lapangan yang cocok dengan filter kamu.
            </p>
            <motion.button
              type="button"
              onClick={handleReset}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-50"
            >
              <RotateCcw
                className="size-4 transition-transform duration-500 group-hover:-rotate-180"
                strokeWidth={1.75}
              />
              Reset filter
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
