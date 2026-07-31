"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const APP_URL = "https://app-usestudyflow.vercel.app/";

  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-glow-primary -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-fit mx-auto lg:mx-0">
            <Sparkles size={16} className="text-accent" />
            <span className="text-sm font-medium">Seu estudo, finalmente em fluxo.</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            Transforme conteúdo em <span className="text-primary">aprendizado que fica.</span>
          </h1>
          
          <p className="text-lg text-text-dark max-w-xl mx-auto lg:mx-0">
            Flashcards, mapas mentais e testes reunidos em uma experiência simples e visual para organizar seus estudos e acompanhar sua evolução.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 justify-center lg:justify-start">
            <a href={APP_URL} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 hover:scale-105 group">
              Começar agora
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#como-funciona" className="w-full sm:w-auto bg-surface hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center">
              Ver como funciona
            </a>
          </div>
        </motion.div>

        {/* 3D Visual Experience (Framer Motion Pseudo-3D) */}
        <div className="relative h-[400px] lg:h-[500px] w-full hidden sm:block perspective-1000">
          <motion.div 
            animate={{ y: [-10, 10, -10], rotateX: [5, 10, 5], rotateY: [-5, 0, -5] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute top-10 right-10 w-64 h-40 bg-surface border border-white/10 rounded-2xl p-4 shadow-2xl z-20"
          >
            <div className="h-2 w-1/3 bg-white/20 rounded mb-4" />
            <div className="space-y-2">
              <div className="h-2 w-full bg-white/10 rounded" />
              <div className="h-2 w-4/5 bg-white/10 rounded" />
            </div>
            <div className="absolute bottom-4 right-4 text-xs font-bold text-progress">100% Retido</div>
          </motion.div>

          <motion.div 
            animate={{ y: [10, -10, 10], rotateZ: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 left-10 w-56 h-56 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-2xl p-4 shadow-2xl z-10 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <div className="w-8 h-8 rounded-full bg-primary/40" />
              <div className="w-8 h-8 rounded-full bg-secondary/40" />
            </div>
            <svg className="w-full h-24 stroke-primary" fill="none" viewBox="0 0 100 50">
              <path d="M0,50 Q25,0 50,25 T100,10" strokeWidth="3" />
            </svg>
          </motion.div>

          {/* Central Orb/Connection */}
          <motion.div 
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/30 rounded-full blur-2xl z-0"
          />
        </div>
      </div>
    </section>
  );
}