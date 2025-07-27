import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExpandingCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Image cards data with exact positioning from Figma
  const imageCards = [
    {
      src: '/assets/visa-folder/dusk-over-emerging-metropolis.png',
      initialStyle: { top: '-15px', left: '-10px', rotate: '-10deg', scale: 0.98 },
      expandedStyle: { top: '-30px', left: '-60px', rotate: '-15deg', scale: 1 }
    },
    {
      src: '/assets/visa-folder/serene-thai-longtail-boat-at-karst-cliff-beach.png',
      initialStyle: { top: '-10px', left: '-5px', rotate: '-5deg', scale: 0.98 },
      expandedStyle: { top: '-20px', left: '-30px', rotate: '-8deg', scale: 1 }
    },
    {
      src: '/assets/visa-folder/visa-doc-3.jpg',
      initialStyle: { top: '-5px', left: '5px', rotate: '5deg', scale: 0.98 },
      expandedStyle: { top: '-20px', left: '30px', rotate: '8deg', scale: 1 }
    },
    {
      src: '/assets/visa-folder/visa-doc-4.jpg',
      initialStyle: { top: '-10px', left: '10px', rotate: '10deg', scale: 0.98 },
      expandedStyle: { top: '-30px', left: '60px', rotate: '15deg', scale: 1 }
    }
  ];

  return (
    <div className="relative w-[800px] h-[500px] flex items-center justify-center">
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

        {/* Main Card */}
        <motion.div
          className="relative bg-white rounded-xl flex items-center justify-center cursor-pointer"
          style={{
            width: '220px',
            height: '150px',
            zIndex: 10,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
          }}
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <h2 className="text-xl font-medium text-gray-800">
            Solicitudes de visa
          </h2>
        </motion.div>

        {/* Status Labels */}
        <AnimatePresence>
          {isExpanded && (
            <>
              {/* Top Label - Visa Status */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 bg-white rounded-full px-4 py-1.5"
                style={{
                  top: '-40px',
                  zIndex: 20,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
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
                className="absolute bottom-[-25px] left-1/2 -translate-x-1/2 flex items-center gap-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                  delay: 0.3
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