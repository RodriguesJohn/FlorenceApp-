import React from "react";
import * as THREE from "three";

function createWebGLRenderer(options) {
  try {
    return new THREE.WebGLRenderer(options);
  } catch {
    return null;
  }
}

export default function OfferingShader({
  color1 = "#38bdf8",
  color2 = "#0b1220",
  seed = 0,
  mono = false,
  speed = 1,
  className = "offering-shader"
}) {
  const containerRef = React.useRef(null);

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
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    const vertexShader = `
      precision highp float;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform float time;
      uniform float intensity;
      uniform float seed;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform float mono;
      uniform float speed;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        float t = time * 1.15 * speed + seed * 12.0;

        vec2 w = uv;
        w.x += sin(uv.y * 3.0 + t * 0.9 + seed * 4.0) * 0.30;
        w.y += cos(uv.x * 3.4 - t * 0.8 + seed * 2.3) * 0.30;

        float noise = sin(w.x * 3.2 + t) * cos(w.y * 2.6 + t * 0.8);
        noise += sin(w.x * 4.8 - t * 1.4 + seed) * cos(w.y * 3.6 + t * 1.2) * 0.5;
        noise *= 0.5;

        vec3 blended = mix(color2, color1, noise * 0.5 + 0.5);
        vec3 multi = mix(blended, vec3(1.0), 0.42);
        multi = mix(multi, vec3(1.0), pow(abs(noise), 2.0) * intensity * 0.45);
        vec3 color = mix(multi, blended, mono);

        float shade = smoothstep(0.0, 0.6, vUv.y);
        color *= mix(mix(0.42, 0.82, mono), 1.0, shade);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const uniforms = {
      time: { value: 0 },
      intensity: { value: 1.0 },
      seed: { value: seed },
      color1: { value: new THREE.Color(color1) },
      color2: { value: new THREE.Color(color2) },
      mono: { value: mono ? 1.0 : 0.0 },
      speed: { value: speed }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 32, 32), material);
    scene.add(mesh);

    const onResize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);
    onResize();

    renderer.setAnimationLoop(() => {
      const t = clock.getElapsedTime();
      uniforms.time.value = t;
      uniforms.intensity.value = 1.0 + Math.sin(t * 2.0 * speed) * 0.3;
      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
    };
  }, [color1, color2, seed, mono, speed]);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
