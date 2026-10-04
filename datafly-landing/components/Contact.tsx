"use client";

import { useState } from "react";
import { Mail, MapPin, Send, Clock, CheckCircle2 } from "lucide-react";
import { motion, type Variants } from "framer-motion";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* მარცხენა მხარე: ტექსტი და საკონტაქტო ინფო */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="inline-block rounded-full border border-tech-blue/20 bg-tech-blue/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-tech-blue">
                Get in Touch
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-main sm:text-4xl lg:text-5xl">
                Start your next flight with DataFly
              </h2>
              <p className="mt-4 text-base sm:text-lg text-text-muted leading-relaxed">
                Have a site that needs surveying, mapping, or agricultural health analysis? Send us your project details and we will build a custom flight proposal.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 rounded-xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                <div className="rounded-lg bg-tech-blue/10 p-3 text-tech-blue shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-main">Base Location</h4>
                  <p className="text-sm text-text-muted mt-0.5">Tbilisi, Georgia (Operating Internationally)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                <div className="rounded-lg bg-agro-green/10 p-3 text-agro-green shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-main">Rapid Turnaround</h4>
                  <p className="text-sm text-text-muted mt-0.5">Initial proposals & feasibility response within 24 hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                <div className="rounded-lg bg-tech-blue/10 p-3 text-tech-blue shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-main">Direct Inquiries</h4>
                  <p className="text-sm text-text-muted mt-0.5">Part of December32 LLC Venture Studio</p>
                </div>
              </div>
            </div>
          </div>

          {/* მარჯვენა მხარე: ფორმა */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-8 shadow-md backdrop-blur-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="inline-flex rounded-full bg-agro-green/10 p-4 text-agro-green">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-main">Thank you for your message!</h3>
                  <p className="text-text-muted max-w-md mx-auto">
                    We have received your inquiry. A DataFly technical specialist will reach out shortly to discuss your project requirements.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-sm font-semibold text-tech-blue hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-text-main mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-text-main placeholder:text-slate-400 focus:border-tech-blue focus:outline-none focus:ring-2 focus:ring-tech-blue/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-text-main mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-text-main placeholder:text-slate-400 focus:border-tech-blue focus:outline-none focus:ring-2 focus:ring-tech-blue/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-main mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AgriCorp Ltd / Surveying Co."
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-text-main placeholder:text-slate-400 focus:border-tech-blue focus:outline-none focus:ring-2 focus:ring-tech-blue/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-main mb-2">
                      Project Description & Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your site location, area size (hectares), or requested outputs (NDVI, 3D Point Cloud, CAD Topo)..."
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-text-main placeholder:text-slate-400 focus:border-tech-blue focus:outline-none focus:ring-2 focus:ring-tech-blue/20 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-tech-blue px-7 py-3.5 text-base font-semibold text-white shadow-md hover:bg-tech-blue-hover hover:shadow-lg transition-all duration-200"
                  >
                    Send Inquiry
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}