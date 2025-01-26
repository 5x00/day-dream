import "./Footer.css";

function Footer() {
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
          <button className="footer-button">
            Let’s talk
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="footer-icon"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
