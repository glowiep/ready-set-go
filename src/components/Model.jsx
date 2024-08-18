// @ts-nocheck
import React, { useEffect, useRef } from 'react'

import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createPolygon, createOctagon, createTShape } from './ThreeShapes'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { Text } from '@react-three/drei';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import Modal from './Modal';

const Model = () => {
  const mountRef = useRef(null);
  const sceneRef  = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);

  const [isSceneReady, setIsSceneReady] = React.useState(false);
  // Modal state
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState('');

  const handlePan = (option) => {
    if (!isSceneReady || !controlsRef.current) return;

    const controls = controlsRef.current;  //Position of T shape
    const camera = cameraRef.current;
    // Smoothly pan the camera to the T shape
    const targetPosition = new THREE.Vector3(-0.3, 0, 0.5);  //Position of T shape

    // Smoothly interpolate the camera position
    const startPosition = controls.object.position.clone();
    const startTarget = controls.target.clone();
    const duration = 1.5 // Duration of the animation in seconds

    const animatePan = (time) => {
      const startTime = time;
      const animate = (now) => {
        const elapsedTime = (now - startTime) / 1000;
        const t = Math.min(elapsedTime / duration, 1); // Normalied time (0 to 1)

        // Interpolate the camera position
        option === "bottom-view" && controls.object.position.lerpVectors(startPosition, targetPosition.clone().add(new THREE.Vector3(0, -4, 0.01)), t);
        option === "top-view-inverted" && controls.object.position.lerpVectors(startPosition, targetPosition.clone().add(new THREE.Vector3(0, 2.7, 0)), t);

        // Interpolate the target position if necessary
        // controls.target.lerpVectors(startTarget, targetPosition, t);
        
        controls.update();

        if (t < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    };
    // Show pop-up
    setTimeout(() => {
      if (option === "bottom-view") {
        setModalContent(
          <>
            The <b>"T"</b> Represents the center line which is the foundation of the <br />
            <b>Special T Boxing Framework</b>
          </>
        );
        setIsModalOpen(true);
      }
    }, 2000);
    requestAnimationFrame(animatePan);
  }

  const handleColorModal = (color) => {
    let message = '';
    switch (color) {
      case 'green':
        message = (
          <>
            The Green Octagon represents <b>"Distance"</b>. <br />
            The furthest zone where contact happens. <br /><br />
            <b>🟡 Offence</b>: Long punches.<br />
            <b>🟣 Defence</b>: Keeping the distance, in and out, parrying.<br />
            <b>⚪ Special T Moves</b>: Move 1 & Move 2.<br /><br />
            <b>Also known as <i>Passive</i></b> <br />
            ✂
          </>
        );
        break;
      case 'red':
        message = (
          <>
            The Red Circle represents the <br /> <b>"Danger Zone"</b> ⚠ <br /><br />
            HOLD YOUR GROUND <br /><br />
            <b>🟡 Offence</b>: Hooks, to the body & head.<br />
            <b>🟣 Defence</b>: Head-movement, slip, roll & under.<br />
            <b>⚪ Special T Moves</b>: Move 3 & Move 4.<br /><br />
            <b>Also known as <i>Reactive</i></b> <br />
            📄
          </>
        );
        break;
      case 'blue':
        message = (
          <>
            The Blue Triangle represents the <b>"In-Fighting"</b> Zone.<br /><br />
            ON THE MOVE <br /><br />
            <b>🟡 Offence</b>: Uppercuts.<br />
            <b>🟣 Defence</b>: Down in the legs, to the side.<br />
            <b>⚪ Special T Moves</b>: Move 5 & Move 6.<br /><br />
            <b>Also known as <i>Active</i></b> <br />
            🪨
          </>
        );
        break;
      case 'question':
        message = (
          <>
            ❓ If you have any questions, talk to:<br /><br />
            <b><a href="https://www.instagram.com/tyrone_bradshaw_boxing_coach/">Coach Tyrone Bradshaw</a></b><br />
            <b><a href="https://www.instagram.com/kristi_cowan_holzken/">Coach Kristi</a></b><br />
            <b><a href="https://www.instagram.com/glowiep/">Coach Gloria</a></b><br /><br />
            
            Or join us for a class at <br />
            <a href="https://www.instagram.com/mississaugaelitemma/">Mississauga Elite MMA</a> Gym <br />
            Tuesday & Thursdays 7pm
            <br />
            <br />
            or
            <br />
            <br />
            <a href="https://www.instagram.com/theforge.martialarts/">The Forge Martial Arts</a> Gym <br />
            Monday & Wednesdays 8pm 
            <br />
            <br />
            This web app is brought to you by <br />
            <a href="https://github.com/glowiep/ready-set-go">Coach Gloria</a> :) 
          </>
        );
        break;
      default:
        message = (
          <>
            The "T" Represents the center line that is the foundation of the Special T Boxing Framework.
          </>
        );
    }
    setModalContent(message);
    setIsModalOpen(true);
  }

  useEffect(() => {
    const currentMount = mountRef.current;

    // Set up scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const sizes = {
      width: window.innerWidth,  //800
      height: window.innerHeight  // 600
    }
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    currentMount.appendChild(renderer.domElement);

    // Set up lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 5) // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 7);
    directionalLight.position.set(0, 7, 2).normalize()
    scene.add(directionalLight);
    
    const bottomLight = new THREE.DirectionalLight(0xffffff, 4);
    bottomLight.position.set(1, -4, -1).normalize()
    scene.add(bottomLight);
    
    // Set up OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;  // Save the controls to a ref
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

    // Add brand text
    const fontLoader = new FontLoader();
    fontLoader.load('fonts/helvetiker_bold.typeface.json', (font) => {
      const textGeometry = new TextGeometry('Special T Boxing', {
        font: font,
        size: 0.2,
        depth: 0.07,
      })
      const textMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
      const brandTextBack = new THREE.Mesh(textGeometry, textMaterial); 

      brandTextBack.position.set(1.6, -0.48, -0.51);
      brandTextBack.rotation.set(0, Math.PI + 100, 0)

      scene.add(brandTextBack)
      
      const brandTextFront = new THREE.Mesh(textGeometry, textMaterial); 

      brandTextFront.position.set(-1.65, -0.5, 0.5);
      brandTextFront.rotation.set(0, 100, 0)

      scene.add(brandTextFront)
    })
    
    // Create octagon geometry and fill
    const octagon = createOctagon(1, 1.2, 8, 0x00ff00, 14); // Green Octagon
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
        setIsSceneReady(true);
      },
      undefined, 
      (error) => {
        console.error(error);
      }
    );

    camera.position.set(2.2, 1, -3.7);

    // Clean up component mount
    return () => {
      currentMount.removeChild(renderer.domElement);
    }
  }, [])

  return (
    <div ref={mountRef} className="w-screen h-screen">
        <button
        onClick={() => handlePan("bottom-view")}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          padding: '10px 20px',
          backgroundColor: 'white',
          color: 'black',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000,  // Make sure it appears above the canvas
        }}
      >
        Center Line (T)
      </button>
        <button
        onClick={() => handlePan("top-view-inverted")}
        style={{
          position: 'fixed',
          top: '60px',
          right: '10px',
          padding: '10px 20px',
          backgroundColor: 'grey',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000,  // Make sure it appears above the canvas
        }}
      >
        Top View
      </button>

      {/* Color buttons */}
      <button
        onClick={() => handleColorModal('green')}
        // onClick={() => handlePan("top-view-inverted")}
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '180px',
          padding: '10px 20px',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000,  // Make sure it appears above the canvas
        }}
      >
        Green
      </button>
      <button
        onClick={() => handleColorModal('red')}
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '95px',
          padding: '10px 20px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000,  // Make sure it appears above the canvas
      }}
      >
        Red
      </button>
      <button
        onClick={() => handleColorModal('blue')}
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000,  // Make sure it appears above the canvas
        }}
      >
        Blue
      </button>

      {/* Info button */}
      <button
        onClick={() => handleColorModal('question')}
        style={{
          position: 'fixed',
          bottom: '10px',
          left: '10px',
          padding: '5px 12px',
          backgroundColor: 'grey',
          color: 'black',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 1000,  // Make sure it appears above the canvas
        }}
      >
        ?
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>{modalContent}</p>
      </Modal>
    </div>
  );
};

export default Model;