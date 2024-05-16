import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";



	function makeXYZGUI( gui, vector3, name, onChangeFn ) {

		const folder = gui.addFolder( name );
		folder.add( vector3, 'x', - 10, 10 ).onChange( onChangeFn );
		folder.add( vector3, 'y', 0, 10 ).onChange( onChangeFn );
		folder.add( vector3, 'z', - 10, 10 ).onChange( onChangeFn );
		// folder.open();

	}




class DegRadHelper {

		constructor( obj, prop ) {

			this.obj = obj;
			this.prop = prop;

		}
		get value() {

			return THREE.MathUtils.radToDeg( this.obj[ this.prop ] );

		}
		set value( v ) {

			this.obj[ this.prop ] = THREE.MathUtils.degToRad( v );

		}

	}

class Farmer{
  constructor(scene,scale,x = 0, y = 0, z = 0){
    this.scene = scene;
    this.object = null;
    this.pivot = new THREE.Group();
    this.pivot.position.set(x, y, z);
    this.loader = new OBJLoader;
    scene.add(this.pivot);
    this.loader.load(
      './Farmer/17864_Farmer_v1.obj',
      (object) => {
        object.scale.set(scale, scale, scale);
        // position relative to the pivot
        //         object.rotation.x = THREE.MathUtils.degToRad(-90);
        // object.position.set(0, 0, 0);
        // object.position.set(5, 0, 0); // This sets the object 5 units away from the pivot along the x-axis

        this.object = object;
        this.pivot.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('An error happened', error);
      }
    );

  }
  animate(){
    this.pivot.rotation.y-=0.05;
    // this.pivot.rotation.z+=0.0011;
// this.pivot.rotation.x+=.01;
    // this.object.rotation.x += time*0.2
    // this.object.rotation.y += time*0.2
    // if (this.pivot) {
    //   time *= 0.001; // convert time to seconds
    //   const speed = 1 + 0 * 0.1;
    //   const rot = time * speed;
    //    this.pivot.rotation.x = rot;
    //    // this.pivot.rotation.y = rot;
    // }
   // if (this.object) {
   //    time *= 0.001; // convert time to seconds
   //    const speed = 1 + 2 * 0.1;
   //    const rot = time * speed;
   //    this.object.rotation.x = rot;
   //    this.object.rotation.y = rot;
   //  }


  }

}


class UFO {
  constructor(scene, x = 0, y = 0, z = 0) {
    this.scene = scene;
    this.ufo = new THREE.Group();
    this.createUFO();
    this.setPosition(x, y, z);
    scene.add(this.ufo);
  }

  createUFO() {
    // Main body (dome)
    const domeGeometry = new THREE.SphereGeometry(2, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const dome = new THREE.Mesh(domeGeometry, domeMaterial);

    dome.position.y = 0;

    // Bottom part
    const bottomGeometry = new THREE.CylinderGeometry(2, 5, 1, 32);
    const bottomMaterial = new THREE.MeshPhongMaterial({ color: 0x606060 });
    const bottom = new THREE.Mesh(bottomGeometry, bottomMaterial);
    bottom.position.y = 0;

    // Central antenna
    const antennaGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
    const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0x303030 });
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna.position.y = 3;

    // Antenna tip
    const antennaTipGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const antennaTipMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const antennaTip = new THREE.Mesh(antennaTipGeometry, antennaTipMaterial);
    antennaTip.position.y = 4;

    // Lights
    const lightGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const lightMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });

    // Create lights around the bottom edge
    for (let i = 0; i < 16; i++) {
      const light = new THREE.Mesh(lightGeometry, lightMaterial);
      const angle = (i / 16) * Math.PI * 2;
      light.position.set(Math.cos(angle) * 2.5, -0.5, Math.sin(angle) * 2.5);
      this.ufo.add(light);
    }

    // Additional decorations
    const decorationGeometry = new THREE.ConeGeometry(0.2, 0.5, 16);
    const decorationMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    for (let i = 0; i < 4; i++) {
      const decoration = new THREE.Mesh(decorationGeometry, decorationMaterial);
      const angle = (i / 4) * Math.PI * 2;
      decoration.position.set(Math.cos(angle) * 2, 1, Math.sin(angle) * 2);
      decoration.rotation.x = Math.PI / 2;
      this.ufo.add(decoration);
    }

    // Assemble UFO
    this.ufo.add(dome);
    this.ufo.add(bottom);
    this.ufo.add(antenna);
    this.ufo.add(antennaTip);
  }

  // Set the position of the UFO
  setPosition(x, y, z) {
    this.ufo.position.set(x, y, z);
  }

  // Optional: Add animation for the UFO
  animate() {
    this.ufo.rotation.y += 0.01;
  }
}

class House {
        constructor(scene) {
            this.group = new THREE.Group();
            this.createHouse();
            scene.add(this.group)
        }

        createHouse() {
            const material = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
            const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8B0000 });

            // Base of the house
            const baseGeometry = new THREE.BoxGeometry(1, 1, 1);
            const base = new THREE.Mesh(baseGeometry, material);
            this.group.add(base);

            // Roof of the house
            const roofGeometry = new THREE.ConeGeometry(0.75, .6, 4);
            const roof = new THREE.Mesh(roofGeometry, roofMaterial);
            roof.position.y = .8;
            roof.rotation.y = Math.PI / 4;
            this.group.add(roof);

            // Door
            const doorGeometry = new THREE.BoxGeometry(0.3, 0.6, 0.1);
            const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
            const door = new THREE.Mesh(doorGeometry, doorMaterial);
            door.position.set(0, -0.2, 0.-.51);
            this.group.add(door);
        }

        setPosition(x, y, z) {
            this.group.position.set(x, y, z);
        }

        setScale(scale) {
            this.group.scale.set(scale, scale, scale);
        }
  setRotation(deg){


    
         this.group.rotation.y = THREE.MathUtils.degToRad(deg);

  }

    }



// Create cylindrical light source at a specific position







function main() {
  const canvas = document.querySelector("#c");
  // const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas,
    alpha: true,
  });
  const fov = 20;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 200;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(90, 20, -19);

  const scene = new THREE.Scene();

  // scene.background = new THREE.Color("black");



 //   NOTE: If we want the background to be able to be affected by post 
  //   processing  effects then we need to draw the background using THREE.js.
 // const loader = new THREE.TextureLoader();
 // const bgTexture = loader.load('./sky1.jpg');
 // bgTexture.colorSpace = THREE.SRGBColorSpace;
 // scene.background = bgTexture;

{
    // NOTE: method 1 for using a cubemap loading 6 images
  // const loader = new THREE.CubeTextureLoader();
  // const texture = loader.load([
  //   './pos-x.jpg',
  //   './nightSky.jpg',
  //   './pos-y.jpg',
  //   './neg-y.jpg',
  //   './pos-z.jpg',
  //   './neg-z.jpg',
  // ]);
  // scene.background = texture;
    // NOTE: method 2 uses a 360 degree image
    const loader = new THREE.TextureLoader();
  const texture = loader.load(
      '360SkyBox.jpg',
    () => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
          // Set filtering options
      scene.background = texture;

    });
}



const UFO_object=new UFO(scene, 8, 10, 0);
const House_object = new House(scene);
House_object.setPosition(4,3,9);
House_object.setScale(6);
  House_object.setRotation(-60);

const House_object1 = new House(scene);
House_object1.setPosition(2,3,0);
House_object1.setScale(6);
  House_object1.setRotation(-90);


  function updateCamera() {
    camera.updateProjectionMatrix();
  }
  // responsible for the Controls
    // NOTE: gui control
  // NOTE: DirectionalLightColor
    const DirectionalLightColor = 0xe8d7d7;
    const dirIntensity = .82;
    const DirectionalLightObject = new THREE.DirectionalLight(DirectionalLightColor, dirIntensity);
    DirectionalLightObject.position.set(13,15,15);
    DirectionalLightObject.target.position.set(-5, 0, 0);
    scene.add(DirectionalLightObject);
    scene.add(DirectionalLightObject.target);




    // NOTE: Ambient Light
   const AmbientColor = 0xb32929;
   const AmbIntensity = 0.25;
   const AmbientLightObject = new THREE.AmbientLight(AmbientColor, AmbIntensity);
   scene.add(AmbientLightObject);
    const gui = new dat.GUI();
  gui.close();
  // PointLight

  const SpotLightColor = 0xFFFFFF;
  const spotIntensity = 200;
  const SpotLightObject = new THREE.SpotLight(SpotLightColor, spotIntensity);
  scene.add(SpotLightObject);


  // NOTE: Default SpotLightObject
  SpotLightObject.position.set(8,10,0);
  SpotLightObject.target.position.set(8,0,0);
  SpotLightObject.angle=THREE.MathUtils.degToRad(26);
  SpotLightObject.penumbra=0;
  SpotLightObject.distance=23;
  




  // NOTE: commented out the helpers
const spotLightHelper = new THREE.SpotLightHelper(SpotLightObject);
// scene.add(spotLightHelper);
const directionalLightHelper = new THREE.DirectionalLightHelper(DirectionalLightObject);
    // scene.add(directionalLightHelper);
  function updateLight() {
			SpotLightObject.target.updateMatrixWorld();
			spotLightHelper.update();
      DirectionalLightObject.target.updateMatrixWorld();
    directionalLightHelper.update();

		}

		updateLight();
  const SpotLightFolder = gui.addFolder('SpotLight Folder');
  SpotLightFolder.add(SpotLightObject.position, "x", -10,10).name("Position X").onChange(updateLight);
  SpotLightFolder.add(SpotLightObject.position, "y", 0,10).name("Position Y").onChange(updateLight);
  SpotLightFolder.add(SpotLightObject.position, "z", -10,10).name("Position Z").onChange(updateLight);

  SpotLightFolder.add(SpotLightObject.target.position, "x", -10,10).name("Target position X").onChange(updateLight);
  SpotLightFolder.add(SpotLightObject.target.position, "y", 0,10).name("Target position Y").onChange(updateLight);
  SpotLightFolder.add(SpotLightObject.target.position, "z", -10,10).name("Target position Z").onChange(updateLight);
		SpotLightFolder.add( SpotLightObject, 'intensity', 0, 250, 1 );
		SpotLightFolder.add( SpotLightObject, 'distance', 0, 40 ).onChange( updateLight );
		SpotLightFolder.add( new DegRadHelper( SpotLightObject, 'angle' ), 'value', 0, 90 ).name( 'angle' ).onChange( updateLight );
		SpotLightFolder.add( SpotLightObject, 'penumbra', 0, 1, 0.01 );




// Assuming gui is already created and DirectionalLightObject is your directional light
const directionalLightFolder = gui.addFolder('Directional Light');

// Add color control
directionalLightFolder.addColor(new ColorGUIHelper(DirectionalLightObject, "color"), "value").name("Directional Light Color");

// Add intensity control
directionalLightFolder.add(DirectionalLightObject, "intensity", 0, 10, 0.01).name("Intensity");

// Add target position controls
directionalLightFolder.add(DirectionalLightObject.position, "x", -40, 40, 0.1).name("Position X").onChange(updateLight);
directionalLightFolder.add(DirectionalLightObject.position, "z", -40, 40, 0.1).name("Position Z").onChange(updateLight);
directionalLightFolder.add(DirectionalLightObject.position, "y", 0, 30, 0.5).name("Position Y").onChange(updateLight);

directionalLightFolder.add(DirectionalLightObject.target.position, "x", -10, 10, 0.1).name("Target X").onChange(updateLight);
directionalLightFolder.add(DirectionalLightObject.target.position, "z", -10, 10, 0.1).name("Target Z").onChange(updateLight);
directionalLightFolder.add(DirectionalLightObject.target.position, "y", 0, 10, 0.1).name("Target Y").onChange(updateLight);

// directionalLightFolder.open(); // Optional: Automatically open the folder

const ambientLightFolder = gui.addFolder('Ambient Light');

// Light color control
const lightColor = { color: AmbientLightObject.color.getHex() }; // Initial color value
ambientLightFolder.addColor(lightColor, 'color').onChange((value) => {
    AmbientLightObject.color.set(value);
});

// Light intensity control
ambientLightFolder.add(AmbientLightObject, 'intensity', 0, 2, 0.01); // Min: 0, Max: 2, Step: 0.01

// ambientLightFolder.open();




    gui.add(camera, "fov", 1, 180).onChange(updateCamera);
    const minMaxGUIHelper = new MinMaxGUIHelper(camera, "near", "far", 0.1);
    gui
      .add(minMaxGUIHelper, "min", 0.1, 50, 0.1)
      .name("near")
      .onChange(updateCamera);
    gui
      .add(minMaxGUIHelper, "max", 0.1, 400, 0.1)
      .name("far")
      .onChange(updateCamera);
  //
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

  {

    const planeSize = 40;
    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "./farmLandTexture.jpg",
    );
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    // texture.magFilter = THREE.NearestFilter;
    // texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    // const repeats = planeSize / 2;
    // texture.repeat.set(repeats, repeats);
const materials = [
    new THREE.MeshPhongMaterial({ color: 0xffffff }), // Right side (no texture)
    new THREE.MeshPhongMaterial({ color: 0xffffff }), // Left side (no texture)
    new THREE.MeshPhongMaterial({ color: 0xffffff }), // Top side (no texture)
    new THREE.MeshPhongMaterial({ color: 0xffffff }), // Bottom side (no texture)
    new THREE.MeshPhongMaterial({ map: texture }),    // Front side (with texture)
    new THREE.MeshPhongMaterial({ color: 0xffffff })  // Back side (no texture)
  ];

    const planeGeo = new THREE.BoxGeometry(planeSize, planeSize);
    const groundMesh = new THREE.Mesh(planeGeo, materials);
    groundMesh.rotation.x = Math.PI * -0.5;
    groundMesh.rotation.z = Math.PI * -0.5;
    groundMesh.position.set(6,0,0)
    scene.add(groundMesh);
  }


  function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.MathUtils.degToRad(camera.fov * 0.5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
    // compute a unit vector that points in the direction the camera is now
    // in the xz plane from the center of the box
    const direction = new THREE.Vector3()
      .subVectors(camera.position, boxCenter)
      .multiply(new THREE.Vector3(1, 0, 1))
      .normalize();

    // move the camera to a position distance units way from the center
    // in whatever direction the camera was from the center already
    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

    // pick some near and far values for the frustum that
    // will contain the box.
    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.updateProjectionMatrix();

    // point the camera to look at the center of the box
    camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  }

  
    const windmillLoader = new MTLLoader();
    windmillLoader.load("windmill.mtl", (mtl) => {
      mtl.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(mtl);
      objLoader.load("windmill.obj", (obj) => {
        const box = new THREE.Box3().setFromObject(obj);
      // NOTE: Frames the entire scene/camera

        const boxSize = box.getSize(new THREE.Vector3()).length();
        const boxCenter = box.getCenter(new THREE.Vector3());

        // // set the camera to frame the box
        // // NOTE: adjust first parameter to zoom in and out
        // frameArea(boxSize * 3, boxSize, boxCenter, camera);

      obj.position.set(5, 0, -8)
      obj.rotation.y =   THREE.MathUtils.degToRad(-20);
      scene.add(obj);

        // compute the box that contains all the stuff
        // from obj and below
        //
        // // update the Trackball controls to handle the new size
        // controls.maxDistance = boxSize * 10;
        // controls.target.copy(boxCenter);
        // controls.update();
      });
    });

   const FarmerObj = new Farmer(scene,0.2, 8, 2, 0)



  

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  // renderShapes
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const cube = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const pyramid = new THREE.ConeGeometry(1.25, 5, 8);
  function texturedCube(geometry, x, y, z) {
    const loader = new THREE.TextureLoader();
    const textures = [
      loader.load('hayBale.png'),
      loader.load('hayBale.png'),
      loader.load('hayBaleTopBot.png'),
      loader.load('hayBaleTopBot.png'),
      loader.load('hayBale.png'),
      loader.load('hayBale.png')
    ];;
    // textures.colorSpace = THREE.SRGBColorSpace;
    // const material = new THREE.MeshBasicMaterial({
    //   map: textures,
    // });
        const materials = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));

    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    return cube;
  }

  {
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(
      sphereRadius, sphereWidthDivisions,
      sphereHeightDivisions,
    );
    const sphereMat = new THREE.MeshPhongMaterial({ color: "#918483" });
    const moonMesh = new THREE.Mesh(sphereGeo, sphereMat);

    moonMesh.position.set(13, 15, 15)
    scene.add(moonMesh);
  }
  const otherShapes = [texturedCube(cube, 8, 2.4, 0),
    texturedCube(cube, 6, 2.9, 0),
    texturedCube(cube, 7, 2.2, 2),
    texturedCube(cube, 7, 2.5, -2)


  ];
  function renderOtherShapes(time) {
    time *= 0.001; // convert time to seconds

    otherShapes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(renderOtherShapes);
  }

  function render(time) {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    // Set the repeat and offset properties of the background texture
  // to keep the image's aspect correct.
  // Note the image may not have loaded yet.
    // used for loading in texture as background with teh Loader1
  // const canvasAspect = canvas.clientWidth / canvas.clientHeight;
  // const imageAspect = bgTexture.image ? bgTexture.image.width / bgTexture.image.height : 1;
  // const aspect = imageAspect / canvasAspect;
  //
  // bgTexture.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
  // bgTexture.repeat.x = aspect > 1 ? 1 / aspect : 1;
  //
  // bgTexture.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
  // bgTexture.repeat.y = aspect > 1 ? 1 : aspect;
  //   renderer.render(scene, camera);

    requestAnimationFrame(render);
      UFO_object.animate();
      FarmerObj.animate();

  }

  requestAnimationFrame(render);
  requestAnimationFrame(renderOtherShapes);
}

main();
