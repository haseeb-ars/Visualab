"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ShopifyCanvas() {
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

    // Group for bag & orbiters
    const centralGroup = new THREE.Group();
    scene.add(centralGroup);

    // Main Shopping Bag body
    const bagGeo = new THREE.BoxGeometry(2, 2.5, 0.8);
    const bagMat = new THREE.MeshStandardMaterial({
      color: 0x95c11f, // Shopify green
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.9,
    });
    const bagMesh = new THREE.Mesh(bagGeo, bagMat);
    centralGroup.add(bagMesh);

    // Bag Handle (Torus)
    const handleGeo = new THREE.TorusGeometry(0.6, 0.08, 16, 100, Math.PI);
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
    });
    const handleMesh = new THREE.Mesh(handleGeo, handleMat);
    handleMesh.position.y = 1.25;
    handleMesh.rotation.x = 0;
    centralGroup.add(handleMesh);

    // Floating Orbiters (Product Cards)
    const cardGeo = new THREE.BoxGeometry(0.8, 0.5, 0.05);
    const cardMaterials = [
      new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.6, roughness: 0.3 }),
      new THREE.MeshStandardMaterial({ color: 0x0066ff, metalness: 0.6, roughness: 0.3 }),
      new THREE.MeshStandardMaterial({ color: 0x0ea5e9, metalness: 0.6, roughness: 0.3 })
    ];

    const cards: THREE.Mesh[] = [];
    const cardRadii = [2.2, 2.6, 3.0];
    const cardSpeeds = [0.4, 0.6, 0.3];
    const cardOffsets = [0, Math.PI * 0.7, Math.PI * 1.4];

    for (let i = 0; i < 3; i++) {
      const card = new THREE.Mesh(cardGeo, cardMaterials[i % cardMaterials.length]);
      scene.add(card);
      cards.push(card);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 6, 25);
    pointLight.position.set(0, 3, 5);
    scene.add(pointLight);

    const accentLight = new THREE.PointLight(0x95c11f, 8, 15);
    accentLight.position.set(0, -2, 3);
    scene.add(accentLight);

    // Mouse control
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
      target.x += (mouse.x - target.x) * 0.08;
      target.y += (mouse.y - target.y) * 0.08;

      centralGroup.rotation.y = elapsedTime * 0.3 + target.x * 0.4;
      centralGroup.rotation.x = target.y * 0.2;
      centralGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.1;

      // Orbit cards
      cards.forEach((card, index) => {
        const angle = elapsedTime * cardSpeeds[index] + cardOffsets[index];
        card.position.x = Math.cos(angle) * cardRadii[index];
        card.position.z = Math.sin(angle) * cardRadii[index];
        card.position.y = Math.sin(elapsedTime * 0.8 + index) * 0.5;

        // Make card look at camera/spin
        card.rotation.y = -angle + Math.PI / 2;
        card.rotation.x = elapsedTime * 0.1;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      
      bagGeo.dispose();
      bagMat.dispose();
      handleGeo.dispose();
      handleMat.dispose();
      cardGeo.dispose();
      cardMaterials.forEach(m => m.dispose());
      
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
