"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Layers, GitMerge, CheckSquare, BarChart2, FolderKanban } from "lucide-react";
import { APP_URL } from "@/data/pricingData";
import { trackEvent } from "@/lib/analytics";

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
    <section className="mx-auto w-full min-w-0 max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight mb-3">
          Veja o StudyFlow em ação
        </h2>
        <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto">
          Uma interface limpa, intuitiva e pensada para você focar no que realmente importa: aprender.
        </p>
      </div>

      <div className="no-scrollbar -mx-4 mb-6 flex snap-x items-center justify-start gap-2 overflow-x-auto px-4 pb-3 sm:mx-0 sm:mb-8 sm:justify-center sm:px-0 sm:pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex min-h-11 shrink-0 snap-start items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-all sm:text-base ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-white text-text-muted hover:text-text-main border border-slate-200"
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="relative mx-auto w-full min-w-0 max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex min-w-0 items-center gap-3 border-b border-slate-200 bg-slate-100/80 px-3 py-3 sm:px-4">
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <div className="min-w-0 flex-1 truncate rounded-md border border-slate-200 bg-white px-2 py-1 text-center font-mono text-[10px] text-text-muted shadow-inner sm:px-4 sm:text-sm">
            app-usestudyflow.vercel.app/{activeTab}
          </div>
        </div>

        <div className="flex min-h-[340px] min-w-0 items-center justify-center bg-slate-50/50 p-4 sm:min-h-[460px] sm:p-8">
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
                    <span className="text-sm text-blue-600 font-semibold">Excelente retenção</span>
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
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: "85%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-semibold mb-1">
                        <span>História do Brasil</span>
                        <span>70%</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: "70%" }} />
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
                className="mx-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-md sm:p-8"
              >
                <span className="text-sm font-bold uppercase tracking-widest text-blue-600 bg-blue-600/10 px-3 py-1 rounded-full">
                  Baralho: Neurociência
                </span>
                <h3 className="text-xl font-bold text-text-main my-6">
                  Como funciona a potenciação de longa duração (LTP) no hipocampo?
                </h3>
                <p className="text-sm text-text-muted mb-8">Clique para virar o cartão ou selecione seu nível de facilidade</p>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <button className="min-h-11 rounded-xl border border-rose-200 bg-rose-50 py-2.5 text-sm font-bold text-rose-600 transition-colors hover:bg-rose-100">
                    Difícil
                  </button>
                  <button className="min-h-11 rounded-xl border border-amber-200 bg-amber-50 py-2.5 text-sm font-bold text-amber-600 transition-colors hover:bg-amber-100">
                    Bom
                  </button>
                  <button className="min-h-11 rounded-xl border border-emerald-200 bg-emerald-50 py-2.5 text-sm font-bold text-emerald-600 transition-colors hover:bg-emerald-100">
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
                  <div className="px-4 py-3 bg-blue-600 text-white rounded-xl shadow-md">
                    Conceito Central: Sistema Nervoso
                  </div>
                  <div className="h-0.5 w-8 bg-slate-300 hidden sm:block" />
                  <div className="flex flex-col gap-2">
                    <div className="px-3 py-2 bg-blue-600/10 text-blue-600 border border-blue-600/20 rounded-lg">
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
                  <span className="text-sm font-bold text-blue-600">Tempo restante: 01:45</span>
                </div>
                <p className="text-base font-semibold text-text-main mb-4">
                  Qual estrutura celular é responsável pela produção primária de ATP através da respiração celular?
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-text-main">
                    A) Complexo de Golgi
                  </div>
                  <div className="p-3 bg-blue-600/10 border border-blue-600 text-blue-600 rounded-lg text-sm font-bold flex justify-between items-center">
                    <span>B) Mitocôndria</span>
                    <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">Selecionada</span>
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
                    <div className="w-3 h-3 rounded-full bg-blue-600" />
                    <div>
                      <h5 className="text-sm font-bold text-text-main">Medicina / Anatomia</h5>
                      <p className="text-sm text-text-muted">28 itens organizados</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-600" />
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

      <div className="mt-8 flex flex-col items-center text-center">
        <a
          href={APP_URL}
          onClick={() => trackEvent("cta_demo_click", { active_tab: activeTab })}
          className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] hover:bg-blue-700 sm:w-auto sm:text-base"
        >
          Experimentar o StudyFlow
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </a>
        <p className="mt-3 text-xs text-text-muted sm:text-sm">
          Acesse pelo navegador e comece sua rotina de estudos.
        </p>
      </div>
    </section>
  );
}
