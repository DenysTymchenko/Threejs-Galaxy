import {
  Raycaster,
  Vector2,
  Color
} from 'three';
import { sizes, camera } from './Scene.js';
import { points } from './Galaxy.js';

const mouse = new Vector2();
const raycaster = new Raycaster();
let intersects = null;

window.addEventListener('click', (e) => {
  mouse.x = e.clientX / sizes.width * 2 - 1;
  mouse.y = -(e.clientY / sizes.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  intersects = raycaster.intersectObject(points);

  if (intersects.length > 0) paintPartOfTheGalaxy()
})

function paintPartOfTheGalaxy() {
  const color = new Color(Math.random(), Math.random(), Math.random());
  const colors = points.geometry.attributes.color;

  intersects.forEach(intersect => {
    colors.setXYZ(intersect.index, color.r, color.g, color.b);
  })

  colors.needsUpdate = true;
}
