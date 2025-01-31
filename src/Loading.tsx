import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./Loading.css";

const Loading = ({ onFinish }: { onFinish: () => void }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
      onFinish();
    }, 2500); // Adjust duration

    return () => clearTimeout(timeout);
  }, [onFinish]);

  return show ? (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="loading-container">
        <div className="loading-home">
          <motion.div
            className="loading-line"
            initial={{ width: "0%" }}
            animate={{
              width: ["0%", "100%", "0%"], // Moves from 0% -> 100% -> 0%
              left: ["0%", "0%", "100%"], // Keeps left at 0% while expanding, then shifts to 100%
            }}
            transition={{
              duration: 2.4, // Total duration for both animations
              ease: "easeInOut",
              times: [0, 0.5, 1], // Timing for each keyframe
            }}
          ></motion.div>
        </div>
      </div>
    </motion.div>
  ) : null;
};

export default Loading;
