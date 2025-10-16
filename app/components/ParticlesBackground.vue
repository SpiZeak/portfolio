<template>
  <div
    ref="containerRef"
    class="absolute inset-0 pointer-events-none"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl'

type Vec3 = [number, number, number]

interface ParticlesProps {
  particleCount?: number
  particleSpread?: number
  speed?: number
  particleColors?: string[]
  moveParticlesOnHover?: boolean
  particleHoverFactor?: number
  alphaParticles?: boolean
  particleBaseSize?: number
  sizeRandomness?: number
  cameraDistance?: number
  disableRotation?: boolean
}

const props = withDefaults(defineProps<ParticlesProps>(), {
  particleCount: 200,
  particleSpread: 10,
  speed: 0.1,
  particleColors: () => ['#ffffff'],
  moveParticlesOnHover: false,
  particleHoverFactor: 1,
  alphaParticles: false,
  particleBaseSize: 100,
  sizeRandomness: 1,
  cameraDistance: 20,
  disableRotation: false
})

const containerRef = ref<HTMLDivElement | null>(null)
const mouseRef = ref({ x: 0, y: 0 })

let renderer: Renderer | null = null
let camera: Camera | null = null
let particles: Mesh | null = null
let program: Program | null = null
let animationFrameId: number | null = null
let removeResizeListener: (() => void) | null = null
let mouseListenerAttached = false
let lastTime = 0
let elapsed = 0

const DEFAULT_COLOR = '#ffffff'

const hexToRgb = (hex: string): Vec3 => {
  let normalized = hex.replace(/^#/, '')
  if (normalized.length === 3) {
    normalized = normalized
      .split('')
      .map(segment => segment + segment)
      .join('')
  }
  const int = parseInt(normalized, 16)
  const r = ((int >> 16) & 255) / 255
  const g = ((int >> 8) & 255) / 255
  const b = (int & 255) / 255
  return [r, g, b]
}

const handleMouseMove = (event: MouseEvent) => {
  const container = containerRef.value
  if (!container) {
    return
  }
  const rect = container.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
  mouseRef.value = { x, y }
}

const cleanup = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }

  if (mouseListenerAttached) {
    window.removeEventListener('mousemove', handleMouseMove)
    mouseListenerAttached = false
  }

  if (removeResizeListener) {
    removeResizeListener()
    removeResizeListener = null
  }

  if (renderer) {
    const container = containerRef.value
    const gl = renderer.gl
    if (container && gl.canvas.parentNode === container) {
      container.removeChild(gl.canvas)
    }
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }

  renderer = null
  camera = null
  particles = null
  program = null
  lastTime = 0
  elapsed = 0
}

const initParticles = () => {
  const container = containerRef.value
  if (!container) {
    return
  }

  cleanup()

  renderer = new Renderer({ depth: false, alpha: true })
  const gl = renderer.gl
  container.appendChild(gl.canvas)
  gl.clearColor(0, 0, 0, 0)
  gl.canvas.style.width = '100%'
  gl.canvas.style.height = '100%'
  gl.canvas.style.display = 'block'
  gl.canvas.style.position = 'absolute'
  gl.canvas.style.top = '0'
  gl.canvas.style.left = '0'

  camera = new Camera(gl, { fov: 15 })
  camera.position.set(0, 0, props.cameraDistance)

  const resize = () => {
    if (!container || !renderer || !camera) {
      return
    }

    const width = container.clientWidth || container.offsetWidth || window.innerWidth
    const height = container.clientHeight || container.offsetHeight || window.innerHeight
    renderer.setSize(width, height)
    camera.perspective({ aspect: width / Math.max(height, 1) })
  }

  resize()
  window.addEventListener('resize', resize, false)
  removeResizeListener = () => window.removeEventListener('resize', resize)

  if (props.moveParticlesOnHover && !mouseListenerAttached) {
    window.addEventListener('mousemove', handleMouseMove)
    mouseListenerAttached = true
  }

  const count = props.particleCount
  const positions = new Float32Array(count * 3)
  const randoms = new Float32Array(count * 4)
  const colors = new Float32Array(count * 3)
  const palette = props.particleColors.length > 0 ? props.particleColors : [DEFAULT_COLOR]

  for (let i = 0; i < count; i++) {
    let x: number
    let y: number
    let z: number
    let lengthSquared: number

    do {
      x = Math.random() * 2 - 1
      y = Math.random() * 2 - 1
      z = Math.random() * 2 - 1
      lengthSquared = x * x + y * y + z * z
    } while (lengthSquared > 1 || lengthSquared === 0)

    const radius = Math.cbrt(Math.random())
    positions.set([x * radius, y * radius, z * radius], i * 3)
    randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4)

    const selectedColor = palette[Math.floor(Math.random() * palette.length)] ?? DEFAULT_COLOR
    const rgb = hexToRgb(selectedColor)
    colors.set(rgb, i * 3)
  }

  const geometry = new Geometry(gl, {
    position: { size: 3, data: positions },
    random: { size: 4, data: randoms },
    color: { size: 3, data: colors }
  })

  const vertex = /* glsl */ `
    attribute vec3 position;
    attribute vec4 random;
    attribute vec3 color;

    uniform mat4 modelMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 projectionMatrix;
    uniform float uTime;
    uniform float uSpread;
    uniform float uBaseSize;
    uniform float uSizeRandomness;

    varying vec4 vRandom;
    varying vec3 vColor;

    void main() {
      vRandom = random;
      vColor = color;

      vec3 pos = position * uSpread;
      pos.z *= 10.0;

      vec4 mPos = modelMatrix * vec4(pos, 1.0);
      float t = uTime;
      mPos.x += sin(t * random.z + 6.2831 * random.w) * mix(0.1, 1.5, random.x);
      mPos.y += sin(t * random.y + 6.2831 * random.x) * mix(0.1, 1.5, random.w);
      mPos.z += sin(t * random.w + 6.2831 * random.y) * mix(0.1, 1.5, random.z);

      vec4 mvPos = viewMatrix * mPos;
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
      gl_Position = projectionMatrix * mvPos;
    }
  `

  const fragment = /* glsl */ `
    precision highp float;

    uniform float uTime;
    uniform float uAlphaParticles;

    varying vec4 vRandom;
    varying vec3 vColor;

    void main() {
      vec2 uv = gl_PointCoord.xy;
      float d = length(uv - vec2(0.5));

      if (uAlphaParticles < 0.5) {
        if (d > 0.5) {
          discard;
        }
        gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.2831), 1.0);
      } else {
        float circle = smoothstep(0.5, 0.4, d) * 0.8;
        gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.2831), circle);
      }
    }
  `

  program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uTime: { value: 0 },
      uSpread: { value: props.particleSpread },
      uBaseSize: { value: props.particleBaseSize },
      uSizeRandomness: { value: props.sizeRandomness },
      uAlphaParticles: { value: props.alphaParticles ? 1 : 0 }
    },
    transparent: true,
    depthTest: false
  })

  particles = new Mesh(gl, { mode: gl.POINTS, geometry, program })

  lastTime = performance.now()
  elapsed = 0

  const update = (time: number) => {
    animationFrameId = requestAnimationFrame(update)

    const delta = time - lastTime
    lastTime = time
    elapsed += delta * props.speed

    if (program) {
      program.uniforms.uTime.value = elapsed * 0.001
      program.uniforms.uSpread.value = props.particleSpread
      program.uniforms.uBaseSize.value = props.particleBaseSize
      program.uniforms.uSizeRandomness.value = props.sizeRandomness
      program.uniforms.uAlphaParticles.value = props.alphaParticles ? 1 : 0
    }

    if (particles) {
      if (props.moveParticlesOnHover) {
        particles.position.x = -mouseRef.value.x * props.particleHoverFactor
        particles.position.y = -mouseRef.value.y * props.particleHoverFactor
      } else {
        particles.position.x = 0
        particles.position.y = 0
      }

      if (!props.disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15
        particles.rotation.z += 0.01 * props.speed
      }
    }

    if (renderer && camera && particles) {
      renderer.render({ scene: particles, camera })
    }
  }

  animationFrameId = requestAnimationFrame(update)
}

onMounted(() => {
  initParticles()
})

onUnmounted(() => {
  cleanup()
})

watch(
  () => [
    props.particleCount,
    props.particleSpread,
    props.speed,
    props.particleBaseSize,
    props.sizeRandomness,
    props.alphaParticles,
    props.moveParticlesOnHover,
    props.particleHoverFactor,
    props.disableRotation,
    props.cameraDistance,
    props.particleColors.join(',')
  ],
  () => {
    if (!containerRef.value) {
      return
    }
    initParticles()
  }
)
</script>

<style scoped>
:deep(canvas) {
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
}
</style>
