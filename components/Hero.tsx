"use client";

import { motion } from "framer-motion";
import type { MouseEvent } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import { APP_URL } from "@/data/pricingData";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
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
      behavior: "smooth",
    });

    window.history.replaceState(null, "", href);
  };

  return (
    <section className="relative overflow-hidden bg-blue-50/30 pb-24 pt-32 md:pb-36 md:pt-44">
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left"
          >
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.12] tracking-tight text-text-main sm:text-6xl lg:text-7xl">
              Transforme conteúdo em{" "}
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent">
                aprendizado que fica.
              </span>
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl">
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

          <div className="relative flex h-[500px] w-full items-center justify-center sm:h-[560px] lg:col-span-5">
            <motion.div
              animate={{
                scale: [0.96, 1.04, 0.96],
                opacity: [0.5, 0.75, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 7,
                ease: "easeInOut",
              }}
              className="absolute h-[390px] w-[390px] rounded-full bg-gradient-to-tr from-blue-600/20 via-blue-400/15 to-blue-200/30 blur-3xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="relative z-10 w-full max-w-[560px]"
            >
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                className="absolute right-2 top-4 z-20 flex items-center gap-2 rounded-2xl border border-blue-100 bg-white/90 px-4 py-3 text-sm font-semibold text-blue-700 shadow-lg shadow-blue-600/10 backdrop-blur-md sm:right-4"
              >
                <TrendingUp size={18} />
                <span>Evolução constante</span>
              </motion.div>

              <svg
                viewBox="0 0 590 440"
                role="img"
                aria-label="Escada de evolução do StudyFlow com as etapas organizar, praticar, revisar e evoluir"
                className="h-auto w-full overflow-visible"
              >
                <defs>
                  <filter
                    id="studyflowLineShadow"
                    x="-30%"
                    y="-30%"
                    width="160%"
                    height="180%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="14"
                      stdDeviation="14"
                      floodColor="#2563EB"
                      floodOpacity="0.16"
                    />
                  </filter>

                  <filter
                    id="studyflowPointGlow"
                    x="-250%"
                    y="-250%"
                    width="500%"
                    height="500%"
                  >
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path
                  d="M55 345H155V285H255V225H355V165H455V105H535"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#studyflowLineShadow)"
                />

                <path
                  d="M55 345V385H535V105"
                  fill="none"
                  stroke="#BFDBFE"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M72 330L518 78"
                  fill="none"
                  stroke="#93C5FD"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="8 10"
                />

                <motion.path
                  d="M72 330L518 78"
                  fill="none"
                  stroke="#1D4ED8"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 1, 1],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 6,
                    times: [0, 0.82, 1],
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <circle
                  r="9"
                  fill="#FFFFFF"
                  stroke="#2563EB"
                  strokeWidth="5"
                  filter="url(#studyflowPointGlow)"
                >
                  <animateMotion
                    dur="6s"
                    repeatCount="indefinite"
                    path="M72 330L518 78"
                    keyTimes="0;0.82;1"
                    keyPoints="0;1;1"
                    calcMode="linear"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.08;0.82;1"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </circle>

                <g>
                  <text
                    x="72"
                    y="308"
                    fill="#60A5FA"
                    fontSize="12"
                    fontWeight="800"
                  >
                    01
                  </text>
                  <text
                    x="72"
                    y="331"
                    fill="#0F172A"
                    fontSize="17"
                    fontWeight="800"
                  >
                    Organizar
                  </text>
                </g>

                <g>
                  <text
                    x="174"
                    y="248"
                    fill="#60A5FA"
                    fontSize="12"
                    fontWeight="800"
                  >
                    02
                  </text>
                  <text
                    x="174"
                    y="271"
                    fill="#0F172A"
                    fontSize="17"
                    fontWeight="800"
                  >
                    Praticar
                  </text>
                </g>

                <g>
                  <text
                    x="274"
                    y="188"
                    fill="#60A5FA"
                    fontSize="12"
                    fontWeight="800"
                  >
                    03
                  </text>
                  <text
                    x="274"
                    y="211"
                    fill="#0F172A"
                    fontSize="17"
                    fontWeight="800"
                  >
                    Revisar
                  </text>
                </g>

                <g>
                  <text
                    x="374"
                    y="128"
                    fill="#60A5FA"
                    fontSize="12"
                    fontWeight="800"
                  >
                    04
                  </text>
                  <text
                    x="374"
                    y="151"
                    fill="#0F172A"
                    fontSize="17"
                    fontWeight="800"
                  >
                    Evoluir
                  </text>
                </g>

                <motion.g
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <circle
                    cx="520"
                    cy="76"
                    r="27"
                    fill="#FFFFFF"
                    stroke="#DBEAFE"
                    strokeWidth="2"
                  />
                  <path
                    d="M508 80L517 71L524 77L533 66"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M526 66H533V73"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.g>
              </svg>

              <motion.div
                animate={{ y: [3, -3, 3] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                }}
                className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/95 px-5 py-3 shadow-xl shadow-blue-600/10 backdrop-blur-md"
              >
                <Image
                  src="/favicon.ico"
                  alt=""
                  width={34}
                  height={34}
                  className="h-[34px] w-[34px] object-contain"
                />

                <div>
                  <p className="text-sm font-bold text-text-main">StudyFlow</p>
                  <p className="whitespace-nowrap text-xs text-text-muted">
                    Seu estudo em evolução constante
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
