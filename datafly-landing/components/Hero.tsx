"use client";

import { ArrowRight, Sprout, Box, Radar } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const CAPABILITIES = [
  { icon: Radar, label: "Aerial site & topographic surveys" },
  { icon: Sprout, label: "NDVI & crop health data" },
  { icon: Box, label: "Photogrammetry & 3D models" },
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    show: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        delay, 
        ease: [0.22, 1, 0.36, 1] as const 
      },
    }),
  };

  return (
    <section id="top" className="relative overflow-hidden py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* მარცხენა მხარე: ტექსტი */}
          <div className="lg:col-span-6">
            
            {/* ბეჯი */}
            <motion.div
              initial="hidden"
              animate="show"
              custom={0}
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-tech-blue/20 bg-tech-blue/10 px-3.5 py-1.5 text-xs font-semibold text-tech-blue sm:text-sm"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-agro-green animate-pulse" />
              Precision Drone Mapping &amp; Analytics
            </motion.div>

            {/* სათაური */}
            <motion.h1
              initial="hidden"
              animate="show"
              custom={0.1}
              variants={fadeUp}
              className="mt-4 text-4xl font-bold tracking-tight text-text-main sm:text-5xl lg:text-6xl leading-[1.1]"
            >
              Precision Drone Mapping,{" "}
              <span className="text-tech-blue">Agricultural Data</span> &amp;{" "}
              <span className="text-agro-green">3D Models</span>
            </motion.h1>

            {/* აღწერა */}
            <motion.p
              initial="hidden"
              animate="show"
              custom={0.2}
              variants={fadeUp}
              className="mt-6 text-lg leading-relaxed text-text-muted max-w-xl"
            >
              DataFly gives project teams survey-grade site data without the
              survey-grade wait &mdash; turning a single flight into
              orthomosaics, elevation models, and crop insights your engineers,
              planners, and stakeholders can act on immediately.
            </motion.p>

            {/* ღილაკები */}
            <motion.div
              initial="hidden"
              animate="show"
              custom={0.3}
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-tech-blue px-7 py-3.5 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-tech-blue-hover hover:shadow-lg"
              >
                Ask About DataFly
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center rounded-lg border-2 border-agro-green px-7 py-3.5 text-base font-semibold text-agro-green transition-all duration-200 hover:bg-agro-green hover:text-white"
              >
                Explore Services
              </Link>
            </motion.div>

            {/* შესაძლებლობების სია */}
            <motion.ul
              initial="hidden"
              animate="show"
              custom={0.4}
              variants={fadeUp}
              className="mt-10 flex flex-col gap-4 border-t border-slate-200/80 pt-6 sm:flex-row sm:gap-6"
            >
              {CAPABILITIES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm text-text-muted font-medium">
                  <Icon className="h-4 w-4 shrink-0 text-tech-blue" strokeWidth={2} aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* მარჯვენა მხარე: ვიზუალური ფოტო სკანირების ეფექტით */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:col-span-6"
          >
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none rounded-2xl border-2 border-slate-200 bg-white p-2 shadow-2xl overflow-hidden">
              <div className="relative h-[400px] sm:h-[480px] w-full rounded-xl overflow-hidden bg-slate-900 group">
                
                {/* დრონის ფოტო (დამატებულია sizes პარამეტრი) */}
                <Image
                  src="/hero-drone.jpg"
                  alt="DataFly Precision Drone Mapping"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover opacity-95 transition-transform duration-700 group-hover:scale-105"
                  priority
                />

                {/* ბადე (Grid) */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(to right, rgba(37, 99, 235, 0.5) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(37, 99, 235, 0.5) 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                  }}
                />

                {/* ანიმირებული ლაზერი */}
                {!shouldReduceMotion && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-agro-green to-transparent shadow-[0_0_15px_#10B981] animate-[scan_4s_ease-in-out_infinite]" />
                )}

                {/* ბეჯები */}
                <div className="absolute top-4 left-4 rounded-lg bg-slate-900/80 backdrop-blur-md px-3.5 py-2 border border-tech-blue/30 text-xs font-semibold text-white shadow-lg flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-tech-blue animate-ping" />
                  Point Cloud &amp; 3D Active
                </div>

                <div className="absolute bottom-4 right-4 rounded-xl bg-slate-900/85 backdrop-blur-md px-4 py-2.5 border border-agro-green/40 text-xs text-white shadow-xl">
                  <div className="text-[10px] text-slate-300 font-mono uppercase tracking-wider">Crop Health Index</div>
                  <div className="text-agro-green font-bold text-sm flex items-center gap-1.5 mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-agro-green" />
                    NDVI 0.85 (Optimal)
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0.8; }
          50% { top: 98%; opacity: 1; }
        }
      `}</style>
    </section>
  );
}