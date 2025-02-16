import "./Creator_Title.css";
import "./Works_Temp.css";
import { useState, useEffect } from "react";

function Creator_Title() {
  const imageList = Array.from(
    { length: 14 },
    (_, index) => `${index + 1}.jpg`
  ); // 1. Create an array of 14 images

  const gridRows = 10; // Number of rows
  const gridCols = 2; // Number of columns
  const cellWidth = 100 / gridCols; // Width of each grid cell in vw
  const cellHeight = 100 / gridRows; // Height of each grid cell in vh

  // 2. Initialize each image to a random position based on the grid
  const generatePositionInGrid = (row: number, col: number) => ({
    top: row * cellHeight + Math.random() * cellHeight * 0.8,
    left: col * cellWidth + Math.random() * cellWidth * 0.8,
  });

  // Initialize positions for all images
  const initialPositions = imageList.map((_, index) => {
    const row = Math.floor(index / gridCols);
    const col = index % gridCols;
    return { ...generatePositionInGrid(row, col), offsetX: 0, offsetY: 0 }; // 3. Store initialized positions
  });

  const [positions, setPositions] = useState(initialPositions);
  const lerp = (start: number, end: number, t: number): number => {
    return start + (end - start) * t;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const updatedPositions = positions.map((pos) => {
        // Calculate the image's center in screen coordinates
        const imageX = (pos.left / 100) * window.innerWidth;
        const imageY = (pos.top / 100) * window.innerHeight;

        const dx = mouseX - imageX;
        const dy = mouseY - imageY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const proximity = 5000;

        // Set a lerp factor (0.1 is a common starting point; adjust as needed)
        const lerpFactor = 0.1;

        if (distance < proximity) {
          // Calculate the angle and clamped strength
          const angle = Math.atan2(dy, dx);
          const rawStrength = (proximity - distance) / proximity;
          const strength = Math.min(rawStrength, 0.95);

          // Compute the primary offset toward the mouse
          const primaryX = Math.cos(angle) * strength;
          const primaryY = Math.sin(angle) * strength;

          // Use a multiplier to adjust overall movement intensity
          const multiplier = /Mac/i.test(navigator.userAgent) ? 20 : 50;
          const targetOffsetX = primaryX * multiplier;
          const targetOffsetY = primaryY * multiplier;

          // Use lerp to smoothly interpolate from the current offset to the target offset
          const newOffsetX = lerp(pos.offsetX, targetOffsetX, lerpFactor);
          const newOffsetY = lerp(pos.offsetY, targetOffsetY, lerpFactor);

          return {
            ...pos,
            offsetX: newOffsetX,
            offsetY: newOffsetY,
          };
        } else {
          // When out of range, interpolate back to zero
          const newOffsetX = lerp(pos.offsetX, 0, lerpFactor);
          const newOffsetY = lerp(pos.offsetY, 0, lerpFactor);
          return {
            ...pos,
            offsetX: newOffsetX,
            offsetY: newOffsetY,
          };
        }
      });

      setPositions(updatedPositions);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [positions]);

  return (
    <div className="works-container">
      <div className="works">
        <div className="works-overlay">
          <h1>we’re still working on setting up this page :/</h1>
        </div>
        {imageList.map((src, index) => {
          const { top, left, offsetX, offsetY } = positions[index];
          return (
            <img
              key={index}
              src={`/images/${src}`}
              alt=""
              style={{
                top: `${top}vh`,
                left: `${left}vw`,
                transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Creator_Title;
