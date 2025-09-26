import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const backgroundStyle = {
    // A soft, circular gradient that follows the mouse, using the site's primary accent color.
    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.1), transparent 80%)`,
  };

  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen selection:bg-cyan-300 selection:text-cyan-900">
      {/* Mouse follower gradient overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={backgroundStyle}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-6 md:px-12 lg:px-24">
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
