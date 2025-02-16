import "./Connect_Footer.css"; // Import the CSS file for styling

const Connect_Footer = () => {
  return (
    <footer className="connect-footer">
      <div className="connect-footer-inner">
        <div className="connect-footer-left">
          <a
            href="https://www.instagram.com/from.daydream/"
            target="_blank"
            rel="noopener noreferrer"
            className="connect-footer-link"
          >
            instagram
          </a>
          <a
            href="https://www.linkedin.com/company/from-daydream"
            target="_blank"
            rel="noopener noreferrer"
            className="connect-footer-link"
          >
            linkedin
          </a>
          <a
            href="mailto:hello@day-dream.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="connect-footer-link"
          >
            hello@day-dream.studio
          </a>
        </div>
        <div className="connect-footer-right">
          <a className="connect-footer-link">made in kozhikode</a>
          <p>© 2025 day-dream. all rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Connect_Footer;
