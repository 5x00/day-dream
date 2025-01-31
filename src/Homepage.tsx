import { useState, useEffect } from "react";
import Home_Title from "./components/Home_Title";
import Home_Footer from "./components/Home_Footer";

function Homepage() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [radius, setRadius] = useState({ circle1: 80, circle2: 100 });

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Calculate parallax offsets (-1 to 1 range)
    const offsetX = (clientX - centerX) / centerX;
    const offsetY = (clientY - centerY) / centerY;

    setParallax({
      x: offsetX * 1, // Adjust movement strength
      y: offsetY * 1,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRadius((prev) => ({
        circle1: prev.circle1 === 85 ? 95 : 85, // Alternate between 150 and 180
        circle2: prev.circle2 === 95 ? 85 : 95, // Alternate between 200 and 230
      }));
    }, 5000); // Every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="app-container" onMouseMove={handleMouseMove}>
        <svg
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <circle
            cx={`${30 + parallax.x}%`}
            cy={`${0 + parallax.y}%`}
            r={radius.circle1.toString() + "vmin"}
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="50%"
            style={{ transition: "r 5s ease-in-out" }}
          />
          <circle
            cx={`${70 - parallax.x}%`}
            cy={`${100 - parallax.y}%`}
            r={radius.circle2.toString() + "vmin"}
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="50%"
            style={{ transition: "r 5s ease-in-out" }}
          />
        </svg>
        <Home_Title />
        <Home_Footer />
      </div>
    </>
  );
}

export default Homepage;
