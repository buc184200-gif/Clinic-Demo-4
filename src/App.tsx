import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { HeroAndScience } from './components/HeroAndScience';
import { Treatments } from './components/Treatments';
import { LaserTech } from './components/LaserTech';
import { Procedure } from './components/Procedure';
import { Specialists } from './components/Specialists';
import { Results } from './components/Results';
import { AppointmentCTA } from './components/AppointmentCTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="relative w-full overflow-hidden bg-oculis-navy text-oculis-white font-manrope">
      <Navbar />
      <main>
        <HeroAndScience />
        <Treatments />
        <LaserTech />
        <Procedure />
        <Specialists />
        <Results />
        <AppointmentCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
