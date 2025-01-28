import "./App.css";
import Header from "./Header";
import Works_Temp from "./components/Works_Temp";
import { useEffect } from "react";

function WorksPage() {
  useEffect(() => {
    // Set the body background color when the component mounts
    document.body.style.background =
      "linear-gradient(0deg, #ffffff, #ff6a00, #ff49a1)";
    document.body.style.margin = "0"; // Optional, to remove body margins

    // Cleanup: Reset the body background when the component unmounts
    return () => {
      document.body.style.background = "";
    };
  }, []);

  return (
    <div className="app-container">
      <Header />
      <Works_Temp />
    </div>
  );
}

export default WorksPage;
