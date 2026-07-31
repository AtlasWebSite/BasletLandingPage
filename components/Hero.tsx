"use client";

import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, CheckCircle2, GitMerge, BarChart2 } from "lucide-react";
import { APP_URL } from "@/data/pricingData";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden bg-hero-light">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col text-center lg:text-left items-center lg:items-start"
          >
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-sm mb-6">
              <BrainCircuit size={16} className="text-primary" />
              <span className="text-xs sm:text-sm font-semibold text-text-main">
                Seu estudo, finalmente em fluxo.
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-text-main tracking-tight leading-[1.12] mb-6">
              Transforme conteúdo em{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
                aprendizado que fica.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-text-muted leading-relaxed max-w-2xl mb-8">
              Flashcards, mapas mentais e testes reunidos em uma experiência simples e visual para organizar seus estudos e acompanhar sua evolução.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href={APP_URL}
                onClick={() => trackEvent("cta_hero_click")}
                className="w-full sm:w-auto min-h-[52px] bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all shadow-md shadow-primary/25 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                <span>Começar agora</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#como-funciona"
                onClick={() => trackEvent("cta_secondary_hero_click")}
                className="w-full sm:w-auto min-h-[52px] bg-white hover:bg-slate-50 text-text-main border border-slate-200 px-8 py-3.5 rounded-full font-semibold text-base transition-all shadow-sm flex items-center justify-center"
              >
                Ver como funciona
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-progress" />
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-progress" />
                <span>Acesso imediato</span>
              </div>
            </div>
          </motion.div>

          {/* Seção das imagens e elementos animados com tamanho aumentado */}
          <div className="lg:col-span-5 relative w-full h-[500px] sm:h-[560px] flex items-center justify-center">
            <motion.div
              animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.6, 0.8, 0.6] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute w-96 h-96 bg-gradient-to-tr from-primary/20 via-secondary/15 to-progress/20 rounded-full blur-3xl"
            />

            <motion.div
              animate={{ y: [-8, 8, -8], rotateZ: [-1, 1, -1] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute z-20 top-10 left-0 sm:-left-4 w-72 sm:w-80 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xl shadow-slate-200/60"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <GitMerge size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-main">Mapa Mental</h4>
                  <p className="text-xs text-text-muted">Conexão de Conceitos</p>
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-secondary rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-text-muted font-medium">
                  <span>12 Tópicos</span>
                  <span className="text-secondary font-bold">Conectados</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10], rotateZ: [2, -2, 2] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
              className="absolute z-30 bottom-6 right-0 sm:-right-4 w-72 sm:w-80 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl shadow-primary/15"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded">Flashcard #24</span>
                <span className="text-xs text-progress font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-progress animate-pulse"></span>
                  Revisão Ativa
                </span>
              </div>
              <p className="text-sm font-semibold text-text-main mb-4">
                O que é a curva do esquecimento e como combatê-la?
              </p>
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-xs text-text-muted flex items-center justify-between">
                <span>Repetição Espaçada</span>
                <span className="font-bold text-primary">Excelente</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ scale: [0.98, 1.02, 0.98] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="absolute z-20 top-1/2 -translate-y-1/2 -left-2 sm:-left-8 bg-text-main text-white text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5"
            >
              <BarChart2 size={18} className="text-progress" />
              <span className="font-semibold">7 dias seguidos em fluxo</span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}