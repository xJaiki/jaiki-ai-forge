import React, { useState, useRef } from 'react';
import './ParallelUniverseNavigation.css';

const DimensionController = ({
  realities,
  focusedReality,
  blendState,
  focusLocked,
  onRealityShift,
  onBlendChange,
  onFocusLockToggle,
  onBookmark
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedReality, setDraggedReality] = useState(null);
  const sliderRefs = useRef({});
  
  // Toggle expansion of the controller
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Handle reality shifting via direct selection
  const handleRealitySelect = (index) => {
    onRealityShift(index);
  };
  
  // Start dragging for reality blending
  const handleDragStart = (realityId, e) => {
    e.preventDefault();
    setIsDragging(true);
    setDraggedReality(realityId);
  };
  
  // Handle dragging of reality sliders
  const handleDrag = (e) => {
    if (!isDragging || !draggedReality) return;
    
    const sliderEl = sliderRefs.current[draggedReality];
    if (!sliderEl) return;
    
    const rect = sliderEl.getBoundingClientRect();
    const percentage = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    
    onBlendChange(draggedReality, percentage);
  };
  
  // End dragging
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedReality(null);
  };
  
  // Handle reality scrubbing (moving between realities with slider)
  const handleRealityScrub = (e) => {
    const scrubber = e.currentTarget;
    const rect = scrubber.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    
    // Calculate which reality to focus based on position
    const realityIndex = Math.min(
      realities.length - 1,
      Math.max(0, Math.floor(position * realities.length))
    );
    
    onRealityShift(realityIndex);
  };
  
  return (
    <div className={`pun-dimension-controller ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="pun-controller-toggle" onClick={toggleExpansion}>
        <div className="pun-controller-dots">
          {realities.map((reality, index) => (
            <div 
              key={reality.id}
              className={`pun-controller-dot ${focusedReality === index ? 'active' : ''}`}
              style={{ backgroundColor: reality.color }}
            ></div>
          ))}
        </div>
        <div className="pun-toggle-icon"></div>
      </div>
      
      <div className="pun-controller-expanded-view">
        <div className="pun-controller-header">
          <h3>Dimension Controller</h3>
          <div className="pun-controller-actions">
            <button 
              className={`pun-focus-lock-btn ${focusLocked ? 'active' : ''}`}
              onClick={onFocusLockToggle}
              title={focusLocked ? "Unlock Reality" : "Lock Current Reality"}
            >
              <span className="pun-lock-icon"></span>
            </button>
            
            <button 
              className="pun-bookmark-btn" 
              onClick={onBookmark}
              title="Bookmark Current Configuration"
            >
              <span className="pun-bookmark-icon"></span>
            </button>
          </div>
        </div>
        
        <div className="pun-reality-scrubber"
          onMouseDown={handleRealityScrub}
          onMouseMove={(e) => isDragging && handleRealityScrub(e)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          <div className="pun-scrubber-track">
            {realities.map((reality, index) => (
              <div 
                key={reality.id}
                className="pun-scrubber-section"
                style={{ 
                  backgroundColor: reality.color,
                  width: `${100 / realities.length}%`,
                  left: `${(index / realities.length) * 100}%`
                }}
              ></div>
            ))}
          </div>
          
          <div 
            className="pun-scrubber-handle"
            style={{ 
              left: `${(focusedReality / (realities.length - 1)) * 100}%`,
              backgroundColor: realities[focusedReality].color
            }}
          ></div>
        </div>
        
        <div className="pun-reality-blenders">
          {realities.map((reality) => (
            <div key={reality.id} className="pun-reality-blend-control">
              <div className="pun-blend-label">
                <span style={{ color: reality.color }}>{reality.name}</span>
                <span className="pun-blend-value">{Math.round(blendState[reality.id])}%</span>
              </div>
              
              <div 
                className="pun-blend-slider"
                ref={el => sliderRefs.current[reality.id] = el}
                onMouseDown={(e) => handleDragStart(reality.id, e)}
                onMouseMove={handleDrag}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
              >
                <div className="pun-blend-track" style={{ backgroundColor: `${reality.color}40` }}></div>
                <div 
                  className="pun-blend-fill" 
                  style={{ 
                    width: `${blendState[reality.id]}%`,
                    backgroundColor: reality.color 
                  }}
                ></div>
                <div 
                  className="pun-blend-handle"
                  style={{ 
                    left: `${blendState[reality.id]}%`,
                    backgroundColor: reality.color
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pun-reality-selector">
          {realities.map((reality, index) => (
            <button
              key={reality.id}
              className={`pun-reality-select-btn ${focusedReality === index ? 'active' : ''}`}
              style={{ 
                backgroundColor: focusedReality === index ? reality.color : `${reality.color}20`,
                fontFamily: reality.font.split(",")[0].replace(/'/g, '')
              }}
              onClick={() => handleRealitySelect(index)}
            >
              {reality.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DimensionController;