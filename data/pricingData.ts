export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  badge?: string;
}

export const APP_URL = "https://app-usestudyflow.vercel.app/";

export const pricingPlans: Plan[] = [
  {
    id: "pro",
    name: "Plano Pro",
    price: "R$ 11,90",
    period: "/mês",
    description:
      "Para estudantes que buscam mais organização, recursos completos e acompanhamento da evolução nos estudos.",
    features: [
      "Flashcards e baralhos ilimitados",
      "Mapas mentais ilimitados com exportação",
      "Testes e quizzes práticos",
      "Organizador de conteúdos",
      "Estatísticas avançadas e Heatmap de estudos",
      "Suporte prioritário",
    ],
    ctaText: "Começar Agora no App",
  },
];
