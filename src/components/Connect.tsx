import "./Connect.css";
import { useEffect, useState } from "react";

function Connect() {
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
          circle1: prev.circle1 === radius.circle1-5 ? radius.circle1+5 : radius.circle1-5, 
          circle2: prev.circle2 === radius.circle2-5 ? radius.circle2+5 : radius.circle2-5, 
        }));
      }, 5000); // Every 5 seconds
  
      return () => clearInterval(interval);
    }, []);

  return (
    <div className="connect-container" onMouseMove={handleMouseMove}>
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
            cx={`${0 + parallax.x}%`}
            cy={`${10 + parallax.y}%`}
            r={radius.circle1.toString() + "vmin"}
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="50%"
            style={{ transition: "r 5s ease-in-out" }}
          />
          <circle
            cx={`${100 - parallax.x}%`}
            cy={`${90 - parallax.y}%`}
            r={radius.circle2.toString() + "vmin"}
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="50%"
            style={{ transition: "r 5s ease-in-out" }}
          />
        </svg>
      <div className="connect-inner">
        <div className="text-connect">
          <p className="large-text">
            We're a multidisciplinary future+tech focused creative studio
            helping brands and creators harness technologies to maximize their
            creative potential.
          </p>
          <div className="cta-container">
            <a href="/book-call" className="book-call">
              Book a Call
            </a>
            <p>or</p>
            <a href="/send-message" className="book-call">
              Send a Message
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connect;
