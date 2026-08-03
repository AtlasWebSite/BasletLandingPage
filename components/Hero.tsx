"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState, type MouseEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { APP_URL } from "@/data/pricingData";
import { trackEvent } from "@/lib/analytics";

type AnimationPhase = "arrow" | "escalator";

// Altere somente este valor para aumentar ou diminuir toda a escada.
const STAIR_SIZE = 1.4;
const STEP_WIDTH = 96 * STAIR_SIZE;
const STEP_HEIGHT = 48 * STAIR_SIZE;
const STEP_STROKE_WIDTH = 7 * STAIR_SIZE;
const WORD_STEP_COLOR = "#60A5FA";
const STEPS_PER_SEQUENCE = 12;
const SEQUENCE_WIDTH = STEP_WIDTH * STEPS_PER_SEQUENCE;
const SEQUENCE_HEIGHT = STEP_HEIGHT * STEPS_PER_SEQUENCE;

// 1 = velocidade atual; valores maiores aceleram e menores desaceleram.
const ESCALATOR_SPEED = 1;
const STEP_DURATION = 1.5 / ESCALATOR_SPEED;

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
const ARROW_TIP_X_OFFSET =
  35 * ARROW_SCALE * Math.cos((ARROW_ANGLE * Math.PI) / 180);
const ARROW_HIT_X = ARROW_STOP_X + ARROW_TIP_X_OFFSET;

const WORDS_BY_STEP: Record<number, string> = {
  0: "Organizar",
  3: "Praticar",
  6: "Revisar",
  9: "Evoluir",
};
const WORD_ENTRIES = Object.entries(WORDS_BY_STEP).map(
  ([step, label]) => ({ step: Number(step), label }),
);

function getWordContentWidth(label: string) {
  const fontSize = 14 * STAIR_SIZE;
  const indicatorRadius = 7 * STAIR_SIZE;
  const indicatorGap = 4 * STAIR_SIZE;

  return indicatorRadius * 2 + indicatorGap + label.length * fontSize * 0.56;
}

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

interface WordSequenceProps {
  completedWords: ReadonlySet<string>;
  sequence: number;
}

function WordSequence({ completedWords, sequence }: WordSequenceProps) {
  return (
    <g
      transform={`translate(${TRACK_START_X + sequence * SEQUENCE_WIDTH} ${
        TRACK_START_Y - sequence * SEQUENCE_HEIGHT
      })`}
    >
      {WORD_ENTRIES.map(({ step: stepIndex, label }) => {
        const isComplete = completedWords.has(label);
        const stageNumber = String(stepIndex / 3 + 1).padStart(2, "0");
        const fontSize = 14 * STAIR_SIZE;
        const centerX = stepIndex * STEP_WIDTH + STEP_WIDTH / 2;
        const labelY = -stepIndex * STEP_HEIGHT - 11 * STAIR_SIZE;
        const indicatorRadius = 7 * STAIR_SIZE;
        const indicatorGap = 4 * STAIR_SIZE;
        const contentWidth = getWordContentWidth(label);
        const contentStartX = centerX - contentWidth / 2;
        const indicatorX = contentStartX + indicatorRadius;
        const indicatorY = labelY - fontSize * 0.35;
        const textX = contentStartX + indicatorRadius * 2 + indicatorGap;
        const iconMarkSize = 3.5 * STAIR_SIZE;

        return (
          <g
            key={label}
            data-word-status={isComplete ? "complete" : "pending"}
            data-word-label={label}
          >
            <line
              x1={stepIndex * STEP_WIDTH}
              y1={-stepIndex * STEP_HEIGHT}
              x2={(stepIndex + 1) * STEP_WIDTH}
              y2={-stepIndex * STEP_HEIGHT}
              stroke={WORD_STEP_COLOR}
              strokeWidth={STEP_STROKE_WIDTH}
              strokeLinecap="round"
            />

            <text
              x={contentStartX}
              y={labelY - fontSize - 3 * STAIR_SIZE}
              fill="#2563EB"
              fontSize={8 * STAIR_SIZE}
              fontWeight="800"
            >
              {stageNumber}
            </text>

            <motion.circle
              cx={indicatorX}
              cy={indicatorY}
              r={indicatorRadius}
              animate={{
                fill: isComplete ? "#ECFDF5" : "#FEF2F2",
                stroke: isComplete ? "#86EFAC" : "#FCA5A5",
              }}
              transition={{ duration: 0.18 }}
              strokeWidth={1.4 * STAIR_SIZE}
            />

            <motion.path
              d={
                isComplete
                  ? `M${indicatorX - iconMarkSize} ${indicatorY}L${
                      indicatorX - iconMarkSize * 0.25
                    } ${indicatorY + iconMarkSize * 0.75}L${
                      indicatorX + iconMarkSize
                    } ${indicatorY - iconMarkSize}`
                  : `M${indicatorX - iconMarkSize} ${
                      indicatorY - iconMarkSize
                    }L${indicatorX + iconMarkSize} ${
                      indicatorY + iconMarkSize
                    }M${indicatorX + iconMarkSize} ${
                      indicatorY - iconMarkSize
                    }L${indicatorX - iconMarkSize} ${
                      indicatorY + iconMarkSize
                    }`
              }
              fill="none"
              animate={{
                stroke: isComplete ? "#22C55E" : "#EF4444",
              }}
              transition={{ duration: 0.18 }}
              strokeWidth={1.8 * STAIR_SIZE}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <motion.text
              x={textX}
              y={labelY}
              textAnchor="start"
              animate={{ fill: isComplete ? "#2563EB" : "#0F172A" }}
              transition={{ duration: 0.18 }}
              fontSize={fontSize}
              fontWeight="800"
              letterSpacing={-0.25 * STAIR_SIZE}
            >
              {label}
            </motion.text>
          </g>
        );
      })}
    </g>
  );
}

function EscalatorVisual() {
  const [animationPhase, setAnimationPhase] =
    useState<AnimationPhase>("arrow");
  const [completedWords, setCompletedWords] = useState<Set<string>>(
    () => new Set(),
  );
  const previousArrowTipX = useRef(ARROW_START_X + ARROW_TIP_X_OFFSET);
  const previousWordsOffset = useRef(0);

  const escalatorIsRunning = animationPhase === "escalator";

  const completeWords = useCallback((labels: string[]) => {
    if (labels.length === 0) {
      return;
    }

    setCompletedWords((currentWords) => {
      const nextWords = new Set(currentWords);
      let changed = false;

      labels.forEach((label) => {
        if (!nextWords.has(label)) {
          nextWords.add(label);
          changed = true;
        }
      });

      return changed ? nextWords : currentWords;
    });
  }, []);

  const resetWords = useCallback((labels: string[]) => {
    if (labels.length === 0) {
      return;
    }

    setCompletedWords((currentWords) => {
      const nextWords = new Set(currentWords);
      let changed = false;

      labels.forEach((label) => {
        if (nextWords.delete(label)) {
          changed = true;
        }
      });

      return changed ? nextWords : currentWords;
    });
  }, []);

  const trackArrowCrossings = useCallback(
    (latest: { x?: number | string }) => {
      if (typeof latest.x !== "number") {
        return;
      }

      const currentTipX = latest.x + ARROW_TIP_X_OFFSET;
      const crossedLabels = WORD_ENTRIES.filter(({ step }) => {
        const wordX = TRACK_START_X + step * STEP_WIDTH + STEP_WIDTH / 2;

        return previousArrowTipX.current < wordX && currentTipX >= wordX;
      }).map(({ label }) => label);

      previousArrowTipX.current = currentTipX;
      completeWords(crossedLabels);
    },
    [completeWords],
  );

  const trackWordCrossings = useCallback(
    (latest: { x?: number | string }) => {
      if (typeof latest.x !== "number") {
        return;
      }

      const currentOffset = latest.x;
      const previousOffset = previousWordsOffset.current;

      if (currentOffset <= previousOffset) {
        const crossedLabels = [0, 1].flatMap((sequence) =>
          WORD_ENTRIES.filter(({ step }) => {
            const initialWordX =
              TRACK_START_X +
              sequence * SEQUENCE_WIDTH +
              step * STEP_WIDTH +
              STEP_WIDTH / 2;
            const previousWordX = initialWordX + previousOffset;
            const currentWordX = initialWordX + currentOffset;

            return previousWordX > ARROW_HIT_X && currentWordX <= ARROW_HIT_X;
          }).map(({ label }) => label),
        );

        completeWords(crossedLabels);

        const exitedLabels = [0, 1].flatMap((sequence) =>
          WORD_ENTRIES.filter(({ step, label }) => {
            const initialWordX =
              TRACK_START_X +
              sequence * SEQUENCE_WIDTH +
              step * STEP_WIDTH +
              STEP_WIDTH / 2;
            const halfContentWidth = getWordContentWidth(label) / 2;
            const previousRightEdge =
              initialWordX + previousOffset + halfContentWidth;
            const currentRightEdge =
              initialWordX + currentOffset + halfContentWidth;

            return previousRightEdge >= 0 && currentRightEdge < 0;
          }).map(({ label }) => label),
        );

        resetWords(exitedLabels);
      }

      previousWordsOffset.current = currentOffset;
    },
    [completeWords, resetWords],
  );

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
            onUpdate={trackWordCrossings}
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
            <WordSequence completedWords={completedWords} sequence={0} />
            <WordSequence completedWords={completedWords} sequence={1} />
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
          onUpdate={trackArrowCrossings}
          onAnimationComplete={() => {
            setAnimationPhase("escalator");
          }}
          style={{
            transformOrigin: "center",
          }}
        >
          <path
            d="M-44 0H16"
            fill="none"
            stroke="#2563EB"
            strokeWidth="6.5"
            strokeLinecap="round"
          />

          <path
            d="M11 -15L34 0L11 15Z"
            fill="#2563EB"
            stroke="#2563EB"
            strokeWidth="2"
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
