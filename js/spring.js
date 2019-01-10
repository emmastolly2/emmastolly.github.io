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

    renderer.setClearColor('#BFF5FF', 1.0);

    effect = new THREE.StereoEffect(renderer);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.01, 1000);
    // camera.position.set(-500, 400, -200);
    camera.position.set(-100, 50, -350);
    scene.add(camera);

    var dirlight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    dirlight.position.set(-300, 2000, -100);
    scene.add( dirlight );

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


    var light = new THREE.AmbientLight( 0xffffff, 0.5 );
    light.position.set(-300, 200, -100);
    scene.add( light );

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

    // var geometry = new THREE.PlaneGeometry(1000, 1000);
    // var mesh = new THREE.Mesh(geometry, material);
    // mesh.rotation.x = -Math.PI / 2;
    // scene.add(mesh);

    window.addEventListener('resize', resize, false);
    setTimeout(resize, 1);

//Random tree generator
      for (var i = 0; i < 30; i++) {
            var mtlLoader = new THREE.MTLLoader()
        mtlLoader.load('../models/tree3.mtl', function (material) {
          var objLoader = new THREE.OBJLoader()
          objLoader.setMaterials(material)
          objLoader.load('../models/tree3.obj', function (tree) {
            tree.position.set(Math.random() *-1000- -500, 20,Math.random()  *-1000- -500 );
            // tree.position.multiplyScalar(90 + (Math.random() * -200));
            // tree.rotation.set(Math.random() * 2, Math.random() * 200, Math.random() * 200);
            tree.scale.set(20,20,20);
            scene.add(tree)
            });
          });
        }

        for (var i = 0; i < 30; i++) {
              var mtlLoader = new THREE.MTLLoader()
          mtlLoader.load('../models/cloud1.mtl', function (material) {
            var objLoader = new THREE.OBJLoader()
            objLoader.setMaterials(material)
            objLoader.load('../models/cloud1.obj', function (cloud1) {
              cloud1.position.set(Math.random() *-1000- -500, 300,Math.random()  *-1000- -500 );
              cloud1.scale.set(20,20,20);
              scene.add(cloud1)
              });
            });
          }

          for (var i = 0; i < 10; i++) {
                var mtlLoader = new THREE.MTLLoader()
            mtlLoader.load('../models/cloud2.mtl', function (material) {
              var objLoader = new THREE.OBJLoader()
              objLoader.setMaterials(material)
              objLoader.load('../models/cloud2.obj', function (cloud2) {
                cloud2.position.set(Math.random() *-1000- -500,300,Math.random()  *-1000- -500 );
                cloud2.scale.set(20,20,20);
                scene.add(cloud2)
                });
              });
            }

            for (var i = 0; i < 30; i++) {
              var mtlLoader = new THREE.MTLLoader()
          mtlLoader.load('../models/pinkflower.mtl', function (material) {
            var objLoader = new THREE.OBJLoader()
            objLoader.setMaterials(material)
            objLoader.load('../models/pinkflower.obj', function (pinkflower) {
              pinkflower.position.set(Math.random() *-1000- -500, 20,Math.random()  *-1000- -500 );
              pinkflower.scale.set(20,20,20);
              scene.add(pinkflower)
              });
            });
          }

          for (var i = 0; i < 30; i++) {
                var mtlLoader = new THREE.MTLLoader()
            mtlLoader.load('../models/redflower.mtl', function (material) {
              var objLoader = new THREE.OBJLoader()
              objLoader.setMaterials(material)
              objLoader.load('../models/redflower.obj', function (redflower) {
                redflower.position.set(Math.random() *-1000- -500, 20,Math.random()  *-1000- -500 );
                redflower.scale.set(20,20,20);
                scene.add(redflower)
                });
              });
            }

            for (var i = 0; i < 30; i++) {
                  var mtlLoader = new THREE.MTLLoader()
              mtlLoader.load('../models/orangeflower.mtl', function (material) {
                var objLoader = new THREE.OBJLoader()
                objLoader.setMaterials(material)
                objLoader.load('../models/orangeflower.obj', function (orangeflower) {
                  orangeflower.position.set(Math.random() *-1000- -500, 20,Math.random()  *-1000- -500 );
                  orangeflower.scale.set(20,20,20);
                  scene.add(orangeflower)
                  });
                });
              }

              for (var i = 0; i < 30; i++) {
                    var mtlLoader = new THREE.MTLLoader()
                mtlLoader.load('../models/blueflower.mtl', function (material) {
                  var objLoader = new THREE.OBJLoader()
                  objLoader.setMaterials(material)
                  objLoader.load('../models/blueflower.obj', function (blueflower) {
                    blueflower.position.set(Math.random() *-1000- -500, 20,Math.random()  *-1000- -500 );
                    blueflower.scale.set(20,20,20);
                    scene.add(blueflower)
                    });
                  });
                }

}

  function geometry(){

    // floor
      var mtlLoader = new THREE.MTLLoader()
    mtlLoader.load('../models/springfloor.mtl', function (material) {
    var objLoader = new THREE.OBJLoader()
    objLoader.setMaterials(material)
    objLoader.load('../models/springfloor.obj', function (floor) {
      floor.position.set ( -100, 1,-200);
      floor.scale.set(100,15,100);
      floor.rotation.y = 0.85;
      scene.add(floor)
      });
    });


  var mtlLoader = new THREE.MTLLoader()
mtlLoader.load('../models/tree2.mtl', function (material) {
var objLoader = new THREE.OBJLoader()
objLoader.setMaterials(material)
objLoader.load('../models/tree2.obj', function (tree2) {
  tree2.position.set (100,10, -500);
  tree2.scale.set(30,30,30);
  tree2.rotation.y = 0.85;
  scene.add(tree2)
  });
});

    // Instantiate a loader
    var loader = new THREE.GLTFLoader();
    // loader.setDRACOLoader( new THREE.DRACOLoader() );
    // Load a glTF resource
    loader.load(
      // resource URL
      '../models/treetest.gltf',
      // called when the resource is loaded
      function ( gltf ) {
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Scene
        gltf.scenes; // Array<THREE.Scene>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
        //Loading in and positioning model
        var object = gltf.scene;
        object.scale.set(15,15,30);
        object.position.set (100,50, -300);
        //Playing Animation
        mixer = new THREE.AnimationMixer(gltf.scene);
        console.log(gltf.animations)
        mixer.clipAction( gltf.animations[0] ).play();
        mixer.clipAction( gltf.animations[1] ).play();
        mixer.clipAction( gltf.animations[2] ).play();
        console.log(object);
        scene.add( object )
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

      // particle.position.y += -0.3;

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
