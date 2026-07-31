"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { pricingPlans, APP_URL } from "@/data/pricingData";
import { trackEvent } from "@/lib/analytics";

export default function Pricing() {
  return (
    <section id="planos" className="py-20 md:py-28 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1 rounded-full">
            Planos Transparentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight mt-4 mb-3">
            Comece grátis, evolua no seu tempo
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            Sem taxas escondidas. Cancele ou altere seu plano quando quiser.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`relative rounded-3xl p-8 flex flex-col justify-between border transition-all ${
                plan.popular
                  ? "bg-white border-primary shadow-xl shadow-primary/10 ring-2 ring-primary/20"
                  : "bg-slate-50 border-slate-200 shadow-sm"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-text-main mb-2">{plan.name}</h3>
                <p className="text-xs text-text-muted mb-6 leading-relaxed">{plan.description}</p>
                
                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-slate-200">
                  <span className="text-4xl sm:text-5xl font-black text-text-main">{plan.price}</span>
                  <span className="text-xs font-semibold text-text-muted">{plan.period}</span>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-text-main">
                      <div className="w-5 h-5 rounded-full bg-progress/20 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={APP_URL}
                onClick={() => trackEvent("plan_select", { plan_id: plan.id })}
                className={`w-full min-h-[48px] rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? "bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20"
                    : "bg-white border border-slate-200 text-text-main hover:bg-slate-100"
                }`}
              >
                <span>{plan.ctaText}</span>
                <ArrowRight size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}