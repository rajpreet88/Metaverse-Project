//import * as THREE from 'three';
//import Movements from "./movement";
import abi from "./ABI/abi.json" assert {type:"json"};
import polygon from "./Web3.js";


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


// //*********Adding objects in the scene
// const geometry = new THREE.BoxGeometry( 10, 10, 10 );
// const material = new THREE.MeshPhongMaterial( { color: 0xe6ed09 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;


//*********Adding surface area in the scene
const geometry_area = new THREE.BoxGeometry( 60, 0.2, 50 );
const material_area = new THREE.MeshPhongMaterial( { color: 0xffffff } );
const area = new THREE.Mesh( geometry_area, material_area );
scene.add( area );
camera.position.set(0,3,35);


// //********** Adding cylinder on the scene
// const geometry_cyl = new THREE.CylinderGeometry( 5, 5, 20, 32 );
// const material_cyl = new THREE.MeshPhongMaterial( {color: 0xfaf607} );
// const cylinder = new THREE.Mesh( geometry_cyl, material_cyl );
// scene.add( cylinder );
// cylinder.position.set(20,5,0);

// //********** Adding cone on the scene
// const geometry_cone = new THREE.ConeGeometry( 5, 20, 32 );
// const material_cone = new THREE.MeshPhongMaterial( {color: 0xfaf607} );
// const cone = new THREE.Mesh( geometry_cone, material_cone );
// scene.add( cone );
// cone.position.set(-20,5,0);


//****Mint NFT function on click on 'Create a new NFT */
function NFTmint(){
    let nft_name = document.querySelector("#nft_name").value; // now we will fetch the nft name from the form itself
    let nft_width = document.querySelector("#nft_width").value; // now we will fetch the nft wdith from the form itself
    let nft_length = document.querySelector("#nft_height").value; // now we will fetch the nft length from the form itself
    let nft_depth = document.querySelector("#nft_depth").value; // now we will fetch the nft depth from the form itself
    let nft_x = document.querySelector("#nft_x").value; // now we will fetch the nft x-axis from the form itself
    let nft_y = document.querySelector("#nft_y").value; // now we will fetch the nft y-axis from the form itself
    let nft_z = document.querySelector("#nft_z").value; // now we will fetch the nft z-axis from the form itself

    //now again since we are using the form as input we will have to check if metamask is installed or not before minting
    if(typeof window.ethereum=='undefined')
        {
            reject("Metamask not installed. Please install Metamask to proceed further")
        }

    
    //we will again need instance on smart contract to send the input from the form to smart contract
    let web3 = new Web3(window.ethereum); // Accessing Web3 library
    let contract = new web3.eth.Contract(abi, "0x32640941cda36f12F3795D080fF509777113Cd8f");

    //finally we will send the form input to the smart contract using the web3 instance (contract) after fetching the currently active account loogged in metmask
    web3.eth.requestAccounts().then((accounts)=>{ // get the actve account
        contract.methods.mintNFT(nft_name,nft_width,nft_length,nft_depth,nft_x,nft_y,nft_z)
        .send({ from: accounts[0], value: "10"}) // sending values from the active account along with minimum gas fee of 10wei required
            .then(()=> console.log("NFT minted successfully"));

    });


}


//***Lets write a code on what happens on button press of the 'Create new NFT' */
const button =  document.querySelector("#mint");//get the button click id and store it a button variable
button.addEventListener('click', NFTmint); // will listen to click of the button and on button click we will mint the NFT




//using the final outputs from the Promise resolve in the Web3.js here as promise resolve next
polygon
    .then((result)=>{
        result.NFT.forEach((object,index) => {
            if(index <= result.Supply)
            {
                const geometry_cone = new THREE.ConeGeometry( object.width, object.height, object.depth );
                const material_cone = new THREE.MeshPhongMaterial( {color: 0xfaf607} );
                const coneNFT = new THREE.Mesh( geometry_cone, material_cone );
                coneNFT.position.set(object.x,object.y,object.z);
                scene.add( coneNFT );


                function animate() {
                    coneNFT.rotation.x-=0.02;
                    coneNFT.rotation.y-=0.02;
                    coneNFT.rotation.z-=0.02;
                
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
            }
        });
    })

