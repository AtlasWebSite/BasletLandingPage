"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const APP_URL = "https://app-usestudyflow.vercel.app/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Recursos", href: "#recursos" },
    { name: "Como funciona", href: "#como-funciona" },
    { name: "Planos", href: "#planos" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass-header py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white text-lg">S</span>
          </div>
          StudyFlow
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="text-text-muted hover:text-white text-sm font-medium transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href={APP_URL} className="text-sm font-semibold text-text-muted hover:text-white transition-colors">Entrar</a>
          <a href={APP_URL} className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105">
            Começar agora
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menu">
          {mobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass-header flex flex-col p-6 gap-4 md:hidden"
          >
            {links.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setMobileMenu(false)} className="text-lg font-medium py-2 border-b border-white/5">
                {link.name}
              </Link>
            ))}
            <a href={APP_URL} className="bg-primary text-center text-white px-5 py-3 rounded-xl font-semibold mt-4">
              Começar agora
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}