import { useState, useRef, useEffect, useCallback } from 'react';

export function Results() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  useEffect(() => {
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    
    const handleTouchEnd = () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

    const sliderElement = containerRef.current;
    if (!sliderElement) return;

    const onMouseDown = (e: MouseEvent) => {
      handleMove(e.clientX);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    const onTouchStart = (e: TouchEvent) => {
      handleMove(e.touches[0].clientX);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    };

    sliderElement.addEventListener('mousedown', onMouseDown);
    sliderElement.addEventListener('touchstart', onTouchStart, { passive: true });

    return () => {
      sliderElement.removeEventListener('mousedown', onMouseDown);
      sliderElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMove]);

  return (
    <section id="results" className="py-32 relative bg-oculis-surface text-oculis-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="font-serif text-5xl md:text-6xl font-light mb-20 text-center">Clarity that changes everyday life</h2>

        {/* Vision Slider */}
        <div className="mb-32">
          <p className="text-center text-oculis-silver mb-8 text-sm uppercase tracking-widest">Vision Simulation</p>
          <div 
            ref={containerRef}
            className="relative w-full max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden cursor-ew-resize select-none bg-black"
          >
            {/* Base Image (Clear) */}
            <img 
              src="https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?q=80&w=1600&auto=format&fit=crop" 
              alt="Clear vision" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            
            {/* Overlay Image (Blurred) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src="https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?q=80&w=1600&auto=format&fit=crop" 
                alt="Blurred vision" 
                className="absolute inset-0 w-[100vw] max-w-[1024px] h-full object-cover blur-md pointer-events-none"
                style={{ width: containerRef.current?.offsetWidth || '100%' }}
              />
            </div>

            {/* Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)]"
              style={{ left: `calc(${sliderPosition}% - 2px)` }}
            >
              <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-0.5 h-3 bg-oculis-navy/50 rounded-full" />
                  <div className="w-0.5 h-3 bg-oculis-navy/50 rounded-full" />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-xs font-semibold tracking-widest pointer-events-none">
              BEFORE
            </div>
            <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-xs font-semibold tracking-widest pointer-events-none">
              AFTER
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Michael T.", proc: "Custom LASIK", quote: "Waking up and seeing the alarm clock without reaching for my glasses is a feeling I’ll never get used to. Truly life-changing precision." },
            { name: "Sarah L.", proc: "Cataract Surgery", quote: "The colors are so vibrant now. Dr. Cole’s expertise made the entire process seamless and painless. I couldn't be happier." },
            { name: "David R.", proc: "SMILE Procedure", quote: "Back to training for my marathon the very next day. The recovery was incredibly fast and my vision is sharper than 20/20." }
          ].map((test, i) => (
            <div key={i} className="p-8 rounded-2xl bg-oculis-navy/50 border border-white/5">
              <div className="flex text-oculis-cyan mb-6">
                {[1,2,3,4,5].map(s => <span key={s}>★</span>)}
              </div>
              <p className="text-oculis-white font-serif text-xl italic mb-6 leading-relaxed">"{test.quote}"</p>
              <div>
                <div className="font-medium text-oculis-white">{test.name}</div>
                <div className="text-xs text-oculis-silver uppercase tracking-widest mt-1">{test.proc}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
