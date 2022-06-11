import Movements from "./movement";



const scene = new THREE.Scene();

//**********changing scene background color
scene.background = new THREE.Color(0x1a1b1c);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//*********Adding ambient light and dirrectional light in the cube
const ambient_light = new THREE.AmbientLight(0x404040);
const directional_light = new THREE.DirectionalLight(0xf0ede9,1)
ambient_light.add(directional_light);
scene.add(ambient_light);


//*********Adding objects in the scene
const geometry = new THREE.BoxGeometry( 10, 10, 10 );
const material = new THREE.MeshPhongMaterial( { color: 0xe6ed09 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;


//*********Adding surface area in the scene
const geometry_area = new THREE.BoxGeometry( 60, 0.2, 50 );
const material_area = new THREE.MeshPhongMaterial( { color: 0xffffff } );
const area = new THREE.Mesh( geometry_area, material_area );
scene.add( area );
camera.position.set(0,3,35);


//********** Adding cylinder on the scene
const geometry_cyl = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const material_cyl = new THREE.MeshPhongMaterial( {color: 0xfaf607} );
const cylinder = new THREE.Mesh( geometry_cyl, material_cyl );
scene.add( cylinder );
cylinder.position.set(20,5,0);

//********** Adding cone on the scene
const geometry_cone = new THREE.ConeGeometry( 5, 20, 32 );
const material_cone = new THREE.MeshPhongMaterial( {color: 0xfaf607} );
const cone = new THREE.Mesh( geometry_cone, material_cone );
scene.add( cone );
cone.position.set(-20,5,0);

function animate() {
    // cube.rotation.x-=0.02;
    // cube.rotation.y-=0.02;
    // cube.rotation.z-=0.02;
    // cylinder.rotation.x-=0.02;
    // cylinder.rotation.y-=0.02;
    // cylinder.rotation.z-=0.02;
    // cone.rotation.x-=0.02;
    // cone.rotation.y-=0.02;
    // cone.rotation.z-=0.02;

    requestAnimationFrame( animate );
	
    // if(Movements.isPressed(37)){
    //     camera.position.x-=0.5;
    // }
    // if(Movements.isPressed(38)){
    //     camera.position.x+=0.5;
    // }
    // if(Movements.isPressed(39)){
    //     camera.position.y+=0.5;
    // }
    // if(Movements.isPressed(40)){
    //     camera.position.y-=0.5;
    // }
    
    // camera.lookAt(area.position);
	renderer.render( scene, camera );
}
animate();


renderer.render(scene, camera);

