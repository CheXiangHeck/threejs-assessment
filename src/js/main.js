import * as THREE from "three";

import TWEEN from "three/addons/libs/tween.module.js";
import { preloadDisplayPositions } from "./display-layout/preload-display-positions.js";
import { setupTrackballControls } from "./controls/setup-trackballcontrol.js";
import { setupRenderer } from "./scene/setupRenderer.js";
import { loadSheetData } from "./connect-api/data-extractor.js";
import { sheetDataFormatter } from "./connect-api/formatter/sheet-data-formatter.js";

let objects = [];

let camera, scene, renderer;
let controls;

const API = `${import.meta.env.VITE_BACKEND_URL}/api/google-sign-in`;

const emailElement = document.getElementById("user-email");
const logoutButton = document.getElementById("logout");

// Check current login session
async function loadAccount() {
  try {
    const response = await fetch(`${API}/authorized.php`, {
      credentials: "include",
    });

    if (!response.ok) {
      window.location.replace("/sign-in/index.html");
      return;
    }

    const data = await response.json();

    if (!data.authenticated) {
      window.location.replace("/sign-in/index.html");
      return;
    }

    emailElement.textContent = data.email;
  } catch (error) {
    console.error("Account verification failed:", error);
    window.location.replace("/sign-in/index.html");
  }
}

// Logout
logoutButton.addEventListener("click", async () => {
  try {
    logoutButton.disabled = true;
    logoutButton.textContent = "LOGGING OUT...";

    const response = await fetch(`${API}/logout.php`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed.");
    }

    window.location.replace("/sign-in/index.html");
  } catch (error) {
    console.error("Logout error:", error);

    logoutButton.disabled = false;
    logoutButton.textContent = "LOGOUT";
  }
});

loadAccount();

await init();
animate();

// Initialization function
async function init() {
  const tableData = sheetDataFormatter(
    await loadSheetData(
      `${import.meta.env.VITE_BACKEND_URL}/api/google-sheet/get-sheet-data.php`,
    ),
  );

  // Camera setup
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    10000,
  );
  camera.position.z = 3000;

  scene = new THREE.Scene();

  const { objects: loadedObjects, targets } = preloadDisplayPositions(
    tableData,
    scene,
  );

  objects = loadedObjects;

  // Turn the renderer on and set the size of the renderer to the window size.
  renderer = setupRenderer();

  //TrackballControls allow the user to rotate, zoom, and pan the camera around a target.
  controls = setupTrackballControls(camera, renderer, render);

  //Add event listeners to the buttons to transform the objects to the selected layout.
  const buttonTable = document.getElementById("table");
  buttonTable.addEventListener("click", function () {
    transform(targets.table, 2000);
  });

  const buttonSphere = document.getElementById("sphere");
  buttonSphere.addEventListener("click", function () {
    transform(targets.sphere, 2000);
  });

  const buttonHelix = document.getElementById("helix");
  buttonHelix.addEventListener("click", function () {
    transform(targets.helix, 2000);
  });

  const buttonGrid = document.getElementById("grid");
  buttonGrid.addEventListener("click", function () {
    transform(targets.grid, 2000);
  });

  transform(targets.table, 2000);

  // Change the size of the renderer when the window is resized.

  window.addEventListener("resize", onWindowResize);
}

function transform(targets, duration) {
  TWEEN.removeAll();

  for (let i = 0; i < objects.length; i++) {
    const object = objects[i];
    const target = targets[i];

    new TWEEN.Tween(object.position)
      .to(
        {
          x: target.position.x,
          y: target.position.y,
          z: target.position.z,
        },
        Math.random() * duration + duration,
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

    new TWEEN.Tween(object.rotation)
      .to(
        {
          x: target.rotation.x,
          y: target.rotation.y,
          z: target.rotation.z,
        },
        Math.random() * duration + duration,
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();
  }

  new TWEEN.Tween(this)
    .to({}, duration * 2)
    .onUpdate(render)
    .start();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

function animate() {
  requestAnimationFrame(animate);

  TWEEN.update();

  controls.update();
}

function render() {
  renderer.render(scene, camera);
}
