"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe2, LockKeyhole, RefreshCw } from "lucide-react";
import { APP_URL } from "@/data/pricingData";
import { trackEvent } from "@/lib/analytics";

const assurances = [
  {
    title: "Sem instalação",
    description: "Abra o StudyFlow no navegador e estude no celular, tablet ou computador.",
    icon: Globe2,
  },
  {
    title: "Seus estudos protegidos",
    description: "Entre com sua conta Google e mantenha seu progresso vinculado somente a você.",
    icon: LockKeyhole,
  },
  {
    title: "Cancele quando quiser",
    description: "A assinatura é mensal e pode ser cancelada diretamente pela sua conta, sem burocracia.",
    icon: RefreshCw,
  },
];

export default function AssuranceSection() {
  return (
    <section
      aria-labelledby="assurance-heading"
      className="relative overflow-hidden bg-slate-950 py-20 text-white md:py-24"
    >
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-blue-200">
            Comece com tranquilidade
          </span>
          <h2 id="assurance-heading" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Menos barreiras para você entrar em fluxo
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Tudo foi pensado para você começar rápido, manter seus estudos organizados e continuar no controle.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {assurances.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur sm:p-7"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                  <Icon size={21} />
                </div>
                <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-300 sm:text-base">{item.description}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center text-center">
          <a
            href={APP_URL}
            onClick={() => trackEvent("cta_assurance_click")}
            className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-slate-950 shadow-xl transition-all hover:scale-[1.02] hover:bg-blue-50 sm:w-auto sm:text-base"
          >
            Começar agora
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <p className="mt-3 text-xs text-slate-400 sm:text-sm">Acesso imediato pelo navegador.</p>
        </div>
      </div>
    </section>
  );
}
