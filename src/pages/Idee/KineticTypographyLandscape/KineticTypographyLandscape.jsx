import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CommandTerminal from './CommandTerminal';
import FloatingCodeSnippet from './FloatingCodeSnippet';
import GlitchText from './GlitchText';
import './KineticTypographyLandscape.css';

const KineticTypographyLandscape = () => {
  const [currentSection, setCurrentSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const mainContainerRef = useRef(null);
  const headlineRef = useRef(null);
  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null)
  };
  
  // Mouse movement tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Animate elements based on mouse position
  useEffect(() => {
    if (headlineRef.current) {
      gsap.to(headlineRef.current, {
        rotateX: -mousePosition.y * 20,
        rotateY: mousePosition.x * 20,
        duration: 0.8,
        ease: "power2.out"
      });
    }
    
    // Animate floating text elements
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((el, index) => {
      const depth = 1 + (index % 3) * 0.5; // Different depths for parallax effect
      gsap.to(el, {
        x: mousePosition.x * 50 * depth,
        y: mousePosition.y * 50 * depth,
        rotateX: -mousePosition.y * 10 * depth,
        rotateY: mousePosition.x * 10 * depth,
        duration: 1,
        ease: "power2.out"
      });
    });
  }, [mousePosition]);
  
  // Initial animation sequence
  useEffect(() => {
    const timeline = gsap.timeline();
    
    // Initial load animation for headline
    timeline.from(headlineRef.current, {
      opacity: 0,
      y: 100,
      scale: 0.5,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)"
    });
    
    // Animate in the floating code snippets
    const snippets = document.querySelectorAll('.code-snippet');
    timeline.from(snippets, {
      opacity: 0,
      scale: 0,
      y: 200,
      stagger: 0.2,
      duration: 1,
      ease: "back.out(1.7)"
    }, "-=0.5");
    
    // After initial animation, start the typing effect in the about section
    timeline.call(() => setIsTypingComplete(true));
    
    return () => {
      timeline.kill();
    };
  }, []);
  
  // Handle section transitions
  const navigateToSection = (section) => {
    // First, animate current section out
    const timeline = gsap.timeline({
      onComplete: () => {
        setCurrentSection(section);
        // Animate new section in
        animateSectionIn(section);
      }
    });
    
    // Disassemble current section text
    const currentElements = sectionRefs[currentSection].current.querySelectorAll('h2, p, .floating-element');
    timeline.to(currentElements, {
      opacity: 0,
      y: 50,
      stagger: 0.05,
      duration: 0.5,
      ease: "power2.in"
    });
    
    timeline.to(currentElements, {
      scale: 0,
      stagger: 0.02,
      duration: 0.3
    });
  };
  
  const animateSectionIn = (section) => {
    // Add a slight delay to ensure state has updated
    setTimeout(() => {
      const elements = sectionRefs[section].current.querySelectorAll('h2, p, .floating-element, .project-card, .form-field');
      
      gsap.fromTo(elements, 
        { 
          opacity: 0, 
          y: 100, 
          scale: 0.8,
          rotationX: 90
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotationX: 0,
          stagger: 0.1, 
          duration: 0.8,
          ease: "back.out(1.7)"
        }
      );
      
      // If this is the about section, trigger the typing effect
      if (section === 'about') {
        const typingElements = sectionRefs.about.current.querySelectorAll('.typing-text');
        typingElements.forEach(el => {
          const text = el.getAttribute('data-text');
          el.textContent = '';
          
          let i = 0;
          const typeChar = () => {
            if (i < text.length) {
              el.textContent += text.charAt(i);
              i++;
              setTimeout(typeChar, 30 + Math.random() * 70);
            }
          };
          
          setTimeout(typeChar, 500);
        });
      }
    }, 100);
  };
  
  // Terminal commands data for skills section
  const skillCommands = [
    { name: 'react', level: 90, description: 'Building interactive UIs' },
    { name: 'node.js', level: 85, description: 'Server-side JavaScript runtime' },
    { name: 'typescript', level: 80, description: 'Static type definitions for JavaScript' },
    { name: 'graphql', level: 75, description: 'API query language' },
    { name: 'mongodb', level: 70, description: 'NoSQL database' }
  ];
  
  // Project data
  const projects = [
    { id: 1, title: 'Quantum Code', description: 'High-performance React component library with advanced animations', tags: ['React', 'TypeScript', 'CSS'] },
    { id: 2, title: 'Neural Navigator', description: 'AI-powered code completion and refactoring tool', tags: ['Python', 'TensorFlow', 'Node.js'] },
    { id: 3, title: 'Void Ventures', description: 'Interactive 3D portfolio for a digital agency', tags: ['Three.js', 'WebGL', 'GSAP'] }
  ];
  
  // Render function for hero section
  const renderHero = () => (
    <section ref={sectionRefs.hero} className="section-ktl hero-section-ktl">
      <div className="headline-container-ktl" ref={headlineRef}>
        <GlitchText className="main-headline-ktl">JAIKI.DEV</GlitchText>
        <h2 className="sub-headline-ktl floating-element-ktl">Full-stack Developer</h2>
      </div>
      
      <FloatingCodeSnippet language="javascript" position={{ x: -20, y: -15 }}>
        {`const jaiki = {
  skills: ['React', 'Node.js', 'TypeScript'],
  passion: 'Building beautiful interfaces',
  status: 'Available for projects'
};`}
      </FloatingCodeSnippet>
      
      <FloatingCodeSnippet language="css" position={{ x: 25, y: 20 }}>
        {`.jaiki-code {
  color: var(--ktl-neon-green);
  font-family: 'JetBrains Mono';
  animation: float-ktl 4s ease-in-out infinite;
}`}
      </FloatingCodeSnippet>
      
      <div className="nav-commands-ktl">
        <span 
          className="command-text-ktl" 
          onClick={() => navigateToSection('about')}
        >&gt; run about.js</span>
      </div>
    </section>
  );
  
  // Render function for about section
  const renderAbout = () => (
    <section ref={sectionRefs.about} className="section-ktl about-section-ktl">
      <h2 className="section-title-ktl floating-element-ktl">About<span className="accent-dot-ktl">.</span>me</h2>
      
      <div className="about-content-ktl">
        <p className="typing-text-ktl" data-text="Hello world. I'm Jaiki, a full-stack developer with 5 years of experience building high-performance web applications."></p>
        <p className="typing-text-ktl" data-text="My passion lies in creating immersive digital experiences that blend cutting-edge technology with thoughtful design."></p>
        <p className="typing-text-ktl" data-text="When I'm not coding, you can find me exploring new technologies, contributing to open source, or perfecting my espresso technique."></p>
      </div>
      
      <FloatingCodeSnippet language="typescript" position={{ x: -30, y: 10 }}>
        {`interface Developer {
  name: string;
  yearsOfExperience: number;
  favoriteTech: string[];
}

const jaiki: Developer = {
  name: 'Jaiki',
  yearsOfExperience: 5,
  favoriteTech: ['React', 'Node.js', 'GSAP']
};`}
      </FloatingCodeSnippet>
      
      <div className="nav-commands-ktl">
        <span 
          className="command-text-ktl" 
          onClick={() => navigateToSection('skills')}
        >&gt; cd ./skills</span>
      </div>
    </section>
  );
  
  // Render function for skills section
  const renderSkills = () => (
    <section ref={sectionRefs.skills} className="section-ktl skills-section-ktl">
      <h2 className="section-title-ktl floating-element-ktl">Skills<span className="accent-dot-ktl">.</span>map</h2>
      
      <div className="terminal-container-ktl">
        <div className="terminal-header-ktl">
          <span className="terminal-button-ktl"></span>
          <span className="terminal-button-ktl"></span>
          <span className="terminal-button-ktl"></span>
          <span className="terminal-title-ktl">jaiki@dev: ~/skills</span>
        </div>
        
        <div className="terminal-content-ktl">
          <div className="terminal-line-ktl">$ ls -la skills/</div>
          
          {skillCommands.map((skill, index) => (
            <div key={index} className="skill-command-ktl floating-element-ktl">
              <div className="command-prefix-ktl">$</div>
              <div className="command-name-ktl">{skill.name}</div>
              <div className="skill-bar-ktl">
                <div 
                  className="skill-level-ktl" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <div className="skill-description-ktl">// {skill.description}</div>
            </div>
          ))}
          
          <div className="terminal-line-ktl">$ _</div>
        </div>
      </div>
      
      <div className="nav-commands-ktl">
        <span 
          className="command-text-ktl" 
          onClick={() => navigateToSection('projects')}
        >&gt; view projects</span>
      </div>
    </section>
  );
  
  // Render function for projects section
  const renderProjects = () => (
    <section ref={sectionRefs.projects} className="section-ktl projects-section-ktl">
      <h2 className="section-title-ktl floating-element-ktl">Projects<span className="accent-dot-ktl">.</span>featured</h2>
      
      <div className="projects-grid-ktl">
        {projects.map((project) => (
          <div key={project.id} className="project-card-ktl floating-element-ktl">
            <GlitchText className="project-title-ktl">{project.title}</GlitchText>
            <p className="project-description-ktl">{project.description}</p>
            <div className="project-tags-ktl">
              {project.tags.map((tag, index) => (
                <span key={index} className="project-tag-ktl">{tag}</span>
              ))}
            </div>
            <div className="project-overlay-ktl">
              <span className="view-project-ktl">View Project</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="nav-commands-ktl">
        <span 
          className="command-text-ktl" 
          onClick={() => navigateToSection('contact')}
        >&gt; contact --init</span>
      </div>
    </section>
  );
  
  // Render function for contact section
  const renderContact = () => (
    <section ref={sectionRefs.contact} className="section-ktl contact-section-ktl">
      <h2 className="section-title-ktl floating-element-ktl">Contact<span className="accent-dot-ktl">.</span>connect</h2>
      
      <div className="cli-form-ktl">
        <div className="cli-prompt-ktl">$ message.send</div>
        
        <div className="form-fields-ktl">
          <div className="form-field-ktl floating-element-ktl">
            <label>name:</label>
            <input type="text" placeholder="Your name" />
          </div>
          
          <div className="form-field-ktl floating-element-ktl">
            <label>email:</label>
            <input type="email" placeholder="Your email" />
          </div>
          
          <div className="form-field-ktl floating-element-ktl">
            <label>message:</label>
            <textarea placeholder="Your message" rows="4"></textarea>
          </div>
          
          <div className="form-field-ktl floating-element-ktl">
            <button className="submit-button-ktl">
              <span className="button-text-ktl">$ send</span>
              <span className="button-icon-ktl">→</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="social-links-ktl floating-element-ktl">
        <a href="#" className="social-link-ktl">GitHub</a>
        <a href="#" className="social-link-ktl">LinkedIn</a>
        <a href="#" className="social-link-ktl">Twitter</a>
      </div>
      
      <CommandTerminal />
      
      <div className="nav-commands-ktl">
        <span 
          className="command-text-ktl" 
          onClick={() => navigateToSection('hero')}
        >&gt; cd ~/</span>
      </div>
    </section>
  );
  
  // Render the current section based on state
  const renderCurrentSection = () => {
    switch(currentSection) {
      case 'about':
        return renderAbout();
      case 'skills':
        return renderSkills();
      case 'projects':
        return renderProjects();
      case 'contact':
        return renderContact();
      default:
        return renderHero();
    }
  };
  
  return (
    <div 
      className="kinetic-typography-landscape-ktl" 
      ref={mainContainerRef}
    >
      <div className="background-grid-ktl"></div>
      {renderCurrentSection()}
    </div>
  );
};

export default KineticTypographyLandscape;