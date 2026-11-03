import * as THREE from "three";

import { gridPositioning } from "./layout/grid-positioning.js";
import { tablePositioning } from "./layout/table-positioning.js";
import { spherePositioning } from "./layout/sphere-positioning.js";
import { helixPositioning } from "./layout/helix-positioning.js";
import { designCard } from "../components/card.js";
import { CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";

/**
 * Preloads the display positions for different layouts (table, sphere, helix, grid) based on the provided data.
 * @param {Array} data - The data to be used for positioning the objects.
 * @param {THREE.Scene} scene - The scene to which the objects will be added.
 */

const preloadDisplayPositions = (data, scene) => {
  const objects = [];

  const targets = {
    table: [],
    sphere: [],
    helix: [],
    grid: [],
  };

  // table
  // Loop through the table data and create elements for each entry
  for (let i = 0; i < data.length; i++) {
    // Set up card elements html design and css.
    const element = document.createElement("div");

    /**
     * This function will not return anything as it is designed to modify the provided element in place.
     * It sets the class name, background color, and appends child elements for number, symbol, and details based on the provided data.
     * The function does not have a return statement, so it implicitly returns undefined.
     */
    designCard(element, data[i]);

    // Random Positioning
    const objectCSS = new CSS3DObject(element);
    objectCSS.position.x = Math.random() * 4000 - 2000;
    objectCSS.position.y = Math.random() * 4000 - 2000;
    objectCSS.position.z = Math.random() * 4000 - 2000;
    scene.add(objectCSS);

    objects.push(objectCSS);

    // Set up the target positions for the table layout based on the table data.
    const object = tablePositioning(i);

    targets.table.push(object);
  }

  console.log(objects.length);

  // sphere

  const vector = new THREE.Vector3();

  for (let i = 0, l = objects.length; i < l; i++) {
    const object = spherePositioning(i, l);

    // mutiplyScalar is used to scale the position of the object by a factor of 2, effectively doubling its distance from the origin. This is done to ensure that the objects are positioned correctly in the 3D space and are not too close to each other or to the camera. By scaling the position, we can create a more visually appealing arrangement of objects in the sphere layout.
    vector.copy(object.position).multiplyScalar(2);

    object.lookAt(vector);

    targets.sphere.push(object);
  }

  // helix

  for (let i = 0, l = objects.length; i < l; i++) {
    const strand = i % 2;

    const object = helixPositioning(Math.floor(i / 2), strand);

    vector.x = object.position.x * 2;
    vector.y = object.position.y;
    vector.z = object.position.z * 2;

    object.lookAt(vector);

    targets.helix.push(object);
  }

  // grid

  for (let i = 0; i < objects.length; i++) {
    const object = gridPositioning(i);

    targets.grid.push(object);
  }

  return {
    objects,
    targets,
  };
};

export { preloadDisplayPositions };
