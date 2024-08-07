// @ts-nocheck
import React from 'react';
import * as THREE from 'three';

const SceneSetup = () => {
  const { scene, camera, renderer } = useThreeSetup();

  return null;
}

const useThreeSetup = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  return { scene, camera, renderer };
};

export default SceneSetup;