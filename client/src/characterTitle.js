// Adjectives triggered when a stat reaches 5+.
// Lookup order: ADJECTIVES[stat][race][class]

const ADJECTIVES = {
  strength: {
    Human:      { Warrior: "Mighty",      Mage: "Brutish",     Rogue: "Brutal",      Paladin: "Stalwart",   Ranger: "Rugged",      Necromancer: "Iron-Fisted" },
    Elf:        { Warrior: "Fierce",      Mage: "Forceful",    Rogue: "Wiry",        Paladin: "Resolute",   Ranger: "Swift",        Necromancer: "Grim"        },
    Dwarf:      { Warrior: "Stout",       Mage: "Ironbark",    Rogue: "Stocky",      Paladin: "Stalwart",   Ranger: "Grizzled",     Necromancer: "Ironbound"   },
    Orc:        { Warrior: "Savage",      Mage: "Brutish",     Rogue: "Vicious",     Paladin: "Fearsome",   Ranger: "Primal",       Necromancer: "Wrathful"    },
    Halfling:   { Warrior: "Scrappy",     Mage: "Feisty",      Rogue: "Tenacious",   Paladin: "Plucky",     Ranger: "Hardy",        Necromancer: "Relentless"  },
    Dragonborn: { Warrior: "Draconic",    Mage: "Thunderous",  Rogue: "Ferocious",   Paladin: "Dreadful",   Ranger: "Primordial",   Necromancer: "Terrible"    },
  },
  dexterity: {
    Human:      { Warrior: "Agile",       Mage: "Nimble",      Rogue: "Slippery",    Paladin: "Graceful",   Ranger: "Fleet-Footed", Necromancer: "Elusive"     },
    Elf:        { Warrior: "Lithe",       Mage: "Quickened",   Rogue: "Phantom",     Paladin: "Swift",      Ranger: "Windrunner",   Necromancer: "Spectral"    },
    Dwarf:      { Warrior: "Nimble",      Mage: "Quickened",   Rogue: "Sneaky",      Paladin: "Agile",      Ranger: "Sure-Footed",  Necromancer: "Elusive"     },
    Orc:        { Warrior: "Swift",       Mage: "Frenzied",    Rogue: "Cunning",     Paladin: "Charging",   Ranger: "Bounding",     Necromancer: "Lurking"     },
    Halfling:   { Warrior: "Quickstrike", Mage: "Flickering",  Rogue: "Vanishing",   Paladin: "Darting",    Ranger: "Breezy",       Necromancer: "Wispy"       },
    Dragonborn: { Warrior: "Blazing",     Mage: "Tempest",     Rogue: "Darting",     Paladin: "Radiant",    Ranger: "Soaring",      Necromancer: "Drifting"    },
  },
  intelligence: {
    Human:      { Warrior: "Tactician",   Mage: "Brilliant",   Rogue: "Cunning",     Paladin: "Devout",     Ranger: "Keen",         Necromancer: "Learned"     },
    Elf:        { Warrior: "Calculating", Mage: "Arcane",      Rogue: "Scheming",    Paladin: "Enlightened",Ranger: "Perceptive",   Necromancer: "Ancient"     },
    Dwarf:      { Warrior: "Runic",       Mage: "Loremaster",  Rogue: "Shrewd",      Paladin: "Pious",      Ranger: "Woodwise",     Necromancer: "Cryptic"     },
    Orc:        { Warrior: "Warchief",    Mage: "Shamanic",    Rogue: "Scheming",    Paladin: "Zealous",    Ranger: "Tracker",      Necromancer: "Bloodbound"  },
    Halfling:   { Warrior: "Clever",      Mage: "Gifted",      Rogue: "Mastermind",  Paladin: "Studious",   Ranger: "Insightful",   Necromancer: "Peculiar"    },
    Dragonborn: { Warrior: "Ancient",     Mage: "Draconic",    Rogue: "Mystical",    Paladin: "Divine",     Ranger: "Farsighted",   Necromancer: "Eldritch"    },
  },
};

const THRESHOLD = 5;

/**
 * Returns the full character title, e.g. "Stout Warrior" or just "Warrior".
 * The adjective is based on whichever stat is highest and at or above the threshold.
 * Tiebreaker priority: strength > dexterity > intelligence.
 */
export function getTitle(race, characterClass, strength, dexterity, intelligence) {
  if (!race || !characterClass) return characterClass || "";

  // Find the dominant stat (highest value that meets the threshold)
  const candidates = [
    { stat: "strength",     value: Number(strength) },
    { stat: "dexterity",    value: Number(dexterity) },
    { stat: "intelligence", value: Number(intelligence) },
  ].filter((s) => s.value >= THRESHOLD);

  if (candidates.length === 0) return characterClass;

  // Pick the highest value; tiebreaker is the order above (STR > DEX > INT)
  const dominant = candidates.reduce((best, cur) => cur.value > best.value ? cur : best);

  const adjective = ADJECTIVES[dominant.stat]?.[race]?.[characterClass];
  return adjective ? `${adjective} ${characterClass}` : characterClass;
}
