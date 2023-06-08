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
    geometry.dispose(); // remove from the memory
    material.dispose(); // remove from the memory
    scene.remove(points);
  }

  geometry = new BufferGeometry();
  material = new PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true, //? the dots will be bigger on zoom
    depthWrite: false,
    blending: AdditiveBlending,
    vertexColors: true,
  })

  const positions = new Float32Array(parameters.count * 3); // 3 values per vertex
  const colors = new Float32Array(parameters.count * 3);

  const innerColor = new Color(parameters.innerColor);
  const outerColor = new Color(parameters.outerColor);



  for (let i = 0; i < parameters.count; i++) {
    const radius = Math.random() * parameters.radius
    const spin = radius * parameters.spinAngle
    const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

    // Use different random values to get a right result
    const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
    const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
    const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);

    positions[i * 3] = Math.cos(branchAngle + spin) * radius + randomX // x
    positions[i * 3 + 1] = randomY // y
    positions[i * 3 + 2] = Math.sin(branchAngle + spin) * radius + randomZ // z

    // Color
    const mixedColor = innerColor.clone();
    //radius / parameters.radius makes:
    //1. Inner color on center,
    //1. Mix between inner and outer color between the center and the end,
    //1. Outer color on the end,
    mixedColor.lerp(outerColor, radius / parameters.radius);

    colors[i * 3] = mixedColor.r // R
    colors[i * 3 + 1] = mixedColor.g // G
    colors[i * 3 + 2] = mixedColor.b // B

  };

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

generateGalaxy()
