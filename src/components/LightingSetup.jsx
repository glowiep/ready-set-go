// @ts-nocheck
import React, { useEffect } from 'react';
import * as THREE from 'three';

const LightingSetup = ({ scene }) => {
  useEffect(() => {
    // Set up lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 5) // Soft white light
    scene.add(ambientLight);
  
    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(0, 7, 2).normalize()
    scene.add(directionalLight);
    
    const bottomLight = new THREE.DirectionalLight(0xffffff, 7);
    bottomLight.position.set(-2, -6, -2).normalize()
    scene.add(bottomLight);

    // Clean up lighting
    return () => {
      scene.remove(ambientLight);
      scene.remove(directionalLight);
      scene.remove(bottomLight);
    };

  }, [scene]);

  return null;
};

export default LightingSetup;