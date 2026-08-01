import Link from "next/link";
import Image from "next/image";
import { APP_URL } from "@/data/pricingData";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-2">
          <Image
            src="/favicon.ico"
            alt="StudyFlow"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          <span className="text-base font-bold text-text-main">StudyFlow</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted">
          <a href="#recursos" className="hover:text-blue-600 transition-colors">Recursos</a>
          <a href="#como-funciona" className="hover:text-blue-600 transition-colors">Como funciona</a>
          <a href="#planos" className="hover:text-blue-600 transition-colors">Planos</a>
          <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
          <a href={APP_URL} className="hover:text-blue-600 transition-colors">Acessar App</a>
        </div>

        <p className="text-xs text-text-muted">
          © {new Date().getFullYear()} StudyFlow. Todos os direitos reservados.
        </p>

      </div>
    </footer>
  );
}