"use client";
import { motion } from "framer-motion";
import { Layers, GitMerge, CheckCircle, BarChart3, FolderHeart } from "lucide-react";

const features = [
  {
    title: "Flashcards",
    desc: "Revise de forma ativa. Cartões inteligentes que se adaptam ao seu ritmo.",
    icon: Layers,
    colSpan: "md:col-span-2",
    color: "text-primary",
  },
  {
    title: "Mapas Mentais",
    desc: "Veja como as ideias se conectam de forma visual e fluida.",
    icon: GitMerge,
    colSpan: "md:col-span-1",
    color: "text-secondary",
  },
  {
    title: "Testes",
    desc: "Descubra o que você realmente aprendeu antes da prova.",
    icon: CheckCircle,
    colSpan: "md:col-span-1",
    color: "text-accent",
  },
  {
    title: "Progresso",
    desc: "Acompanhe sua evolução diária com gráficos detalhados.",
    icon: BarChart3,
    colSpan: "md:col-span-1",
    color: "text-progress",
  },
  {
    title: "Organização",
    desc: "Tudo em um só lugar. Adeus links e anotações perdidas.",
    icon: FolderHeart,
    colSpan: "md:col-span-1",
    color: "text-text-muted",
  }
];

export default function BentoGrid() {
  return (
    <section id="recursos" className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Estudar não deveria significar <br/><span className="text-text-dark">se perder entre anotações.</span></h2>
        <p className="text-text-dark max-w-2xl mx-auto text-lg">Um ambiente unificado que conecta todas as etapas do seu aprendizado.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`glass-card p-8 flex flex-col justify-between group hover:border-white/20 transition-all ${feat.colSpan}`}
          >
            <div className="mb-8">
              <feat.icon size={32} className={`${feat.color} mb-6`} />
              <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
              <p className="text-text-dark">{feat.desc}</p>
            </div>
            {/* Espaço para ilustração abstrata/mockup */}
            <div className="w-full h-32 bg-white/5 rounded-xl border border-white/5 group-hover:bg-white/10 transition-colors" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}