import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AppDemo from "@/components/AppDemo";
import ProblemSolution from "@/components/ProblemSolution";
import BentoGrid from "@/components/BentoGrid";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-clip bg-background text-text-main [&>*]:min-w-0">
      <Header />
      <Hero />
      <AppDemo />
      <ProblemSolution />
      <BentoGrid />
      <HowItWorks />
      <UseCases />
      <Pricing />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
