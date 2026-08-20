import { useState } from 'react';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!data.name) newErrors.name = 'Name is required';
    if (!data.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email as string)) newErrors.email = 'Invalid email format';
    if (!data.phone) newErrors.phone = 'Phone number is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 relative bg-oculis-surface text-oculis-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16">
        
        {/* Form */}
        <div className="w-full lg:w-1/2">
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-8">Request an appointment</h2>
          
          {status === 'success' ? (
            <div className="p-8 rounded-2xl bg-oculis-cyan/10 border border-oculis-cyan/30 text-oculis-cyan">
              <h3 className="text-xl font-medium mb-2">Request Sent Successfully</h3>
              <p>Our team will contact you shortly to confirm your appointment time.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm underline hover:text-white"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-oculis-silver mb-2">Full Name</label>
                  <input type="text" id="name" name="name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-oculis-cyan transition-colors" />
                  {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name}</span>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest text-oculis-silver mb-2">Email Address</label>
                  <input type="email" id="email" name="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-oculis-cyan transition-colors" />
                  {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email}</span>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-oculis-silver mb-2">Phone Number</label>
                  <input type="tel" id="phone" name="phone" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-oculis-cyan transition-colors" />
                  {errors.phone && <span className="text-red-400 text-xs mt-1 block">{errors.phone}</span>}
                </div>
                <div>
                  <label htmlFor="treatment" className="block text-xs uppercase tracking-widest text-oculis-silver mb-2">Preferred Treatment</label>
                  <select id="treatment" name="treatment" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-oculis-cyan transition-colors appearance-none">
                    <option value="" className="bg-oculis-navy">Select an option</option>
                    <option value="lasik" className="bg-oculis-navy">LASIK Vision Correction</option>
                    <option value="cataract" className="bg-oculis-navy">Cataract Surgery</option>
                    <option value="consultation" className="bg-oculis-navy">General Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="date" className="block text-xs uppercase tracking-widest text-oculis-silver mb-2">Preferred Date</label>
                <input type="date" id="date" name="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-oculis-cyan transition-colors" />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-oculis-silver mb-2">Message (Optional)</label>
                <textarea id="message" name="message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-oculis-cyan transition-colors resize-none" />
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full px-8 py-4 rounded-xl bg-oculis-cyan text-oculis-navy font-semibold hover:bg-white transition-colors duration-300 disabled:opacity-50"
              >
                {status === 'loading' ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          )}
        </div>

        {/* Info & Map */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-3xl mb-8">OCULIS Vision Institute</h3>
            
            <div className="space-y-6 text-oculis-silver">
              <div>
                <strong className="block text-white font-medium mb-1">Address</strong>
                88 Meridian Avenue<br/>Dubai Healthcare District
              </div>
              <div>
                <strong className="block text-white font-medium mb-1">Contact</strong>
                <a href="tel:+97145550198" className="hover:text-oculis-cyan transition-colors">+971 4 555 0198</a><br/>
                <a href="mailto:care@oculisvision.com" className="hover:text-oculis-cyan transition-colors">care@oculisvision.com</a>
              </div>
              <div>
                <strong className="block text-white font-medium mb-1">Opening Hours</strong>
                Monday–Saturday<br/>8:00 AM–8:00 PM
              </div>
            </div>
          </div>
          
          <div className="mt-12 h-64 rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {/* Map Placeholder */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-oculis-navy/40" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-4 h-4 bg-oculis-cyan rounded-full shadow-[0_0_20px_#B9985A] animate-pulse" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
