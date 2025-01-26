import "./Title.css";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

function Title () {

    const lineRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);
    const imageBoxRef = useRef<HTMLDivElement>(null);
    const [imageBox, setImageBox] = useState<{ visible: boolean; x: number; y: number; image: string; rotation: number }>({
      visible: false,
      x: 0,
      y: 0,
      image: "",
      rotation: 0,
    });

    const imagePaths = Array.from({ length: 10 }, (_, i) => `/src/assets/${i + 1}.jpg`);

    // Track target and current position for inertia
    const targetPosition = useRef({ x: 0, y: 0 });
    const currentPosition = useRef({ x: 0, y: 0 });
    const currentRotation = useRef(0); 
    const [scale, setScale] = useState(1); 

    useEffect(() => {
        imagePaths.forEach((path) => {
          const img = new Image();
          img.src = path;
        });
    }, []);

    useEffect(() => {
        let animationFrame: number;
    
        const updatePosition = () => {
          // Lerp toward the target position
          const lerpFactor = 0.125; // Adjust for faster/slower movement
          currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * lerpFactor;
          currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * lerpFactor;
          
          // Calculate rotation based on movement direction
            const dx = targetPosition.current.x - currentPosition.current.x;
            const dy = targetPosition.current.y - currentPosition.current.y;
            const maxRotation = 10; // Maximum rotation in degrees
            const rotation = Math.min(Math.max(dx * 0.05, -maxRotation), maxRotation); // Scale rotation by horizontal movement

            // Smoothly update rotation
            currentRotation.current += (rotation - currentRotation.current) * lerpFactor;
    
          // Update the image box position
          setImageBox((prev) => ({
            ...prev,
            x: currentPosition.current.x,
            y: currentPosition.current.y,
            rotation: currentRotation.current,
          }));
    
          // Continue the animation
          animationFrame = requestAnimationFrame(updatePosition);
        };
    
        // Start the animation loop
        animationFrame = requestAnimationFrame(updatePosition);
    
        // Cleanup on unmount
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    useEffect(() => {
        // Initialize the animation using fromTo
        if (lineRef.current) {
          animationRef.current = gsap.fromTo(
            lineRef.current,
            { // From (starting state)
              height: 5,
              background: "linear-gradient(90deg, #ffffff, #ffffff, #ffffff)", // Ensure starting color is white
            },
            { // To (hover effect state)
              height: 50,
              background: "linear-gradient(90deg, #ffffff, #ff6a00, #ff49a1)", // Gradient background
              duration: 0.3,
              ease: "power1.inOut",
              paused: true, // Paused initially
            }
          );
        }
    }, []);
    
    useEffect(() => {
        if (!imageBox.image) return;
    
        // Set scale to smaller value and then animate back to 1
        setScale(0.95);
        const timeout = setTimeout(() => {
          setScale(1);
        }, 40); // Duration of the pop effect (150ms)
    
        return () => clearTimeout(timeout);
      }, [imageBox.image]);

    const handleMouseEnter = () => {
        animationRef.current?.play();
        setImageBox((prev) => ({ ...prev, visible: true }));
        setScale(0.8); // Start from a small scale
        setTimeout(() => {
        setScale(1); // Scale up to normal size for the pop-in effect
        }, 40);
    };
    
    const handleMouseLeave = () => {
        animationRef.current?.reverse();
        setScale(0.8); // Scale down to create the pop-out effect
        setTimeout(() => {
        setImageBox((prev) => ({ ...prev, visible: false })); // Hide the image box after the scale down is complete
        }, 40); // Delay to allow the pop-out effect to complete 
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!lineRef.current) return;
    
        // Get the line's bounding rectangle
        const rect = lineRef.current.getBoundingClientRect();
        const cursorX = e.clientX - rect.left; // Cursor position relative to the line
        const lineWidth = rect.width;
    
        // Calculate the image index (0-9 based on position)
        const imageIndex = Math.min(Math.floor((cursorX / lineWidth) * 10), 9);
    
        // Set the image box position and image
        const boxSize = 450;
        targetPosition.current = {
            x: e.clientX + boxSize/2, // 20px horizontally offset from the cursor
            y: e.clientY, // Vertically centered
        };
        setImageBox((prev) => ({
            ...prev,
            image: imagePaths[imageIndex],
        }));
    };

    return (
        <div className="outer-container">
            <div className="centered-container">
                <span className="left-text">day</span>
                <div 
                    className="line"
                    ref={lineRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                ></div>
                {imageBox.visible && (
                    <div ref={imageBoxRef}
                    style={{
                        position: "absolute",
                        top: imageBox.y,
                        left: imageBox.x,
                        width: "450px",
                        height: "450px",
                        backgroundImage: `url(${imageBox.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        pointerEvents: "none", 
                        transform: `translate(-50%, -50%) rotate(${imageBox.rotation}deg) scale(${scale})`,
                        transition: "transform 0.1s ease",
                    }}
                    ></div>
                )}
                <span className="right-text">dream</span>
            </div>
        </div>
    );
};

export default Title;
