"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hero globe: a real 3D sphere (custom shader on a land/ocean mask), a handful of network points, fine orbital arcs
 * with light travelling along them, a breathing crimson atmosphere and a mirrored floor reflection.
 * Everything is drawn in one WebGL scene; the rotation is the sphere itself turning, not an image.
 */

/** [lat, lng, warm(0 red / 1 warm white), size, pulses] */
const CITIES: [number, number, number, number, number][] = [
  [40.7, -74, 0, 0.05, 1], [37.8, -122.4, 1, 0.038, 0], [43.7, -79.4, 1, 0.032, 0], [32.8, -96.8, 1, 0.032, 0],
  [19.4, -99.1, 1, 0.03, 0], [-23.5, -46.6, 0, 0.044, 1], [-33.4, -70.7, 1, 0.028, 0],
  [51.5, -0.1, 1, 0.046, 1], [48.9, 2.35, 1, 0.03, 0], [50.1, 8.7, 0, 0.04, 0], [59.3, 18, 1, 0.028, 0],
  [30, 31.2, 1, 0.03, 0], [6.5, 3.4, 1, 0.03, 0], [-1.3, 36.8, 1, 0.03, 0], [-26.2, 28, 0, 0.04, 1],
  [25.2, 55.3, 0, 0.044, 1], [19.1, 72.9, 1, 0.036, 0], [17.4, 78.5, 0, 0.058, 1], [13, 77.6, 1, 0.036, 0],
  [1.35, 103.8, 0, 0.046, 1], [22.3, 114.2, 1, 0.034, 0], [37.6, 127, 1, 0.032, 0], [35.7, 139.7, 0, 0.044, 1],
  [-33.9, 151.2, 1, 0.04, 0], [-37.8, 145, 1, 0.026, 0],
];

/** City index pairs joined by arcs; the first five are kept on small screens. */
const ARCS: [number, number][] = [
  [0, 7], [17, 19], [7, 15], [15, 17], [22, 1], [19, 23], [0, 5], [9, 14],
  [19, 20], [20, 22], [17, 22], [13, 14], [15, 11], [1, 4],
];

const RED = new THREE.Color(1, 0.2, 0.15);
const WARM = new THREE.Color(1, 0.9, 0.78);

const FLOOR_Y = -0.78;
const GLOBE_Y = 0.35;

function ll(lat: number, lng: number, r = 1) {
  const p = ((90 - lat) * Math.PI) / 180;
  const t = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t));
}

const GLOBE_VERT = /* glsl */ `
varying vec2 vUv; varying vec3 vN; varying vec3 vObjN; varying vec3 vV;
void main() {
  vUv = uv;
  vObjN = normalize(normal);
  vN = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vV = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}`;

const GLOBE_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv; varying vec3 vN; varying vec3 vObjN; varying vec3 vV;
uniform sampler2D uMask; uniform sampler2D uBump;
uniform float uTime; uniform float uBreath; uniform vec3 uLight; uniform vec3 uRegions[3];
void main() {
  float w = texture2D(uMask, vUv, 1.6).r;
  float land = 1.0 - smoothstep(0.42, 0.62, w);
  float h = texture2D(uBump, vUv, 1.5).r;

  vec3 V = normalize(vV);
  vec3 N = normalize(vN);
  vec3 L = normalize(uLight);
  float ndl = max(dot(N, L), 0.0);
  float ndv = max(dot(normalize(vN), V), 0.0);
  float fres = pow(1.0 - ndv, 3.0);
  vec3 R = reflect(-L, N);
  float spec = max(dot(R, V), 0.0);
  // Cool fill from the right so the shadow side never disappears
  float fill = pow(max(dot(N, normalize(vec3(0.85, -0.05, 0.5))), 0.0), 1.4);

  // Ocean: near-black, glossy, with a soft environment sheen at grazing angles
  vec3 ocean = vec3(0.016, 0.018, 0.026) + vec3(0.02, 0.024, 0.034) * ndl + vec3(0.03, 0.04, 0.06) * fill;
  ocean += vec3(0.6, 0.63, 0.7) * pow(spec, 80.0) * 0.55;
  ocean += vec3(0.09, 0.1, 0.13) * fres * (0.4 + 0.6 * ndl);

  // Land: graphite to brushed silver by elevation
  float relief = smoothstep(0.05, 0.85, h);
  vec3 tone = mix(vec3(0.16, 0.17, 0.19), vec3(0.7, 0.72, 0.77), relief * 0.7 + 0.1);
  vec3 landCol = tone * (0.2 + 1.0 * ndl + 0.5 * fill) + vec3(0.7, 0.72, 0.78) * pow(spec, 18.0) * 0.12;

  vec3 col = mix(ocean, landCol, land);

  // Fine latitude / longitude lines (every 15 degrees)
  vec2 gp = vUv * vec2(24.0, 12.0);
  vec2 gd = abs(fract(gp - 0.5) - 0.5) / max(fwidth(gp), vec2(0.0001));
  float grid = 1.0 - min(min(gd.x, gd.y), 1.0);
  col += vec3(0.5, 0.56, 0.68) * grid * (0.045 + 0.05 * fill + 0.05 * ndl) * (1.0 - 0.5 * land);

  // Silver coastline
  float edge = smoothstep(0.0, 0.5, land) * (1.0 - smoothstep(0.5, 1.0, land));
  col += vec3(0.62, 0.65, 0.7) * edge * 0.5 * (0.25 + 0.5 * ndl);

  // Crimson regional glow
  float g = 0.0;
  for (int i = 0; i < 3; i++) g += pow(max(dot(normalize(vObjN), uRegions[i]), 0.0), 16.0);
  col += vec3(0.85, 0.05, 0.03) * g * (0.1 + 0.2 * uBreath) * (0.4 + 0.6 * land) * ndv;

  // Limb light
  float rim = pow(1.0 - ndv, 2.6);
  col += vec3(0.55, 0.06, 0.05) * rim * (0.07 + 0.1 * uBreath);
  col += vec3(0.5, 0.55, 0.62) * rim * (0.05 * ndl + 0.14 * fill);

  gl_FragColor = vec4(col, 1.0);
}`;

const ATMO_VERT = /* glsl */ `
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const ATMO_FRAG = /* glsl */ `
varying vec3 vNormal; uniform float uBreath;
void main() {
  float i = pow(max(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 5.0);
  gl_FragColor = vec4(vec3(0.9, 0.1, 0.07) * i * (0.14 + 0.12 * uBreath), 1.0);
}`;

const LINE_VERT = /* glsl */ `
attribute float aT; varying float vT;
void main() {
  vT = aT;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const LINE_FRAG = /* glsl */ `
varying float vT; uniform float uPhase; uniform vec3 uColor;
void main() {
  float d = uPhase - vT;
  float trail = d > 0.0 ? exp(-d * 7.0) : exp(d * 45.0);
  float ends = sin(3.14159 * vT);
  float a = (0.3 + 0.8 * trail) * ends;
  gl_FragColor = vec4(uColor * a, 1.0);
}`;

const DOT_VERT = /* glsl */ `
attribute float aSize; attribute float aPhase; attribute float aPulse; attribute float aAlpha; attribute vec3 aColor;
varying vec3 vColor; varying float vA; varying float vPulse;
uniform float uTime; uniform float uScale;
void main() {
  float pulse = aPulse * (0.5 + 0.5 * sin(uTime * 1.1 + aPhase * 6.2832));
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (1.0 + 0.9 * pulse) * uScale / -mv.z * 3.2;
  vColor = aColor; vA = aAlpha; vPulse = pulse;
  gl_Position = projectionMatrix * mv;
}`;

const DOT_FRAG = /* glsl */ `
varying vec3 vColor; varying float vA; varying float vPulse;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  if (d > 1.0) discard;
  float core = smoothstep(0.34, 0.0, d);
  float halo = pow(1.0 - d, 2.4) * (0.22 + 0.4 * vPulse);
  vec3 c = mix(vColor, vec3(1.0), core * 0.7);
  gl_FragColor = vec4(c * (core + halo) * vA, 1.0);
}`;

const FLOOR_FADE_FRAG = /* glsl */ `
varying vec2 vUv;
void main() {
  float down = 1.0 - vUv.y;
  float a = mix(0.84, 1.0, smoothstep(0.0, 0.45, down));
  a *= 1.0 - smoothstep(0.62, 0.98, abs(vUv.x - 0.5) * 2.0);
  gl_FragColor = vec4(0.0, 0.0, 0.0, a);
}`;

const FLOOR_GLOW_FRAG = /* glsl */ `
varying vec2 vUv; uniform float uBreath;
void main() {
  vec2 p = (vUv - 0.5) * 2.0;
  float g = pow(max(1.0 - length(p), 0.0), 2.4);
  gl_FragColor = vec4(vec3(0.85, 0.07, 0.05) * g * (0.1 + 0.08 * uBreath), 1.0);
}`;

const PLANE_VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

export default function GlobeScene({ onReady, onFail }: { onReady: () => void; onFail: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      onFail();
      return;
    }
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.className = "block size-full";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactMq = window.matchMedia("(max-width: 1023px)");
    const FOV = 30;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 50);

    const shared = {
      uTime: { value: 0 },
      uBreath: { value: 0.5 },
      uScale: { value: 600 },
    };

    // ── Materials ──
    const regions = [ll(17, 78), ll(38, -78), ll(50, 8)];
    const globeUniforms = {
      uMask: { value: null as THREE.Texture | null },
      uBump: { value: null as THREE.Texture | null },
      uTime: shared.uTime,
      uBreath: shared.uBreath,
      uLight: { value: new THREE.Vector3(-0.6, 0.5, 0.65) },
      uRegions: { value: regions },
    };
    const globeMat = new THREE.ShaderMaterial({ vertexShader: GLOBE_VERT, fragmentShader: GLOBE_FRAG, uniforms: globeUniforms });
    const globeMatMirror = new THREE.ShaderMaterial({
      vertexShader: GLOBE_VERT,
      fragmentShader: GLOBE_FRAG,
      uniforms: { ...globeUniforms, uLight: { value: new THREE.Vector3(-0.6, -0.5, 0.65) } },
    });
    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: ATMO_VERT,
      fragmentShader: ATMO_FRAG,
      uniforms: { uBreath: shared.uBreath },
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    const dotMat = new THREE.ShaderMaterial({
      vertexShader: DOT_VERT,
      fragmentShader: DOT_FRAG,
      uniforms: { uTime: shared.uTime, uScale: shared.uScale },
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });

    // ── Geometry shared by the globe and its reflection ──
    const sphereGeo = new THREE.SphereGeometry(1, 96, 64);
    const atmoGeo = new THREE.SphereGeometry(1.15, 48, 32);

    const cityGeo = new THREE.BufferGeometry();
    {
      const n = CITIES.length;
      const pos = new Float32Array(n * 3), col = new Float32Array(n * 3);
      const size = new Float32Array(n), phase = new Float32Array(n), pulse = new Float32Array(n), alpha = new Float32Array(n);
      CITIES.forEach(([lat, lng, warm, s, p], i) => {
        ll(lat, lng, 1.008).toArray(pos, i * 3);
        (warm ? WARM : RED).toArray(col, i * 3);
        size[i] = s; phase[i] = (i * 0.618) % 1; pulse[i] = p; alpha[i] = 1;
      });
      cityGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      cityGeo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
      cityGeo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
      cityGeo.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
      cityGeo.setAttribute("aPulse", new THREE.BufferAttribute(pulse, 1));
      cityGeo.setAttribute("aAlpha", new THREE.BufferAttribute(alpha, 1));
    }

    // Arcs: great-circle paths lifted off the surface, each with a light that travels along it
    const SEG = 72;
    const arcs = ARCS.map(([ia, ib], k) => {
      const a = ll(CITIES[ia][0], CITIES[ia][1]);
      const b = ll(CITIES[ib][0], CITIES[ib][1]);
      const omega = Math.acos(THREE.MathUtils.clamp(a.dot(b), -1, 1));
      const lift = 0.05 + 0.2 * (omega / Math.PI);
      const pts: THREE.Vector3[] = [];
      const pos = new Float32Array((SEG + 1) * 3), tt = new Float32Array(SEG + 1);
      for (let i = 0; i <= SEG; i++) {
        const t = i / SEG;
        const p = a.clone().multiplyScalar(Math.sin((1 - t) * omega)).add(b.clone().multiplyScalar(Math.sin(t * omega))).divideScalar(Math.sin(omega));
        p.normalize().multiplyScalar(1.006 + Math.sin(Math.PI * t) * lift);
        pts.push(p);
        p.toArray(pos, i * 3);
        tt[i] = t;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("aT", new THREE.BufferAttribute(tt, 1));
      const color = k % 3 === 1 ? WARM : RED;
      const mat = new THREE.ShaderMaterial({
        vertexShader: LINE_VERT,
        fragmentShader: LINE_FRAG,
        uniforms: { uPhase: { value: 0 }, uColor: { value: color } },
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      });
      return { geo, mat, pts, speed: 0.06 + (k % 4) * 0.012, offset: (k * 0.37) % 1, color };
    });

    // One travelling light per arc
    const trav = new THREE.BufferGeometry();
    const travPos = new Float32Array(arcs.length * 3);
    const travAlpha = new Float32Array(arcs.length);
    {
      const col = new Float32Array(arcs.length * 3);
      arcs.forEach((a, i) => a.color.toArray(col, i * 3));
      trav.setAttribute("position", new THREE.BufferAttribute(travPos, 3));
      trav.setAttribute("aAlpha", new THREE.BufferAttribute(travAlpha, 1));
      trav.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
      trav.setAttribute("aSize", new THREE.BufferAttribute(new Float32Array(arcs.length).fill(0.032), 1));
      trav.setAttribute("aPhase", new THREE.BufferAttribute(new Float32Array(arcs.length), 1));
      trav.setAttribute("aPulse", new THREE.BufferAttribute(new Float32Array(arcs.length), 1));
    }

    // ── Assemble the globe (tilted axis, spinning inside) and a mirrored copy for the floor reflection ──
    const spins: THREE.Group[] = [];
    const tilts: THREE.Group[] = [];
    function build(mat: THREE.ShaderMaterial) {
      const tilt = new THREE.Group();
      tilts.push(tilt);
      tilt.rotation.set(0.28, 0, 0.16);
      const spin = new THREE.Group();
      spins.push(spin);
      tilt.add(spin);
      const globe = new THREE.Mesh(sphereGeo, mat);
      spin.add(globe);
      spin.add(new THREE.Points(cityGeo, dotMat));
      for (const a of arcs) spin.add(new THREE.Line(a.geo, a.mat));
      spin.add(new THREE.Points(trav, dotMat));
      if (mat === globeMat) {
        const atmo = new THREE.Mesh(atmoGeo, atmoMat);
        tilt.add(atmo);
        atmo.rotation.set(-0.28, 0, -0.16); // keep the atmosphere camera-aligned
      }
      return tilt;
    }

    const mainRoot = new THREE.Group();
    mainRoot.position.y = GLOBE_Y;
    mainRoot.add(build(globeMat));
    scene.add(mainRoot);

    const mirrorRoot = new THREE.Group();
    mirrorRoot.position.y = 2 * FLOOR_Y - GLOBE_Y;
    mirrorRoot.scale.y = -1;
    mirrorRoot.add(build(globeMatMirror));
    scene.add(mirrorRoot);

    // Floor: a black veil that fades the reflection out, and a faint crimson pool of light
    const veilGeo = new THREE.PlaneGeometry(5, 3);
    const veilMat = new THREE.ShaderMaterial({
      vertexShader: PLANE_VERT, fragmentShader: FLOOR_FADE_FRAG, transparent: true, depthTest: false, depthWrite: false,
    });
    const veil = new THREE.Mesh(veilGeo, veilMat);
    veil.position.set(0, FLOOR_Y - 1.5, 1.8);
    veil.renderOrder = 10;
    scene.add(veil);

    const poolGeo = new THREE.PlaneGeometry(3.4, 0.7);
    const poolMat = new THREE.ShaderMaterial({
      vertexShader: PLANE_VERT, fragmentShader: FLOOR_GLOW_FRAG, uniforms: { uBreath: shared.uBreath },
      transparent: true, blending: THREE.AdditiveBlending, depthTest: false, depthWrite: false,
    });
    const pool = new THREE.Mesh(poolGeo, poolMat);
    pool.position.set(0, FLOOR_Y - 0.02, 1.9);
    pool.renderOrder = 11;
    scene.add(pool);

    // ── Layout (full scene on desktop, tighter without reflection on small screens) ──
    let compact = compactMq.matches;
    const maxArcs = () => (compact ? 7 : arcs.length);
    function applyLayout() {
      mirrorRoot.visible = veil.visible = pool.visible = !compact;
      const visH = compact ? 2.75 : 3.2;
      const cy = compact ? GLOBE_Y : -0.15;
      camera.position.set(0, cy, visH / 2 / Math.tan(THREE.MathUtils.degToRad(FOV / 2)));
      camera.lookAt(0, cy, 0);
      resize();
    }
    function resize() {
      const w = host!.clientWidth, h = host!.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, compact ? 1.5 : 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      shared.uScale.value = (h * dpr) / (2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)));
      draw();
    }

    // ── Frame ──
    let t = 0;
    let last = 0;
    let raf = 0;
    let visible = true;
    const light = new THREE.Vector3();
    const START = -2.45; // India / Middle East facing the viewer
    let angle = START;

    // Mouse: the globe leans toward the cursor, a highlight follows it, and hovering it quickens the spin and the glow
    const ptr = { x: 0, y: 0, over: 0 };
    const sm = { x: 0, y: 0, over: 0 };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === "touch" || !visible) return;
      const r = host!.getBoundingClientRect();
      const visH = compact ? 2.75 : 3.2;
      const R = r.height / visH;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * (compact ? 0.5 : (1.45 - GLOBE_Y) / 3.2);
      const dx = e.clientX - cx, dy = e.clientY - cy;
      // Only reacts while the cursor is on the globe itself; anywhere else it eases back to rest
      const over = Math.hypot(dx, dy) < R;
      ptr.x = over ? dx / R : 0;
      ptr.y = over ? dy / R : 0;
      ptr.over = over ? 1 : 0;
    };
    const onLeave = () => { ptr.x = ptr.y = ptr.over = 0; };
    window.addEventListener("pointermove", onPointer);
    document.documentElement.addEventListener("pointerleave", onLeave);

    function update(dt = 0) {
      const k = 1 - Math.exp(-dt * 5);
      sm.x += (ptr.x - sm.x) * k;
      sm.y += (ptr.y - sm.y) * k;
      sm.over += (ptr.over - sm.over) * k;
      angle += dt * (0.07 + 0.09 * sm.over);
      shared.uTime.value = t;
      shared.uBreath.value = Math.min(1, 0.5 + 0.5 * Math.sin(t * 0.7) + 0.45 * sm.over);
      for (const s of spins) s.rotation.y = angle;
      for (const g of tilts) g.rotation.set(0.28 + sm.y * 0.22, sm.x * 0.3, 0.16);
      light.set(-0.6 + 0.45 * Math.sin(t * 0.13) + sm.x * 1.1, 0.5 + 0.12 * Math.sin(t * 0.09) - sm.y * 0.8, 0.65).normalize();
      globeUniforms.uLight.value.copy(light);
      (globeMatMirror.uniforms.uLight.value as THREE.Vector3).set(light.x, -light.y, light.z);

      const n = maxArcs();
      arcs.forEach((a, i) => {
        const p = ((((t * a.speed + a.offset) % 1) + 1) % 1) * 1.5;
        a.mat.uniforms.uPhase.value = p;
        const on = i < n;
        const visibleLight = on && p <= 1;
        const f = Math.min(p, 1) * SEG;
        const i0 = THREE.MathUtils.clamp(Math.floor(f), 0, SEG - 1);
        const q = a.pts[i0].clone().lerp(a.pts[i0 + 1], f - i0);
        q.toArray(travPos, i * 3);
        travAlpha[i] = visibleLight ? Math.sin(Math.PI * Math.min(p, 1)) : 0;
      });
      trav.attributes.position.needsUpdate = true;
      trav.attributes.aAlpha.needsUpdate = true;
    }
    function draw() {
      renderer.render(scene, camera);
    }
    function frame(now: number) {
      raf = 0;
      // The hero stays pinned while the next section covers it, so stop drawing once it is fully hidden
      if (!visible || document.hidden || window.scrollY > window.innerHeight) return;
      const dt = THREE.MathUtils.clamp((now - last) / 1000, 0, 0.1);
      last = now;
      t += dt;
      update(dt);
      draw();
      raf = requestAnimationFrame(frame);
    }
    function start() {
      if (raf || reduceMotion) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(host);
    const onVis = () => { if (!document.hidden) start(); };
    const onScroll = () => { if (window.scrollY <= window.innerHeight) start(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const onMq = () => { compact = compactMq.matches; applyLayout(); update(); };
    compactMq.addEventListener("change", onMq);

    // ── Textures, then go ──
    let disposed = false;
    const loader = new THREE.TextureLoader();
    const load = (src: string) =>
      new Promise<THREE.Texture>((res, rej) =>
        loader.load(src, (tex) => {
          tex.anisotropy = 4;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          res(tex);
        }, undefined, rej),
      );
    Promise.all([load("/globe/earth-water.png"), load("/globe/earth-topology.png")])
      .then(([mask, bump]) => {
        if (disposed) { mask.dispose(); bump.dispose(); return; }
        globeUniforms.uMask.value = mask;
        globeUniforms.uBump.value = bump;
        globeMat.needsUpdate = globeMatMirror.needsUpdate = true;
        applyLayout();
        update();
        draw();
        onReady();
        start();
      })
      .catch(() => { if (!disposed) onFail(); });

    renderer.domElement.addEventListener("webglcontextlost", (e) => { e.preventDefault(); onFail(); });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      compactMq.removeEventListener("change", onMq);
      [sphereGeo, atmoGeo, cityGeo, trav, veilGeo, poolGeo, ...arcs.map((a) => a.geo)].forEach((g) => g.dispose());
      [globeMat, globeMatMirror, atmoMat, dotMat, veilMat, poolMat, ...arcs.map((a) => a.mat)].forEach((m) => m.dispose());
      globeUniforms.uMask.value?.dispose();
      globeUniforms.uBump.value?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onReady, onFail]);

  return <div ref={hostRef} className="size-full" />;
}
