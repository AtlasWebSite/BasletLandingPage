"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import { APP_URL } from "@/data/pricingData";

const problems = [
  "Anotações espalhadas em cadernos, blocos de notas e múltiplos aplicativos.",
  "Estudar por horas sem saber o que realmente foi fixado na memória.",
  "Revisões improvisadas na véspera de exames ou provas importantes.",
  "Ausência de clareza sobre o próprio progresso e áreas que precisam de reforço."
];

export default function ProblemSolution() {
  return (
    <section id="comparativo" className="py-20 md:py-28 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight mb-4">
            Estudar não deveria significar <br className="hidden sm:inline" />
            <span className="text-text-muted">se perder entre anotações.</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            O StudyFlow elimina a desorganização e integra todo o seu fluxo de aprendizado em um só lugar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl bg-rose-50/50 border border-rose-200/70 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-bold mb-6">
                <AlertCircle size={14} />
                <span>Sem o StudyFlow</span>
              </div>
              <h3 className="text-xl font-bold text-text-main mb-6">O ciclo da frustração no estudo</h3>
              <ul className="space-y-4">
                {problems.map((prob, index) => (
                  <li key={index} className="flex items-start gap-3 text-base text-text-main">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                    <span>{prob}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-rose-700 font-semibold mt-8 pt-4 border-t border-rose-200/60">
              Resultado: Mais tempo organizando do que aprendendo de verdade.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-white to-progress/10 border border-primary/20 shadow-lg shadow-primary/5 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold mb-6">
                <CheckCircle size={14} />
                <span>Com o StudyFlow</span>
              </div>
              <h3 className="text-xl font-bold text-text-main mb-6">Seu estudo em perfeito fluxo</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-base text-text-main">
                  <CheckCircle size={18} className="text-progress shrink-0 mt-0.5" />
                  <span><strong>Centralização Total:</strong> Flashcards, mapas e testes em uma única conta.</span>
                </li>
                <li className="flex items-start gap-3 text-base text-text-main">
                  <CheckCircle size={18} className="text-progress shrink-0 mt-0.5" />
                  <span><strong>Estudo Ativo:</strong> Pratique a recuperação de memória antes das avaliações.</span>
                </li>
                <li className="flex items-start gap-3 text-base text-text-main">
                  <CheckCircle size={18} className="text-progress shrink-0 mt-0.5" />
                  <span><strong>Visibilidade Clara:</strong> Gráficos e indicadores mostram exatamente sua evolução.</span>
                </li>
                <li className="flex items-start gap-3 text-base text-text-main">
                  <CheckCircle size={18} className="text-progress shrink-0 mt-0.5" />
                  <span><strong>Simplicidade Visual:</strong> Design limpo sem distrações desnecessárias.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200">
              <a
                href={APP_URL}
                className="inline-flex items-center gap-2 text-base font-bold text-primary hover:text-primary/80 transition-colors"
              >
                <span>Entrar em fluxo agora</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}