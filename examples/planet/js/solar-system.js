//////////  
// MAIN //
//////////
// standard global variables
var container, scene, camera, renderer, controls;
var clock = new THREE.Clock();
// Solar system objects
var sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto, asteroids;

// initialization
init();

drawSolarSystem();

// animation loop / game loop
animate();

///////////////
// FUNCTIONS //
///////////////

function init() {
  
  THREE.ImageUtils.crossOrigin = '';
  
  ///////////
  // SCENE //
  ///////////
  scene = new THREE.Scene();
  
  ////////////
  // CAMERA //
  ////////////
  
  // set the view size in pixels (custom or according to window size)
  // var SCREEN_WIDTH = 400, SCREEN_HEIGHT = 300;
  var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight; 
  // camera attributes
  var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
  // set up camera
  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
  // add the camera to the scene
  scene.add(camera);
  // the camera defaults to position (0,0,0)
  //  so pull it back (z = 400) and up (y = 100) and set the angle towards the scene origin
  camera.position.set(100,300,400);
  camera.lookAt(scene.position);  
  
  //////////////
  // RENDERER //
  //////////////
  
  // create and start the renderer; choose antialias setting.
  renderer = new THREE.WebGLRenderer( {antialias:true} );
  
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  
  // attach div element to variable to contain the renderer
  container = document.getElementById( 'ThreeJS' );
  // alternatively: to create the div at runtime, use:
  //   container = document.createElement( 'div' );
  //    document.body.appendChild( container );
  
  // attach renderer to the container div
  container.appendChild( renderer.domElement );
  
  // ////////////
  // // EVENTS //
  // ////////////
  // // automatically resize renderer
  // THREEx.WindowResize(renderer, camera);
  // // toggle full-screen on given key press
  // THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
  
  //////////////
  // CONTROLS //
  //////////////
  // move mouse and: left   click to rotate, 
  //                 middle click to zoom, 
  //                 right  click to pan
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  
  /////////
  // SKY //
  /////////
  
  // recommend either a skybox or fog effect (can't use both at the same time) 
  // without one of these, the scene's background color is determined by webpage background
  // make sure the camera's "far" value is large enough so that it will render the skyBox!
  var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
  // BackSide: render faces from inside of the cube, instead of from outside (default).
  var skyTexture = THREE.ImageUtils.loadTexture( 'img/solar_system/space.jpg' );
  var skyBoxMaterial = new THREE.MeshBasicMaterial( 
    { color: 0x9999ff, side: THREE.BackSide, map: skyTexture } 
  );
  var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
  scene.add(skyBox);
}

function drawSolarSystem() {
  ///////////////////
  // Sun and bros. //
  ///////////////////
  
  // var axes = new THREE.AxisHelper(100);
  // scene.add( axes );
  
  drawSun();
  drawMercury();
  drawVenus();
  drawEarth();
  drawMars();
  drawAsteroids();
  drawJupiter();
  // drawSaturn();

}

function drawSun() {
  var sunTexture = THREE.ImageUtils.loadTexture( 'img/solar_system/sun.png' );
  var sunGeometry = new THREE.SphereGeometry(100, 32, 16);
  var sunMaterial = new THREE.MeshBasicMaterial( {map: sunTexture} );
  sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.position.set(0, 0, 0);
  scene.add(sun);

  ///////////
  // LIGHT //
  ///////////
  
  // create a lighter inide of sun
  var light = new THREE.PointLight(0xffffff);
  light.position.set(0,0,0);
  scene.add(light);
}

function drawMercury() {
  var mercuryTexture = THREE.ImageUtils.loadTexture( 'img/solar_system/mercury.jpg' );
  var mercuryGeometry = new THREE.SphereGeometry(10, 32, 16);
  var mercuryMaterial = new THREE.MeshLambertMaterial( 
    { map: mercuryTexture, ambient: 0x0000ff, emissive: 0xffffff } 
  );
  mercury = new THREE.Mesh( mercuryGeometry, mercuryMaterial );
  mercury.position.set(120, 0, 0);
  scene.add(mercury);  
}

function drawVenus() {
  var venusTexture = THREE.ImageUtils.loadTexture( 'img/solar_system/venus.png' );
  var venusGeometry = new THREE.SphereGeometry(20, 32, 16);
  var venusMaterial = new THREE.MeshLambertMaterial( 
    { map: venusTexture, ambient: 0x0000ff, emissive: 0xffffff } 
  );
  venus = new THREE.Mesh( venusGeometry, venusMaterial );
  venus.position.set(200, 0, 0);
  scene.add(venus);  
}

function drawEarth() {
  var earthTexture = THREE.ImageUtils.loadTexture( 'img/solar_system/earth.png' );
  var earthGeometry = new THREE.SphereGeometry(20, 32, 16);
  var earthMaterial = new THREE.MeshLambertMaterial( 
    { map: earthTexture, ambient: 0x0000ff, emissive: 0xffffff } 
  );
  earth = new THREE.Mesh( earthGeometry, earthMaterial );
  earth.position.set(300, 0, 0);
  scene.add(earth);  
}

function drawMars() {
  var marsTexture = THREE.ImageUtils.loadTexture( 'img/solar_system/mars.jpg' );
  var marsGeometry = new THREE.SphereGeometry(20, 32, 16);
  var marsMaterial = new THREE.MeshLambertMaterial( 
    { map: marsTexture, ambient: 0x0000ff, emissive: 0xffffff } 
  );
  mars = new THREE.Mesh( marsGeometry, marsMaterial );
  mars.position.set(400, 0, 0);
  scene.add(mars);  
}

function drawAsteroids() {
  var asteroidRingGeometry = new THREE.Geometry();
  var asteroidRingMaterial = new THREE.ParticleBasicMaterial({color: 0x3A3A3A, opacity:0.3, size:1, 
                                sizeAttenuation: false});
  for (var i = 0; i < 20000; ++i) {
    var vertex = new THREE.Vector3();
    vertex.x = Math.sin(Math.PI/180*i)*(530-i/250);
    vertex.y = Math.random()*30;
    vertex.z = Math.cos(Math.PI/180*i)*(530-i/150);
    asteroidRingGeometry.vertices.push(vertex);
  }

  asteroids = new THREE.ParticleSystem(asteroidRingGeometry, asteroidRingMaterial);
  asteroids.castShadow = true;
  scene.add(asteroids);
}

function drawJupiter() {
  var jupiterTexture = THREE.ImageUtils.loadTexture( 'img/solar_system/jupitermap.jpg' );
  var jupiterGeometry = new THREE.SphereGeometry(30, 32, 16);
  var jupiterMaterial = new THREE.MeshLambertMaterial( 
    { map: jupiterTexture, ambient: 0x0000ff, emissive: 0xffffff } 
  );
  jupiter = new THREE.Mesh( jupiterGeometry, jupiterMaterial );
  jupiter.position.set(600, 0, 0);
  scene.add(jupiter);  
}

function drawSaturn() {
  var saturnTexture = THREE.ImageUtils.loadTexture( 'img/solar_system/saturnmap.jpg' );
  var saturnGeometry = new THREE.SphereGeometry(27, 32, 16);
  var saturnMaterial = new THREE.MeshLambertMaterial( 
    { map: saturnTexture, ambient: 0x0000ff, emissive: 0xffffff } 
  );
  saturn = new THREE.Mesh( saturnGeometry, saturnMaterial );
  saturn.position.set(700, 0, 0);
  scene.add(saturn);

}

function animate() {
  requestAnimationFrame( animate );
  render();   
  update();
}

function update() {   
  controls.update();
}

var mercuryAngle = 0;
var venusAngle = 0;
var earthAngle = 0;
var marsAngle = 0;
var jupiterAngle = 0;
var saturnAngle = 0;
function render() { 
  renderer.render( scene, camera );
  sun.rotation.y += 0.001;
  mercury.rotation.y += 0.001;
  venus.rotation.y += 0.001;
  earth.rotation.y += 0.001;
  mars.rotation.y += 0.001;
  jupiter.rotation.y += 0.001;

  mercuryAngle -= 0.005; 
  mercury.position.x = 120*Math.cos(mercuryAngle);
  mercury.position.z = 120*Math.sin(mercuryAngle);

  venusAngle -= 0.003;
  venus.position.x = 200*Math.cos(venusAngle);
  venus.position.z = 200*Math.sin(venusAngle);

  earthAngle -= 0.002;
  earth.position.x = 300*Math.cos(earthAngle);
  earth.position.z = 300*Math.sin(earthAngle);

  marsAngle -= 0.001;
  mars.position.x = 400*Math.cos(marsAngle);
  mars.position.z = 400*Math.sin(marsAngle);     

  jupiterAngle -= 0.0025;
  jupiter.position.x = 600*Math.cos(jupiterAngle);
  jupiter.position.z = 600*Math.sin(jupiterAngle);

}

function cartesianToPolar(x, y) {
  return [Math.sqrt(x*x + y*y), Math.atan2(y, x)];
}

function polar2cartesian(R, theta) {
    return [R * Math.cos(theta), R * Math.sin(theta)];
}