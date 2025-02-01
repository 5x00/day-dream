import "./Creator_Footer.css";

function Creator_Footer() {
  return (
    <footer className="footer">
      {/* Text Section */}
      <div className="text-section">
        <p>
          Creator is our fully managed AI-powered image generation platform,
          custom-trained to meet your specific needs. Whether you're in fashion,
          automotive, influencer marketing, or branding, our tailored solutions
          are designed to fulfill all your generative imagery requirements.
        </p>
        <div className="callback-container">
          <a href="#" className="nav-link">
            Get Started
          </a>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="login-container">
        <form className="login-form">
          <div className="input-container">
            <input type="text" id="username" name="username" />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-container">
            <input type="password" id="password" name="password" />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </footer>
  );
}

export default Creator_Footer;
