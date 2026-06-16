const defaultWalls = [
  // Top
  { x1: 0, y1: 0, x2: 800, y2: 0 },

  // Right
  { x1: 800, y1: 0, x2: 800, y2: 600 },

  // Bottom
  { x1: 0, y1: 600, x2: 800, y2: 600 },

  // Left
  { x1: 0, y1: 0, x2: 0, y2: 600 },

  // Existing walls
  { x1: 500, y1: 100, x2: 500, y2: 400 },
  { x1: 200, y1: 150, x2: 400, y2: 150 },
  { x1: 150, y1: 450, x2: 650, y2: 450 },
];

export default defaultWalls;
