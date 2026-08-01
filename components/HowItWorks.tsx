"use client";

import { motion } from "framer-motion";
import { PlusCircle, FolderTree, PlayCircle, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Crie ou escolha um conteúdo",
    description: "Insira suas anotações ou tópicos de estudo diretamente na plataforma.",
    icon: PlusCircle,
  },
  {
    number: "02",
    title: "Organize do seu jeito",
    description: "Estruture em cadernos, crie mapas mentais e separe por disciplinas.",
    icon: FolderTree,
  },
  {
    number: "03",
    title: "Pratique e revise",
    description: "Utilize os flashcards e testes interativos para consolidar o aprendizado.",
    icon: PlayCircle,
  },
  {
    number: "04",
    title: "Acompanhe seu progresso",
    description: "Monitore suas métricas de retenção e veja sua evolução diária.",
    icon: TrendingUp,
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1 rounded-full">
            Fluxo de Estudo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight mt-4 mb-3">
            Como funciona na prática
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            Quatro passos simples para transformar qualquer assunto complexo em domínio definitivo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-primary/30">{step.number}</span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary shadow-sm">
                      <Icon size={20} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-text-main mb-2">{step.title}</h3>
                  <p className="text-sm sm:text-base text-text-muted leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}