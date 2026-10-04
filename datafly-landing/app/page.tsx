import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import UseCases from "@/components/UseCases";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
        <Hero />
        <Services />
        <UseCases />
        <About />
        <Contact />
      </div>

      {/* Footer სექცია */}
      <footer className="border-t border-slate-200/80 bg-white/80 py-8 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-text-muted">
          <p>© {new Date().getFullYear()} DataFly. Project by December32 LLC. All rights reserved.</p>
          <p className="font-semibold text-text-main">
            Precision Drone Mapping &amp; Agricultural Data
          </p>
        </div>
      </footer>
    </main>
  );
}