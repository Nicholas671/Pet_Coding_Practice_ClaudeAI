import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      {/* Left: decorative border + brand name */}
      <div style={styles.brandWrap}>
        <span style={styles.crest}>⚔</span>
        <span style={styles.brand}>Mythical Characters</span>
        <span style={styles.crest}>⚔</span>
      </div>

      {/* Right: nav links + logout */}
      <div style={styles.links}>
        <Link to="/characters" style={styles.link}>My Characters</Link>
        <span style={styles.divider}>|</span>
        <Link to="/builder" style={styles.link}>Build Character</Link>
        <button onClick={handleLogout} className="btn-outline" style={styles.logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 28px",
    height: "60px",
    background: "linear-gradient(180deg, #1e1810 0%, #0e0c08 100%)",
    borderBottom: "2px solid #8b1a1a",
    boxShadow: "0 2px 16px rgba(0,0,0,0.8)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  brandWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  brand: {
    fontFamily: "'Cinzel', serif",
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#c9a84c",
    letterSpacing: "0.08em",
    textShadow: "0 1px 6px rgba(0,0,0,0.8)",
  },
  crest: {
    color: "#8b1a1a",
    fontSize: "1rem",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  link: {
    fontFamily: "'Cinzel', serif",
    fontSize: "0.85rem",
    letterSpacing: "0.06em",
    color: "#c8c8c8",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  divider: {
    color: "#3a342a",
  },
  logout: {
    marginLeft: "8px",
  },
};

export default Navbar;
