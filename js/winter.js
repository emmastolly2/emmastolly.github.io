window.onload = function(event) {

  var camera, scene, renderer;
  var effect, controls;
  var element, container;
  var model,mixer;
  const mixers = [];
  const clock = new THREE.Clock();

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
      color: 'white',
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

    //particles
    particle = new THREE.Object3D();
    scene.add(particle);
    var geometry = new THREE.SphereGeometry(2, 0);
    var material = new THREE.MeshBasicMaterial({
      color: 'white',
    });

    for (var i = 0; i < 30000; i++) {
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      mesh.position.multiplyScalar(90 + (Math.random() * 9000));
      mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
      particle.add(mesh);
    }
    particle.rotation.y -= 0.0040;

  }

  function geometry(){


    // Instantiate a loader
    var loader = new THREE.GLTFLoader();
    loader.setDRACOLoader( new THREE.DRACOLoader() );
    // Load a glTF resource
    loader.load(
      // resource URL
      '../models/fox3.gltf',
      // called when the resource is loaded
      function ( gltf ) {

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Scene
        gltf.scenes; // Array<THREE.Scene>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

        //Loading in and positioning model
        var object = gltf.scene;
        object.scale.set(10,10,10);
        object.position.set (-300, 25,-400);
        object.rotation.y = 0.85;

        //Playing Animation
        mixer = new THREE.AnimationMixer(gltf.scene);
        console.log(gltf.animations)
        mixer.clipAction( gltf.animations[0] ).play();

        //Adding texture/colour to model (causes animation to stop playing)

        materialObj = new THREE.MeshBasicMaterial( { color: "#8A430B", skinning: true} );
        object.traverse(function(child){
          if (child instanceof THREE.Mesh){
            child.material = materialObj;
          }
        });

        console.log(object);
        scene.add( object )
      });

      var loader = new THREE.OBJLoader();
      loader.load("../models/wall.obj", function(wall1){
        //(forwards,down,left)
        wall1.position.set(200,-10,-300);
        wall1.scale.set(20,20,20);
        //object.rotation.y = 3;
        scene.add(wall1)
      });

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

      //Loads rabbit
      // var loader = new THREE.OBJLoader();
      // loader.load("../models/rabbit.obj", function(object){
      //   // texture = new THREE.TextureLoader().load( "bunnycolour.jpg" );
      //   // materialObj = new THREE.MeshBasicMaterial( { map: texture} );
      //   // object.traverse(function(child){
      //   //   if (child instanceof THREE.Mesh){
      //   //     child.material = materialObj;
      //   //   }
      //   // });
      //   object.position.set(-100, 10, -200);
      //   object.scale.set(10,10,10);
      //   object.rotation.y = 1;
      //   scene.add(object)
      // });

      //floor
      var loader = new THREE.OBJLoader();
      loader.load("../models/floor.obj", function(floor){
        //(forwards,down,left)
        floor.position.set(50,-20,-100);
        floor.scale.set(20,12,20);
        scene.add(floor)
      });

    }


    function resize() {
      var width = container.offsetWidth;
      var height = 1000;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      effect.setSize(width, height);
    }

    function update(dt) {
      resize();

      camera.updateProjectionMatrix();

      controls.update(dt);

      const delta = clock.getDelta();
      mixers.forEach( ( mixer ) => { mixer.update( delta ); } );

    }

    function render(dt) {
      effect.render(scene, camera);
    }

    function animate(t) {
      requestAnimationFrame(animate);

      particle.position.y += -0.3;

      var delta = clock.getDelta();
      if (mixer != null && mixer !== undefined) {
        mixer.update(delta);
      };

      update(clock.getDelta());
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
