"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ContactCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 10;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Mesh Grid Sphere (Futuristic global grid)
    const sphereGeo = new THREE.SphereGeometry(2.5, 24, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphereMesh);

    // Orbiting particles (connecting wires)
    const lineCount = 30;
    const linesGroup = new THREE.Group();
    scene.add(linesGroup);

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.3,
    });

    for (let i = 0; i < lineCount; i++) {
      const points = [];
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const r = 2.5;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      points.push(new THREE.Vector3(0, 0, 0));
      points.push(new THREE.Vector3(x, y, z));

      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, lineMat);
      linesGroup.add(line);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x0066ff, 5, 20);
    pointLight.position.set(0, 4, 4);
    scene.add(pointLight);

    // Mouse coordinates
    let mouse = new THREE.Vector2();
    let target = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Look at mouse
      target.x += (mouse.x - target.x) * 0.05;
      target.y += (mouse.y - target.y) * 0.05;

      sphereMesh.rotation.y = elapsedTime * 0.1 + target.x * 0.3;
      sphereMesh.rotation.x = elapsedTime * 0.05 - target.y * 0.2;
      
      linesGroup.rotation.y = -elapsedTime * 0.15 - target.x * 0.2;

      // Pulse opacity
      sphereMat.opacity = 0.1 + Math.sin(elapsedTime * 2) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      
      sphereGeo.dispose();
      sphereMat.dispose();
      lineMat.dispose();
      linesGroup.children.forEach(child => {
        if (child instanceof THREE.Line) {
          child.geometry.dispose();
        }
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
      className="h-[350px] md:h-[450px] w-full relative"
    />
  );
}
