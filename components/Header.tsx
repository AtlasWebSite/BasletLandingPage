"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { APP_URL } from "@/data/pricingData";
import { trackEvent } from "@/lib/analytics";

const navLinks = [
  { name: "Recursos", href: "#recursos" },
  { name: "Como funciona", href: "#como-funciona" },
  { name: "Comparativo", href: "#comparativo" },
  { name: "Planos", href: "#planos" },
  { name: "FAQ", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const scrollAnimationRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const animateScrollTo = (targetY: number, duration = 900) => {
    if (scrollAnimationRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationRef.current);
    }

    const startY = window.scrollY;
    const maxScrollY =
      document.documentElement.scrollHeight - window.innerHeight;
    const destinationY = Math.min(Math.max(targetY, 0), maxScrollY);
    const distance = destinationY - startY;
    const startTime = performance.now();

    const easeInOutCubic = (progress: number) => {
      if (progress < 0.5) {
        return 4 * progress * progress * progress;
      }

      return 1 - Math.pow(-2 * progress + 2, 3) / 2;
    };

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        scrollAnimationRef.current = window.requestAnimationFrame(step);
        return;
      }

      scrollAnimationRef.current = null;
    };

    scrollAnimationRef.current = window.requestAnimationFrame(step);
  };

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();

    const target = document.querySelector<HTMLElement>(href);

    if (!target) {
      return;
    }

    setMobileMenu(false);

    const headerOffset = 112;
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;

    animateScrollTo(targetPosition);
    window.history.replaceState(null, "", href);
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 border-b py-5 transition-all duration-500 md:py-6 ${
        scrolled
          ? "border-transparent bg-white/10 shadow-none backdrop-blur-md"
          : "border-slate-200/70 bg-white/95 shadow-sm backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/favicon.ico"
            alt="StudyFlow"
            width={40}
            height={40}
            priority
            className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <span className="flex items-center gap-1 text-xl font-bold tracking-tight text-text-main">
            StudyFlow
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              className="py-2 text-base font-medium text-text-muted transition-colors hover:text-blue-600"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={APP_URL}
            onClick={() =>
              trackEvent("app_access", { location: "header_login" })
            }
            className="rounded-full px-4 py-2.5 text-base font-semibold text-text-muted transition-colors hover:text-text-main"
          >
            Entrar
          </a>

          <a
            href={APP_URL}
            onClick={() => trackEvent("cta_header_click")}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02] hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
          >
            <span>Começar agora</span>
            <ArrowRight size={17} />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenu((current) => !current)}
          aria-label={mobileMenu ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileMenu}
          className="rounded-xl p-2.5 text-text-main transition-colors hover:bg-slate-100/80 md:hidden"
        >
          {mobileMenu ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-slate-200 bg-white/95 shadow-xl backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-3 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className="border-b border-slate-100 py-3 text-base font-medium text-text-main transition-colors hover:text-blue-600"
                >
                  {link.name}
                </a>
              ))}

              <div className="flex flex-col gap-3 pt-3">
                <a
                  href={APP_URL}
                  onClick={() => {
                    trackEvent("app_access", {
                      location: "mobile_menu_login",
                    });
                    setMobileMenu(false);
                  }}
                  className="w-full rounded-xl border border-slate-200 py-3 text-center font-semibold text-text-main transition-colors hover:bg-slate-50"
                >
                  Entrar no aplicativo
                </a>

                <a
                  href={APP_URL}
                  onClick={() => {
                    trackEvent("cta_header_click", {
                      location: "mobile_menu",
                    });
                    setMobileMenu(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-700"
                >
                  <span>Começar agora</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
