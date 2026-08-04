"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { MouseEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  GitFork,
  Layers3,
  ListChecks,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { APP_URL } from "@/data/pricingData";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const reducedMotion = Boolean(shouldReduceMotion);

  const handleSmoothScroll = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();

    const target = document.querySelector<HTMLElement>(href);

    if (!target) {
      return;
    }

    const headerOffset = 112;
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(targetPosition, 0),
      behavior: reducedMotion ? "auto" : "smooth",
    });

    window.history.replaceState(null, "", href);
  };

  return (
    <section className="relative w-full overflow-hidden bg-white pb-16 pt-28 sm:pb-24 sm:pt-32 md:pb-36 md:pt-44">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-w-0 items-center gap-6 sm:gap-12 lg:grid-cols-12">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    duration: 0.5,
                    ease: "easeOut",
                  }
            }
            className="flex flex-col items-center text-center lg:col-span-5 lg:items-start lg:text-left"
          >
            <h1 className="mb-5 text-4xl font-extrabold leading-[1.12] tracking-tight text-text-main sm:mb-6 sm:text-6xl lg:text-7xl">
              Dobre o seu desempenho
              <span className="block bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent">
                em 14 dias com Study Flow
              </span>
            </h1>

            <p className="mb-6 max-w-2xl text-base leading-relaxed text-text-muted min-[380px]:text-lg sm:mb-8 sm:text-xl">
              Flashcards, mapas mentais e testes reunidos em uma experiência
              simples e visual para organizar seus estudos e acompanhar sua
              evolução.
            </p>

            <div className="mb-8 flex w-full flex-col items-center gap-4 sm:mb-10 sm:w-auto sm:flex-row">
              <a
                href={APP_URL}
                onClick={() => trackEvent("cta_hero_click")}
                className="group flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:scale-[1.02] hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] sm:w-auto"
              >
                <span>Começar agora</span>

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <a
                href="#como-funciona"
                onClick={(event) => {
                  trackEvent("cta_secondary_hero_click");
                  handleSmoothScroll(event, "#como-funciona");
                }}
                className="flex min-h-[52px] w-full items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3.5 text-base font-semibold text-text-main shadow-sm transition-all hover:bg-slate-50 sm:w-auto"
              >
                Ver como funciona
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted sm:text-sm lg:justify-start">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-progress" />
                <span>Acesso rápido pelo navegador</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-progress" />
                <span>Estude em qualquer dispositivo</span>
              </div>
            </div>
          </motion.div>

          <motion.figure
            initial={reducedMotion ? false : { opacity: 0, x: 28, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }
            }
            className="relative flex w-full min-w-0 items-center justify-center lg:col-span-7"
          >
            <div className="pointer-events-none absolute inset-x-4 top-1/2 h-4/5 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative w-full max-w-[680px] overflow-hidden rounded-[26px] border border-slate-800 bg-slate-950 p-2 shadow-[0_36px_100px_-32px_rgba(37,99,235,0.65)] sm:rounded-[32px] sm:p-3 lg:ml-auto">
              <div className="flex items-center justify-between px-2 py-2.5 sm:px-3 sm:py-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[10px] font-semibold tracking-wide text-slate-400 sm:text-xs">
                  StudyFlow · Do conteúdo à evolução
                </span>
              </div>

              <div
                role="img"
                aria-label="Demonstração do StudyFlow transformando um conteúdo em flashcards, mapa mental, teste e revisão recomendada"
                className="overflow-hidden rounded-[18px] border border-white/10 bg-[#f4f6fb] p-3 sm:rounded-[22px] sm:p-5"
              >
                <div className="text-center sm:text-left">
                  <strong className="block text-sm text-slate-950 sm:text-lg">
                    Um conteúdo. Várias formas de aprender.
                  </strong>
                  <span className="mt-1 block text-[10px] leading-relaxed text-slate-500 sm:text-xs">
                    O StudyFlow organiza a prática e mostra o próximo passo.
                  </span>
                </div>

                <div className="mt-3 grid items-center gap-2.5 sm:mt-5 sm:grid-cols-[0.88fr_auto_1.12fr] sm:gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4">
                    <div className="mb-3 flex items-center gap-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:h-10 sm:w-10">
                        <FileText size={18} />
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400 sm:text-[10px]">
                          Seu conteúdo
                        </span>
                        <strong className="block text-xs text-slate-950 sm:text-sm">
                          Biologia celular
                        </strong>
                      </div>
                    </div>

                    <div className="space-y-1.5 border-t border-slate-100 pt-3">
                      {["Membrana plasmática", "Mitocôndria", "Núcleo celular"].map(
                        (topic) => (
                          <div
                            key={topic}
                            className="flex items-center gap-2 text-[9px] text-slate-600 sm:text-[10px]"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                            {topic}
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-1 text-blue-600 sm:flex-col">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/25">
                      <Sparkles size={16} />
                    </div>
                    <ArrowRight className="rotate-90 sm:rotate-0" size={18} />
                  </div>

                  <div>
                    <span className="mb-2 block text-center text-[9px] font-bold uppercase tracking-[0.1em] text-blue-600 sm:text-left sm:text-[10px]">
                      StudyFlow prepara para você
                    </span>

                    <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-1 sm:gap-2">
                      {[
                        {
                          title: "Flashcards",
                          description: "Cards para praticar",
                          icon: Layers3,
                          color: "bg-violet-50 text-violet-600",
                        },
                        {
                          title: "Mapa mental",
                          description: "Conexões visuais",
                          icon: GitFork,
                          color: "bg-cyan-50 text-cyan-600",
                        },
                        {
                          title: "Teste rápido",
                          description: "Perguntas para testar",
                          icon: ListChecks,
                          color: "bg-emerald-50 text-emerald-600",
                        },
                      ].map((item) => {
                        const Icon = item.icon;

                        return (
                          <div
                            key={item.title}
                            className="flex min-w-0 flex-col items-center rounded-xl border border-slate-200 bg-white p-2 text-center shadow-sm sm:flex-row sm:gap-2.5 sm:p-2.5 sm:text-left"
                          >
                            <div
                              className={`mb-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg sm:mb-0 ${item.color}`}
                            >
                              <Icon size={15} />
                            </div>
                            <div className="min-w-0">
                              <strong className="block text-[8px] leading-tight text-slate-950 min-[390px]:text-[9px] sm:text-[10px]">
                                {item.title}
                              </strong>
                              <span className="mt-0.5 hidden text-[9px] text-slate-500 sm:block">
                                {item.description}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-3 text-white shadow-lg shadow-blue-600/15 sm:mt-4 sm:p-4">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                      <RotateCcw size={17} />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9px] text-blue-100 sm:text-[10px]">
                        Próximo passo recomendado
                      </span>
                      <strong className="block truncate text-[10px] sm:text-sm">
                        Revise o que precisa de atenção hoje
                      </strong>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1 rounded-lg bg-white px-2.5 py-2 text-[9px] font-bold text-blue-700 sm:px-3 sm:text-[10px]">
                    Revisar
                    <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            </div>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
