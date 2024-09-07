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

const Model = ({ setIsLoading }) => {
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
        option === "top-view" && controls.object.position.lerpVectors(startPosition, targetPosition.clone().add(new THREE.Vector3(1.5, 3.5, -2.5)), t);
        option === "from-bottom-view" && controls.object.position.lerpVectors(startPosition, targetPosition.clone().add(new THREE.Vector3(-Math.PI/3 - 1.1, -1.7, Math.PI/1.5 + 1.5)), t);
        option === "from-top-view" && controls.object.position.lerpVectors(startPosition, targetPosition.clone().add(new THREE.Vector3(-Math.PI/5 - 1, 2.5, Math.PI/1.5 + 0.6)), t);  //-Math.PI/4 - 1.1, 3, Math.PI/1.5 + 1
        option === "from-front-view" && controls.object.position.lerpVectors(startPosition, targetPosition.clone().add(new THREE.Vector3(-Math.PI/3 - 1, 1.7, Math.PI/1.5 + 1.4)), t);  //-1.8, 0, 3
        
        // option === "back-view-T" && controls.object.position.lerpVectors(startPosition, targetPosition.clone().add(new THREE.Vector3(2, 2, -4)), t);
        // option === "from-back" && controls.object.position.lerpVectors(startPosition, targetPosition.clone().add(new THREE.Vector3(2.2, 1, -3.7)), t);
        // option === "top-view-inverted" && controls.object.position.lerpVectors(startPosition, targetPosition.clone().add(new THREE.Vector3(0, 2.7, 0)), t);

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
          <h2>Special T Boxing 🥊</h2>
          <h3>A Technical Guide to Fundamentas, Tactics and Technique.</h3>
          {/* The <b>"T"</b> Represents the center line, it is a <b>reference point</b> for you to guide your movement and footwork. <br />
          Begin at the center of the T, with your shoulder-width apart and your weight evenly distributed. Assume the ready position. */}
          🥊Put your Special T down on the ground, <br />so you can match your movements with your sound.<br /><br />
          🥊The Special T is Tactical, <br />it lets you know where your feet must go.<br /><br />
          🥊The centre lines where you begin, <br /><b>READY</b> your hands with your elbows tucked in.<br /><br />
          🥊<b>SET</b> your lead foot on the top of the T, <br />chin down knees bent shoulders 45°.<br /><br />
          🥊It’s your READY position using your Special T, <br />so you can float like a butterfly and sting like a bee.<br /><br />
          🥊Now you’re READY, SET to train Special T way - let’s <b>GO</b>, <br />say what you do and do what you say.<br /><br />
          - Tyrone Bradshaw
        </>
        );
        setIsModalOpen(true);
      } else if (option === "top-view") {
        setModalContent(
          <>
            <h2>Keep it Simple, Not Easy 🥊</h2>
            <h3>🟢 Passive (Outside)</h3>
            - Representing straight punches and distance control.<br />
            - Focus on quick jabs, straight punches, and footwork to create space.<br />
            <b>♟ Special T Moves</b>: Move 1 & Move 2.<br /><br />
            <br />
            <h3>⭕ Reactive (Inside) </h3>
            - Representing holding your ground and inside fighting.<br />
            - Focus on tight defense, slipping, bobbing and blocking.<br />
            <b>♟ Special T Moves</b>: Move 3 & Move 4.<br /><br />
            <br />
            <h3>🔵 Active (On The Move)</h3>
            - Representing Closing the distance.<br />
            <b>♟ Special T Moves</b>: Move 5 & Move 6.<br /><br />
          </>
        ) 
        setIsModalOpen(true);
      } else if (option === "from-bottom-view") {  // Ready
        setModalContent(
          <>
            <h1>Ready Your Hands</h1>
            The Green Octagon represents
            <h2>🟢 DISTANCE</h2>
            The furthest zone where contact happens. <br /><br />
            <b>🟡 Offence</b>:
            <br />
            Straight punches.<br /><br />
            <b>🟣 Defence</b>:
            <br />
            Keeping the distance, in and out.<br />
          </>
        ) 
        setIsModalOpen(true);
      } else if (option === "from-top-view") {  // Set
        setModalContent(
          <>
            <h1>Set Your Feet</h1>
            The Red Circle represents the <br /> <b>"Danger Zone"</b> ⚠ <br />
            <h2>⭕ HOLD YOUR GROUND</h2>
            <b>🟡 Offence</b>:
            <br />
            Hooks, to the body & head.<br /><br />
            <b>🟣 Defence</b>:
            <br />
            Head-movement, slip, roll & under.<br />
          </>
        ) 
        setIsModalOpen(true);
      } else if (option === "from-front-view") {  // Go
        setModalContent(
          <>
            <h1>GO</h1>
            The Blue Triangle represents the <br /><b>"In-Fighting"</b> Zone.<br /><br />
            <h2>🔵 ON THE MOVE</h2>
            <b>🟡 Offence</b>:
            <br />
            Active punching, closing the distance, uppercuts.<br /><br />
            <b>🟣 Defence</b>:
            <br />
            Down in the legs, to the side.<br />
          </>
        ) 
        setIsModalOpen(true);
      }
    }, 2100);
    requestAnimationFrame(animatePan);
  }

  const handleColorModal = (color) => {
    let message = '';
    switch (color) {
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
    directionalLight.position.set(-0.5, 5, 1).normalize()
    scene.add(directionalLight);
    
    const bottomLight = new THREE.DirectionalLight(0xffffff, 4);
    bottomLight.position.set(0.5, -3, -2).normalize()
    scene.add(bottomLight);
    
    // Set up OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;  // Save the controls to a ref
    controls.enableDamping = true;  // An animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 1;

    // Set up audio listener. It will play after user interaction.
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const audioLoader = new THREE.AudioLoader();
    const sound = new THREE.Audio(listener);

    audioLoader.load('audio/Tyrone_Rap_clip.mp3', function (buffer) {
      sound.setBuffer(buffer);
      // sound.setLoop(true); // Optional
      sound.setVolume(0.5); // Optional
    }, undefined, function (error) {
      console.error('An error happened while loading audio:', error);
  });
    
    const handleAudio = () => {
      if (!sound.isPlaying) { // Check if audio is not already playing
        sound.play();
      }
    };

    // Attach the event handler to the button
    document.getElementById('playButton').addEventListener('click', handleAudio);

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

    let brandTextFront, brandTextBack;

    // Add brand text
    const fontLoader = new FontLoader();
    fontLoader.load('fonts/helvetiker_bold.typeface.json', (font) => {
      const textGeometry = new TextGeometry('Special T Boxing', {
        font: font,
        size: 0.2,
        depth: 0.07,
      })
      const textMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
      brandTextBack = new THREE.Mesh(textGeometry, textMaterial); 

      brandTextBack.position.set(1.6, -0.48, -0.51);
      brandTextBack.rotation.set(0, Math.PI + 100, 0)

      scene.add(brandTextBack)
      
      brandTextFront = new THREE.Mesh(textGeometry, textMaterial); 

      // brandTextFront.position.set(-1.52, -0.5, 0.48);
      brandTextFront.position.set(-1.6, -0.5, 0.5);
      brandTextFront.rotation.set(0, 100, 0)

      scene.add(brandTextFront)
    })

    // Update visibility of the text based on camera position with easing effect
    const updateVisibility = () => {
      [brandTextFront, brandTextBack].forEach(mesh => {
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection);

        const meshDirection = new THREE.Vector3(0, 0, 1);  // Assuming the normal is facing along Z-axis
        mesh.localToWorld(meshDirection);
        meshDirection.normalize();

        const dotProduct = cameraDirection.dot(meshDirection);

        // Check the vertical component of the camera's direction
        const verticalDotProduct = cameraDirection.y;

        // If dot product is positive, the camera is in front of the text
        mesh.visible = dotProduct < 0 && verticalDotProduct < 0.9;
      });
    }
    
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
        setIsLoading(false)

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

          updateVisibility();

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

    // camera.position.set(2.2, 1, -3.7); // From the back
    // camera.position.set(-1.8, 0, 3);  // front test
    // camera.position.set(-Math.PI/3 - 1.1, 1.7, Math.PI/1.5 + 1.5);  // From the front
    camera.position.set(-2.25, -0.56, 3.88);  // planar view

    // Clean up component mount
    return () => {
      currentMount.removeChild(renderer.domElement);
    }
  }, []);

  // Log camera position on button click - for coding purposes only
  const logCameraPosition = () => {
    if (cameraRef.current) {
      const { x, y, z } = cameraRef.current.position;
      console.log(`Camera Position: ${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)}`);
    }
  };

  return (
    <div ref={mountRef} className="w-screen h-screen">
      {/* <button onClick={logCameraPosition}>Log Camera Position</button> */}
      <button 
      id="playButton"
      aria-label="Play audio"
      style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        padding: '3px 3px',
        backgroundColor: 'honeydew',
        color: 'black',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '26px',
        zIndex: 1000,
      }}
      >
        🔊
      </button>
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
        onClick={() => handlePan("top-view")}
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
        Strategy ♟
      </button>

      {/* Color buttons */}
      <button
        onClick={() => handlePan('from-bottom-view')}
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '170px',
          padding: '10px 20px',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000,  // Make sure it appears above the canvas
        }}
      >
        READY
      </button>
      <button
        onClick={() => handlePan('from-top-view')}
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '86px',
          padding: '10px 20px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000,  // Make sure it appears above the canvas
      }}
      >
        SET
      </button>
      <button
        onClick={() => handlePan('from-front-view')}
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
        GO
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
        <div>{modalContent}</div>
      </Modal>
    </div>
  );
};

export default Model;