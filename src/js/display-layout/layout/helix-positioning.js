import * as THREE from "three";

/**
 * Positions an object in a 3D helix based on its index.
 * The helix is created by positioning objects along a cylindrical path, with the radius and height determined by the object's index.
 * @param {Number} index The index of the object in the helix.
 * @param {Number} strand The strand of the helix (0 or 1) to determine the rotation direction.
 * @returns {THREE.Object3D} The object positioned in the helix.
 */

const helixPositioning = (index, strand = 0) => {
  const RADIUS = 1100;
  const VERTICAL_SPACING = 12;
  const ROTATION_SPEED = 0.175;

  const theta = index * ROTATION_SPEED + Math.PI + strand * Math.PI;

  const y = -(index * VERTICAL_SPACING) + 450;

  const object = new THREE.Object3D();

  object.position.setFromCylindricalCoords(RADIUS, theta, y);

  return object;
};

export { helixPositioning };
