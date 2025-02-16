import "./Home_Footer.css";
import { Link } from "react-router-dom";

function Home_Footer() {
  return (
    <footer className="footer-outer">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="asterix">*</span>
          <p className="footer-text">
            multidisciplinary future+tech focused creative studio helping brands
            harness creative tech to maximise brand impressions through
            innovative digital marketing campaigns
          </p>
        </div>
        <div className="footer-right">
          <Link to="/connect" className="footer-button">
            Let’s talk
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="square"
              strokeLinejoin="miter"
              className="footer-icon"
            >
              <path d="M5 19L19 5M5 5h14v14" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Home_Footer;
