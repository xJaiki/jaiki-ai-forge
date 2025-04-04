import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const GlitchText = ({ children, className, intensity = 'medium' }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const textRef = useRef(null);
  const timeoutRef = useRef(null);
  
  // Set intensity parameters
  const getIntensityParams = () => {
    switch (intensity) {
      case 'low':
        return {
          chance: 0.01,
          duration: [50, 150],
          interval: [5000, 10000]
        };
      case 'high':
        return {
          chance: 0.05,
          duration: [100, 300],
          interval: [2000, 4000]
        };
      case 'medium':
      default:
        return {
          chance: 0.03,
          duration: [50, 200],
          interval: [3000, 7000]
        };
    }
  };
  
  const intensityParams = getIntensityParams();
  
  // Random glitch effect triggered at intervals
  useEffect(() => {
    const triggerGlitch = () => {
      // Random chance to trigger the glitch
      if (Math.random() < intensityParams.chance || isGlitching) {
        setIsGlitching(true);
        
        // Reset glitch after random duration
        const duration = Math.random() * 
          (intensityParams.duration[1] - intensityParams.duration[0]) + 
          intensityParams.duration[0];
          
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setIsGlitching(false);
        }, duration);
      }
      
      // Schedule next potential glitch
      const nextInterval = Math.random() * 
        (intensityParams.interval[1] - intensityParams.interval[0]) + 
        intensityParams.interval[0];
        
      timeoutRef.current = setTimeout(triggerGlitch, nextInterval);
    };
    
    // Start the glitch cycle
    triggerGlitch();
    
    // Cleanup on unmount
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [intensity]);
  
  // Trigger glitch on hover
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsGlitching(true);
  };
  
  const handleMouseLeave = () => {
    // Keep glitching for a short time after mouse leaves
    timeoutRef.current = setTimeout(() => {
      setIsGlitching(false);
    }, 500);
  };
  
  return (
    <div 
      ref={textRef}
      className={`${className} ${isGlitching ? 'glitch-ktl' : ''}`}
      data-text={children}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

GlitchText.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  intensity: PropTypes.oneOf(['low', 'medium', 'high'])
};

GlitchText.defaultProps = {
  className: '',
  intensity: 'medium'
};

export default GlitchText;