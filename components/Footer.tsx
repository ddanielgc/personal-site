
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 text-center text-sm text-slate-500">
      <div className="container mx-auto px-6">
        <p>&copy; {currentYear} Daniel Gusmão Campos. All Rights Reserved.</p>
        <p className="mt-2">Designed & Built with Soul</p>
      </div>
    </footer>
  );
};

export default Footer;
