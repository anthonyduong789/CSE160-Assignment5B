import * as THREE from "three";

class UFO {
  constructor(scene) {
    this.scene = scene;
    this.ufo = new THREE.Group();
    this.createUFO();
    scene.add(this.ufo);
  }

  createUFO() {
    // Main body (dome)
    const domeGeometry = new THREE.SphereGeometry(2, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const dome = new THREE.Mesh(domeGeometry, domeMaterial);
    dome.position.y = 1;

    // Bottom part
    const bottomGeometry = new THREE.CylinderGeometry(2.5, 2.5, 1, 32);
    const bottomMaterial = new THREE.MeshBasicMaterial({ color: 0x606060 });
    const bottom = new THREE.Mesh(bottomGeometry, bottomMaterial);
    bottom.position.y = -0.5;

    // Central antenna
    const antennaGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
    const antennaMaterial = new THREE.MeshBasicMaterial({ color: 0x303030 });
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna.position.y = 3;

    // Antenna tip
    const antennaTipGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const antennaTipMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const antennaTip = new THREE.Mesh(antennaTipGeometry, antennaTipMaterial);
    antennaTip.position.y = 4;

    // Lights
    const lightGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    // Create lights around the bottom edge
    for (let i = 0; i < 16; i++) {
      const light = new THREE.Mesh(lightGeometry, lightMaterial);
      const angle = (i / 16) * Math.PI * 2;
      light.position.set(Math.cos(angle) * 2.5, -0.5, Math.sin(angle) * 2.5);
      this.ufo.add(light);
    }

    // Additional decorations
    const decorationGeometry = new THREE.ConeGeometry(0.2, 0.5, 16);
    const decorationMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
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

  // Optional: Add animation for the UFO
  animate() {
    this.ufo.rotation.y += 0.01;
  }
}

// Usage Example
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
//
// const ufo = new UFO(scene);
//
// camera.position.z = 10;
//
// // Render loop
// function animate() {
//   requestAnimationFrame(animate);
//   ufo.animate(); // Animate the UFO (optional)
//   renderer.render(scene, camera);
// }
// animate();
//
