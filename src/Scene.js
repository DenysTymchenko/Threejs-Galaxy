import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Vector2,
  Raycaster,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas
const canvas = document.querySelector('.webgl');

// Scene
export const scene = new Scene();

// Camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height);
// camera.position.z = 2;
camera.position.y = 8;
scene.add(camera);

// Renderer
const renderer = new WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Updates scene on browser window resizing, so it's always occupy whole viewport
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
});

const pointer = new Vector2();
const raycaster = new Raycaster();

window.addEventListener('click', (e) => {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = (e.clientY / window.innerHeight) * 2 - 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  intersects.forEach(intersect => intersect.object.material.color.set(0xff000))
})

// Used for proper work of controls
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
