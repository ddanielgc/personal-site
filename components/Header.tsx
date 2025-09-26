import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/50 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 md:px-12 lg:px-24 py-4 flex justify-between items-center">
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, 'hero')}
          className="text-xl font-bold text-slate-50 tracking-wider cursor-pointer"
        >
          DGC
        </a>
        <ul className="hidden md:flex space-x-8 text-sm font-medium">
          <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-cyan-400 transition-colors cursor-pointer">About</a></li>
          <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-cyan-400 transition-colors cursor-pointer">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;