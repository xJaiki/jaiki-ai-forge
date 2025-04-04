import React, { useState, useEffect, useRef } from 'react';
import './ParallelUniverseNavigation.css';

// Sub-components
import DimensionController from './DimensionController.jsx';
import RealityMap from './RealityMap.jsx';
import RealityStream from './RealityStream.jsx';

const ParallelUniverseNavigation = () => {
  // State for tracking which reality is in focus (0-3)
  const [focusedReality, setFocusedReality] = useState(0);
  
  // State for tracking reality blending percentages
  const [blendState, setBlendState] = useState({
    technical: 100,
    creative: 30,
    personal: 30,
    conceptual: 30
  });
  
  // State for tracking if a reality is locked in focus
  const [focusLocked, setFocusLocked] = useState(false);
  
  // State for saving bookmarked configurations
  const [bookmarks, setBookmarks] = useState([]);
  
  // State for tracking mouse position for parallax effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Reference to the container element
  const containerRef = useRef(null);
  
  // Mock content for each reality
  const realityContent = {
    technical: {
      title: "Technical Universe",
      subtitle: "Architecture & Engineering",
      bio: "Full-stack developer specializing in multimodal interfaces and experimental navigation paradigms. 7+ years experience with React, Three.js, and WebGL.",
      projects: [
        { id: 1, title: "Dimensional API", desc: "A framework for building non-linear navigation systems" },
        { id: 2, title: "ParaNav Library", desc: "Open-source toolkit for parallel information visualization" },
        { id: 3, title: "Quantum UI", desc: "Interface components that exist in multiple states simultaneously" }
      ],
      skills: ["React", "WebGL", "Three.js", "TypeScript", "Node.js", "WebXR"]
    },
    creative: {
      title: "Creative Universe",
      subtitle: "Design & Aesthetics",
      bio: "Digital artist exploring the boundaries between code and creativity. Creating experiences that challenge traditional interface paradigms.",
      projects: [
        { id: 1, title: "Chromashift", desc: "Interactive color experience that responds to user emotion" },
        { id: 2, title: "Soundscape", desc: "Audio-visual environment that translates code into music" },
        { id: 3, title: "Parallel Gallery", desc: "Art exhibition existing in multiple dimensions simultaneously" }
      ],
      skills: ["Generative Art", "3D Modeling", "Animation", "Sound Design", "Creative Coding"]
    },
    personal: {
      title: "Personal Universe",
      subtitle: "Life & Perspective",
      bio: "Perpetual explorer of new ideas. When not coding multidimensional interfaces, I'm hiking mountain trails or exploring speculative fiction.",
      interests: ["Speculative interfaces", "Nature photography", "Science fiction", "Quantum computing", "Philosophy of mind"],
      timeline: [
        { year: 2018, event: "Founded Parallel Labs" },
        { year: 2020, event: "First major exhibition at Digital Art Biennale" },
        { year: 2023, event: "Published 'Beyond Linear: The Future of Navigation'" }
      ]
    },
    conceptual: {
      title: "Conceptual Universe",
      subtitle: "Ideas & Theory",
      bio: "Researcher in human-computer interaction, focusing on how multidimensional interfaces can expand human cognitive capabilities.",
      concepts: [
        { title: "Dimensional Thinking", desc: "How parallel information processing enhances problem-solving" },
        { title: "Reality Shifting", desc: "Techniques for maintaining context across information spaces" },
        { title: "Multimodal Memory", desc: "How spatial-dimensional interfaces improve information recall" }
      ],
      quotes: [
        "The future of interfaces isn't just 3D—it's n-dimensional.",
        "We don't experience life linearly, why should we navigate information that way?",
        "Every interface is a reality tunnel. I'm building multiple tunnels simultaneously."
      ]
    }
  };
  
  // Realities configuration
  const realities = [
    { id: "technical", name: "Technical", color: "#0B3D91", secondaryColor: "#1E88E5", font: "'Roboto Mono', monospace" },
    { id: "creative", name: "Creative", color: "#9C27B0", secondaryColor: "#D81B60", font: "'Playfair Display', serif" },
    { id: "personal", name: "Personal", color: "#FF9800", secondaryColor: "#F44336", font: "'Outfit', sans-serif" },
    { id: "conceptual", name: "Conceptual", color: "#00897B", secondaryColor: "#43A047", font: "'Space Grotesk', sans-serif" }
  ];
  
  // Handle mouse movement for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Handle reality shifting
  const shiftReality = (realityIndex) => {
    if (focusLocked && focusedReality === realityIndex) {
      // If clicking the same reality that's locked, unlock it
      setFocusLocked(false);
      return;
    }
    
    setFocusedReality(realityIndex);
    
    // Update blend state based on focused reality
    const newBlendState = realities.reduce((acc, reality, index) => {
      acc[reality.id] = index === realityIndex ? 100 : 30;
      return acc;
    }, {});
    
    setBlendState(newBlendState);
  };
  
  // Handle reality locking
  const toggleFocusLock = () => {
    setFocusLocked(!focusLocked);
  };
  
  // Handle reality blending
  const blendRealities = (realityId, percentage) => {
    setBlendState(prev => ({
      ...prev,
      [realityId]: percentage
    }));
  };
  
  // Handle reality bookmarking
  const bookmarkCurrentState = () => {
    setBookmarks(prev => [
      ...prev,
      {
        id: Date.now(),
        blendState: { ...blendState },
        focusedReality,
        name: `Configuration ${prev.length + 1}`
      }
    ]);
  };
  
  // Load a bookmarked state
  const loadBookmark = (bookmark) => {
    setBlendState(bookmark.blendState);
    setFocusedReality(bookmark.focusedReality);
  };
  
  // Get the current dimensional state for animation and styling
  const getDimensionalState = (realityId) => {
    const isActive = realities[focusedReality].id === realityId;
    const blendPercentage = blendState[realityId];
    
    return {
      isActive,
      blendPercentage,
      isLocked: focusLocked && isActive
    };
  };
  
  return (
    <div className="pun-container" ref={containerRef}>
      <div className="pun-header">
        <h1 className="pun-title">Jaiki</h1>
        <h2 className="pun-subtitle">Multimodal Interface Developer</h2>
        
        <DimensionController
          realities={realities}
          focusedReality={focusedReality}
          blendState={blendState}
          focusLocked={focusLocked}
          onRealityShift={shiftReality}
          onBlendChange={blendRealities}
          onFocusLockToggle={toggleFocusLock}
          onBookmark={bookmarkCurrentState}
        />
      </div>
      
      <div className={`pun-reality-grid ${focusLocked ? 'focus-locked' : ''}`}>
        {realities.map((reality, index) => (
          <RealityStream
            key={reality.id}
            reality={reality}
            content={realityContent[reality.id]}
            dimensionalState={getDimensionalState(reality.id)}
            mousePosition={mousePosition}
            onFocus={() => shiftReality(index)}
            isFocusLocked={focusLocked && focusedReality === index}
          />
        ))}
      </div>
      
      <div className="pun-reality-map-container">
        <RealityMap
          realities={realities}
          blendState={blendState}
          focusedReality={focusedReality}
          bookmarks={bookmarks}
          onRealitySelect={shiftReality}
          onBookmarkLoad={loadBookmark}
        />
      </div>
      
      <div className="pun-footer">
        <button className="pun-reality-collapse-btn">
          Reality Collapse (Accessibility Mode)
        </button>
      </div>
      
      {/* Particle effects for dimensional boundaries */}
      <div className="pun-dimensional-particles"></div>
    </div>
  );
};

export default ParallelUniverseNavigation;