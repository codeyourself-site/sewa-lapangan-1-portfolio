"use client";

import { type SubmitEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function KontakForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sent");
    window.setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", email: "", message: "" });
    }, 2500);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-zinc-500">Nama Lengkap</span>
        <input
          required
          value={form.name}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, name: event.target.value }))
          }
          placeholder="Nama kamu"
          className="rounded-xl border border-zinc-200 px-4 py-2.5 text-black transition-colors outline-none focus:border-zinc-400"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-zinc-500">Email</span>
        <input
          required
          type="email"
          value={form.email}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="nama@email.com"
          className="rounded-xl border border-zinc-200 px-4 py-2.5 text-black transition-colors outline-none focus:border-zinc-400"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-zinc-500">Pesan</span>
        <textarea
          required
          value={form.message}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, message: event.target.value }))
          }
          placeholder="Ceritakan kebutuhan atau pertanyaan kamu"
          rows={5}
          className="resize-none rounded-xl border border-zinc-200 px-4 py-2.5 text-black transition-colors outline-none focus:border-zinc-400"
        />
      </label>

      <motion.button
        type="submit"
        disabled={status === "sent"}
        whileHover={status === "idle" ? { scale: 1.02 } : undefined}
        whileTap={status === "idle" ? { scale: 0.97 } : undefined}
        className={cn(
          "mt-2 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-colors",
          status === "sent"
            ? "bg-emerald-600 text-white"
            : "bg-zinc-900 text-white hover:bg-zinc-800",
        )}
      >
        {status === "sent" ? (
          <>
            <Check className="size-4" strokeWidth={2.25} />
            Pesan Terkirim
          </>
        ) : (
          <>
            Kirim Pesan
            <ArrowUpRight className="size-4" strokeWidth={1.75} />
          </>
        )}
      </motion.button>
    </form>
  );
}
