const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const { getCharacters, createCharacter, deleteCharacter } = require("../controllers/characterController");

router.get("/", authenticateToken, getCharacters);
router.post("/", authenticateToken, createCharacter);
router.delete("/:id", authenticateToken, deleteCharacter);

module.exports = router;
