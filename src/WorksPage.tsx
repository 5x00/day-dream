import "./App.css";
import Works_Temp from "./components/Works_Temp";
import { useEffect } from "react";

function WorksPage() {
  useEffect(() => {
    // Set the body background color when the component mounts
    document.body.style.margin = "0"; // Optional, to remove body margins
    // Cleanup: Reset the body background when the component unmounts
    return () => {
      document.body.style.background = "";
    };
  }, []);

  return (
    <div className="workpage-container">
      <Works_Temp />
    </div>
  );
}

export default WorksPage;
