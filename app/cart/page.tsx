"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/app/context/cart-context";
import { formatRupiah } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <main className="min-h-svh bg-white px-9 pt-28 pb-16 sm:px-14 sm:pt-36 sm:pb-20">
      <h1 className="text-3xl font-medium text-black sm:text-4xl">Keranjang</h1>

      <AnimatePresence mode="wait">
        {items.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-zinc-200 py-20 text-center"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
              <ShoppingCart className="size-6" strokeWidth={1.5} />
            </span>
            <p className="text-sm text-zinc-500">
              Keranjang kamu masih kosong.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/#lapangan"
                className="group flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
              >
                Cari Lapangan
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="items"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]"
          >
            <div className="flex flex-col gap-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-4 rounded-2xl border border-zinc-200 p-3 sm:gap-6 sm:p-4"
                  >
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-indigo-50 sm:size-24">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-black">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {item.location}
                      </p>
                      <p className="mt-2 text-sm font-medium text-black">
                        {formatRupiah(item.price)}
                        <span className="text-zinc-400">/jam</span>
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <div className="flex items-center gap-1 rounded-full border border-zinc-200 p-1">
                        <motion.button
                          type="button"
                          aria-label="Kurangi jumlah"
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="flex size-7 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-100"
                        >
                          <Minus className="size-3.5" strokeWidth={2} />
                        </motion.button>
                        <span className="w-5 text-center text-sm font-medium text-black">
                          {item.quantity}
                        </span>
                        <motion.button
                          type="button"
                          aria-label="Tambah jumlah"
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex size-7 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-100"
                        >
                          <Plus className="size-3.5" strokeWidth={2} />
                        </motion.button>
                      </div>

                      <motion.button
                        type="button"
                        aria-label={`Hapus ${item.name}`}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.id)}
                        className="flex size-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="size-4" strokeWidth={1.75} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="h-fit rounded-2xl border border-zinc-200 p-5 sm:p-6 lg:sticky lg:top-28">
              <p className="font-medium text-black">Ringkasan Pesanan</p>

              <div className="mt-4 flex items-center justify-between text-sm text-zinc-500">
                <span>Subtotal</span>
                <span>{formatRupiah(totalPrice)}</span>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-4">
                <span className="font-medium text-black">Total</span>
                <span className="text-lg font-semibold text-black">
                  {formatRupiah(totalPrice)}
                </span>
              </div>

              <Link href="/checkout">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
                >
                  Lanjut ke Pembayaran
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
