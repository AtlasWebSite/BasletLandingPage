"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { MouseEvent } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Layers3,
  Plus,
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
                  StudyFlow · Sua rotina de estudos
                </span>
              </div>

              <div
                role="img"
                aria-label="Tela inicial do StudyFlow mostrando a revisão recomendada, domínio geral e estudos recentes"
                className="overflow-hidden rounded-[18px] border border-white/10 bg-[#f4f6fb] sm:rounded-[22px]"
              >
                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-3 sm:px-5 sm:py-4">
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-blue-600 sm:text-[10px]">
                      Visão geral
                    </span>
                    <strong className="mt-0.5 block text-xs text-slate-900 sm:text-base">
                      Pronto para avançar hoje?
                    </strong>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-2.5 py-2 text-[9px] font-bold text-white shadow-md shadow-blue-600/20 sm:px-3 sm:text-xs">
                    <Plus size={14} />
                    <span className="hidden min-[380px]:inline">Novo conjunto</span>
                  </div>
                </div>

                <div className="p-3 sm:p-5">
                  <div className="grid gap-2.5 min-[430px]:grid-cols-[1.45fr_0.55fr] sm:gap-3">
                    <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-3.5 text-white shadow-lg shadow-blue-600/15 sm:p-5">
                      <div className="mb-2 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-blue-100 sm:text-[10px]">
                        <Sparkles size={13} />
                        Próximo passo recomendado
                      </div>
                      <strong className="block max-w-sm text-sm leading-snug sm:text-lg">
                        Você tem 25 cards para revisar hoje.
                      </strong>
                      <span className="mt-2 block text-[10px] leading-relaxed text-blue-100 sm:text-xs">
                        Fortaleça agora o que ainda precisa de prática.
                      </span>
                      <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-[10px] font-bold text-blue-700 sm:text-xs">
                        Revisar agora
                        <ArrowRight size={13} />
                      </div>
                    </div>

                    <div className="flex min-h-28 items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm">
                      <div>
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-[7px] border-blue-100 text-sm font-black text-blue-600 sm:h-16 sm:w-16 sm:text-base">
                          0%
                        </div>
                        <strong className="mt-2 block text-[10px] text-slate-900 sm:text-xs">
                          Domínio geral
                        </strong>
                        <span className="block text-[9px] text-slate-500 sm:text-[10px]">
                          progresso real
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-2 mt-3 flex items-center justify-between sm:mt-4">
                    <strong className="text-[10px] text-slate-900 sm:text-xs">
                      Estudos recentes
                    </strong>
                    <span className="text-[9px] font-semibold text-blue-600 sm:text-[10px]">
                      Ver todos
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {[
                      ["Matemática essencial", "6 termos"],
                      ["História do Brasil", "5 termos"],
                      ["Biologia celular", "6 termos"],
                    ].map(([title, terms], index) => (
                      <div
                        key={title}
                        className={`${index === 2 ? "hidden sm:flex" : "flex"} items-center gap-2 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm sm:p-3`}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <BookOpen size={14} />
                        </div>
                        <div className="min-w-0">
                          <strong className="block truncate text-[9px] text-slate-900 sm:text-[10px]">
                            {title}
                          </strong>
                          <span className="block text-[8px] text-slate-500 sm:text-[9px]">
                            {terms}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <figcaption className="grid grid-cols-3 gap-1.5 p-1.5 pt-2 sm:gap-2 sm:p-2 sm:pt-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.07] p-2.5 sm:rounded-2xl sm:p-3.5">
                  <BarChart3 className="mb-2 text-blue-300" size={18} />
                  <strong className="block text-[10px] leading-tight text-white sm:text-sm">
                    Veja seu progresso
                  </strong>
                  <span className="mt-1 hidden text-xs leading-relaxed text-slate-400 sm:block">
                    Acompanhe sua evolução em um só painel.
                  </span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.07] p-2.5 sm:rounded-2xl sm:p-3.5">
                  <Layers3 className="mb-2 text-blue-300" size={18} />
                  <strong className="block text-[10px] leading-tight text-white sm:text-sm">
                    Centralize os estudos
                  </strong>
                  <span className="mt-1 hidden text-xs leading-relaxed text-slate-400 sm:block">
                    Conteúdos e práticas sempre organizados.
                  </span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.07] p-2.5 sm:rounded-2xl sm:p-3.5">
                  <RotateCcw className="mb-2 text-blue-300" size={18} />
                  <strong className="block text-[10px] leading-tight text-white sm:text-sm">
                    Revise no ritmo certo
                  </strong>
                  <span className="mt-1 hidden text-xs leading-relaxed text-slate-400 sm:block">
                    Saiba o que precisa de atenção agora.
                  </span>
                </div>
              </figcaption>
            </div>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
