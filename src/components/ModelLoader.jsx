// @ts-nocheck
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const ModelLoader = () => {
  const scene = useScene();

  useEffect(() => {
    const loader = new GLTFLoader();
    const assetPath = import.meta.env.BASE_URL + 'assets/boxer.glb';

    loader.load(
      assetPath,
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.position.set(0, -0.5, 0);
        model.scale.set(1, 1, 1);

        let mixer;
        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
          });
        }

        const clock = new THREE.Clock();
        const animate = () => {
          requestAnimationFrame(animate);
          const delta = clock.getDelta();
          if (mixer) mixer.update(delta);
        };

        animate();
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
  }, []);

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

export default ModelLoader;



// // @ts-nocheck
// import React, { useEffect } from 'react';
// import * as THREE from 'three';
// import { useThree } from '@react-three/fiber';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
// import { useFrame } from '@react-three/fiber'

// const ModelLoader = () => {
//   const { scene } = useThree();
//   // Animation mixer
//   let mixer;

//   useEffect(() => {
//     // Load GLTF model
//     const loader = new GLTFLoader();
//     const assetPath = import.meta.env.BASE_URL + 'assets/boxer.glb'; // Use BASE_URL
//     loader.load(
//       assetPath,
//       (gltf) => {
//         const model = gltf.scene;
//         scene.add(model);

//         // Adjust model position and scale
//         model.position.set(0, -0.5, 0);
//         model.scale.set(1, 1, 1);

//         // Set up the animation mixer
//         mixer = new THREE.AnimationMixer(model);
//         gltf.animations.forEach((clip) => {
//           mixer.clipAction(clip).play();
//         })
//       },
//       undefined, 
//       (error) => {
//         console.error(error);
//       }
//     );

//     // Clean up on unmount
//     return () => {
//       if (mixer) mixer.stopAllAction();
//       scene.children.forEach((child) => scene.remove(child));
//     };
//   }, [scene]);

//   useFrame((state, delta) => {
//     // Update the mixer on each frame if it exists
//     if(mixer) mixer.update(delta);
//   })

//   return null;
// };

// export default ModelLoader;