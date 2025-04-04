import React, { useRef, useEffect } from 'react';

const MaterialTextureGenerator = ({ material, width, height }) => {
  const canvasRef = useRef(null);
  
  // Generate different textures based on material type
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = width || 300;
    canvas.height = height || 300;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    switch(material) {
      case 'paper':
        generatePaperTexture(ctx, canvas.width, canvas.height);
        break;
      case 'metal':
        generateMetalTexture(ctx, canvas.width, canvas.height);
        break;
      case 'glass':
        generateGlassTexture(ctx, canvas.width, canvas.height);
        break;
      case 'wood':
        generateWoodTexture(ctx, canvas.width, canvas.height);
        break;
      case 'fabric':
        generateFabricTexture(ctx, canvas.width, canvas.height);
        break;
      default:
        // Default subtle texture
        generateSubtleTexture(ctx, canvas.width, canvas.height);
    }
  }, [material, width, height]);
  
  // Paper texture generation
  const generatePaperTexture = (ctx, width, height) => {
    // Base color
    ctx.fillStyle = '#F2F0E6';
    ctx.fillRect(0, 0, width, height);
    
    // Add subtle noise
    for (let x = 0; x < width; x += 2) {
      for (let y = 0; y < height; y += 2) {
        const value = Math.floor(Math.random() * 10);
        ctx.fillStyle = `rgba(0, 0, 0, 0.0${value})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
    
    // Add some fiber lines
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * width;
      const length = Math.random() * 20 + 5;
      const angle = Math.random() * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + Math.cos(angle) * length, Math.sin(angle) * length);
      ctx.stroke();
    }
  };
  
  // Metal texture generation
  const generateMetalTexture = (ctx, width, height) => {
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#E6E6F0');
    gradient.addColorStop(0.5, '#D9D9E3');
    gradient.addColorStop(1, '#CDCDD7');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add brushed metal effect - horizontal lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    for (let y = 0; y < height; y += 4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Add some reflection highlights
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.ellipse(width * 0.3, height * 0.3, width * 0.4, height * 0.2, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
  };
  
  // Glass texture generation
  const generateGlassTexture = (ctx, width, height) => {
    // Transparent base
    ctx.fillStyle = 'rgba(245, 251, 255, 0.2)';
    ctx.fillRect(0, 0, width, height);
    
    // Add subtle frosting
    for (let x = 0; x < width; x += 3) {
      for (let y = 0; y < height; y += 3) {
        const value = Math.floor(Math.random() * 5);
        ctx.fillStyle = `rgba(255, 255, 255, 0.0${value})`;
        ctx.fillRect(x, y, 3, 3);
      }
    }
    
    // Add highlight at the top
    const gradientTop = ctx.createLinearGradient(0, 0, 0, height * 0.3);
    gradientTop.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    gradientTop.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradientTop;
    ctx.fillRect(0, 0, width, height * 0.3);
    
    // Add diagonal reflection
    const gradientReflection = ctx.createLinearGradient(0, 0, width, height);
    gradientReflection.addColorStop(0.4, 'rgba(255, 255, 255, 0)');
    gradientReflection.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
    gradientReflection.addColorStop(0.6, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradientReflection;
    ctx.fillRect(0, 0, width, height);
  };
  
  // Wood texture generation
  const generateWoodTexture = (ctx, width, height) => {
    // Base color
    const baseGradient = ctx.createLinearGradient(0, 0, width, 0);
    baseGradient.addColorStop(0, '#A87B59');
    baseGradient.addColorStop(1, '#D8B897');
    
    ctx.fillStyle = baseGradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add wood grain
    for (let y = 0; y < height; y += Math.floor(Math.random() * 20) + 10) {
      const lineHeight = Math.floor(Math.random() * 4) + 2;
      const opacity = Math.random() * 0.06 + 0.02;
      
      ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
      ctx.fillRect(0, y, width, lineHeight);
      
      // Add grain curves
      const curvePoints = Math.floor(Math.random() * 3) + 2;
      ctx.beginPath();
      ctx.moveTo(0, y + lineHeight / 2);
      
      for (let i = 1; i <= curvePoints; i++) {
        const x = width * (i / curvePoints);
        const yOffset = Math.random() * 10 - 5;
        ctx.lineTo(x, y + lineHeight / 2 + yOffset);
      }
      
      ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 1.5})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    // Add some knots
    const knotCount = Math.floor(Math.random() * 2) + 1;
    
    for (let i = 0; i < knotCount; i++) {
      const knotX = Math.random() * width * 0.8 + width * 0.1;
      const knotY = Math.random() * height * 0.8 + height * 0.1;
      const knotSize = Math.random() * 15 + 5;
      
      const knotGradient = ctx.createRadialGradient(
        knotX, knotY, 0,
        knotX, knotY, knotSize
      );
      
      knotGradient.addColorStop(0, '#8C6141');
      knotGradient.addColorStop(0.6, '#A87B59');
      knotGradient.addColorStop(1, '#A87B59');
      
      ctx.fillStyle = knotGradient;
      ctx.beginPath();
      ctx.ellipse(knotX, knotY, knotSize, knotSize * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Add knot rings
      for (let j = 0; j < 3; j++) {
        const ringSize = knotSize * (0.7 - j * 0.15);
        ctx.beginPath();
        ctx.ellipse(knotX, knotY, ringSize, ringSize * 0.8, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(60, 30, 0, 0.1)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  };
  
  // Fabric texture generation
  const generateFabricTexture = (ctx, width, height) => {
    // Base color
    ctx.fillStyle = '#3A5199';
    ctx.fillRect(0, 0, width, height);
    
    // Create weave pattern
    const weaveSize = 4;
    
    for (let x = 0; x < width; x += weaveSize * 2) {
      for (let y = 0; y < height; y += weaveSize * 2) {
        // First set of weave
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(x, y, weaveSize, weaveSize);
        ctx.fillRect(x + weaveSize, y + weaveSize, weaveSize, weaveSize);
        
        // Second set of weave (slightly darker)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(x + weaveSize, y, weaveSize, weaveSize);
        ctx.fillRect(x, y + weaveSize, weaveSize, weaveSize);
      }
    }
    
    // Add some subtle noise
    for (let x = 0; x < width; x += 2) {
      for (let y = 0; y < height; y += 2) {
        if (Math.random() > 0.97) {
          const value = Math.random() * 0.08;
          ctx.fillStyle = `rgba(255, 255, 255, ${value})`;
          ctx.fillRect(x, y, 2, 2);
        }
      }
    }
  };
  
  // Generic subtle texture
  const generateSubtleTexture = (ctx, width, height) => {
    ctx.fillStyle = '#f8f8f8';
    ctx.fillRect(0, 0, width, height);
    
    for (let x = 0; x < width; x += 4) {
      for (let y = 0; y < height; y += 4) {
        if (Math.random() > 0.75) {
          const value = Math.random() * 0.03;
          ctx.fillStyle = `rgba(0, 0, 0, ${value})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  };
  
  return (
    <canvas 
      ref={canvasRef} 
      className="material-texture" 
      style={{ display: 'none' }}
    />
  );
};

export default MaterialTextureGenerator;