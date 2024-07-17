// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createPolygon, createOctagon, createTShape } from './ThreeShapes';

import SceneSetup from './SceneSetup';
import LightingSetup from './LightingSetup';
import ControlsSetup from './ControlsSetup';
import ShapesSetup from './ShapesSetup';
import ModelLoader from './ModelLoader';

const sizes = {
  width: window.innerWidth,  //800
  height: window.innerHeight  // 600
}

const Model = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    currentMount.appendChild(renderer.domElement);
    
    // Clean up component mount
    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);
  
  return (
    <div ref={mountRef} style={{ width: '100vw', height: '100vh' }}>
      <SceneSetup />
      <LightingSetup />
      <ControlsSetup />
      <ShapesSetup />
      <ModelLoader />
    </div>
  )
};

export default Model;