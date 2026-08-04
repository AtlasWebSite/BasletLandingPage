"use client";

import { motion } from "framer-motion";
import { ArrowRight, Layers, GitMerge, CheckSquare, BarChart2, FolderKanban } from "lucide-react";
import { APP_URL } from "@/data/pricingData";
import { trackEvent } from "@/lib/analytics";

const bentoItems = [
  {
    title: "Flashcards",
    subtitle: "Revise de forma ativa",
    description: "Cartões interativos que facilitam a fixação de conceitos e a repetição espaçada.",
    icon: Layers,
    colSpan: "md:col-span-2",
    accentColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    title: "Mapas Mentais",
    subtitle: "Veja como as ideias se conectam",
    description: "Estruture temas complexos visualmente com nós e relacionamentos claros.",
    icon: GitMerge,
    colSpan: "md:col-span-1",
    accentColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    title: "Testes e Quizzes",
    subtitle: "Descubra o que realmente aprendeu",
    description: "Simule situações reais de prova e valide o seu conhecimento.",
    icon: CheckSquare,
    colSpan: "md:col-span-1",
    accentColor: "text-accent",
    bgColor: "bg-accent/5",
    borderColor: "border-accent/20",
  },
  {
    title: "Acompanhamento de Progresso",
    subtitle: "Acompanhe sua evolução",
    description: "Métricas diárias e gráficos animados para manter o ritmo constante.",
    icon: BarChart2,
    colSpan: "md:col-span-1",
    accentColor: "text-progress",
    bgColor: "bg-progress/5",
    borderColor: "border-progress/20",
  },
  {
    title: "Organização Unificada",
    subtitle: "Tudo em um só lugar",
    description: "Agrupe seus tópicos por matérias, vestibulares, concursos ou certificações.",
    icon: FolderKanban,
    colSpan: "md:col-span-1",
    accentColor: "text-text-main",
    bgColor: "bg-slate-100/80",
    borderColor: "border-slate-200",
  },
];

export default function BentoGrid() {
  return (
    <section id="recursos" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-text-main sm:text-4xl">
          Tudo o que você precisa para aprender mais em menos tempo
        </h2>
        <p className="text-base sm:text-lg text-text-muted">
          Cada recurso foi projetado para se conectar aos outros, criando uma rotina fluida e eficiente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bentoItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`glass-card group flex flex-col justify-between p-6 sm:p-8 ${item.colSpan}`}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center mb-6`}>
                  <Icon size={24} className={item.accentColor} />
                </div>
                <span className="text-sm font-bold text-text-muted block mb-1">{item.subtitle}</span>
                <h3 className="text-2xl font-bold text-text-main mb-3">{item.title}</h3>
                <p className="text-base text-text-muted leading-relaxed">{item.description}</p>
              </div>

              <a
                href={APP_URL}
                onClick={() => trackEvent("resource_cta_click", { resource: item.title })}
                aria-label={`Explorar ${item.title} no aplicativo`}
                className="mt-8 flex min-h-11 items-center justify-between border-t border-slate-100 pt-6 text-sm font-semibold text-blue-600 transition-transform group-hover:translate-x-1"
              >
                <span>Explorar recurso no App</span>
                <ArrowRight size={16} />
              </a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
