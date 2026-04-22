"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.3 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Three.js Scene ───────────────────────────────────────────────────────────

function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, 8);

    // ── Lighting ──────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    const keyLight = new THREE.DirectionalLight(0x2dd4bf, 2.8);
    keyLight.position.set(-3, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x22d3ee, 1.4);
    rimLight.position.set(4, -2, 2);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xffffff, 0.6, 20);
    fillLight.position.set(0, 0, 5);
    scene.add(fillLight);

    // ── Materials ─────────────────────────────────────────────────────────────
    // Using MeshStandardMaterial so emissiveIntensity can be animated per-frame
    const matA = new THREE.MeshStandardMaterial({
      color: 0x0f766e,
      metalness: 0.85,
      roughness: 0.18,
      emissive: 0x0d9488,
      emissiveIntensity: 0,
    });

    const matB = new THREE.MeshStandardMaterial({
      color: 0x134e4a,
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0x134e4a,
      emissiveIntensity: 0,
    });

    const matC = new THREE.MeshStandardMaterial({
      color: 0x2dd4bf,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x0d9488,
      emissiveIntensity: 0.15,
    });

    const matWire = new THREE.MeshStandardMaterial({
      color: 0x5eead4,
      metalness: 1,
      roughness: 0.05,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    // Collect animatable materials so we can pulse them in the loop
    const glowMaterials = [matA, matB, matC];

    // ── Shape registry ────────────────────────────────────────────────────────
    type ShapeObj = {
      mesh: THREE.Mesh;
      floatSpeed: number;
      floatAmp: number;
      floatOffset: number;
      rotSpeed: THREE.Vector3;
      initPos: THREE.Vector3;
      entryDelay: number; // seconds before this shape starts entering
      entryDone: boolean;
      entryProgress: number;
      baseScale: number; // target scale after entry (1 for most)
    };

    const objects: ShapeObj[] = [];

    function addShape(
      geo: THREE.BufferGeometry,
      mat: THREE.Material,
      pos: [number, number, number],
      rot: [number, number, number],
      floatSpeed = 0.8,
      floatAmp = 0.18,
      floatOffset = 0,
      rotSpeed: [number, number, number] = [0.003, 0.005, 0.002],
      entryDelay = 0,
      baseScale = 1,
    ) {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh.rotation.set(...rot);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.scale.set(0, 0, 0); // start invisible
      scene.add(mesh);
      objects.push({
        mesh,
        floatSpeed,
        floatAmp,
        floatOffset,
        rotSpeed: new THREE.Vector3(...rotSpeed),
        initPos: new THREE.Vector3(...pos),
        entryDelay,
        entryDone: false,
        entryProgress: 0,
        baseScale,
      });
      return mesh;
    }

    // Large cube — hero shape, enters first
    addShape(
      new THREE.BoxGeometry(1.6, 1.6, 1.6),
      matA,
      [1.2, 0.2, 0],
      [0.4, 0.6, 0.1],
      0.6,
      0.22,
      0,
      [0.004, 0.006, 0.002],
      0.0, // no delay — first in
    );
    // Wireframe overlay — enters slightly after solid cube
    addShape(
      new THREE.BoxGeometry(1.65, 1.65, 1.65),
      matWire,
      [1.2, 0.2, 0],
      [0.4, 0.6, 0.1],
      0.6,
      0.22,
      0,
      [0.004, 0.006, 0.002],
      0.18, // reveals after solid cube
    );
    // Medium sphere
    addShape(
      new THREE.SphereGeometry(0.72, 48, 48),
      matC,
      [2.8, 1.6, -0.5],
      [0, 0, 0],
      0.9,
      0.28,
      1.2,
      [0.002, 0.004, 0.001],
      0.1,
    );
    // Small sphere
    addShape(
      new THREE.SphereGeometry(0.38, 32, 32),
      matB,
      [-0.4, -1.8, 0.3],
      [0, 0, 0],
      1.1,
      0.15,
      2.1,
      [0.003, 0.002, 0.004],
      0.25,
    );
    // Torus
    addShape(
      new THREE.TorusGeometry(0.72, 0.22, 24, 80),
      matA,
      [0.3, -1.2, 0.5],
      [1.1, 0.3, 0.2],
      0.7,
      0.2,
      0.7,
      [0.005, 0.003, 0.004],
      0.35,
    );
    // Octahedron
    addShape(
      new THREE.OctahedronGeometry(0.52),
      matC,
      [-1.6, 1.4, -0.2],
      [0.2, 0.5, 0],
      0.85,
      0.24,
      1.8,
      [0.006, 0.004, 0.005],
      0.2,
    );
    // Tiny cube
    addShape(
      new THREE.BoxGeometry(0.48, 0.48, 0.48),
      matB,
      [3.2, -0.6, 0.2],
      [0.8, 1.2, 0.4],
      1.2,
      0.18,
      0.5,
      [0.007, 0.005, 0.006],
      0.4,
    );
    // Icosahedron wireframe
    addShape(
      new THREE.IcosahedronGeometry(0.42),
      matWire,
      [-2.4, -0.4, -0.3],
      [0, 0, 0],
      0.95,
      0.2,
      3.0,
      [0.004, 0.007, 0.003],
      0.3,
    );

    // ── Group for parallax ────────────────────────────────────────────────────
    const group = new THREE.Group();
    objects.forEach(({ mesh }) => {
      scene.remove(mesh);
      group.add(mesh);
    });
    scene.add(group);

    // ── Mouse tracking ────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 }; // normalized -1 → 1
    const mouseNDC = new THREE.Vector2(); // for raycasting proximity
    const targetRot = { x: 0, y: 0 };

    function onMouseMove(e: MouseEvent) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseNDC.set(mouse.x, mouse.y);
    }
    window.addEventListener("mousemove", onMouseMove);

    // Raycaster for proximity-based scale pulse
    const raycaster = new THREE.Raycaster();

    // ── Resize ────────────────────────────────────────────────────────────────
    function onResize() {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    // ── Animation loop ────────────────────────────────────────────────────────
    let frameId: number;
    const clock = new THREE.Clock();
    // Track per-shape hover scale targets
    const hoverScales = new Map<THREE.Mesh, number>();

    function animate() {
      frameId = requestAnimationFrame(animate);

      // ✅ delta FIRST, then elapsed — getDelta() resets the internal clock
      const delta = clock.getDelta();
      const t = clock.getElapsedTime();

      // ── Staggered entry ───────────────────────────────────────────────────
      objects.forEach((obj) => {
        if (obj.entryDone) return;
        if (t < obj.entryDelay) return;

        obj.entryProgress = Math.min(1, obj.entryProgress + delta * 1.1);
        // easeOutBack — overshoots slightly for a springy pop
        const s = obj.entryProgress;
        const eased =
          s < 1
            ? 1 + 2.70158 * Math.pow(s - 1, 3) + 1.70158 * Math.pow(s - 1, 2)
            : 1;
        const scale = Math.max(0, eased) * obj.baseScale;
        obj.mesh.scale.setScalar(scale);
        if (obj.entryProgress >= 1) obj.entryDone = true;
      });

      // ── Float & rotate ────────────────────────────────────────────────────
      objects.forEach(
        ({ mesh, floatSpeed, floatAmp, floatOffset, rotSpeed, initPos }) => {
          mesh.position.y =
            initPos.y + Math.sin(t * floatSpeed + floatOffset) * floatAmp;
          mesh.rotation.x += rotSpeed.x;
          mesh.rotation.y += rotSpeed.y;
          mesh.rotation.z += rotSpeed.z;
        },
      );

      // ── Emissive glow pulse ───────────────────────────────────────────────
      // Each material breathes on a slightly different sine frequency
      glowMaterials.forEach((mat, i) => {
        const base = i === 2 ? 0.15 : 0.0;
        const pulse = Math.sin(t * 0.9 + i * 1.4) * 0.12 + base;
        mat.emissiveIntensity = Math.max(0, pulse);
      });

      // ── Mouse proximity — shapes near cursor scale up slightly ────────────
      raycaster.setFromCamera(mouseNDC, camera);
      const meshes = objects.map((o) => o.mesh);
      const intersects = raycaster.intersectObjects(meshes);
      const hoveredMesh = intersects[0]?.object as THREE.Mesh | undefined;

      objects.forEach(({ mesh, baseScale, entryDone }) => {
        if (!entryDone) return;
        const isHovered = mesh === hoveredMesh;
        const target = isHovered ? baseScale * 1.12 : baseScale;
        const current = hoverScales.get(mesh) ?? baseScale;
        const next = current + (target - current) * 0.08; // lerp
        hoverScales.set(mesh, next);
        mesh.scale.setScalar(next);
      });

      // ── Camera Lissajous drift ────────────────────────────────────────────
      // Slow figure-8 drift — barely noticeable but adds cinematic life
      camera.position.x = Math.sin(t * 0.12) * 0.25;
      camera.position.y = Math.sin(t * 0.08) * 0.15;

      // ── Mouse parallax on group ───────────────────────────────────────────
      targetRot.x += (mouse.y * 0.15 - targetRot.x) * 0.04;
      targetRot.y += (mouse.x * 0.2 - targetRot.y) * 0.04;
      group.rotation.x = targetRot.x;
      group.rotation.y = targetRot.y;

      renderer.render(scene, camera);
    }

    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 md:pointer-events-auto"
      aria-hidden="true"
    />
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center justify-center overflow-hidden pt-14 sm:pt-15"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-0 h-full w-full md:w-2/3"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 75% 45%, rgba(45,212,191,0.10) 0%, rgba(17,94,89,0.06) 50%, transparent 75%)",
        }}
      />

      <div className="absolute inset-0">
        <ThreeScene />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(45,212,191,1) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-[calc(100svh-3.5rem)] w-full items-center sm:min-h-[calc(100svh-3.75rem)]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10"
        >
          <div className="max-w-xl text-left md:max-w-lg lg:max-w-xl">
            <motion.p
              variants={fadeUp}
              className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal-400/70"
            >
              Hi, I&apos;m
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="bg-linear-to-r from-teal-300 via-cyan-200 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(45,212,191,0.4)] bg-[length:200%_auto] animate-[shimmer_4s_linear_infinite]">
                Md. Moniruzzaman
              </span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="my-5 h-px w-16 bg-linear-to-r from-teal-300/60 to-transparent"
            />

            <motion.p
              variants={fadeUp}
              className="text-base font-light leading-7 text-white/60 sm:text-lg md:text-xl"
            >
              Software Engineer · Frontend Developer · React Developer
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <motion.div
                whileHover={{
                  y: -2,
                  scale: 1.02,
                  transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
                }}
                whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
              >
                <Button
                  asChild
                  size="lg"
                  className="h-11 w-full rounded-full border border-teal-200/20 bg-linear-to-r from-teal-400/80 to-cyan-300/80 px-8 text-slate-950 shadow-[0_8px_30px_rgba(45,212,191,0.25)] transition-shadow duration-300 hover:from-teal-300 hover:to-cyan-200 hover:shadow-[0_8px_40px_rgba(45,212,191,0.45)] sm:h-12 sm:w-auto"
                >
                  <Link href="#projects">View Projects</Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{
                  y: -2,
                  scale: 1.02,
                  transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
                }}
                whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
              >
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 w-full rounded-full border border-white/10 bg-white/5 px-8 text-teal-300 backdrop-blur-xl transition-all duration-300 hover:border-teal-400/30 hover:bg-white/10 hover:shadow-[0_4px_20px_rgba(45,212,191,0.15)] sm:h-12 sm:w-auto"
                >
                  <a href="/files/Resume-of-md-moniruzzaman.pdf" download>
                    <FileText className="mr-2 h-4 w-4" />
                    Download CV
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex gap-8">
              {[
                { value: "3+", label: "Years Experience" },
                { value: "15+", label: "Projects Shipped" },
                { value: "2", label: "Companies" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-teal-300">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-white/40">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 sm:bottom-8 md:bottom-10"
      >
        <Link href="#about" aria-label="Scroll to About section">
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          >
            <ArrowDown className="h-7 w-7 text-teal-300/70 sm:h-8 sm:w-8" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
