import * as THREE from "three";

const COLUMNS = 5;  // x
const ROWS = 4;     // y
const LAYERS = 10;  // z

const CARDS_PER_LAYER = COLUMNS * ROWS;       // 20
const TOTAL_CARDS = CARDS_PER_LAYER * LAYERS; // 200

const SPACING_X = 400;
const SPACING_Y = 400;
const SPACING_Z = 1000;

/**
 * Positions an object in a 3D grid based on its index.
 * Each layer holds 20 objects arranged in a 5x4 grid (5 across, 4 down).
 * Ten layers are stacked along z, so the full grid holds 200 objects.
 * The grid is centered on the origin on all three axes.
 * @param {Number} index The index of the object in the grid.
 * @returns {THREE.Object3D} The object positioned in the grid.
 */
const gridPositioning = (index) => {
  const layer = Math.floor(index / CARDS_PER_LAYER);
  const indexInLayer = index % CARDS_PER_LAYER;

  const column = indexInLayer % COLUMNS;
  const row = Math.floor(indexInLayer / COLUMNS);

  const object = new THREE.Object3D();

  object.position.x = (column - (COLUMNS - 1) / 2) * SPACING_X;
  object.position.y = -(row - (ROWS - 1) / 2) * SPACING_Y;
  object.position.z = (layer - (LAYERS - 1) / 2) * SPACING_Z;

  return object;
};

export { gridPositioning };