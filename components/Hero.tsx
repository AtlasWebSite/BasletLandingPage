"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, type MouseEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { APP_URL } from "@/data/pricingData";
import { trackEvent } from "@/lib/analytics";

type AnimationPhase = "arrow" | "escalator";

// Altere somente este valor para aumentar ou diminuir toda a escada.
const STAIR_SIZE = 1.15;
const STEP_WIDTH = 96 * STAIR_SIZE;
const STEP_HEIGHT = 48 * STAIR_SIZE;
const STEP_STROKE_WIDTH = 7 * STAIR_SIZE;
const STEPS_PER_SEQUENCE = 12;
const SEQUENCE_WIDTH = STEP_WIDTH * STEPS_PER_SEQUENCE;
const SEQUENCE_HEIGHT = STEP_HEIGHT * STEPS_PER_SEQUENCE;
const STEP_DURATION = 1.5;

const TRACK_START_X = -STEP_WIDTH * 4;
const TRACK_START_Y = 360 + STEP_HEIGHT * 4;

const ARROW_VERTICAL_OFFSET = -30;
const ARROW_START_X = 84;
const ARROW_START_Y = 320 + ARROW_VERTICAL_OFFSET;
const ARROW_FULL_END_X = 512;
const ARROW_FULL_END_Y = 96 + ARROW_VERTICAL_OFFSET;
const ARROW_SCALE = 1.24;
const ARROW_STOP_X = (ARROW_START_X + ARROW_FULL_END_X) / 2;
const ARROW_STOP_Y = (ARROW_START_Y + ARROW_FULL_END_Y) / 2;
const ARROW_ANGLE =
  (Math.atan2(
    ARROW_FULL_END_Y - ARROW_START_Y,
    ARROW_FULL_END_X - ARROW_START_X,
  ) *
    180) /
  Math.PI;

const WORDS_BY_STEP: Record<number, string> = {
  0: "Organizar",
  3: "Praticar",
  6: "Revisar",
  9: "Evoluir",
};

const STAIRCASE_PATH = Array.from(
  { length: STEPS_PER_SEQUENCE },
  () => `h${STEP_WIDTH}v-${STEP_HEIGHT}`,
).join("");

function StaircaseSequence({ sequence }: { sequence: number }) {
  return (
    <g
      transform={`translate(${TRACK_START_X + sequence * SEQUENCE_WIDTH} ${
        TRACK_START_Y - sequence * SEQUENCE_HEIGHT
      })`}
    >
      <path
        d={`M0 0${STAIRCASE_PATH}`}
        fill="none"
        stroke="#2563EB"
        strokeWidth={STEP_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function WordSequence({ sequence }: { sequence: number }) {
  return (
    <g
      transform={`translate(${TRACK_START_X + sequence * SEQUENCE_WIDTH} ${
        TRACK_START_Y - sequence * SEQUENCE_HEIGHT
      })`}
    >
      {Object.entries(WORDS_BY_STEP).map(([step, label]) => {
        const stepIndex = Number(step);

        return (
          <text
            key={label}
            x={stepIndex * STEP_WIDTH + STEP_WIDTH / 2}
            y={-stepIndex * STEP_HEIGHT - 11 * STAIR_SIZE}
            textAnchor="middle"
            fill="#0F172A"
            fontSize={14 * STAIR_SIZE}
            fontWeight="800"
            letterSpacing={-0.25 * STAIR_SIZE}
          >
            {label}
          </text>
        );
      })}
    </g>
  );
}

function EscalatorVisual() {
  const [animationPhase, setAnimationPhase] =
    useState<AnimationPhase>("arrow");

  const escalatorIsRunning = animationPhase === "escalator";

  return (
    <div
      className="relative flex h-[460px] w-full items-center justify-center sm:h-[540px]"
      data-animation-phase={animationPhase}
    >
      <svg
        viewBox="0 0 590 430"
        role="img"
        aria-label="Escada rolante do StudyFlow descendo na diagonal com as etapas Organizar, Praticar, Revisar e Evoluir"
        overflow="hidden"
        className="h-auto w-full max-w-[620px] overflow-hidden"
      >
        <defs>
          <clipPath id="studyflowEscalatorClip">
            <rect x="0" y="0" width="590" height="430" rx="12" />
          </clipPath>
        </defs>

        <g clipPath="url(#studyflowEscalatorClip)">
          <motion.g
            data-escalator-track="steps"
            initial={false}
            animate={
              escalatorIsRunning
                ? { x: -STEP_WIDTH, y: STEP_HEIGHT }
                : { x: 0, y: 0 }
            }
            transition={
              escalatorIsRunning
                ? {
                    duration: STEP_DURATION,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                  }
                : { duration: 0 }
            }
          >
            <StaircaseSequence sequence={0} />
            <StaircaseSequence sequence={1} />
          </motion.g>

          <motion.g
            data-escalator-track="words"
            initial={false}
            animate={
              escalatorIsRunning
                ? { x: -SEQUENCE_WIDTH, y: SEQUENCE_HEIGHT }
                : { x: 0, y: 0 }
            }
            transition={
              escalatorIsRunning
                ? {
                    duration: STEP_DURATION * STEPS_PER_SEQUENCE,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                  }
                : { duration: 0 }
            }
          >
            <WordSequence sequence={0} />
            <WordSequence sequence={1} />
          </motion.g>
        </g>

        <motion.g
          data-escalator-arrow="true"
          initial={{
            x: ARROW_START_X,
            y: ARROW_START_Y,
            opacity: 0,
            scale: ARROW_SCALE,
            rotate: ARROW_ANGLE,
          }}
          animate={{
            x: ARROW_STOP_X,
            y: ARROW_STOP_Y,
            opacity: 1,
            scale: ARROW_SCALE,
            rotate: ARROW_ANGLE,
          }}
          transition={{
            duration: 1.8,
            ease: "linear",
            opacity: {
              duration: 0.4,
              ease: "easeOut",
            },
          }}
          onAnimationComplete={() => {
            setAnimationPhase("escalator");
          }}
          style={{
            transformOrigin: "center",
          }}
        >
          <path
            d="M-44 0H28"
            fill="none"
            stroke="#2563EB"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <path
            d="M16 -13L32 0L16 13"
            fill="none"
            stroke="#2563EB"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      </svg>
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
    <section className="relative overflow-hidden bg-white pb-24 pt-32 md:pb-36 md:pt-44">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
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

          <div className="relative flex w-full items-center justify-center lg:col-span-5">
            <EscalatorVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
