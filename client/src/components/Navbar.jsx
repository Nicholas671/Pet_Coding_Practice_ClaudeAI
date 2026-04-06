import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  // Controls whether the mobile menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-crest">⚔</span>
        <span className="navbar-brand-text">Mythical Characters</span>
        <span className="navbar-crest">⚔</span>
      </div>

      {/* Hamburger button — only visible on mobile via CSS */}
      <button
        className="navbar-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      {/* Links — collapse on mobile unless menuOpen */}
      <div className={`navbar-links${menuOpen ? " open" : ""}`}>
        <Link to="/characters" className="navbar-link" onClick={closeMenu}>My Characters</Link>
        <span className="navbar-divider">|</span>
        <Link to="/builder" className="navbar-link" onClick={closeMenu}>Build Character</Link>
        <button onClick={handleLogout} className="btn-outline">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
