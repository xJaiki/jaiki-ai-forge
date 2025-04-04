import React, { useState } from 'react';
import './ParallelUniverseNavigation.css';

const RealityMap = ({
  realities,
  blendState,
  focusedReality,
  bookmarks,
  onRealitySelect,
  onBookmarkLoad
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState('map'); // 'map' or 'bookmarks'
  
  // Toggle the map panel open/closed
  const toggleMap = () => {
    setIsOpen(!isOpen);
  };
  
  // Switch between tabs
  const switchTab = (newTab) => {
    setTab(newTab);
  };
  
  // Calculate connection opacity between realities based on blend states
  const getConnectionStrength = (reality1, reality2) => {
    const blend1 = blendState[reality1];
    const blend2 = blendState[reality2];
    
    // If both realities have high blend percentages, strengthen their connection
    return Math.min(blend1, blend2) / 100;
  };
  
  return (
    <div className={`pun-reality-map ${isOpen ? 'open' : 'closed'}`}>
      <button 
        className="pun-map-toggle" 
        onClick={toggleMap}
        title={isOpen ? "Close Reality Map" : "Open Reality Map"}
      >
        <div className="pun-map-icon"></div>
        <span className="pun-map-label">Reality Map</span>
      </button>
      
      <div className="pun-map-content">
        <div className="pun-map-tabs">
          <button 
            className={`pun-tab ${tab === 'map' ? 'active' : ''}`}
            onClick={() => switchTab('map')}
          >
            Dimensional Map
          </button>
          <button 
            className={`pun-tab ${tab === 'bookmarks' ? 'active' : ''}`}
            onClick={() => switchTab('bookmarks')}
          >
            Saved States ({bookmarks.length})
          </button>
        </div>
        
        {tab === 'map' && (
          <div className="pun-dimensional-map">
            <h4>Active Dimensions</h4>
            <div className="pun-reality-nodes">
              {realities.map((reality, index) => {
                // Calculate position for each reality node in a circle
                const angle = (index / realities.length) * Math.PI * 2;
                const radius = 100;
                const x = 140 + Math.cos(angle) * radius;
                const y = 140 + Math.sin(angle) * radius;
                
                const isActive = focusedReality === index;
                const blendLevel = blendState[reality.id];
                
                return (
                  <div 
                    key={reality.id}
                    className={`pun-reality-node ${isActive ? 'active' : ''}`}
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      backgroundColor: reality.color,
                      opacity: blendLevel / 100,
                      transform: `scale(${0.6 + (blendLevel / 250)})`
                    }}
                    onClick={() => onRealitySelect(index)}
                  >
                    <span className="pun-node-label" style={{ fontFamily: reality.font }}>
                      {reality.name}
                    </span>
                  </div>
                );
              })}
              
              {/* Draw connections between realities */}
              <svg className="pun-reality-connections" width="280" height="280" xmlns="http://www.w3.org/2000/svg">
                {realities.map((reality1, i) => (
                  realities.slice(i + 1).map((reality2, j) => {
                    const angle1 = (i / realities.length) * Math.PI * 2;
                    const angle2 = ((j + i + 1) / realities.length) * Math.PI * 2;
                    const radius = 100;
                    
                    const x1 = 140 + Math.cos(angle1) * radius;
                    const y1 = 140 + Math.sin(angle1) * radius;
                    const x2 = 140 + Math.cos(angle2) * radius;
                    const y2 = 140 + Math.sin(angle2) * radius;
                    
                    const connectionStrength = getConnectionStrength(reality1.id, reality2.id);
                    
                    return (
                      <line
                        key={`${reality1.id}-${reality2.id}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={`url(#gradient-${reality1.id}-${reality2.id})`}
                        strokeWidth={2 + (connectionStrength * 3)}
                        opacity={connectionStrength}
                      />
                    );
                  })
                ))}
                
                {/* Gradients for connections */}
                <defs>
                  {realities.map((reality1, i) => (
                    realities.slice(i + 1).map((reality2, j) => (
                      <linearGradient
                        key={`gradient-${reality1.id}-${reality2.id}`}
                        id={`gradient-${reality1.id}-${reality2.id}`}
                        x1="0%" y1="0%" x2="100%" y2="100%"
                      >
                        <stop offset="0%" stopColor={reality1.color} />
                        <stop offset="100%" stopColor={reality2.color} />
                      </linearGradient>
                    ))
                  ))}
                </defs>
              </svg>
              
              {/* Central hub */}
              <div className="pun-central-node"></div>
            </div>
            
            <div className="pun-map-legend">
              <div className="pun-legend-title">Dimensional Strength</div>
              {realities.map(reality => (
                <div key={reality.id} className="pun-legend-item">
                  <div 
                    className="pun-legend-color" 
                    style={{ backgroundColor: reality.color }}
                  ></div>
                  <div className="pun-legend-label">{reality.name}</div>
                  <div className="pun-legend-value">{Math.round(blendState[reality.id])}%</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {tab === 'bookmarks' && (
          <div className="pun-bookmarks-panel">
            <h4>Saved Configurations</h4>
            
            {bookmarks.length === 0 ? (
              <div className="pun-no-bookmarks">
                No saved configurations yet. Use the bookmark button in the Dimension Controller to save the current state.
              </div>
            ) : (
              <div className="pun-bookmark-list">
                {bookmarks.map(bookmark => {
                  // Get the dominant reality in this bookmark
                  const dominantRealityId = Object.entries(bookmark.blendState)
                    .reduce((max, [id, val]) => val > max.val ? {id, val} : max, {id: '', val: 0})
                    .id;
                  
                  const dominantReality = realities.find(r => r.id === dominantRealityId);
                  
                  return (
                    <div 
                      key={bookmark.id} 
                      className="pun-bookmark-item"
                      style={{
                        borderColor: dominantReality?.color
                      }}
                      onClick={() => onBookmarkLoad(bookmark)}
                    >
                      <div className="pun-bookmark-name">{bookmark.name}</div>
                      <div className="pun-bookmark-preview">
                        {realities.map(reality => (
                          <div 
                            key={reality.id}
                            className="pun-bookmark-reality-indicator"
                            style={{
                              backgroundColor: reality.color,
                              width: `${bookmark.blendState[reality.id]}%`
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RealityMap;