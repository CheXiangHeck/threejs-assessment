import { TrackballControls } from "three/addons/controls/TrackballControls.js";

const setupTrackballControls = (camera, renderer, renderFunction) => {
  const controls = new TrackballControls(camera, renderer.domElement);
  controls.minDistance = 500;
  controls.maxDistance = 6000;
  controls.addEventListener("change", renderFunction); // Use the provided render function for the change event

  return controls;
};

export { setupTrackballControls };
