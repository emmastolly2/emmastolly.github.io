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
    camera.position.set(-500, 50, -90);
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


    var ambientlight = new THREE.AmbientLight( 0xffffff, 0.7 );
    ambientlight.position.set(-300, 200, -100);
    scene.add( ambientlight );

    var dirlight = new THREE.DirectionalLight( 0xffffff, 0.1 );
    dirlight.position.set(-700, 200, -500);
    scene.add( dirlight );

    window.addEventListener('resize', resize, false);
    setTimeout(resize, 1);


//Random tree generator
      for (var i = 0; i < 10; i++) {
            var mtlLoader = new THREE.MTLLoader()
        mtlLoader.load('../models/orangetree.mtl', function (material) {
          var objLoader = new THREE.OBJLoader()
          objLoader.setMaterials(material)
          objLoader.load('../models/orangetree.obj', function (otree) {
            otree.position.set(Math.random() *-1000- -200, 0,Math.random()  *-1000- -100 );
            otree.scale.set(30,30,30);
            scene.add(otree)
            });
          });
        }

        for (var i = 0; i < 10; i++) {
              var mtlLoader = new THREE.MTLLoader()
          mtlLoader.load('../models/yellowtree.mtl', function (material) {
            var objLoader = new THREE.OBJLoader()
            objLoader.setMaterials(material)
            objLoader.load('../models/yellowtree.obj', function (ytree) {
              ytree.position.set(Math.random() *-1000- -200, 0,Math.random()  *-1000- -100 );
              ytree.scale.set(30,30,30);
              scene.add(ytree)
              });
            });
          }

          for (var i = 0; i < 10; i++) {
                var mtlLoader = new THREE.MTLLoader()
            mtlLoader.load('../models/redtree.mtl', function (material) {
              var objLoader = new THREE.OBJLoader()
              objLoader.setMaterials(material)
              objLoader.load('../models/redtree.obj', function (rtree) {
                rtree.position.set(Math.random() *-1000- -200, 0,Math.random()  *-1000- -100 );
                rtree.scale.set(30,30,30);
                scene.add(rtree)
                });
              });
            }

            for (var i = 0; i < 50; i++) {
              var mtlLoader = new THREE.MTLLoader()
          mtlLoader.load('../models/mushroom.mtl', function (material) {
            var objLoader = new THREE.OBJLoader()
            objLoader.setMaterials(material)
            objLoader.load('../models/mushroom.obj', function (shroom) {
              shroom.position.set(Math.random() *-1000- -100, 5,Math.random()  *-1000- -100 );
              shroom.scale.set(1,1,1);
              scene.add(shroom)
              });
            });
          }

}

  function geometry(){

    // Instantiate a loader
    var loader = new THREE.GLTFLoader();
    // Load a glTF resource
    loader.load(
      // resource URL
      '../models/deer.gltf',
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
        object.position.set (-400,10, 200);
        object.rotation.y = 1.5;

        //Playing Animation
        mixer = new THREE.AnimationMixer(gltf.scene);
        console.log(gltf.animations)
        mixer.clipAction( gltf.animations[0] ).play();

        materialObj = new THREE.MeshBasicMaterial( { color: "#C26A41", skinning: true} );
        object.traverse(function(child){
          if (child instanceof THREE.Mesh){
            child.material = materialObj;
          }
        });


        console.log(object);
        scene.add( object )
      });


    var mtlLoader = new THREE.MTLLoader()
mtlLoader.load('../models/autumn.mtl', function (material) {
  var objLoader = new THREE.OBJLoader()
  objLoader.setMaterials(material)
  objLoader.load('../models/autumn.obj', function (autumn) {
    autumn.position.set (0,0,-300);
    autumn.scale.set(40,50,40);
    scene.add(autumn)
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
