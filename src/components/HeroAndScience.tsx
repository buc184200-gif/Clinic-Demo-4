import { useLayoutEffect, useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { EyeModel } from './EyeModel';
import { ErrorBoundary } from './ErrorBoundary';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export function HeroAndScience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  
  const [scrollState, setScrollState] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=4000', // 4 screen heights
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            // Map progress to state (0 to 5)
            const state = self.progress * 5;
            setScrollState(state);
          }
        }
      });

      // Animate Hero text out
      tl.to(text1Ref.current, {
        opacity: 0,
        y: -50,
        duration: 1
      }, 0);

      // Animate Science text in
      tl.fromTo(text2Ref.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
        1
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-oculis-navy text-oculis-white overflow-hidden" id="home">
      {/* 3D Canvas with Error Boundary and min dimensions */}
      <div className="absolute inset-0 z-0 min-h-screen min-w-full">
        <ErrorBoundary fallback={
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <img src="https://images.unsplash.com/photo-1494869042583-f6c911f04b4c?q=80&w=1200&auto=format&fit=crop" alt="Eye background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-oculis-navy/60 mix-blend-multiply" />
          </div>
        }>
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]} style={{ width: '100%', height: '100%' }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#B9985A" />
            
            <Suspense fallback={null}>
              <Environment preset="city" />
            </Suspense>
            
            {/* Group to move the eye based on scroll */}
            <group position={[scrollState < 1 && !isMobile ? 3 : 0, 0, 0]}>
              <EyeModel scrollState={scrollState} />
            </group>

            <ContactShadows position={[0, -3, 0]} opacity={0.5} scale={20} blur={2} far={4} />
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-oculis-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      {/* HTML Content Overlay */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 lg:px-12 pointer-events-none">
        
        {/* Hero Content */}
        <div ref={text1Ref} className="absolute top-1/2 -translate-y-1/2 left-6 lg:left-12 max-w-xl pointer-events-auto">
          <div className="inline-block border border-oculis-cyan/30 bg-oculis-cyan/5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest text-oculis-cyan mb-8 uppercase">
            Advanced Ophthalmology & Laser Vision
          </div>
          <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight leading-tight">
            See the world <br />
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-oculis-white to-oculis-silver">with new clarity.</span>
          </h1>
          <p className="text-lg text-oculis-silver mb-10 text-balance leading-relaxed">
            Precision diagnostics, advanced laser correction and specialist eye care designed around your vision.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button className="px-8 py-4 rounded-full bg-oculis-cyan text-oculis-navy font-semibold hover:bg-white transition-colors duration-300">
              Book Eye Assessment
            </button>
            <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-colors duration-300">
              Explore Treatments
            </button>
          </div>
          <div className="flex items-center gap-8 text-sm text-oculis-silver font-medium">
            <div>
              <div className="text-oculis-white text-xl mb-1">15,000+</div>
              <div>Procedures</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="text-oculis-white text-xl mb-1">98%</div>
              <div>Patient Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Vision Science Content */}
        <div ref={text2Ref} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto opacity-0">
          <h2 className="absolute top-24 font-serif text-5xl md:text-6xl font-light">Understanding your vision</h2>
          
          <div className="absolute w-full h-full max-w-4xl">
            <div className={`absolute top-1/3 left-0 transition-opacity duration-500 ${scrollState >= 1 && scrollState < 2.5 ? 'opacity-100' : 'opacity-30'}`}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-px bg-oculis-cyan" />
                <span className="text-lg font-medium">Cornea</span>
              </div>
            </div>
            <div className={`absolute top-1/2 right-0 transition-opacity duration-500 ${scrollState >= 2.5 && scrollState < 3.5 ? 'opacity-100' : 'opacity-30'}`}>
              <div className="flex items-center gap-4 flex-row-reverse">
                <div className="w-16 h-px bg-oculis-blue" />
                <span className="text-lg font-medium">Lens</span>
              </div>
            </div>
            <div className={`absolute bottom-1/3 left-1/4 transition-opacity duration-500 ${scrollState >= 3.5 ? 'opacity-100' : 'opacity-30'}`}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-px bg-oculis-lavender" />
                <span className="text-lg font-medium">Retina</span>
              </div>
            </div>
          </div>

          <p className="absolute bottom-24 max-w-2xl text-center text-oculis-silver text-lg">
            Your vision depends on several delicate structures working together. Our diagnostic systems analyse each layer with microscopic precision.
          </p>
        </div>

      </div>
    </section>
  );
}
