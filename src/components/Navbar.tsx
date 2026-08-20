import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Treatments', href: '#treatments' },
  { name: 'Technology', href: '#technology' },
  { name: 'Specialists', href: '#specialists' },
  { name: 'Results', href: '#results' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    if (href === '#home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      history.replaceState(null, '', '#home');
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out',
          scrolled
            ? 'bg-oculis-navy/80 backdrop-blur-lg border-b border-white/5 py-4'
            : 'bg-transparent py-6'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div 
            className="flex flex-col cursor-pointer"
            onClick={() => scrollTo('#home')}
          >
            <span className="font-serif text-2xl leading-none tracking-wide text-oculis-white">OCULIS</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-oculis-silver mt-1">Vision Institute</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm font-medium text-oculis-silver hover:text-oculis-cyan transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => scrollTo('#contact')}
              className="px-6 py-2.5 rounded-full bg-oculis-cyan/10 border border-oculis-cyan/30 text-oculis-cyan hover:bg-oculis-cyan hover:text-oculis-navy transition-all duration-300 text-sm font-semibold tracking-wide"
            >
              Book Eye Assessment
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-oculis-white p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-50 bg-oculis-navy flex flex-col pt-24 px-6 pb-12"
          >
            <button
              className="absolute top-6 right-6 text-oculis-white p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            
            <div className="flex flex-col gap-6 items-center justify-center flex-1">
              {navLinks.map((link, i) => (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="font-serif text-4xl text-oculis-white hover:text-oculis-cyan transition-colors"
                >
                  {link.name}
                </motion.button>
              ))}
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                onClick={() => scrollTo('#contact')}
                className="mt-8 px-8 py-4 rounded-full bg-oculis-cyan text-oculis-navy text-lg font-semibold tracking-wide"
              >
                Book Eye Assessment
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
