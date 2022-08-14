---
title: "Import 3D models in React Three Fiber vs Three.js "
date: 2022-08-13
draft: false
description: "React Three Fiber and Three.js both are libraries for adding 3D elements on the web. What are the differences? How to import a 3D model in React Three Fiber vs Three.js? How to change the color of a GLB oject?"
tags: ["react", "js"]
keywords:
  [
    "react three fiber",
    "three js",
    "react three fiber vs three js",
    "import 3d model",
    "react three fiber",
    "glb",
    "color",
    "react",
    "js",
  ]
tweet_id: 1558909435745124354
twitter_card: summary_large_image
image: https://i.imgur.com/rIg7Aol.png
---

{{< sandbox sandbox="allow-scripts allow-same-origin" height="300px">}}

<html>
  <head>
    <style>
      * {
          margin: 0;
          padding: 0;
      }

      html,
      body {
          overflow: hidden;
      }

      .webgl {
          position: fixed;
          top: 0;
          left: 0;
          outline: none;
      }
    </style>

  </head>
  <body>
    <canvas class="webgl"></canvas>
    <script async src="https://unpkg.com/es-module-shims@1.3.6/dist/es-module-shims.js"></script>
    <script type="importmap">
      {
        "imports": {
          "three": "https://unpkg.com/three/build/three.module.js"
        }
      }
    </script>
    <script type="module">
      import * as THREE from 'three';
      import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
      import { GLTFLoader } from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js';
      const canvas = document.querySelector('canvas.webgl')
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x121212);
      const sizes = {
          width: window.innerWidth,
          height: window.innerHeight
      }
      window.addEventListener('resize', () => {
          sizes.width = window.innerWidth
          sizes.height = window.innerHeight
          camera.aspect = sizes.width / sizes.height
          camera.updateProjectionMatrix()
          renderer.setSize(sizes.width, sizes.height)
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      })
      const light = new THREE.AmbientLight( 0x404040, 2 ); // soft white light
      scene.add( light );
      const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
      scene.add( directionalLight );
      const camera = new THREE.PerspectiveCamera( 45, sizes.width / sizes.height, 1, 1000 );
      camera.position.x = 1
      camera.position.y = 1
      camera.position.z = 7
      scene.add(camera)
      const renderer = new THREE.WebGLRenderer({
          canvas: canvas,
          antialias: true,
      })
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      const controls = new OrbitControls( camera, renderer.domElement );
      controls.enableDamping = true
      const loader = new GLTFLoader();
      loader.load( '/models/capybara.glb', function ( gltf ) {
        const capy = gltf.scene;
        var newMaterial = new THREE.MeshPhysicalMaterial({color: 0xbf743d});
        capy.traverse((o) => {
          if (o.isMesh) {
            o.material = newMaterial
          }
        });
        scene.add( capy );
        capy.position.set(0, 0.35, 0);
      }, undefined, function ( error ) {
        console.error( error );
      } );
      const clock = new THREE.Clock()
      let lastElapsedTime = 0
      const tick = () => {
          const elapsedTime = clock.getElapsedTime()
          const deltaTime = elapsedTime - lastElapsedTime
          lastElapsedTime = elapsedTime
          controls.update()
          renderer.render(scene, camera)
          window.requestAnimationFrame(tick)
      }
      tick()
    </script>

  </body>
</html>

{{</ sandbox >}}

## What is React Three Fiber?

React Three Fiber is a new React renderer for [Three.js](https://threejs.org/), it's an **abstraction layer on top of Three.js**, so you can use Three.js without having to worry about the underlying implementation.

## Base application

### Three.js

Here is a simple bare Three.js template to get your started:

You can also see clone this template from [here](https://github.com/brunosimon/threejs-template-simple)

```html
<!-- index.html -->
<html>
  <head>
    <style>
      * {
          margin: 0;
          padding: 0;
      }

      html,
      body {
          overflow: hidden;
      }

      .webgl {
          position: fixed;
          top: 0;
          left: 0;
          outline: none;
      }
    </style>

  </head>
  <body>
    <canvas class="webgl"></canvas>
    <script async src="https://unpkg.com/es-module-shims@1.3.6/dist/es-module-shims.js"></script>
    <script type="importmap">
      {
        "imports": {
          "three": "https://unpkg.com/three/build/three.module.js"
        }
      }
    </script>
    <script type="module" src="main.js">
  </body>
</html>
```

```js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector("canvas.webgl");
// Scene
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Lights
const light = new THREE.AmbientLight(0x404040, 2); // soft white light
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();
let lastElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - lastElapsedTime;
  lastElapsedTime = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```

### In React Three Fiber

Which is basically the same as doing this in React Three Fiber, as you can see it's really abstracted away from Three.js:

```jsx
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function App() {
  return (
    <div className="App">
      <Canvas camera={{ position: [0, 0, 10], fov: 55 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
```

## Import 3D model

You can download the capybara 3D model i'm using for this tutorial [here](https://gabriellazcano.com/models/capybara.glb)

It's a GLB file so you will have to use the GLTFLoader to load it. There's many other loaders for [different file types](https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models), but the GLTFLoader is the most common one.

### In Three.js

```js
// Import GLTFLoader from unpkg
import { GLTFLoader } from "https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
loader.load(
  "/models/capybara.glb", // load the model
  function (gltf) {
    const capy = gltf.scene;

    // change the color of the model
    var newMaterial = new THREE.MeshPhysicalMaterial({ color: 0xbf743d });
    capy.traverse((o) => {
      if (!o.isMesh) return;

      o.material = newMaterial;
    });

    // add capybara to the scene
    scene.add(capy);
  },
  undefined,
  function (error) {
    // handle errors
    console.error(error);
  }
);
```

### In React Three Fiber

```jsx
import { useLoader } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Capybara() {
  const { materials, scene } = useLoader(
    GLTFLoader,
    "https://gabriellazcano.com/models/capybara.glb"
  ); // load the model

  useMemo(() => {
    for (const material in materials) {
      // iterate the materials
      if (Object.prototype.hasOwnProperty.call(materials, material)) {
        // change the color of all the materials (there's only one in this model)
        materials[material].color.set("#bb6f3e");
        // you can also change the color of a specific material if you know the name of the material
      }
    }
  }, [materials]);

  // return the primitive with our scene and changed materials
  return <primitive object={scene} />;
}
```

Simply import the component and render it in the scene wrapped with a Suspense component.

```jsx
import Capybara from "../Capybara";

export default function App() {
  return (
    <div className="App">
      <Canvas camera={{ position: [0, 0, 10], fov: 55 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />

        <Suspense fallback={null}>
          <Capybara />
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  );
}
```

## Conclusion

It's really really easy to use React Three Fiber, it manages most of the things for you. However a knowledge of Three.js is somewhat required to use React Three Fiber as some documentation and functions are written in Three.js. I would encourage you to **learn both at the same time** and test your knowledge.

## Thanks for reading, let’s connect

Thanks for reading my blog. Feel free to reach out to me if you have any questions or want to connect. You can also make a pull request if you want to improve the article :)))
