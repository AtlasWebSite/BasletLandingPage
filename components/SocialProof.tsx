import Image from "next/image";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ana Clara Ribeiro",
    initials: "AC",
    photo: "/relatos/ana-clara-ribeiro.webp",
    context: "Medicina · 4º período",
    quote:
      "Eu estudava com o conteúdo espalhado entre caderno, PDFs e vários aplicativos. No StudyFlow, consigo organizar o assunto e já transformar o que aprendi em revisão.",
    accent: "bg-blue-100 text-blue-700",
  },
  {
    name: "Lucas Almeida",
    initials: "LA",
    photo: "/relatos/lucas-almeida.webp",
    context: "Engenharia de Software · 6º semestre",
    quote:
      "O que mais mudou foi não precisar decidir onde continuar. Abro a matéria e o próximo passo do estudo já está no mesmo lugar.",
    accent: "bg-violet-100 text-violet-700",
  },
  {
    name: "Beatriz Santos",
    initials: "BS",
    photo: "/relatos/beatriz-santos.webp",
    context: "Preparação para concursos · Área fiscal",
    quote:
      "Minha revisão deixou de depender de listas soltas. Agora consigo enxergar o que já pratiquei e o que ainda precisa voltar para a rotina.",
    accent: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Rafael Martins",
    initials: "RM",
    photo: "/relatos/rafael-martins.webp",
    context: "Direito · Preparação para a OAB",
    quote:
      "Gosto de conseguir sair de uma anotação para uma prática sem quebrar o ritmo. O estudo ficou mais simples de retomar todos os dias.",
    accent: "bg-orange-100 text-orange-700",
  },
];

function StudentIdentity({
  name,
  initials,
  context,
  accent,
  photo,
}: Pick<(typeof testimonials)[number], "name" | "initials" | "context" | "accent" | "photo">) {
  return (
    <div className="flex items-center gap-3">
      <span className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-4 ring-white ${accent}`}>
        <Image
          src={photo}
          alt={`Foto ilustrativa de ${name}`}
          fill
          sizes="56px"
          className="object-cover"
        />
        <span className="sr-only">{initials}</span>
      </span>
      <div className="min-w-0">
        <p className="text-lg font-extrabold text-text-main">{name}</p>
        <p className="mt-0.5 text-sm font-medium text-text-muted sm:text-base">{context}</p>
      </div>
    </div>
  );
}

export default function SocialProof() {
  const [featured, ...secondary] = testimonials;

  return (
    <section
      id="depoimentos"
      aria-labelledby="social-proof-heading"
      className="bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <span className="mb-4 inline-block text-sm font-extrabold uppercase tracking-[0.18em] text-blue-600 sm:text-base">
            Histórias de estudantes
          </span>
          <h2
            id="social-proof-heading"
            className="text-3xl font-extrabold leading-tight tracking-tight text-text-main sm:text-4xl lg:text-5xl"
          >
            Um fluxo mais simples muda a forma de estudar.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl">
            Diferentes rotinas, o mesmo objetivo: manter o conteúdo organizado e saber qual é o próximo passo.
          </p>
        </header>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <article className="relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[28px] border border-blue-100 bg-white p-7 shadow-[0_22px_60px_-38px_rgba(37,99,235,0.35)] sm:p-10">
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-blue-50"
            />
            <Quote
              aria-hidden="true"
              className="relative text-blue-600"
              size={34}
              strokeWidth={1.6}
            />
            <blockquote className="relative my-9 text-2xl font-bold leading-relaxed tracking-tight text-text-main sm:text-[1.7rem]">
              “{featured.quote}”
            </blockquote>
            <StudentIdentity {...featured} />
          </article>

          <div className="flex flex-col justify-center" aria-label="Outros relatos de estudantes">
            {secondary.map((testimonial, index) => (
              <article
                key={testimonial.name}
                className={`py-7 first:pt-0 last:pb-0 ${
                  index < secondary.length - 1 ? "border-b border-slate-200" : ""
                }`}
              >
                <blockquote className="mb-6 text-lg font-semibold leading-relaxed text-slate-700 sm:text-xl">
                  “{testimonial.quote}”
                </blockquote>
                <StudentIdentity {...testimonial} />
              </article>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-sm leading-relaxed text-slate-500">
          Perfis e relatos ilustrativos para demonstrar a seção. Substitua por depoimentos verificados antes do uso comercial.
        </p>
      </div>
    </section>
  );
}
