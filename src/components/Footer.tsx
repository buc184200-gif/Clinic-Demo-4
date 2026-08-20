export function Footer() {
  return (
    <footer className="bg-oculis-navy py-12 border-t border-white/5 text-oculis-silver">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-1">
            <div className="flex flex-col mb-6">
              <span className="font-serif text-2xl leading-none tracking-wide text-oculis-white">OCULIS</span>
              <span className="text-[10px] uppercase tracking-[0.2em] mt-1">Vision Institute</span>
            </div>
            <p className="text-sm leading-relaxed pr-4">
              Advanced ophthalmology and laser vision correction providing clarity that changes everyday life.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#home" className="hover:text-oculis-cyan transition-colors">Home</a></li>
              <li><a href="#technology" className="hover:text-oculis-cyan transition-colors">Technology</a></li>
              <li><a href="#specialists" className="hover:text-oculis-cyan transition-colors">Specialists</a></li>
              <li><a href="#results" className="hover:text-oculis-cyan transition-colors">Results</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs">Treatments</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#treatments" className="hover:text-oculis-cyan transition-colors">LASIK Vision Correction</a></li>
              <li><a href="#treatments" className="hover:text-oculis-cyan transition-colors">Cataract Surgery</a></li>
              <li><a href="#treatments" className="hover:text-oculis-cyan transition-colors">Retina Care</a></li>
              <li><a href="#treatments" className="hover:text-oculis-cyan transition-colors">Glaucoma Management</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Medical Disclaimer</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 OCULIS Vision Institute. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-oculis-cyan transition-colors">Instagram</a>
            <a href="#" className="hover:text-oculis-cyan transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-oculis-cyan transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
