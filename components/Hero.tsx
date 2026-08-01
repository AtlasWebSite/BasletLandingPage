"use client";

import { motion } from "framer-motion";
import type { MouseEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { APP_URL } from "@/data/pricingData";
import { trackEvent } from "@/lib/analytics";

const LOOP_DURATION = 6;

interface StageLabelProps {
  number: string;
  label: string;
  x: number;
  y: number;
  pulseAt: number;
}

function StageLabel({
  number,
  label,
  x,
  y,
  pulseAt,
}: StageLabelProps) {
  const pulseStart = Math.max(pulseAt - 0.04, 0);
  const pulseEnd = Math.min(pulseAt + 0.08, 0.9);

  return (
    <motion.g
      style={{
        originX: 0.5,
        originY: 0.5,
      }}
      animate={{
        scale: [1, 1, 1.2, 1.06, 1.06, 1],
      }}
      transition={{
        duration: LOOP_DURATION,
        times: [0, pulseStart, pulseAt, pulseEnd, 0.94, 1],
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.text
        x={x}
        y={y - 21}
        fontSize="12"
        fontWeight="800"
        animate={{
          fill: [
            "#60A5FA",
            "#60A5FA",
            "#2563EB",
            "#2563EB",
            "#2563EB",
            "#60A5FA",
          ],
        }}
        transition={{
          duration: LOOP_DURATION,
          times: [0, pulseStart, pulseAt, pulseEnd, 0.94, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {number}
      </motion.text>

      <motion.g
        animate={{
          opacity: [1, 1, 0, 0, 1],
          scale: [1, 1, 0.7, 0.7, 1],
        }}
        transition={{
          duration: LOOP_DURATION,
          times: [0, pulseStart, pulseAt, 0.96, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <circle
          cx={x + 9}
          cy={y + 2}
          r="10"
          fill="#FEF2F2"
          stroke="#FECACA"
          strokeWidth="1.5"
        />
        <path
          d={`M${x + 5} ${y - 2}L${x + 13} ${y + 6}M${x + 13} ${
            y - 2
          }L${x + 5} ${y + 6}`}
          fill="none"
          stroke="#EF4444"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </motion.g>

      <motion.g
        animate={{
          opacity: [0, 0, 1, 1, 1, 0],
          scale: [0.7, 0.7, 1.18, 1, 1, 0.7],
        }}
        transition={{
          duration: LOOP_DURATION,
          times: [0, pulseStart, pulseAt, pulseEnd, 0.96, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <circle
          cx={x + 9}
          cy={y + 2}
          r="10"
          fill="#ECFDF5"
          stroke="#A7F3D0"
          strokeWidth="1.5"
        />
        <path
          d={`M${x + 4.5} ${y + 2}L${x + 8} ${y + 5.5}L${x + 14} ${
            y - 2
          }`}
          fill="none"
          stroke="#10B981"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>

      <motion.text
        x={x + 27}
        y={y + 8}
        fontSize="17"
        fontWeight="800"
        animate={{
          fill: [
            "#0F172A",
            "#0F172A",
            "#2563EB",
            "#1D4ED8",
            "#1D4ED8",
            "#0F172A",
          ],
        }}
        transition={{
          duration: LOOP_DURATION,
          times: [0, pulseStart, pulseAt, pulseEnd, 0.94, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {label}
      </motion.text>
    </motion.g>
  );
}

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
                  d="M65 265L525 8"
                  fill="none"
                  stroke="#BFDBFE"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="8 11"
                />

                <motion.path
                  d="M65 265L525 8"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 1, 1],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: LOOP_DURATION,
                    times: [0, 0.86, 1],
                    repeat: Infinity,
                    ease: "linear",
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
                    dur={`${LOOP_DURATION}s`}
                    repeatCount="indefinite"
                    path="M65 265L525 8"
                    keyTimes="0;0.86;1"
                    keyPoints="0;1;1"
                    calcMode="linear"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.06;0.86;1"
                    dur={`${LOOP_DURATION}s`}
                    repeatCount="indefinite"
                  />
                </circle>

                <StageLabel
                  number="01"
                  label="Organizar"
                  x={69}
                  y={309}
                  pulseAt={0.12}
                />

                <StageLabel
                  number="02"
                  label="Praticar"
                  x={169}
                  y={249}
                  pulseAt={0.3}
                />

                <StageLabel
                  number="03"
                  label="Revisar"
                  x={269}
                  y={189}
                  pulseAt={0.48}
                />

                <StageLabel
                  number="04"
                  label="Evoluir"
                  x={369}
                  y={129}
                  pulseAt={0.66}
                />

                <motion.g
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <circle
                    cx="528"
                    cy="8"
                    r="27"
                    fill="#FFFFFF"
                    stroke="#DBEAFE"
                    strokeWidth="2"
                  />
                  <path
                    d="M516 12L525 3L532 9L541 -2"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M534 -2H541V5"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.g>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
