"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { APP_URL } from "@/data/pricingData";
import { trackEvent } from "@/lib/analytics";

type AnimationPhase = "arrow" | "escalator";

const TOTAL_STEPS = 24;
const WORD_CYCLE = 12;

const STEP_WIDTH = 84;
const STEP_HEIGHT = 42;
const STEP_STROKE_WIDTH = 6;

const STEP_BASE_X = 8;
const STEP_BASE_Y = 356;

const LOWER_DRAW_END = 0.8;
const UPPER_DRAW_START = 6.25;
const UPPER_DRAW_END = 7.35;

const ESCALATOR_CYCLE_DURATION = 30;

const ARROW_START_X = 72;
const ARROW_START_Y = 282;
const ARROW_FULL_END_X = 520;
const ARROW_FULL_END_Y = 58;
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

function wrap(value: number, length: number) {
  return ((value % length) + length) % length;
}

function getDrawProgress(slot: number) {
  const lowerProgress = Math.min(
    Math.max(slot / LOWER_DRAW_END, 0),
    1,
  );

  const upperProgress = Math.min(
    Math.max(
      (UPPER_DRAW_END - slot) /
        (UPPER_DRAW_END - UPPER_DRAW_START),
      0,
    ),
    1,
  );

  return Math.min(lowerProgress, upperProgress);
}

interface StairStepProps {
  index: number;
  offset: MotionValue<number>;
}

function StairStep({ index, offset }: StairStepProps) {
  const label = WORDS_BY_STEP[index % WORD_CYCLE];

  const slot = useTransform(offset, (latestOffset) =>
    wrap(index - latestOffset, TOTAL_STEPS),
  );

  const x = useTransform(
    slot,
    (latestSlot) => STEP_BASE_X + latestSlot * STEP_WIDTH,
  );

  const y = useTransform(
    slot,
    (latestSlot) => STEP_BASE_Y - latestSlot * STEP_HEIGHT,
  );

  const drawProgress = useTransform(slot, getDrawProgress);

  const textOpacity = useTransform(
    drawProgress,
    [0, 0.55, 1],
    [0, 0, 1],
  );

  return (
    <motion.g
      style={{
        x,
        y,
      }}
    >
      <motion.path
        d={`M0 0H${STEP_WIDTH}V-${STEP_HEIGHT}`}
        fill="none"
        stroke="#2563EB"
        strokeWidth={STEP_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          pathLength: drawProgress,
          opacity: drawProgress,
        }}
      />

      {label && (
        <motion.text
          x={STEP_WIDTH / 2}
          y={-11}
          textAnchor="middle"
          fill="#0F172A"
          fontSize="14"
          fontWeight="800"
          letterSpacing="-0.25"
          style={{
            opacity: textOpacity,
          }}
        >
          {label}
        </motion.text>
      )}
    </motion.g>
  );
}

interface EscalatorVisualProps {
  reducedMotion: boolean;
}

function EscalatorVisual({ reducedMotion }: EscalatorVisualProps) {
  const [phase, setPhase] = useState<AnimationPhase>(
    reducedMotion ? "escalator" : "arrow",
  );

  const stairOffset = useMotionValue(0);

  useEffect(() => {
    if (phase !== "escalator" || reducedMotion) {
      return;
    }

    stairOffset.set(0);

    const controls = animate(stairOffset, TOTAL_STEPS, {
      duration: ESCALATOR_CYCLE_DURATION,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => {
      controls.stop();
    };
  }, [phase, reducedMotion, stairOffset]);

  const finishArrowPhase = () => {
    if (phase !== "arrow") {
      return;
    }

    setPhase("escalator");
  };

  return (
    <div className="relative flex h-[460px] w-full items-center justify-center sm:h-[540px]">
      <svg
        viewBox="0 0 590 430"
        role="img"
        aria-label="Escada rolante do StudyFlow descendo na diagonal com as etapas Organizar, Praticar, Revisar e Evoluir"
        className="h-auto w-full max-w-[620px] overflow-visible"
      >
        <defs>
          <clipPath id="studyflowEscalatorClip">
            <rect x="0" y="0" width="590" height="430" rx="12" />
          </clipPath>
        </defs>

        <g clipPath="url(#studyflowEscalatorClip)">
          {Array.from({ length: TOTAL_STEPS }, (_, index) => (
            <StairStep
              key={index}
              index={index}
              offset={stairOffset}
            />
          ))}
        </g>

        <motion.g
          initial={
            reducedMotion
              ? false
              : {
                  x: ARROW_START_X,
                  y: ARROW_START_Y,
                  opacity: 0,
                  scale: 0.68,
                  rotate: ARROW_ANGLE,
                }
          }
          animate={{
            x: ARROW_STOP_X,
            y: ARROW_STOP_Y,
            opacity: 1,
            scale: reducedMotion ? 1.12 : 1.2,
            rotate: ARROW_ANGLE,
          }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  duration: 3,
                  ease: [0.22, 1, 0.36, 1],
                  opacity: {
                    duration: 0.4,
                    ease: "easeOut",
                  },
                }
          }
          onAnimationComplete={finishArrowPhase}
          style={{
            transformOrigin: "center",
          }}
        >
          <path
            d="M-46 0H23"
            fill="none"
            stroke="#2563EB"
            strokeWidth="9"
            strokeLinecap="round"
          />

          <path
            d="M10 -17L34 0L10 17"
            fill="none"
            stroke="#2563EB"
            strokeWidth="9"
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
            <EscalatorVisual reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>
    </section>
  );
}
