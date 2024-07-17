// @ts-nocheck
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CameraAnimation from './CameraAnimation';
import Shapes from './Shapes';
import ModelLoader from './ModelLoader';
import Lighting from './Lighting';

const Scene = () => {
  return (
    <Canvas>
      <CameraAnimation />
      <Lighting />
      <Shapes />
      <ModelLoader />
      <OrbitControls enableDamping={true} dampingFactor={0.25} screenSpacePanning={false} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  );
};

export default Scene;