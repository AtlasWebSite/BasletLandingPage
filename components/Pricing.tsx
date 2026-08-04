"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Globe2, RefreshCw } from "lucide-react";
import { APP_URL, pricingPlans } from "@/data/pricingData";
import { trackEvent } from "@/lib/analytics";

export default function Pricing() {
  return (
    <section
      id="planos"
      className="border-y border-slate-200/80 bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-text-main sm:text-4xl">
            Um plano simples para estudar melhor
          </h2>

          <p className="text-base text-text-muted sm:text-lg">
            Acesso completo às ferramentas do StudyFlow por uma assinatura
            mensal. Cancele quando quiser.
          </p>
        </div>

        <div className="mx-auto w-full max-w-xl">
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative flex flex-col justify-between rounded-3xl border border-blue-600 bg-white p-6 shadow-xl shadow-blue-600/10 ring-2 ring-blue-600/20 sm:p-8"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-600/20">
                Acesso completo
              </div>

              <div>
                <h3 className="mb-2 text-2xl font-bold text-text-main">
                  {plan.name}
                </h3>

                <p className="mb-6 text-base leading-relaxed text-text-muted">
                  {plan.description}
                </p>

                <div className="mb-8 flex items-baseline gap-1 border-b border-slate-200 pb-6">
                  <span className="text-4xl font-black text-text-main sm:text-5xl">
                    {plan.price}
                  </span>
                  <span className="text-sm font-semibold text-text-muted">
                    {plan.period}
                  </span>
                </div>

                <ul className="mb-8 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-text-main sm:text-base"
                    >
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-progress/20 text-emerald-700">
                        <Check size={12} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={APP_URL}
                onClick={() =>
                  trackEvent("plan_select", { plan_id: plan.id })
                }
                className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700"
              >
                <span>{plan.ctaText}</span>
                <ArrowRight size={16} />
              </a>

              <div className="mt-4 flex flex-col items-center justify-center gap-2 text-xs font-medium text-text-muted sm:flex-row sm:gap-5">
                <span className="inline-flex items-center gap-1.5">
                  <Globe2 size={14} className="text-blue-600" />
                  Acesso imediato pelo navegador
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <RefreshCw size={14} className="text-blue-600" />
                  Cancele quando quiser
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
