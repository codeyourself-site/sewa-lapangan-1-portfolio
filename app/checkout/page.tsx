"use client";

import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/app/context/cart-context";
import { cn, formatRupiah } from "@/lib/utils";

const SERVICE_FEE = 5000;

interface PaymentMethod {
  id: string;
  label: string;
  badgeText: string;
  badgeClass: string;
}

interface PaymentGroup {
  title: string;
  description: string;
  methods: PaymentMethod[];
}

const PAYMENT_GROUPS: PaymentGroup[] = [
  {
    title: "QRIS",
    description: "Bayar dengan scan QR dari aplikasi apa saja",
    methods: [
      { id: "qris", label: "QRIS", badgeText: "QR", badgeClass: "bg-rose-600" },
    ],
  },
  {
    title: "E-Wallet",
    description: "Bayar langsung dari saldo e-wallet kamu",
    methods: [
      {
        id: "gopay",
        label: "GoPay",
        badgeText: "GP",
        badgeClass: "bg-sky-500",
      },
      {
        id: "ovo",
        label: "OVO",
        badgeText: "OVO",
        badgeClass: "bg-purple-600",
      },
      {
        id: "dana",
        label: "DANA",
        badgeText: "DANA",
        badgeClass: "bg-blue-500",
      },
      {
        id: "shopeepay",
        label: "ShopeePay",
        badgeText: "SP",
        badgeClass: "bg-orange-500",
      },
    ],
  },
  {
    title: "Virtual Account",
    description: "Transfer via ATM, m-banking, atau internet banking",
    methods: [
      { id: "bca", label: "BCA", badgeText: "BCA", badgeClass: "bg-blue-700" },
      {
        id: "mandiri",
        label: "Mandiri",
        badgeText: "MDR",
        badgeClass: "bg-amber-500",
      },
      {
        id: "bni",
        label: "BNI",
        badgeText: "BNI",
        badgeClass: "bg-orange-600",
      },
      { id: "bri", label: "BRI", badgeText: "BRI", badgeClass: "bg-blue-600" },
    ],
  },
  {
    title: "Kartu Kredit/Debit",
    description: "Visa, Mastercard, atau kartu berlogo GPN",
    methods: [
      {
        id: "card",
        label: "Kartu Kredit/Debit",
        badgeText: "",
        badgeClass: "bg-zinc-800",
      },
    ],
  },
];

const ALL_METHODS = PAYMENT_GROUPS.flatMap((group) => group.methods);
const EWALLET_IDS = ["gopay", "ovo", "dana", "shopeepay"];
const VA_IDS = ["bca", "mandiri", "bni", "bri"];
const VA_PREFIXES: Record<string, string> = {
  bca: "39012",
  mandiri: "88608",
  bni: "8808",
  bri: "26216",
};

interface CardDetails {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
}

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length <= 2
    ? digits
    : `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

// Dummy/placeholder logo: no real payment-provider artwork is bundled, just
// a colored badge with the method's initials (or a generic card icon).
function PaymentBadge({
  method,
  className,
}: {
  method: PaymentMethod;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-lg text-[9px] leading-none font-bold text-white",
        method.badgeClass,
        className,
      )}
    >
      {method.id === "card" ? (
        <CreditCard className="size-4" strokeWidth={1.75} />
      ) : (
        method.badgeText
      )}
    </span>
  );
}

// Purely decorative fake QR pattern (no real payment data encoded) so the
// QRIS flow has something to "scan" without needing an external asset.
function DummyQr({ size = 176 }: { size?: number }) {
  const grid = 21;
  const finderSize = 7;
  const corners = [
    [0, 0],
    [grid - finderSize, 0],
    [0, grid - finderSize],
  ];

  const isFinder = (x: number, y: number) =>
    corners.some(
      ([cx, cy]) =>
        x >= cx && x < cx + finderSize && y >= cy && y < cy + finderSize,
    );

  const [cells, setCells] = useState<boolean[][]>(() =>
    Array.from({ length: grid }, () => Array<boolean>(grid).fill(false)),
  );

  useEffect(() => {
    // Randomized purely for decoration, so it must run post-render (not
    // during render, which React requires to stay pure/idempotent).
    function fillRandomPattern() {
      setCells(
        Array.from({ length: grid }, () =>
          Array.from({ length: grid }, () => Math.random() > 0.5),
        ),
      );
    }
    fillRandomPattern();
  }, []);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${grid} ${grid}`}
      shapeRendering="crispEdges"
      className="rounded-xl border border-zinc-200"
    >
      <rect width={grid} height={grid} fill="white" />
      {cells.map((row, y) =>
        row.map((filled, x) => {
          if (!filled || isFinder(x, y)) return null;
          return (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill="black"
            />
          );
        }),
      )}
      {corners.map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <rect
            x={cx}
            y={cy}
            width={finderSize}
            height={finderSize}
            fill="black"
          />
          <rect
            x={cx + 1}
            y={cy + 1}
            width={finderSize - 2}
            height={finderSize - 2}
            fill="white"
          />
          <rect
            x={cx + 2}
            y={cy + 2}
            width={finderSize - 4}
            height={finderSize - 4}
            fill="black"
          />
        </g>
      ))}
    </svg>
  );
}

function PaymentDetail({
  method,
  total,
  vaNumber,
  card,
  setCard,
}: {
  method: PaymentMethod;
  total: number;
  vaNumber: string;
  card: CardDetails;
  setCard: Dispatch<SetStateAction<CardDetails>>;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard?.writeText(vaNumber).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  if (method.id === "qris") {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <DummyQr />
        <p className="max-w-xs text-sm text-zinc-600">
          Scan kode QR di atas pakai aplikasi e-wallet atau m-banking mana saja
          yang mendukung QRIS.
        </p>
        <p className="text-lg font-semibold text-black">
          {formatRupiah(total)}
        </p>
      </div>
    );
  }

  if (EWALLET_IDS.includes(method.id)) {
    return (
      <div className="flex items-center gap-4">
        <PaymentBadge method={method} className="size-12 rounded-xl text-xs" />
        <div className="flex-1">
          <p className="text-sm font-medium text-black">
            Bayar dengan {method.label}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Setelah klik &quot;Bayar Sekarang&quot;, kamu akan diarahkan ke
            aplikasi {method.label} untuk konfirmasi pembayaran sebesar{" "}
            {formatRupiah(total)}.
          </p>
        </div>
      </div>
    );
  }

  if (VA_IDS.includes(method.id)) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <PaymentBadge
            method={method}
            className="size-12 rounded-xl text-xs"
          />
          <div>
            <p className="text-sm font-medium text-black">
              Virtual Account {method.label}
            </p>
            <p className="text-xs text-zinc-500">
              Nomor VA dibuat khusus untuk transaksi ini
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3">
          <span className="font-mono text-base font-semibold tracking-wider text-black">
            {vaNumber}
          </span>
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-200"
          >
            {copied ? (
              <Check className="size-3.5" strokeWidth={2.5} />
            ) : (
              <Copy className="size-3.5" strokeWidth={1.75} />
            )}
            {copied ? "Tersalin" : "Salin"}
          </motion.button>
        </div>

        <ol className="list-decimal space-y-1 pl-4 text-xs text-zinc-500">
          <li>Buka aplikasi m-banking atau kunjungi ATM {method.label}.</li>
          <li>Pilih menu Transfer &gt; Virtual Account.</li>
          <li>
            Masukkan nomor VA di atas, lalu konfirmasi pembayaran sebesar{" "}
            {formatRupiah(total)}.
          </li>
        </ol>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
        <span className="text-zinc-500">Nomor Kartu</span>
        <input
          value={card.number}
          onChange={(event) =>
            setCard((prev) => ({
              ...prev,
              number: formatCardNumber(event.target.value),
            }))
          }
          placeholder="1234 5678 9012 3456"
          inputMode="numeric"
          maxLength={19}
          className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-black transition-colors outline-none focus:border-zinc-400"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-zinc-500">Masa Berlaku</span>
        <input
          value={card.expiry}
          onChange={(event) =>
            setCard((prev) => ({
              ...prev,
              expiry: formatExpiry(event.target.value),
            }))
          }
          placeholder="MM/YY"
          inputMode="numeric"
          maxLength={5}
          className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-black transition-colors outline-none focus:border-zinc-400"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-zinc-500">CVV</span>
        <input
          value={card.cvv}
          onChange={(event) =>
            setCard((prev) => ({
              ...prev,
              cvv: event.target.value.replace(/\D/g, "").slice(0, 3),
            }))
          }
          placeholder="123"
          inputMode="numeric"
          maxLength={3}
          className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-black transition-colors outline-none focus:border-zinc-400"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
        <span className="text-zinc-500">Nama Pemilik Kartu</span>
        <input
          value={card.name}
          onChange={(event) =>
            setCard((prev) => ({ ...prev, name: event.target.value }))
          }
          placeholder="Sesuai kartu"
          className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-black transition-colors outline-none focus:border-zinc-400"
        />
      </label>
    </div>
  );
}

function SuccessScreen({
  orderCode,
  total,
}: {
  orderCode: string;
  total: number;
}) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-white px-9 py-20 text-center sm:px-14">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="flex size-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
      >
        <CheckCircle2 className="size-10" strokeWidth={1.5} />
      </motion.div>

      <div>
        <h1 className="text-2xl font-medium text-black sm:text-3xl">
          Pembayaran Berhasil
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Kode booking kamu{" "}
          <span className="font-mono font-semibold text-black">
            {orderCode}
          </span>
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 px-6 py-4">
        <p className="text-xs text-zinc-400">Total Dibayar</p>
        <p className="mt-1 text-xl font-semibold text-black">
          {formatRupiah(total)}
        </p>
      </div>

      <p className="max-w-sm text-sm text-zinc-500">
        Detail booking sudah kami kirim ke WhatsApp kamu. Sampai jumpa di
        lapangan!
      </p>
    </main>
  );
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [contact, setContact] = useState({ name: "", whatsapp: "", email: "" });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [card, setCard] = useState<CardDetails>({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [status, setStatus] = useState<"form" | "processing" | "success">(
    "form",
  );
  const [orderCode, setOrderCode] = useState("");
  const [paidTotal, setPaidTotal] = useState(0);

  const selectedMethod = ALL_METHODS.find((m) => m.id === selectedId) ?? null;
  const total = totalPrice + (items.length > 0 ? SERVICE_FEE : 0);

  const [vaNumber, setVaNumber] = useState("");

  useEffect(() => {
    // Generates a fresh VA number whenever a VA method is (re)selected —
    // random, so it must run post-render rather than during render.
    function generateVaNumber() {
      if (!selectedMethod || !VA_IDS.includes(selectedMethod.id)) {
        setVaNumber("");
        return;
      }
      const prefix = VA_PREFIXES[selectedMethod.id];
      const suffix = Math.floor(1000000 + Math.random() * 9000000).toString();
      setVaNumber(`${prefix}${suffix}`);
    }
    generateVaNumber();
  }, [selectedMethod]);

  const cardFilled =
    card.number.replace(/\s/g, "").length >= 12 &&
    card.expiry.length === 5 &&
    card.cvv.length >= 3 &&
    card.name.trim().length > 1;

  const canPay =
    contact.name.trim().length > 1 &&
    contact.whatsapp.trim().length > 6 &&
    selectedMethod !== null &&
    (selectedMethod.id !== "card" || cardFilled);

  function handlePay() {
    if (!canPay) return;
    setStatus("processing");
    // Freeze the amount before clearing the cart — `total` is derived from
    // live cart state, so it would read back as 0 once clearCart() empties it.
    setPaidTotal(total);
    window.setTimeout(() => {
      setOrderCode(
        `GL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      );
      setStatus("success");
      clearCart();
    }, 1400);
  }

  if (status === "success") {
    return <SuccessScreen orderCode={orderCode} total={paidTotal} />;
  }

  if (items.length === 0) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center gap-4 bg-white px-9 py-20 text-center sm:px-14">
        <p className="text-sm text-zinc-500">
          Keranjang kamu masih kosong, belum ada yang bisa dibayar.
        </p>
        <Link
          href="/cart"
          className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Kembali ke Keranjang
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-svh bg-white px-9 pt-28 pb-16 sm:px-14 sm:pt-36 sm:pb-20">
      <Link
        href="/cart"
        className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-black"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        Kembali ke Keranjang
      </Link>

      <h1 className="mt-4 text-3xl font-medium text-black sm:text-4xl">
        Pembayaran
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="font-medium text-black">Detail Pemesan</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
                <span className="text-zinc-500">Nama Lengkap</span>
                <input
                  value={contact.name}
                  onChange={(event) =>
                    setContact((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Nama sesuai KTP"
                  className="rounded-xl border border-zinc-200 px-4 py-2.5 text-black transition-colors outline-none focus:border-zinc-400"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="text-zinc-500">No. WhatsApp</span>
                <input
                  value={contact.whatsapp}
                  onChange={(event) =>
                    setContact((prev) => ({
                      ...prev,
                      whatsapp: event.target.value,
                    }))
                  }
                  placeholder="08xxxxxxxxxx"
                  inputMode="numeric"
                  className="rounded-xl border border-zinc-200 px-4 py-2.5 text-black transition-colors outline-none focus:border-zinc-400"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="text-zinc-500">Email (opsional)</span>
                <input
                  value={contact.email}
                  onChange={(event) =>
                    setContact((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  placeholder="nama@email.com"
                  type="email"
                  className="rounded-xl border border-zinc-200 px-4 py-2.5 text-black transition-colors outline-none focus:border-zinc-400"
                />
              </label>
            </div>
          </section>

          <section>
            <h2 className="font-medium text-black">Metode Pembayaran</h2>
            <div className="mt-4 flex flex-col gap-6">
              {PAYMENT_GROUPS.map((group) => (
                <div key={group.title}>
                  <p className="text-sm font-medium text-black">
                    {group.title}
                  </p>
                  <p className="text-xs text-zinc-400">{group.description}</p>
                  <div className="mt-3 flex flex-col gap-2.5">
                    {group.methods.map((method) => {
                      const active = selectedId === method.id;
                      return (
                        <div
                          key={method.id}
                          className={cn(
                            "overflow-hidden rounded-xl border transition-colors",
                            active ? "border-zinc-900" : "border-zinc-200",
                          )}
                        >
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.99 }}
                            onClick={() =>
                              setSelectedId(active ? null : method.id)
                            }
                            className={cn(
                              "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
                              active ? "bg-zinc-50" : "hover:bg-zinc-50",
                            )}
                          >
                            <PaymentBadge method={method} />
                            <span className="flex-1 text-sm font-medium text-black">
                              {method.label}
                            </span>
                            <span
                              className={cn(
                                "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                                active
                                  ? "border-zinc-900 bg-zinc-900"
                                  : "border-zinc-300",
                              )}
                            >
                              {active && (
                                <Check
                                  className="size-3 text-white"
                                  strokeWidth={3}
                                />
                              )}
                            </span>
                          </motion.button>

                          <AnimatePresence initial={false}>
                            {active && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.25,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                                className="overflow-hidden border-t border-zinc-200 bg-zinc-50"
                              >
                                <div className="p-5 sm:p-6">
                                  <PaymentDetail
                                    method={method}
                                    total={total}
                                    vaNumber={vaNumber}
                                    card={card}
                                    setCard={setCard}
                                  />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="h-fit rounded-2xl border border-zinc-200 p-5 sm:p-6 lg:sticky lg:top-28">
          <p className="font-medium text-black">Ringkasan Pesanan</p>

          <div className="mt-4 flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-indigo-50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-black">
                    {item.name}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {item.quantity}x {formatRupiah(item.price)}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-medium text-black">
                  {formatRupiah(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-2 border-t border-zinc-200 pt-4 text-sm">
            <div className="flex items-center justify-between text-zinc-500">
              <span>Subtotal</span>
              <span>{formatRupiah(totalPrice)}</span>
            </div>
            <div className="flex items-center justify-between text-zinc-500">
              <span>Biaya Layanan</span>
              <span>{formatRupiah(SERVICE_FEE)}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-zinc-200 pt-4">
            <span className="font-medium text-black">Total Bayar</span>
            <span className="text-lg font-semibold text-black">
              {formatRupiah(total)}
            </span>
          </div>

          <motion.button
            type="button"
            disabled={!canPay || status === "processing"}
            onClick={handlePay}
            whileHover={canPay ? { scale: 1.02 } : undefined}
            whileTap={canPay ? { scale: 0.97 } : undefined}
            className={cn(
              "mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-colors",
              canPay
                ? "bg-zinc-900 text-white hover:bg-zinc-800"
                : "cursor-not-allowed bg-zinc-100 text-zinc-400",
            )}
          >
            {status === "processing" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Memproses...
              </>
            ) : (
              "Bayar Sekarang"
            )}
          </motion.button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-zinc-400">
            <ShieldCheck className="size-3.5" strokeWidth={1.75} />
            Transaksi kamu aman &amp; terenkripsi
          </p>
        </div>
      </div>
    </main>
  );
}
