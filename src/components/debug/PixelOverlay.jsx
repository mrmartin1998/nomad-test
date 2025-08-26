function PixelOverlay({
  show,
  opacity = 0.5,
  scale = 1,
  x = 0,
  y = 0,
}) {
  if (!show) return null;
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <img
        src="/debug/frame1.png"
        alt=""
        style={{
          opacity,
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
          transformOrigin: "center",
          maxWidth: "none",
        }}
      />
    </div>
  );
}
