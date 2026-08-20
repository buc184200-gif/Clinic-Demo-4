export function AppointmentCTA() {
  return (
    <section className="py-32 relative bg-oculis-navy text-oculis-white overflow-hidden">
      {/* Background Iris Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full border border-white/20 animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-white/30 animate-[spin_40s_linear_infinite_reverse]" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-white/40 animate-[spin_20s_linear_infinite]" />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-center">
        <h2 className="font-serif text-5xl md:text-7xl font-light mb-8">
          Your clearest chapter<br/>can begin today.
        </h2>
        <p className="text-xl text-oculis-silver mb-12 max-w-2xl mx-auto leading-relaxed">
          Schedule a comprehensive eye assessment with our specialist team and discover the perfect treatment for your vision.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-10 py-5 rounded-full bg-oculis-cyan text-oculis-navy font-semibold text-lg hover:bg-white transition-colors duration-300"
          >
            Book Assessment
          </button>
          <button className="w-full sm:w-auto px-10 py-5 rounded-full border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-colors duration-300">
            Call the Clinic
          </button>
        </div>
      </div>
    </section>
  );
}
