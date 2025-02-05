import "./Home_Title.css";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

function Home_Title() {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastImageIndex = useRef<number>(0); // Track the last image index
  const lineRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [imageBox, setImageBox] = useState<{
    visible: boolean;
    x: number;
    y: number;
    imageIndex: number;
    rotation: number;
  }>({
    visible: false,
    x: 0,
    y: 0,
    imageIndex: 0,
    rotation: 0,
  });

  // Initialize images
  const imagePaths = Array.from(
    { length: 10 },
    (_, i) => `/images/${i + 1}.jpg`
  );

  //Initialize audio
  useEffect(() => {
    // Initialize the audio element
    audioRef.current = new Audio("/audio/click.mp3");

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null; // Clean up the audio element
      }
    };
  }, []);

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
    let intervalId: number;

    const updatePosition = () => {
      // Lerp toward the target position
      const lerpFactor = 0.1; // Adjust for faster/slower movement
      const newX =
        currentPosition.current.x +
        (targetPosition.current.x - currentPosition.current.x) * lerpFactor;
      const newY =
        currentPosition.current.y +
        (targetPosition.current.y - currentPosition.current.y) * lerpFactor;

      currentPosition.current.x = parseFloat(newX.toFixed(2));
      currentPosition.current.y = parseFloat(newY.toFixed(2));

      // Calculate rotation based on movement direction
      const dx = targetPosition.current.x - currentPosition.current.x;
      const maxRotation = 10; // Maximum rotation in degrees
      const rotation = Math.min(Math.max(dx * 0.05, -maxRotation), maxRotation); // Scale rotation by horizontal movement

      // Smoothly update rotation
      const newRotation =
        currentRotation.current +
        (rotation - currentRotation.current) * lerpFactor;
      currentRotation.current = parseFloat(newRotation.toFixed(3));

      // Update the image box position
      setImageBox((prev) => ({
        ...prev,
        x: currentPosition.current.x,
        y: currentPosition.current.y,
        rotation: currentRotation.current,
      }));

      // Continue the animation
      if (!isSafari) {
        animationFrame = requestAnimationFrame(updatePosition);
      }
    };

    // Start the animation loop
    if (isSafari) {
      intervalId = setInterval(updatePosition, 16); // Approximately 60fps
    } else {
      animationFrame = requestAnimationFrame(updatePosition);
    }

    // Cleanup on unmount
    return () => {
      if (isSafari) {
        clearInterval(intervalId);
      } else {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  useEffect(() => {
    // Initialize the animation using fromTo
    if (lineRef.current) {
      animationRef.current = gsap.fromTo(
        lineRef.current,
        {
          // From (starting state)
          height: 10,
        },
        {
          // To (hover effect state)
          height: 75,
          duration: 0.3,
          ease: "power1.inOut",
          paused: true, // Paused initially
        }
      );
    }
  }, []);

  //Squeeze effect
  useEffect(() => {
    if (imageBox.visible) {
      setScale(0.99);
      const timeout = setTimeout(() => {
        setScale(1);
      }, 40); // Squeeze effect duration: 0.1s

      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, [imageBox.imageIndex]);

  const handleMouseEnter = () => {
    animationRef.current?.play();
    setImageBox((prev) => ({ ...prev, visible: true }));
    setScale(0.8); // Start from a small scale
    setTimeout(() => {
      setScale(1);
    }, 40);
  };

  const handleMouseLeave = () => {
    animationRef.current?.reverse();
    setScale(0.9); // Slightly smaller scale for the pop-out effect
    setTimeout(() => {
      setImageBox((prev) => ({ ...prev, visible: false }));
    }, 40); // Match this delay with the CSS transition duration
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!lineRef.current) return;

    // Get the line's bounding rectangle
    const rect = lineRef.current.getBoundingClientRect();
    const cursorX = e.clientX - rect.left; // Cursor position relative to the line
    const lineWidth = rect.width;

    // Calculate the image index (0-9 based on position)
    const imageIndex = Math.min(Math.floor((cursorX / lineWidth) * 10), 9);

    // Play the click sound if the image index changes
    if (imageIndex !== lastImageIndex.current) {
      lastImageIndex.current = imageIndex; // Update the last image index
      if (audioRef.current) {
        audioRef.current.currentTime = 0; // Reset the audio to the beginning
        audioRef.current.play(); // Play the click sound
      }
    }

    // Set the image box position and image
    const boxSize = 450;
    targetPosition.current = {
      x: e.clientX + boxSize / 4,
      y: e.clientY - boxSize / 4,
    };
    setImageBox((prev) => ({
      ...prev,
      imageIndex,
    }));
  };

  // Touch events

  // Touch handlers (mirror the mouse behavior)
  const handleTouchStart = () => {
    // Treat touch start as mouse enter
    handleMouseEnter();
  };

  const handleTouchEnd = () => {
    // Treat touch end as mouse leave
    handleMouseLeave();
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!lineRef.current) return;

    // Prevent the default behavior to avoid unwanted scrolling
    e.preventDefault();

    // Use the first touch point
    const touch = e.touches[0];

    // Get the line's bounding rectangle
    const rect = lineRef.current.getBoundingClientRect();
    const cursorX = touch.clientX - rect.left;
    const lineWidth = rect.width;

    // Calculate the image index (0-9 based on position)
    const imageIndex = Math.min(Math.floor((cursorX / lineWidth) * 10), 9);

    // Play the click sound if the image index changes
    if (imageIndex !== lastImageIndex.current) {
      lastImageIndex.current = imageIndex;
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }

    // Set the image box position and image
    const boxSize = 450;
    targetPosition.current = {
      x: touch.clientX + boxSize / 4,
      y: touch.clientY - boxSize / 4,
    };
    setImageBox((prev) => ({
      ...prev,
      imageIndex,
    }));
  };

  return (
    <div className="home-container">
      <div className="home">
        <span className="left-text">AI Powered</span>
        <div
          className="line"
          ref={lineRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        ></div>
        {imageBox.visible && (
          <div
            style={{
              position: "absolute",
              top: imageBox.y,
              left: imageBox.x,
              width: "60vmin",
              height: "60vmin",
              backgroundSize: "cover",
              backgroundPosition: "center",
              pointerEvents: "none",
              transform: `translate(-50%, -50%) rotate(${imageBox.rotation}deg) scale(${scale})`,
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            {imagePaths.map((path, index) => (
              <img
                key={index}
                src={path}
                alt={`Image ${index}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: index === imageBox.imageIndex ? 1 : 0, // Only show the current image
                }}
              />
            ))}
          </div>
        )}
        <span className="right-text">Human Lead</span>
      </div>
    </div>
  );
}

export default Home_Title;
