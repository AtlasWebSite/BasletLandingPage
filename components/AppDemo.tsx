"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronRight,
  GitFork,
  Layers3,
  ListChecks,
  Network,
  RotateCcw,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { APP_URL } from "@/data/pricingData";
import { trackEvent } from "@/lib/analytics";

type DemoTabId = "dashboard" | "flashcards" | "mapas" | "testes" | "progresso";

const AUTO_SWITCH_SECONDS = 6;

interface DemoTab {
  id: DemoTabId;
  label: string;
  icon: typeof BarChart3;
  benefit: string;
  description: string;
  highlights: string[];
}

const tabs: DemoTab[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
    benefit: "Tenha uma visão clara de tudo que está estudando.",
    description:
      "O início reúne sua próxima revisão, seus conjuntos recentes e o panorama do seu acervo.",
    highlights: [
      "Próximo passo recomendado",
      "Estudos recentes organizados",
      "Visão geral dos 25 flashcards iniciais",
    ],
  },
  {
    id: "flashcards",
    label: "Flashcards",
    icon: Layers3,
    benefit: "Descubra rapidamente o que ainda não memorizou.",
    description:
      "Revise cada conceito, revele a resposta e registre o quanto você já domina.",
    highlights: [
      "Sessões organizadas por conjunto",
      "Respostas em frente e verso",
      "Avaliação: Não sei, Quase sei ou Sei",
    ],
  },
  {
    id: "mapas",
    label: "Mapas mentais",
    icon: Network,
    benefit: "Transforme assuntos complexos em uma estrutura visual mais clara.",
    description:
      "Os flashcards do conjunto viram conceitos e conexões que facilitam a revisão.",
    highlights: [
      "Gerado a partir dos seus flashcards",
      "Modos resumido e completo",
      "Mapas vinculados ao conjunto estudado",
    ],
  },
  {
    id: "testes",
    label: "Testes",
    icon: ListChecks,
    benefit: "Descubra o que ainda precisa revisar antes da prova.",
    description:
      "Pratique com perguntas criadas a partir dos conceitos dos seus próprios conjuntos.",
    highlights: [
      "Questões baseadas nos flashcards",
      "Correção imediata das respostas",
      "Resultado registrado no progresso",
    ],
  },
  {
    id: "progresso",
    label: "Progresso",
    icon: Target,
    benefit: "Veja onde você está evoluindo e onde precisa melhorar.",
    description:
      "Acompanhe domínio, cards praticados, revisões pendentes e evolução por matéria.",
    highlights: [
      "Dados reais das suas respostas",
      "Cards dominados e pendentes",
      "Panorama geral do aprendizado",
    ],
  },
];

const sidebarItems = [
  ["Início", BarChart3],
  ["Estudos", BookOpen],
  ["Flashcards", Layers3],
  ["Mapas Mentais", Network],
  ["Testes", ListChecks],
  ["Progresso", Target],
] as const;

const stackedFlashcards = [
  "left-[2%] right-[2%] top-0 -rotate-[5deg] bg-violet-50",
  "left-[1%] right-[1%] top-1 rotate-[5deg] bg-cyan-50",
  "left-[3%] -right-[1%] top-2 -rotate-[3deg] bg-amber-50",
  "-left-[1%] right-[3%] top-3 rotate-[3deg] bg-emerald-50",
  "left-[1%] right-[1%] top-4 -rotate-[1.5deg] bg-blue-50",
] as const;

function ProductShell({
  active,
  title,
  children,
}: {
  active: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="grid h-full min-h-0 min-w-0 overflow-hidden bg-[#f5f6fb] sm:grid-cols-[146px_minmax(0,1fr)]">
      <aside className="no-scrollbar hidden min-h-0 overflow-y-auto border-r border-slate-200 bg-white p-4 sm:block">
        <div className="mb-6 flex items-center gap-2 px-1 text-sm font-black text-slate-950">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-600 text-white">
            S
          </span>
          StudyFlow
        </div>
        <div className="space-y-1">
          {sidebarItems.map(([label, Icon]) => (
            <div
              key={label}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-xs font-semibold ${
                label === active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-500"
              }`}
            >
              <Icon size={14} />
              {label}
            </div>
          ))}
        </div>
      </aside>

      <main className="flex h-full min-h-0 min-w-0 flex-col">
        <header className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-3 py-2.5 sm:px-4 sm:py-3">
          <div>
            <strong className="block text-xs text-slate-950 sm:text-sm">
              {title}
            </strong>
            <span className="hidden text-xs text-slate-400 sm:block">
              Seu espaço de estudos
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <div className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs sm:flex">
              <Search size={13} />
              Buscar conjuntos...
            </div>
            <div className="grid h-7 w-7 place-items-center rounded-lg border border-slate-200 bg-white">
              <Bell size={13} />
            </div>
          </div>
        </header>
        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto p-3 sm:p-4">{children}</div>
      </main>
    </div>
  );
}

function DashboardDemo() {
  const recent = [
    ["Inglês básico", "8 cards", "#6758e8"],
    ["Biologia celular", "6 cards", "#17a99a"],
    ["História do Brasil", "5 cards", "#ef8d55"],
  ];

  return (
    <ProductShell active="Início" title="Olá! Pronto para avançar hoje?">
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#6658df] to-[#477fe8] p-4 text-white sm:p-5">
        <div className="max-w-[72%]">
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/75 sm:text-xs">
            <Sparkles size={13} /> Próximo passo recomendado
          </span>
          <strong className="mt-2 block text-sm leading-tight sm:text-xl">
            Você tem 25 cards para revisar hoje.
          </strong>
          <p className="mt-1.5 text-xs leading-relaxed text-white/75 sm:text-sm">
            Comece por “Inglês básico” para fortalecer o que ainda precisa de prática.
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-2 text-xs font-bold text-blue-700 sm:text-sm">
            <RotateCcw size={13} /> Revisar agora
          </span>
        </div>
        <div className="absolute right-3 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border-[7px] border-white/25 bg-white/10 sm:right-7 sm:h-24 sm:w-24 sm:border-[10px]">
          <div className="text-center">
            <strong className="block text-lg sm:text-2xl">0%</strong>
            <span className="text-[10px] text-white/70 sm:text-xs">domínio geral</span>
          </div>
        </div>
      </section>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {(
          [
            ["Estudar conjunto", "Retome seus flashcards", Layers3],
            ["Teste rápido", "Pratique com perguntas", BrainCircuit],
            ["Meus estudos", "Veja seus conjuntos", BookOpen],
          ] as const
        ).map(([title, detail, Icon]) => (
          <div
            key={String(title)}
            className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-sm"
          >
            <span className="hidden h-7 w-7 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600 sm:grid">
              <Icon size={13} />
            </span>
            <div className="min-w-0">
              <strong className="block truncate text-[11px] text-slate-900 sm:text-xs">
                {title as string}
              </strong>
              <span className="hidden truncate text-[10px] text-slate-400 sm:block">
                {detail as string}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <div className="mb-2 flex items-center justify-between">
          <strong className="text-xs text-slate-950 sm:text-sm">
            Estudos recentes
          </strong>
          <span className="text-[11px] font-semibold text-blue-600 sm:text-xs">
            Ver todos
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {recent.map(([title, count, color]) => (
            <div key={title} className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">
              <span
                className="block h-1 w-8 rounded-full"
                style={{ backgroundColor: color }}
              />
              <strong className="mt-2 block truncate text-[11px] text-slate-900 sm:text-xs">
                {title}
              </strong>
              <span className="text-[10px] text-slate-400 sm:text-xs">{count}</span>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100">
                <span className="block h-full w-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProductShell>
  );
}

function FlashcardsDemo() {
  return (
    <ProductShell active="Flashcards" title="Flashcards">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue-600 sm:text-xs">
              Sessão em foco
            </span>
            <strong className="block text-xs text-slate-950 sm:text-base">
              Biologia celular
            </strong>
          </div>
          <div className="text-[11px] text-slate-400 sm:text-sm">
            <strong className="text-slate-950">1</strong> / 6
          </div>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
          <span className="block h-full w-1/6 rounded-full bg-blue-600" />
        </div>

        <div className="relative mx-auto mt-4 h-[245px] w-[94%] sm:h-[292px] sm:w-[92%]">
          {stackedFlashcards.map((cardClass, index) => (
            <div
              key={cardClass}
              aria-hidden="true"
              className={`absolute h-[82%] rounded-[22px] border border-slate-200 shadow-[0_10px_28px_rgba(15,23,42,0.1)] ${cardClass}`}
            >
              <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-slate-200/80" />
              <div className="mx-auto mt-4 h-2 w-[58%] rounded-full bg-slate-200/60" />
              <span className="absolute right-4 top-4 text-[9px] font-bold text-slate-400">
                {index + 2} / 6
              </span>
            </div>
          ))}

          <article className="absolute inset-x-[4%] top-5 z-10 flex h-[82%] flex-col rounded-[22px] border border-slate-200 bg-white px-5 py-5 text-center shadow-[0_20px_45px_rgba(15,23,42,0.16)] sm:px-9 sm:py-7">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-left">
              <span className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600 sm:text-xs">
                <Layers3 size={14} /> Flashcard
              </span>
              <span className="text-[10px] font-semibold text-slate-400 sm:text-xs">
                1 / 6
              </span>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center py-3">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-400 sm:text-xs">
                Termo
              </span>
              <strong className="mt-3 max-w-xl text-lg leading-snug text-slate-950 sm:text-2xl">
                Cite três características do Parnasianismo.
              </strong>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 sm:text-xs">
              Clique para ver a resposta
            </span>
          </article>
        </div>
      </div>
    </ProductShell>
  );
}

function MindMapDemo() {
  return (
    <ProductShell active="Mapas Mentais" title="Mapas Mentais">
      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue-600 sm:text-xs">
              Conjunto selecionado
            </span>
            <strong className="block text-xs text-slate-950 sm:text-base">
              Biologia celular
            </strong>
          </div>
          <span className="flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-2 text-[11px] font-semibold text-slate-600 sm:text-xs">
            <GitFork size={13} /> Modo resumido
          </span>
        </div>

        <div className="relative mt-3 overflow-hidden rounded-xl bg-[#f8f9fc] p-3 sm:p-5">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
              {["Núcleo", "DNA", "Citoplasma"].map((node) => (
                <span
                  key={node}
                  className="rounded-lg border border-violet-200 bg-white px-2.5 py-2 text-center text-[11px] font-semibold text-violet-700 shadow-sm sm:text-xs"
                >
                  {node}
                </span>
              ))}
            </div>
            <span className="hidden h-px w-8 bg-slate-300 sm:block" />
            <div className="rounded-xl bg-blue-600 px-5 py-4 text-center text-sm font-bold text-white shadow-md sm:text-base">
              Biologia celular
            </div>
            <span className="hidden h-px w-8 bg-slate-300 sm:block" />
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
              {["Mitocôndria", "Membrana plasmática", "Célula"].map((node) => (
                <span
                  key={node}
                  className="rounded-lg border border-cyan-200 bg-white px-2.5 py-2 text-center text-[11px] font-semibold text-cyan-700 shadow-sm sm:text-xs"
                >
                  {node}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 sm:text-xs">
          <span>6 conceitos conectados</span>
          <span>Gerado a partir dos flashcards</span>
        </div>
      </div>
    </ProductShell>
  );
}

function TestsDemo() {
  const options = [
    "Estrutura que guarda o material genético da célula.",
    "Organela responsável pela produção de energia.",
    "Camada que controla a entrada e saída de substâncias.",
  ];

  return (
    <ProductShell active="Testes" title="Testes">
      <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-3 sm:p-4">
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            <span className="font-semibold text-slate-600">
              Biologia celular · Questão 1 de 5
            </span>
            <strong className="text-blue-600">0 acertos</strong>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <span className="block h-full w-1/5 rounded-full bg-blue-600" />
          </div>
        </div>

        <div className="p-3 sm:p-5">
          <span className="text-[11px] font-black uppercase tracking-[0.13em] text-blue-600 sm:text-xs">
            Escolha a definição correta
          </span>
          <h3 className="mt-2 text-sm font-bold text-slate-950 sm:text-xl">
            O que significa “Mitocôndria”?
          </h3>
          <div className="mt-4 space-y-2">
            {options.map((option, index) => (
              <div
                key={option}
                className={`flex items-center gap-2.5 rounded-lg border p-3 text-xs font-semibold sm:p-3.5 sm:text-sm ${
                  index === 1
                    ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white text-[11px] shadow-sm">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="min-w-0 flex-1">{option}</span>
                {index === 1 && <CheckCircle2 size={13} />}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 p-3 text-xs sm:px-5 sm:text-sm">
          <span className="flex items-center gap-1 font-semibold text-emerald-700">
            <Check size={11} /> Resposta certa!
          </span>
          <span className="flex items-center gap-1 rounded-md bg-blue-600 px-2.5 py-1.5 font-bold text-white">
            Próxima questão <ChevronRight size={11} />
          </span>
        </div>
      </div>
    </ProductShell>
  );
}

function ProgressDemo() {
  return (
    <div className="flex h-full min-h-0 items-center justify-center overflow-hidden bg-[#f5f6fb] p-2 sm:p-4">
      <Image
        src="/hero-studyflow-dashboard-real.jpg"
        alt="Tela real de progresso do StudyFlow"
        width={753}
        height={720}
        sizes="(min-width: 1024px) 720px, 92vw"
        quality={92}
        className="h-auto max-h-full w-auto max-w-full rounded-xl border border-slate-200 bg-white object-contain shadow-sm"
      />
    </div>
  );
}

function ActiveDemo({ activeTab }: { activeTab: DemoTabId }) {
  if (activeTab === "flashcards") return <FlashcardsDemo />;
  if (activeTab === "mapas") return <MindMapDemo />;
  if (activeTab === "testes") return <TestsDemo />;
  if (activeTab === "progresso") return <ProgressDemo />;
  return <DashboardDemo />;
}

export default function AppDemo() {
  const [activeTab, setActiveTab] = useState<DemoTabId>("dashboard");
  const shouldReduceMotion = useReducedMotion();
  const activeContent = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
      setActiveTab(tabs[(currentIndex + 1) % tabs.length].id);
    }, AUTO_SWITCH_SECONDS * 1000);

    return () => window.clearTimeout(timeout);
  }, [activeTab]);

  return (
    <section className="mx-auto w-full min-w-0 max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-text-main sm:text-4xl">
          Veja o StudyFlow em ação
        </h2>
        <p className="mx-auto max-w-2xl text-base text-text-muted sm:text-lg">
          Dashboard, flashcards, mapas mentais, testes e progresso conectados na mesma plataforma.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Recursos do StudyFlow"
        className="no-scrollbar -mx-4 mb-8 flex snap-x items-center gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:justify-center sm:px-0"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`demo-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="demo-panel"
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex min-h-12 shrink-0 snap-start items-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full px-5 py-3 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/20 ${
                isActive
                  ? "border border-blue-700 bg-blue-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-text-muted hover:border-slate-300 hover:text-text-main"
              }`}
            >
              {isActive ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-4 bottom-1 h-1 overflow-hidden rounded-full bg-blue-300/50"
                >
                  <motion.span
                  key={`tab-progress-${activeTab}`}
                  className="block h-full rounded-full bg-blue-950"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: AUTO_SWITCH_SECONDS,
                    ease: "linear",
                  }}
                  />
                </span>
              ) : null}
              <Icon size={19} className="relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_370px] lg:gap-10">
        <div className="min-w-0">
          <div className="flex aspect-video flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_-36px_rgba(15,23,42,0.35)]">
            <div className="flex min-w-0 shrink-0 items-center gap-3 border-b border-slate-200 bg-slate-950 px-3 py-3 sm:px-4">
              <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/55" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
              </div>
              <div className="min-w-0 flex-1 truncate rounded-md border border-white/10 bg-white/5 px-3 py-1 text-center font-mono text-[10px] text-white/60 sm:text-sm">
                studyflow-use.netlify.app/{activeTab}
              </div>
            </div>

            <div
              id="demo-panel"
              role="tabpanel"
              aria-labelledby={`demo-tab-${activeTab}`}
              className="min-h-0 min-w-0 flex-1 overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeTab}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" }}
                  className="h-full"
                  aria-hidden="true"
                >
                  <ActiveDemo activeTab={activeTab} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <aside aria-live="polite" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <span className="text-sm font-bold uppercase tracking-[0.12em] text-blue-600">
            {activeContent.label}
          </span>
          <h3 className="mt-3 text-3xl font-extrabold leading-tight text-text-main">
            {activeContent.benefit}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
            {activeContent.description}
          </p>

          <ul className="mt-5 space-y-3">
            {activeContent.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3 text-base text-text-main">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">
                  <Check size={14} />
                </span>
                {highlight}
              </li>
            ))}
          </ul>

          <a
            href={APP_URL}
            onClick={() => trackEvent("cta_demo_click", { active_tab: activeTab })}
            className="group mt-7 inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/25"
          >
            Experimentar o StudyFlow
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </a>
        </aside>
      </div>
    </section>
  );
}
