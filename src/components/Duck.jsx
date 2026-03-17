import { useEffect, useRef } from "react";
import * as THREE from "three";
import { loadDuck } from "../utils/preloader";

export default function Duck({ skin, scale, squeezed, onClick, glbUrl }) {
  const mountRef = useRef(null);
  const duckGroupRef = useRef(null);
  const animFrameRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());

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
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const dir = new THREE.DirectionalLight(0xffffff, 1.7);
    dir.position.set(3, 5, 3);
    scene.add(dir);

    const duckGroup = new THREE.Group();
    scene.add(duckGroup);
    duckGroupRef.current = duckGroup;

    loadDuck(glbUrl, (gltf) => {
      const model = gltf.scene.clone(true);
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const max = Math.max(size.x, size.y, size.z);
      model.scale.setScalar(2 / max);
      model.position.sub(box.getCenter(new THREE.Vector3()).multiplyScalar(2 / max));
      duckGroup.add(model);
      duckGroup.rotation.y = -1.57;
    });

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const t = clockRef.current.getElapsedTime();
      duckGroup.position.y = Math.sin(t * 1.2) * 0.08;
      duckGroup.rotation.y = t + 0.5;
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
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [glbUrl]);

  // squeeze animation
  useEffect(() => {
    if (!squeezed || !duckGroupRef.current) return;
    const group = duckGroupRef.current;
    const start = performance.now();
    const tick = (now) => {
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

  return <div ref={mountRef} onClick={onClick} style={{ width: "100%", height: "100%", cursor: "pointer" }} />;
}