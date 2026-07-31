"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const faqs = [
  {
    q: "O que é o StudyFlow?",
    a: "O StudyFlow é uma plataforma unificada de estudos que combina flashcards, mapas mentais, testes e monitoramento de progresso em uma só interface simples e visual.",
  },
  {
    q: "Para quem o StudyFlow é indicado?",
    a: "É indicado para estudantes de todos os níveis: vestibulandos, concurseiros, universitários e profissionais em constante aprendizado.",
  },
  {
    q: "Preciso instalar algum programa para usar?",
    a: "Não. O StudyFlow funciona diretamente no seu navegador, sem necessidade de downloads ou instalações complicadas.",
  },
  {
    q: "Posso acessar pelo celular?",
    a: "Sim! A plataforma é totalmente responsiva e otimizada para funcionar perfeitamente em smartphones, tablets e computadores.",
  },
  {
    q: "Como funciona a assinatura?",
    a: "O StudyFlow opera mediante assinatura para garantir acesso contínuo a todas as ferramentas, funcionalidades e atualizações.",
  },
  {
    q: "Como posso cancelar minha assinatura Pro se quiser?",
    a: "O cancelamento pode ser feito a qualquer momento diretamente pelas configurações da sua conta, sem burocracia ou taxas de fidelidade.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const previousScrollbarGutter =
      document.documentElement.style.scrollbarGutter;

    document.documentElement.style.scrollbarGutter = "stable";

    return () => {
      document.documentElement.style.scrollbarGutter =
        previousScrollbarGutter;
    };
  }, []);

  const toggleFAQ = (index: number) => {
    const nextState = openIndex === index ? null : index;

    setOpenIndex(nextState);

    trackEvent("faq_toggle", {
      index,
      open: nextState !== null,
    });
  };

  return (
    <section
      id="faq"
      className="w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight mb-4">
            Dúvidas Frequentes
          </h2>

          <p className="text-lg text-text-muted">
            Respostas claras para você começar a estudar sem incertezas.
          </p>
        </div>

        <div className="w-full space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.q}
                className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="min-w-0 text-lg font-bold text-text-main">
                    {faq.q}
                  </span>

                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-text-muted transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                      }}
                      className="w-full"
                    >
                      <div className="w-full px-6 pb-6 pt-0 text-base text-text-muted leading-relaxed border-t border-slate-100/80">
                        <p className="pt-4">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}