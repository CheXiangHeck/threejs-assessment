import { CSS3DRenderer } from "three/addons/renderers/CSS3DRenderer.js";

const setupRenderer = () => {
  const renderer = new CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container").appendChild(renderer.domElement);

  return renderer;
};

export { setupRenderer };
