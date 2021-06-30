---
title: "Import 3D models to three.js [outdated]"
date: 2021-03-08T22:42:52-06:00
draft: false
description: "In this post I'm going to explain how to easily import 3D objects to threejs and how to structure a simple scene"
tags: ['js']
---

I've found threejs pretty tricky at the current state of the library. They are always making improvements and breaking some applications with the new updates. So here, I"m going to talk about how I've found it's good to structure your threejs application for importing 3D objects. Here is a working example.

{{< sandbox height="250px" sandbox="allow-same-origin allow-scripts">}}
<!DOCTYPE html>
<html>
	<head>
		<style>
			body { margin: 0; }
		</style>
	</head>
	<body>
		<script type="module">
			import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.130.0-WI96Ec9p8dZb5AMcOcgD/mode=imports,min/optimized/three.js';
            import { OrbitControls } from 'https://cdn.skypack.dev/pin/three@v0.130.0-WI96Ec9p8dZb5AMcOcgD/mode=imports,min/unoptimized/examples/jsm/controls/OrbitControls.js';
            import { GLTFLoader } from 'https://cdn.skypack.dev/pin/three@v0.130.0-WI96Ec9p8dZb5AMcOcgD/mode=raw,min/examples/jsm/controls/GLTFLoader.js'

            let camera, scene, renderer, loader, model;

            const delay = 250

            init();
            animate()

            function init () {
                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
                renderer = new THREE.WebGLRenderer({ antialias: true})
                loader = new GLTFLoader();

                renderer.setSize( window.innerWidth, window.innerHeight );
                renderer.setClearColor("#121212")
                document.body.appendChild( renderer.domElement );

                camera.position.z = 3;

                const controls = new OrbitControls(camera, renderer.domElement);

                // ambient light
                const ambientLight = new THREE.AmbientLight ( 0xffffff, 0.2)
                scene.add( ambientLight )

                // point light
                const pointLight = new THREE.PointLight( 0xffffff, 1 );
                pointLight.position.set( 30, 50, 25 );
                scene.add( pointLight );

                window.addEventListener( 'resize', () => {
                    throttle(onWindowResize(), delay)
                } );

                loader.load( '/models/skull_downloadable/scene.gltf', function ( gltf ) {
                    model = gltf.scene
                    scene.add( model );

                }, undefined, function ( error ) {
                    console.error( error );
                } );
            }

            function throttle(callback, limit) {
                console.log('hola')
                let wait = false
                return function () {
                    if (!wait) {
                    callback.apply(null, arguments)
                    wait = true
                    setTimeout(function () {
                        wait = false
                    }, limit)
                    }
                }
            }

            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize( window.innerWidth, window.innerHeight );
            }

            function animate() {
                requestAnimationFrame( animate );
                if (model) {
                    model.rotation.y -= 0.01
                }     
                renderer.render( scene, camera );
            }
		</script>
	</body>
</html>
{{</ sandbox >}}

## Basic Setup

The current version of threejs doesn't require any special tags in the HTML, only the `<script type="module">` tag where we are going to develop the logic of the program.

When using `type="module"` we can use the features of es5 such as `import` so we are going to use them. We have to import `threejs` and `GLTFLoader`. And any other component you use, such as `OrbitControls`. I'm going to define some variables gloablly as I'm assigning them afterwards in the `init()` function. You can extend on the configuration in this function [in the documentation](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)

{{< highlight js >}}
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js'

let camera, scene, renderer, loader, model;

init();
animate()

function init () {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer({ antialias: true})
    loader = new GLTFLoader();

    // renderer
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor("#121212") // set the background color
    document.body.appendChild( renderer.domElement );

    camera.position.z = 3;
}

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
{{</ highlight >}}

For adjusting the size when changing resizing the window we have to add an event listener and to change both the aspect ratio and the size of the renderer.

{{< highlight js >}}

function init () {
    // ...
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
{{</ highlight >}}

## Loading object

Now we have to load the object and define the lighting for the scene.

{{< highlight js >}}
function init () {
    // ...

    // ambient light
    const ambientLight = new THREE.AmbientLight ( 0xffffff, 0.2)
    scene.add( ambientLight )

    // point light
    const pointLight = new THREE.PointLight( 0xffffff, 1 );
    pointLight.position.set( 30, 50, 25 );
    scene.add( pointLight );

    loader.load( '/path/to/object.gltf', function ( gltf ) {
        model = gltf.scene // assign the model to the global variable
        scene.add( model );

    }, undefined, function ( error ) {
        console.error( error );
    } );
}
{{</ highlight >}}

## Animation

To add a simple animation rotation to the model we have to add or substract to the rotation of the object in every animation frame, for example. However, there are much more ways of animating and with different purposes.  

{{< highlight js >}}
function animate() {
    requestAnimationFrame( animate );
    if (model) {
        model.rotation.y -= 0.01
    }     
    renderer.render( scene, camera );
}
{{</ highlight >}}

### Complete implementation

You can check to the complete implementation in [this Github gist](https://gist.github.com/DatsGabs/0a5dd2d1a2d8c63b6d8390a84b3434f9). 
