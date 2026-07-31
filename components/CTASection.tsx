"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { APP_URL } from "@/data/pricingData";
import { trackEvent } from "@/lib/analytics";

export default function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white via-primary/5 to-background border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold mb-6">
          <Sparkles size={14} />
          <span>Sua nova rotina de estudos</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight leading-tight mb-6">
          Seu próximo estudo pode começar <br className="hidden sm:inline" />
          <span className="text-primary">mais organizado.</span>
        </h2>

        <p className="text-base sm:text-lg text-text-muted max-w-xl mx-auto mb-10">
          Entre na plataforma oficial e experimente como é ter flashcards, mapas mentais e testes em perfeito fluxo.
        </p>

        <a
          href={APP_URL}
          onClick={() => trackEvent("cta_final_click")}
          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-9 py-4 rounded-full font-bold text-base transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <span>Começar agora no StudyFlow</span>
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}