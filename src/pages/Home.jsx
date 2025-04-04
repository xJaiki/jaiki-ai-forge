import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

// Style showcase configuration
const styleShowcase = [
  {
    name: 'Kinetic Typography Landscape',
    path: '/KineticTypographyLandscape',
    prompt: `Create a Kinetic Typography Landscape landing page for Jaiki, a full-stack developer specializing in React and Node.js. 
      The page should feature a full-screen typographic experience where text itself becomes the interface.

      Color palette:
      - Background: #0A0E17 (deep space black)
      - Primary text: #E2E8F0 (off-white)
      - Accent colors: #00FFAA (neon green), #FF3366 (hot pink), #3A86FF (electric blue)

      Typography:
      - Code elements: JetBrains Mono
      - Headings: Space Grotesk (extra bold)
      - Body text: Inter (light)

      Layout:
      - The main headline "JAIKI.DEV" should dominate the center screen initially at 15rem size, floating in 3D space.
      - Large typography elements form an interactive landscape that users can navigate.

      Components:
      1. Hero section: Featuring Jaiki's name and title with floating code snippets that respond to mouse movement using 3D transforms.
      2. About section: Biography text that assembles letter by letter as if being typed in real-time.
      3. Skills section: Programming languages and technologies represented as terminal commands that expand to show proficiency levels when clicked.
      4. Projects section: Project cards that appear to be floating in space, with glitch effects on hover.
      5. Contact section: Form fields that emerge from a command line interface.

      Interactions:
      - Text elements should subtly float and rotate based on cursor position using mouse parallax effects.
      - Navigation should work through clickable "command" text that triggers dramatic text transformation animations between sections.
      - Implement a terminal-like experience where users can "type" commands to navigate (with auto-complete suggestions).

      Animations:
      - Text should have subtle constant movement, simulating floating in space.
      - Transitions between sections should involve text disassembling and reassembling.
      - Implement glitch effects on key interactions using CSS animations.
      - Use GSAP for smooth animation sequencing.

      The landing page should position Jaiki as an innovative full-stack developer with 5 years of experience, 
      specializing in building high-performance web applications.`,
    description: 'An interactive landscape of typography-driven UI with glitch and floating text effects'
  },
  {
    name: 'Wireframe Deconstruction',
    path: '/wireframedeconstruction',
    prompt: `Create a Wireframe Deconstruction landing page for Jaiki, a frontend developer and UI engineer. 
      The page should expose its underlying structure, revealing grids, component boundaries, and structural annotations.

      Color palette:
      - Background: #FFFFFF (white) with subtle grid patterns
      - Primary structure lines: #000000 (black)
      - Secondary guides: #CCCCCC (light gray)
      - Accent color: #0066FF (electric blue)
      - Highlight color: #FF3300 (bright red for annotations and focus states)
      - Text: #000000 (black)

      Typography:
      - UI annotations: JetBrains Mono (light)
      - Headings: IBM Plex Sans (extra bold) with visible baseline guides
      - Body text: Inter (regular) with character spacing measurements
      - All text should include at least one visible typographic measurement

      Components:
      1. Hero blueprint: A header area with Jaiki's name and title, showing visible measurement lines and grid coordinates
      2. Component library: A section displaying Jaiki's skills as a collection of UI components in various states of construction
      3. Project wireframes: Portfolio items presented as annotated wireframes with functional hotspots
      4. Process flowchart: A visual representation of Jaiki's development methodology shown as a system diagram
      5. Contact interface: A form with visible input boundaries, validation zones, and interaction states

      Interactions:
      - Elements should reveal their structure and boundaries on hover
      - Include "inspection mode" toggles that show additional information about components
      - Design navigation that displays the full site map in an abstract representation
      - Add interactive elements that show their possible states simultaneously
      - Implement form elements that display their validation parameters

      Animations:
      - Components should assemble from wireframe to complete state when entering the viewport
      - Use animations that reveal measurement guidelines before completing
      - Transitions between sections should show restructuring of the layout grid
      - Include animated annotations that measure or mark up elements
      - Add blueprint-style drawing animations for decorative elements

      The landing page should position Jaiki as a meticulous frontend developer focused on design systems, 
      component architecture, and the intersection of design and development.`,
    description: 'Exposed grids, wireframes, and measurement guides as a visual aesthetic'
  },
  {
    name: 'Sensory Synesthesia Canvas',
    path: '/SensorySynesthesiaCanvas',
    prompt: `Create a Sensory Synesthesia Canvas landing page for a digital artist and experimental web designer. 
        The page should integrate audiovisual interactions where visual elements respond to user actions by generating corresponding sound frequencies and timbres. 
        Treat the interface as an instrument where every interaction contributes to a personalized composition.
  
        Color palette:
        - Background: soft black (#101010) or warm off-white (#F8F8F8)
        - Blues trigger bell-like tones
        - Oranges produce warm string sounds
        - Reds evoke deep percussive hits
  
        Typography:
        - Headings: bold sans-serif with deep, resonant tones on hover
        - Body text: clean sans-serif with subtle audio feedback
        - Font sizes and weights should correspond to sonic depth and intensity
  
        Components:
        1. Hero section: Interactive typography that responds to cursor movement with audio modulation.
        2. Portfolio gallery: Each thumbnail emits a unique sound as users hover, with animations synchronized to sound waves.
        3. About section: Text appearing in rhythmic sequences with corresponding melodic phrasing.
        4. Interactive sound map: Users can explore different UI elements by creating harmonious sound compositions.
        5. Contact interface: Form fields generate soft tonal cues as users input information.
  
        Interactions:
        - Clicking on elements should produce both a visual and audio reaction.
        - Navigation uses both sound cues and visual indicators to guide the user.
        - Users can create dynamic sound paths through different sections.
  
        Animations:
        - Transitions follow musical phrasing rather than standard mechanical animations.
        - Sound-reactive elements subtly shift and modulate based on user interaction.
        - Background visuals may oscillate or pulse in response to ambient audio layers.
  
        The landing page should feel like an immersive synesthetic experience, making the user’s journey a fluid interplay of visuals and sound.`,
    description: 'An immersive audiovisual web experience where interactions generate both visual and sonic responses, creating a dynamic synesthetic journey.'
  },
  {
    name: 'Parallel Universe Navigation',
    path: '/paralleluniversenavigation',
    prompt: `Create a Parallel Universe Navigation landing page for Jaiki, a developer specializing in multimodal interfaces and experimental browsing paradigms. 
        The page should present multiple simultaneous versions of content that users can navigate between like parallel dimensions, creating a dynamic multidimensional experience.
  
        Color palette:
        - Each reality stream has its own distinct color identity:
          - Technical Universe: Blues and cyans (#0B3D91, #1E88E5)
          - Creative Universe: Purples and magentas (#9C27B0, #D81B60)
          - Personal Universe: Warm oranges and reds (#FF9800, #F44336)
          - Conceptual Universe: Greens and teals (#00897B, #43A047)
        - Active/focused content: Fully saturated colors
        - Inactive/background realities: Desaturated versions of the same colors
        - Universal elements: #FFFFFF (white) and #212121 (near black)
  
        Typography:
        - Each reality has a distinctive but compatible typeface:
          - Technical Universe: Roboto Mono (technical, precise)
          - Creative Universe: Playfair Display (expressive, artistic)
          - Personal Universe: Outfit (friendly, approachable)
          - Conceptual Universe: Space Grotesk (modern, thoughtful)
  
        Interface structure:
        - Design 4 parallel "reality streams" arranged in a customizable grid layout
        - Create a persistent "dimension controller" that manages focus between realities
        - Implement a "reality map" showing the multidimensional structure
        - Develop smooth transitions for reality-shifting interactions
  
        Components:
        1. Reality Streams: 4 parallel continuous flows of content that coexist simultaneously
        2. Dimension Controller: An interactive element that lets users shift focus between realities
        3. Reality Blender: A system for combining elements from multiple streams
        4. Interdimensional Links: Connections that highlight related content across realities
        5. Reality Map: A meta-navigation showing the multidimensional structure
  
        Interactions:
        - Implement smooth "reality shifting" that changes focus between streams
        - Create "element pulling" where users can drag content from one reality to another
        - Design "reality merging" that combines compatible streams into hybrid views
        - Develop "focus locking" that temporarily maximizes one reality while keeping others accessible
        - Add "reality scrubbing" where users can slide between different dimensional states
        - Include "reality bookmarking" to save specific multidimensional configurations
  
        Animations:
        - Smooth transitions as focus shifts between reality streams
        - Scale, opacity, and saturation changes to indicate dimensional prominence
        - Fluid animations when elements cross between realities
        - Particle effects or energy trails to visualize dimensional boundaries
        - Subtle ambient movements within each reality to give them a sense of life
  
        Special features:
        - Each reality should contain complete but different information about Jaiki
        - The system should suggest cross-dimensional connections based on current focus
        - Implement a "reality collapse" option that provides a more traditional view for accessibility
        - Create "dimensional echoes" where certain important elements appear across multiple realities
  
        The landing page should position Jaiki as a developer fascinated by multimodal experiences and parallel processing, 
        highlighting his work in creating interfaces that break free from linear navigation and allow users to explore multiple content dimensions simultaneously.`,
    description: 'A multidimensional interface where users navigate between parallel content realities, blending, merging, and shifting focus dynamically.'
  }, {
    name: 'Tactile Material Layers',
    path: '/TactileMaterialLayers',
    prompt: `Create a Tactile Material Layers landing page for Jaiki, a developer who balances technical expertise with an appreciation for craftsmanship and tangible quality. 
        The page should feature a layered design that mimics real-world materials, emphasizing depth, texture, and physical interactions.
  
        Color palette and materials:
        - Paper layer: #F2F0E6 (warm cream) with subtle fiber texture
        - Metal layer: #D9D9E3 (cool silver) with brushed aluminum effect
        - Glass layer: #F5FBFF (transparent blue-white) with subtle frosting and reflections
        - Wood layer: #A87B59 to #D8B897 gradient with subtle grain texture
        - Accent elements: #3A5199 (indigo) and #D14C3A (vermilion) for interactive elements
        - Shadows: #232323 with varying opacity and blur based on material properties
  
        Typography:
        - Paper sections: Alegreya (serif) with slightly irregular edges suggesting letterpress
        - Metal sections: Manrope (geometric sans) with sharp, precise edges
        - Glass sections: Work Sans (light) with high clarity and contrast
        - Wood sections: Fraunces (organic serif) with natural weight variation
  
        Layout:
        - Design a composition with distinct material layers that:
          - Overlap with appropriate depth and shadows
          - Maintain physical plausibility in arrangement
          - Create a harmonious overall composition despite different textures
          - Use physical properties to establish visual hierarchy
  
        Components:
        1. Paper Profile: Biography and personal details on textured paper with subtle edge curling
        2. Metal Skill Plates: Technical capabilities presented on brushed metal surfaces
        3. Glass Project Showcases: Work examples displayed on translucent glass panels
        4. Wooden Navigation Elements: Menu items and directional controls with natural grain
        5. Fabric Contact Section: Communication channels presented on textured fabric
  
        Interactions:
        - Implement physically plausible movements for different materials
        - Create "lift" effects where layers raise on hover to show depth
        - Design "slide" interactions where panels move with appropriate resistance
        - Add subtle material reactions to cursor proximity (paper slightly curling, glass reflecting)
        - Include material-appropriate sound effects (optional) for interactions
  
        Animations:
        - Materials should react to interaction with physically accurate behaviors
        - Implement subtle ambient movements (paper gently settling, light playing on glass)
        - Create smooth transitions between different material focus states
        - Design reveal animations that respect physical properties of each material
        - Add micro-interactions that enhance the tactile quality of each surface
  
        The landing page should position Jaiki as a developer who values both technical excellence and craftsmanship, 
        highlighting his attention to detail and ability to create digital experiences with tangible quality and thoughtful implementation.`,
    description: 'A layered interface inspired by real-world materials, using depth, texture, and physical interactions to create a highly tactile digital experience.'
  },
  {
    name: 'Chronological Layering',
    path: '/chronologicallayering',
    prompt: 'generate a .jsx landing page for a developer known as Jaiki online in this style: Present content in transparent layers with time-based navigation instead of traditional spatial navigation. Use vertical stacking with variable transparency based on temporal relevance. Implement temporal color coding—cooler tones for past content, warmer for present, vibrant for future elements. Include dial-based navigation allowing users to "tune in" to different time layers. Font weights should change based on chronological position, with newer content appearing bolder. The experience should feel like moving through time rather than space.',
    description: 'Time-based layered navigation with temporal color coding'
  },

];

const Home = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const openPrompt = (prompt) => {
    setSelectedPrompt(prompt);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closePrompt = () => {
    setSelectedPrompt(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Brutalist Typography Header */}
        <header className="mb-16">
          <h1 className="text-5xl font-bold tracking-tight mb-3 font-mono text-black">AI STYLE INDEX <span className="text-xs font-mono text-gray-500">v1.0425</span></h1>
          <p className="text-lg font-mono text-black border-t border-b border-black py-2">
            A CATALOG OF AI-GENERATED REACT TAILWIND DESIGNS
          </p>
          <p className="mt-4 text-sm font-mono text-gray-700">
            This is an index of React Tailwind websites completely generated by AI. Every style, prompt, content, and line of code was created by Claude 3.7 Sonnet with thinking mode enabled. The only human contribution was copying, pasting, and integrating the components, as well as writing this description. Any visual glitches or inconsistencies are intentional parts of the experience - don't expect everything to function perfectly. This project showcases the raw, unedited output of AI-generated web design. Click on the buttons to explore the styles and view the prompts that created them.
          </p>
          <p className="mt-4 text-xs font-mono text-gray-700">
            <span className="font-bold">NOTE:</span> Also this brutalist index page is made with Claude :]
          </p>
        </header>

        {/* Style List - Brutalist Typography */}
        <ul className="space-y-12 font-mono">
          {styleShowcase.map((style, index) => (
            <li key={style.path} className="border-t border-black pt-6">
              <div className="grid grid-cols-12 gap-4">
                {/* Style Number */}
                <div className="col-span-2 md:col-span-1">
                  <span className="text-5xl font-bold">{String(index + 1).padStart(2, '0')}</span>
                </div>

                {/* Style Content */}
                <div className="col-span-10 md:col-span-11">
                  <h2 className="text-2xl uppercase font-bold mb-2">{style.name}</h2>
                  <p className="mb-4">{style.description}</p>

                  <div className="flex flex-wrap gap-3 mt-6">
                    <button
                      onClick={() => openPrompt(style.prompt)}
                      className="bg-black text-white px-4 py-2 hover:bg-gray-800"
                    >
                      VIEW PROMPT
                    </button>

                    <Link
                      to={style.path}
                      className="bg-white text-black border border-black px-4 py-2 hover:bg-black hover:text-white"
                    >
                      EXPLORE STYLE
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <footer className="mt-16 pt-4 border-t border-black text-xs font-mono">
          <p>ALL STYLES GENERATED VIA AI PROMPT ENGINEERING — {new Date().getFullYear()}</p>
        </footer>
      </div>

      {/* Prompt Modal */}
      {selectedPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={closePrompt}>
          <div
            className="bg-white max-w-2xl max-h-[80vh] overflow-auto p-8 font-mono"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold uppercase">AI PROMPT</h3>
              <button onClick={closePrompt} className="text-black hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <p className="whitespace-pre-line">{selectedPrompt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;