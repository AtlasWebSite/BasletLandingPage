import Link from "next/link";
import { APP_URL } from "@/data/pricingData";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
            S
          </div>
          <span className="text-base font-bold text-text-main">StudyFlow</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted">
          <a href="#recursos" className="hover:text-primary transition-colors">Recursos</a>
          <a href="#como-funciona" className="hover:text-primary transition-colors">Como funciona</a>
          <a href="#planos" className="hover:text-primary transition-colors">Planos</a>
          <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          <a href={APP_URL} className="hover:text-primary transition-colors">Acessar App</a>
        </div>

        <p className="text-xs text-text-muted">
          © {new Date().getFullYear()} StudyFlow. Todos os direitos reservados.
        </p>

      </div>
    </footer>
  );
}