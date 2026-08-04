"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { MouseEvent } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Layers3,
  RotateCcw,
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
                  StudyFlow · Painel de progresso
                </span>
              </div>

              <div className="overflow-hidden rounded-[18px] border border-white/10 bg-white sm:rounded-[22px]">
                <div className="relative aspect-square w-full sm:aspect-[16/11]">
                  <Image
                    src="/hero-studyflow-dashboard-real.jpg"
                    alt="Painel real de progresso do StudyFlow com métricas de domínio, revisões e cards praticados"
                    fill
                    priority
                    sizes="(min-width: 1024px) 56vw, (min-width: 640px) 90vw, 100vw"
                    quality={92}
                    className="object-cover object-top"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 to-transparent sm:h-20" />
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
