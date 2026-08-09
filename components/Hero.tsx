"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { MouseEvent } from "react";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  GitBranch,
  Layers3,
  ListChecks,
  TrendingUp,
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

            <div className="mb-8 flex w-full flex-col items-start gap-4 sm:mb-10 sm:w-auto sm:flex-row">
              <div className="flex w-full flex-col items-center sm:w-auto sm:items-start">
                <a
                  href={APP_URL}
                  onClick={() => trackEvent("cta_hero_click")}
                  className="group flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:scale-[1.02] hover:bg-blue-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/25 active:scale-[0.98] sm:w-auto"
                >
                  <span>Criar minha conta</span>
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>

                <p className="mt-2 max-w-[320px] text-center text-[11px] font-medium leading-relaxed text-slate-500 sm:text-left sm:text-xs">
                  Assinatura de R$11,90/mês • Cancele quando quiser • Comece em
                  poucos segundos
                </p>
              </div>

              <a
                href="#como-funciona"
                onClick={(event) => {
                  trackEvent("cta_secondary_hero_click");
                  handleSmoothScroll(event, "#como-funciona");
                }}
                className="flex min-h-[52px] w-full items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3.5 text-base font-semibold text-text-main shadow-sm transition-all hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/50 sm:w-auto"
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
            initial={reducedMotion ? false : { opacity: 0, x: 28, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }
            }
            className="relative flex w-full min-w-0 items-center justify-center lg:col-span-7"
          >
            <div className="relative w-full max-w-[760px] sm:min-h-[560px] lg:ml-auto">
              <div className="relative z-10 mx-auto w-full overflow-hidden rounded-[22px] border border-neutral-200 bg-neutral-950 shadow-[0_28px_70px_-32px_rgba(15,23,42,0.38)] sm:absolute sm:left-1/2 sm:top-1/2 sm:w-[72%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[28px]">
                <div className="flex items-center justify-between bg-neutral-950 px-3 py-3 text-white sm:px-4">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full bg-white/35" />
                    <span className="h-2 w-2 rounded-full bg-white/55" />
                    <span className="h-2 w-2 rounded-full bg-white/80" />
                  </div>
                  <span className="text-[9px] font-semibold tracking-wide text-white/80 sm:text-[10px]">
                    StudyFlow · painel real
                  </span>
                </div>

                <div className="relative aspect-[753/720] w-full bg-white">
                  <Image
                    src="/hero-studyflow-dashboard-real.jpg"
                    alt="Painel real de progresso do StudyFlow com domínio geral, cards para revisar e acompanhamento de desempenho"
                    fill
                    priority
                    sizes="(min-width: 1024px) 42vw, (min-width: 640px) 68vw, 100vw"
                    quality={92}
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div
                aria-hidden="true"
                className="mt-3 grid grid-cols-2 gap-2.5 sm:contents"
              >
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_12px_32px_rgba(15,23,42,0.10)] sm:absolute sm:left-0 sm:top-[4%] sm:z-20 sm:w-[31%] sm:p-3.5">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <span className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-slate-900 sm:text-[9px]">
                      <Layers3 size={12} className="text-blue-600" />
                      Flashcard
                    </span>
                    <span className="text-[8px] text-slate-400">Neurociência</span>
                  </div>
                  <p className="mt-3 text-[9px] font-bold leading-snug text-slate-900 sm:text-[10px]">
                    Como funciona a potenciação de longa duração no hipocampo?
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-1 text-center text-[7px] font-bold sm:text-[8px]">
                    <span className="rounded-md border border-slate-200 py-1.5 text-slate-500">
                      Difícil
                    </span>
                    <span className="rounded-md border border-slate-200 py-1.5 text-slate-700">
                      Bom
                    </span>
                    <span className="rounded-md bg-neutral-950 py-1.5 text-white">
                      Fácil
                    </span>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_12px_32px_rgba(15,23,42,0.10)] sm:absolute sm:right-0 sm:top-[10%] sm:z-20 sm:w-[31%] sm:p-3.5">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <span className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-slate-900 sm:text-[9px]">
                      <ListChecks size={12} className="text-blue-600" />
                      Teste
                    </span>
                    <span className="text-[8px] text-slate-400">3 de 10</span>
                  </div>
                  <p className="mt-3 text-[9px] font-bold leading-snug text-slate-900 sm:text-[10px]">
                    Qual estrutura celular produz ATP?
                  </p>
                  <div className="mt-2 space-y-1 text-[7px] font-semibold sm:text-[8px]">
                    <div className="rounded-md border border-slate-200 px-2 py-1.5 text-slate-500">
                      A · Complexo de Golgi
                    </div>
                    <div className="flex items-center justify-between rounded-md border border-neutral-950 bg-neutral-950 px-2 py-1.5 text-white">
                      <span>B · Mitocôndria</span>
                      <CheckCircle2 size={10} />
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_12px_32px_rgba(15,23,42,0.10)] sm:absolute sm:bottom-[3%] sm:left-[1%] sm:z-20 sm:w-[34%] sm:p-3.5">
                  <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2 text-[8px] font-bold uppercase tracking-[0.08em] text-slate-900 sm:text-[9px]">
                    <GitBranch size={12} className="text-blue-600" />
                    Mapa mental
                  </div>
                  <div className="mt-3 flex flex-col items-center justify-center gap-1.5 text-[7px] font-semibold sm:flex-row sm:text-[8px]">
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-slate-600">
                      S.N. Central
                    </span>
                    <span className="hidden h-px w-3 bg-slate-300 sm:block" />
                    <span className="rounded-md bg-neutral-950 px-2 py-2 text-center text-white">
                      Sistema Nervoso
                    </span>
                    <span className="hidden h-px w-3 bg-slate-300 sm:block" />
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-slate-600">
                      S.N. Periférico
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-1 text-[7px] text-slate-400">
                    <BrainCircuit size={11} />
                    Encéfalo · Medula · Nervos
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_12px_32px_rgba(15,23,42,0.10)] sm:absolute sm:bottom-[1%] sm:right-[1%] sm:z-20 sm:w-[30%] sm:p-3.5">
                  <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2 text-[8px] font-bold uppercase tracking-[0.08em] text-slate-900 sm:text-[9px]">
                    <TrendingUp size={12} className="text-blue-600" />
                    Progresso
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[5px] border-slate-200 text-[11px] font-black text-slate-950 sm:h-14 sm:w-14 sm:text-xs">
                      0%
                    </div>
                    <div className="min-w-0 space-y-1.5 text-[7px] sm:text-[8px]">
                      <div className="flex items-center justify-between gap-3 text-slate-500">
                        <span>Para revisar</span>
                        <strong className="text-slate-950">25</strong>
                      </div>
                      <div className="flex items-center justify-between gap-3 text-slate-500">
                        <span>Dominados</span>
                        <strong className="text-slate-950">0</strong>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-0 bg-neutral-950" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <figcaption className="sr-only">
              Painel real do StudyFlow acompanhado por exemplos dos recursos de
              flashcards, testes, mapas mentais e progresso.
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
