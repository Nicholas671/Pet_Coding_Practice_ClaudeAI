import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Navbar from "../components/Navbar";
import { getTitle } from "../characterTitle";
import SpriteCanvas from "../components/SpriteCanvas";

const RACES = ["Human", "Elf", "Dwarf", "Orc", "Halfling", "Dragonborn"];
const CLASSES = ["Warrior", "Mage", "Rogue", "Paladin", "Ranger", "Necromancer"];

// Base points contributed by each race (total: 4)
const RACE_STATS = {
  Human:       { strength: 1, dexterity: 1, intelligence: 2 },
  Elf:         { strength: 0, dexterity: 2, intelligence: 2 },
  Dwarf:       { strength: 2, dexterity: 0, intelligence: 2 },
  Orc:         { strength: 3, dexterity: 1, intelligence: 0 },
  Halfling:    { strength: 0, dexterity: 3, intelligence: 1 },
  Dragonborn:  { strength: 2, dexterity: 0, intelligence: 2 },
};

// Base points contributed by each class (total: 3)
const CLASS_STATS = {
  Warrior:     { strength: 2, dexterity: 1, intelligence: 0 },
  Mage:        { strength: 0, dexterity: 0, intelligence: 3 },
  Rogue:       { strength: 0, dexterity: 2, intelligence: 1 },
  Paladin:     { strength: 1, dexterity: 0, intelligence: 2 },
  Ranger:      { strength: 0, dexterity: 2, intelligence: 1 },
  Necromancer: { strength: 0, dexterity: 1, intelligence: 2 },
};

const BONUS_POINTS = 3;
const EMPTY_BONUS = { strength: 0, dexterity: 0, intelligence: 0 };

const getBaseStats = (race, characterClass) => {
  const r = RACE_STATS[race]  || EMPTY_BONUS;
  const c = CLASS_STATS[characterClass] || EMPTY_BONUS;
  return {
    strength:     r.strength     + c.strength,
    dexterity:    r.dexterity    + c.dexterity,
    intelligence: r.intelligence + c.intelligence,
  };
};

const STAT_LABELS = { strength: "Strength", dexterity: "Dexterity", intelligence: "Intelligence" };

function CharacterBuilder() {
  const [form, setForm] = useState({ name: "", race: "", class: "" });
  const [bonus, setBonus] = useState(EMPTY_BONUS);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const baseStats = getBaseStats(form.race, form.class);
  const bonusSpent = bonus.strength + bonus.dexterity + bonus.intelligence;
  const bonusRemaining = BONUS_POINTS - bonusSpent;

  const finalStats = {
    strength:     baseStats.strength     + bonus.strength,
    dexterity:    baseStats.dexterity    + bonus.dexterity,
    intelligence: baseStats.intelligence + bonus.intelligence,
  };
  const titlePreview = getTitle(form.race, form.class, finalStats.strength, finalStats.dexterity, finalStats.intelligence);

  const handleFormChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    if (e.target.name === "race" || e.target.name === "class") {
      setBonus(EMPTY_BONUS);
    }
  };

  const adjustBonus = (stat, delta) => {
    const next = bonus[stat] + delta;
    if (next < 0 || bonusRemaining - delta < 0) return;
    setBonus({ ...bonus, [stat]: next });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.race || !form.class) return setError("Please select a race and class");
    if (bonusRemaining > 0) return setError(`You have ${bonusRemaining} bonus point(s) left to spend`);

    try {
      await api.post("/characters", { name: form.name, race: form.race, class: form.class, ...finalStats });
      navigate("/characters");
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/login");
      } else {
        setError(err.response?.data?.message || "Failed to create character");
      }
    }
  };

  const showStats = form.race && form.class;

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <div style={styles.panel} className="parchment-panel">
          <div style={styles.headerBar} />
          <h2 style={styles.title}>Forge a Character</h2>
          <p style={styles.subtitle}>Choose your lineage and destiny</p>

          <form onSubmit={handleSubmit} style={styles.form}>

            <label style={styles.label}>Name</label>
            <input
              name="name"
              placeholder="What shall they be called?"
              value={form.name}
              onChange={handleFormChange}
              className="parchment-input"
            />

            <div style={styles.row}>
              <div style={styles.col}>
                <label style={styles.label}>Race</label>
                <select name="race" value={form.race} onChange={handleFormChange} className="parchment-input">
                  <option value="" disabled>Select Race...</option>
                  {RACES.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div style={styles.col}>
                <label style={styles.label}>Class</label>
                <select name="class" value={form.class} onChange={handleFormChange} className="parchment-input">
                  <option value="" disabled>Select Class...</option>
                  {CLASSES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {showStats && (
              <div style={styles.statsPanel} className="stone-panel">
                {/* Live sprite preview */}
                <div style={styles.spriteWrap}>
                  <SpriteCanvas
                    race={form.race}
                    characterClass={form.class}
                    strength={finalStats.strength}
                    dexterity={finalStats.dexterity}
                    intelligence={finalStats.intelligence}
                    scale={5}
                  />
                </div>

                {/* Live title preview */}
                <p style={styles.titlePreview}>
                  <span style={styles.previewName}>{form.name || "Your hero"}</span>
                  <span style={styles.previewThe}> the </span>
                  <span style={styles.previewTitle}>{titlePreview}</span>
                </p>

                <div style={styles.bonusBadge}>
                  <span style={styles.bonusNum}>{bonusRemaining}</span>
                  <span style={styles.bonusLabel}>bonus pts left</span>
                </div>

                {["strength", "dexterity", "intelligence"].map((stat) => (
                  <div key={stat} style={styles.statRow}>
                    <span style={styles.statName}>{STAT_LABELS[stat]}</span>
                    <span style={styles.statBase}>base {baseStats[stat]}</span>
                    <div style={styles.bonusControls}>
                      <button type="button" onClick={() => adjustBonus(stat, -1)}
                        style={styles.adjBtn} disabled={bonus[stat] === 0}>−</button>
                      <span style={styles.bonusValue}>+{bonus[stat]}</span>
                      <button type="button" onClick={() => adjustBonus(stat, 1)}
                        style={styles.adjBtn} disabled={bonusRemaining === 0}>+</button>
                    </div>
                    <span style={styles.statTotal}>{finalStats[stat]}</span>
                  </div>
                ))}
              </div>
            )}

            {error && <p className="error-text">{error}</p>}
            <button type="submit" className="btn-primary" style={styles.submitBtn}>
              Save to the Hall of Heroes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 24px",
    boxSizing: "border-box",
  },
  panel: {
    width: "100%",
    maxWidth: "560px",
    padding: "0 32px 32px",
  },
  headerBar: {
    height: "6px",
    background: "linear-gradient(90deg, #8b1a1a, #c9a84c, #8b1a1a)",
    margin: "0 -32px 28px",
    borderRadius: "4px 4px 0 0",
  },
  title: {
    fontFamily: "'Cinzel', serif",
    fontSize: "1.8rem",
    color: "#2a1e10",
    margin: "0 0 4px",
    textAlign: "center",
  },
  subtitle: {
    color: "#7a6a50",
    fontStyle: "italic",
    textAlign: "center",
    margin: "0 0 24px",
    fontSize: "0.95rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontFamily: "'Cinzel', serif",
    fontSize: "0.78rem",
    letterSpacing: "0.06em",
    color: "#5a3e20",
    display: "block",
    marginBottom: "4px",
  },
  row: {
    display: "flex",
    gap: "12px",
  },
  col: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  statsPanel: {
    padding: "16px 20px",
    marginTop: "4px",
  },
  spriteWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "16px",
  },
  titlePreview: {
    textAlign: "center",
    margin: "0 0 14px",
    fontSize: "1.05rem",
  },
  previewName: {
    color: "#c9a84c",
    fontFamily: "'Cinzel', serif",
    fontSize: "1rem",
  },
  previewThe: {
    color: "#a09880",
    fontStyle: "italic",
  },
  previewTitle: {
    color: "#c9a84c",
    fontFamily: "'Cinzel', serif",
    fontWeight: "700",
    fontSize: "1rem",
  },
  bonusBadge: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "16px",
  },
  bonusNum: {
    fontSize: "2rem",
    fontFamily: "'Cinzel', serif",
    color: "#c9a84c",
    lineHeight: 1,
  },
  bonusLabel: {
    fontSize: "0.75rem",
    color: "#a09880",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  statRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  statName: {
    fontFamily: "'Cinzel', serif",
    fontSize: "0.8rem",
    color: "#c8c8c8",
    width: "100px",
    letterSpacing: "0.04em",
  },
  statBase: {
    fontSize: "0.8rem",
    color: "#888880",
    width: "54px",
    textAlign: "right",
  },
  bonusControls: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flex: 1,
    justifyContent: "center",
  },
  adjBtn: {
    width: "28px",
    height: "28px",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "3px",
    border: "1px solid #5a3030",
    backgroundColor: "#2a1a1a",
    color: "#c8c8c8",
    lineHeight: 1,
  },
  bonusValue: {
    width: "28px",
    textAlign: "center",
    fontFamily: "'Cinzel', serif",
    fontSize: "0.9rem",
    color: "#c9a84c",
  },
  statTotal: {
    fontFamily: "'Cinzel', serif",
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#c9a84c",
    width: "28px",
    textAlign: "right",
  },
  submitBtn: {
    marginTop: "8px",
    width: "100%",
  },
};

export default CharacterBuilder;
