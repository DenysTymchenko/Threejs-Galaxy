import {
  BufferGeometry,
  PointsMaterial,
  AdditiveBlending,
  Color,
  BufferAttribute,
  Points
} from 'three';
import { scene } from './Scene.js';
import { parameters } from './Parameters.js';

let geometry = null;
let material = null;
let points = null;

export function generateGalaxy() {
  if (points !== null) {
    geometry.dispose(); // .dispose() - removes from the memory
    material.dispose();
    scene.remove(points);
  }

  geometry = new BufferGeometry();
  material = new PointsMaterial({
    size: parameters.size,
    sizeAttenuation: false, // points will be, as small as before, on zoom
    depthWrite: false, // so one point could stay in front of the other
    blending: AdditiveBlending, // makes the glowing effect
    vertexColors: true, // for applying colors to every vertex
  })

  const positions = new Float32Array(parameters.count * 3); // 3 values per vertex

  const colors = new Float32Array(parameters.count * 3);
  const innerColor = new Color(parameters.innerColor);
  const outerColor = new Color(parameters.outerColor);

  for (let i = 0; i < parameters.count; i++) {
    const radius = Math.random() * parameters.radius;
    const spinAngle = radius * parameters.spinAngle;
    const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

    positions[i * 3] = Math.cos(branchAngle + spinAngle) * radius + getRandomCoordinate() // x
    positions[i * 3 + 1] = getRandomCoordinate() // y
    positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + getRandomCoordinate() // z

    // Color
    const mixedColor = innerColor.clone();
    // radius / parameters.radius makes:
    // 1. Inner color in the center;
    // 2. Mix between inner and outer color between the center and the end;
    // 3. Outer color in the end;
    mixedColor.lerp(outerColor, radius / parameters.radius);

    colors[i * 3] = mixedColor.r // R
    colors[i * 3 + 1] = mixedColor.g // G
    colors[i * 3 + 2] = mixedColor.b // B
  }

  geometry.setAttribute(
    'position',
    new BufferAttribute(positions, 3),
  );

  geometry.setAttribute(
    'color',
    new BufferAttribute(colors, 3),
  );

  points = new Points(geometry, material);
  scene.add(points)
}

function getRandomCoordinate() {
  // (Math.random() < 0.5 ? 1 : -1) used to make coordinates negative and positive
  return Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
}
generateGalaxy()
