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

    renderer.setClearColor('#89E1FF', 1.0);

    effect = new THREE.StereoEffect(renderer);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.01, 1000);
    // camera.position.set(-500, 400, -200);
    camera.position.set(-50, 25, -550);
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


    var ambientlight = new THREE.AmbientLight( 0xffffff, 0.5 );
    ambientlight.position.set(-300, 200, -100);
    scene.add( ambientlight );

    var dirlight = new THREE.DirectionalLight( 0xffffff, 0.4 );
    dirlight.position.set(-700, 200, -500);
    scene.add( dirlight );

    window.addEventListener('resize', resize, false);
    setTimeout(resize, 1);


// //Random tree generator
//       for (var i = 0; i < 30; i++) {
//             var mtlLoader = new THREE.MTLLoader()
//         mtlLoader.load('../models/tree.mtl', function (material) {
//           var objLoader = new THREE.OBJLoader()
//           objLoader.setMaterials(material)
//           objLoader.load('../models/tree.obj', function (tree) {
//             tree.position.set(Math.random() *-1000- -500, 30,Math.random()  *-1000- -500 );
//             // tree.position.multiplyScalar(90 + (Math.random() * -200));
//             // tree.rotation.set(Math.random() * 2, Math.random() * 200, Math.random() * 200);
//             tree.scale.set(30,30,30);
//             scene.add(tree)
//             });
//           });
//         }


}

  function geometry(){


    // Instantiate a loader
    var loader = new THREE.GLTFLoader();
    // Load a glTF resource
    loader.load(
      // resource URL
      '../models/seagull.gltf',
      // called when the resource is loaded
      function ( gltf ) {

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Scene
        gltf.scenes; // Array<THREE.Scene>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

        //Loading in and positioning model
        var object = gltf.scene;
        object.scale.set(15,15,15);
        object.position.set (100,100, -600);
        object.rotation.y = 1.5;

        //Playing Animation
        mixer = new THREE.AnimationMixer(gltf.scene);
        console.log(gltf.animations)
        mixer.clipAction( gltf.animations[0] ).play();

        //Adding texture/colour to model (causes animation to stop playing)

        materialObj = new THREE.MeshBasicMaterial( { color: "grey", skinning: true} );
        object.traverse(function(child){
          if (child instanceof THREE.Mesh){
            child.material = materialObj;
          }
        });


        console.log(object);
        scene.add( object )
      });

      var mtlLoader = new THREE.MTLLoader()
  mtlLoader.load('../models/summer.mtl', function (material) {
    var objLoader = new THREE.OBJLoader()
    objLoader.setMaterials(material)
    objLoader.load('../models/summer.obj', function (summer) {
      summer.position.set (-800,-150,0);
      summer.scale.set(20,20,20);
      scene.add(summer)
      });
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
