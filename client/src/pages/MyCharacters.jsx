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
      <div className="page-container">
        <h2 className="page-title">Hall of Heroes</h2>
        <div className="page-title-rule" />

        {error && <p className="error-text">{error}</p>}

        {characters.length === 0 ? (
          <div className="empty-state">
            <p>Your hall is empty, adventurer.</p>
            <Link to="/builder">
              <button className="btn-primary">
                Forge Your First Character
              </button>
            </Link>
          </div>
        ) : (
          <div className="char-grid">
            {characters.map((char) => (
              <div key={char.id} className="char-card parchment-panel">
                <div className="card-header-bar" />

                <SpriteCanvas
                  race={char.race}
                  characterClass={char.class}
                  strength={char.strength}
                  dexterity={char.dexterity}
                  intelligence={char.intelligence}
                  scale={3}
                />

                {/* Info block — on mobile this sits beside the sprite */}
                <div className="char-card-info">
                  <h3 className="char-name">{char.name}</h3>
                  <p className="char-title">
                    {getTitle(
                      char.race,
                      char.class,
                      char.strength,
                      char.dexterity,
                      char.intelligence,
                    )}
                  </p>
                  <hr className="char-divider" />
                  <p className="char-race">{char.race}</p>
                  {char.backstory && (
                    <p
                      style={{
                        fontStyle: "italic",
                        fontSize: "0.85rem",
                        color: "#5a3e20",
                      }}
                    >
                      {char.backstory}
                    </p>
                  )}

                  <div className="stat-trio">
                    {[
                      ["STR", char.strength],
                      ["DEX", char.dexterity],
                      ["INT", char.intelligence],
                    ].map(([label, val]) => (
                      <div key={label} className="stat-trio-item">
                        <span className="stat-trio-label">{label}</span>
                        <span className="stat-trio-val">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(char.id)}
                  className="btn-danger"
                  style={{ width: "100%", marginTop: "8px" }}
                >
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

export default MyCharacters;
