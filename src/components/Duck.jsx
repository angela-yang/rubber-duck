import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getCachedDuck } from "../utils/preloader";

export default function Duck({ skin, scale, squeezed, onClick, glbUrl, rotating }) {
  const mountRef = useRef(null);
  const duckGroupRef = useRef(null);
  const animFrameRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const rotatingRef = useRef(rotating); 
  const sceneReadyRef = useRef(false);

  useEffect(() => { rotatingRef.current = rotating; }, [rotating]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const W = mount.clientWidth, H = mount.clientHeight;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0.1, 3.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const dir = new THREE.DirectionalLight(0xffffff, 1.7);
    dir.position.set(3, 5, 3);
    dir.castShadow = true;
    scene.add(dir);

    const blob = new THREE.Mesh(
      new THREE.CircleGeometry(0.55, 32),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.08 })
    );
    blob.rotation.x = -Math.PI / 2;
    blob.position.y = -0.86;
    scene.add(blob);

    const duckGroup = new THREE.Group();
    scene.add(duckGroup);
    duckGroupRef.current = duckGroup;

    mount._renderer = renderer;
    mount._camera = camera;
    mount._scene = scene;
    sceneReadyRef.current = true;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const t = clockRef.current.getElapsedTime();
      if (rotatingRef.current) {
        duckGroup.rotation.y = t * 0.9;
        duckGroup.position.y = Math.sin(t * 1.2) * 0.04;
      } else {
        duckGroup.rotation.y = THREE.MathUtils.lerp(duckGroup.rotation.y, -1.57, 0.05);
        duckGroup.position.y = Math.sin(t * 1.2) * 0.06;
      }
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      sceneReadyRef.current = false;
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const group = duckGroupRef.current;
    if (!group) return;

    // Clear previous model
    while (group.children.length) group.remove(group.children[0]);

    const tryLoad = () => {
      const gltf = getCachedDuck(glbUrl);
      if (!gltf) return false;

      const model = gltf.scene.clone(true);
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const max = Math.max(size.x, size.y, size.z);
      model.scale.setScalar(2 / max);
      model.position.sub(box.getCenter(new THREE.Vector3()).multiplyScalar(2 / max));

      const bbox2 = new THREE.Box3().setFromObject(model);
      model.position.y -= bbox2.min.y + 0.86;

      model.traverse(c => { if (c.isMesh) c.castShadow = true; });
      group.add(model);
      group.rotation.y = -1.57;
      group.scale.setScalar(scale);
      return true;
    };

    if (!tryLoad()) {
      let attempts = 0;
      const retry = setInterval(() => {
        attempts++;
        if (tryLoad() || attempts > 20) clearInterval(retry);
      }, 100);
      return () => clearInterval(retry);
    }
  }, [glbUrl]);

  // Squeeze animation
  useEffect(() => {
    if (!squeezed || !duckGroupRef.current) return;
    const group = duckGroupRef.current;
    const start = performance.now();
    const tick  = (now) => {
      const t = (now - start) / 200;
      if (t < 1) {
        const s = 1 - Math.sin(t * Math.PI) * 0.15;
        group.scale.set(s * 1.1, s * 0.95, s * 1.1);
        requestAnimationFrame(tick);
      } else {
        group.scale.setScalar(scale);
      }
    };
    requestAnimationFrame(tick);
  }, [squeezed]);

  useEffect(() => {
    duckGroupRef.current?.scale.setScalar(scale);
  }, [scale]);

  return (
    <div
      ref={mountRef}
      onClick={onClick}
      style={{ width: "100%", height: "100%", cursor: rotating ? "default" : "pointer" }}
    />
  );
}