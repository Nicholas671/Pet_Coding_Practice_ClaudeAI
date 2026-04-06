import { useRef, useEffect } from "react";
import { drawSprite } from "../spriteData";

// Renders a 32x32 pixel sprite scaled up by `scale` (default 5 = 160px)
// Accepts race, characterClass, and the three stats as props
function SpriteCanvas({ race, characterClass, strength, dexterity, intelligence, scale = 5 }) {
  const canvasRef = useRef(null);
  const size = 32 * scale;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !race || !characterClass) return;

    const ctx = canvas.getContext("2d");
    // Disable anti-aliasing so pixels stay crisp
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, size, size);
    drawSprite(ctx, race, characterClass, strength, dexterity, intelligence, scale);
  }, [race, characterClass, strength, dexterity, intelligence, scale, size]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `${race}-${characterClass}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  if (!race || !characterClass) return null;

  return (
    <div style={styles.wrap}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{ ...styles.canvas, width: size, height: size }}
      />
      <button onClick={handleDownload} className="btn-outline" style={styles.dlBtn}>
        ↓ Download Sprite
      </button>
    </div>
  );
}

const styles = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  canvas: {
    imageRendering: "pixelated",  // keeps pixels sharp in all browsers
    border: "2px solid #c9a84c",
    borderRadius: "2px",
    boxShadow: "0 0 12px rgba(0,0,0,0.7)",
  },
  dlBtn: {
    fontSize: "0.75rem",
    padding: "4px 12px",
  },
};

export default SpriteCanvas;
