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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // 4. Loop through every image and update its position based on proximity
      const updatedPositions = positions.map((pos) => {
        const imageX = (pos.left / 100) * window.innerWidth;
        const imageY = (pos.top / 100) * window.innerHeight;

        const distance = Math.sqrt(
          Math.pow(mouseX - imageX, 2) + Math.pow(mouseY - imageY, 2)
        );

        const proximity = 8000; // Proximity radius
        if (distance < proximity) {
          const angle = Math.atan2(mouseY - imageY, mouseX - imageX);
          const strength = (proximity - distance) / proximity; // Proportional effect strength

          return {
            ...pos,
            offsetX: Math.cos(angle) * strength * 100, // Adjust "20" for push intensity
            offsetY: Math.sin(angle) * strength * 100,
          };
        }
        return { ...pos, offsetX: 0, offsetY: 0 }; // Reset offsets if out of range
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
                transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`, // Apply proximity-based translation
                transition: "transform 0.1s ease", // Smooth animation
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Creator_Title;
