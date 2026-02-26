'use client';

import { useEffect, useState, useRef } from 'react';

interface TerminalTypingProps {
  text: string;
  speed?: number;
  className?: string;
}

/**
 * Terminal typing effect component with animated cursor
 * Displays text character by character with a blinking cursor
 */
export default function TerminalTyping({ text, speed = 100, className = '' }: TerminalTypingProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [hasError, setHasError] = useState(false);
  const textRef = useRef(text);

  // Reset if text changes
  useEffect(() => {
    if (textRef.current !== text) {
      textRef.current = text;
      setDisplayedText('');
      setCurrentIndex(0);
      setIsTyping(true);
      setHasError(false);
    }
  }, [text]);

  useEffect(() => {
    try {
      if (currentIndex < textRef.current.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev + textRef.current[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);

        return () => clearTimeout(timeout);
      } else {
        // Mark typing as complete
        setIsTyping(false);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error in TerminalTyping component:', error);
      }
      setHasError(true);
      setIsTyping(false);
    }
  }, [currentIndex, speed]);

  // Fallback rendering if error occurs
  if (hasError) {
    return <h1 className={className}>{text}</h1>;
  }

  return (
    <h1 className={`terminal-typing-container ${className}`}>
      <span className="terminal-text">{displayedText}</span>
      {isTyping && <span className="terminal-cursor">▋</span>}
    </h1>
  );
}
