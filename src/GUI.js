import GUI from 'lil-gui';
import { parameters } from './Parameters.js';
import { generateGalaxy } from './Galaxy.js';

const gui = new GUI();

gui
  .add(parameters, 'count')
  .min(10000)
  .max(2000000)
  .step(100)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, 'size')
  .min(0.001)
  .max(0.1)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, 'radius')
  .min(1)
  .max(20)
  .step(0.1)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, 'branches')
  .min(2)
  .max(20)
  .step(1)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, 'spinAngle')
  .min(-5)
  .max(5)
  .step(0.01)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, 'randomness')
  .min(0.1)
  .max(2)
  .step(0.1)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, 'randomnessPower')
  .min(1)
  .max(10)
  .step(1)
  .onFinishChange(generateGalaxy);
gui
  .addColor(parameters, 'innerColor')
  .onFinishChange(generateGalaxy);
gui
  .addColor(parameters, 'outerColor')
  .onFinishChange(generateGalaxy);
