import "./Creator_Title.css"
import { useState, useEffect } from "react";

function Creator_Title () {

    const [backgroundImage, setBackgroundImage] = useState("");

    useEffect(() => {
    // List of image file names in your folder
    const images = [
      "f1.jpg",
    ];

    // Pick a random image
    const randomImage =
      images[Math.floor(Math.random() * images.length)];

    // Set the background image
    setBackgroundImage(`/images/${randomImage}`); // Adjust the path as needed
    }, []);

    return (
    <div className="outer-container">
        <div 
        className="inner-container"
        style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
          >
          <h1 className="creator-text">creator</h1>
        </div>
    </div>
    );
}

export default Creator_Title;