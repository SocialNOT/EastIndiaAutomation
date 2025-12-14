"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let renderer: THREE.WebGLRenderer;
    try {
      // Scene
      const scene = new THREE.Scene();

      // Camera
      const camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 2.5;

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
      mountRef.current.appendChild(renderer.domElement);

      // Globe
      const geometry = new THREE.SphereGeometry(1.5, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0xc9a227, // Bronze/Gold color from theme
        wireframe: true,
      });
      const globe = new THREE.Mesh(geometry, material);
      scene.add(globe);
      
      // Mouse movement
      let mouseX = 0;
      let mouseY = 0;

      function onMouseMove(event: MouseEvent) {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      }
      window.addEventListener('mousemove', onMouseMove);

      // Animation
      function animate() {
        requestAnimationFrame(animate);

        // Subtle rotation based on mouse position
        globe.rotation.y += 0.0005 + mouseX * 0.001;
        globe.rotation.x += 0.0005 + mouseY * 0.001;

        renderer.render(scene, camera);
      }
      animate();

      // Handle resize
      function onWindowResize() {
          if(mountRef.current) {
              camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
              camera.updateProjectionMatrix();
              renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
          }
      }
      window.addEventListener('resize', onWindowResize, false);

      // Cleanup
      return () => {
        window.removeEventListener('resize', onWindowResize);
        window.removeEventListener('mousemove', onMouseMove);
        if (mountRef.current && renderer) {
          mountRef.current.removeChild(renderer.domElement);
        }
      };
    } catch (error) {
      console.error("Failed to initialize WebGL for ThreeGlobe:", error);
      // If renderer fails, do nothing. The component will just be an empty div.
      return;
    }
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 opacity-20" />;
}
