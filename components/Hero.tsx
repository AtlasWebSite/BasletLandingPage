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

const TOTAL_STEPS = 24;
const WORD_CYCLE = 12;
const STEP_WIDTH = 96;
const STEP_HEIGHT = 22;
const STEP_RADIUS = 7;
const STEP_DISTANCE_X = 42;
const STEP_DISTANCE_Y = 22;
const STEP_BASE_X = 18;
const STEP_BASE_Y = 360;
const LOWER_FADE_END = 1.35;
const UPPER_FADE_START = 11.2;
const UPPER_FADE_END = 13.25;
const ESCALATOR_DURATION = 11;

const ARROW_START_X = 84;
const ARROW_START_Y = 320;
const ARROW_FULL_END_X = 512;
const ARROW_FULL_END_Y = 96;
const ARROW_STOP_X = (ARROW_START_X + ARROW_FULL_END_X) / 2;
const ARROW_STOP_Y = (ARROW_START_Y + ARROW_FULL_END_Y) / 2;
const ARROW_ANGLE =
  (Math.atan2(
    ARROW_FULL_END_Y - ARROW_START_Y,
    ARROW_FULL_END_X - ARROW_START_X,
  ) *
    180) /
  Math.PI;

const WORDS_BY_SLOT: Record<number, string> = {
  1: "Organizar",
  4: "Praticar",
  7: "Revisar",
  10: "Evoluir",
};

function wrap(value: number, length: number) {
  return ((value % length) + length) % length;
}

function getVisibility(phase: number) {
  const lowerVisibility = Math.min(Math.max(phase / LOWER_FADE_END, 0), 1);
  const upperVisibility = Math.min(
    Math.max((UPPER_FADE_END - phase) / (UPPER_FADE_END - UPPER_FADE_START), 0),
    1,
  );

  return Math.min(lowerVisibility, upperVisibility);
}

interface EscalatorStepProps {
  index: number;
  progress: MotionValue<number>;
}

function EscalatorStep({ index, progress }: EscalatorStepProps) {
  const label = WORDS_BY_SLOT[index % WORD_CYCLE];

  const x = useTransform(progress, (latestProgress) => {
    const phase = wrap(
      index - latestProgress * TOTAL_STEPS,
      TOTAL_STEPS,
    );

    return STEP_BASE_X + phase * STEP_DISTANCE_X;
  });

  const y = useTransform(progress, (latestProgress) => {
    const phase = wrap(
      index - latestProgress * TOTAL_STEPS,
      TOTAL_STEPS,
    );

    return STEP_BASE_Y - phase * STEP_DISTANCE_Y;
  });

  const opacity = useTransform(progress, (latestProgress) => {
    const phase = wrap(
      index - latestProgress * TOTAL_STEPS,
      TOTAL_STEPS,
    );

    return getVisibility(phase);
  });

  const stepScaleX = useTransform(progress, (latestProgress) => {
    const phase = wrap(
      index - latestProgress * TOTAL_STEPS,
      TOTAL_STEPS,
    );
    const visibility = getVisibility(phase);

    return 0.35 + visibility * 0.65;
  });

  return (
    <motion.g
      style={{
        x,
        y,
        opacity,
      }}
    >
      <motion.rect
        width={STEP_WIDTH}
        height={STEP_HEIGHT}
        rx={STEP_RADIUS}
        fill="#2563EB"
        stroke="#1D4ED8"
        strokeWidth="1.5"
        style={{
          scaleX: stepScaleX,
          transformOrigin: `${STEP_WIDTH / 2}px ${STEP_HEIGHT / 2}px`,
        }}
      />

      {label && (
        <text
          x={STEP_WIDTH / 2}
          y={STEP_HEIGHT / 2 + 5}
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="14"
          fontWeight="800"
          letterSpacing="-0.2"
        >
          {label}
        </text>
      )}
    </motion.g>
  );
}

interface EscalatorVisualProps {
  reducedMotion: boolean;
}

function EscalatorVisual({ reducedMotion }: EscalatorVisualProps) {
  const stairProgress = useMotionValue(0);
  const [staircaseRunning, setStaircaseRunning] = useState(false);

  useEffect(() => {
    if (!staircaseRunning || reducedMotion) {
      return;
    }

    stairProgress.set(0);

    const controls = animate(stairProgress, 1, {
      duration: ESCALATOR_DURATION,
      ease: "linear",
      repeat: Infinity,
    });

    return () => {
      controls.stop();
    };
  }, [reducedMotion, stairProgress, staircaseRunning]);

  const startEscalator = () => {
    if (reducedMotion) {
      return;
    }

    setStaircaseRunning(true);
  };

  return (
    <div className="relative flex h-[430px] w-full items-center justify-center sm:h-[520px]">
      <svg
        viewBox="0 0 590 430"
        role="img"
        aria-label="Escada rolante do StudyFlow com as etapas Organizar, Praticar, Revisar e Evoluir"
        className="h-auto w-full max-w-[590px]"
      >
        <defs>
          <clipPath id="studyflowEscalatorClip">
            <rect x="0" y="0" width="590" height="430" rx="20" />
          </clipPath>
        </defs>

        <g clipPath="url(#studyflowEscalatorClip)">
          {Array.from({ length: TOTAL_STEPS }, (_, index) => (
            <EscalatorStep
              key={index}
              index={index}
              progress={stairProgress}
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
                  scale: 0.62,
                }
          }
          animate={{
            x: ARROW_STOP_X,
            y: ARROW_STOP_Y,
            opacity: 1,
            scale: reducedMotion ? 1.12 : 1.24,
            rotate: ARROW_ANGLE,
          }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  duration: 2.9,
                  ease: [0.22, 1, 0.36, 1],
                  opacity: {
                    duration: 0.45,
                    ease: "easeOut",
                  },
                }
          }
          onAnimationComplete={startEscalator}
          style={{
            transformOrigin: "center",
          }}
        >
          <path
            d="M-38 0H22"
            fill="none"
            stroke="#2563EB"
            strokeWidth="8"
            strokeLinecap="round"
          />

          <path
            d="M12 -15L32 0L12 15"
            fill="none"
            stroke="#2563EB"
            strokeWidth="8"
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
                : { duration: 0.5, ease: "easeOut" }
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
