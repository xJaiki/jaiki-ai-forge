import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

// Menu configuration object - you can easily modify this
const menuItems = [
  { path: '/', label: 'HOME', isExternal: false },
  { path: '/KineticTypographyLandscape', label: 'KINETIC TYPOGRAPHY', isExternal: false },
  { path: '/wireframedeconstruction', label: 'WIREFRAME DECONSTRUCTION', isExternal: false },
  { path: '/SensorySynesthesiaCanvas', label: 'SENSORY SYNESTHESIA', isExternal: false },
  { path: '/paralleluniversenavigation', label: 'PARALLEL UNIVERSE', isExternal: false },
  { path: '/TactileMaterialLayers', label: 'TACTILE MATERIAL', isExternal: false },
  { path: '/chronologicallayering', label: 'CHRONO LAYERING', isExternal: false },
  {
    path: 'https://github.com/xjaiki/react-template-minimal',
    label: 'REPOSITORY',
    isExternal: true
  }
  // Add more menu items as needed
];

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Check if the current link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white">
      {/* Brutalist Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-8 right-8 z-50 bg-black text-white w-16 h-16 flex items-center justify-center border-2 border-black hover:bg-white hover:text-black transition-colors"
      >
        {isMenuOpen ? <X size={32} strokeWidth={3} /> : <Menu size={32} strokeWidth={3} />}
      </button>

      {/* Brutalist Menu Panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-40 w-64 sm:w-80 bg-white border-l-4 border-black transition-transform duration-200 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-8 font-mono">
          <div className="text-3xl font-bold mb-12 tracking-tighter">MENU_</div>
          
          <div className="flex flex-col space-y-6">
            {menuItems.map((item, index) => 
              item.isExternal ? (
                <a 
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block font-mono text-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-xs absolute -left-6 top-1">0{index + 1}</span>
                  <span className="inline-block border-b-2 border-transparent group-hover:border-black">
                    {item.label}
                  </span>
                  <span className="ml-1 inline-block rotate-45">→</span>
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative block font-mono text-xl`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-xs absolute -left-6 top-1">0{index + 1}</span>
                  {isActive(item.path) ? (
                    <span className="inline-block border-b-2 border-black font-bold">
                      {item.label}
                    </span>
                  ) : (
                    <span className="inline-block border-b-2 border-transparent group-hover:border-black">
                      {item.label}
                    </span>
                  )}
                </Link>
              )
            )}
          </div>
          
          <div className="mt-auto text-xs font-mono border-t-2 border-black pt-4">
            NAVIGATION SYSTEM V.1.0
          </div>
        </div>
      </div>

      {/* Site identifier in corner */}
      {/* <div className="fixed top-8 left-8 font-mono text-xs z-30">
        <div className="font-bold">AI.STYLE.INDEX</div>
        <div>{new Date().toISOString().split('T')[0]}</div>
      </div> */}

      {/* Main content */}
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;