// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei';

const CameraAnimation = () => {
  const cameraRef = useRef();

  useEffect(() => {
    if (cameraRef.current) {
      // Initial position at bottom
      cameraRef.current.position.y = -10;
    }
  }, []);

  useFrame(({ clock }) => {
    if (cameraRef.current) {
      // Animate the camera position from bottom to top
      const elapsedTime = clock.getElapsedTime();
      const newY = Math.min(10, -10 + elapsedTime * 5); //speed of panning
      cameraRef.current.position.y = newY;
    }
  });

  return (
    <PerspectiveCamera 
      ref={cameraRef}
      makeDefault
      fov={75}
      aspect={window.innerWidth / window.innerHeight}
      near={0.1}
      far={1000}
      position={[0, -10, 10]}
    />
  );
};

export default CameraAnimation;