import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import PropTypes from 'prop-types';

// Component for displaying floating code snippets with syntax highlighting
const FloatingCodeSnippet = ({ children, language, position }) => {
  const snippetRef = useRef(null);
  
  // Set initial position and apply float animation
  useEffect(() => {
    const snippet = snippetRef.current;
    
    if (snippet) {
      // Apply position
      gsap.set(snippet, {
        x: `${position.x}vw`,
        y: `${position.y}vh`,
        opacity: 0,
        scale: 0.8
      });
      
      // Fade in animation
      gsap.to(snippet, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        delay: Math.random() * 0.5
      });
      
      // Create floating animation
      gsap.to(snippet, {
        y: `+=${Math.random() * 20 - 10}`,
        x: `+=${Math.random() * 10 - 5}`,
        rotation: Math.random() * 2 - 1,
        duration: 5 + Math.random() * 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    }
    
    return () => {
      gsap.killTweensOf(snippet);
    };
  }, [position]);
  
  // Apply syntax highlighting class based on language
  const getLanguageClass = () => {
    return `language-${language || 'javascript'}`;
  };
  
  return (
    <pre ref={snippetRef} className={`code-snippet-ktl floating-element-ktl ${getLanguageClass()}`}>
      {children}
    </pre>
  );
};

FloatingCodeSnippet.propTypes = {
  children: PropTypes.string.isRequired,
  language: PropTypes.string,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  })
};

FloatingCodeSnippet.defaultProps = {
  language: 'javascript',
  position: { x: 0, y: 0 }
};

export default FloatingCodeSnippet;