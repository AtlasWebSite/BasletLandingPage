"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { APP_URL } from "@/data/pricingData";
import { trackEvent } from "@/lib/analytics";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Recursos", href: "#recursos" },
    { name: "Como funciona", href: "#como-funciona" },
    { name: "Comparativo", href: "#comparativo" },
    { name: "Planos", href: "#planos" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-header py-3 shadow-sm" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/favicon.ico"
            alt="StudyFlow"
            width={36}
            height={36}
            priority
            className="h-9 w-9 object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-xl font-bold tracking-tight text-text-main flex items-center gap-1">
            StudyFlow
            <span className="w-2 h-2 rounded-full bg-progress"></span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-text-muted hover:text-primary transition-colors py-1"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={APP_URL}
            onClick={() => trackEvent("app_access", { location: "header_login" })}
            className="text-sm font-semibold text-text-muted hover:text-text-main px-4 py-2 rounded-full transition-colors"
          >
            Entrar
          </a>
          <a
            href={APP_URL}
            onClick={() => trackEvent("cta_header_click")}
            className="bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
          >
            <span>Começar agora</span>
            <ArrowRight size={15} />
          </a>
        </div>

        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label={mobileMenu ? "Fechar menu" : "Abrir menu"}
          className="md:hidden p-2 rounded-lg text-text-main hover:bg-slate-100 transition-colors"
        >
          {mobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-b border-slate-200 shadow-xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenu(false)}
                  className="text-base font-medium text-text-main py-2 border-b border-slate-100"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-2">
                <a
                  href={APP_URL}
                  onClick={() => {
                    trackEvent("app_access", { location: "mobile_menu_login" });
                    setMobileMenu(false);
                  }}
                  className="w-full text-center py-3 rounded-xl font-semibold border border-slate-200 text-text-main hover:bg-slate-50 transition-colors"
                >
                  Entrar no aplicativo
                </a>
                <a
                  href={APP_URL}
                  onClick={() => {
                    trackEvent("cta_header_click", { location: "mobile_menu" });
                    setMobileMenu(false);
                  }}
                  className="w-full text-center py-3 rounded-xl font-semibold bg-primary text-white shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <span>Começar agora</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}