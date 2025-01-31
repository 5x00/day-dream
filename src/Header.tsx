import "./Header.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          day-dream
        </Link>
        <button className="menu-button" onClick={toggleMenu}>
          ☰
        </button>
        <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
          <Link
            to="/creator"
            className="nav-links"
            onClick={() => setMenuOpen(false)}
          >
            creator
          </Link>
          <Link
            to="/works"
            className="nav-links"
            onClick={() => setMenuOpen(false)}
          >
            works
          </Link>
          <Link
            to="/solutions"
            className="nav-links"
            onClick={() => setMenuOpen(false)}
          >
            solutions
          </Link>
          <Link
            to="/connect"
            className="nav-links"
            onClick={() => setMenuOpen(false)}
          >
            connect
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
