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

/** RIGHT — keep YOUR exact values */
const RIGHT_DEFAULT = { size: 206, x: 127, y: -57, rotate: 0, z: 6 };

/** MIDDLE — your locked-in */
const MIDDLE_DEFAULT = { size: 206, x: -30, y: -98, rotate: 0, z: 5 };

/** LEFT (city) — starting point */
const LEFT_DEFAULT = { size: 206, x: -144, y: -26, rotate: 0, z: 4 };

/** BACK (light panel behind photos) — slightly smaller */
const BACK_DEFAULT = {
  size: 321,  // was 360 — 16px narrower feels closer to the comp
  x: -1,      // tiny nudge to keep it visually centered after shrink
  y: -56,     // raise a hair so the tab peeks nicely
  rotate: 0,
  z: 3
};

const ENABLE_HOTKEYS = true;
const SHOW_HUD_DEFAULT = false;

export default function VisaFolder_Frame1() {
  const anchorRef = useRef(null);

  const [right,  setRight]  = useState(RIGHT_DEFAULT);
  const [middle, setMiddle] = useState(MIDDLE_DEFAULT);
  const [left,   setLeft]   = useState(LEFT_DEFAULT);
  const [back,   setBack]   = useState(BACK_DEFAULT);

  // start by editing the BACK layer as requested
  const [active, setActive] = useState("back");
  const [showHUD, setShowHUD] = useState(SHOW_HUD_DEFAULT);

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

  // Hotkeys — 1/2/3/4 select; same move/size/rotate controls
  useEffect(() => {
    if (!ENABLE_HOTKEYS) return;

    const onKey = (e) => {
      if (e.key === "g") { setShowHUD(v => !v); return; }

      // choose active layer
      if (e.key === "1") { setActive("right");  return; }
      if (e.key === "2") { setActive("middle"); return; }
      if (e.key === "3") { setActive("left");   return; }
      if (e.key === "4") { setActive("back");   return; }

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
          case "0":          return defaults;
          default:           return s;
        }
      });

      // Shift+0 resets all
      if (e.key === "0" && e.shiftKey) {
        setRight(RIGHT_DEFAULT);
        setMiddle(MIDDLE_DEFAULT);
        setLeft(LEFT_DEFAULT);
        setBack(BACK_DEFAULT);
        return;
      }

      if (active === "right")  apply(setRight,  RIGHT_DEFAULT);
      if (active === "middle") apply(setMiddle, MIDDLE_DEFAULT);
      if (active === "left")   apply(setLeft,   LEFT_DEFAULT);
      if (active === "back")   apply(setBack,   BACK_DEFAULT);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  /** 360×208 positioning (same as comp) for the three square cards */
  const CARD_CENTER_LEFT = (W - 206) / 2;     // 77 when size=206
  const CARD_CENTER_TOP  = (H - 206) / 2 - 8; // -7 when size=206

  /** center helper for the back panel (we only scale width) */
  const backLeft = (W - back.size) / 2 + back.x;

  return (
    <div className="w-full h-[80vh] flex items-center justify-center bg-[#f7f8f9]">
      <div style={{ width: W, height: H + BLEED_TOP + BLEED_BOTTOM, paddingTop: BLEED_TOP, paddingBottom: BLEED_BOTTOM, overflow: "visible" }}>
        <div
          ref={anchorRef}
          style={{ position: "relative", width: W, height: H, margin: "0 auto", outline: showHUD ? "1px dashed rgba(0,0,0,.12)" : "none" }}
        >
          {/* BACK (light panel) — movable */}
          <img
            src={BACK_SRC}
            alt=""
            draggable={false}
            className="absolute pointer-events-none select-none"
            style={{
              left: backLeft,
              top:  back.y,
              width: back.size,
              height: "auto",
              transform: `rotate(${back.rotate}deg)`,
              transformOrigin: "50% 50%",
              zIndex: back.z
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
              left: CARD_CENTER_LEFT + left.x,
              top:  CARD_CENTER_TOP  + left.y,
              width: left.size,
              height: "auto",
              transform: `rotate(${left.rotate}deg)`,
              transformOrigin: "50% 50%",
              zIndex: left.z,
              filter: "drop-shadow(0 10px 26px rgba(0,0,0,.22))",
              willChange: "transform",
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
              left: CARD_CENTER_LEFT + middle.x,
              top:  CARD_CENTER_TOP  + middle.y,
              width: middle.size,
              height: "auto",
              transform: `rotate(${middle.rotate}deg)`,
              transformOrigin: "50% 50%",
              zIndex: middle.z,
              filter: "drop-shadow(0 10px 26px rgba(0,0,0,.22))",
              willChange: "transform",
            }}
            decoding="sync"
          />

          {/* RIGHT/back card (desert) — your exact placement */}
          <img
            src={RIGHT_CARD_SRC}
            alt=""
            draggable={false}
            className="absolute pointer-events-none select-none"
            style={{
              left: CARD_CENTER_LEFT + right.x,
              top:  CARD_CENTER_TOP  + right.y,
              width: right.size,
              height: "auto",
              transform: `rotate(${right.rotate}deg)`,
              transformOrigin: "50% 50%",
              zIndex: right.z,
              filter: "drop-shadow(0 10px 26px rgba(0,0,0,.22))",
              willChange: "transform",
            }}
            decoding="sync"
          />

          {/* Folder — front */}
          <img
            src={FRONT_SRC}
            alt="folder"
            draggable={false}
            className="absolute pointer-events-none select-none"
            style={{ left: 0, bottom: 0, width: W, height: "auto", zIndex: 10 }}
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
              <div><strong style={{opacity: active==="right"?1:.6}}>RIGHT</strong>  size:{right.size}px  x:{right.x}  y:{right.y}  rot:{right.rotate}°</div>
              <div><strong style={{opacity: active==="middle"?1:.6}}>MIDDLE</strong> size:{middle.size}px x:{middle.x} y:{middle.y} rot:{middle.rotate}°</div>
              <div><strong style={{opacity: active==="left"?1:.6}}>LEFT</strong>   size:{left.size}px   x:{left.x}   y:{left.y}   rot:{left.rotate}°</div>
              <div><strong style={{opacity: active==="back"?1:.6}}>BACK</strong>   size:{back.size}px   x:{back.x}   y:{back.y}   rot:{back.rotate}°</div>
              <div style={{opacity:.9}}>1/2/3/4 select · ← → / ↑ ↓ move · [ / ] size · ; / ' rotate · 0 reset active · ⇧0 reset all · g HUD</div>
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