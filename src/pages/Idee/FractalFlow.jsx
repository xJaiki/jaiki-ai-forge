import React, { useState, useEffect, useRef } from 'react';

const FractalFlow = () => {
  // State for expandable navigation branches
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    about: false,
    projects: false,
    skills: false,
    contact: false
  });
  
  // State for section animations
  const sectionRefs = {
    about: useRef(null),
    projects: useRef(null),
    skills: useRef(null),
    contact: useRef(null)
  };
  
  // Toggle menu sections
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };
  
  // Intersection observer for animations when scrolling
  useEffect(() => {
    const options = { threshold: 0.1 };
    const observers = {};
    
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        observers[key] = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
            }
          });
        }, options);
        
        observers[key].observe(ref.current);
      }
    });
    
    return () => {
      Object.values(observers).forEach(observer => observer.disconnect());
    };
  }, []);
  
  return (
    <div className="fractal-flow">
      {/* Mobile menu toggle */}
      <div className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      {/* Fractal Navigation Sidebar */}
      <nav className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="profile-container">
          <HexagonalProfile />
          <h2>Jaiki</h2>
          <p>Building recursive solutions</p>
        </div>
        
        <ul className="fractal-nav">
          <li className={expandedSections.about ? 'expanded' : ''}>
            <button onClick={() => toggleSection('about')}>
              <FractalBranch />
              <span>About</span>
            </button>
            <ul className="sub-menu">
              <li><a href="#background">Background</a></li>
              <li><a href="#philosophy">Philosophy</a></li>
            </ul>
          </li>
          
          <li className={expandedSections.projects ? 'expanded' : ''}>
            <button onClick={() => toggleSection('projects')}>
              <FractalBranch />
              <span>Projects</span>
            </button>
            <ul className="sub-menu">
              <li><a href="#fractal-cms">Fractal CMS</a></li>
              <li><a href="#infinite-loop">Infinite Loop</a></li>
            </ul>
          </li>
          
          <li className={expandedSections.skills ? 'expanded' : ''}>
            <button onClick={() => toggleSection('skills')}>
              <FractalBranch />
              <span>Skills</span>
            </button>
            <ul className="sub-menu">
              <li><a href="#frontend">Frontend</a></li>
              <li><a href="#backend">Backend</a></li>
              <li><a href="#design">Design</a></li>
            </ul>
          </li>
          
          <li className={expandedSections.contact ? 'expanded' : ''}>
            <button onClick={() => toggleSection('contact')}>
              <FractalBranch />
              <span>Contact</span>
            </button>
            <ul className="sub-menu">
              <li><a href="#email">Email</a></li>
              <li><a href="#social">Social</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      
      {/* Main Content Area */}
      <main className="main-content">
        <section id="hero" className="hero-section">
          <h1>Jaiki</h1>
          <p className="tagline">Building recursive solutions that scale infinitely</p>
          <div className="fractal-pattern-hero">
            <FractalPattern complexity={3} color="#2DD4BF" />
          </div>
        </section>
        
        <FractalDivider />
        
        <section id="about" ref={sectionRefs.about} className="content-section">
          <h2>About</h2>
          <div className="section-content">
            <p>Passionate developer focused on creating elegant, scalable solutions inspired by nature's recursive patterns.</p>
            <div className="about-fractal">
              <FractalPattern complexity={2} color="#F87171" />
            </div>
          </div>
        </section>
        
        <FractalDivider />
        
        <section id="projects" ref={sectionRefs.projects} className="content-section">
          <h2>Projects</h2>
          <div className="project-cards">
            <div className="project-card">
              <h3>Fractal CMS</h3>
              <p>A content management system with infinitely nestable components.</p>
              <div className="project-fractal">
                <FractalPattern complexity={1} color="#1E3A8A" />
              </div>
            </div>
            
            <div className="project-card">
              <h3>Infinite Loop</h3>
              <p>A recursive algorithm visualization tool for educational purposes.</p>
              <div className="project-fractal">
                <FractalPattern complexity={1} color="#2DD4BF" />
              </div>
            </div>
          </div>
        </section>
        
        <FractalDivider />
        
        <section id="skills" ref={sectionRefs.skills} className="content-section">
          <h2>Skills</h2>
          <div className="skills-container">
            <div className="skill-category">
              <h3>Frontend</h3>
              <ul>
                <li>React</li>
                <li>Vue</li>
                <li>CSS/SCSS</li>
              </ul>
            </div>
            
            <div className="skill-category">
              <h3>Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Python</li>
                <li>GraphQL</li>
              </ul>
            </div>
            
            <div className="skill-category">
              <h3>Design</h3>
              <ul>
                <li>Figma</li>
                <li>SVG Animation</li>
                <li>Creative Coding</li>
              </ul>
            </div>
          </div>
        </section>
        
        <FractalDivider />
        
        <section id="contact" ref={sectionRefs.contact} className="content-section">
          <h2>Contact</h2>
          <div className="contact-info">
            <p>Get in touch to discuss how we can build recursive solutions together.</p>
            <a href="mailto:hello@jaiki.dev" className="contact-button">
              Say Hello
            </a>
          </div>
        </section>
      </main>
      
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        
        /* Base variables and styles */
        :root {
          --off-white: #F5F5F5;
          --teal: #2DD4BF;
          --coral: #F87171;
          --navy: #1E3A8A;
          --black: #000000;
          --sidebar-width: 200px;
          --gutter: 25px;
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'Poppins', sans-serif;
          background-color: var(--off-white);
          color: var(--black);
          line-height: 1.6;
          overflow-x: hidden;
        }
        
        /* Layout */
        .fractal-flow {
          display: flex;
        }
        
        /* Sidebar */
        .sidebar {
          position: fixed;
          width: var(--sidebar-width);
          height: 100vh;
          left: 0;
          top: 0;
          background-color: white;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
          padding: 2rem 1rem;
          overflow-y: auto;
          transition: transform 0.6s ease;
          z-index: 100;
        }
        
        .profile-container {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        /* Navigation */
        .fractal-nav {
          list-style: none;
        }
        
        .fractal-nav li {
          margin-bottom: 1rem;
        }
        
        .fractal-nav button {
          display: flex;
          align-items: center;
          border: none;
          background: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
          padding: 0.5rem;
          font-family: 'Poppins', sans-serif;
          font-size: 16px;
          color: var(--black);
          transition: all 0.4s ease;
        }
        
        .fractal-nav button:hover {
          color: var(--teal);
        }
        
        .fractal-branch {
          transition: transform 0.6s ease;
        }
        
        .fractal-nav li.expanded .fractal-branch {
          transform: rotate(90deg);
        }
        
        .sub-menu {
          list-style: none;
          margin-left: 2rem;
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.6s ease;
        }
        
        .fractal-nav li.expanded .sub-menu {
          max-height: 200px;
        }
        
        /* Main content */
        .main-content {
          flex: 1;
          margin-left: var(--sidebar-width);
          padding: 2rem var(--gutter);
        }
        
        /* Sections */
        .content-section {
          padding: 4rem 0;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .content-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        h1, h2, h3 {
          font-weight: 600;
        }
        
        h1 {
          font-size: 30px;
          margin-bottom: 1rem;
          color: var(--navy);
        }
        
        h2 {
          font-size: 24px;
          margin-bottom: 2rem;
          color: var(--navy);
          position: relative;
          display: inline-block;
        }
        
        h2::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: var(--teal);
        }
        
        /* Project cards */
        .project-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--gutter);
        }
        
        .project-card {
          background-color: white;
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          position: relative;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        /* Skills */
        .skills-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: var(--gutter);
        }
        
        /* Contact section */
        .contact-button {
          display: inline-block;
          background-color: var(--teal);
          color: white;
          text-decoration: none;
          padding: 0.8rem 2rem;
          border-radius: 30px;
          font-weight: 600;
          transition: background-color 0.4s ease, transform 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        
        .contact-button:hover {
          background-color: var(--navy);
          transform: translateY(-2px);
        }
        
        .contact-button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.4s ease, height 0.4s ease;
        }
        
        .contact-button:hover::after {
          width: 200px;
          height: 200px;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: block;
          }
          
          .sidebar {
            transform: translateX(-100%);
          }
          
          .sidebar.open {
            transform: translateX(0);
          }
          
          .main-content {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Hexagonal Profile component with recursive border
const HexagonalProfile = () => {
  return (
    <div className="hexagonal-profile">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="img" patternUnits="userSpaceOnUse" width="200" height="200">
            <image href="https://via.placeholder.com/200" x="0" y="0" width="200" height="200" />
          </pattern>
          <pattern id="recursiveBorder" patternUnits="userSpaceOnUse" width="10" height="10">
            <path d="M0,5 L5,10 L10,5 L5,0 Z" fill="#2DD4BF" />
          </pattern>
        </defs>
        <path d="M100,0 L200,50 L200,150 L100,200 L0,150 L0,50 Z" fill="url(#img)" />
        <path d="M100,5 L195,53 L195,147 L100,195 L5,147 L5,53 Z" fill="none" stroke="url(#recursiveBorder)" strokeWidth="5" />
      </svg>
      <style jsx>{`
        .hexagonal-profile {
          width: 180px;
          height: 180px;
          margin: 0 auto 1rem;
        }
      `}</style>
    </div>
  );
};

// Fractal Branch component for navigation
const FractalBranch = () => {
  return (
    <svg className="fractal-branch" width="30" height="30" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M25,10 L40,20 L40,40 L25,50 L10,40 L10,20 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M25,20 L32.5,25 L32.5,35 L25,40 L17.5,35 L17.5,25 Z" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M25,25 L28.75,27.5 L28.75,32.5 L25,35 L21.25,32.5 L21.25,27.5 Z" fill="currentColor" />
    </svg>
  );
};

// Fractal Divider component
const FractalDivider = () => {
  return (
    <div className="fractal-divider">
      <svg width="100%" height="50" viewBox="0 0 1000 50" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,25 Q250,0 500,25 T1000,25" fill="none" stroke="#2DD4BF" strokeWidth="2" />
        <path d="M0,25 Q250,50 500,25 T1000,25" fill="none" stroke="#F87171" strokeWidth="2" />
        <g className="fractal-nodes">
          {[...Array(20)].map((_, i) => (
            <circle 
              key={i} 
              cx={(i + 1) * 50} 
              cy={25 + Math.sin(i * 0.5) * 15} 
              r="3" 
              fill={i % 2 === 0 ? "#2DD4BF" : "#F87171"} 
            />
          ))}
        </g>
      </svg>
      <style jsx>{`
        .fractal-divider {
          margin: 2rem 0;
        }
      `}</style>
    </div>
  );
};

// Recursive Fractal Pattern component
const FractalPattern = ({ complexity = 1, color = "#2DD4BF" }) => {
  // Generate a recursive fractal SVG pattern
  const generateFractalPath = (level, startX, startY, size) => {
    if (level <= 0) return null;
    
    const paths = [];
    
    // Base hexagon
    const hexPath = `M${startX},${startY-size} 
                    L${startX+size*0.866},${startY-size*0.5} 
                    L${startX+size*0.866},${startY+size*0.5} 
                    L${startX},${startY+size} 
                    L${startX-size*0.866},${startY+size*0.5} 
                    L${startX-size*0.866},${startY-size*0.5} Z`;
    
    paths.push(<path key={`level-${level}-base`} d={hexPath} fill="none" stroke={color} strokeWidth={3/level} />);
    
    // Recursive smaller hexagons
    if (level > 1) {
      const newSize = size * 0.5;
      
      // Top
      paths.push(generateFractalPath(level - 1, startX, startY - newSize * 1.5, newSize));
      // Top right
      paths.push(generateFractalPath(level - 1, startX + newSize * 1.3, startY - newSize * 0.75, newSize));
      // Bottom right
      paths.push(generateFractalPath(level - 1, startX + newSize * 1.3, startY + newSize * 0.75, newSize));
      // Bottom
      paths.push(generateFractalPath(level - 1, startX, startY + newSize * 1.5, newSize));
      // Bottom left
      paths.push(generateFractalPath(level - 1, startX - newSize * 1.3, startY + newSize * 0.75, newSize));
      // Top left
      paths.push(generateFractalPath(level - 1, startX - newSize * 1.3, startY - newSize * 0.75, newSize));
    }
    
    return <g key={`level-${level}`}>{paths}</g>;
  };
  
  return (
    <svg className="fractal-pattern" viewBox="-100 -100 200 200" xmlns="http://www.w3.org/2000/svg">
      {generateFractalPath(complexity, 0, 0, 50)}
      <style jsx>{`
        .fractal-pattern {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </svg>
  );
};

export default FractalFlow;