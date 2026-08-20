import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const steps = [
  {
    num: '01',
    title: 'Comprehensive Assessment',
    desc: 'Advanced 3D mapping and diagnostic scans to capture every detail of your unique eye structure.'
  },
  {
    num: '02',
    title: 'Personalised Treatment Plan',
    desc: 'Our specialists analyze your data to design a custom procedure optimized for your specific vision goals.'
  },
  {
    num: '03',
    title: 'Precision Procedure',
    desc: 'State-of-the-art laser technology executes the plan with microscopic accuracy, usually in under 15 minutes.'
  },
  {
    num: '04',
    title: 'Guided Recovery',
    desc: 'Comprehensive post-operative care and follow-ups to ensure your vision stabilizes perfectly.'
  }
];

export function Procedure() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      }
    });

    // Animate the connecting line
    tl.fromTo(lineRef.current, 
      { scaleY: 0 },
      { scaleY: 1, ease: 'none' },
      0
    );

    // Animate each step fading in
    stepRefs.current.forEach((step, i) => {
      if (!step) return;
      
      gsap.fromTo(step, 
        { opacity: 0.2, x: -20 },
        {
          opacity: 1, 
          x: 0,
          scrollTrigger: {
            trigger: step,
            start: 'top 60%',
            end: 'top 40%',
            scrub: true,
          }
        }
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="py-32 relative bg-oculis-surface text-oculis-white" ref={containerRef}>
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <h2 className="font-serif text-5xl md:text-6xl font-light mb-24 text-center">Your journey to clearer vision</h2>

        <div className="relative pl-8 md:pl-20">
          {/* Background subtle line */}
          <div className="absolute left-[15px] md:left-[39px] top-4 bottom-4 w-px bg-white/10" />
          
          {/* Active animated line */}
          <div 
            ref={lineRef}
            className="absolute left-[15px] md:left-[39px] top-4 bottom-4 w-px bg-gradient-to-b from-oculis-cyan via-oculis-blue to-transparent origin-top" 
          />

          <div className="space-y-24">
            {steps.map((step, i) => (
              <div 
                key={i} 
                ref={el => { stepRefs.current[i] = el; }}
                className="relative"
              >
                {/* Number node */}
                <div className="absolute -left-12 md:-left-24 top-0 w-8 h-8 rounded-full bg-oculis-navy border border-oculis-cyan flex items-center justify-center shadow-[0_0_15px_rgba(185,152,90,0.3)]">
                  <div className="w-2 h-2 rounded-full bg-oculis-cyan" />
                </div>
                
                <div className="text-oculis-cyan text-sm font-semibold tracking-widest mb-3">
                  {step.num}
                </div>
                <h3 className="text-3xl font-serif mb-4 text-oculis-white">{step.title}</h3>
                <p className="text-oculis-silver leading-relaxed max-w-xl">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
