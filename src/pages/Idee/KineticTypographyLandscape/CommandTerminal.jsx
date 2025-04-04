import React, { useState, useRef, useEffect } from 'react';

const CommandTerminal = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  
  // Available commands and their descriptions
  const availableCommands = {
    'help': 'Display a list of available commands',
    'ls': 'List all sections of the portfolio',
    'cd': 'Navigate to a specific section (e.g. cd about)',
    'contact': 'Initialize the contact form',
    'clear': 'Clear the terminal history',
    'about': 'Display information about Jaiki',
    'skills': 'Show skills and technologies',
    'projects': 'List featured projects',
    'social': 'Display social media links'
  };
  
  // Focus input when terminal is expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);
  
  // Toggle terminal expansion
  const toggleTerminal = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      // Add initial welcome message when opening
      if (commandHistory.length === 0) {
        setCommandHistory([
          {
            command: null,
            result: "Welcome to Jaiki's terminal. Type 'help' to see available commands."
          }
        ]);
      }
    }
  };
  
  // Handle input changes and generate suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Generate command suggestions
    if (value.trim()) {
      const matchedCommands = Object.keys(availableCommands).filter(cmd => 
        cmd.startsWith(value.split(' ')[0])
      );
      setSuggestions(matchedCommands);
    } else {
      setSuggestions([]);
    }
  };
  
  // Apply suggestion to input
  const applySuggestion = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
    inputRef.current.focus();
  };
  
  // Process command when Enter is pressed
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      processCommand(inputValue);
      setInputValue('');
      setSuggestions([]);
    } else if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      applySuggestion(suggestions[0]);
    } else if (e.key === 'Escape') {
      setIsExpanded(false);
    }
  };
  
  // Process entered command
  const processCommand = (command) => {
    const cmd = command.trim().toLowerCase();
    const cmdParts = cmd.split(' ');
    const mainCommand = cmdParts[0];
    let result = '';
    
    // Determine command result
    switch (mainCommand) {
      case 'help':
        result = Object.entries(availableCommands).map(([cmd, desc]) => 
          `${cmd.padEnd(10)} - ${desc}`
        ).join('\n');
        break;
        
      case 'ls':
        result = 'home\nabout\nskills\nprojects\ncontact';
        break;
        
      case 'cd':
        const section = cmdParts[1];
        if (!section) {
          result = 'Please specify a section: cd [section]';
        } else if (['home', 'about', 'skills', 'projects', 'contact'].includes(section)) {
          result = `Navigating to ${section} section...`;
          // In a full implementation, this would trigger the navigation
        } else {
          result = `Section '${section}' not found`;
        }
        break;
        
      case 'clear':
        setCommandHistory([]);
        return;
        
      case 'about':
        result = 'Jaiki is a full-stack developer with 5 years of experience.\nSpecializing in React, Node.js, and creating immersive digital experiences.';
        break;
        
      case 'skills':
        result = 'React - ███████████ 90%\nNode.js - ██████████ 85%\nTypeScript - ████████ 80%\nGraphQL - ███████ 75%\nMongoDB - ██████ 70%';
        break;
        
      case 'projects':
        result = 'Quantum Code - High-performance React component library\nNeural Navigator - AI-powered code completion tool\nVoid Ventures - Interactive 3D portfolio for a digital agency';
        break;
        
      case 'social':
        result = 'GitHub: github.com/jaiki\nLinkedIn: linkedin.com/in/jaiki\nTwitter: twitter.com/jaiki';
        break;
        
      case 'contact':
        result = 'Initializing contact form...';
        // In a full implementation, this would show the contact section
        break;
        
      default:
        result = `Command not found: ${mainCommand}. Type 'help' to see available commands.`;
    }
    
    // Add command and result to history
    setCommandHistory(prevHistory => [
      ...prevHistory,
      {
        command: cmd,
        result: result
      }
    ]);
  };
  
  return (
    <div className={`command-terminal-ktl ${isExpanded ? 'expanded' : ''}`}>
      <div className="terminal-input-container-ktl" onClick={toggleTerminal}>
        <span className="terminal-prefix-ktl">$</span>
        <input
          ref={inputRef}
          type="text"
          className="terminal-input-ktl"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={isExpanded ? "type a command..." : "click to open terminal"}
          disabled={!isExpanded}
        />
      </div>
      
      {isExpanded && (
        <div className="terminal-history-ktl">
          {commandHistory.map((item, index) => (
            <div key={index} className="terminal-output-ktl">
              {item.command && (
                <div className="terminal-output-command-ktl">
                  $ {item.command}
                </div>
              )}
              <div className="terminal-output-result-ktl">
                {item.result.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          ))}
          
          {suggestions.length > 0 && (
            <div className="autocomplete-suggestions-ktl">
              {suggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className="autocomplete-suggestion-ktl"
                  onClick={() => applySuggestion(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommandTerminal;