import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import UserIcon from "../../../../../public/assets/icons/user-icon";
import useInitAuthStore from "@/app/store/InitAuthStore";
import MenuDropdown from "./MenuDropdown";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { title: "Home", href: "/" },
  { title: "Why choose us", href: "#why-choose" },
  { title: "Features", href: "#features" },
  { title: "FAQs", href: "#faqs" },
  { title: "Contact", href: "#contact" },
];

const MobileNav = () => {
  const { isAuthenticated } = useInitAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const linkVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    closed: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <header className="border-b py-4 px-4 sticky top-0 left-0 z-50 bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/icons/bransquare-logo.svg"
              alt="Brandsquare Logo"
              width={130}
              height={30}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <MenuDropdown />
          ) : (
            <Link href="/auth/create-account" className="hidden md:block">
              <Button className="flex gap-2 bg-[#000051] hover:bg-[#1a1b5e]/90 text-white">
                <UserIcon />
                <span>Sign Up</span>
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="overflow-hidden"
          >
            <motion.nav className="flex flex-col items-center space-y-4 py-4">
              {links.map((item, i) => (
                <motion.div key={i} variants={linkVariants}>
                  <Link href={item.href} onClick={() => setIsOpen(false)}>
                    <Button variant="link" className="text-lg">
                      {item.title}
                    </Button>
                  </Link>
                </motion.div>
              ))}
              {!isAuthenticated && (
                <motion.div variants={linkVariants}>
                  <Link href="/auth/create-account" onClick={() => setIsOpen(false)}>
                    <Button className="flex gap-2 bg-[#000051] hover:bg-[#1a1b5e]/90 text-white">
                      <UserIcon />
                      <span>Sign Up</span>
                    </Button>
                  </Link>
                </motion.div>
              )}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default MobileNav;