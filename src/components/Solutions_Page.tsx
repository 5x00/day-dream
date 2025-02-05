import React, { useState, useEffect, useRef } from "react";
import "./Solutions_Page.css";

const items = [
  {
    title: "Creative Direction",
    description:
      "This is the description for solution 1. It explains many benefits and details about the solution.",
    media: "https://via.placeholder.com/800x400?text=Solution+1",
  },
  {
    title: "Bespoke AI Models",
    description:
      "Here is solution 2 – offering another set of interesting features and explanations.",
    media: "https://via.placeholder.com/800x400?text=Solution+2",
  },
  {
    title: "GenAI Influencers",
    description:
      "Solution 3 comes with a unique set of capabilities and an engaging description.",
    media: "https://via.placeholder.com/800x400?text=Solution+3",
  },
  {
    title: "GenAI Generators",
    description:
      "Solution 3 comes with a unique set of capabilities and an engaging description.",
    media: "https://via.placeholder.com/800x400?text=Solution+3",
  },
  {
    title: "CGI Visualizations",
    description:
      "Solution 3 comes with a unique set of capabilities and an engaging description.",
    media: "https://via.placeholder.com/800x400?text=Solution+3",
  },
  // Add additional objects as needed.
];

function Solutions_Page() {
  // Keep track of the currently selected item
  const [selectedIndex, setSelectedIndex] = useState(0);
  // The description text that is progressively shown via the typing effect
  const [displayedDescription, setDisplayedDescription] = useState("");
  // Reference to the interval used for typing animation (so we can clear it)
  const descriptionIntervalRef = useRef<number | null>(null);

  const [active, setActive] = useState(false);

  const currentItem = items[selectedIndex];

  // Typing animation effect:
  useEffect(() => {
    // Clear any previous interval
    if (descriptionIntervalRef.current) {
      clearInterval(descriptionIntervalRef.current);
    }
    // Start with an empty description
    setDisplayedDescription("");
    const fullText = currentItem.description;
    let currentChar = 0;
    descriptionIntervalRef.current = setInterval(() => {
      currentChar++;
      setDisplayedDescription(fullText.slice(0, currentChar));
      if (currentChar === fullText.length) {
        clearInterval(descriptionIntervalRef.current ?? undefined);
      }
    }, 10); // Adjust the typing speed (in ms) as desired

    // Cleanup on unmount or if the description changes
    return () => clearInterval(descriptionIntervalRef.current ?? undefined);
  }, [selectedIndex, currentItem.description]);

  return (
    <div className="solutions-page">
      <div className="solutions-container">
        <div className="sol-button-container">
          {items.map((item, index) => (
            <a
              key={index}
              onClick={() => {
                setSelectedIndex(index);
                setActive(!active);
              }}
              className={`sol-button ${
                index === selectedIndex ? "active" : ""
              }`}
            >
              {item.title}
            </a>
          ))}
        </div>

        {/* --- Media Div --- */}
        <div className="media-div">
          {/* Assuming media is an image */}
          <img src={currentItem.media} alt={currentItem.title} />
        </div>
        <div className="description-div">{displayedDescription}</div>
      </div>
    </div>
  );
}

export default Solutions_Page;
