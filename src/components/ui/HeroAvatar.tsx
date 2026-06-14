"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useApp } from "@/context/AppContext";

export default function HeroAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openQuiz } = useApp();

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
    camera.position.z = 12;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold the head elements
    const headGroup = new THREE.Group();
    scene.add(headGroup);

    // Main Head Sphere (Metallic, semi-transparent)
    const headGeo = new THREE.SphereGeometry(2, 32, 32);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x090924,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    headGroup.add(headMesh);

    // Outer cyber-frame wireframe sphere
    const wireGeo = new THREE.SphereGeometry(2.1, 16, 16);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    headGroup.add(wireMesh);

    // Glowing Eyes (Cybernetic Sensors)
    const eyeGeo = new THREE.SphereGeometry(0.25, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      toneMapped: false,
    });
    
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.7, 0.5, 1.7);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat.clone());
    rightEye.position.set(0.7, 0.5, 1.7);
    headGroup.add(rightEye);

    // Orbiting Cyber Rings (Torus)
    const ringGeometries = [
      new THREE.TorusGeometry(3, 0.08, 16, 100),
      new THREE.TorusGeometry(3.3, 0.04, 8, 100)
    ];
    
    const ringMaterials = [
      new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.4 }),
      new THREE.MeshBasicMaterial({ color: 0x0066ff, transparent: true, opacity: 0.3 })
    ];

    const rings: THREE.Mesh[] = [];
    
    ringGeometries.forEach((geo, idx) => {
      const ring = new THREE.Mesh(geo, ringMaterials[idx]);
      if (idx === 0) {
        ring.rotation.x = Math.PI / 2.5;
      } else {
        ring.rotation.y = Math.PI / 3;
        ring.rotation.x = Math.PI / 6;
      }
      scene.add(ring);
      rings.push(ring);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x0066ff, 5, 20);
    pointLight.position.set(0, 3, 5);
    scene.add(pointLight);

    const eyeGlowLight = new THREE.PointLight(0x00ffff, 4, 10);
    eyeGlowLight.position.set(0, 0.5, 2);
    headGroup.add(eyeGlowLight);

    // Mouse Interaction
    let mouse = new THREE.Vector2();
    let target = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates (-1 to 1)
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Click handler to open the quiz
    const onClick = () => {
      openQuiz();
    };
    container.addEventListener("click", onClick);

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

      // Smooth look-at mouse target interpolation
      target.x += (mouse.x - target.x) * 0.1;
      target.y += (mouse.y - target.y) * 0.1;

      // Rotate head based on mouse target coordinates
      headGroup.rotation.y = target.x * 0.5;
      headGroup.rotation.x = -target.y * 0.3;

      // Breathing/Idle motion
      headGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;
      
      // Pulse lights and eyes intensity
      const pulse = 1 + Math.sin(elapsedTime * 3) * 0.2;
      eyeGlowLight.intensity = 3 * pulse;
      (leftEye.material as THREE.MeshBasicMaterial).opacity = 0.8 * pulse;

      // Orbit rings
      rings[0].rotation.z = elapsedTime * 0.2;
      rings[1].rotation.z = -elapsedTime * 0.4;
      rings[1].rotation.x += Math.sin(elapsedTime * 0.5) * 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("click", onClick);
      window.removeEventListener("resize", handleResize);
      
      // Dispose WebGL resources
      headGeo.dispose();
      headMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      eyeGeo.dispose();
      eyeMat.dispose();
      ringGeometries.forEach(geo => geo.dispose());
      ringMaterials.forEach(mat => mat.dispose());
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [openQuiz]);

  return (
    <div
      ref={containerRef}
      className="h-[350px] md:h-[450px] w-full cursor-pointer relative"
      title="Click to start assessment"
    >
      <div className="absolute inset-x-0 bottom-0 text-center pointer-events-none pb-4">
        <span className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase flex items-center justify-center gap-1.5 animate-pulse">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-teal"></span>
          Click avatar to start assessment
        </span>
      </div>
    </div>
  );
}
