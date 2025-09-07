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

/* -------------------- FRAME 1 (your locked pixel-perfect state) -------------------- */
const RIGHT_F1  = { size: 206, x: 127,  y: -57, rotate: 0,  z: 6 };
const MIDDLE_F1 = { size: 206, x: -30,  y: -98, rotate: 0,  z: 5 };
const LEFT_F1   = { size: 206, x: -144, y: -26, rotate: 0,  z: 4 };
const BACK_F1   = { size: 321, x: -1,  y: -56, rotate: 0,  z: 3 }; // your latest tweak

/* -------------------- FRAME 2 (target pose – good starting guess) -------------------- */
/* We'll fan the photos out, lift them slightly, and fade the front folder */
const RIGHT_F2  = { size: 206, x: 152,  y: -32, rotate: 12,  z: 6 };
const MIDDLE_F2 = { size: 206, x:   0,  y: -60, rotate:  0,  z: 7 }; // a touch forward
const LEFT_F2   = { size: 206, x: -168, y: -32, rotate: -12, z: 5 };
const BACK_F2   = { size: 300, x:   0,  y: -66, rotate:  0,  z: 3 };
const FRONT_F2  = { opacity: 0, translateY: 6 };   // fade/slide the front away
const FRONT_F1  = { opacity: 1, translateY: 0 };

/** timing to mimic Figma: Smart animate, ease in/out, 200ms */
const MS = 200;
const EASE = "cubic-bezier(.4,0,.2,1)";

const ENABLE_HOTKEYS = true;      // keep your tweak keys for Frame 1
const SHOW_HUD_DEFAULT = false;

export default function VisaFolder_Intro() {
  const anchorRef = useRef(null);

  // Which pose are we showing?
  const [pose, setPose] = useState("frame1");

  // Keep your tweakable Frame 1 values intact
  const [right,  setRight]  = useState(RIGHT_F1);
  const [middle, setMiddle] = useState(MIDDLE_F1);
  const [left,   setLeft]   = useState(LEFT_F1);
  const [back,   setBack]   = useState(BACK_F1);

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

  // Hotkeys (edit Frame 1 only, like before) + quick toggle between poses
  useEffect(() => {
    if (!ENABLE_HOTKEYS) return;

    const onKey = (e) => {
      if (e.key === "g") { setShowHUD(v => !v); return; }
      if (e.key === "t") { setPose(p => p === "frame1" ? "frame2" : "frame1"); return; } // toggle pose
      if (e.key === "1") { setActive("right");  return; }
      if (e.key === "2") { setActive("middle"); return; }
      if (e.key === "3") { setActive("left");   return; }
      if (e.key === "4") { setActive("back");   return; }

      // If we're not on frame1, ignore edit keys (keeps things simple)
      if (pose !== "frame1") return;

      const step = e.shiftKey ? 5 : 1;
      const rot  = e.shiftKey ? 0.5 : 0.1;
      const keys = ["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","[","]",";","'","0"];
      if (keys.includes(e.key)) e.preventDefault();

      const apply = (setter, defaults) => setter((s) => {
        switch (e.key) {
          case "ArrowLeft":  return { ...s, x: s.x - step };
          case "ArrowRight": return { ...s, x: s.x + step };
          case "ArrowUp":    return { ...s, y: s.y - step };
          case "ArrowDown":  return { ...s, y: s.y + step };
          case "[":          return { ...s, size: s.size - step };
          case "]":          return { ...s, size: s.size + step };
          case ";":          return { ...s, rotate: s.rotate - rot };
          case "'":          return { ...s, rotate: s.rotate + rot };
          case "0":          return defaults; // reset current layer
          default:           return s;
        }
      });

      if (e.key === "0" && e.shiftKey) { // reset all frame1 layers
        setRight(RIGHT_F1); setMiddle(MIDDLE_F1); setLeft(LEFT_F1); setBack(BACK_F1);
        return;
      }

      if (active === "right")  apply(setRight,  RIGHT_F1);
      if (active === "middle") apply(setMiddle, MIDDLE_F1);
      if (active === "left")   apply(setLeft,   LEFT_F1);
      if (active === "back")   apply(setBack,   BACK_F1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, pose]);

  /** 360×208 positioning (same as comp) for the square cards */
  const CARD_CENTER_LEFT = (W - 206) / 2;     // 77 when size=206
  const CARD_CENTER_TOP  = (H - 206) / 2 - 8; // -7 when size=206

  // helpers to pick values based on pose
  const pick = (a, b) => (pose === "frame1" ? a : b);
  const tr = reduced ? "none" :
    `left ${MS}ms ${EASE}, top ${MS}ms ${EASE}, width ${MS}ms ${EASE}, transform ${MS}ms ${EASE}, opacity ${MS}ms ${EASE}`;

  // computed (animated) styles
  const R = pick(right,  RIGHT_F2);
  const M = pick(middle, MIDDLE_F2);
  const L = pick(left,   LEFT_F2);
  const B = pick(back,   BACK_F2);
  const FRONT = pick(FRONT_F1, FRONT_F2);

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
          title="Hover to fan out (t to toggle)"
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

          {/* Folder — front (fade/slide out on Frame 2) */}
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
              zIndex: 10,
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
              <div style={{marginBottom:4}}>
                <strong>POSE</strong>: {pose} · hover/t
              </div>
              <div><strong style={{opacity: active==="right"?1:.6}}>RIGHT</strong>  size:{right.size}px  x:{right.x}  y:{right.y}  rot:{right.rotate}°</div>
              <div><strong style={{opacity: active==="middle"?1:.6}}>MIDDLE</strong> size:{middle.size}px x:{middle.x} y:{middle.y} rot:{middle.rotate}°</div>
              <div><strong style={{opacity: active==="left"?1:.6}}>LEFT</strong>   size:{left.size}px   x:{left.x}   y:{left.y}   rot:{left.rotate}°</div>
              <div><strong style={{opacity: active==="back"?1:.6}}>BACK</strong>   size:{back.size}px   x:{back.x}   y:{back.y}   rot:{back.rotate}°</div>
              <div style={{opacity:.9, marginTop:4}}>
                1/2/3/4 select · ← → / ↑ ↓ move · [ / ] size · ; / ' rotate · 0 reset layer · ⇧0 reset all · g HUD
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