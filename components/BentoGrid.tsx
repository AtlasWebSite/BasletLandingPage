"use client";

import { motion } from "framer-motion";
import { Layers, GitMerge, CheckSquare, BarChart2, FolderKanban } from "lucide-react";

const bentoItems = [
  {
    title: "Flashcards",
    subtitle: "Revise de forma ativa",
    description: "Cartões interativos que facilitam a fixação de conceitos e a repetição espaçada.",
    icon: Layers,
    colSpan: "md:col-span-2",
    accentColor: "text-primary",
    bgColor: "bg-primary/5",
    borderColor: "border-primary/20",
  },
  {
    title: "Mapas Mentais",
    subtitle: "Veja como as ideias se conectam",
    description: "Estruture temas complexos visualmente com nós e relacionamentos claros.",
    icon: GitMerge,
    colSpan: "md:col-span-1",
    accentColor: "text-secondary",
    bgColor: "bg-secondary/5",
    borderColor: "border-secondary/20",
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
        <span className="text-sm font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1 rounded-full">
          Funcionalidades Integradas
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight mt-4 mb-3">
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
              className={`glass-card p-8 flex flex-col justify-between group ${item.colSpan}`}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center mb-6`}>
                  <Icon size={24} className={item.accentColor} />
                </div>
                <span className="text-sm font-bold text-text-muted block mb-1">{item.subtitle}</span>
                <h3 className="text-2xl font-bold text-text-main mb-3">{item.title}</h3>
                <p className="text-base text-text-muted leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform">
                <span>Explorar recurso no App</span>
                <span>→</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}