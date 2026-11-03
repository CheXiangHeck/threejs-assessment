import * as THREE from "three";

/**
 * Positions an object in a 3D sphere based on its index.
 * The sphere is created by positioning objects on the surface of a sphere, with the radius and angles determined by the object's index.
 * @param {Number} index The index of the object in the sphere.
 * @param {Number} totalObjects The total number of objects in the sphere.
 * @returns {THREE.Object3D} The object positioned in the sphere.
 */

const spherePositioning = (index, totalObjects) => {
  const phi = Math.acos(-1 + (2 * index) / totalObjects);
  const theta = Math.sqrt(totalObjects * Math.PI) * phi;

  const object = new THREE.Object3D();

  object.position.setFromSphericalCoords(800, phi, theta);
  return object;
};

export { spherePositioning };
