import "./Header.css";
import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">day-dream</div>
        <button className="menu-button" onClick={toggleMenu}>
          ☰
        </button>
        <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
          <a href="#creator" className="nav-link">
            creator
          </a>
          <a href="#works" className="nav-link">
            works
          </a>
          <a href="#connect" className="nav-link">
            connect
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
