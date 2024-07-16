// @ts-nocheck
import React, { useEffect, useRef } from 'react'
import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createPolygon, createOctagon, createTShape } from './ThreeShapes'

const Model = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const currentMount = mountRef.current;

    // Set up scene
    const scene = new THREE.Scene();
    const sizes = {
      width: window.innerWidth,  //800
      height: window.innerHeight  // 600
    }
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    currentMount.appendChild(renderer.domElement)

    // Set up lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 19) // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 9);
    directionalLight.position.set(5, 5, 5).normalize()
    scene.add(directionalLight);
    
    // Set up OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;  // An animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 1;

    // Animation mixer
    let mixer;

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


    // Load GLTF model
    const loader = new GLTFLoader();
    const assetPath = import.meta.env.BASE_URL + 'assets/boxer.glb'; // Use BASE_URL
    loader.load(
      assetPath,
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        // Adjust model position and scale
        model.position.set(0, -0.5, 0);
        model.scale.set(1, 1, 1);

        // Set up the animation mixer
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play();
        })
        
        // Main Animation loop
        const clock = new THREE.Clock();
        
        const animate = () => {
          requestAnimationFrame(animate);

          const delta = clock.getDelta();

          // Update the mixer on each frame if it exists
          if (mixer) mixer.update(delta);

          // Required if controls.enableDamping or controls.autoRotate are set to true
          controls.update();

          renderer.render(scene, camera);
        };

        animate();

      },
      undefined, 
      (error) => {
        console.error(error);
      }
    );

    camera.position.z = 2;
    camera.position.y = 1;
    camera.position.x = -3;

    // Clean up component mount
    return () => {
      currentMount.removeChild(renderer.domElement);
    }
  }, [])

  return (
    <div ref={mountRef}/>
  );
};

export default Model;