import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CARD_CONFIG = [
  {
    src: '/assets/visa-folder/dusk-over-emerging-metropolis.png',
    x: -80,
    y: 24,
    rotate: -8,
    scale: 0.95,
    z: 1,
  },
  {
    src: '/assets/visa-folder/serene-thai-longtail-boat-at-karst-cliff-beach.png',
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    z: 2,
  },
  {
    src: '/assets/visa-folder/timeless-desert-expedition-to-the-great-pyramids.png',
    x: 80,
    y: 24,
    rotate: 8,
    scale: 0.95,
    z: 1,
  },
];

const FOLDER_SIZE = { width: 360, height: 220 };

const ExpandingCard = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center bg-[#f7f8f9]">
      {/* Top bubble */}
      <motion.div
        initial={false}
        animate={{
          y: expanded ? -120 : -30,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        className="absolute left-1/2 z-30"
        style={{
          top: "40%",
          transform: "translate(-50%, 0)",
          pointerEvents: "none",
        }}
      >
        <div className="bg-white shadow-md rounded-full px-6 py-2 text-sm flex items-center gap-1 font-medium border border-gray-200">
          <span>✓</span> Visa Tailandia <span className="text-blue-500">lista</span>
        </div>
      </motion.div>

      {/* Cards */}
      <div className="relative z-10" style={{ width: FOLDER_SIZE.width, height: FOLDER_SIZE.height }}>
        {CARD_CONFIG.map((card, i) => (
          <motion.img
            key={i}
            src={card.src}
            alt=""
            className="absolute rounded-2xl shadow-2xl object-cover"
            style={{
              width: FOLDER_SIZE.width,
              height: FOLDER_SIZE.height,
              top: 0,
              left: 0,
              zIndex: card.z,
            }}
            initial={false}
            animate={
              expanded
                ? {
                    x: card.x,
                    y: card.y,
                    rotate: card.rotate,
                    scale: card.scale,
                    filter: "brightness(1)",
                  }
                : {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    filter: i === 1 ? "brightness(1)" : "brightness(0.96)",
                  }
            }
            transition={{
              type: "spring",
              stiffness: 160,
              damping: 22,
              mass: 0.6,
            }}
          />
        ))}

        {/* Folder (top card) */}
        <motion.div
          className="absolute left-0 top-0 w-full h-full rounded-2xl bg-white shadow-xl flex items-center justify-center"
          style={{
            zIndex: 20,
            borderRadius: 24,
          }}
          initial={false}
          animate={{
            scale: expanded ? 1.02 : 1,
            boxShadow: expanded
              ? "0 8px 32px 0 rgba(36, 39, 58, 0.10), 0 1.5px 6px 0 rgba(36,39,58,0.06)"
              : "0 6px 32px 0 rgba(36, 39, 58, 0.10), 0 1.5px 6px 0 rgba(36,39,58,0.06)",
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 15,
          }}
        >
          <span className="text-lg font-medium text-[#232b3b]">Solicitudes de visa</span>
        </motion.div>
      </div>

      {/* Bottom bubble */}
      <motion.div
        initial={false}
        animate={{
          y: expanded ? 80 : 40,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        className="absolute left-1/2 z-30"
        style={{
          top: "60%",
          transform: "translate(-50%, 0)",
          pointerEvents: "none",
        }}
      >
        <div className="bg-white shadow-md rounded-full px-6 py-2 text-sm flex items-center gap-1 font-medium border border-gray-200">
          <span>✓</span> Completadas
        </div>
      </motion.div>

      {/* Toggle Button */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="absolute right-[20%] top-[30%] bg-white shadow border border-gray-200 px-6 py-2 rounded-full font-medium text-sm z-50"
      >
        {expanded ? "Contraer" : "Expandir"}
      </button>
    </div>
  );
};

export default ExpandingCard; 