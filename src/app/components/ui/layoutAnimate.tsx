"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const layoutVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }, // Smooth fade-in
  exit: { opacity: 0, y: 20, transition: { duration: 0.5, ease: "easeIn" } }, // Animation when navigating away
};

import { ReactNode } from "react";

export default function ClentLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      variants={layoutVariants}
      key={pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`  text-black min-h-screen flex flex-col  `}
    >
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </motion.div>
  );
}
