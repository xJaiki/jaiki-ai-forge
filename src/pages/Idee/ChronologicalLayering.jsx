import React, { useState, useEffect } from 'react';

const ChronologicalLayering = () => {
  const [timePosition, setTimePosition] = useState(50); // 0-100 scale: 0=past, 50=present, 100=future
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Traccia posizione dello scroll e applica effetti
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Funzione per determinare l'opacità basata sulla posizione temporale
  const getTemporalOpacity = (itemTime) => {
    // Calcola la differenza tra il tempo dell'elemento e il tempo corrente dell'interfaccia
    const temporalDistance = Math.abs(itemTime - timePosition);
    // Più è vicino al timePosition corrente, più sarà visibile
    return Math.max(0, 1 - (temporalDistance / 50) * 0.8);
  };
  
  // Funzione per determinare il peso del font basato sulla posizione temporale
  const getTemporalFontWeight = (itemTime) => {
    // Più è vicino al presente o futuro, più sarà in grassetto
    const weight = 400 + Math.max(0, (itemTime - 20) / 80 * 500);
    return Math.min(900, Math.round(weight / 100) * 100);
  };
  
  // Funzione per ottenere il colore basato sulla posizione temporale
  const getTemporalColor = (itemTime) => {
    if (itemTime < 30) {
      // Passato - toni più freddi (blu)
      return `rgb(${Math.round(100 + itemTime * 2)}, ${Math.round(150 + itemTime * 2)}, 255)`;
    } else if (itemTime < 70) {
      // Presente - toni neutri tendenti al caldo
      const adjustment = (itemTime - 30) * 2.5;
      return `rgb(${Math.round(160 + adjustment)}, ${Math.round(210 - adjustment / 2)}, ${Math.round(255 - adjustment * 2)})`;
    } else {
      // Futuro - toni caldi e vibranti
      const adjustment = (itemTime - 70) * 3;
      return `rgb(${Math.round(255)}, ${Math.round(210 - adjustment)}, ${Math.round(160 - adjustment * 2)})`;
    }
  };

  // Progetti con informazione temporale
  const projects = [
    { id: 1, title: 'E-commerce Platform', desc: 'Piattaforma completa con pagamenti e gestione inventario', temporalValue: 30, tags: ['React', 'Node', 'MongoDB'] },
    { id: 2, title: 'App per Fitness', desc: 'Applicazione mobile per tracciare allenamenti e nutrizione', temporalValue: 50, tags: ['React Native', 'Firebase', 'Redux'] },
    { id: 3, title: 'Dashboard Analitica', desc: 'Visualizzazione dati per azienda nel settore finanziario', temporalValue: 70, tags: ['Vue', 'D3.js', 'GraphQL'] },
    { id: 4, title: 'Sistema CRM', desc: 'Sistema di gestione clienti con automazioni e reportistica', temporalValue: 20, tags: ['Angular', 'Express', 'PostgreSQL'] },
    { id: 5, title: 'Web3 Marketplace', desc: 'Piattaforma decentralizzata per scambio di asset digitali', temporalValue: 85, tags: ['Solidity', 'Next.js', 'IPFS'] },
    { id: 6, title: 'IoT Control Center', desc: 'Interfaccia per gestione dispositivi smart home e sensori', temporalValue: 65, tags: ['TypeScript', 'WebSockets', 'Svelte'] },
  ];

  // Competenze con informazione temporale (dalle più consolidate alle più recenti)
  const skills = [
    { name: 'HTML/CSS', temporalValue: 10 },
    { name: 'JavaScript', temporalValue: 20 },
    { name: 'React', temporalValue: 35 },
    { name: 'Node.js', temporalValue: 45 },
    { name: 'TypeScript', temporalValue: 50 },
    { name: 'GraphQL', temporalValue: 60 },
    { name: 'Next.js', temporalValue: 65 },
    { name: 'Docker', temporalValue: 70 },
    { name: 'AWS', temporalValue: 75 },
    { name: 'Web3', temporalValue: 80 },
    { name: 'AI Integration', temporalValue: 90 },
    { name: 'AR/VR', temporalValue: 95 }
  ];

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Strati temporali di sfondo */}
      <div className="fixed inset-0 z-0">
        {[0, 25, 50, 75, 100].map((layer) => (
          <div 
            key={layer}
            className="absolute inset-0" 
            style={{
              opacity: getTemporalOpacity(layer) * 0.3,
              background: `radial-gradient(circle at center, ${getTemporalColor(layer)} 0%, transparent 70%)`,
              transform: `scale(${1 + Math.abs(layer - 50) / 100})`,
              transition: 'all 0.5s ease-out'
            }}
          />
        ))}
      </div>

      {/* Interfaccia di navigazione temporale */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
        <div className="mb-2 text-sm font-medium" style={{ color: getTemporalColor(timePosition) }}>
          {timePosition < 30 ? 'PASSATO' : timePosition < 70 ? 'PRESENTE' : 'FUTURO'}
        </div>
        <div className="w-64 h-16 bg-gray-800/70 backdrop-blur-md rounded-full flex items-center justify-center relative shadow-xl border border-gray-700">
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-blue-600 via-purple-500 to-orange-500 opacity-20"></div>
          </div>
          
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={timePosition}
            onChange={(e) => setTimePosition(parseInt(e.target.value))}
            className="w-48 z-10 appearance-none bg-transparent [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-gray-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:mt-[-8px]"
          />
          
          <div 
            className="absolute top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full pointer-events-none"
            style={{ 
              background: getTemporalColor(timePosition),
              boxShadow: `0 0 15px ${getTemporalColor(timePosition)}`
            }}
          ></div>
        </div>
        <div className="flex justify-between w-64 mt-1 text-xs text-gray-400">
          <span>Passato</span>
          <span>Presente</span>
          <span>Futuro</span>
        </div>
      </div>

      {/* Header con strati temporali */}
      <header className="relative z-10 px-8 py-6 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold tracking-wider flex items-center">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3" 
              style={{ 
                background: `linear-gradient(135deg, ${getTemporalColor(30)}, ${getTemporalColor(70)})`,
              }}
            >
              <div className="transform rotate-45 w-4 h-4 bg-white/30"></div>
            </div>
            <span>MARIO<span style={{ color: getTemporalColor(75) }}>.DEV</span></span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {['Portfolio', 'Competenze', 'Timeline', 'Contatti'].map((item, i) => (
              <a 
                key={i} 
                href={`#${item.toLowerCase()}`} 
                className="px-4 py-2 rounded-full"
                style={{ 
                  color: getTemporalColor(25 + i * 25),
                  opacity: getTemporalOpacity(25 + i * 25),
                  fontWeight: getTemporalFontWeight(25 + i * 25),
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Contenuto principale con sovrapposizione temporale */}
      <main className="relative z-10 container mx-auto px-8 pt-16 pb-32">
        {/* Hero section con diversi strati temporali */}
        <section className="mb-32 relative">
          {[20, 50, 80].map((layer, i) => (
            <div 
              key={i}
              className="absolute top-0 left-0 w-full"
              style={{ 
                opacity: getTemporalOpacity(layer),
                transform: `translateY(${(layer - 50) * 0.5}px)`,
                transition: 'all 0.5s ease-out',
                zIndex: i,
              }}
            >
              <div className="max-w-4xl mx-auto">
                <h1 
                  className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
                  style={{ 
                    color: getTemporalColor(layer),
                    fontWeight: getTemporalFontWeight(layer)
                  }}
                >
                  {layer < 30 ? 'Codice che ha trasformato il web' : 
                   layer < 70 ? 'Codice che trasforma idee in realtà' : 
                   'Codice che darà forma al futuro'}
                </h1>
                
                <p 
                  className="text-xl mb-10 max-w-2xl"
                  style={{ opacity: 0.8 }}
                >
                  {layer < 30 ? 'Sviluppatore con anni di esperienza in progetti web e applicazioni cross-platform' : 
                   layer < 70 ? 'Sviluppatore full-stack specializzato in creare esperienze digitali uniche e performanti' : 
                   'Sviluppatore orientato alle tecnologie emergenti e soluzioni innovative per le sfide di domani'}
                </p>
              </div>
            </div>
          ))}
          
          {/* Pulsanti sempre visibili ma con stile basato sul timePosition */}
          <div className="relative max-w-4xl mx-auto pt-64">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
              <button 
                className="px-8 py-3 rounded-full shadow-lg transition-all"
                style={{ 
                  background: `linear-gradient(135deg, ${getTemporalColor(timePosition-10)}, ${getTemporalColor(timePosition+10)})`,
                  fontWeight: getTemporalFontWeight(timePosition)
                }}
              >
                Esplora i Miei Progetti
              </button>
              <button 
                className="px-8 py-3 bg-transparent border rounded-full transition-all"
                style={{ 
                  borderColor: getTemporalColor(timePosition),
                  color: getTemporalColor(timePosition),
                  fontWeight: getTemporalFontWeight(Math.max(0, timePosition-20))
                }}
              >
                Inizia una Collaborazione
              </button>
            </div>
          </div>
        </section>

        {/* Sezione skills con disposizione temporale */}
        <section id="competenze" className="mb-32 relative">
          <h2 
            className="text-3xl font-bold mb-12 text-center"
            style={{ color: getTemporalColor(timePosition) }}
          >
            Competenze attraverso il tempo
          </h2>
          
          <div className="max-w-5xl mx-auto relative">
            {/* Linea temporale */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-700 transform -translate-x-1/2"></div>
            
            <div className="relative">
              {skills.map((skill, i) => (
                <div 
                  key={i}
                  className="flex items-center mb-6 relative"
                  style={{ 
                    opacity: getTemporalOpacity(skill.temporalValue),
                    transform: `translateY(${(skill.temporalValue - timePosition) * 0.3}px)`,
                    transition: 'all 0.5s ease-out',
                  }}
                >
                  <div className="w-1/2 pr-12 text-right">
                    {skill.temporalValue <= 50 && (
                      <div
                        className="font-medium"
                        style={{ 
                          color: getTemporalColor(skill.temporalValue),
                          fontWeight: getTemporalFontWeight(skill.temporalValue) 
                        }}
                      >
                        {skill.name}
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className="absolute left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2"
                    style={{ 
                      background: getTemporalColor(skill.temporalValue),
                      boxShadow: `0 0 10px ${getTemporalColor(skill.temporalValue)}` 
                    }}
                  ></div>
                  
                  <div className="w-1/2 pl-12">
                    {skill.temporalValue > 50 && (
                      <div
                        className="font-medium"
                        style={{ 
                          color: getTemporalColor(skill.temporalValue),
                          fontWeight: getTemporalFontWeight(skill.temporalValue) 
                        }}
                      >
                        {skill.name}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Progetti come strati temporali */}
        <section id="portfolio" className="mb-32">
          <h2 
            className="text-3xl font-bold mb-12 text-center"
            style={{ color: getTemporalColor(timePosition) }}
          >
            Progetti nel Continuum Temporale
          </h2>
          
          <div className="max-w-6xl mx-auto relative min-h-[600px]">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="absolute w-full max-w-lg p-6 rounded-lg backdrop-blur-md transition-all duration-500"
                style={{
                  left: `${((project.temporalValue - 50) * 0.5) + 50}%`,
                  top: `${((Math.abs(project.temporalValue - 50)) * 2) + 10}px`,
                  opacity: getTemporalOpacity(project.temporalValue),
                  background: `rgba(20, 20, 30, ${0.6 - Math.abs(project.temporalValue - timePosition) / 100})`,
                  border: `1px solid ${getTemporalColor(project.temporalValue)}`,
                  boxShadow: `0 10px 30px rgba(0,0,0,0.2), 0 0 15px ${getTemporalColor(project.temporalValue)}33`,
                  transform: `translateX(-50%) scale(${1 - Math.abs(project.temporalValue - timePosition) / 200}) translateY(${(project.temporalValue - timePosition) * 0.5}px)`,
                  zIndex: 100 - Math.abs(project.temporalValue - timePosition),
                }}
              >
                <h3 
                  className="text-xl mb-3"
                  style={{ 
                    color: getTemporalColor(project.temporalValue),
                    fontWeight: getTemporalFontWeight(project.temporalValue)
                  }}
                >
                  {project.title}
                </h3>
                <p className="mb-4 text-gray-300">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ 
                        background: `${getTemporalColor(project.temporalValue)}22`,
                        border: `1px solid ${getTemporalColor(project.temporalValue)}44`,
                        color: getTemporalColor(project.temporalValue)
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Sezione contatti con stile temporale */}
        <section id="contatti" className="relative">
          <div 
            className="max-w-4xl mx-auto p-8 rounded-lg backdrop-blur-lg relative"
            style={{
              background: `rgba(20, 20, 30, 0.6)`,
              border: `1px solid ${getTemporalColor(timePosition)}33`,
            }}
          >
            <div 
              className="absolute inset-0 rounded-lg opacity-20"
              style={{
                background: `linear-gradient(135deg, ${getTemporalColor(timePosition-30)}, ${getTemporalColor(timePosition+30)})`,
              }}
            ></div>
            
            <div className="relative z-10">
              <h2 
                className="text-3xl font-bold mb-6 text-center"
                style={{ color: getTemporalColor(timePosition) }}
              >
                Connettiti Attraverso il Tempo
              </h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      className="block text-sm mb-2"
                      style={{ color: getTemporalColor(Math.max(0, timePosition-20)) }}
                    >
                      Nome
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-gray-800/50 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                      style={{ 
                        borderColor: `${getTemporalColor(timePosition)}33`,
                        color: getTemporalColor(timePosition)
                      }} 
                    />
                  </div>
                  <div>
                    <label 
                      className="block text-sm mb-2"
                      style={{ color: getTemporalColor(Math.max(0, timePosition-20)) }}
                    >
                      Email
                    </label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 bg-gray-800/50 border rounded-lg focus:outline-none focus:ring-2 transition-all" 
                      style={{ 
                        borderColor: `${getTemporalColor(timePosition)}33`,
                        color: getTemporalColor(timePosition)
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label 
                    className="block text-sm mb-2"
                    style={{ color: getTemporalColor(Math.max(0, timePosition-20)) }}
                  >
                    Messaggio
                  </label>
                  <textarea 
                    rows="4" 
                    className="w-full px-4 py-3 bg-gray-800/50 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: `${getTemporalColor(timePosition)}33`,
                      color: getTemporalColor(timePosition)
                    }}
                  ></textarea>
                </div>
                <div className="text-center">
                  <button 
                    type="submit" 
                    className="px-8 py-3 rounded-full shadow-lg transition-all"
                    style={{ 
                      background: `linear-gradient(135deg, ${getTemporalColor(timePosition-10)}, ${getTemporalColor(timePosition+10)})`,
                      fontWeight: getTemporalFontWeight(timePosition)
                    }}
                  >
                    Invia Messaggio
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer con elementi temporali */}
      <footer className="relative z-10 py-10 backdrop-blur-sm border-t" style={{ borderColor: `${getTemporalColor(timePosition)}22` }}>
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div 
              className="text-xl font-bold tracking-wider flex items-center mb-6 md:mb-0"
              style={{ color: getTemporalColor(timePosition) }}
            >
              MARIO<span style={{ color: getTemporalColor(Math.min(100, timePosition+20)) }}>.DEV</span>
            </div>
            
            <div className="flex space-x-6 mb-6 md:mb-0">
              {['Past', 'Present', 'Future'].map((item, i) => (
                <button 
                  key={i} 
                  className="transition-colors"
                  style={{ 
                    color: getTemporalColor(i * 50),
                    fontWeight: getTemporalFontWeight(i * 50),
                  }}
                  onClick={() => setTimePosition(i * 50)}
                >
                  {item}
                </button>
              ))}
            </div>
            
            <div 
              className="text-sm"
              style={{ color: `${getTemporalColor(timePosition)}88` }}
            >
              &copy; {new Date().getFullYear()} Mario Dev. Tutti i diritti riservati.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChronologicalLayering;