const pool = require("../db");

// GET /api/characters — fetch all characters belonging to the logged-in user
const getCharacters = async (req, res) => {
  try {
    const characters = await pool.query(
      "SELECT * FROM characters WHERE user_id = $1 ORDER BY created_at DESC",
      [req.userId],
    );
    res.json(characters.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/characters — create a new character for the logged-in user
const createCharacter = async (req, res) => {
  try {
    const {
      name,
      race,
      class: characterClass,
      strength,
      dexterity,
      intelligence,
      backstory,
    } = req.body;

    if (
      !name ||
      !race ||
      !characterClass ||
      strength == null ||
      dexterity == null ||
      intelligence == null
    ) {
      return res
        .status(400)
        .json({ message: "All character fields are required" });
    }

    const newCharacter = await pool.query(
      `INSERT INTO characters (user_id, name, race, "class", strength, dexterity, intelligence, backstory)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        req.userId,
        name,
        race,
        characterClass,
        strength,
        dexterity,
        intelligence,
        backstory || null,
      ],
    );

    res.status(201).json(newCharacter.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/characters/:id — delete a character (only if it belongs to the logged-in user)
const deleteCharacter = async (req, res) => {
  try {
    const { id } = req.params;

    const character = await pool.query(
      "SELECT id FROM characters WHERE id = $1 AND user_id = $2",
      [id, req.userId],
    );

    if (character.rows.length === 0) {
      return res.status(404).json({ message: "Character not found" });
    }

    await pool.query("DELETE FROM characters WHERE id = $1", [id]);
    res.json({ message: "Character deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCharacters, createCharacter, deleteCharacter };
