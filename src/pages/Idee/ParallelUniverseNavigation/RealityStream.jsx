import React, { useRef, useEffect } from 'react';
import './ParallelUniverseNavigation.css';

const RealityStream = ({ 
  reality, 
  content, 
  dimensionalState, 
  mousePosition, 
  onFocus,
  isFocusLocked
}) => {
  const streamRef = useRef(null);
  
  // Calculate parallax effect based on mouse position and dimensional state
  useEffect(() => {
    if (!streamRef.current) return;
    
    const { blendPercentage } = dimensionalState;
    const intensity = blendPercentage / 100;
    
    // Calculate transform based on mouse position and intensity
    const moveX = (mousePosition.x - 0.5) * 20 * intensity;
    const moveY = (mousePosition.y - 0.5) * 10 * intensity;
    const rotate = ((mousePosition.x - 0.5) * 3 * intensity).toFixed(2);
    
    // Apply transform to create parallax effect
    streamRef.current.style.transform = `
      translate3d(${moveX}px, ${moveY}px, 0) 
      rotateY(${rotate}deg)
    `;
  }, [mousePosition, dimensionalState]);
  
  const { isActive, blendPercentage, isLocked } = dimensionalState;
  
  // Dynamic styles based on dimensionalState
  const streamStyle = {
    '--reality-primary-color': reality.color,
    '--reality-secondary-color': reality.secondaryColor,
    '--reality-font': reality.font,
    '--blend-percentage': `${blendPercentage}%`,
    '--opacity': blendPercentage / 100,
    '--scale': 0.8 + (blendPercentage / 500),
    zIndex: isActive ? 10 : 5
  };
  
  const getContentElement = () => {
    switch(reality.id) {
      case 'technical':
        return (
          <div className="pun-reality-content-technical">
            <h3 className="pun-reality-title">{content.title}</h3>
            <h4 className="pun-reality-subtitle">{content.subtitle}</h4>
            
            <div className="pun-bio-section">
              <p>{content.bio}</p>
            </div>
            
            <div className="pun-projects-section">
              <h4>Projects</h4>
              <ul className="pun-project-list">
                {content.projects.map(project => (
                  <li key={project.id} className="pun-project-item">
                    <h5>{project.title}</h5>
                    <p>{project.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pun-skills-section">
              <h4>Technical Skills</h4>
              <div className="pun-skills-grid">
                {content.skills.map(skill => (
                  <div key={skill} className="pun-skill-item">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'creative':
        return (
          <div className="pun-reality-content-creative">
            <h3 className="pun-reality-title">{content.title}</h3>
            <h4 className="pun-reality-subtitle">{content.subtitle}</h4>
            
            <div className="pun-bio-section">
              <p>{content.bio}</p>
            </div>
            
            <div className="pun-creative-projects">
              {content.projects.map(project => (
                <div key={project.id} className="pun-creative-project">
                  <div className="pun-project-visual">
                    <div className="pun-project-visual-placeholder"></div>
                  </div>
                  <h5>{project.title}</h5>
                  <p>{project.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="pun-creative-skills">
              <h4>Creative Expertise</h4>
              <div className="pun-skills-flow">
                {content.skills.map(skill => (
                  <span key={skill} className="pun-creative-skill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'personal':
        return (
          <div className="pun-reality-content-personal">
            <h3 className="pun-reality-title">{content.title}</h3>
            <h4 className="pun-reality-subtitle">{content.subtitle}</h4>
            
            <div className="pun-bio-section">
              <p>{content.bio}</p>
            </div>
            
            <div className="pun-interests-section">
              <h4>Interests & Passions</h4>
              <div className="pun-interests-cloud">
                {content.interests.map(interest => (
                  <div key={interest} className="pun-interest-bubble">
                    {interest}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pun-timeline-section">
              <h4>Timeline</h4>
              <div className="pun-timeline">
                {content.timeline.map(item => (
                  <div key={item.year} className="pun-timeline-item">
                    <div className="pun-timeline-year">{item.year}</div>
                    <div className="pun-timeline-event">{item.event}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'conceptual':
        return (
          <div className="pun-reality-content-conceptual">
            <h3 className="pun-reality-title">{content.title}</h3>
            <h4 className="pun-reality-subtitle">{content.subtitle}</h4>
            
            <div className="pun-bio-section">
              <p>{content.bio}</p>
            </div>
            
            <div className="pun-concepts-section">
              <h4>Core Concepts</h4>
              {content.concepts.map(concept => (
                <div key={concept.title} className="pun-concept-card">
                  <h5>{concept.title}</h5>
                  <p>{concept.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="pun-quotes-section">
              <h4>Philosophical Snippets</h4>
              <div className="pun-quotes-container">
                {content.quotes.map((quote, index) => (
                  <blockquote key={index} className="pun-quote">
                    "{quote}"
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Content not available in this reality</div>;
    }
  };
  
  return (
    <div 
      ref={streamRef}
      className={`pun-reality-stream pun-reality-${reality.id} ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}`}
      style={streamStyle}
      onClick={onFocus}
    >
      <div className="pun-stream-background">
        <div className="pun-dimensional-boundary"></div>
      </div>
      
      <div className="pun-stream-content">
        {getContentElement()}
      </div>
      
      {/* Dimensional boundary indicators */}
      <div className="pun-dimensional-indicator"></div>
      
      {/* Pull handle for dragging content between realities */}
      <div className="pun-reality-pull-handle">
        <div className="pun-pull-handle-icon"></div>
      </div>
      
      {/* Focus lock indicator */}
      {isActive && (
        <div className="pun-focus-indicator">
          <div className={`pun-focus-lock-icon ${isLocked ? 'locked' : ''}`}></div>
        </div>
      )}
    </div>
  );
};

export default RealityStream;