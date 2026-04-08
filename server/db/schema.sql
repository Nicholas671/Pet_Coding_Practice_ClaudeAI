--Planned additions include colums for XP and leveling for the characters

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE characters (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  race VARCHAR(50) NOT NULL,
  "class" VARCHAR(50) NOT NULL,
  strength INTEGER NOT NULL,
  dexterity INTEGER NOT NULL,
  intelligence INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
  
)

-- planned columns for XP + leveling (run ALTER TABLE when ready to add)
-- ALTER TABLE characters ADD COLUMN levelINTEGER NOT NULL DEFAULT 1;
-- ALTER TABLE characters ADD COLUMN xp INTEGER NOT NULL DEFAULT 0;
-- ALTER TABLE characters ADD COLUMN ability_points_available INTEGER NOT NULL DEFAULT 0;
