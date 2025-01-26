import "./Title.css";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

function Title () {

    const lineRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);
    const imageBoxRef = useRef<HTMLDivElement>(null);
    const [imageBox, setImageBox] = useState<{ visible: boolean; x: number; y: number; image: string }>({
      visible: false,
      x: 0,
      y: 0,
      image: "",
    });

    const imagePaths = Array.from({ length: 10 }, (_, i) => `/src/assets/${i + 1}.jpg`);
    useEffect(() => {
        imagePaths.forEach((path) => {
          const img = new Image();
          img.src = path;
        });
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
    

    const handleMouseEnter = () => {
        animationRef.current?.play();
        setImageBox((prev) => ({ ...prev, visible: true }));
    };
    
    const handleMouseLeave = () => {
        animationRef.current?.reverse();
        setImageBox((prev) => ({ ...prev, visible: false })); 
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
        setImageBox({
            visible: true,
            x: e.clientX + 20, // 20px horizontally offset from the cursor
            y: e.clientY - boxSize/2, // Vertically centered: subtract half of the image box height (150px / 2 = 75px)
            image: imagePaths[imageIndex], // Dynamic image path
        });
        console.log(imageBox);
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
                        border: "2px solid #fff",
                        pointerEvents: "none", 
                    }}
                    ></div>
                )}
                <span className="right-text">dream</span>
            </div>
        </div>
    );
};

export default Title;
