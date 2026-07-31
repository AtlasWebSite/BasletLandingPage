"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award, Globe, FileCheck, Layers } from "lucide-react";

const cases = [
  {
    title: "Provas Escolares e Acadêmicas",
    desc: "Organize matérias extensas para provas periódicas e exames universitários.",
    icon: GraduationCap,
  },
  {
    title: "Vestibulares e ENEM",
    desc: "Consolide o conteúdo de múltiplos anos com flashcards e testes práticos.",
    icon: BookOpen,
  },
  {
    title: "Projetos e Trabalhos em Grupo",
    desc: "Memorize legislação, doutrina e jurisprudência através da repetição ativa.",
    icon: FileCheck,
  },
  {
    title: "Idiomas e Vocabulário",
    desc: "Centralize pesquisas escolares, resumos de aulas e anotações conjuntas com colegas de classe.",
    icon: Globe,
  },
  {
    title: "Ensino Médio e Vestibulares",
    desc: "Organize matérias escolares, cronogramas de provas e revise o conteúdo cobrado no ENEM e vestibulares.",
    icon: Award,
  },
  {
    title: "Resumos e Estudo Livre",
    desc: "Crie mapas visuais de livros, artigos e cursos online.",
    icon: Layers,
  },
];

export default function UseCases() {
  return (
    <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight mb-4">
          Feito para qualquer objetivo de estudo
        </h2>
        <p className="text-base sm:text-lg text-text-muted">
          Independente da sua meta, o StudyFlow se adéqua ao seu ritmo e disciplina.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-primary/40 hover:shadow-md transition-all flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-text-main mb-1">{item.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}