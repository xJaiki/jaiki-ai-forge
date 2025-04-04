import React, { useState } from 'react';
import TactileMaterialLayers from './TactileMaterialLayers';
import MaterialTextureGenerator from './MaterialTextureGenerator';

const TactileMaterialDemo = () => {
  const [materialToPreload, setMaterialToPreload] = useState([
    'paper', 'metal', 'glass', 'wood', 'fabric'
  ]);
  
  return (
    <div className="tactile-material-demo">
      {/* Preload textures */}
      {materialToPreload.map(material => (
        <MaterialTextureGenerator 
          key={material}
          material={material}
          width={512}
          height={512}
        />
      ))}
      
      {/* Main Component */}
      <TactileMaterialLayers />
      
      {/* Optional controls and instructions overlay */}
      <div className="demo-instructions">
        <div className="instructions-card">
          <h3>Exploring Tactile Materials</h3>
          <p>Hover over different materials to experience their unique textures and behaviors.</p>
          <ul>
            <li>Paper: Biographical information with subtle edge curling</li>
            <li>Metal: Technical skills with brushed aluminum effect</li>
            <li>Glass: Project showcase with reflections and transparency</li>
            <li>Wood: Navigation elements with natural grain</li>
            <li>Fabric: Contact information on textured fabric</li>
          </ul>
          <button onClick={() => document.querySelector('.demo-instructions').style.display = 'none'}>
            Begin Exploring
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .tactile-material-demo {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
        
        .demo-instructions {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.7);
          z-index: 2000;
          backdrop-filter: blur(5px);
        }
        
        .instructions-card {
          background: #F2F0E6;
          padding: 2rem;
          border-radius: 8px;
          max-width: 500px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          font-family: 'Alegreya', serif;
          position: relative;
        }
        
        .instructions-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-opacity='0.05'%3E%3Cpath d='M0 0h100v100H0z'/%3E%3Cpath fill='%23000' d='M0 0h100v2H0zM0 4h100v2H0zM0 8h100v2H0zM0 12h100v2H0zM0 16h100v2H0zM0 20h100v2H0zM0 24h100v2H0zM0 28h100v2H0zM0 32h100v2H0zM0 36h100v2H0zM0 40h100v2H0zM0 44h100v2H0zM0 48h100v2H0zM0 52h100v2H0zM0 56h100v2H0zM0 60h100v2H0zM0 64h100v2H0zM0 68h100v2H0zM0 72h100v2H0zM0 76h100v2H0zM0 80h100v2H0zM0 84h100v2H0zM0 88h100v2H0zM0 92h100v2H0zM0 96h100v2H0z'/%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.05;
          pointer-events: none;
          border-radius: 8px;
        }
        
        .instructions-card h3 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: #3A5199;
        }
        
        .instructions-card p {
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }
        
        .instructions-card ul {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        
        .instructions-card li {
          margin-bottom: 0.5rem;
        }
        
        .instructions-card button {
          background: #D14C3A;
          border: none;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
          font-family: 'Alegreya', serif;
          font-size: 1rem;
          transition: background 0.3s ease;
        }
        
        .instructions-card button:hover {
          background: #B13C2A;
        }
      `}</style>
    </div>
  );
};

export default TactileMaterialDemo;