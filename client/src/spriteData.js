// =============================================
//  Pixel Sprite Drawing Data — 32x32 grid
//  All rects are: [x, y, w, h, color]
// =============================================

// --- Skin tones ---
const RACE_SKIN = {
  Human:      '#d4904a',
  Elf:        '#c8b87a',
  Dwarf:      '#b87840',
  Orc:        '#587830',
  Halfling:   '#c88040',
  Dragonborn: '#7a1808',
};

// Hair, beard, scales, features
const RACE_FEATURE = {
  Human:      '#4a2808',
  Elf:        '#d4b830',
  Dwarf:      '#8a3808',
  Orc:        '#101808',
  Halfling:   '#5a3008',
  Dragonborn: '#580808',
};

// Eye colors
const RACE_EYES = {
  Human:      '#1a0a00',
  Elf:        '#20a860',
  Dwarf:      '#1a0a00',
  Orc:        '#c01010',
  Halfling:   '#1a0a00',
  Dragonborn: '#d08000',
};

// Armor / clothing colors per class
const CLASS_COLORS = {
  Warrior:     { primary: '#7a1818', secondary: '#505050', legs: '#383020' },
  Mage:        { primary: '#1830a0', secondary: '#483880', legs: '#201840' },
  Rogue:       { primary: '#201818', secondary: '#302818', legs: '#201818' },
  Paladin:     { primary: '#a0a0a0', secondary: '#c0a020', legs: '#606060' },
  Ranger:      { primary: '#2a5018', secondary: '#4a3010', legs: '#2a3818' },
  Necromancer: { primary: '#180828', secondary: '#380858', legs: '#100820' },
};

// Weapon accent colors per class
const CLASS_ACCENT = {
  Warrior:     '#c0c0c0',
  Mage:        '#60a8ff',
  Rogue:       '#888060',
  Paladin:     '#f0d060',
  Ranger:      '#8a7040',
  Necromancer: '#60d080',
};

// -----------------------------------------------
//  Race body templates
//  Returns array of [x, y, w, h, color] rects
// -----------------------------------------------
const RACE_BODIES = {

  Human: (skin, feature, eyes, cls) => [
    [13, 1, 6, 2, feature],          // hair
    [13, 3, 6, 5, skin],             // face
    [14, 5, 1, 1, eyes],             // left eye
    [17, 5, 1, 1, eyes],             // right eye
    [15, 8, 2, 1, skin],             // neck
    [12, 9, 8, 7, cls.primary],      // torso
    [10, 9, 2, 6, cls.secondary],    // left arm
    [20, 9, 2, 6, cls.secondary],    // right arm
    [10, 15, 2, 1, skin],            // left hand
    [20, 15, 2, 1, skin],            // right hand
    [12, 16, 8, 1, feature],         // belt
    [13, 17, 3, 7, cls.legs],        // left leg
    [16, 17, 3, 7, cls.legs],        // right leg
    [12, 24, 4, 2, '#2a1808'],       // left boot
    [16, 24, 4, 2, '#2a1808'],       // right boot
  ],

  Elf: (skin, feature, eyes, cls) => [
    [13, 0, 6, 3, feature],          // long hair top
    [12, 2, 1, 6, feature],          // hair trail left
    [19, 2, 1, 6, feature],          // hair trail right
    [14, 3, 5, 5, skin],             // face
    [13, 5, 1, 2, skin],             // left pointed ear
    [13, 4, 1, 1, skin],
    [19, 5, 1, 2, skin],             // right pointed ear
    [19, 4, 1, 1, skin],
    [15, 5, 1, 1, eyes],             // left eye
    [18, 5, 1, 1, eyes],             // right eye
    [15, 8, 2, 1, skin],             // neck
    [13, 9, 6, 8, cls.primary],      // torso (slim)
    [11, 9, 2, 7, cls.secondary],    // left arm (long)
    [19, 9, 2, 7, cls.secondary],    // right arm (long)
    [11, 16, 2, 1, skin],            // left hand
    [19, 16, 2, 1, skin],            // right hand
    [13, 17, 2, 8, cls.legs],        // left leg (slim)
    [17, 17, 2, 8, cls.legs],        // right leg (slim)
    [12, 25, 3, 2, '#2a1808'],       // left boot
    [17, 25, 3, 2, '#2a1808'],       // right boot
  ],

  Dwarf: (skin, feature, eyes, cls) => [
    [11, 3, 10, 2, feature],         // hair/helmet base
    [12, 5, 8, 6, skin],             // face (wide)
    [14, 7, 1, 1, eyes],             // left eye
    [17, 7, 1, 1, eyes],             // right eye
    [12, 9, 8, 4, feature],          // thick beard
    [11, 13, 10, 6, cls.primary],    // torso (wide)
    [9, 13, 2, 5, cls.secondary],    // left arm
    [21, 13, 2, 5, cls.secondary],   // right arm
    [9, 18, 2, 1, skin],             // left hand
    [21, 18, 2, 1, skin],            // right hand
    [11, 19, 10, 1, feature],        // belt
    [12, 20, 4, 5, cls.legs],        // left leg
    [16, 20, 4, 5, cls.legs],        // right leg
    [11, 25, 5, 2, '#2a1808'],       // left boot (heavy)
    [16, 25, 5, 2, '#2a1808'],       // right boot (heavy)
  ],

  Orc: (skin, feature, eyes, cls) => [
    [15, 1, 2, 2, feature],          // mohawk
    [12, 2, 8, 7, skin],             // large head
    [13, 4, 2, 1, eyes],             // left eye (wide, menacing)
    [17, 4, 2, 1, eyes],             // right eye
    [14, 8, 1, 3, '#e8e0c0'],        // left tusk
    [17, 8, 1, 3, '#e8e0c0'],        // right tusk
    [14, 9, 4, 2, skin],             // thick neck
    [10, 11, 12, 8, cls.primary],    // massive torso
    [15, 11, 1, 8, cls.secondary],   // muscle line
    [8, 11, 2, 7, cls.secondary],    // left arm (huge)
    [22, 11, 2, 7, cls.secondary],   // right arm (huge)
    [8, 18, 2, 2, skin],             // left hand
    [22, 18, 2, 2, skin],            // right hand
    [10, 19, 12, 1, '#1a0a00'],      // belt
    [12, 20, 4, 7, cls.legs],        // left leg (thick)
    [16, 20, 4, 7, cls.legs],        // right leg (thick)
    [11, 27, 5, 2, '#2a1808'],       // left boot
    [16, 27, 5, 2, '#2a1808'],       // right boot
  ],

  Halfling: (skin, feature, eyes, cls) => [
    [13, 6, 6, 2, feature],          // hair
    [13, 8, 6, 6, skin],             // round face
    [15, 10, 1, 1, eyes],            // left eye
    [17, 10, 1, 1, eyes],            // right eye
    [14, 11, 1, 1, '#d07060'],       // left cheek blush
    [17, 11, 1, 1, '#d07060'],       // right cheek blush
    [15, 14, 2, 1, skin],            // neck
    [12, 15, 8, 6, cls.primary],     // round torso
    [10, 15, 2, 5, cls.secondary],   // left arm (short)
    [20, 15, 2, 5, cls.secondary],   // right arm (short)
    [10, 20, 2, 1, skin],            // left hand
    [20, 20, 2, 1, skin],            // right hand
    [13, 21, 3, 4, cls.legs],        // left leg
    [16, 21, 3, 4, cls.legs],        // right leg
    [11, 23, 5, 1, feature],         // left foot hair (halfling trait)
    [11, 24, 5, 2, skin],            // left big foot
    [16, 23, 5, 1, feature],         // right foot hair
    [16, 24, 5, 2, skin],            // right big foot
  ],

  Dragonborn: (skin, feature, eyes, cls) => [
    [13, 0, 2, 4, feature],          // left horn
    [17, 0, 2, 4, feature],          // right horn
    [13, 4, 6, 5, skin],             // scaled head
    [14, 4, 1, 1, feature],          // scale detail
    [17, 4, 1, 1, feature],          // scale detail
    [14, 5, 1, 1, eyes],             // left eye
    [18, 5, 1, 1, eyes],             // right eye
    [14, 7, 4, 3, skin],             // snout
    [15, 9, 2, 1, feature],          // nostrils
    [14, 9, 4, 2, skin],             // neck (scaled)
    [12, 11, 8, 8, cls.primary],     // torso
    [13, 12, 1, 1, feature],         // scale shimmer
    [16, 12, 1, 1, feature],
    [19, 12, 1, 1, feature],
    [14, 15, 1, 1, feature],
    [17, 15, 1, 1, feature],
    [10, 11, 2, 7, cls.secondary],   // left arm
    [20, 11, 2, 7, cls.secondary],   // right arm
    [10, 18, 2, 1, skin],            // left hand
    [10, 19, 1, 1, feature],         // left claw
    [11, 19, 1, 1, feature],
    [20, 18, 2, 1, skin],            // right hand
    [20, 19, 1, 1, feature],         // right claw
    [21, 19, 1, 1, feature],
    [13, 19, 3, 8, cls.legs],        // left leg
    [16, 19, 3, 8, cls.legs],        // right leg
    [12, 27, 4, 2, skin],            // left foot
    [16, 27, 4, 2, skin],            // right foot
    [11, 28, 2, 1, feature],         // foot claws
    [14, 28, 2, 1, feature],
    [16, 28, 2, 1, feature],
    [20, 28, 2, 1, feature],
    [10, 21, 2, 1, skin],            // tail
    [9,  22, 2, 1, skin],
    [8,  23, 2, 1, skin],
    [7,  24, 2, 1, feature],
  ],
};

// -----------------------------------------------
//  Class weapon / equipment overlays
//  Returns array of [x, y, w, h, color] rects
// -----------------------------------------------
const CLASS_WEAPONS = {

  Warrior: (accent) => [
    [22, 7, 2, 10, '#d0d0d0'],      // sword blade
    [20, 12, 5, 1, accent],         // crossguard
    [22, 13, 2, 4, '#8a5020'],      // handle
    [22, 17, 2, 1, '#c8a020'],      // pommel
  ],

  Mage: (accent) => [
    [23, 5, 1, 20, '#7a5020'],      // staff shaft
    [21, 1, 4, 1, accent],          // orb glow outer
    [21, 2, 4, 3, accent],          // orb body
    [21, 5, 4, 1, accent],          // orb glow outer
    [22, 2, 2, 3, '#d0e8ff'],       // orb core (bright)
  ],

  Rogue: (accent) => [
    [22, 12, 1, 6, '#c0c0b0'],      // right dagger blade
    [21, 17, 2, 1, '#8a5020'],      // right handle
    [22, 18, 1, 1, accent],         // right pommel
    [9,  12, 1, 6, '#c0c0b0'],      // left dagger blade
    [9,  17, 2, 1, '#8a5020'],      // left handle
    [9,  18, 1, 1, accent],         // left pommel
  ],

  Paladin: (accent) => [
    [7, 10, 3, 7, '#b0b0b0'],       // shield body
    [7, 10, 3, 1, accent],          // shield border top
    [7, 16, 3, 1, accent],          // shield border bottom
    [7, 10, 1, 7, accent],          // shield border left
    [9, 10, 1, 7, accent],          // shield border right
    [8, 11, 1, 5, accent],          // shield cross vertical
    [7, 13, 3, 1, accent],          // shield cross horizontal
    [22, 7, 2, 10, '#e0e0f0'],      // sword blade
    [20, 12, 5, 1, accent],         // crossguard
    [22, 13, 2, 4, '#8a5020'],      // handle
  ],

  Ranger: (accent) => [
    [23, 5, 1, 14, accent],         // bow limb
    [22, 5, 1, 1, accent],          // bow tip top
    [22, 18, 1, 1, accent],         // bow tip bottom
    [24, 6, 1, 12, '#e8e0c0'],      // bowstring
    [21, 11, 2, 1, '#c04020'],      // arrow fletching
    [22, 11, 1, 7, '#c8a030'],      // arrow shaft
    [22, 18, 1, 1, '#808060'],      // arrowhead
  ],

  Necromancer: (accent) => [
    [23, 6, 1, 20, '#3a1848'],      // staff shaft
    [21, 2, 4, 1, '#d0cdb0'],       // skull top
    [21, 3, 4, 3, '#d0cdb0'],       // skull mid
    [21, 6, 4, 1, '#d0cdb0'],       // skull jaw
    [22, 4, 1, 1, '#200030'],       // left eye socket
    [23, 4, 1, 1, '#200030'],       // right eye socket
    [22, 6, 1, 1, '#200030'],       // tooth gap
    [21, 2, 1, 5, accent],          // glow left
    [24, 2, 1, 5, accent],          // glow right
  ],
};

// -----------------------------------------------
//  Main draw function
//  Called by SpriteCanvas with a canvas 2D context
// -----------------------------------------------

const drawRect = (ctx, x, y, w, h, color, scale) => {
  ctx.fillStyle = color;
  ctx.fillRect(x * scale, y * scale, w * scale, h * scale);
};

export function drawSprite(ctx, race, characterClass, strength, dexterity, intelligence, scale) {
  // Background — dark stone
  drawRect(ctx, 0, 0, 32, 32, '#12100c', scale);

  // Ground line
  drawRect(ctx, 0, 28, 32, 1, '#2a2418', scale);
  drawRect(ctx, 0, 29, 32, 3, '#1a1810', scale);

  const skin    = RACE_SKIN[race]    || '#d4904a';
  const feature = RACE_FEATURE[race] || '#4a2808';
  const eyes    = RACE_EYES[race]    || '#1a0a00';
  const cls     = CLASS_COLORS[characterClass] || CLASS_COLORS.Warrior;
  const accent  = CLASS_ACCENT[characterClass] || '#c0c0c0';

  // Draw body
  const bodyRects = RACE_BODIES[race]?.(skin, feature, eyes, cls) ?? [];
  for (const [x, y, w, h, color] of bodyRects) {
    drawRect(ctx, x, y, w, h, color, scale);
  }

  // Draw weapon / equipment
  const weaponRects = CLASS_WEAPONS[characterClass]?.(accent) ?? [];
  for (const [x, y, w, h, color] of weaponRects) {
    drawRect(ctx, x, y, w, h, color, scale);
  }

  // Stat glow: if highest stat >= 8, add a shimmer on the weapon accent
  const maxStat = Math.max(Number(strength), Number(dexterity), Number(intelligence));
  if (maxStat >= 8) {
    ctx.globalAlpha = 0.35;
    drawRect(ctx, 22, 8, 1, 1, '#ffffff', scale);
    ctx.globalAlpha = 1.0;
  }
}
