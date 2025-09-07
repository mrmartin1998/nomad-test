import { useEffect, useRef, useState } from "react";

/** 360×208 comp area */
const W = 360;
const H = 208;

/** Extra vertical room so cards can poke out */
const BLEED_TOP = 64;
const BLEED_BOTTOM = 12;

/** Assets */
const FRONT_SRC       = "/assets/visa-folder/folder-white-blur.png";
const RIGHT_CARD_SRC  = "/assets/visa-folder/card-left-dessert.png";
const MIDDLE_CARD_SRC = "/assets/visa-folder/card-middle-boat.png";
const LEFT_CARD_SRC   = "/assets/visa-folder/card-left-city.png";
const BACK_SRC        = "/assets/visa-folder/card-bg-light.png";

/* -------------------- FRAME 1 (locked baseline) -------------------- */
const RIGHT_F1  = { size: 206, x: 127,  y: -57, rotate: 0,  z: 6 };
const MIDDLE_F1 = { size: 206, x: -30,  y: -98, rotate: 0,  z: 5 };
const LEFT_F1   = { size: 206, x: -144, y: -26, rotate: 0,  z: 4 };
const BACK_F1   = { size: 321, x: -1,   y: -56, rotate: 0,  z: 3 };

/* -------------------- FRAME 2 (animated pose defaults) -------------------- */
const RIGHT_F2  = { size: 206, x: 152,  y: -32, rotate:  12, z: 6 };
const MIDDLE_F2 = { size: 206, x:   0,  y: -60, rotate:   0, z: 7 };
const LEFT_F2   = { size: 206, x: -168, y: -32, rotate: -12, z: 5 };
const BACK_F2   = { size: 300, x:   0,  y: -66, rotate:   0, z: 3 };
const FRONT_F1  = { opacity: 1, translateY: 0 };
// Keep folder visible on frame2 as well (slight lift if you like)
const FRONT_F2  = { opacity: 1, translateY: 0 };

// If you want cards to appear ABOVE the folder on frame2, set this to 2.
// If you want the folder on top on both frames, keep it 10.
const FRONT_Z_F1 = 10;
const FRONT_Z_F2 = 10; // change to 2 to put folder behind cards on frame2

/** timing like Figma "Smart animate / ease in-out / 200ms" */
const MS = 200;
const EASE = "cubic-bezier(.4,0,.2,1)";

const ENABLE_HOTKEYS = true;
const SHOW_HUD_DEFAULT = false;

export default function VisaFolder_Intro() {
  const anchorRef = useRef(null);

  /** which pose is shown right now */
  const [pose, setPose] = useState("frame1");

  /** editable state for BOTH frames (independent) */
  const [right1,  setRight1]  = useState(RIGHT_F1);
  const [middle1, setMiddle1] = useState(MIDDLE_F1);
  const [left1,   setLeft1]   = useState(LEFT_F1);
  const [back1,   setBack1]   = useState(BACK_F1);

  const [right2,  setRight2]  = useState(RIGHT_F2);
  const [middle2, setMiddle2] = useState(MIDDLE_F2);
  const [left2,   setLeft2]   = useState(LEFT_F2);
  const [back2,   setBack2]   = useState(BACK_F2);

  const [active, setActive] = useState("back");
  const [showHUD, setShowHUD] = useState(SHOW_HUD_DEFAULT);
  const [reduced, setReduced] = useState(false);

  // snap the 360×208 anchor to whole pixels
  useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;
    const snap = () => {
      el.style.transform = "translate(0,0)";
      const r = el.getBoundingClientRect();
      const dx = Math.round(r.left) - r.left;
      const dy = Math.round(r.top)  - r.top;
      if (dx || dy) el.style.transform = `translate(${dx}px,${dy}px)`;
    };
    snap();
    window.addEventListener("resize", snap);
    return () => window.removeEventListener("resize", snap);
  }, []);

  // reduced motion
  useEffect(() => {
    if (typeof window !== "undefined" && "matchMedia" in window) {
      setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  // Hotkeys — NOW edit whichever frame is active
  useEffect(() => {
    if (!ENABLE_HOTKEYS) return;

    const onKey = (e) => {
      if (e.key === "g") { setShowHUD(v => !v); return; }
      if (e.key === "t") { setPose(p => (p === "frame1" ? "frame2" : "frame1")); return; } // toggle

      if (e.key === "1") { setActive("right");  return; }
      if (e.key === "2") { setActive("middle"); return; }
      if (e.key === "3") { setActive("left");   return; }
      if (e.key === "4") { setActive("back");   return; }

      const step = e.shiftKey ? 5 : 1;
      const rot  = e.shiftKey ? 0.5 : 0.1;
      const keys = ["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","[","]",";","'","0"];
      if (!keys.includes(e.key)) return;
      e.preventDefault();

      // choose setters/defaults for the CURRENT pose
      const sets = pose === "frame1"
        ? { right: [setRight1, RIGHT_F1], middle: [setMiddle1, MIDDLE_F1], left: [setLeft1, LEFT_F1], back: [setBack1, BACK_F1] }
        : { right: [setRight2, RIGHT_F2], middle: [setMiddle2, MIDDLE_F2], left: [setLeft2, LEFT_F2], back: [setBack2, BACK_F2] };

      const [setter, defaults] = sets[active];

      if (e.key === "0" && e.shiftKey) {
        // reset ALL layers for the *current* frame
        Object.entries(sets).forEach(([key, [s, d]]) => s(d));
        return;
      }

      // edit only the active layer in the current frame
      setter((s) => {
        switch (e.key) {
          case "ArrowLeft":  return { ...s, x: s.x - step };
          case "ArrowRight": return { ...s, x: s.x + step };
          case "ArrowUp":    return { ...s, y: s.y - step };
          case "ArrowDown":  return { ...s, y: s.y + step };
          case "[":          return { ...s, size: s.size - step };
          case "]":          return { ...s, size: s.size + step };
          case ";":          return { ...s, rotate: s.rotate - rot };
          case "'":          return { ...s, rotate: s.rotate + rot };
          case "0":          return defaults; // reset current layer (current frame)
          default:           return s;
        }
      });
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, pose]);

  /** 360×208 positioning (same as comp) for the square cards */
  const CARD_CENTER_LEFT = (W - 206) / 2;     // 77 when size=206
  const CARD_CENTER_TOP  = (H - 206) / 2 - 8; // -7 when size=206

  // values for the current pose (these animate between frames)
  const R = pose === "frame1" ? right1  : right2;
  const M = pose === "frame1" ? middle1 : middle2;
  const L = pose === "frame1" ? left1   : left2;
  const B = pose === "frame1" ? back1   : back2;
  const FRONT = pose === "frame1" ? FRONT_F1 : FRONT_F2;

  const tr = reduced ? "none" :
    `left ${MS}ms ${EASE}, top ${MS}ms ${EASE}, width ${MS}ms ${EASE}, transform ${MS}ms ${EASE}, opacity ${MS}ms ${EASE}`;

  const backLeft = (W - B.size) / 2 + B.x;

  return (
    <div className="w-full h-[80vh] flex items-center justify-center bg-[#f7f8f9]">
      <div
        style={{ width: W, height: H + BLEED_TOP + BLEED_BOTTOM, paddingTop: BLEED_TOP, paddingBottom: BLEED_BOTTOM, overflow: "visible" }}
      >
        <div
          ref={anchorRef}
          onMouseEnter={() => setPose("frame2")}
          onMouseLeave={() => setPose("frame1")}
          style={{
            position: "relative",
            width: W,
            height: H,
            margin: "0 auto",
            outline: showHUD ? "1px dashed rgba(0,0,0,.12)" : "none",
          }}
          title="Hover to fan out (press 't' to lock/unlock frame)"
        >
          {/* BACK (light panel) */}
          <img
            src={BACK_SRC}
            alt=""
            draggable={false}
            className="absolute pointer-events-none select-none"
            style={{
              left: backLeft,
              top:  B.y,
              width: B.size,
              height: "auto",
              transform: `rotate(${B.rotate}deg)`,
              transformOrigin: "50% 50%",
              zIndex: B.z,
              transition: tr,
            }}
            decoding="sync"
            loading="eager"
            fetchPriority="high"
          />

          {/* LEFT card (city) */}
          <img
            src={LEFT_CARD_SRC}
            alt=""
            draggable={false}
            className="absolute pointer-events-none select-none"
            style={{
              left: CARD_CENTER_LEFT + L.x,
              top:  CARD_CENTER_TOP  + L.y,
              width: L.size,
              height: "auto",
              transform: `rotate(${L.rotate}deg)`,
              transformOrigin: "50% 50%",
              zIndex: L.z,
              filter: "drop-shadow(0 10px 26px rgba(0,0,0,.22))",
              willChange: "transform",
              transition: tr,
            }}
            decoding="sync"
          />

          {/* MIDDLE card (boat) */}
          <img
            src={MIDDLE_CARD_SRC}
            alt=""
            draggable={false}
            className="absolute pointer-events-none select-none"
            style={{
              left: CARD_CENTER_LEFT + M.x,
              top:  CARD_CENTER_TOP  + M.y,
              width: M.size,
              height: "auto",
              transform: `rotate(${M.rotate}deg)`,
              transformOrigin: "50% 50%",
              zIndex: M.z,
              filter: "drop-shadow(0 10px 26px rgba(0,0,0,.22))",
              willChange: "transform",
              transition: tr,
            }}
            decoding="sync"
          />

          {/* RIGHT/back card (desert) */}
          <img
            src={RIGHT_CARD_SRC}
            alt=""
            draggable={false}
            className="absolute pointer-events-none select-none"
            style={{
              left: CARD_CENTER_LEFT + R.x,
              top:  CARD_CENTER_TOP  + R.y,
              width: R.size,
              height: "auto",
              transform: `rotate(${R.rotate}deg)`,
              transformOrigin: "50% 50%",
              zIndex: R.z,
              filter: "drop-shadow(0 10px 26px rgba(0,0,0,.22))",
              willChange: "transform",
              transition: tr,
            }}
            decoding="sync"
          />

          {/* Folder — front */}
          <img
            src={FRONT_SRC}
            alt="folder"
            draggable={false}
            className="absolute pointer-events-none select-none"
            style={{
              left: 0,
              bottom: 0,
              width: W,
              height: "auto",
              zIndex: pose === "frame1" ? FRONT_Z_F1 : FRONT_Z_F2,
              opacity: FRONT.opacity,
              transform: `translateY(${FRONT.translateY}px)`,
              transition: tr,
            }}
            decoding="sync"
            loading="eager"
            fetchPriority="high"
          />

          {/* HUD */}
          {showHUD && (
            <div
              style={{
                position: "absolute",
                left: 8,
                top: 8,
                fontSize: 11,
                background: "rgba(0,0,0,.62)",
                color: "#fff",
                padding: "6px 8px",
                borderRadius: 8,
                zIndex: 999,
                lineHeight: 1.35,
              }}
            >
              <div style={{ marginBottom: 4 }}>
                <strong>POSE</strong>: {pose} (hover / t) — editing this pose
              </div>
              <div><strong style={{opacity: active==="right"?1:.6}}>RIGHT</strong>  size:{R.size}px  x:{R.x}  y:{R.y}  rot:{R.rotate}°</div>
              <div><strong style={{opacity: active==="middle"?1:.6}}>MIDDLE</strong> size:{M.size}px x:{M.x} y:{M.y} rot:{M.rotate}°</div>
              <div><strong style={{opacity: active==="left"?1:.6}}>LEFT</strong>   size:{L.size}px   x:{L.x}   y:{L.y}   rot:{L.rotate}°</div>
              <div><strong style={{opacity: active==="back"?1:.6}}>BACK</strong>   size:{B.size}px   x:{B.x}   y:{B.y}   rot:{B.rotate}°</div>
              <div style={{opacity:.9, marginTop:4}}>
                1/2/3/4 select · ←→/↑↓ move · [ / ] size · ; / ' rotate · 0 reset layer · ⇧0 reset ALL (current frame) · g HUD · t toggle frames
              </div>
            </div>
          )}
        </div>

        {/* Caption + chip */}
        <div style={{ height: 24 }} />
        <div className="text-center">
          <span className="font-medium" style={{ fontSize: 20, lineHeight: "28px", color: "#2f3445", letterSpacing: "0.2px" }}>
            Solicitudes de visa
          </span>
          <div className="mt-3 flex justify-center">
            <div className="bg-white shadow-md rounded-full px-6 py-2 text-sm flex items-center gap-1 font-medium border border-gray-200">
              <span>✓</span> Completadas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}