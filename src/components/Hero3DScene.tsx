import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Pre-allocated reusable math helpers (Zero GC in animation loop)
const _targetRotation = new THREE.Vector2(0, 0);
const _currentRotation = new THREE.Vector2(0, 0);

export const Hero3DScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 2. Renderer with PBR color pipeline
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // 3. Studio Lighting
    const keyLight = new THREE.DirectionalLight(0x60a5fa, 3.5);
    keyLight.position.set(5, 5, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x818cf8, 2.5);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 1.2);
    scene.add(hemiLight);

    // 4. Composite 3D Procedural Model: "The Digital Core"
    // Composed of 5 distinct structural elements with varied materials and roughness
    const mainGroup = new THREE.Group();

    // Part 1: Central Faceted Core (Icosahedron with high metalness)
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x1d4ed8,
      emissive: 0x0f2b66,
      roughness: 0.2,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Part 2: Inner Wireframe Lattice for high-tech holographic depth
    const latticeGeo = new THREE.IcosahedronGeometry(1.28, 1);
    const latticeMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const latticeMesh = new THREE.Mesh(latticeGeo, latticeMat);
    mainGroup.add(latticeMesh);

    // Part 3: Primary Gimbal Ring (Torus with brushed titanium finish)
    const ring1Geo = new THREE.TorusGeometry(2.1, 0.045, 24, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.3,
      metalness: 0.85,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    mainGroup.add(ring1Mesh);

    // Part 4: Secondary Inclined Orbit Ring (Torus with purple accent)
    const ring2Geo = new THREE.TorusGeometry(2.4, 0.035, 20, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      roughness: 0.45,
      metalness: 0.75,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.x = Math.PI / 3;
    ring2Mesh.rotation.y = Math.PI / 6;
    mainGroup.add(ring2Mesh);

    // Part 5: Third Outer Precision Ring
    const ring3Geo = new THREE.TorusGeometry(2.7, 0.025, 16, 100);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ring3Mesh = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3Mesh.rotation.x = -Math.PI / 4;
    ring3Mesh.rotation.z = Math.PI / 5;
    mainGroup.add(ring3Mesh);

    // Part 6: Ambient Satellite Nodes
    const nodeCount = 12;
    const nodeGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x93c5fd });
    const nodesGroup = new THREE.Group();

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.1;
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
      nodesGroup.add(node);
    }
    ring1Mesh.add(nodesGroup);

    // Part 7: Ambient Particle Field (Procedural background dust)
    const particleCount = 75;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.045,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    scene.add(mainGroup);

    // 5. Interactive Pointer Movement
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      _targetRotation.x = y * 0.45;
      _targetRotation.y = x * 0.55;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // 6. Lossless 60fps Loop with Exponential Damping
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Exponential damping for silky smooth mouse tracking
      const dampFactor = 1 - Math.exp(-4 * delta);
      _currentRotation.x += (_targetRotation.x - _currentRotation.x) * dampFactor;
      _currentRotation.y += (_targetRotation.y - _currentRotation.y) * dampFactor;

      mainGroup.rotation.x = _currentRotation.x;
      mainGroup.rotation.y = _currentRotation.y + time * 0.15;

      // Gimbal sub-rotations
      coreMesh.rotation.y = -time * 0.35;
      coreMesh.rotation.x = time * 0.2;
      latticeMesh.rotation.y = time * 0.25;

      ring1Mesh.rotation.z = time * 0.2;
      ring2Mesh.rotation.z = -time * 0.25;
      ring3Mesh.rotation.y = time * 0.15;

      particleField.rotation.y = time * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      coreGeo.dispose();
      coreMat.dispose();
      latticeGeo.dispose();
      latticeMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="hero-3d-wrapper position-relative w-100 h-100 d-flex align-items-center justify-content-center">
      {/* Three.js mount point */}
      <div
        ref={mountRef}
        className="hero-3d-canvas"
        style={{ width: '100%', height: '100%', minHeight: '380px' }}
      />
      {/* Floating subtle overlay badge */}
      <div className="hero-3d-badge position-absolute bottom-0 start-50 translate-middle-x mb-3 text-nowrap">
        <span className="font-mono text-xs text-slate-400">
          <i className="bi bi-cpu me-1 text-primary"></i>
          Moteur 3D temps réel · Three.js r160+
        </span>
      </div>
    </div>
  );
};
