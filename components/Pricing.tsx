"use client";
import { Check } from "lucide-react";

// SUBSTITUA COM OS DADOS REAIS DO APP
const plans = [
  {
    name: "Gratuito",
    price: "R$ 0",
    period: "/mês",
    desc: "O essencial para começar a organizar seus estudos.",
    features: ["Flashcards básicos", "Até 3 mapas mentais", "Acompanhamento de progresso simples"],
    cta: "Começar grátis",
    highlight: false,
  },
  {
    name: "Premium",
    price: "R$ 11,90",
    period: "/mês",
    desc: "A experiência completa do Cognitive Flow.",
    features: ["Flashcards ilimitados", "Mapas mentais ilimitados", "Estatísticas avançadas", "Revisão inteligente", "Sem anúncios"],
    cta: "Assinar Premium",
    highlight: true,
  }
];

export default function Pricing() {
  const APP_URL = "https://app-usestudyflow.vercel.app/";

  return (
    <section id="planos" className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Escolha seu fluxo de estudo</h2>
        <p className="text-text-dark text-lg">Cancele quando quiser. Sem surpresas.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan, i) => (
          <div key={i} className={`p-8 rounded-3xl border ${plan.highlight ? 'bg-surface border-primary shadow-2xl shadow-primary/10' : 'bg-transparent border-white/10'} flex flex-col`}>
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-text-dark mb-6">{plan.desc}</p>
            <div className="mb-8">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-text-dark">{plan.period}</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feat, j) => (
                <li key={j} className="flex items-center gap-3">
                  <Check size={20} className="text-progress shrink-0" />
                  <span className="text-sm">{feat}</span>
                </li>
              ))}
            </ul>
            <a href={APP_URL} className={`w-full text-center py-4 rounded-xl font-semibold transition-all ${plan.highlight ? 'bg-primary text-white hover:bg-primary/90' : 'bg-white/5 text-white hover:bg-white/10'}`}>
              {plan.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}