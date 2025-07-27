import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExpandingCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Background cards with exact Figma positioning
  const imageCards = [
    {
      src: '/assets/visa-folder/dusk-over-emerging-metropolis.png',
      initialStyle: { top: '-12px', left: '-8px', rotate: '-8deg', scale: 0.98 },
      expandedStyle: { top: '-30px', left: '-55px', rotate: '-12deg', scale: 1.05 }
    },
    {
      src: '/assets/visa-folder/serene-thai-longtail-boat-at-karst-cliff-beach.png',
      initialStyle: { top: '-15px', left: '0px', rotate: '0deg', scale: 0.98 },
      expandedStyle: { top: '-40px', left: '0px', rotate: '0deg', scale: 1.05 }
    },
    {
      src: '/assets/visa-folder/timeless-desert-expedition-to-the-great-pyramids.png',
      initialStyle: { top: '-12px', left: '8px', rotate: '8deg', scale: 0.98 },
      expandedStyle: { top: '-30px', left: '55px', rotate: '12deg', scale: 1.05 }
    }
  ];

  // Document overlays (visa and stamp) with Figma positioning
  const documentOverlays = [
    {
      src: '/assets/visa-folder/thai-stamp.png',
      style: { top: '-55px', left: '-25px', rotate: '-12deg', scale: 0.9, zIndex: 16 }
    },
    {
      src: '/assets/visa-folder/thai-visa-doc.png',
      style: { top: '-30px', right: '-10px', rotate: '2deg', scale: 0.85, zIndex: 15 }
    }
  ];

  return (
    <div className="relative w-[800px] h-[500px] flex items-center justify-center font-inter">
      <div className="relative">
        {/* Background Image Cards */}
        {imageCards.map((card, index) => (
          <motion.div
            key={index}
            className="absolute rounded-xl overflow-hidden shadow-lg"
            style={{
              width: '220px',
              height: '150px',
              zIndex: index + 1,
            }}
            initial={card.initialStyle}
            animate={isExpanded ? card.expandedStyle : card.initialStyle}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
              delay: index * 0.08
            }}
          >
            <img
              src={card.src}
              alt="Destination"
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}

        {/* Document Overlays (Visa & Stamp) */}
        <AnimatePresence>
          {isExpanded && documentOverlays.map((doc, index) => (
            <motion.img
              key={`doc-${index}`}
              src={doc.src}
              className="absolute drop-shadow-md"
              style={{
                width: 'auto',
                height: '80px',
                ...doc.style
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
                delay: 0.2 + (index * 0.1)
              }}
            />
          ))}
        </AnimatePresence>

        {/* Main Folder Card */}
        <motion.div
          className="relative bg-white rounded-xl flex items-center justify-center cursor-pointer overflow-hidden"
          style={{
            width: '220px',
            height: '150px',
            zIndex: 10,
          }}
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            transition: { duration: 0.2 }
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {/* Folder Tab */}
          <div 
            className="absolute top-0 left-4 w-12 h-3 bg-white rounded-t-lg shadow-sm"
            style={{ transform: 'translateY(-25%)', zIndex: 11 }}
          />
          <div className="absolute inset-0 bg-white shadow-lg rounded-xl" style={{ zIndex: 10 }} />
          <h2 className="relative text-xl font-medium text-gray-800" style={{ zIndex: 12 }}>
            Solicitudes de visa
          </h2>
        </motion.div>

        {/* Status Labels */}
        <AnimatePresence>
          {isExpanded && (
            <>
              {/* Top Label - Visa Status */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 bg-white rounded-full px-4 py-1.5 shadow-sm"
                style={{
                  top: '-45px',
                  zIndex: 20,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                  delay: 0.2
                }}
              >
                <span className="text-sm font-medium">
                  ✓ Visa Tailandia <span className="text-blue-600 underline">lista</span>
                </span>
              </motion.div>

              {/* Bottom Label - Completed Status */}
              <motion.div
                className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 flex items-center gap-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  delay: 0.4
                }}
              >
                <span className="text-sm font-medium text-blue-600">
                  ✓ Completadas
                </span>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExpandingCard; 