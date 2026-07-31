export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
  badge?: string;
}

export const APP_URL = "https://app-usestudyflow.vercel.app/";

export const pricingPlans: Plan[] = [
  {
    id: "gratuito",
    name: "Plano Gratuito",
    price: "R$ 0",
    period: "para sempre",
    description: "Ideal para começar a organizar seus estudos com as ferramentas essenciais.",
    features: [
      "Acesso completo aos Flashcards",
      "Criação de Mapas Mentais",
      "Testes e Quizzes práticos",
      "Organizador de conteúdos",
      "Acompanhamento de progresso básico"
    ],
    ctaText: "Acessar Gratuitamente",
    popular: false,
  },
  {
    id: "pro",
    name: "Plano Pro",
    price: "R$ 14,90",
    period: "/mês",
    description: "Para estudantes que buscam máxima performance, retentividade e organização avançada.",
    features: [
      "Tudo do Plano Gratuito",
      "Flashcards e baralhos ilimitados",
      "Mapas mentais ilimitados com exportação",
      "Bancos de testes personalizados",
      "Estatísticas avançadas e Heatmap de estudos",
      "Suporte prioritário"
    ],
    ctaText: "Começar Agora no App",
    popular: true,
    badge: "Mais Escolhido"
  }
];