import React from "react";
import * as THREE from "three";

const BOX_SIZE = [1.15, 0.36, 0.82];
const LABEL_FONT = '500 56px Inter, ui-sans-serif, system-ui, sans-serif';

const STATION_LAYOUT = [
  { key: "audit", x: -2, z: -2 },
  { key: "design", x: 2, z: -2 },
  { key: "build", x: 2, z: 2 },
  { key: "ship", x: -2, z: 2 }
];

const LOOP_POINTS = STATION_LAYOUT.map(({ x, z }) => new THREE.Vector3(x, 0.05, z));

function createWebGLRenderer(options) {
  try {
    return new THREE.WebGLRenderer(options);
  } catch {
    return null;
  }
}

function createWireBox(width, height, depth, opacity) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const edges = new THREE.EdgesGeometry(geometry);
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity
  });
  const lines = new THREE.LineSegments(edges, material);
  lines.position.y = height * 0.5;

  return { lines, geometry, edges, material };
}

function drawLabelTexture(canvas, context, texture, text, isActive) {
  const padding = 12;
  context.font = LABEL_FONT;
  const metrics = context.measureText(text);
  canvas.width = Math.ceil(metrics.width + padding * 2);
  canvas.height = 72;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = LABEL_FONT;
  context.fillStyle = isActive ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.46)";
  context.textBaseline = "middle";
  context.textAlign = "left";
  context.fillText(text, padding, canvas.height / 2);
  texture.needsUpdate = true;
}

function createFaceLabel(text) {
  const [width, height, depth] = BOX_SIZE;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  drawLabelTexture(canvas, context, texture, text, false);

  const planeHeight = height * 0.78;
  const planeWidth = planeHeight * (canvas.width / canvas.height);
  const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    side: THREE.FrontSide
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(width * 0.501, height * 0.5, 0);
  mesh.rotation.y = Math.PI / 2;

  return {
    mesh,
    canvas,
    context,
    texture,
    material,
    geometry,
    text,
    isActive: false
  };
}

function getRunnerPosition(progress) {
  const segmentCount = LOOP_POINTS.length;
  const scaled = progress * segmentCount;
  const index = Math.floor(scaled) % segmentCount;
  const local = scaled - Math.floor(scaled);
  const start = LOOP_POINTS[index];
  const end = LOOP_POINTS[(index + 1) % segmentCount];
  return start.clone().lerp(end, local);
}

export function StudioProcessIsoScene({ steps, activeIndex, reducedMotion }) {
  const containerRef = React.useRef(null);
  const activeIndexRef = React.useRef(activeIndex);

  React.useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const renderer = createWebGLRenderer({ antialias: true, alpha: true });
    if (!renderer) {
      container.dataset.webglUnavailable = "true";
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const frustum = 4.15;
    const camera = new THREE.OrthographicCamera(-frustum, frustum, frustum, -frustum, 0.1, 50);
    camera.position.set(6.2, 6.2, 6.2);
    camera.lookAt(0, 0, 0);

    const disposables = [];
    const platforms = STATION_LAYOUT.map((station, index) => {
      const group = new THREE.Group();
      group.position.set(station.x, 0, station.z);

      const { lines, geometry, edges, material } = createWireBox(
        BOX_SIZE[0],
        BOX_SIZE[1],
        BOX_SIZE[2],
        0.22
      );
      group.add(lines);

      const step = steps[index];
      const label = createFaceLabel(step?.name || station.key);
      group.add(label.mesh);

      scene.add(group);

      disposables.push(geometry, edges, material, label.geometry, label.material, label.texture);
      return { group, lines, material, label, index };
    });

    const loopGeometry = new THREE.BufferGeometry().setFromPoints(LOOP_POINTS);
    const loopMaterial = new THREE.LineDashedMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.12,
      dashSize: 0.08,
      gapSize: 0.06
    });
    const loop = new THREE.LineLoop(loopGeometry, loopMaterial);
    loop.computeLineDistances();
    scene.add(loop);
    disposables.push(loopGeometry, loopMaterial);

    const runnerGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const runnerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const runner = new THREE.Mesh(runnerGeometry, runnerMaterial);
    runner.position.copy(LOOP_POINTS[0]);
    runner.position.y = 0.07;
    scene.add(runner);
    disposables.push(runnerGeometry, runnerMaterial);

    const clock = new THREE.Clock();

    const onResize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      const aspect = width / height;
      camera.left = -frustum * aspect;
      camera.right = frustum * aspect;
      camera.top = frustum;
      camera.bottom = -frustum;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);
    onResize();

    renderer.setAnimationLoop(() => {
      const elapsed = clock.getElapsedTime();
      const currentActive = activeIndexRef.current;

      if (!reducedMotion) {
        const progress = (elapsed / 12.8) % 1;
        const runnerPosition = getRunnerPosition(progress);
        runner.position.set(runnerPosition.x, 0.07, runnerPosition.z);
      } else {
        const activePoint = LOOP_POINTS[currentActive] || LOOP_POINTS[0];
        runner.position.set(activePoint.x, 0.07, activePoint.z);
      }

      platforms.forEach((platform) => {
        const isActive = platform.index === currentActive;
        const targetOpacity = isActive ? 0.68 : 0.18;
        platform.material.opacity += (targetOpacity - platform.material.opacity) * 0.1;
        platform.group.position.y = isActive ? 0.05 : 0;

        if (platform.label.isActive !== isActive) {
          platform.label.isActive = isActive;
          drawLabelTexture(
            platform.label.canvas,
            platform.label.context,
            platform.label.texture,
            platform.label.text,
            isActive
          );
        }
      });

      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      disposables.forEach((item) => {
        if (item?.dispose) item.dispose();
      });
      renderer.dispose();
    };
  }, [reducedMotion, steps]);

  return (
    <div
      ref={containerRef}
      className="studio-process-iso-canvas"
      aria-hidden="true"
    />
  );
}
