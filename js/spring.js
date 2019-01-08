window.onload = function(event) {

  var camera, scene, renderer;
  var effect, controls;
  var element, container;

  var clock = new THREE.Clock();

  init();
  animate();
  geometry();

  function init() {
    renderer = new THREE.WebGLRenderer();
    element = renderer.domElement;
    container = document.getElementById('container');
    container.appendChild(element);

    effect = new THREE.StereoEffect(renderer);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.01, 1000);
    // camera.position.set(-500, 400, -200);
      camera.position.set(-100, 50, -350);
    scene.add(camera);

    controls = new THREE.OrbitControls(camera, element);
    // controls.rotateUp(Math.PI / 4);
    controls.target.set(
      camera.position.x + 0.1,
      camera.position.y,
      camera.position.z
    );
    //controls.noZoom = true;
    controls.noPan = true;

    function setOrientationControls(e) {
      if (!e.alpha) {
        return;
      }

      controls = new THREE.DeviceOrientationControls(camera, true);
      controls.connect();
      controls.update();

      element.addEventListener('click', fullscreen, false);

      window.removeEventListener('deviceorientation', setOrientationControls, true);
    }
    window.addEventListener('deviceorientation', setOrientationControls, true);


    var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
    scene.add(light);

    var texture = THREE.ImageUtils.loadTexture(
      'texture/checker.png'
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat = new THREE.Vector2(50, 50);
    texture.anisotropy = renderer.getMaxAnisotropy();

    var material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xffffff,
      shininess: 20,
      shading: THREE.FlatShading,
      map: texture
    });

    var geometry = new THREE.PlaneGeometry(1000, 1000);

    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);

    cube = new THREE.Mesh( new THREE.CubeGeometry( 200, 200, 200 ), new THREE.MeshNormalMaterial() );
    cube.position.y = 300;
    cube.position.z = 20;
    cube.position.x = 0;

    //scene.add(cube);

    window.addEventListener('resize', resize, false);
    setTimeout(resize, 1);
  }

  function geometry(){

  var loader = new THREE.OBJLoader();
  loader.load("../models/wall.obj", function(wall1){
    //(forwards,down,left)
    wall1.position.set(200,-10,-300);
    wall1.scale.set(20,20,20);
    //object.rotation.y = 3;
    scene.add(wall1)
  });

  var loader = new THREE.OBJLoader();
  loader.load("../models/wall.obj", function(wall2){
    //(forwards,down,left)
    wall2.position.set(-100,-10,-600);
    wall2.scale.set(20,20,20);
    wall2.rotation.y = 1.5;
    scene.add(wall2)
  });

  var loader = new THREE.OBJLoader();
  loader.load("../models/wall.obj", function(wall3){
    //(forwards/backwards,up/down,left/right)
    wall3.position.set(-400,-10,-300);
    wall3.scale.set(20,20,20);
    wall3.rotation.y = 3;
    scene.add(wall3)
  });

  var loader = new THREE.OBJLoader();
  loader.load("../models/wall.obj", function(wall4){
    //(forwards,down,left)
    wall4.position.set(-100,-10,-200);
    wall4.scale.set(20,20,20);
    wall4.rotation.y = 1.5;
    scene.add(wall4)
  });

}

  function resize() {
    var width = container.offsetWidth;
    var height = 1000;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    effect.setSize(width, height);
    console.log(height)
  }

  function update(dt) {
    resize();

    camera.updateProjectionMatrix();

    controls.update(dt);
  }

  function render(dt) {
    effect.render(scene, camera);
  }

  function animate(t) {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;

    //update(clock.getDelta());
    render(clock.getDelta());
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

}
