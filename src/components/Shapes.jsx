// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber'
import { createPolygon, createOctagon, createTShape } from './ThreeShapes';

const Shapes = () => {
  const { scene } = useThree();

  useEffect(() => {
    // Add the "T" shape at the bottom of the feet
    const tGeometry = createTShape(1, 1.3, 0.2);
    const tMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide }); // Blue color
    const tMesh = new THREE.Mesh(tGeometry, tMaterial);
    tMesh.rotation.x = -Math.PI / 2; // Rotate to lay flat on the ground
    tMesh.rotation.z = -Math.PI/ 6;
    tMesh.position.x = -0.3; 
    tMesh.position.y = -Math.PI / 4; 
    tMesh.position.z = 0.5; 
    scene.add(tMesh);
    
    // Create octagon geometry and fill
    const octagon = createOctagon(1, 1.2, 8, 0x00ff00, 14); // Adjust radius and height as needed
    scene.add(octagon);
    const circle = createPolygon(0.6, 0.8, 0, 0xff0000); // Red Circle
    scene.add(circle);
    const triangle = createPolygon(0, 0.6, 3, 0x0000ff); // Blue Triangle
    scene.add(triangle);

    // Clean up on unmount
    return () => {
      scene.remove(tMesh, octagon, circle, triangle)
    }

  }, [scene]);

  return null;
}

export default Shapes;