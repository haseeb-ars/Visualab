"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle System
    const particlesCount = 300;
    const positions = new Float32Array(particlesCount * 3);
    const initialPositions = new Float32Array(particlesCount * 3);
    const speeds = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // x
      positions[i] = (Math.random() - 0.5) * 80;
      initialPositions[i] = positions[i];
      // y
      positions[i + 1] = (Math.random() - 0.5) * 80;
      initialPositions[i + 1] = positions[i + 1];
      // z
      positions[i + 2] = (Math.random() - 0.5) * 60;
      initialPositions[i + 2] = positions[i + 2];
      
      speeds[i / 3] = 0.05 + Math.random() * 0.1;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    // Dynamic material for particle nodes
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x0066ff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Floating Geometries (Torus & Icosahedrons)
    const shapes: THREE.Mesh[] = [];
    const shapeCount = 4;
    const geometries = [
      new THREE.TorusGeometry(3, 0.8, 8, 24),
      new THREE.IcosahedronGeometry(2, 1),
      new THREE.TetrahedronGeometry(2.5, 0),
      new THREE.TorusGeometry(2, 0.5, 6, 16)
    ];

    const material = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });

    for (let i = 0; i < shapeCount; i++) {
      const mesh = new THREE.Mesh(geometries[i % geometries.length], material.clone());
      mesh.position.x = (Math.random() - 0.5) * 40;
      mesh.position.y = (Math.random() - 0.5) * 30;
      mesh.position.z = -10 - Math.random() * 20;
      
      // Customize materials slightly for a premium variance
      if (i % 2 === 0) {
        (mesh.material as THREE.MeshBasicMaterial).color.setHex(0x0066ff);
        (mesh.material as THREE.MeshBasicMaterial).opacity = 0.1;
      }
      
      scene.add(mesh);
      shapes.push(mesh);
    }

    // Lights (ambient & spot)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x0066ff, 2, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Handle mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 100;
      mouseY = (event.clientY - window.innerHeight / 2) / 100;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Intersection Observer to pause rendering when out of viewport
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Animation loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const tick = () => {
      animationFrameId = requestAnimationFrame(tick);
      
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate whole particle system slowly based on mouse position
      particles.rotation.y = elapsedTime * 0.02 + targetX * 0.05;
      particles.rotation.x = -targetY * 0.05;

      // Move particle positions slightly
      const positionsArray = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        // Wave motion on y
        positionsArray[i3 + 1] = initialPositions[i3 + 1] + Math.sin(elapsedTime * speeds[i] + initialPositions[i3]) * 2;
        // Float drift on x
        positionsArray[i3] = initialPositions[i3] + Math.cos(elapsedTime * speeds[i] * 0.5) * 1.5;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Rotate & animate floating geometric shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.003 * (index % 2 === 0 ? 1 : -1);
        shape.rotation.y += 0.004 * (index % 3 === 0 ? 1 : -1);
        shape.rotation.z += 0.002;
        
        // Float up and down
        shape.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.01;
      });

      // Render
      renderer.render(scene, camera);
    };

    tick();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      
      // Dispose materials & geometries
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      geometries.forEach(geo => geo.dispose());
      material.dispose();
      shapes.forEach(shape => {
        (shape.material as THREE.Material).dispose();
        shape.geometry.dispose();
      });
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-transparent"
      style={{ pointerEvents: "none" }}
    />
  );
}
