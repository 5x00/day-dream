import Homepage from "./Homepage";
import CreatorPage from "./CreatorPage";
import WorksPage from "./WorksPage";
import ConnectPage from "./ConnectPage";
import Solutions from "./Solutions";
import Header from "./Header";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 0, transition: { duration: 0.5 } },
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }, // Delayed appearance
  exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500); // Simulate loading
  }, []);

  return (
    <Router>
      {loading ? (
        <Loading onFinish={() => setLoading(false)} />
      ) : (
        <div className="app-container">
          <Header />
          <MainContent />
        </div>
      )}
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="motion-wrapper"
              >
                <motion.div
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="motion-wrapper"
                >
                  <Homepage />
                </motion.div>
              </motion.div>
            }
          />

          {/* Routes for other pages */}
          <Route
            path="/creator"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="motion-wrapper"
              >
                <motion.div
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="motion-wrapper"
                >
                  <CreatorPage />
                </motion.div>
              </motion.div>
            }
          />
          <Route
            path="/works"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="motion-wrapper"
              >
                <motion.div
                  className="workpage-gradient"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <WorksPage />
                </motion.div>
              </motion.div>
            }
          />
          <Route
            path="/connect"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="motion-wrapper"
              >
                <motion.div
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="motion-wrapper"
                >
                  <ConnectPage />
                </motion.div>
              </motion.div>
            }
          />
          <Route
            path="/solutions"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="motion-wrapper"
              >
                <motion.div
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="motion-wrapper"
                >
                  <Solutions />
                </motion.div>
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
