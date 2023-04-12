import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';




const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const Scene = new THREE.Scene();

Scene.background = new THREE.Color(0x000000);
const loader = new GLTFLoader();



//Camera
const camera = new THREE.PerspectiveCamera(
  55, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);


const controls = new PointerLockControls(camera, renderer.domElement)
camera.position.set( 0, 0, -0.1);

//Light

const pointLight = new THREE.PointLight(0xffffff, 6);
 pointLight.position.set(0, 5, 0);
Scene.add(pointLight);


Scene.add(controls.getObject());
document.addEventListener('mousedown', function() {
    console.log('test');
    controls.lock();
    document.getElementById("Cursor").style.display = "block";
});
// Create a new Raycaster object
const raycaster = new THREE.Raycaster();

// Listen for mouse click events on the document
document.addEventListener('click', function(event) {
  // Calculate the mouse position in normalized device coordinates
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Set the raycaster to cast from the camera position
  raycaster.setFromCamera(mouse, camera);

  // Find all objects that intersect with the raycaster
  const intersects = raycaster.intersectObjects(Scene.children, true);

  // Do something with the intersected objects (e.g. log to console)
  if (intersects.length > 0) {
    console.log(intersects[0].object);
  }
});

// Show the cursor by setting the CSS style of the document body
document.body.style.cursor = 'auto';


loader.load("/Full_Desk_1.0.glb" , function ( glb)
{
  const Table2 = glb.scene;  
  Table2.scale.set(1,1,1);
  Table2.position.set(0, -1, -0.6);
  Table2.rotation.y = -Math.PI/2;
  Scene.add( Table2 );

 

},  (xhr) => {
  console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
},

// Called if there's an error loading the model
(error) => {
  console.error('Error loading model', error);
},);  



const animate = function () {
  requestAnimationFrame(animate);


  //controls.update();
  // Update Scene objects here
  renderer.render(Scene, camera);
};


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}


window.addEventListener("resize" , onWindowResize) ;

animate();