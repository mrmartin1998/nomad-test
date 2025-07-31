import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExpandingCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Card configuration for initial state
  const cards = [
    {
      src: '/assets/visa-folder/dusk-over-emerging-metropolis.png',
      initialStyle: { x: -2, y: -1, rotate: '-0.8deg', scale: 0.998, opacity: 0.7 },
      expandedStyle: { x: -32, y: 4, rotate: '-2.25deg', scale: 0.985, opacity: 1 }
    },
    {
      src: '/assets/visa-folder/serene-thai-longtail-boat-at-karst-cliff-beach.png',
      initialStyle: { x: 2, y: -0.5, rotate: '0.5deg', scale: 0.999, opacity: 0.85 },
      expandedStyle: { x: -8, y: 0, rotate: '-0.5deg', scale: 0.995, opacity: 1 }
    },
    {
      src: '/assets/visa-folder/timeless-desert-expedition-to-the-great-pyramids.png',
      initialStyle: { x: -1, y: 0, rotate: '-0.3deg', scale: 1, opacity: 1 },
      expandedStyle: { x: 24, y: 4, rotate: '2.25deg', scale: 0.985, opacity: 1 }
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
      <div className="relative w-[260px]">
        {/* Background Cards */}
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="absolute top-0 left-1/2 rounded-[20px] overflow-hidden"
            style={{
              width: '260px',
              height: '175px',
              zIndex: i,
              transformOrigin: 'center bottom',
              pointerEvents: 'none',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
            }}
            initial={card.initialStyle}
            animate={isExpanded ? card.expandedStyle : card.initialStyle}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 24,
              mass: 0.8,
              delay: i * 0.08
            }}
          >
            <img 
              src={card.src}
              alt=""
              className="w-full h-full object-cover"
              style={{
                transform: 'translateX(-50%)',
                opacity: card.initialStyle.opacity
              }}
            />
          </motion.div>
        ))}

        {/* Main Folder Card */}
        <motion.div
          className="absolute top-0 left-1/2 z-10 bg-white rounded-[20px] cursor-pointer"
          style={{
            width: '260px',
            height: '175px',
            transform: 'translateX(-50%)',
            transformOrigin: 'center bottom',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
          }}
          initial={{ scale: 1 }}
          animate={{
            scale: isExpanded ? 1 : 1,
            y: isExpanded ? -8 : 0
          }}
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.12)',
            transition: { duration: 0.2 }
          }}
        >
          {/* Folder Tab */}
          <div 
            className="absolute bg-white" 
            style={{ 
              width: '46px',
              height: '12px',
              top: '-12px',
              left: '18px',
              borderRadius: '10px 10px 0 0',
              zIndex: 11,
              boxShadow: '0 -1px 6px rgba(0,0,0,0.06)'
            }} 
          />
          
          {/* Title at bottom */}
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center">
            <h2 
              className="text-[20px] text-gray-800"
              style={{
                fontFamily: 'Product Sans, Inter, sans-serif',
                fontWeight: '450',
                letterSpacing: '-0.2px'
              }}
            >
              Solicitudes de visa
            </h2>
          </div>
        </motion.div>

        {/* Overlays - Only show when expanded */}
        <AnimatePresence>
          {isExpanded && (
            <>
              {/* Thai Visa Document */}
              <motion.img
                src="/assets/visa-folder/thai-visa-doc.png"
                className="absolute w-[92px] z-20"
                style={{
                  bottom: '28px',
                  right: '24px',
                  transform: 'rotate(6deg)'
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{
                  type: 'tween',
                  duration: 0.3,
                  delay: 0.35
                }}
              />

              {/* Thai Stamp */}
              <motion.img
                src="/assets/visa-folder/thai-stamp.png"
                className="absolute w-[42px] z-20"
                style={{
                  bottom: '18px',
                  left: '12px',
                  transform: 'rotate(-8deg)'
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{
                  type: 'tween',
                  duration: 0.3,
                  delay: 0.4
                }}
              />

              {/* Status Labels */}
              <motion.div
                className="absolute left-1/2 z-30 bg-white/70 backdrop-blur-sm shadow-sm"
                style={{
                  top: '-36px',
                  transform: 'translateX(-50%)',
                  padding: '5px 14px',
                  borderRadius: '9999px',
                  fontSize: '15px',
                  fontFamily: 'Product Sans, Inter, sans-serif',
                  fontWeight: '400'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 24,
                  delay: 0.45
                }}
              >
                <span>
                  ✓ Visa Tailandia <span className="text-blue-600">lista</span>
                </span>
                <div
                  className="absolute w-0 h-0 border-l-[5px] border-r-[5px] border-b-[6px] border-transparent border-b-white/70"
                  style={{
                    bottom: '-5px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                />
              </motion.div>

              <motion.div
                className="absolute z-30"
                style={{
                  bottom: '-32px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '13px',
                  fontFamily: 'Product Sans, Inter, sans-serif'
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                whileHover={{ y: -2 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 24,
                  delay: 0.5
                }}
              >
                <span className="text-blue-600">✓ Completadas</span>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExpandingCard; 