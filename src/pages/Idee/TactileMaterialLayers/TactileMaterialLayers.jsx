import React, { useState, useEffect, useRef } from 'react';
import './TactileMaterialLayers.css';

const TactileMaterialLayers = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeLayer, setActiveLayer] = useState(null);
  const containerRef = useRef(null);
  const audioRefs = useRef({
    paper: new Audio(),
    metal: new Audio(),
    glass: new Audio(),
    wood: new Audio()
  });

  // Set up audio files
  useEffect(() => {
    audioRefs.current.paper.src = "https://assets.codepen.io/123456/paper-sound.mp3"; // These would be replaced with actual sound files
    audioRefs.current.metal.src = "https://assets.codepen.io/123456/metal-sound.mp3";
    audioRefs.current.glass.src = "https://assets.codepen.io/123456/glass-sound.mp3";
    audioRefs.current.wood.src = "https://assets.codepen.io/123456/wood-sound.mp3";
    
    // Preload audio
    Object.values(audioRefs.current).forEach(audio => {
      audio.load();
      audio.volume = 0.2;
    });
  }, []);

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate parallax offsets based on mouse position
  const getParallaxStyle = (depth) => {
    if (!containerRef.current) return {};
    
    const container = containerRef.current;
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    
    const offsetX = (mousePosition.x - centerX) * depth;
    const offsetY = (mousePosition.y - centerY) * depth;
    
    return {
      transform: `translate(${offsetX}px, ${offsetY}px)`
    };
  };

  // Simulate material interaction sounds
  const playMaterialSound = (material) => {
    if (audioRefs.current[material]) {
      audioRefs.current[material].currentTime = 0;
      audioRefs.current[material].play().catch(e => console.log("Audio playback prevented:", e));
    }
  };

  const handleLayerHover = (layer) => {
    setActiveLayer(layer);
    playMaterialSound(layer);
  };

  return (
    <div className="tml-container" ref={containerRef}>
      {/* Background texture */}
      <div className="tml-background"></div>
      
      {/* Paper layer - Biography */}
      <section 
        className={`tml-layer tml-paper ${activeLayer === 'paper' ? 'tml-active' : ''}`}
        style={getParallaxStyle(0.02)}
        onMouseEnter={() => handleLayerHover('paper')}
        onMouseLeave={() => setActiveLayer(null)}
      >
        <div className="tml-paper-content">
          <h2 className="tml-paper-title">About Jaiki</h2>
          <p>Craftsman of digital experiences with an eye for detail and tactile quality. I believe in creating interfaces that feel as intuitive and satisfying as physical objects.</p>
          <div className="tml-paper-edge"></div>
        </div>
      </section>
      
      {/* Metal layer - Skills */}
      <section 
        className={`tml-layer tml-metal ${activeLayer === 'metal' ? 'tml-active' : ''}`}
        style={getParallaxStyle(0.04)}
        onMouseEnter={() => handleLayerHover('metal')}
        onMouseLeave={() => setActiveLayer(null)}
      >
        <div className="tml-metal-content">
          <h2 className="tml-metal-title">Technical Expertise</h2>
          <div className="tml-skill-plates">
            <div className="tml-skill-plate">React</div>
            <div className="tml-skill-plate">Three.js</div>
            <div className="tml-skill-plate">Node.js</div>
            <div className="tml-skill-plate">WebGL</div>
            <div className="tml-skill-plate">CSS Animation</div>
          </div>
          <div className="tml-metal-reflection"></div>
        </div>
      </section>
      
      {/* Glass layer - Projects */}
      <section 
        className={`tml-layer tml-glass ${activeLayer === 'glass' ? 'tml-active' : ''}`}
        style={getParallaxStyle(0.06)}
        onMouseEnter={() => handleLayerHover('glass')}
        onMouseLeave={() => setActiveLayer(null)}
      >
        <div className="tml-glass-content">
          <h2 className="tml-glass-title">Featured Projects</h2>
          <div className="tml-project-showcases">
            <div className="tml-project-showcase">
              <div className="tml-project-image"></div>
              <h3>Tactile E-Commerce</h3>
            </div>
            <div className="tml-project-showcase">
              <div className="tml-project-image"></div>
              <h3>Material Dashboard</h3>
            </div>
            <div className="tml-project-showcase">
              <div className="tml-project-image"></div>
              <h3>Texture Library</h3>
            </div>
          </div>
          <div className="tml-glass-highlight"></div>
          <div className="tml-glass-reflection"></div>
        </div>
      </section>
      
      {/* Wood layer - Navigation */}
      <section 
        className={`tml-layer tml-wood ${activeLayer === 'wood' ? 'tml-active' : ''}`}
        style={getParallaxStyle(0.08)}
        onMouseEnter={() => handleLayerHover('wood')}
        onMouseLeave={() => setActiveLayer(null)}
      >
        <div className="tml-wood-content">
          <nav className="tml-wood-navigation">
            <div className="tml-nav-item tml-active">Home</div>
            <div className="tml-nav-item">Projects</div>
            <div className="tml-nav-item">Skills</div>
            <div className="tml-nav-item">Contact</div>
          </nav>
          <div className="tml-wood-grain"></div>
        </div>
      </section>
      
      {/* Fabric layer - Contact */}
      <section 
        className="tml-layer tml-fabric"
        style={getParallaxStyle(0.1)}
      >
        <div className="tml-fabric-content">
          <h2 className="tml-fabric-title">Get in Touch</h2>
          <div className="tml-contact-buttons">
            <button className="tml-contact-button tml-email">Email</button>
            <button className="tml-contact-button tml-github">GitHub</button>
            <button className="tml-contact-button tml-linkedin">LinkedIn</button>
          </div>
          <div className="tml-fabric-texture"></div>
        </div>
      </section>
      
      {/* Interactive elements */}
      <div className="tml-cursor-follower" style={{ 
        left: `${mousePosition.x}px`, 
        top: `${mousePosition.y}px` 
      }}></div>
    </div>
  );
};

export default TactileMaterialLayers;