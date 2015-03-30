//////////  
// MAIN //
//////////
// SERVICE THREE OBJECTS
var container, scene, camera, renderer, controls;
var clock = new THREE.Clock();

// SOLAR SYSTEM OBJECTS

  var t = 0; //for orbits 

  // SUN
  var sun, sun_geometry, sun_material;
  var SUN_RADIUS = 430, SUN_ROTATION_SPEED = 0.001;

  // EARTH
  var earth, earth_geometry, earth_material;
  var EARTH_RADIUS           = 50
      , EARTH_ROTATION_SPEED = 0.001
      , EARTH_POSITION_X     = 1500;  


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
  camera.position.z = 6300;
  camera.lookAt(scene.position);  
  
  //////////////
  // RENDERER //
  //////////////
  
  // create and start the renderer; choose antialias setting.
  renderer = new THREE.WebGLRenderer( {antialias:true} );
  
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  // attach div element to variable to contain the renderer
  container = document.getElementById( 'planet' );
  
  // attach renderer to the container div
  container.appendChild( renderer.domElement );

  //////////////
  // CONTROLS //
  //////////////
  // move mouse and: left   click to rotate, 
  //                 middle click to zoom, 
  //                 right  click to pan
  controls = new THREE.OrbitControls( camera, renderer.domElement );

  /////////////////
  // SUN AND CO. //
  /////////////////

  //SUN
  sun_geometry = new THREE.SphereGeometry(SUN_RADIUS,30,30);
  sun_material = new THREE.MeshNormalMaterial();
  sun = new THREE.Mesh(sun_geometry, sun_material);
  scene.add(sun);

  //EARTH
  earth_geometry = new THREE.SphereGeometry(EARTH_RADIUS,20,20);
  earth_material = new THREE.MeshNormalMaterial();
  earth = new THREE.Mesh(earth_geometry, earth_material);
  scene.add(earth);
  earth.position.x = EARTH_POSITION_X;
  
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

    sun.rotation.y += SUN_ROTATION_SPEED;

    earth.position.x = Math.sin(t*0.1)*EARTH_POSITION_X;
    earth.position.z = Math.cos(t*0.1)*EARTH_POSITION_X;

    t += Math.PI/180*2
}

function cartesianToPolar(x, y) {
  return [Math.sqrt(x*x + y*y), Math.atan2(y, x)];
}

function polar2cartesian(R, theta) {
    return [R * Math.cos(theta), R * Math.sin(theta)];
}