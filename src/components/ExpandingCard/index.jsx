import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExpandingCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerVariants = {
    collapsed: {
      width: '200px',
      height: '120px',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    expanded: {
      width: '600px',
      height: '300px',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    collapsed: (index) => ({
      x: 0,
      y: -10 * (index + 1),
      rotate: index % 2 === 0 ? -3 : 3,
      scale: 0.95,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }),
    expanded: (index) => ({
      x: [-80, 80, -60, 60][index],
      y: [-20, -20, 20, 20][index],
      rotate: [-6, 6, -3, 3][index],
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    })
  };

  const labelVariants = {
    initial: { opacity: 0, y: 0 },
    animate: { 
      opacity: 1, 
      y: -40,
      transition: {
        delay: 0.3,
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="relative w-[800px] h-[500px] flex items-center justify-center">
      <motion.div
        className="relative"
        variants={containerVariants}
        initial="collapsed"
        animate={isExpanded ? 'expanded' : 'collapsed'}
      >
        {/* Background cards that peek out */}
        <AnimatePresence>
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="absolute top-0 left-0 bg-white rounded-xl shadow-md w-full h-full"
              custom={index}
              variants={cardVariants}
              initial="collapsed"
              animate={isExpanded ? 'expanded' : 'collapsed'}
              style={{ zIndex: 10 + index }}
            />
          ))}

          {/* Label */}
          {isExpanded && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-sm px-4 py-2"
              variants={labelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ zIndex: 20 }}
            >
              <span className="text-sm font-medium">Visa Tailandia lista</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main visible card */}
        <motion.div
          className="relative bg-white rounded-xl shadow-lg w-full h-full flex items-center justify-center cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ zIndex: 15 }}
        >
          <span className="text-gray-600 font-medium">Solicitudes de visa</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ExpandingCard; 