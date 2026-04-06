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
      <div className="builder-page">
        <div className="builder-panel parchment-panel">
          <div className="builder-header-bar" />
          <h2 className="builder-title">Forge a Character</h2>
          <p className="builder-subtitle">Choose your lineage and destiny</p>

          <form onSubmit={handleSubmit} className="builder-form">

            <label className="builder-label">Name</label>
            <input
              name="name"
              placeholder="What shall they be called?"
              value={form.name}
              onChange={handleFormChange}
              className="parchment-input"
            />

            <div className="builder-row">
              <div className="builder-col">
                <label className="builder-label">Race</label>
                <select name="race" value={form.race} onChange={handleFormChange} className="parchment-input">
                  <option value="" disabled>Select Race...</option>
                  {RACES.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="builder-col">
                <label className="builder-label">Class</label>
                <select name="class" value={form.class} onChange={handleFormChange} className="parchment-input">
                  <option value="" disabled>Select Class...</option>
                  {CLASSES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {showStats && (
              <div className="stats-panel stone-panel">
                <div className="sprite-preview">
                  <SpriteCanvas
                    race={form.race}
                    characterClass={form.class}
                    strength={finalStats.strength}
                    dexterity={finalStats.dexterity}
                    intelligence={finalStats.intelligence}
                    scale={5}
                  />
                </div>

                <p className="title-preview">
                  <span className="preview-name">{form.name || "Your hero"}</span>
                  <span className="preview-the"> the </span>
                  <span className="preview-title">{titlePreview}</span>
                </p>

                <div className="bonus-badge">
                  <span className="bonus-num">{bonusRemaining}</span>
                  <span className="bonus-label">bonus pts left</span>
                </div>

                {["strength", "dexterity", "intelligence"].map((stat) => (
                  <div key={stat} className="stat-row">
                    <span className="stat-row-name">{STAT_LABELS[stat]}</span>
                    <span className="stat-row-base">base {baseStats[stat]}</span>
                    <div className="bonus-controls">
                      <button type="button" className="adj-btn"
                        onClick={() => adjustBonus(stat, -1)} disabled={bonus[stat] === 0}>−</button>
                      <span className="bonus-val">+{bonus[stat]}</span>
                      <button type="button" className="adj-btn"
                        onClick={() => adjustBonus(stat, 1)} disabled={bonusRemaining === 0}>+</button>
                    </div>
                    <span className="stat-total">{finalStats[stat]}</span>
                  </div>
                ))}
              </div>
            )}

            {error && <p className="error-text">{error}</p>}
            <button type="submit" className="btn-primary btn-full">
              Save to the Hall of Heroes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CharacterBuilder;
