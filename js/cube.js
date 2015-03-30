//////////  
// MAIN //
//////////
// SERVICE THREE OBJECTS
var container, scene, camera, renderer, controls;
var clock = new THREE.Clock();

// CUBE
var cube, cubeGeometry, cubeMaterial;
var CUBE_EDGE_LENGTH    = 500,
    CUBE_ROTATION_SPEED = 0.001;

// initialization
init();

// animation loop / game loop
animate();

///////////////
// FUNCTIONS //
///////////////

function init() {
  ///////////
  // SCENE //
  ///////////
  scene = new THREE.Scene();
  
  ////////////
  // CAMERA //
  ////////////
  
  // var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight; 
  var SCREEN_WIDTH = document.getElementById('bored').clientWidth, 
      SCREEN_HEIGHT = document.getElementById('bored').clientHeight;
  // camera attributes
  var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 1, FAR = 10000;
  // set up camera
  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
  // add the camera to the scene
  scene.add(camera);
  camera.position.z = 2000;
  camera.lookAt(scene.position);  
  
  //////////////
  // RENDERER //
  //////////////
  
  // create and start the renderer; choose antialias setting.
  renderer = new THREE.WebGLRenderer( {antialias:true, alpha: true} );
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  // attach div element to variable to contain the renderer
  container = document.getElementById( 'cube' );
  
  // attach renderer to the container div
  container.appendChild( renderer.domElement );

  //////////////
  // CONTROLS //
  //////////////
  // move mouse and: left   click to rotate, 
  //                 middle click to zoom, 
  //                 right  click to pan
  controls = new THREE.OrbitControls( camera, renderer.domElement );

  //////////
  // CUBE //
  //////////

  cubeGeometry = new THREE.BoxGeometry( CUBE_EDGE_LENGTH, 
    CUBE_EDGE_LENGTH,CUBE_EDGE_LENGTH, 6, 6, 6);
  cubeMaterial = new THREE.MeshBasicMaterial( { 
    color: 0x2980b9, 
    wireframe: true
  } );
  cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
  scene.add(cube);
}

function animate() {
  requestAnimationFrame(animate);
  render();   
  update();
}

function update() {   
  controls.update();
}

function render() { 
  renderer.render( scene, camera );
    cube.rotation.x += CUBE_ROTATION_SPEED;
    cube.rotation.y += CUBE_ROTATION_SPEED;
}