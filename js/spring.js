window.onload = function(event) {

  //Setting up
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
    //Getting HTML container
    element = renderer.domElement;
    container = document.getElementById('container');
    container.appendChild(element);

    //Scene background colour
    renderer.setClearColor('#BFF5FF', 1.0);

    //Enabling StereoEffect library, which is the library used to split the screen into 2 to make it VR compatiable
    effect = new THREE.StereoEffect(renderer);

    //Setting up scene
    scene = new THREE.Scene();

    //Setting up camera (where user will be positioned in scene)
    camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.01, 1000);
    // camera.position.set(-500, 400, -200);
    camera.position.set(-100, 50, -350);
    scene.add(camera);

    //Lighting
    //Adding lighting to the whole scene
    var ambientlight = new THREE.AmbientLight( 0xffffff, 0.2 );
    ambientlight.position.set(-300, 200, -100);
    scene.add( ambientlight );
    //Adding a light to represent the sun
    var dirlight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    dirlight.position.set(-300, 2000, -100);
    scene.add( dirlight );

    //Setting up mouse controls for scene
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

      //Setting up device movement control
      controls = new THREE.DeviceOrientationControls(camera, true);
      controls.connect();
      controls.update();

      element.addEventListener('click', fullscreen, false);

      window.removeEventListener('deviceorientation', setOrientationControls, true);
    }
    window.addEventListener('deviceorientation', setOrientationControls, true);

    window.addEventListener('resize', resize, false);
    setTimeout(resize, 1);

    //Particles to create rain effect
    particle = new THREE.Object3D();
    scene.add(particle);
    var geometry = new THREE.ConeGeometry(2, 0);
    var material = new THREE.MeshBasicMaterial({
      color: 'blue',
    });
    //Randomizes rain position
    for (var i = 0; i < 8000; i++) {
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      mesh.position.multiplyScalar(90 + (Math.random() * 9000));
      particle.add(mesh);
    }

    //Random tree generators
    for (var i = 0; i < 30; i++) {
      //Initiates mtl loader
      var mtlLoader = new THREE.MTLLoader()
      mtlLoader.load('../models/tree3.mtl', function (material) {
        //Initiates obj loader
        var objLoader = new THREE.OBJLoader()
        //adds mtl to obj
        objLoader.setMaterials(material)
        //loads in obj
        objLoader.load('../models/tree3.obj', function (tree) {
          //Randomises position of tree
          tree.position.set(Math.random() *-1000- -200, 0,Math.random()  *-1000- -100 );
          //Scales model
          tree.scale.set(20,20,20);
          //Adds model to scene
          scene.add(tree)
        });
      });
    }

    for (var i = 0; i < 20; i++) {
      var mtlLoader = new THREE.MTLLoader()
      mtlLoader.load('../models/cloud1.mtl', function (material) {
        var objLoader = new THREE.OBJLoader()
        objLoader.setMaterials(material)
        objLoader.load('../models/cloud1.obj', function (cloud1) {
          cloud1.position.set(Math.random() *-1000- -100, 500,Math.random()  *-1000- -100 );
          cloud1.scale.set(20,20,20);
          scene.add(cloud1)
        });
      });
    }

    for (var i = 0; i < 10; i++) {
      var mtlLoader = new THREE.MTLLoader()
      mtlLoader.load('../models/pinkflower.mtl', function (material) {
        var objLoader = new THREE.OBJLoader()
        objLoader.setMaterials(material)
        objLoader.load('../models/pinkflower.obj', function (pinkflower) {
          pinkflower.position.set(Math.random() *-1000- -100, 20,Math.random()  *-1000- -100 );
          pinkflower.scale.set(20,20,20);
          scene.add(pinkflower)
        });
      });
    }

    for (var i = 0; i < 10; i++) {
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

    for (var i = 0; i < 10; i++) {
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

    // Instantiate GLTF loader
    var loader = new THREE.GLTFLoader();
    // Load glTF file
    loader.load('../models/butterfly.gltf', function ( gltf ) {
      //Finding info
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Scene
        gltf.scenes; // Array<THREE.Scene>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
        //Loading in and positioning model
        var object = gltf.scene;
        object.scale.set(15,15,30);
        object.position.set(100,10, -500 );
        //Playing Animation
        mixer = new THREE.AnimationMixer(gltf.scene);
        //See animation names in console log
        // console.log(gltf.animations)
        //Finds animations by number and plays animation
        mixer.clipAction( gltf.animations[0] ).play();
        //Adds animated gltf to scene
        scene.add( object )
      });

    //Initiates mtl loader
    var mtlLoader = new THREE.MTLLoader()
    //Loads mtl file
    mtlLoader.load('../models/pointymountains.mtl', function (material) {
      //Initiates obj loader
      var objLoader = new THREE.OBJLoader()
      //Adds mtl file to obj
      objLoader.setMaterials(material)
      //Loads obj file
      objLoader.load('../models/pointymountains.obj', function (mountain) {
        //Positioning and scaling of obj
        mountain.position.set ( -100, 300 , 600);
        mountain.scale.set(100,100,500);
        mountain.rotation.y = 0.85;
        scene.add(mountain)
      });
    });

    var mtlLoader = new THREE.MTLLoader()
    mtlLoader.load('../models/pointymountains.mtl', function (material) {
      var objLoader = new THREE.OBJLoader()
      objLoader.setMaterials(material)
      objLoader.load('../models/pointymountains.obj', function (mountain) {
        mountain.position.set ( -100, 300 , -1500);
        mountain.scale.set(100,100,1500);
        mountain.rotation.y = -1;
        scene.add(mountain)
      });
    });

    var mtlLoader = new THREE.MTLLoader()
    mtlLoader.load('../models/pointymountains.mtl', function (material) {
      var objLoader = new THREE.OBJLoader()
      objLoader.setMaterials(material)
      objLoader.load('../models/pointymountains.obj', function (mountain) {
        mountain.position.set ( 1500, 300 , 300);
        mountain.scale.set(100,100,500);
        // mountain.rotation.y = -2;
        scene.add(mountain)
      });
    });

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

    //Adds lighter tree model for animation to go over
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
    }

    function resize() {
      //Defines size of scene
      var width = container.offsetWidth;
      var height = 1000;

      //Stops scene from being stretched and distorted when resizing window
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      //Setting size of scene
      renderer.setSize(width, height);
      effect.setSize(width, height);
    }

    function update(dt) {
      //Checking for screen resize
      resize();
      //Switches from mouse control to device control upon movement
      controls.update(dt);
    }

    function render(dt) {
      //renders scene
      effect.render(scene, camera);
    }

    function animate(t) {
      requestAnimationFrame(animate);

      //Makes rain fall from sky
      particle.position.y += -0.8;

      //Loops animation
      var delta = clock.getDelta();
      if (mixer != null && mixer !== undefined) {
        mixer.update(delta);
      };

      update(clock.getDelta());
      render(clock.getDelta());
    }

    //Resizing in different browsers
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
