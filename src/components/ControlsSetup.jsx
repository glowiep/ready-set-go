// @ts-nocheck
import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ControlsSetup = () => {
  const { camera, renderer }= useThreeSetup();

  // Set up OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;  // An animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.maxPolarAngle = Math.PI / 1;

  return null;
};

const sizes = {
  width: window.innerWidth,  //800
  height: window.innerHeight  // 600
}

const useThreeSetup = () => {
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  return { camera, renderer };
};

export default ControlsSetup;