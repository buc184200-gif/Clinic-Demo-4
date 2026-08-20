import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const doctors = [
  {
    id: 'voss',
    name: 'Dr. Elena Voss',
    role: 'Laser Vision Specialist',
    qualifications: 'MD, PhD, FRCOphth',
    experience: '18+ Years',
    specialisation: 'Refractive Surgery, Custom LASIK, SMILE',
    bio: 'Dr. Voss is an internationally recognized pioneer in wavefront-guided refractive surgery. She has performed over 10,000 successful procedures and routinely speaks at global ophthalmology summits.',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cole',
    name: 'Dr. Adrian Cole',
    role: 'Retina and Cataract Surgeon',
    qualifications: 'MD, FACS',
    experience: '22+ Years',
    specialisation: 'Premium IOL Cataract Surgery, Retinal Detachment',
    bio: 'Dr. Cole specializes in complex anterior segment reconstructions and premium intraocular lens implants. His meticulous approach ensures rapid visual recovery for aging patients.',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop'
  }
];

export function Specialists() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedDoc = doctors.find(d => d.id === selectedId);

  useEffect(() => {
    if (selectedId) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedId]);

  return (
    <section id="specialists" className="py-32 relative bg-oculis-navy text-oculis-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="font-serif text-5xl md:text-6xl font-light mb-20 text-center">
          Specialists dedicated to your vision
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-12">
          {doctors.map(doc => (
            <div key={doc.id} className="group relative">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-6 bg-oculis-surface">
                <img 
                  src={doc.img} 
                  alt={doc.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-serif text-oculis-white mb-1">{doc.name}</h3>
                <p className="text-oculis-cyan text-sm tracking-wide mb-4">{doc.role}</p>
                <button 
                  onClick={() => setSelectedId(doc.id)}
                  className="text-xs uppercase tracking-widest text-oculis-silver hover:text-oculis-white transition-colors border-b border-oculis-silver/30 hover:border-oculis-white pb-1"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedId && selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-oculis-navy/90 backdrop-blur-md" onClick={() => setSelectedId(null)} />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-oculis-surface rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="w-full md:w-2/5 h-64 md:h-auto">
                <img src={selectedDoc.img} alt={selectedDoc.name} className="w-full h-full object-cover grayscale" />
              </div>
              
              <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto">
                <h3 className="font-serif text-4xl mb-2">{selectedDoc.name}</h3>
                <p className="text-oculis-cyan font-medium mb-8">{selectedDoc.role}</p>
                
                <p className="text-oculis-silver leading-relaxed mb-8">{selectedDoc.bio}</p>
                
                <div className="space-y-4">
                  <div className="border-t border-white/10 pt-4">
                    <span className="text-xs uppercase tracking-widest text-oculis-silver block mb-1">Qualifications</span>
                    <span className="text-oculis-white">{selectedDoc.qualifications}</span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <span className="text-xs uppercase tracking-widest text-oculis-silver block mb-1">Experience</span>
                    <span className="text-oculis-white">{selectedDoc.experience}</span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <span className="text-xs uppercase tracking-widest text-oculis-silver block mb-1">Specialisation</span>
                    <span className="text-oculis-white">{selectedDoc.specialisation}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
