import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, Droplet, Activity, Scan, Layers, Baby } from 'lucide-react';
import { cn } from '../lib/utils';

const treatmentsData = [
  {
    id: 'lasik',
    title: 'LASIK Vision Correction',
    description: 'Advanced laser reshaping of the cornea to correct myopia, hyperopia, and astigmatism.',
    icon: Scan,
    details: 'LASIK (Laser-Assisted In Situ Keratomileusis) is the most commonly performed laser eye surgery to treat myopia, hyperopia, and astigmatism. We use bladeless femtosecond lasers for maximum precision.',
    candidates: 'Individuals over 18 with stable prescriptions and healthy corneas.',
    time: 'Approx. 15 minutes for both eyes.',
    recovery: 'Most patients return to normal activities within 24 hours.'
  },
  {
    id: 'cataract',
    title: 'Cataract Surgery',
    description: 'Micro-incision lens replacement using premium intraocular lenses for restored clarity.',
    icon: Eye,
    details: 'Our cataract procedures utilize advanced ultrasound or laser technology to gently remove the clouded natural lens and replace it with a premium customized intraocular lens (IOL).',
    candidates: 'Patients experiencing cloudy vision, glare, or difficulty seeing at night due to cataracts.',
    time: 'Approx. 20 minutes per eye.',
    recovery: 'Clearer vision is often noticed within 24-48 hours. Full stabilization takes a few weeks.'
  },
  {
    id: 'retina',
    title: 'Retina Care',
    description: 'Specialist management of macular degeneration, diabetic retinopathy, and detachments.',
    icon: Activity,
    details: 'Comprehensive diagnostics and treatments for complex retinal conditions, including intravitreal injections, laser photocoagulation, and vitrectomy.',
    candidates: 'Patients with diabetes, macular degeneration, or symptoms like sudden flashes or floaters.',
    time: 'Varies by procedure. Intravitreal injections take 5 minutes.',
    recovery: 'Depending on the specific treatment, recovery ranges from a day to several weeks.'
  },
  {
    id: 'glaucoma',
    title: 'Glaucoma Management',
    description: 'Advanced pressure monitoring, laser treatments, and minimally invasive glaucoma surgery (MIGS).',
    icon: Layers,
    details: 'Preserving vision through early detection and personalized management plans, ranging from medicated drops to advanced MIGS procedures to lower intraocular pressure.',
    candidates: 'Individuals diagnosed with elevated intraocular pressure or optic nerve damage.',
    time: 'Laser procedures take 10-15 minutes.',
    recovery: 'Usually minimal downtime. Drops may be required long-term.'
  },
  {
    id: 'dry-eye',
    title: 'Dry Eye Treatment',
    description: 'Targeted therapies for tear film instability and meibomian gland dysfunction.',
    icon: Droplet,
    details: 'We offer advanced diagnostics and treatments like LipiFlow or intense pulsed light (IPL) therapy to address the root causes of dry eye, rather than just masking symptoms.',
    candidates: 'Anyone experiencing chronic gritty, burning, or watery eyes.',
    time: 'In-office treatments take 15-30 minutes.',
    recovery: 'Immediate return to activities. Symptom improvement varies by treatment.'
  },
  {
    id: 'pediatric',
    title: 'Pediatric Eye Care',
    description: 'Gentle, specialized diagnostic and corrective care for children and infants.',
    icon: Baby,
    details: 'Early intervention is crucial. We treat conditions like strabismus (crossed eyes), amblyopia (lazy eye), and pediatric cataracts in a child-friendly environment.',
    candidates: 'Children from infancy through adolescence.',
    time: 'Assessments take 30-45 minutes.',
    recovery: 'Depends on treatment. Patching or glasses require ongoing management.'
  }
];

export function Treatments() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedTreatment = treatmentsData.find((t) => t.id === selectedId);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedId]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="treatments" className="py-32 relative bg-oculis-surface text-oculis-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-20 md:w-1/2">
          <h2 className="font-serif text-5xl md:text-6xl font-light mb-6">Precision care<br/>for every eye</h2>
          <div className="w-16 h-px bg-oculis-cyan mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatmentsData.map((treatment) => (
            <div 
              key={treatment.id}
              className="group relative rounded-2xl border border-white/5 bg-oculis-navy/50 p-8 hover:bg-white/[0.02] transition-colors duration-500 overflow-hidden"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-oculis-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="w-12 h-12 rounded-full border border-oculis-cyan/20 flex items-center justify-center mb-6 text-oculis-cyan group-hover:scale-110 group-hover:border-oculis-cyan/50 transition-all duration-500">
                <treatment.icon size={24} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl font-serif mb-3 text-oculis-white group-hover:text-oculis-cyan transition-colors">{treatment.title}</h3>
              <p className="text-oculis-silver text-sm leading-relaxed mb-8 h-16">{treatment.description}</p>
              
              <button 
                onClick={() => setSelectedId(treatment.id)}
                className="text-sm font-semibold tracking-wide text-oculis-white group-hover:text-oculis-cyan transition-colors flex items-center gap-2"
              >
                Learn more
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedId && selectedTreatment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-oculis-navy/90 backdrop-blur-md" onClick={() => setSelectedId(null)} />
            
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-oculis-surface border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh]"
              role="dialog"
              aria-modal="true"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-oculis-silver hover:text-white"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
              
              <div className="w-12 h-12 rounded-full bg-oculis-cyan/10 flex items-center justify-center mb-6 text-oculis-cyan">
                <selectedTreatment.icon size={24} strokeWidth={1.5} />
              </div>
              
              <h3 className="font-serif text-4xl mb-6">{selectedTreatment.title}</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-oculis-cyan mb-2">The Procedure</h4>
                  <p className="text-oculis-silver leading-relaxed">{selectedTreatment.details}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <h4 className="text-xs uppercase tracking-widest text-oculis-silver mb-2">Suitable Candidates</h4>
                    <p className="text-sm text-oculis-white">{selectedTreatment.candidates}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <h4 className="text-xs uppercase tracking-widest text-oculis-silver mb-2">Procedure Time</h4>
                    <p className="text-sm text-oculis-white">{selectedTreatment.time}</p>
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <h4 className="text-xs uppercase tracking-widest text-oculis-silver mb-2">Recovery</h4>
                  <p className="text-sm text-oculis-white">{selectedTreatment.recovery}</p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <button 
                  onClick={() => {
                    setSelectedId(null);
                    // Slight delay to allow modal close animation before scroll
                    setTimeout(() => {
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-oculis-cyan text-oculis-navy font-semibold hover:bg-white transition-colors duration-300"
                >
                  Book Consultation
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
