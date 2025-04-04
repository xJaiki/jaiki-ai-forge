import React, { useState, useEffect, useRef } from 'react';
import './WireframeDeconstruction.css';

const WireframeDeconstruction = () => {
  const [inspectionMode, setInspectionMode] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredElement, setHoveredElement] = useState(null);
  const heroRef = useRef(null);
  const sectionsRef = useRef({});

  // Toggle inspection mode to show additional component information
  const toggleInspectionMode = () => {
    setInspectionMode(!inspectionMode);
  };

  // Observer for element animations when they enter viewport
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('wd-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.wd-animate-in').forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Skills data for component library
  const skills = [
    { 
      name: 'React', 
      level: 95,
      description: 'Component architecture & state management',
      years: 4,
      category: 'frontend'
    },
    { 
      name: 'CSS/SCSS', 
      level: 90,
      description: 'Layout systems & advanced animations',
      years: 5,
      category: 'frontend'
    },
    { 
      name: 'JavaScript', 
      level: 92,
      description: 'ES6+, TypeScript & functional patterns',
      years: 5,
      category: 'frontend'
    },
    { 
      name: 'UI Design', 
      level: 85,
      description: 'Design systems & component libraries',
      years: 3,
      category: 'design'
    },
    { 
      name: 'Node.js', 
      level: 80,
      description: 'API development & server architecture',
      years: 3,
      category: 'backend'
    }
  ];

  // Project data
  const projects = [
    {
      id: 'project-01',
      title: 'Modular Design System',
      description: 'Comprehensive component library with 50+ reusable elements',
      tags: ['React', 'Styled Components', 'Storybook'],
      link: '#',
      metrics: {
        components: 52,
        testCoverage: 96,
        a11yScore: 98
      }
    },
    {
      id: 'project-02',
      title: 'Analytics Dashboard',
      description: 'Real-time data visualization platform with customizable modules',
      tags: ['React', 'D3.js', 'CSS Grid'],
      link: '#',
      metrics: {
        components: 35,
        testCoverage: 92,
        a11yScore: 95
      }
    },
    {
      id: 'project-03',
      title: 'E-commerce Framework',
      description: 'Headless commerce solution with microservice architecture',
      tags: ['Next.js', 'GraphQL', 'Tailwind CSS'],
      link: '#',
      metrics: {
        components: 68,
        testCoverage: 94,
        a11yScore: 97
      }
    }
  ];

  // Development methodology steps
  const processSteps = [
    {
      id: 'process-01',
      phase: 'Discovery',
      description: 'Requirements analysis & system architecture planning',
      tools: ['User interviews', 'Competitive analysis', 'System mapping'],
      outputs: ['Technical specifications', 'Architectural diagrams']
    },
    {
      id: 'process-02',
      phase: 'Design',
      description: 'UI/UX design focused on component architecture',
      tools: ['Figma', 'Design systems', 'Component libraries'],
      outputs: ['UI specifications', 'Interactive prototypes']
    },
    {
      id: 'process-03',
      phase: 'Development',
      description: 'Efficient implementation with test-driven development',
      tools: ['React', 'TypeScript', 'Jest', 'Cypress'],
      outputs: ['Documented components', 'Unit & integration tests']
    },
    {
      id: 'process-04',
      phase: 'Delivery',
      description: 'Deployment, documentation & knowledge transfer',
      tools: ['CI/CD pipelines', 'Documentation', 'Performance testing'],
      outputs: ['Production-ready code', 'Technical documentation']
    }
  ];

  // Render the hero section with blueprint styling
  const renderHeroBlueprintSection = () => (
    <section 
      ref={el => sectionsRef.current.hero = el}
      className="wd-section wd-hero-section wd-animate-in" 
      id="hero"
    >
      <div className="wd-grid-overlay">
        {/* Grid column indicators */}
        {Array(12).fill().map((_, i) => (
          <div key={`col-${i}`} className="wd-col-indicator">
            <span className="wd-annotation-text">{i+1}</span>
          </div>
        ))}
      </div>

      <div className="wd-measurement-overlay">
        <div className="wd-horizontal-measure wd-measure-top">
          <span className="wd-measure-text">1920px</span>
        </div>
        <div className="wd-vertical-measure wd-measure-left">
          <span className="wd-measure-text">100vh</span>
        </div>
      </div>
      
      <div className="wd-content-container">
        <div className="wd-hero-content">
          <div className="wd-headline-container wd-animate-in">
            <span className="wd-annotation-text wd-type-annotation">font: IBM Plex Sans / 72px / 700</span>
            <h1 className="wd-headline">
              <span className="wd-text-with-baseline">Jaiki</span>
              <div className="wd-headline-metrics">
                <span className="wd-x-height"></span>
                <span className="wd-baseline"></span>
                <span className="wd-cap-height"></span>
              </div>
            </h1>
            <span className="wd-annotation-text wd-type-annotation">letter-spacing: -0.02em</span>
          </div>
          
          <div className="wd-subheadline-container wd-animate-in" style={{animationDelay: '0.2s'}}>
            <h2 className="wd-subheadline">
              <span className="wd-text-with-baseline">Frontend Developer & UI Engineer</span>
            </h2>
            <span className="wd-annotation-text wd-type-annotation">font: Inter / 24px / 400 / line-height: 1.5</span>
          </div>
          
          <div className="wd-hero-cta wd-animate-in" style={{animationDelay: '0.4s'}}>
            <div className="wd-button-anatomy">
              <button className="wd-primary-button">
                <span className="wd-button-text">View Projects</span>
              </button>
              <div className="wd-button-metrics">
                <span className="wd-annotation-text">border-radius: 4px</span>
                <span className="wd-annotation-text">padding: 16px 32px</span>
                <div className="wd-button-states">
                  <div className="wd-button-state wd-state-default">Default</div>
                  <div className="wd-button-state wd-state-hover">Hover</div>
                  <div className="wd-button-state wd-state-active">Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="wd-coordinate-overlay">
        <div className="wd-coordinate wd-top-left">0,0</div>
        <div className="wd-coordinate wd-top-right">1920,0</div>
        <div className="wd-coordinate wd-bottom-left">0,1080</div>
        <div className="wd-coordinate wd-bottom-right">1920,1080</div>
      </div>
    </section>
  );

  // Render component library showcasing skills
  const renderComponentLibrarySection = () => (
    <section 
      ref={el => sectionsRef.current.skills = el}
      className="wd-section wd-skills-section wd-animate-in" 
      id="skills"
    >
      <div className="wd-section-header">
        <span className="wd-annotation-text">Section #02</span>
        <h2 className="wd-section-title">
          <span className="wd-text-with-baseline">Component Library</span>
        </h2>
        <div className="wd-section-divider">
          <span className="wd-annotation-text">width: 100% | height: 1px | color: #CCCCCC</span>
        </div>
      </div>

      <div className="wd-component-library-container">
        <div className="wd-component-controls">
          <div className="wd-control-container">
            <span className="wd-annotation-text">View Options</span>
            <button 
              className={`wd-control-button ${inspectionMode ? 'wd-active' : ''}`}
              onClick={toggleInspectionMode}
            >
              <span className="wd-button-text">Inspection Mode</span>
              <span className={`wd-toggle-indicator ${inspectionMode ? 'wd-on' : 'wd-off'}`}></span>
            </button>
          </div>
        </div>

        <div className="wd-components-grid">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className={`wd-component-card wd-animate-in ${inspectionMode ? 'wd-inspection-mode' : ''}`} 
              style={{animationDelay: `${0.1 * index}s`}}
              onMouseEnter={() => setHoveredElement(`skill-${index}`)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <div className="wd-component-header">
                <span className="wd-component-name">{skill.name}</span>
                <span className="wd-annotation-text wd-category">{skill.category}</span>
              </div>
              
              <div className="wd-component-body">
                <div className="wd-skill-level-container">
                  <div className="wd-skill-bar-wrapper">
                    <div className="wd-skill-bar" style={{width: `${skill.level}%`}}></div>
                    <div className="wd-skill-metrics">
                      <span className="wd-annotation-text">0%</span>
                      <span className="wd-annotation-text">50%</span>
                      <span className="wd-annotation-text">100%</span>
                    </div>
                  </div>
                  <span className="wd-skill-value">{skill.level}%</span>
                </div>
                
                <p className="wd-component-description">{skill.description}</p>
                
                {inspectionMode && (
                  <div className="wd-component-inspector">
                    <div className="wd-inspector-item">
                      <span className="wd-inspector-label">Years:</span>
                      <span className="wd-inspector-value">{skill.years}</span>
                    </div>
                    <div className="wd-inspector-item">
                      <span className="wd-inspector-label">Proficiency:</span>
                      <span className="wd-inspector-value">
                        {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Intermediate'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="wd-component-footer">
                <div className="wd-component-metrics">
                  <span className="wd-metric">{skill.years}+ years</span>
                </div>
              </div>
              
              {/* Component outline */}
              <div className="wd-component-outline">
                <span className="wd-outline-annotation wd-top-left">0,0</span>
                <span className="wd-outline-annotation wd-top-right">w,0</span>
                <span className="wd-outline-annotation wd-bottom-left">0,h</span>
                <span className="wd-outline-annotation wd-bottom-right">w,h</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Render projects as wireframes
  const renderProjectWireframesSection = () => (
    <section 
      ref={el => sectionsRef.current.projects = el}
      className="wd-section wd-projects-section wd-animate-in" 
      id="projects"
    >
      <div className="wd-section-header">
        <span className="wd-annotation-text">Section #03</span>
        <h2 className="wd-section-title">
          <span className="wd-text-with-baseline">Project Wireframes</span>
        </h2>
        <div className="wd-section-divider"></div>
      </div>

      <div className="wd-wireframes-container">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className="wd-wireframe-project wd-animate-in" 
            style={{animationDelay: `${0.2 * index}s`}}
          >
            <div className="wd-wireframe-header">
              <span className="wd-annotation-text">Project {index + 1}</span>
              <div className="wd-wireframe-title-container">
                <h3 className="wd-wireframe-title">{project.title}</h3>
                <div className="wd-text-metrics">
                  <span className="wd-annotation-text">font: IBM Plex Sans / 24px / 600</span>
                </div>
              </div>
            </div>
            
            <div className="wd-wireframe-body">
              <div className="wd-wireframe-preview">
                <div className="wd-wireframe-frame">
                  <div className="wd-wireframe-element wd-element-header"></div>
                  <div className="wd-wireframe-element wd-element-image"></div>
                  <div className="wd-wireframe-element wd-element-text-block"></div>
                  <div className="wd-wireframe-element wd-element-button"></div>
                  
                  <div className="wd-wireframe-annotations">
                    <span className="wd-hotspot" style={{top: '20%', left: '50%'}}>
                      <span className="wd-hotspot-label">Header</span>
                    </span>
                    <span className="wd-hotspot" style={{top: '45%', left: '30%'}}>
                      <span className="wd-hotspot-label">Main Visual</span>
                    </span>
                    <span className="wd-hotspot" style={{top: '70%', left: '70%'}}>
                      <span className="wd-hotspot-label">CTA</span>
                    </span>
                  </div>
                </div>
                
                <div className="wd-wireframe-dimensions">
                  <span className="wd-dimension wd-dimension-width">1200px</span>
                  <span className="wd-dimension wd-dimension-height">800px</span>
                </div>
              </div>
              
              <div className="wd-wireframe-details">
                <p className="wd-wireframe-description">{project.description}</p>
                
                <div className="wd-wireframe-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="wd-wireframe-tag">
                      {tag}
                      <span className="wd-tag-annotation">component</span>
                    </span>
                  ))}
                </div>
                
                <div className="wd-wireframe-metrics">
                  <div className="wd-metric-item">
                    <span className="wd-metric-label">Components</span>
                    <span className="wd-metric-value">{project.metrics.components}</span>
                  </div>
                  <div className="wd-metric-item">
                    <span className="wd-metric-label">Test Coverage</span>
                    <span className="wd-metric-value">{project.metrics.testCoverage}%</span>
                  </div>
                  <div className="wd-metric-item">
                    <span className="wd-metric-label">A11y Score</span>
                    <span className="wd-metric-value">{project.metrics.a11yScore}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="wd-wireframe-footer">
              <a href={project.link} className="wd-wireframe-link">
                <span className="wd-link-text">View Project</span>
                <div className="wd-link-annotation">
                  <span className="wd-annotation-text">href: {project.link}</span>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  // Render process flowchart
  const renderProcessFlowchartSection = () => (
    <section 
      ref={el => sectionsRef.current.process = el}
      className="wd-section wd-process-section wd-animate-in" 
      id="process"
    >
      <div className="wd-section-header">
        <span className="wd-annotation-text">Section #04</span>
        <h2 className="wd-section-title">
          <span className="wd-text-with-baseline">Process Flowchart</span>
        </h2>
        <div className="wd-section-divider"></div>
      </div>

      <div className="wd-flowchart-container">
        <div className="wd-flowchart-legend">
          <div className="wd-legend-item">
            <span className="wd-legend-symbol wd-symbol-phase"></span>
            <span className="wd-legend-label">Phase</span>
          </div>
          <div className="wd-legend-item">
            <span className="wd-legend-symbol wd-symbol-tool"></span>
            <span className="wd-legend-label">Tools</span>
          </div>
          <div className="wd-legend-item">
            <span className="wd-legend-symbol wd-symbol-output"></span>
            <span className="wd-legend-label">Outputs</span>
          </div>
        </div>

        <div className="wd-flowchart-diagram">
          {processSteps.map((step, index) => (
            <div 
              key={step.id} 
              className="wd-process-step wd-animate-in" 
              style={{animationDelay: `${0.15 * index}s`}}
            >
              <div className="wd-step-number">
                <span className="wd-step-count">{index + 1}</span>
                <span className="wd-annotation-text">Phase</span>
              </div>
              
              <div className="wd-step-content">
                <div className="wd-step-header">
                  <h3 className="wd-step-title">{step.phase}</h3>
                  <div className="wd-text-metrics">
                    <span className="wd-annotation-text">font: IBM Plex Sans / 20px / 600</span>
                  </div>
                </div>
                
                <p className="wd-step-description">{step.description}</p>
                
                <div className="wd-step-details">
                  <div className="wd-step-tools">
                    <span className="wd-annotation-text">Tools</span>
                    <ul className="wd-tools-list">
                      {step.tools.map((tool, i) => (
                        <li key={i} className="wd-tool-item">{tool}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="wd-step-outputs">
                    <span className="wd-annotation-text">Outputs</span>
                    <ul className="wd-outputs-list">
                      {step.outputs.map((output, i) => (
                        <li key={i} className="wd-output-item">{output}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {index < processSteps.length - 1 && (
                <div className="wd-step-connector">
                  <svg width="20" height="50" className="wd-connector-arrow">
                    <path d="M10,0 L10,40 L20,40 L10,50 L0,40 L10,40" stroke="#000000" fill="none" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Render contact form with visible structure
  const renderContactInterfaceSection = () => (
    <section 
      ref={el => sectionsRef.current.contact = el}
      className="wd-section wd-contact-section wd-animate-in" 
      id="contact"
    >
      <div className="wd-section-header">
        <span className="wd-annotation-text">Section #05</span>
        <h2 className="wd-section-title">
          <span className="wd-text-with-baseline">Contact Interface</span>
        </h2>
        <div className="wd-section-divider"></div>
      </div>

      <div className="wd-contact-container">
        <div className="wd-form-dimensions">
          <span className="wd-dimension-annotation wd-width">width: 600px</span>
          <span className="wd-dimension-annotation wd-height">height: auto</span>
        </div>
        
        <div className="wd-contact-form-container">
          <form className="wd-contact-form">
            <div className="wd-form-group wd-animate-in">
              <div className="wd-input-container">
                <label className="wd-form-label" htmlFor="name">
                  Name
                  <span className="wd-label-annotation">font: JetBrains Mono / 14px / 400</span>
                </label>
                <div className="wd-input-wrapper">
                  <input 
                    type="text" 
                    id="name" 
                    className="wd-form-input" 
                    placeholder="John Doe"
                  />
                  <div className="wd-input-metrics">
                    <span className="wd-input-annotation">required: true</span>
                    <span className="wd-input-annotation">minLength: 2</span>
                    <span className="wd-input-annotation">type: text</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="wd-form-group wd-animate-in" style={{animationDelay: '0.1s'}}>
              <div className="wd-input-container">
                <label className="wd-form-label" htmlFor="email">
                  Email
                  <span className="wd-label-annotation">font: JetBrains Mono / 14px / 400</span>
                </label>
                <div className="wd-input-wrapper">
                  <input 
                    type="email" 
                    id="email" 
                    className="wd-form-input" 
                    placeholder="john@example.com"
                  />
                  <div className="wd-input-metrics">
                    <span className="wd-input-annotation">required: true</span>
                    <span className="wd-input-annotation">pattern: email</span>
                    <span className="wd-input-annotation">type: email</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="wd-form-group wd-animate-in" style={{animationDelay: '0.2s'}}>
              <div className="wd-input-container">
                <label className="wd-form-label" htmlFor="message">
                  Message
                  <span className="wd-label-annotation">font: JetBrains Mono / 14px / 400</span>
                </label>
                <div className="wd-input-wrapper">
                  <textarea 
                    id="message" 
                    className="wd-form-textarea" 
                    placeholder="Your message here..."
                    rows="4"
                  ></textarea>
                  <div className="wd-input-metrics">
                    <span className="wd-input-annotation">required: true</span>
                    <span className="wd-input-annotation">minLength: 10</span>
                    <span className="wd-input-annotation">maxLength: 500</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="wd-form-group wd-animate-in" style={{animationDelay: '0.3s'}}>
              <div className="wd-button-container">
                <button type="submit" className="wd-submit-button">
                  <span className="wd-button-text">Submit</span>
                </button>
                <div className="wd-button-states-container">
                  <div className="wd-button-state-display">
                    <div className="wd-button-state wd-default">Default</div>
                    <div className="wd-button-state wd-hover">Hover</div>
                    <div className="wd-button-state wd-active">Active</div>
                    <div className="wd-button-state wd-focus">Focus</div>
                    <div className="wd-button-state wd-disabled">Disabled</div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );

  // Render site map/navigation
  const renderSiteMap = () => (
    <nav className="wd-sitemap">
      <div className="wd-sitemap-toggle">
        <button className="wd-toggle-button">
          <span className="wd-toggle-icon"></span>
          <span className="wd-toggle-text">Navigation</span>
        </button>
      </div>
      
      <div className="wd-sitemap-container">
        <div className="wd-sitemap-header">
          <span className="wd-annotation-text">Site Architecture</span>
        </div>
        
        <div className="wd-sitemap-structure">
          <div className="wd-structure-node wd-root-node">
            <span className="wd-node-label">index.html</span>
            <div className="wd-node-children">
              <div 
                className={`wd-structure-node wd-section-node ${activeSection === 'hero' ? 'wd-active' : ''}`}
                onClick={() => {
                  setActiveSection('hero');
                  sectionsRef.current.hero.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="wd-node-label">hero</span>
                <span className="wd-annotation-text">#hero</span>
              </div>
              <div 
                className={`wd-structure-node wd-section-node ${activeSection === 'skills' ? 'wd-active' : ''}`}
                onClick={() => {
                  setActiveSection('skills');
                  sectionsRef.current.skills.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="wd-node-label">skills</span>
                <span className="wd-annotation-text">#skills</span>
              </div>
              <div 
                className={`wd-structure-node wd-section-node ${activeSection === 'projects' ? 'wd-active' : ''}`}
                onClick={() => {
                  setActiveSection('projects');
                  sectionsRef.current.projects.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="wd-node-label">projects</span>
                <span className="wd-annotation-text">#projects</span>
              </div>
              <div 
                className={`wd-structure-node wd-section-node ${activeSection === 'process' ? 'wd-active' : ''}`}
                onClick={() => {
                  setActiveSection('process');
                  sectionsRef.current.process.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="wd-node-label">process</span>
                <span className="wd-annotation-text">#process</span>
              </div>
              <div 
                className={`wd-structure-node wd-section-node ${activeSection === 'contact' ? 'wd-active' : ''}`}
                onClick={() => {
                  setActiveSection('contact');
                  sectionsRef.current.contact.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="wd-node-label">contact</span>
                <span className="wd-annotation-text">#contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  // Main render
  return (
    <div className="wd-wireframe-deconstruction">
      {/* Inspection mode toggle */}
      <div className="wd-inspection-toggle">
        <button 
          className={`wd-toggle-button ${inspectionMode ? 'wd-active' : ''}`}
          onClick={toggleInspectionMode}
        >
          <span className="wd-toggle-icon"></span>
          <span className="wd-toggle-text">Inspection Mode</span>
        </button>
      </div>
      
      {/* Global grid overlay */}
      <div className="wd-global-grid-overlay">
        {Array(12).fill().map((_, i) => (
          <div key={`grid-col-${i}`} className="wd-grid-column"></div>
        ))}
      </div>
      
      {/* Global rulers */}
      <div className="wd-ruler-horizontal">
        <div className="wd-ruler-ticks">
          {Array(19).fill().map((_, i) => (
            <div key={`h-tick-${i}`} className="wd-ruler-tick">
              <span className="wd-tick-label">{i * 100}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="wd-ruler-vertical">
        <div className="wd-ruler-ticks">
          {Array(10).fill().map((_, i) => (
            <div key={`v-tick-${i}`} className="wd-ruler-tick">
              <span className="wd-tick-label">{i * 100}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main content sections */}
      <main className="wd-main-container">
        {renderHeroBlueprintSection()}
        {renderComponentLibrarySection()}
        {renderProjectWireframesSection()}
        {renderProcessFlowchartSection()}
        {renderContactInterfaceSection()}
      </main>
      
      {/* Navigation map */}
      {renderSiteMap()}
    </div>
  );
};

export default WireframeDeconstruction;