//Global variables
var renderer, scene, camera, composer, octoMain, skeleton, particle;
var bar01, bar02;
var effect, controls;
var element, container;
// var renderer, scene, camera, composer, circle, skelet, particle;

var clock = new THREE.Clock();
//Execute the main functions when the page loads
window.onload = function() {
  init();
  geometry();
  animate();
}

function init(){

  renderer = new THREE.WebGLRenderer();
    element = renderer.domElement;
    //Finding container in index.html so that scene renders on page
    container = document.getElementById('container');
    container.appendChild(element);

    //StereoEffect splits the scene into two
     effect = new THREE.StereoEffect(renderer);

    scene = new THREE.Scene();

    //Creating and positioning camera
    camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 10000);
    camera.position.set(-500, 400, -200);
    scene.add(camera);

    //OrbitControls allows user to move around the scene using controls
    controls = new THREE.OrbitControls(camera, element);
    // controls.rotateUp(Math.PI / 4);
    controls.target.set(
      camera.position.x + 0.1,
      camera.position.y,
      camera.position.z
    );
    controls.noZoom = true;
    controls.noPan = true;

    function setOrientationControls(e) {
      //If not available
      if (!e.alpha) {
        return;
      }

      //DeviceOrientationControls allows user to move around scene by tilting their device (makes it mobile ci)
      controls = new THREE.DeviceOrientationControls(camera, true);
      controls.connect();
      controls.update();

      //element.addEventListener('click', fullscreen, false);

      window.removeEventListener('deviceorientation', setOrientationControls, true);
    }
    window.addEventListener('deviceorientation', setOrientationControls, true);

    //Scene lights
    var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
    scene.add(light);

    var texture = THREE.ImageUtils.loadTexture(
      //'texture/checker.png'
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat = new THREE.Vector2(50, 50);
    texture.anisotropy = renderer.getMaxAnisotropy();


    //Adds a floor underneath cubes
    // var material = new THREE.MeshPhongMaterial({
    //   color: 0xffffff,
    //   specular: 0xffffff,
    //   shininess: 20,
    //   shading: THREE.FlatShading,
    //   map: texture
    // });
    // var geometry = new THREE.PlaneGeometry(1000, 1000);
    // var mesh = new THREE.Mesh(geometry, material);
    // mesh.rotation.x = -Math.PI / 2;
    // scene.add(mesh);

  // //Configure renderer settings-------------------------------------------------
  // renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  // renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  // renderer.setSize( window.innerWidth, window.innerHeight );
  // renderer.autoClear = false;
  // renderer.setClearColor(0x404040, 1.0);
  // document.getElementById('canvas').appendChild(renderer.domElement);
  // //----------------------------------------------------------------------------
  //
  // // Create an empty scene
  // scene = new THREE.Scene();
  //
  // // Create a basic perspective camera
  // camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
  // camera.position.z = 400;
  // scene.add(camera);
  //
  // // Create the lights
  // var ambientLight = new THREE.AmbientLight(0x999999, 0.5);
  // scene.add(ambientLight);

  var lights = [];
  lights[0] = new THREE.DirectionalLight( 'white', 0.5);
  lights[0].position.set(1, 0, 0);
  lights[1] = new THREE.DirectionalLight( 'white', 0.5);
  lights[1].position.set(0.75, 1, 0.5);
  lights[2] = new THREE.DirectionalLight('white', 0.5);
  lights[2].position.set(-0.75, -1, 0.5);
  scene.add(lights[0]);
  scene.add( lights[1] );
  scene.add( lights[2] );


  window.addEventListener('resize', onWindowResize, false);
}

//Keep everything appearing properly on screen when window resizes
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); //maintain aspect ratio
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function geometry(){

var loader = new THREE.OBJLoader();
loader.load("rabbit.obj", function(object){
  texture = new THREE.TextureLoader().load( "bunnycolour.jpg" );
	materialObj = new THREE.MeshBasicMaterial( { map: texture} );
  object.traverse(function(child){
    if (child instanceof THREE.Mesh){
      child.material = materialObj;
    }
  });
  scene.add(object)
  object.position.set(0,0,0);
  object.scale.set(100,100,100);
  object.rotation.y = 3;
});
}

function resize() {
    var width = container.offsetWidth;
    var height = container.offsetHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    //renderer.setSize(width, height);
    //effect.setSize(width, height);
  }
  //resizes
  function update(dt) {
    //resize();

    camera.updateProjectionMatrix();

    controls.update(dt);
  }

  function render(dt) {
    effect.render(scene, camera);
  }

// Render Loop
function animate(){
  requestAnimationFrame(animate);

  // octoMain.rotation.x -= 1;
  // octoMain.rotation.y -= 0.02;


  // Render the scene
  renderer.clear();
  renderer.render(scene, camera);
}

function fullscreen() {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  }
}
