"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, GitMerge, CheckSquare, BarChart2, FolderKanban } from "lucide-react";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: BarChart2 },
  { id: "flashcards", label: "Flashcards", icon: Layers },
  { id: "mapas", label: "Mapas Mentais", icon: GitMerge },
  { id: "testes", label: "Testes & Quizzes", icon: CheckSquare },
  { id: "organizacao", label: "Organização", icon: FolderKanban },
];

export default function AppDemo() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight mb-3">
          Veja o StudyFlow em ação
        </h2>
        <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto">
          Uma interface limpa, intuitiva e pensada para você focar no que realmente importa: aprender.
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-base font-semibold transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-white text-text-muted hover:text-text-main border border-slate-200"
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="relative rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden max-w-5xl mx-auto">
        <div className="bg-slate-100/80 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <div className="bg-white border border-slate-200 rounded-md px-4 py-1 text-sm font-mono text-text-muted shadow-inner">
            app-usestudyflow.vercel.app/{activeTab}
          </div>
          <div className="w-12" />
        </div>

        <div className="p-6 sm:p-8 bg-slate-50/50 min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-sm font-medium text-text-muted">Sessões da Semana</span>
                    <p className="text-2xl font-bold text-text-main mt-1">14 matérias</p>
                    <span className="text-sm text-progress font-semibold">+22% em relação a semana passada</span>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-sm font-medium text-text-muted">Taxa de Acerto</span>
                    <p className="text-2xl font-bold text-text-main mt-1">92.4%</p>
                    <span className="text-sm text-primary font-semibold">Excelente retenção</span>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-sm font-medium text-text-muted">Sequência de Estudos</span>
                    <p className="text-2xl font-bold text-text-main mt-1">12 Dias</p>
                    <span className="text-sm text-accent font-semibold">Fluxo diário mantido</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="text-base font-bold text-text-main mb-4">Progresso Geral por Disciplina</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm font-semibold mb-1">
                        <span>Biologia Celular</span>
                        <span>85%</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "85%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-semibold mb-1">
                        <span>História do Brasil</span>
                        <span>70%</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: "70%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "flashcards" && (
              <motion.div
                key="flashcards"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-lg mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-md text-center"
              >
                <span className="text-sm font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Baralho: Neurociência
                </span>
                <h3 className="text-xl font-bold text-text-main my-6">
                  Como funciona a potenciação de longa duração (LTP) no hipocampo?
                </h3>
                <p className="text-sm text-text-muted mb-8">Clique para virar o cartão ou selecione seu nível de facilidade</p>
                <div className="grid grid-cols-3 gap-3">
                  <button className="py-2.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-sm font-bold hover:bg-rose-100 transition-colors">
                    Difícil
                  </button>
                  <button className="py-2.5 bg-amber-50 text-amber-600 border border-amber-200 rounded-xl text-sm font-bold hover:bg-amber-100 transition-colors">
                    Bom
                  </button>
                  <button className="py-2.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl text-sm font-bold hover:bg-emerald-100 transition-colors">
                    Fácil
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "mapas" && (
              <motion.div
                key="mapas"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-slate-200"
              >
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
                  <div className="px-4 py-3 bg-primary text-white rounded-xl shadow-md">
                    Conceito Central: Sistema Nervoso
                  </div>
                  <div className="h-0.5 w-8 bg-slate-300 hidden sm:block" />
                  <div className="flex flex-col gap-2">
                    <div className="px-3 py-2 bg-secondary/10 text-secondary border border-secondary/20 rounded-lg">
                      S.N. Central (Encéfalo + Médula)
                    </div>
                    <div className="px-3 py-2 bg-progress/10 text-emerald-700 border border-progress/20 rounded-lg">
                      S.N. Periférico (Nervos + Gânglios)
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "testes" && (
              <motion.div
                key="testes"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-xl mx-auto bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-text-muted">Questão 3 de 10</span>
                  <span className="text-sm font-bold text-primary">Tempo restante: 01:45</span>
                </div>
                <p className="text-base font-semibold text-text-main mb-4">
                  Qual estrutura celular é responsável pela produção primária de ATP através da respiração celular?
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-text-main">
                    A) Complexo de Golgi
                  </div>
                  <div className="p-3 bg-primary/10 border border-primary text-primary rounded-lg text-sm font-bold flex justify-between items-center">
                    <span>B) Mitocôndria</span>
                    <span className="text-xs bg-primary text-white px-2 py-0.5 rounded">Selecionada</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-text-main">
                    C) Ribossomo
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "organizacao" && (
              <motion.div
                key="organizacao"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full bg-white p-6 rounded-xl border border-slate-200"
              >
                <h4 className="text-base font-bold text-text-main mb-4">Cadernos & Tópicos de Estudo</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div>
                      <h5 className="text-sm font-bold text-text-main">Medicina / Anatomia</h5>
                      <p className="text-sm text-text-muted">28 itens organizados</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-secondary" />
                    <div>
                      <h5 className="text-sm font-bold text-text-main">Concursos / Direito Const.</h5>
                      <p className="text-sm text-text-muted">42 itens organizados</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}