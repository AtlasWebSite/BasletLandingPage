import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Pricing from "@/components/Pricing";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const APP_URL = "https://app-usestudyflow.vercel.app/";

  return (
    <main>
      <Header />
      <Hero />
      <BentoGrid />
      
      {/* Seção Comparativa Simplificada */}
      <section className="py-24 bg-surface/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Por que o StudyFlow?</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto text-left">
            <div className="p-8 border border-white/5 rounded-2xl bg-[#09101F]/50 opacity-70">
              <h3 className="text-xl font-bold mb-4 text-accent">Antes</h3>
              <ul className="space-y-3 text-text-dark">
                <li>• Conteúdos espalhados em pastas</li>
                <li>• Vários aplicativos abertos</li>
                <li>• Revisões improvisadas</li>
                <li>• Nenhuma clareza da evolução</li>
              </ul>
            </div>
            <div className="p-8 border border-primary/30 rounded-2xl bg-surface relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
              <h3 className="text-xl font-bold mb-4 text-progress">Com StudyFlow</h3>
              <ul className="space-y-3 text-white">
                <li>• Conteúdo 100% centralizado</li>
                <li>• Mapas, testes e flashcards integrados</li>
                <li>• Revisões organizadas por dados</li>
                <li>• Progresso visível a cada sessão</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Pricing />

      {/* CTA Final */}
      <section className="py-32 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-primary/10 blur-3xl -z-10" />
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Seu próximo estudo pode começar <span className="text-primary">mais organizado.</span>
          </h2>
          <p className="text-lg text-text-dark mb-10">Junte-se ao fluxo. Pare de gastar energia organizando e comece a focar no aprendizado.</p>
          <a href={APP_URL} className="inline-flex bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all hover:scale-105 gap-2 items-center">
            Começar agora gratuitamente
            <ArrowRight size={20} />
          </a>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12 text-center text-text-dark text-sm">
        <p>© {new Date().getFullYear()} StudyFlow. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}