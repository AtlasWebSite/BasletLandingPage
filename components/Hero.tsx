"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { MouseEvent } from "react";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Flame,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { APP_URL } from "@/data/pricingData";
import { trackEvent } from "@/lib/analytics";

interface StudyDashboardVisualProps {
  reducedMotion: boolean;
}

function StudyDashboardVisual({ reducedMotion }: StudyDashboardVisualProps) {
  return (
    <div className="relative flex h-[470px] w-full min-w-0 items-center justify-center sm:h-[540px]">
      <div className="pointer-events-none absolute inset-x-8 top-16 h-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-12 right-4 h-44 w-44 rounded-full bg-cyan-300/15 blur-3xl" />

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }
        }
        className="relative w-full min-w-0 max-w-[540px]"
        role="img"
        aria-label="Painel do StudyFlow com progresso diário, matérias em estudo e próxima revisão"
      >
        <motion.div
          animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
          transition={
            reducedMotion
              ? undefined
              : { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute -left-5 top-20 z-20 hidden items-center gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-3 shadow-xl shadow-blue-950/10 sm:flex"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <TrendingUp size={19} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Retenção</p>
            <p className="text-base font-extrabold text-slate-900">92%</p>
          </div>
        </motion.div>

        <motion.div
          animate={reducedMotion ? undefined : { y: [0, 7, 0] }}
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: 5.8,
                  delay: 0.45,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="absolute -right-4 bottom-16 z-20 hidden items-center gap-3 rounded-2xl border border-orange-100 bg-white px-4 py-3 shadow-xl shadow-blue-950/10 sm:flex"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
            <Flame size={19} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Sequência</p>
            <p className="text-base font-extrabold text-slate-900">12 dias</p>
          </div>
        </motion.div>

        <div className="relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/95 p-3 shadow-[0_28px_80px_-28px_rgba(37,99,235,0.32)] backdrop-blur min-[380px]:p-4 sm:rounded-[30px] sm:p-5">
          <div className="pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-blue-100/70 blur-3xl" />

          <div className="relative mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/20">
                <BrainCircuit size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-slate-900">Meu StudyFlow</p>
                <p className="truncate text-xs text-slate-500">Visão geral de hoje</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="hidden min-[340px]:inline">Em fluxo</span>
            </div>
          </div>

          <div className="relative mb-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-slate-950 p-3 text-white min-[380px]:p-4 sm:p-5">
              <div className="mb-5 flex items-start justify-between gap-2">
                <div>
                  <p className="mb-1 text-xs font-medium text-slate-400">Progresso semanal</p>
                  <p className="text-2xl font-extrabold tracking-tight min-[380px]:text-3xl">72%</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                  <TrendingUp size={17} />
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
              </div>
              <p className="mt-2 text-[11px] text-slate-400">+18% nesta semana</p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-3 min-[380px]:p-4 sm:p-5">
              <div className="mb-5 flex items-start justify-between gap-2">
                <div>
                  <p className="mb-1 text-xs font-medium text-blue-700/70">Foco de hoje</p>
                  <p className="text-2xl font-extrabold tracking-tight text-slate-900 min-[380px]:text-3xl">22<span className="ml-1 text-xs text-slate-500 min-[380px]:text-sm">min</span></p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                  <Clock3 size={17} />
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-blue-100">
                <div className="h-full w-[70%] rounded-full bg-blue-600" />
              </div>
              <p className="mt-2 text-[11px] text-blue-700/70">Meta diária: 30 min</p>
            </div>
          </div>

          <div className="relative mb-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-blue-600" />
                <p className="text-sm font-extrabold text-slate-900">Matérias em andamento</p>
              </div>
              <span className="hidden text-xs font-semibold text-blue-600 min-[340px]:inline">Ver todas</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Biologia celular</span>
                  <span className="font-bold text-slate-900">84%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[84%] rounded-full bg-blue-600" />
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">História do Brasil</span>
                  <span className="font-bold text-slate-900">68%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[68%] rounded-full bg-cyan-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-3 text-white shadow-lg shadow-blue-500/20 min-[380px]:p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <Sparkles size={19} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-100">Próxima ação</p>
              <p className="truncate text-sm font-extrabold">Revisar 12 flashcards de Biologia</p>
            </div>
            <ArrowRight size={18} className="shrink-0" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

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
        <div className="grid min-w-0 items-center gap-8 sm:gap-12 lg:grid-cols-12">
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
            className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left"
          >
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.12] tracking-tight text-text-main sm:text-6xl lg:text-7xl">
              Transforme conteúdo em{" "}
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent">
                aprendizado que fica.
              </span>
            </h1>

            <p className="mb-8 max-w-2xl text-base leading-relaxed text-text-muted min-[380px]:text-lg sm:text-xl">
              Flashcards, mapas mentais e testes reunidos em uma experiência
              simples e visual para organizar seus estudos e acompanhar sua
              evolução.
            </p>

            <div className="mb-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
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

          <div className="relative flex w-full min-w-0 items-center justify-center lg:col-span-5">
            <StudyDashboardVisual reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>
    </section>
  );
}
