import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExpandingCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Main folder/container variants
  const folderVariants = {
    collapsed: {
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
    expanded: {
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
        delayChildren: 0.2,
        staggerChildren: 0.08, // Slightly faster stagger for tighter animation
      },
    },
  };

  // Label variants
  const labelVariants = {
    initial: {
      opacity: 0,
      y: -10,
      zIndex: 40,
    },
    animate: {
      opacity: 1,
      y: -90,
      zIndex: 40,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        delay: 0.4, // Slightly earlier to match the tighter timing
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  // Card positions and rotations for the tight fan-out layout
  const cardVariants = [
    { // Left-Back Card
      x: -60,
      y: -30,
      rotate: -6,
      zIndex: 25,
    },
    { // Right-Back Card
      x: 60,
      y: -30,
      rotate: 6,
      zIndex: 24,
    },
    { // Bottom-Left Card
      x: -70,
      y: 60,
      rotate: -3,
      zIndex: 23,
    },
    { // Bottom-Right Card
      x: 70,
      y: 60,
      rotate: 3,
      zIndex: 22,
    },
  ];

  return (
    <div className="relative w-[800px] h-[500px] flex items-center justify-center">
      <motion.div
        className="relative"
        variants={folderVariants}
        initial="collapsed"
        animate={isExpanded ? 'expanded' : 'collapsed'}
      >
        {/* Main card - always visible */}
        <motion.div
          className="relative z-30 bg-white rounded-xl shadow-xl w-[220px] h-[150px] flex items-center justify-center cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ transformOrigin: 'center' }}
        >
          <span className="text-gray-600 font-medium">Solicitudes de visa</span>
        </motion.div>

        {/* Floating elements */}
        <AnimatePresence>
          {isExpanded && (
            <>
              {/* Label above */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-xl px-6 py-2"
                variants={labelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ transformOrigin: 'center' }}
              >
                <span className="text-lg font-medium whitespace-nowrap">Visa Tailandia lista</span>
              </motion.div>

              {/* Floating cards */}
              {cardVariants.map((variant, index) => (
                <motion.div
                  key={index}
                  className="absolute top-1/2 left-1/2 bg-white rounded-xl shadow-xl w-[120px] h-[90px]"
                  style={{ 
                    transformOrigin: 'center',
                    zIndex: variant.zIndex,
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    x: 0,
                    y: 0,
                    rotate: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: variant.x,
                    y: variant.y,
                    rotate: variant.rotate,
                    transition: {
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1], // Custom ease for smoother motion
                      delay: 0.2 + (index * 0.08),
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    x: 0,
                    y: 0,
                    rotate: 0,
                    transition: {
                      duration: 0.25,
                      ease: 'easeIn',
                    },
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ExpandingCard; 