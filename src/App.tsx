import Header from "./Header";
import Home_Title from "./components/Home_Title";
import Home_Footer from "./components/Home_Footer";
import CreatorPage from "./CreatorPage";
import WorksPage from "./WorksPage";
import ConnectPage from "./ConnectPage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* Header will always be visible */}
      <main>
        <Routes>
          {/* Home route renders Home_Title and Home_Footer */}
          <Route
            path="/"
            element={
              <>
                <div className="app-container">
                  <Header />
                  <Home_Title />
                  <Home_Footer />
                </div>
              </>
            }
          />
          {/* Routes for other pages */}
          <Route path="/creator" element={<CreatorPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/connect" element={<ConnectPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
