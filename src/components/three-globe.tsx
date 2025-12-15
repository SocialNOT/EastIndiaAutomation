"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { gsap } from "gsap";

export function ThreeGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!mountRef.current || !resolvedTheme) return;
    
    const globeColor = resolvedTheme === 'dark' ? 0xC9A227 : 0x0A1428;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2.5;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (error) {
      console.error("WebGL not supported, falling back.", error);
      return; 
    }
    
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: globeColor,
      wireframe: true,
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    gsap.fromTo(globe.scale, { x: 0.5, y: 0.5, z: 0.5 }, { x: 1, y: 1, z: 1, duration: 2, ease: "power3.out" });

    let mouseX = 0;
    let mouseY = 0;
    const targetRotation = { x: 0, y: 0 };

    function onMouseMove(event: MouseEvent) {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      targetRotation.y = mouseX * 0.3;
      targetRotation.x = mouseY * 0.3;
    }
    window.addEventListener('mousemove', onMouseMove);

    let frameId: number;
    function animate() {
      frameId = requestAnimationFrame(animate);
      globe.rotation.y += 0.0008; 
      globe.rotation.x += 0.0003; 

      // Smoothly interpolate rotation towards the target
      globe.rotation.y += (targetRotation.y - globe.rotation.y) * 0.05;
      globe.rotation.x += (targetRotation.x - globe.rotation.x) * 0.05;

      renderer.render(scene, camera);
    }
    animate();

    function onWindowResize() {
        if(mountRef.current) {
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        }
    }
    window.addEventListener('resize', onWindowResize, false);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (mountRef.current && renderer.domElement) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mountRef.current.removeChild(renderer.domElement);
      }
      cancelAnimationFrame(frameId);
    };
  }, [resolvedTheme]);

  return <div ref={mountRef} className="absolute inset-0 z-0 opacity-10 dark:opacity-20" />;
}
