import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  CircleX,
} from "lucide-react";

const beforeItems = [
  "Pouca clareza",
  "Dificuldade desnecessária",
  "Conteúdo espalhado",
  "Revisão sem direção",
];

const afterItems = [
  "Clareza nos estudos",
  "Facilidade no aprendizado",
  "Tudo em um só lugar",
  "Revisão no momento certo",
];

function BeforeStudyFlow() {
  return (
    <article className="flex min-h-[520px] flex-col overflow-hidden rounded-[32px] border border-rose-100 bg-gradient-to-br from-rose-50/70 via-white to-slate-50 p-6 sm:p-9">
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-rose-500">
            Antes
          </span>
          <h3 className="mt-1 text-2xl font-extrabold text-text-main sm:text-3xl">
            Sem StudyFlow
          </h3>
        </div>
        <span className="rounded-full border border-rose-100 bg-white px-4 py-2 text-sm font-bold text-rose-600">
          Sem direção
        </span>
      </div>

      <div className="my-8 grid flex-1 content-center gap-3 sm:grid-cols-2 sm:gap-4">
        {beforeItems.map((item, index) => (
          <div
            key={item}
            className={`flex min-h-[96px] items-center gap-3 rounded-2xl border border-rose-100 bg-white px-4 py-4 text-base font-extrabold text-slate-700 shadow-[0_14px_30px_-22px_rgba(15,23,42,0.42)] sm:text-lg ${
              index % 2 === 0 ? "sm:-rotate-1" : "sm:translate-y-3 sm:rotate-1"
            }`}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-rose-50 text-rose-500">
              <CircleX size={19} strokeWidth={2.2} />
            </span>
            <span className="leading-snug">{item}</span>
          </div>
        ))}
      </div>

      <p className="border-t border-rose-100 pt-6 text-center text-xl font-extrabold text-slate-700 sm:text-2xl">
        Mais esforço para aprender menos.
      </p>
    </article>
  );
}

function AfterStudyFlow() {
  return (
    <article className="flex min-h-[520px] flex-col overflow-hidden rounded-[32px] border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-emerald-50/60 p-6 shadow-[0_28px_80px_-42px_rgba(37,99,235,0.55)] sm:p-9">
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-blue-600">
            Depois
          </span>
          <h3 className="mt-1 text-2xl font-extrabold text-text-main sm:text-3xl">
            Com StudyFlow
          </h3>
        </div>
        <span className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-blue-600">
          Com direção
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center py-7">
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-blue-600/20 ring-1 ring-blue-100 sm:h-20 sm:w-20">
            <Image
              src="/favicon.ico"
              alt="Logo do StudyFlow"
              width={80}
              height={80}
              className="h-full w-full object-contain p-1"
            />
          </span>
          <div>
            <strong className="block text-2xl font-extrabold text-text-main sm:text-3xl">
              StudyFlow
            </strong>
            <span className="text-sm font-semibold text-blue-600 sm:text-base">
              Seu estudo em um só lugar
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {afterItems.map((item) => (
            <div
              key={item}
              className="flex min-h-[96px] items-center gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-4 text-base font-extrabold text-slate-800 shadow-[0_14px_30px_-22px_rgba(37,99,235,0.42)] sm:text-lg"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">
                <CheckCircle2 size={19} strokeWidth={2.2} />
              </span>
              <span className="leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="border-t border-blue-100 pt-6 text-center text-xl font-extrabold text-blue-700 sm:text-2xl">
        Menos esforço desperdiçado. Mais evolução.
      </p>
    </article>
  );
}

export default function UnifiedStudyFlow() {
  return (
    <section
      id="comparativo"
      aria-labelledby="before-after-heading"
      className="border-y border-slate-200/80 bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-12 max-w-4xl text-center sm:mb-16">
          <span className="mb-4 inline-block text-sm font-extrabold uppercase tracking-[0.18em] text-blue-600 sm:text-base">
            Antes × Depois
          </span>
          <h2
            id="before-after-heading"
            className="text-4xl font-extrabold leading-tight tracking-tight text-text-main sm:text-5xl lg:text-6xl"
          >
            De um estudo confuso para um aprendizado com direção.
          </h2>
        </header>

        <div className="mx-auto grid max-w-7xl items-center gap-6 lg:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] lg:gap-5">
          <BeforeStudyFlow />

          <div className="flex items-center justify-center" aria-hidden="true">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600 shadow-sm">
              <ArrowDown size={25} className="lg:hidden" />
              <ArrowRight size={25} className="hidden lg:block" />
            </span>
          </div>

          <AfterStudyFlow />
        </div>
      </div>
    </section>
  );
}
