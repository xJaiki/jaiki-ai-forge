import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import './SensorySynesthesiaCanvas.css';

// Utility function to map colors to frequencies and instruments
const colorToSoundMap = {
  blue: { freq: 'D4', timbre: 'bell' },
  purple: { freq: 'A3', timbre: 'synth' },
  green: { freq: 'G3', timbre: 'pluck' },
  yellow: { freq: 'E4', timbre: 'marimba' },
  orange: { freq: 'C4', timbre: 'string' },
  red: { freq: 'F3', timbre: 'brass' },
};

const SensorySynesthesiaCanvas = () => {
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoverElements, setHoverElements] = useState({});
  
  // Refs for various synths and audio elements
  const synthRef = useRef(null);
  const amSynthRef = useRef(null);
  const fmSynthRef = useRef(null);
  const metalSynthRef = useRef(null);
  const membraneSynthRef = useRef(null);
  const pluckSynthRef = useRef(null);
  const audioContextRef = useRef(null);
  
  // Section refs for scroll tracking
  const sectionRefs = useRef({});
  
  // Initialize audio context and synths
  const initializeAudio = () => {
    if (audioInitialized) return;
    
    // Start audio context
    Tone.start();
    audioContextRef.current = Tone.context;
    
    // Create different synths for various timbres
    synthRef.current = new Tone.PolySynth(Tone.Synth).toDestination();
    amSynthRef.current = new Tone.PolySynth(Tone.AMSynth).toDestination();
    fmSynthRef.current = new Tone.PolySynth(Tone.FMSynth).toDestination();
    metalSynthRef.current = new Tone.MetalSynth().toDestination();
    membraneSynthRef.current = new Tone.MembraneSynth().toDestination();
    pluckSynthRef.current = new Tone.PluckSynth().toDestination();
    
    // Set volumes to reasonable levels
    synthRef.current.volume.value = -10;
    amSynthRef.current.volume.value = -15;
    fmSynthRef.current.volume.value = -15;
    metalSynthRef.current.volume.value = -20;
    membraneSynthRef.current.volume.value = -15;
    pluckSynthRef.current.volume.value = -10;
    
    setAudioInitialized(true);
  };
  
  // Get appropriate synth based on timbre
  const getSynthByTimbre = (timbre) => {
    switch (timbre) {
      case 'bell':
        return metalSynthRef.current;
      case 'synth':
        return fmSynthRef.current;
      case 'pluck':
        return pluckSynthRef.current;
      case 'marimba':
        return amSynthRef.current;
      case 'string':
        return synthRef.current;
      case 'brass':
        return membraneSynthRef.current;
      default:
        return synthRef.current;
    }
  };
  
  // Play sound based on color
  const playSound = (color, duration = 0.5, velocity = 0.5) => {
    if (!audioInitialized) return;
    
    const soundInfo = colorToSoundMap[color] || { freq: 'C4', timbre: 'synth' };
    const synth = getSynthByTimbre(soundInfo.timbre);
    
    // Adjust octave based on velocity for more expressiveness
    let note = soundInfo.freq;
    if (velocity > 0.7) {
      note = Tone.Frequency(note).transpose(12).toNote(); // Up an octave
    } else if (velocity < 0.3) {
      note = Tone.Frequency(note).transpose(-12).toNote(); // Down an octave
    }
    
    // Play the note with the appropriate synth
    synth.triggerAttackRelease(note, duration);
  };
  
  // Play chord progression
  const playChord = (chordName, duration = 0.5) => {
    if (!audioInitialized) return;
    
    const chords = {
      'cmaj': ['C4', 'E4', 'G4'],
      'gmaj': ['G3', 'B3', 'D4'],
      'fmaj': ['F3', 'A3', 'C4'],
      'amin': ['A3', 'C4', 'E4'],
      'emin': ['E3', 'G3', 'B3'],
      'dmaj': ['D3', 'F#3', 'A3']
    };
    
    const chord = chords[chordName] || chords.cmaj;
    synthRef.current.triggerAttackRelease(chord, duration);
  };
  
  // Play a sequence of notes in rhythm
  const playMelodicSequence = (notes = ['C4', 'E4', 'G4', 'B4'], duration = 0.2) => {
    if (!audioInitialized) return;
    
    const now = Tone.now();
    notes.forEach((note, i) => {
      synthRef.current.triggerAttackRelease(note, duration, now + i * duration);
    });
  };
  
  // Initialize mouse position tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize coordinates to range from 0 to 1
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
      
      // Mouse movement can subtly affect ambient sound
      if (audioInitialized && Math.random() < 0.05) {
        // Trigger occasional sounds based on mouse position
        const note = Tone.Frequency('C3').transpose(Math.floor(x * 24)).toNote();
        pluckSynthRef.current.triggerAttackRelease(note, 0.1, undefined, 0.05);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [audioInitialized]);
  
  // Detect which section is in view
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let currentSection = 'hero';
      
      // Find the section that's currently most in view
      Object.entries(sectionRefs.current).forEach(([id, ref]) => {
        if (!ref) return;
        
        const { offsetTop, offsetHeight } = ref;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          currentSection = id;
        }
      });
      
      // If we've changed sections, play a transition sound
      if (currentSection !== activeSection) {
        // Different sections have different sound profiles
        switch (currentSection) {
          case 'hero':
            playChord('cmaj', 1);
            break;
          case 'about':
            playChord('gmaj', 1);
            break;
          case 'skills':
            playChord('amin', 1);
            break;
          case 'projects':
            playChord('fmaj', 1);
            break;
          case 'contact':
            playChord('emin', 1);
            break;
          default:
            playChord('cmaj', 1);
        }
        
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);
  
  // Set hover state for interactive elements
  const handleElementHover = (elementId, isHovered, color = 'blue') => {
    setHoverElements(prev => ({ ...prev, [elementId]: isHovered }));
    
    if (isHovered) {
      playSound(color, 0.3, 0.3);
    }
  };
  
  // Handle click on interactive elements
  const handleElementClick = (elementId, color = 'blue') => {
    playSound(color, 0.5, 0.7);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  // Initialize audio context on user interaction
  const handleInitializeAudio = () => {
    initializeAudio();
    
    // Play a welcoming sequence
    setTimeout(() => {
      playMelodicSequence(['C4', 'E4', 'G4', 'C5'], 0.2);
    }, 100);
  };
  
  // Render hero section with synesthetic elements
  const renderHeroSection = () => (
    <section 
      ref={(el) => sectionRefs.current.hero = el}
      className="ss-section ss-hero-section"
      id="hero"
    >
      <div className="ss-audio-indicator"></div>
      <div className="ss-hero-content">
        <h1 
          className="ss-heading ss-hero-heading"
          onMouseEnter={() => handleElementHover('hero-heading', true, 'purple')}
          onMouseLeave={() => handleElementHover('hero-heading', false)}
          onClick={() => handleElementClick('hero-heading', 'purple')}
        >
          <span className="ss-letter" data-note="C4">J</span>
          <span className="ss-letter" data-note="E4">a</span>
          <span className="ss-letter" data-note="G4">i</span>
          <span className="ss-letter" data-note="B4">k</span>
          <span className="ss-letter" data-note="C5">i</span>
        </h1>
        <h2 
          className="ss-subheading"
          onMouseEnter={() => handleElementHover('hero-subheading', true, 'blue')}
          onMouseLeave={() => handleElementHover('hero-subheading', false)}
          onClick={() => handleElementClick('hero-subheading', 'blue')}
        >
          Full-stack Developer & Sound Designer
        </h2>
        
        <div className="ss-audio-visualizer">
          <div className="ss-visualizer-bar" style={{ height: `${20 + Math.random() * 40}%` }}></div>
          <div className="ss-visualizer-bar" style={{ height: `${20 + Math.random() * 40}%` }}></div>
          <div className="ss-visualizer-bar" style={{ height: `${20 + Math.random() * 40}%` }}></div>
          <div className="ss-visualizer-bar" style={{ height: `${20 + Math.random() * 40}%` }}></div>
          <div className="ss-visualizer-bar" style={{ height: `${20 + Math.random() * 40}%` }}></div>
          <div className="ss-visualizer-bar" style={{ height: `${20 + Math.random() * 40}%` }}></div>
          <div className="ss-visualizer-bar" style={{ height: `${20 + Math.random() * 40}%` }}></div>
        </div>
        
        {!audioInitialized && (
          <button 
            className="ss-start-button"
            onClick={handleInitializeAudio}
          >
            Begin Audio Experience
          </button>
        )}
        
        <div className="ss-scroll-indicator">
          <div className="ss-scroll-text">Scroll to explore</div>
          <div className="ss-scroll-arrow"></div>
        </div>
      </div>
      
      <div 
        className="ss-interactive-background"
        style={{
          '--mouse-x': mousePosition.x,
          '--mouse-y': mousePosition.y
        }}
      ></div>
    </section>
  );
  
  // About section with audio-reactive elements
  const renderAboutSection = () => (
    <section 
      ref={(el) => sectionRefs.current.about = el}
      className="ss-section ss-about-section"
      id="about"
    >
      <div className="ss-section-content">
        <h2 
          className="ss-heading ss-section-heading"
          onMouseEnter={() => handleElementHover('about-heading', true, 'green')}
          onMouseLeave={() => handleElementHover('about-heading', false)}
          onClick={() => handleElementClick('about-heading', 'green')}
        >
          About Me
        </h2>
        
        <div className="ss-about-grid">
          <div 
            className={`ss-about-card ss-blue-element ${hoverElements['about-card-1'] ? 'ss-hovered' : ''}`}
            onMouseEnter={() => handleElementHover('about-card-1', true, 'blue')}
            onMouseLeave={() => handleElementHover('about-card-1', false)}
            onClick={() => handleElementClick('about-card-1', 'blue')}
          >
            <h3 className="ss-card-heading">Audio Developer</h3>
            <p className="ss-card-text">
              Specializing in audiovisual web experiences and interactive sound design for digital interfaces.
            </p>
            <div className="ss-audio-ring ss-blue-ring"></div>
          </div>
          
          <div 
            className={`ss-about-card ss-purple-element ${hoverElements['about-card-2'] ? 'ss-hovered' : ''}`}
            onMouseEnter={() => handleElementHover('about-card-2', true, 'purple')}
            onMouseLeave={() => handleElementHover('about-card-2', false)}
            onClick={() => handleElementClick('about-card-2', 'purple')}
          >
            <h3 className="ss-card-heading">Frontend Engineer</h3>
            <p className="ss-card-text">
              Creating responsive, accessible interfaces with a focus on interactive experiences.
            </p>
            <div className="ss-audio-ring ss-purple-ring"></div>
          </div>
          
          <div 
            className={`ss-about-card ss-orange-element ${hoverElements['about-card-3'] ? 'ss-hovered' : ''}`}
            onMouseEnter={() => handleElementHover('about-card-3', true, 'orange')}
            onMouseLeave={() => handleElementHover('about-card-3', false)}
            onClick={() => handleElementClick('about-card-3', 'orange')}
          >
            <h3 className="ss-card-heading">Full-Stack Developer</h3>
            <p className="ss-card-text">
              Building complete applications from backend architecture to interactive frontend experiences.
            </p>
            <div className="ss-audio-ring ss-orange-ring"></div>
          </div>
        </div>
        
        <div 
          className="ss-bio-container"
          onMouseEnter={() => handleElementHover('bio', true, 'yellow')}
          onMouseLeave={() => handleElementHover('bio', false)}
          onClick={() => handleElementClick('bio', 'yellow')}
        >
          <p className="ss-bio-text">
            I'm a developer with a passion for creating immersive digital experiences that engage multiple senses. 
            With 5+ years of experience in web development and a background in sound design, 
            I combine technical expertise with creative innovation to build interfaces that respond to and generate sound.
          </p>
          <div className="ss-audio-wave">
            <svg viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 15 Q 20 5, 40 15 T 80 15 T 120 15 T 160 15 T 200 15" fill="none" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
  
  // Skills section with audio-reactive elements
  const renderSkillsSection = () => {
    const skills = [
      { name: 'React', level: 90, color: 'blue' },
      { name: 'Node.js', level: 85, color: 'green' },
      { name: 'Web Audio API', level: 95, color: 'purple' },
      { name: 'Three.js', level: 80, color: 'orange' },
      { name: 'CSS/SCSS', level: 88, color: 'blue' },
      { name: 'JavaScript', level: 92, color: 'yellow' },
      { name: 'Sound Design', level: 90, color: 'red' },
      { name: 'UX Design', level: 85, color: 'orange' }
    ];
    
    return (
      <section 
        ref={(el) => sectionRefs.current.skills = el}
        className="ss-section ss-skills-section"
        id="skills"
      >
        <div className="ss-section-content">
          <h2 
            className="ss-heading ss-section-heading"
            onMouseEnter={() => handleElementHover('skills-heading', true, 'red')}
            onMouseLeave={() => handleElementHover('skills-heading', false)}
            onClick={() => handleElementClick('skills-heading', 'red')}
          >
            Skills & Expertise
          </h2>
          
          <div className="ss-skills-container">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className={`ss-skill-bar ss-${skill.color}-element ${hoverElements[`skill-${index}`] ? 'ss-hovered' : ''}`}
                onMouseEnter={() => handleElementHover(`skill-${index}`, true, skill.color)}
                onMouseLeave={() => handleElementHover(`skill-${index}`, false)}
                onClick={() => handleElementClick(`skill-${index}`, skill.color)}
              >
                <div className="ss-skill-info">
                  <span className="ss-skill-name">{skill.name}</span>
                  <span className="ss-skill-percentage">{skill.level}%</span>
                </div>
                <div className="ss-skill-progress">
                  <div 
                    className="ss-skill-fill"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className={`ss-audio-particle ss-${skill.color}-particle`}></div>
              </div>
            ))}
          </div>
          
          <div className="ss-skills-visualizer">
            <div className="ss-visualizer-circle ss-blue-circle"></div>
            <div className="ss-visualizer-circle ss-green-circle"></div>
            <div className="ss-visualizer-circle ss-purple-circle"></div>
            <div className="ss-visualizer-circle ss-orange-circle"></div>
          </div>
        </div>
      </section>
    );
  };
  
  // Projects section with audio-reactive elements
  const renderProjectsSection = () => {
    const projects = [
      {
        title: 'Sonic Interface Framework',
        description: 'A JavaScript library for creating audio-reactive UI components that respond to user interaction with synchronized sound and animation.',
        color: 'purple',
        notes: ['C4', 'E4', 'G4']
      },
      {
        title: 'Audiovisual Portfolio Template',
        description: 'A customizable React template for developers and designers that incorporates sound design and visual feedback for an immersive experience.',
        color: 'blue',
        notes: ['D4', 'F#4', 'A4']
      },
      {
        title: 'Music Visualization Platform',
        description: 'Web application that generates real-time visual representations of music using WebAudio API and Canvas/WebGL rendering.',
        color: 'green',
        notes: ['E4', 'G4', 'B4']
      },
      {
        title: 'Interactive Sound Installation',
        description: 'Physical installation controlled by a web application that allows visitors to create collaborative musical compositions through movement.',
        color: 'orange',
        notes: ['F4', 'A4', 'C5']
      }
    ];
    
    return (
      <section 
        ref={(el) => sectionRefs.current.projects = el}
        className="ss-section ss-projects-section"
        id="projects"
      >
        <div className="ss-section-content">
          <h2 
            className="ss-heading ss-section-heading"
            onMouseEnter={() => handleElementHover('projects-heading', true, 'yellow')}
            onMouseLeave={() => handleElementHover('projects-heading', false)}
            onClick={() => handleElementClick('projects-heading', 'yellow')}
          >
            Featured Projects
          </h2>
          
          <div className="ss-projects-grid">
            {projects.map((project, index) => (
              <div 
                key={index}
                className={`ss-project-card ss-${project.color}-element ${hoverElements[`project-${index}`] ? 'ss-hovered' : ''}`}
                onMouseEnter={() => handleElementHover(`project-${index}`, true, project.color)}
                onMouseLeave={() => handleElementHover(`project-${index}`, false)}
                onClick={() => {
                  handleElementClick(`project-${index}`, project.color);
                  // Play chord associated with project
                  if (audioInitialized) {
                    amSynthRef.current.triggerAttackRelease(project.notes, 0.5);
                  }
                }}
              >
                <h3 className="ss-project-title">{project.title}</h3>
                <p className="ss-project-description">{project.description}</p>
                <div className={`ss-audio-note ss-${project.color}-note`}></div>
                <div className="ss-project-chord-visualizer">
                  {project.notes.map((note, i) => (
                    <div 
                      key={`${index}-${i}`} 
                      className="ss-chord-note"
                      style={{ height: `${20 + i * 15}px` }}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  // Contact section with audio-reactive elements
  const renderContactSection = () => (
    <section 
      ref={(el) => sectionRefs.current.contact = el}
      className="ss-section ss-contact-section"
      id="contact"
    >
      <div className="ss-section-content">
        <h2 
          className="ss-heading ss-section-heading"
          onMouseEnter={() => handleElementHover('contact-heading', true, 'orange')}
          onMouseLeave={() => handleElementHover('contact-heading', false)}
          onClick={() => handleElementClick('contact-heading', 'orange')}
        >
          Get in Touch
        </h2>
        
        <div className="ss-contact-container">
          <form className="ss-contact-form">
            <div className="ss-form-group">
              <label 
                className="ss-form-label"
                htmlFor="name"
                onMouseEnter={() => handleElementHover('name-label', true, 'blue')}
                onMouseLeave={() => handleElementHover('name-label', false)}
              >
                Name
              </label>
              <input 
                type="text" 
                id="name" 
                className="ss-form-input ss-blue-input"
                placeholder="Your name"
                onFocus={() => handleElementClick('name-input', 'blue')}
                onChange={() => {
                  if (audioInitialized && Math.random() < 0.3) {
                    // Typing sound effect
                    pluckSynthRef.current.triggerAttackRelease('C5', 0.05, undefined, 0.1);
                  }
                }}
              />
              <div className="ss-audio-pulse ss-blue-pulse"></div>
            </div>
            
            <div className="ss-form-group">
              <label 
                className="ss-form-label"
                htmlFor="email"
                onMouseEnter={() => handleElementHover('email-label', true, 'purple')}
                onMouseLeave={() => handleElementHover('email-label', false)}
              >
                Email
              </label>
              <input 
                type="email" 
                id="email" 
                className="ss-form-input ss-purple-input"
                placeholder="Your email"
                onFocus={() => handleElementClick('email-input', 'purple')}
                onChange={() => {
                  if (audioInitialized && Math.random() < 0.3) {
                    // Typing sound effect
                    pluckSynthRef.current.triggerAttackRelease('E5', 0.05, undefined, 0.1);
                  }
                }}
              />
              <div className="ss-audio-pulse ss-purple-pulse"></div>
            </div>
            
            <div className="ss-form-group">
              <label 
                className="ss-form-label"
                htmlFor="message"
                onMouseEnter={() => handleElementHover('message-label', true, 'green')}
                onMouseLeave={() => handleElementHover('message-label', false)}
              >
                Message
              </label>
              <textarea 
                id="message" 
                className="ss-form-textarea ss-green-input"
                placeholder="Your message"
                rows="4"
                onFocus={() => handleElementClick('message-input', 'green')}
                onChange={() => {
                  if (audioInitialized && Math.random() < 0.3) {
                    // Typing sound effect
                    pluckSynthRef.current.triggerAttackRelease('G5', 0.05, undefined, 0.1);
                  }
                }}
              ></textarea>
              <div className="ss-audio-pulse ss-green-pulse"></div>
            </div>
            
            <button 
              type="submit" 
              className={`ss-submit-button ${hoverElements['submit-button'] ? 'ss-hovered' : ''}`}
              onMouseEnter={() => handleElementHover('submit-button', true, 'red')}
              onMouseLeave={() => handleElementHover('submit-button', false)}
              onClick={(e) => {
                e.preventDefault();
                handleElementClick('submit-button', 'red');
                // Play a triumphant sequence when submitted
                if (audioInitialized) {
                  playMelodicSequence(['C4', 'E4', 'G4', 'C5', 'G4', 'E4', 'C4'], 0.15);
                }
              }}
            >
              Send Message
              <div className="ss-audio-ripple"></div>
            </button>
          </form>
          
          <div className="ss-contact-info">
            <div 
              className="ss-contact-item ss-blue-element"
              onMouseEnter={() => handleElementHover('email-contact', true, 'blue')}
              onMouseLeave={() => handleElementHover('email-contact', false)}
              onClick={() => handleElementClick('email-contact', 'blue')}
            >
              <span className="ss-contact-label">Email</span>
              <a href="mailto:hello@jaiki.dev" className="ss-contact-link">hello@jaiki.dev</a>
              <div className="ss-audio-indicator ss-small-indicator"></div>
            </div>
            
            <div 
              className="ss-contact-item ss-purple-element"
              onMouseEnter={() => handleElementHover('github-contact', true, 'purple')}
              onMouseLeave={() => handleElementHover('github-contact', false)}
              onClick={() => handleElementClick('github-contact', 'purple')}
            >
              <span className="ss-contact-label">GitHub</span>
              <a href="#" className="ss-contact-link">github.com/jaiki</a>
              <div className="ss-audio-indicator ss-small-indicator"></div>
            </div>
            
            <div 
              className="ss-contact-item ss-green-element"
              onMouseEnter={() => handleElementHover('twitter-contact', true, 'green')}
              onMouseLeave={() => handleElementHover('twitter-contact', false)}
              onClick={() => handleElementClick('twitter-contact', 'green')}
            >
              <span className="ss-contact-label">Twitter</span>
              <a href="#" className="ss-contact-link">@jaiki_dev</a>
              <div className="ss-audio-indicator ss-small-indicator"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  
  // Navigation with synesthetic elements
  const renderNavigation = () => {
    const navItems = [
      { id: 'hero', label: 'Home', color: 'blue' },
      { id: 'about', label: 'About', color: 'purple' },
      { id: 'skills', label: 'Skills', color: 'green' },
      { id: 'projects', label: 'Projects', color: 'orange' },
      { id: 'contact', label: 'Contact', color: 'red' }
    ];
    
    return (
      <nav className="ss-navigation">
        <ul className="ss-nav-list">
          {navItems.map((item, index) => (
            <li key={index} className="ss-nav-item">
              <a
                href={`#${item.id}`}
                className={`ss-nav-link ss-${item.color}-element ${activeSection === item.id ? 'ss-active' : ''}`}
                onMouseEnter={() => handleElementHover(`nav-${item.id}`, true, item.color)}
                onMouseLeave={() => handleElementHover(`nav-${item.id}`, false)}
                onClick={(e) => {
                  e.preventDefault();
                  handleElementClick(`nav-${item.id}`, item.color);
                  
                  // Smooth scroll to section
                  const section = document.getElementById(item.id);
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="ss-nav-text">{item.label}</span>
                <div className={`ss-nav-indicator ss-${item.color}-indicator ${activeSection === item.id ? 'ss-active' : ''}`}></div>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  // Audio control panel
  const renderAudioControls = () => (
    <div className="ss-audio-controls">
      <button 
        className={`ss-audio-toggle ${audioInitialized ? 'ss-audio-on' : 'ss-audio-off'}`}
        onClick={() => {
          if (audioInitialized) {
            // Toggle mute state
            if (Tone.context.state === 'running') {
              Tone.context.suspend();
            } else {
              Tone.context.resume();
            }
          } else {
            handleInitializeAudio();
          }
        }}
      >
        <span className="ss-audio-icon"></span>
        <span className="ss-audio-label">
          {audioInitialized ? 
            (Tone.context.state === 'running' ? 'Sound On' : 'Sound Off') : 
            'Enable Sound'}
        </span>
      </button>
    </div>
  );
  
  return (
    <div 
      className={`ss-sensory-synesthesia ${isAnimating ? 'ss-animating' : ''} ${audioInitialized ? 'ss-audio-initialized' : ''}`}
      onMouseMove={(e) => {
        // Additional subtle interaction based on mouse movement
        if (audioInitialized && Math.random() < 0.01) {
          const x = e.clientX / window.innerWidth;
          const note = Tone.Frequency('C2').transpose(Math.floor(x * 12)).toNote();
          pluckSynthRef.current.triggerAttackRelease(note, 0.1, undefined, 0.01);
        }
      }}
    >
      {renderNavigation()}
      {renderAudioControls()}
      
      <main className="ss-main">
        {renderHeroSection()}
        {renderAboutSection()}
        {renderSkillsSection()}
        {renderProjectsSection()}
        {renderContactSection()}
      </main>
      
      <div 
        className="ss-cursor-follower"
        style={{
          left: `${mousePosition.x * 100}%`,
          top: `${mousePosition.y * 100}%`
        }}
      ></div>
    </div>
  );
};

export default SensorySynesthesiaCanvas;