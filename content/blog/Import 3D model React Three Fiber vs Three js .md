---
title: "Import 3D models in React Three Fiber vs Three.js "
date: 2022-08-13
draft: false
description: ""
tags: ["react", "js"]
keywords:
  [
    "react three fiber",
    "three js",
    "react three fiber vs three js",
    "import 3d model",
    "react",
    "js",
  ]
tweet_id:
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
      const light = new THREE.AmbientLight( 0x404040, 8 ); // soft white light
      scene.add( light );
      const directionalLight = new THREE.DirectionalLight( 0xffffff, 5 );
      scene.add( directionalLight );
      const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 0.1, 100)
      camera.position.x = 1
      camera.position.y = 1
      camera.position.z = 1
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
      loader.load( '/models/capy.glb', function ( gltf ) {
        const capy = scene.add( gltf.scene );
        capy.position.set(0, -0.35, 0);
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

## Importing 3D models in React Three Fiber
