import './style.css'

import * as THREE from 'three';

ScrollReveal({ 
  reset: true,
});
ScrollReveal().reveal('.header');
ScrollReveal().reveal('.project1');
ScrollReveal().reveal('.project2');

var phone = false;
//phone screen
if(window.innerWidth < 600){
  phone = true;
}

//create scene, camera and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color().setHex(0xffffff);
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//add objects
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
var newCube = cube.clone();

if(phone){
  cube.position.set(0, 0, -5);
  newCube.position.set(0,0,10);
}else{
  cube.position.set(5, 0, 0);
  newCube.position.set(-5,0,25);
}
scene.add( cube );
scene.add( newCube );

//add spheres
const sphereGeometry = new THREE.SphereGeometry();
const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0x4fffa4 } );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );

for ( let i = 0; i < 200; i ++ ) {

  const x = Math.random() * 150 + 30;
  const y = Math.random() * 150 - 40;
  const z = Math.random() * 350 - 250;

  var newSphere = sphere.clone();
  newSphere.position.set(x,y,z);
  scene.add(newSphere);
}

//camera movement
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  var recipezeDiv = document.getElementById("recipeze");
  camera.position.z = (t/recipezeDiv.offsetTop) * -10;

  // t = current pos
  //offsettop = pos of element

  // if(t < 500){
  //   camera.position.x = t * -0.0002;
  // }else{
  //   camera.position.x = t * -0.0002;
  // }
  // camera.position.x = t * -0.0002;
  // camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame( animate );

  renderer.render( scene, camera );
}
animate();

window.addEventListener( 'resize', onWindowResize, false );

// Handle resizing of the browser window.
function onWindowResize(){
  if(phone && window.innerWidth >= 600){
    phone = false;
    cube.position.set(5, 0, 0);
    newCube.position.set(-5,0,25);
  }else if(!phone && window.innerWidth < 600){
    phone = true;
    cube.position.set(0, 0, -5);
    newCube.position.set(0,0,10);
  }

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}