"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 120;
const CONNECTION_THRESHOLD = 160;
const SPREAD = 300;
// Pre-allocated max line segments: N*(N-1)/2 pairs × 2 vertices × 3 floats
const MAX_LINE_FLOATS = ((PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2) * 6;

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);

    const camera = new THREE.PerspectiveCamera(55, w / h, 1, 2000);
    camera.position.z = 420;

    const scene = new THREE.Scene();
    const group = new THREE.Group();
    scene.add(group);

    // --- Particles ---
    const rawPositions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      rawPositions[i * 3]     = (Math.random() - 0.5) * SPREAD * 2;
      rawPositions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD * 2;
      rawPositions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD;
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(rawPositions, 3));
    const pointsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.8,
      transparent: true,
      opacity: 0.55,
    });
    group.add(new THREE.Points(pointsGeo, pointsMat));

    // --- Connection lines (updated every frame) ---
    const lineBuf = new Float32Array(MAX_LINE_FLOATS);
    const lineGeo = new THREE.BufferGeometry();
    const lineAttr = new THREE.BufferAttribute(lineBuf, 3);
    lineAttr.setUsage(THREE.DynamicDrawUsage);
    lineGeo.setAttribute("position", lineAttr);
    lineGeo.setDrawRange(0, 0);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.07,
    });
    group.add(new THREE.LineSegments(lineGeo, lineMat));

    // --- Mouse parallax ---
    const mouse = { x: 0, y: 0 };
    const camTarget = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // --- Resize ---
    const onResize = () => {
      const nw = canvas.clientWidth;
      const nh = canvas.clientHeight;
      if (!nw || !nh) return;
      renderer.setSize(nw, nh, false);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // --- Animation loop ---
    let rafId: number;
    let lastTime = 0;

    const animate = (time: number) => {
      rafId = requestAnimationFrame(animate);
      const delta = Math.min(time - lastTime, 50);
      lastTime = time;

      if (!reduced) {
        group.rotation.y += 0.0008 * delta;
        group.rotation.x += 0.0003 * delta;
        camTarget.x += (mouse.x * 40 - camTarget.x) * 0.05;
        camTarget.y += (mouse.y * 20 - camTarget.y) * 0.05;
        camera.position.x = camTarget.x;
        camera.position.y = camTarget.y;
      }

      // Rebuild connection line segments each frame
      const pos = rawPositions;
      let idx = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = pos[i * 3]     - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < CONNECTION_THRESHOLD * CONNECTION_THRESHOLD) {
            lineBuf[idx++] = pos[i * 3];
            lineBuf[idx++] = pos[i * 3 + 1];
            lineBuf[idx++] = pos[i * 3 + 2];
            lineBuf[idx++] = pos[j * 3];
            lineBuf[idx++] = pos[j * 3 + 1];
            lineBuf[idx++] = pos[j * 3 + 2];
          }
        }
      }
      lineAttr.needsUpdate = true;
      lineGeo.setDrawRange(0, idx / 3);

      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      pointsGeo.dispose();
      lineGeo.dispose();
      pointsMat.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full pointer-events-none"
    />
  );
}
