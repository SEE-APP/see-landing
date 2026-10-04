"use client";

import { Map, Box, Sprout, type LucideIcon } from "lucide-react";
import { motion, type Variants } from "framer-motion";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  accentColor: "blue" | "green";
};

const SERVICES: Service[] = [
  {
    icon: Map,
    title: "Aerial Mapping & Topographic Surveys",
    description:
      "High-precision orthomosaics, elevation models, and GIS-ready site survey data.",
    tags: ["GIS Ready", "Orthomosaics", "CAD Compatible"],
    accentColor: "blue",
  },
  {
    icon: Box,
    title: "3D Digital Twins & Asset Inspection",
    description:
      "Photogrammetry 3D modeling for infrastructure, progress monitoring, and asset tracking.",
    tags: ["3D Modeling", "Photogrammetry", "Asset Tracking"],
    accentColor: "blue",
  },
  {
    icon: Sprout,
    title: "Agricultural & Land Insights",
    description:
      "Multispectral index maps (NDVI), crop health monitoring, and boundary analytics.",
    tags: ["NDVI Index", "Crop Health", "Boundary Mapping"],
    accentColor: "green",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="max-w-2xl"
        >
          <span className="inline-block rounded-full border border-tech-blue/20 bg-tech-blue/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-tech-blue">
            Our Capabilities
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
            One flight, every dataset your project needs
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-text-muted">
            From topographic surveys to crop health maps, DataFly turns a
            single drone flight into deliverables your engineers, planners,
            and agronomists already work with.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {SERVICES.map(({ icon: Icon, title, description, tags, accentColor }) => {
            const isBlue = accentColor === "blue";

            return (
              <motion.div
                key={title}
                variants={cardVariants}
                className="group relative rounded-2xl border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-slate-300"
              >
                <div
                  className={`inline-flex rounded-xl p-3.5 ${
                    isBlue
                      ? "bg-tech-blue/10 text-tech-blue"
                      : "bg-agro-green/10 text-agro-green"
                  }`}
                >
                  <Icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-text-main">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors duration-200 ${
                        isBlue
                          ? "border-slate-200 bg-slate-50 text-text-muted group-hover:border-tech-blue/30 group-hover:text-tech-blue"
                          : "border-slate-200 bg-slate-50 text-text-muted group-hover:border-agro-green/30 group-hover:text-agro-green"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}