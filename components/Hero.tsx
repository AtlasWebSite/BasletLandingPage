"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { MouseEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
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
            initial={{ opacity: 0, y: 20 }}
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

            <div className="mb-8 w-full max-w-xl sm:mb-10">
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={APP_URL}
                  onClick={() => trackEvent("cta_hero_click")}
                  className="group flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/25 active:translate-y-0"
                >
                  <span>Criar minha conta</span>
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
                  className="flex min-h-[54px] w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-base font-semibold text-text-main shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/50 active:translate-y-0"
                >
                  Ver como funciona
                </a>
              </div>

              <p className="mt-3 text-center text-sm font-semibold leading-relaxed text-slate-600 lg:text-left">
                Plano Pro por R$11,90/mês • Cancele quando quiser
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted sm:text-base lg:justify-start">
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
            initial={{ opacity: 0, x: 28, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }
            }
            className="relative flex w-full min-w-0 items-center justify-center lg:col-span-7"
          >
            <div className="relative w-full max-w-[900px] sm:min-h-[680px] lg:ml-auto">
              <div className="relative z-10 mx-auto w-full overflow-hidden rounded-[22px] border border-neutral-200 bg-neutral-950 shadow-[0_28px_70px_-32px_rgba(15,23,42,0.38)] sm:absolute sm:left-1/2 sm:top-1/2 sm:w-[84%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[28px]">
                <div className="flex items-center justify-between bg-neutral-950 px-3 py-3 text-white sm:px-4">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full bg-white/35" />
                    <span className="h-2 w-2 rounded-full bg-white/55" />
                    <span className="h-2 w-2 rounded-full bg-white/80" />
                  </div>
                  <span className="text-[11px] font-semibold tracking-wide text-white/80 sm:text-xs">
                    StudyFlow · painel real
                  </span>
                </div>

                <div className="relative aspect-[753/720] w-full bg-[#f5f6fb]">
                  <Image
                    src="/hero-studyflow-dashboard-real.jpg"
                    alt="Painel real de progresso do StudyFlow com domínio geral, cards para revisar e acompanhamento de desempenho"
                    fill
                    priority
                    sizes="(min-width: 1024px) 42vw, (min-width: 640px) 68vw, 100vw"
                    quality={92}
                    className="object-contain object-top"
                  />
                </div>
              </div>

              <div
                aria-hidden="true"
                className="mt-3 grid grid-cols-2 gap-2.5 sm:contents"
              >
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_16px_38px_rgba(15,23,42,0.12)] sm:absolute sm:left-0 sm:top-[1%] sm:z-20 sm:w-[38%]">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-900 sm:text-[11px]">
                      <Layers3 size={15} className="text-blue-600" />
                      Flashcard
                    </span>
                    <span className="text-[9px] text-slate-400 sm:text-[10px]">7 de 25</span>
                  </div>
                  <span className="mt-3 block text-[9px] font-bold uppercase tracking-[0.12em] text-blue-600 sm:text-[10px]">
                    Pergunta
                  </span>
                  <p className="mt-1 text-[11px] font-bold leading-snug text-slate-900 sm:text-xs">
                    Qual é a principal função da mitocôndria?
                  </p>
                  <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50 p-2.5">
                    <span className="block text-[8px] font-bold uppercase tracking-[0.1em] text-blue-600 sm:text-[9px]">
                      Resposta
                    </span>
                    <p className="mt-1 text-[10px] font-semibold leading-snug text-slate-700 sm:text-[11px]">
                      Produzir energia para a célula por meio da respiração celular.
                    </p>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_16px_38px_rgba(15,23,42,0.12)] sm:absolute sm:right-0 sm:top-[4%] sm:z-20 sm:w-[39%]">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-900 sm:text-[11px]">
                      <ListChecks size={15} className="text-blue-600" />
                      Teste
                    </span>
                    <span className="text-[9px] text-slate-400 sm:text-[10px]">3 de 10</span>
                  </div>
                  <p className="mt-3 text-[11px] font-bold leading-snug text-slate-900 sm:text-xs">
                    Qual estrutura celular produz ATP?
                  </p>
                  <div className="mt-2 grid gap-1.5 text-[9px] font-semibold sm:text-[10px]">
                    {["A · Complexo de Golgi", "B · Mitocôndria", "C · Ribossomo", "D · Lisossomo"].map(
                      (answer, index) => (
                        <div
                          key={answer}
                          className={`flex items-center justify-between rounded-md border px-2 py-1.5 ${
                            index === 1
                              ? "border-neutral-950 bg-neutral-950 text-white"
                              : "border-slate-200 text-slate-500"
                          }`}
                        >
                          <span>{answer}</span>
                          {index === 1 && <CheckCircle2 size={13} />}
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="relative col-span-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_16px_38px_rgba(15,23,42,0.12)] sm:absolute sm:bottom-[1%] sm:right-0 sm:z-20 sm:w-[39%]">
                  <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-900 sm:text-[11px]">
                    <TrendingUp size={15} className="text-blue-600" />
                    Progresso
                  </div>
                  <div className="mt-3 grid grid-cols-[auto_1fr] gap-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[6px] border-blue-100 text-sm font-black text-blue-700 sm:h-16 sm:w-16 sm:text-base">
                      68%
                    </div>
                    <div className="min-w-0 flex-1 space-y-1.5 text-[9px] sm:text-[10px]">
                      <div className="flex items-center justify-between gap-3 text-slate-500">
                        <span>Para revisar</span>
                        <strong className="text-slate-950">8</strong>
                      </div>
                      <div className="flex items-center justify-between gap-3 text-slate-500">
                        <span>Dominados</span>
                        <strong className="text-slate-950">17</strong>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-[68%] rounded-full bg-blue-600" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-7 items-end gap-1 rounded-lg bg-slate-50 px-2 py-2" aria-label="Evolução nas últimas sete sessões">
                    {[28, 42, 36, 58, 51, 72, 84].map((height) => (
                      <span
                        key={height}
                        className="block rounded-sm bg-blue-500/80"
                        style={{ height: `${Math.max(5, height / 5)}px` }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[8px] font-semibold text-slate-500 sm:text-[9px]">
                    <span>7 sessões</span>
                    <strong className="text-emerald-600">+18% de evolução</strong>
                  </div>
                </div>
              </div>
            </div>

            <figcaption className="sr-only">
              Painel real do StudyFlow acompanhado por exemplos dos recursos de
              flashcards, testes e progresso.
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
