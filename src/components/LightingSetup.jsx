// @ts-nocheck
import React from 'react';
import * as THREE from 'three';

const LightingSetup = () => {
  const scene = useScene();

  // Set up lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 5) // Soft white light
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
  directionalLight.position.set(0, 7, 2).normalize()
  scene.add(directionalLight);
  
  const bottomLight = new THREE.DirectionalLight(0xffffff, 7);
  bottomLight.position.set(-2, -6, -2).normalize()
  scene.add(bottomLight);

  return null;
};

const useScene = () => {
  const { scene } = useThreeSetup();
  return scene;
};  

const useThreeSetup = () => {
  const scene = new THREE.Scene();
  return { scene };
};

export default LightingSetup;