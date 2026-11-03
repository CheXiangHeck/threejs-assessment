import * as THREE from "three";

const COLUMNS = 20;
const ROWS = 10;
const CARDS_PER_LAYER = COLUMNS * ROWS; // 200

const SPACING_X = 180; // 120 card width + 60 gap
const SPACING_Y = 230; // 160 card height + 70 gap
const SPACING_Z = 1200; // More distance between layers

/**
 * Calculates the position of an object in the table layout based on its data.
 * @param {Array} data - The data for the object.
 * @returns {THREE.Object3D} The positioned object.
 */
const tablePositioning = (index) => {
  const layer = Math.floor(index / CARDS_PER_LAYER);
  const indexInLayer = index % CARDS_PER_LAYER;

  const column = indexInLayer % COLUMNS;
  const row = Math.floor(indexInLayer / COLUMNS);

  const object = new THREE.Object3D();
  object.position.x = (column - (COLUMNS - 1) / 2) * SPACING_X;
  object.position.y = -(row - (ROWS - 1) / 2) * SPACING_Y;
  object.position.z = -layer * SPACING_Z;

  return object;
};

export { tablePositioning };
