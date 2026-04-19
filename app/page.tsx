import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import MagicBento from "@/components/MagicBento";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <MagicBento />
      <Projects />
      <Contact />
      
      {/* Footer */}
      <footer className="py-12 text-center text-gray-600 text-sm border-t border-[var(--glass-border)]">
        <p>&copy; {new Date().getFullYear()} Ravikumar J. All rights reserved.</p>
        <p className="mt-2 text-gray-500">Built with Next.js, Framer Motion & Spline</p>
      </footer>
    </main>
  );
}
