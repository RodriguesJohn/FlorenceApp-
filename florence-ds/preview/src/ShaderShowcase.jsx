import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import './shader-showcase.css'

const vertexShader = `
  uniform float time;
  uniform float phase;
  uniform float intensity;
  varying vec2 vUv;
  varying float vFold;
  varying float vDepth;

  void main() {
    vUv = uv;

    vec3 pos = position;
    float diagonal = pos.x * 1.25 + pos.y * 1.8;
    float fold = sin(diagonal * 2.15 + phase + time * 0.22);
    float crease = exp(-pow((pos.y + sin(pos.x * 2.0 + phase) * 0.2) * 3.2, 2.0));

    pos.z += fold * 0.1 * intensity;
    pos.z += crease * 0.18 * intensity;
    pos.x += sin(pos.y * 2.4 + phase + time * 0.14) * 0.035 * intensity;

    vFold = fold;
    vDepth = pos.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform float phase;
  uniform float intensity;
  uniform vec3 surfaceColor;
  uniform vec3 highlightColor;
  uniform vec3 inkColor;
  uniform vec3 accentColor;
  uniform vec3 accentAltColor;
  varying vec2 vUv;
  varying float vFold;
  varying float vDepth;

  void main() {
    float sweep = sin(
      vUv.x * 8.0
      + vUv.y * 5.0
      + phase
      + time * 0.16
    );
    float foldLight = smoothstep(-0.7, 0.85, vFold + sweep * 0.18);
    float sheen = pow(
      max(0.0, 1.0 - abs(vFold + vDepth * 2.5)),
      5.0
    );
    float edge = 1.0 - smoothstep(-0.035, 0.0, shape);
    float chromaBand = pow(
      max(0.0, 1.0 - abs(vFold * 5.0 + sweep * 0.55)),
      7.0
    );
    float across = 1.0 - abs(vUv.y * 2.0 - 1.0);
    float along = sin(vUv.x * 3.14159265);
    float edge = 1.0 - smoothstep(0.0, 0.18, across);

    vec3 color = mix(inkColor, surfaceColor, foldLight);
    color = mix(color, highlightColor, sheen * 0.8 * intensity);
    color = mix(color, accentColor, chromaBand * 0.82);
    color = mix(color, accentAltColor, chromaBand * edge * 0.55);
    color = mix(color, highlightColor, edge * 0.42);

    float alpha = smoothstep(0.0, 0.08, across)
      * smoothstep(0.0, 0.08, along);
    if (alpha < 0.01) discard;

    gl_FragColor = vec4(color, alpha);
  }
`

const SEMANTIC_PALETTE = {
  surfaceColor: '--color-bg-page',
  highlightColor: '--color-text-inverse',
  inkColor: '--color-fill-strong',
  accentColor: '--color-fill-brand',
  accentAltColor: '--color-status-info',
}

const RIBBONS = [
  {
    id: 'north-west',
    position: [-0.72, 0.76, 0.02],
    rotation: [0.18, -0.12, -0.42],
    scale: [1.18, 0.82, 1],
    phase: 0.2,
  },
  {
    id: 'north-east',
    position: [0.66, 0.78, 0.06],
    rotation: [-0.12, 0.2, 0.5],
    scale: [1.08, 0.7, 1],
    phase: 1.15,
  },
  {
    id: 'east',
    position: [1.02, -0.08, 0.1],
    rotation: [0.14, -0.16, 1.18],
    scale: [1.02, 0.72, 1],
    phase: 2.1,
  },
  {
    id: 'south-east',
    position: [0.48, -0.82, 0.14],
    rotation: [-0.18, 0.12, 2.42],
    scale: [1.16, 0.76, 1],
    phase: 3.05,
  },
  {
    id: 'south-west',
    position: [-0.68, -0.72, 0.18],
    rotation: [0.16, 0.14, -2.36],
    scale: [1.08, 0.72, 1],
    phase: 4.0,
  },
  {
    id: 'west',
    position: [-1.06, 0.02, 0.22],
    rotation: [-0.14, -0.18, -1.22],
    scale: [1.02, 0.7, 1],
    phase: 4.95,
  },
]

const ACCENTS = [
  {
    id: 'accent-top',
    position: [0.08, 1.5, -0.12],
    rotation: [0.08, -0.1, 0.08],
    scale: [0.48, 0.38, 1],
    phase: 1.7,
  },
  {
    id: 'accent-right',
    position: [1.58, 0.64, -0.1],
    rotation: [-0.08, 0.12, 0.88],
    scale: [0.42, 0.34, 1],
    phase: 2.8,
  },
  {
    id: 'accent-bottom',
    position: [-0.02, -1.52, -0.08],
    rotation: [0.12, 0.08, -0.12],
    scale: [0.54, 0.38, 1],
    phase: 4.2,
  },
  {
    id: 'accent-left',
    position: [-1.58, -0.48, -0.06],
    rotation: [-0.1, -0.08, 0.8],
    scale: [0.4, 0.32, 1],
    phase: 5.4,
  },
]

function createRibbonGeometry(segments = 72) {
  const positions = []
  const uvs = []
  const indices = []

  for (let index = 0; index <= segments; index += 1) {
    const progress = index / segments
    const x = THREE.MathUtils.lerp(-1, 1, progress)
    const centerY =
      Math.sin(progress * Math.PI * 2) * 0.16
      + Math.sin(progress * Math.PI) * 0.12
    const derivativeY =
      Math.cos(progress * Math.PI * 2) * Math.PI * 0.16
      + Math.cos(progress * Math.PI) * Math.PI * 0.06
    const normal = new THREE.Vector2(-derivativeY, 1).normalize()
    const taper = Math.pow(Math.sin(progress * Math.PI), 0.58)
    const halfWidth = 0.055 + taper * 0.34

    positions.push(
      x + normal.x * halfWidth,
      centerY + normal.y * halfWidth,
      0,
      x - normal.x * halfWidth,
      centerY - normal.y * halfWidth,
      0,
    )
    uvs.push(progress, 1, progress, 0)

    if (index < segments) {
      const offset = index * 2
      indices.push(
        offset,
        offset + 1,
        offset + 2,
        offset + 2,
        offset + 1,
        offset + 3,
      )
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3),
  )
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()

  return geometry
}

function resolveSemanticColor(styles, token) {
  let value = styles.getPropertyValue(token).trim()

  for (let depth = 0; depth < 8; depth += 1) {
    const reference = value.match(/^var\((--[^,)]+)\)$/)
    if (!reference) break
    value = styles.getPropertyValue(reference[1]).trim()
  }

  return new THREE.Color(value)
}

function useSemanticPalette() {
  const [palette, setPalette] = useState(() =>
    Object.fromEntries(
      Object.keys(SEMANTIC_PALETTE).map((key) => [key, new THREE.Color()]),
    ),
  )

  useEffect(() => {
    const updatePalette = () => {
      const styles = getComputedStyle(document.documentElement)
      setPalette(
        Object.fromEntries(
          Object.entries(SEMANTIC_PALETTE).map(([key, token]) => [
            key,
            resolveSemanticColor(styles, token),
          ]),
        ),
      )
    }

    updatePalette()

    const observer = new MutationObserver(updatePalette)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  return palette
}

function ShaderRibbon({
  palette,
  position,
  rotation,
  scale,
  phase,
  animate,
}) {
  const mesh = useRef(null)
  const geometry = useMemo(() => createRibbonGeometry(), [])
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      phase: { value: phase },
      intensity: { value: 1 },
      surfaceColor: { value: palette.surfaceColor.clone() },
      highlightColor: { value: palette.highlightColor.clone() },
      inkColor: { value: palette.inkColor.clone() },
      accentColor: { value: palette.accentColor.clone() },
      accentAltColor: { value: palette.accentAltColor.clone() },
    }),
    [
      palette.accentAltColor,
      palette.accentColor,
      palette.highlightColor,
      palette.inkColor,
      palette.surfaceColor,
      phase,
    ],
  )

  useFrame((state) => {
    if (!animate || !mesh.current) return

    uniforms.time.value = state.clock.elapsedTime
    uniforms.intensity.value =
      0.9 + Math.sin(state.clock.elapsedTime * 0.42 + phase) * 0.1
  })

  return (
    <mesh
      ref={mesh}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <primitive object={geometry} attach="geometry" />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

function ShaderScene({ animate, palette }) {
  const group = useRef(null)

  useFrame((state) => {
    if (!animate || !group.current) return
    group.current.rotation.z =
      -0.08 + Math.sin(state.clock.elapsedTime * 0.12) * 0.035
    group.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.09) * 0.025
  })

  return (
    <group ref={group} rotation={[0, 0, -0.08]}>
      {ACCENTS.map((tile) => (
        <ShaderRibbon
          key={tile.id}
          {...tile}
          palette={palette}
          animate={animate}
        />
      ))}

      {RIBBONS.map((tile) => (
        <ShaderRibbon
          key={tile.id}
          {...tile}
          palette={palette}
          animate={animate}
        />
      ))}
    </group>
  )
}

export function ShaderShowcase() {
  const [animate, setAnimate] = useState(true)
  const palette = useSemanticPalette()

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setAnimate(!media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return (
    <aside className="shader-showcase" aria-hidden="true">
      <Canvas
        className="shader-showcase__canvas"
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.4], fov: 44 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ShaderScene animate={animate} palette={palette} />
      </Canvas>
    </aside>
  )
}
