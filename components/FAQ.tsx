"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const faqs = [
  {
    q: "O que é o StudyFlow?",
    a: "O StudyFlow é uma plataforma unificada de estudos que combina flashcards, mapas mentais, testes e monitoramento de progresso em uma só interface simples e visual."
  },
  {
    q: "Para quem o StudyFlow é indicado?",
    a: "É indicado para estudantes de todos os níveis: vestibulandos, concurseiros, universitários e profissionais em constante aprendizado."
  },
  {
    q: "Preciso instalar algum programa para usar?",
    a: "Não. O StudyFlow funciona diretamente no seu navegador, sem necessidade de downloads ou instalações complicadas."
  },
  {
    q: "Posso acessar pelo celular?",
    a: "Sim! A plataforma é totalmente responsiva e otimizada para funcionar perfeitamente em smartphones, tablets e computadores."
  },
  {
    q: "Como funciona a assinatura?",
    a: "O StudyFlow opera mediante assinatura para garantir acesso contínuo a todas as ferramentas, funcionalidades e atualizações."
  },
  {
    q: "Como posso cancelar minha assinatura Pro se quiser?",
    a: "O cancelamento pode ser feito a qualquer momento diretamente pelas configurações da sua conta, sem burocracia ou taxas de fidelidade."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    const nextState = openIndex === index ? null : index;
    setOpenIndex(nextState);
    trackEvent("faq_toggle", { index, open: nextState !== null });
  };

  return (
    <section id="faq" className="py-20 md:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight mb-4">
          Dúvidas Frequentes
        </h2>
        <p className="text-base text-text-muted">
          Respostas claras para você começar a estudar sem incertezas.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="text-base font-bold text-text-main">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-text-muted transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 pt-0 text-sm text-text-muted leading-relaxed border-t border-slate-100/80">
                      <p className="pt-4">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}