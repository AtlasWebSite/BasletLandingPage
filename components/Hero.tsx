"use client";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { APP_URL } from "@/data/pricingData";
import { trackEvent } from "@/lib/analytics";

const LOOP_DURATION = 6;
const ARROW_ACTIVE_END = 0.86;
const ARROW_START_X = 60;
const ARROW_START_Y = 275;
const ARROW_END_X = 545;
const ARROW_END_Y = 20;
const ARROW_ANGLE = -27.73;

const STAGE_CENTERS = [105, 225, 345, 465];

interface StageLabelProps {
  number: string;
  label: string;
  centerX: number;
  y: number;
  active: boolean;
}

function StageLabel({
  number,
  label,
  centerX,
  y,
  active,
}: StageLabelProps) {
  const iconX = centerX - 55;

  return (
    <motion.g
      animate={
        active
          ? {
              scale: [1, 1.2, 1.08],
              y: [0, -3, 0],
            }
          : {
              scale: 1,
              y: 0,
            }
      }
      transition={
        active
          ? {
              duration: 0.45,
              ease: "easeOut",
            }
          : {
              duration: 0.18,
              ease: "easeOut",
            }
      }
      style={{
        originX: 0.5,
        originY: 0.5,
      }}
    >
      <motion.text
        x={iconX}
        y={y - 21}
        fontSize="12"
        fontWeight="800"
        animate={{
          fill: active ? "#2563EB" : "#60A5FA",
        }}
        transition={{ duration: 0.2 }}
      >
        {number}
      </motion.text>

      <motion.g
        animate={{
          opacity: active ? 0 : 1,
          scale: active ? 0.65 : 1,
        }}
        transition={{ duration: 0.18 }}
      >
        <circle
          cx={iconX + 9}
          cy={y + 2}
          r="10"
          fill="#FEF2F2"
          stroke="#FECACA"
          strokeWidth="1.5"
        />

        <path
          d={`M${iconX + 5} ${y - 2}L${iconX + 13} ${y + 6}M${
            iconX + 13
          } ${y - 2}L${iconX + 5} ${y + 6}`}
          fill="none"
          stroke="#EF4444"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </motion.g>

      <motion.g
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? [0.65, 1.25, 1] : 0.65,
        }}
        transition={{
          duration: active ? 0.4 : 0.18,
          ease: "easeOut",
        }}
      >
        <circle
          cx={iconX + 9}
          cy={y + 2}
          r="10"
          fill="#ECFDF5"
          stroke="#A7F3D0"
          strokeWidth="1.5"
        />

        <path
          d={`M${iconX + 4.5} ${y + 2}L${iconX + 8} ${y + 5.5}L${
            iconX + 14
          } ${y - 2}`}
          fill="none"
          stroke="#10B981"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>

      <motion.text
        x={centerX}
        y={y + 8}
        textAnchor="middle"
        fontSize="17"
        fontWeight="800"
        animate={{
          fill: active ? "#1D4ED8" : "#0F172A",
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.text>
    </motion.g>
  );
}

export default function Hero() {
  const arrowX = useMotionValue(ARROW_START_X);
  const arrowY = useMotionValue(ARROW_START_Y);
  const [completedStages, setCompletedStages] = useState(0);

  useEffect(() => {
    const xAnimation = animate(
      arrowX,
      [ARROW_START_X, ARROW_END_X, ARROW_END_X],
      {
        duration: LOOP_DURATION,
        times: [0, ARROW_ACTIVE_END, 1],
        repeat: Infinity,
        ease: "linear",
      },
    );

    const yAnimation = animate(
      arrowY,
      [ARROW_START_Y, ARROW_END_Y, ARROW_END_Y],
      {
        duration: LOOP_DURATION,
        times: [0, ARROW_ACTIVE_END, 1],
        repeat: Infinity,
        ease: "linear",
      },
    );

    return () => {
      xAnimation.stop();
      yAnimation.stop();
    };
  }, [arrowX, arrowY]);

  useMotionValueEvent(arrowX, "change", (latestX) => {
    const nextCompletedStages = STAGE_CENTERS.filter(
      (stageCenterX) => latestX >= stageCenterX,
    ).length;

    setCompletedStages((current) => {
      if (current === nextCompletedStages) {
        return current;
      }

      return nextCompletedStages;
    });
  });

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
                  d="M45 350H165V285H285V220H405V155H525V90H570"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#studyflowLineShadow)"
                />

                <path
                  d="M60 275L545 20"
                  fill="none"
                  stroke="#BFDBFE"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="8 11"
                />


                <motion.g
                  filter="url(#studyflowPointGlow)"
                  style={{
                    x: arrowX,
                    y: arrowY,
                    rotate: ARROW_ANGLE,
                    transformOrigin: "center",
                  }}
                >
                  <path
                    d="M-21 -14L21 0L-21 14L-10 0Z"
                    fill="#2563EB"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                </motion.g>

                <StageLabel
                  number="01"
                  label="Organizar"
                  centerX={STAGE_CENTERS[0]}
                  y={320}
                  active={completedStages >= 1}
                />

                <StageLabel
                  number="02"
                  label="Praticar"
                  centerX={STAGE_CENTERS[1]}
                  y={255}
                  active={completedStages >= 2}
                />

                <StageLabel
                  number="03"
                  label="Revisar"
                  centerX={STAGE_CENTERS[2]}
                  y={190}
                  active={completedStages >= 3}
                />

                <StageLabel
                  number="04"
                  label="Evoluir"
                  centerX={STAGE_CENTERS[3]}
                  y={125}
                  active={completedStages >= 4}
                />

              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
