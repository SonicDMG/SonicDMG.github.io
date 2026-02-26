'use client';

import Link from 'next/link';

interface HandDrawnAnnotationProps {
  /** Position of the annotation relative to its container */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  /** Custom className for additional styling */
  className?: string;
  /** Scale factor for responsive sizing (default: 1) */
  scale?: number;
  /** Rotation angle in degrees for hand-drawn effect (default: -5) */
  rotation?: number;
}

export default function HandDrawnAnnotation({
  position = 'top-right',
  className = '',
  scale = 1,
  rotation = -5,
}: HandDrawnAnnotationProps) {
  // Position classes mapping
  const positionClasses = {
    'top-left': 'top-0 left-0 -translate-x-1/4 -translate-y-1/2',
    'top-right': 'top-0 right-0 translate-x-1/4 -translate-y-1/2',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/4 translate-y-1/2',
    'bottom-right': 'bottom-0 right-0 translate-x-1/4 translate-y-1/2',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <Link
      href="https://codebeasts.ai/"
      target="_blank"
      rel="noopener noreferrer"
      className={`hand-drawn-annotation absolute ${positionClasses[position]} ${className}`}
      style={{
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: 'center',
      }}
      aria-label="Create your own CodeBeast at codebeasts.ai"
    >
      <svg
        width="280"
        height="180"
        viewBox="0 0 280 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hand-drawn-svg"
      >
        {/* Hand-drawn text: "Create your own!" */}
        <g className="annotation-text">
          <text
            x="20"
            y="45"
            fill="#00CED1"
            fontSize="28"
            fontWeight="bold"
            fontFamily="'Comic Sans MS', 'Marker Felt', cursive"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
          >
            Create your
          </text>
          <text
            x="20"
            y="75"
            fill="#00CED1"
            fontSize="28"
            fontWeight="bold"
            fontFamily="'Comic Sans MS', 'Marker Felt', cursive"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
          >
            own!
          </text>
          {/* Exclamation sparkle */}
          <text
            x="85"
            y="75"
            fill="#FFD700"
            fontSize="32"
            fontWeight="bold"
          >
            ✨
          </text>
        </g>

        {/* Hand-drawn arrow pointing right toward image */}
        <g className="annotation-arrow">
          {/* Arrow shaft with wobble - more horizontal */}
          <path
            d="M 140 85 Q 155 87 170 85 Q 185 83 200 85 Q 215 87 230 85 Q 245 83 260 85"
            stroke="#FFD700"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Arrow head pointing right */}
          <path
            d="M 260 85 L 250 80 M 260 85 L 250 90"
            stroke="#FFD700"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Extra emphasis lines (hand-drawn style) */}
          <path
            d="M 142 87 Q 157 89 172 87 Q 187 85 202 87"
            stroke="#FFD700"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>

        {/* Decorative stars/sparkles */}
        <g className="annotation-sparkles">
          <path
            d="M 215 25 L 217 30 L 222 28 L 218 32 L 220 37 L 215 34 L 210 37 L 212 32 L 208 28 L 213 30 Z"
            fill="#FFD700"
            opacity="0.8"
          />
          <path
            d="M 85 80 L 86 83 L 89 82 L 87 85 L 88 88 L 85 86 L 82 88 L 83 85 L 81 82 L 84 83 Z"
            fill="#00CED1"
            opacity="0.7"
          />
          <path
            d="M 200 150 L 201 152 L 203 151 L 202 153 L 203 155 L 200 154 L 198 155 L 199 153 L 197 151 L 199 152 Z"
            fill="#00CED1"
            opacity="0.7"
          />
        </g>
      </svg>

      <style jsx>{`
        .hand-drawn-annotation {
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          pointer-events: auto;
        }

        .hand-drawn-annotation:hover {
          transform: scale(${scale * 1.1}) rotate(${rotation - 2}deg) !important;
        }

        .hand-drawn-svg {
          filter: drop-shadow(0 0 8px rgba(0, 206, 209, 0.4))
                  drop-shadow(0 0 12px rgba(255, 215, 0, 0.3));
          transition: filter 0.3s ease;
        }

        .hand-drawn-annotation:hover .hand-drawn-svg {
          filter: drop-shadow(0 0 12px rgba(0, 206, 209, 0.6))
                  drop-shadow(0 0 18px rgba(255, 215, 0, 0.5))
                  drop-shadow(0 0 24px rgba(0, 206, 209, 0.4));
          animation: annotation-pulse 1.5s ease-in-out infinite;
        }

        @keyframes annotation-pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.85;
          }
        }

        /* Responsive scaling */
        @media (max-width: 768px) {
          .hand-drawn-annotation {
            transform: scale(${scale * 0.7}) rotate(${rotation}deg) !important;
          }
          
          .hand-drawn-annotation:hover {
            transform: scale(${scale * 0.75}) rotate(${rotation - 2}deg) !important;
          }
        }

        @media (max-width: 480px) {
          .hand-drawn-annotation {
            transform: scale(${scale * 0.5}) rotate(${rotation}deg) !important;
          }
          
          .hand-drawn-annotation:hover {
            transform: scale(${scale * 0.55}) rotate(${rotation - 2}deg) !important;
          }
        }
      `}</style>
    </Link>
  );
}

// Made with Bob
