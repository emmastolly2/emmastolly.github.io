window.onload = function(event) {

    var camera, scene, renderer;
    var effect, controls;
    var element, container;
    // var renderer, scene, camera, composer, circle, skelet, particle;

    var clock = new THREE.Clock();


    init();
    animate();

    function init() {

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

        element.addEventListener('click', fullscreen, false);

        window.removeEventListener('deviceorientation', setOrientationControls, true);
      }
      window.addEventListener('deviceorientation', setOrientationControls, true);

      //Scene lights
      var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
      scene.add(light);

      var texture = THREE.ImageUtils.loadTexture(
        'texture/checker.png'
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

      cube = new THREE.Mesh( new THREE.CubeGeometry( 200, 200, 200 ), new THREE.MeshNormalMaterial() );
      cube.position.y = 300;
      cube.position.z = 20;
      cube.position.x = 0;

      //PARTICLES
      // particle = new THREE.Object3D();
      // scene.add(particle);
      // var geometry = new THREE.CylinderGeometry(2, 0);
      // var material = new THREE.MeshPhongMaterial({
      //   color: 0xffffff,
      //   shading: THREE.FlatShading
      // });
      //
      // for (var i = 0; i < 1000; i++) {
      //   var mesh = new THREE.Mesh(geometry, material);
      //   mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      //   mesh.position.multiplyScalar(90 + (Math.random() * 700));
      //   mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
      //   particle.add(mesh);
      // }

      // octoMain = new THREE.Object3D();
      // scene.add(octoMain);
      //
      //  var objLoader = new THREE.OBJLoader()
      //  objLoader.load(
      //       'colored.obj',
      //       function (object) {
      //         octoMain.add(object);
      //       });



      scene.add(cube);

      //resizes the page
      // window.addEventListener('resize', resize, false);
      // setTimeout(resize, 1);
    }

    //Checks if page needs to change size
    function resize() {
      var width = container.offsetWidth;
      var height = container.offsetHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      effect.setSize(width, height);
    }
    //resizes
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

      //PARTICLES
      // particle.rotation.x += 0.0000;
      // particle.rotation.y -= 0.0040;

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
