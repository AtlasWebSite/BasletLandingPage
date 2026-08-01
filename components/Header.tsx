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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const scrollAnimationRef = useRef<number | null>(null);

  useEffect(() => {
    let animationFrame: number | null = null;

    const updateHeader = () => {
      const progress = Math.min(window.scrollY / 240, 1);
      setScrollProgress(progress);
      animationFrame = null;
    };

    const handleScroll = () => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateHeader);
    };

    updateHeader();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
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

  const headerPadding = 12 + scrollProgress * 10;
  const headerBackgroundOpacity = 0.96 - scrollProgress * 0.86;
  const headerBorderOpacity = 0.7 * (1 - scrollProgress);
  const headerShadowOpacity = 0.08 * (1 - scrollProgress);
  const headerBlur = 18 - scrollProgress * 6;
  const logoSize = 30 + scrollProgress * 10;
  const brandFontSize = 17 + scrollProgress * 3;
  const brandScale = 0.9 + scrollProgress * 0.1;
  const brandOpacity = 1 - scrollProgress * 0.18;
  const brandGap = 9 + scrollProgress * 3;
  const navFontSize = 15 + scrollProgress;
  const ctaPaddingX = 20 + scrollProgress * 4;
  const ctaPaddingY = 10 + scrollProgress * 2;

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
      className="fixed inset-x-0 top-0 z-50 border-b will-change-[padding,background-color,backdrop-filter]"
      style={{
        paddingTop: `${headerPadding}px`,
        paddingBottom: `${headerPadding}px`,
        backgroundColor: `rgba(255, 255, 255, ${headerBackgroundOpacity})`,
        borderColor: `rgba(226, 232, 240, ${headerBorderOpacity})`,
        boxShadow: `0 1px 20px rgba(15, 23, 42, ${headerShadowOpacity})`,
        backdropFilter: `blur(${headerBlur}px)`,
        WebkitBackdropFilter: `blur(${headerBlur}px)`,
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center will-change-[transform,opacity]"
          style={{
            gap: `${brandGap}px`,
            opacity: brandOpacity,
            transform: `scale(${brandScale})`,
            transformOrigin: "left center",
          }}
        >
          <Image
            src="/favicon.ico"
            alt="StudyFlow"
            width={40}
            height={40}
            priority
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            style={{
              width: `${logoSize}px`,
              height: `${logoSize}px`,
            }}
          />

          <span
            className="flex items-center gap-1 font-bold tracking-tight text-text-main"
            style={{ fontSize: `${brandFontSize}px` }}
          >
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
              className="py-2 font-medium text-text-muted transition-colors hover:text-blue-600"
              style={{ fontSize: `${navFontSize}px` }}
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
            className="flex items-center gap-2 rounded-full bg-blue-600 text-base font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02] hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
            style={{
              paddingLeft: `${ctaPaddingX}px`,
              paddingRight: `${ctaPaddingX}px`,
              paddingTop: `${ctaPaddingY}px`,
              paddingBottom: `${ctaPaddingY}px`,
            }}
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
