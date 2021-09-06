import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene(); //Scene = Container

const camera = new THREE.PerspectiveCamera ( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#background'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render( scene, camera );

//Three Steps to make a shape 1.Geometry 2.Material 3.Mesh
const shape = new THREE.TorusGeometry ( 10, 3, 16, 100 ) //Gives geometry
const material = new THREE.MeshNormalMaterial( {color: 0xFF6347, wireframe: true });
const torus = new THREE.Mesh ( shape, material );

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff); //Hexadecimal literal
pointLight.position.set(5,5,5) // Specific Light

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight) //Light for whole scene

function addStar() {
    const shape = new THREE.SphereGeometry(0.25);
    const material = new THREE.MeshStandardMaterial( {color: 0x00ffff} );
    const star = new THREE.Mesh( shape, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

    star.position.set(x, y, z);
    scene.add(star)
}

Array(300).fill().forEach(addStar) 


const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture

const javiTexture = new THREE.TextureLoader().load('unnamed.jpg');
const javi = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial( { map: javiTexture } )
);
scene.add(javi);

javi.position.z = -7;
javi.position.x = 2.5;



const earthTexture = new THREE.TextureLoader().load('earth.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.JPG');
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial( { map: earthTexture, normalTexture } )
);
scene.add(earth)


earth.position.z = 13;
earth.position.x = -12;
earth.position.y = 3;

function moveCamera(){

    const t = document.body.getBoundingClientRect().top;
    earth.rotation.x += 0.05;
    earth.rotation.y += 0.075;
    earth.rotation.z += 0.05;

    javi.rotation.y += 0.01;
    javi.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.002;

}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
    requestAnimationFrame( animate );

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    earth.rotation.x += 0.005;

    renderer.render( scene, camera);
}

animate();