"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { motion, AnimatePresence, useReducedMotion, useScroll, useMotionValueEvent } from "motion/react";

const links = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  
  // Hide nav by default on home page, show on other pages
  const [showNav, setShowNav] = useState(pathname !== "/");

  useEffect(() => {
    if (pathname === "/") {
      setShowNav(window.scrollY > window.innerHeight * 0.4);
    } else {
      setShowNav(true);
    }
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (pathname === "/") {
      setShowNav(latest > window.innerHeight * 0.4);
    } else {
      setShowNav(true);
    }
  });

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      
      <AnimatePresence>
        {showNav && (
          <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border-default bg-bg-primary/90 backdrop-blur-xl backdrop-saturate-150"
          >
            <div className="mx-auto flex h-full max-w-[1120px] items-center justify-between px-6 sm:px-8 lg:px-12">
              <Link
                href="/"
                className="text-[15px] font-medium text-text-primary transition-colors duration-150 hover:text-accent"
              >
                Harsh Aghara
              </Link>

              {/* Desktop nav */}
              <div className="hidden items-center gap-8 lg:flex">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[15px] font-medium transition-colors duration-150 ${
                      pathname.startsWith(link.href)
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="mailto:harsh.aghara44@gmail.com"
                  className="text-[15px] font-medium text-accent transition-colors duration-150 hover:text-accent-hover"
                >
                  Get in touch
                </a>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setOpen(true)}
                className="flex h-12 w-12 items-center justify-center rounded-full text-text-secondary lg:hidden"
                aria-label="Open menu"
              >
                <List size={24} />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-bg-primary lg:hidden"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-6 top-5 flex h-12 w-12 items-center justify-center rounded-full text-text-secondary"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center gap-10">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-[22px] font-medium transition-colors duration-150 ${
                      pathname.startsWith(link.href)
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: links.length * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <a
                  href="mailto:harsh.aghara44@gmail.com"
                  className="text-[22px] font-medium text-accent transition-colors duration-150 hover:text-accent-hover"
                  onClick={() => setOpen(false)}
                >
                  Get in touch
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
