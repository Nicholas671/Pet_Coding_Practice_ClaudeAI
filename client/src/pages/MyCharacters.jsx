import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import Navbar from "../components/Navbar";
import { getTitle } from "../characterTitle";
import SpriteCanvas from "../components/SpriteCanvas";

function MyCharacters() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await api.get("/characters");
        setCharacters(res.data);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate("/login");
        } else {
          setError("Failed to load characters");
        }
      }
    };
    fetchCharacters();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/characters/${id}`);
      setCharacters(characters.filter((c) => c.id !== id));
    } catch (err) {
      setError("Failed to delete character");
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <h2 style={styles.pageTitle}>Hall of Heroes</h2>
        <div style={styles.titleRule} />

        {error && <p className="error-text">{error}</p>}

        {characters.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>Your hall is empty, adventurer.</p>
            <Link to="/builder">
              <button className="btn-primary">Forge Your First Character</button>
            </Link>
          </div>
        ) : (
          <div style={styles.grid}>
            {characters.map((char) => (
              <div key={char.id} style={styles.card} className="parchment-panel">
                <div style={styles.cardHeader} />
                <SpriteCanvas
                  race={char.race}
                  characterClass={char.class}
                  strength={char.strength}
                  dexterity={char.dexterity}
                  intelligence={char.intelligence}
                  scale={3}
                />
                <h3 style={styles.charName}>{char.name}</h3>
                <p style={styles.charTitle}>
                  {getTitle(char.race, char.class, char.strength, char.dexterity, char.intelligence)}
                </p>
                <hr style={styles.cardDivider} />
                <p style={styles.charRace}>{char.race}</p>
                <div style={styles.stats}>
                  <div style={styles.stat}>
                    <span style={styles.statLabel}>STR</span>
                    <span style={styles.statVal}>{char.strength}</span>
                  </div>
                  <div style={styles.stat}>
                    <span style={styles.statLabel}>DEX</span>
                    <span style={styles.statVal}>{char.dexterity}</span>
                  </div>
                  <div style={styles.stat}>
                    <span style={styles.statLabel}>INT</span>
                    <span style={styles.statVal}>{char.intelligence}</span>
                  </div>
                </div>
                <button onClick={() => handleDelete(char.id)} className="btn-danger" style={styles.deleteBtn}>
                  Banish
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  page: {
    maxWidth: "960px",
    margin: "40px auto",
    padding: "0 24px",
  },
  pageTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: "2rem",
    color: "#c9a84c",
    textAlign: "center",
    margin: "0 0 8px",
    textShadow: "0 2px 8px rgba(0,0,0,0.8)",
  },
  titleRule: {
    height: "2px",
    background: "linear-gradient(90deg, transparent, #8b1a1a, #c9a84c, #8b1a1a, transparent)",
    margin: "0 auto 36px",
    maxWidth: "400px",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#a09880",
    fontStyle: "italic",
  },
  emptyText: {
    fontSize: "1.2rem",
    marginBottom: "20px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    width: "200px",
    padding: "0 20px 20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardHeader: {
    height: "5px",
    width: "calc(100% + 40px)",
    marginLeft: "-20px",
    background: "linear-gradient(90deg, #8b1a1a, #c9a84c, #8b1a1a)",
    borderRadius: "4px 4px 0 0",
    marginBottom: "16px",
  },
  charName: {
    fontFamily: "'Cinzel', serif",
    fontSize: "1.1rem",
    color: "#2a1e10",
    margin: "0 0 4px",
  },
  charTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: "0.75rem",
    color: "#8b1a1a",
    letterSpacing: "0.05em",
    margin: "0",
  },
  cardDivider: {
    border: "none",
    borderTop: "1px solid #c4a97d",
    width: "100%",
    margin: "12px 0",
  },
  charRace: {
    fontStyle: "italic",
    color: "#5a3e20",
    fontSize: "0.9rem",
    margin: "0 0 12px",
  },
  stats: {
    display: "flex",
    gap: "10px",
    marginBottom: "14px",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  statLabel: {
    fontFamily: "'Cinzel', serif",
    fontSize: "0.65rem",
    color: "#7a6a50",
    letterSpacing: "0.05em",
  },
  statVal: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#2a1e10",
  },
  deleteBtn: {
    marginTop: "auto",
    width: "100%",
  },
};

export default MyCharacters;
