"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getLenisInstance } from "@/lib/lenis-instance";

const SESSION_KEY = "golin-splash-shown";
const BAR_DURATION = 1.4;
// Brief hold at a fully-filled bar before sliding away, so the "finish"
// state is unmistakable rather than the exit cutting straight in.
const HOLD_AFTER_FILL = 0.35;

export function SplashScreen() {
  // Starts visible on both server and client render so there is no flash
  // of uncovered content before hydration — client-only logic below then
  // decides whether to keep it (first visit this session) or dismiss it
  // immediately (repeat hard refresh within the same tab session).
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Note: an earlier version awaited this bar's animation imperatively
    // via useAnimate() instead of a plain timer. That hung indefinitely —
    // React Strict Mode runs this effect twice on mount, so two animate()
    // calls raced on the same bar element and neither's promise ever
    // resolved. A timer has no such race: Strict Mode's double-invoke is
    // handled correctly by the cleanup below (clearTimeout on the first
    // run's timer), leaving exactly one timer scheduled — and it doesn't
    // depend on the bar's DOM animation to settle anything.
    function skipIfAlreadyShown() {
      let alreadyShown = false;
      try {
        alreadyShown = window.sessionStorage.getItem(SESSION_KEY) === "1";
      } catch {
        // Ignore inaccessible storage (e.g. private browsing restrictions).
      }
      if (alreadyShown) setVisible(false);
      return alreadyShown;
    }

    if (skipIfAlreadyShown()) return;

    getLenisInstance()?.stop();

    const timer = window.setTimeout(
      () => {
        setVisible(false);
        getLenisInstance()?.start();
        try {
          window.sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          // Ignore inaccessible storage.
        }
      },
      (BAR_DURATION + HOLD_AFTER_FILL) * 1000,
    );

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-black"
        >
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            Golin
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-sm text-white/50 italic"
          >
            Booking secepat cetak gol
          </motion.span>

          <div className="mt-2 h-[2px] w-40 overflow-hidden rounded-full bg-white/15 sm:w-48">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: BAR_DURATION, ease: "linear" }}
              className="h-full w-full bg-white"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
