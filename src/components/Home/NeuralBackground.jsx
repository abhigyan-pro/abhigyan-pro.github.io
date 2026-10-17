import { useEffect, useRef } from 'react'
import styles from './NeuralBackground.module.css'

// Hero background that adapts to the theme:
//   dark  -> drifting "neural network" of connected nodes
//   light -> slowly spinning spiral galaxy
//
// Intensity can be set per-mode:
//   showy        -> shorthand: both modes bold
//   showyGalaxy  -> bold galaxy (light)
//   showyNeural  -> bold neural (dark)
//   neuralSpeed / galaxySpeed -> motion multipliers
export default function NeuralBackground({
  showy = false,
  showyGalaxy = showy,
  showyNeural = showy,
  neuralSpeed = 1,
  galaxySpeed = 1,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const makeF = (sy) =>
      sy
        ? {
            neuralDiv: 15000,
            neuralVel: 0.42,
            lineAlpha: 0.5,
            nodeR: 2.1,
            maxDist: 160,
            galaxyDiv: 2200,
            galaxyCap: 650,
            starAlphaScale: 0.7,
            starAlphaBase: 0.2,
            rot: 0.002,
            glowAlpha: 0.26,
          }
        : {
            neuralDiv: 22000,
            neuralVel: 0.22,
            lineAlpha: 0.32,
            nodeR: 1.6,
            maxDist: 135,
            galaxyDiv: 3200,
            galaxyCap: 420,
            starAlphaScale: 0.5,
            starAlphaBase: 0.12,
            rot: 0.0009,
            glowAlpha: 0.16,
          }

    const getMode = () =>
      document.documentElement.getAttribute('data-theme') === 'dark'
        ? 'neural'
        : 'galaxy'
    const curShowy = () => (mode === 'neural' ? showyNeural : showyGalaxy)

    let mode = getMode()
    let F = makeF(curShowy())
    let width = 0
    let height = 0
    let nodes = []
    let stars = []
    let rot = 0
    let raf = 0

    function applyOpacity() {
      canvas.style.opacity =
        mode === 'neural'
          ? showyNeural
            ? 0.9
            : 0.65
          : showyGalaxy
            ? 0.85
            : 0.55
    }

    function build() {
      F = makeF(curShowy())
      if (mode === 'neural') {
        const count = Math.min(110, Math.max(22, Math.round((width * height) / F.neuralDiv)))
        nodes = Array.from({ length: count }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * F.neuralVel * neuralSpeed,
          vy: (Math.random() - 0.5) * F.neuralVel * neuralSpeed,
        }))
      } else {
        const maxR = Math.min(
          Math.hypot(width, height) * 0.46,
          Math.min(width, height) * 0.72,
        )
        const ARMS = 2
        const WIND = 3.6
        const gauss = () =>
          (Math.random() + Math.random() + Math.random() - 1.5) / 1.5
        const count = Math.min(
          F.galaxyCap,
          Math.max(240, Math.round((width * height) / F.galaxyDiv)),
        )
        stars = []
        for (let i = 0; i < count; i++) {
          if (Math.random() < 0.34) {
            const r = Math.abs(gauss()) * maxR * 0.13
            stars.push({
              radius: r,
              angle: Math.random() * Math.PI * 2,
              size: Math.random() * 1.1 + 0.7,
              alpha: 0.42 + Math.random() * 0.3,
            })
          } else {
            const arm = Math.floor(Math.random() * ARMS)
            const u = Math.pow(Math.random(), 0.85)
            const angle =
              arm * ((2 * Math.PI) / ARMS) + u * WIND + gauss() * 0.22 * (0.35 + u)
            stars.push({
              radius: u * maxR + gauss() * maxR * 0.025,
              angle,
              size: Math.random() * 1.1 + 0.35,
              alpha: (1 - u) * F.starAlphaScale + F.starAlphaBase,
            })
          }
        }
      }
    }

    function resize() {
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    function drawNeural() {
      const C = '120, 170, 255'
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < F.maxDist) {
            ctx.strokeStyle = `rgba(${C}, ${(1 - d / F.maxDist) * F.lineAlpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${C}, 0.9)`
        ctx.beginPath()
        ctx.arc(n.x, n.y, F.nodeR, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawGalaxy() {
      const cx = width / 2
      const cy = height * 0.42
      const C = '46, 60, 140'

      const R = Math.min(width, height) * 0.3
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R)
      glow.addColorStop(0, `rgba(60, 72, 150, ${F.glowAlpha})`)
      glow.addColorStop(0.5, `rgba(60, 72, 150, ${F.glowAlpha * 0.4})`)
      glow.addColorStop(1, 'rgba(60, 72, 150, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      for (const s of stars) {
        const a = s.angle + rot
        const x = cx + s.radius * Math.cos(a)
        const y = cy + s.radius * Math.sin(a)
        ctx.fillStyle = `rgba(${C}, ${s.alpha})`
        ctx.beginPath()
        ctx.arc(x, y, s.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)
      if (mode === 'neural') drawNeural()
      else drawGalaxy()
    }

    function step() {
      if (mode === 'neural') {
        for (const n of nodes) {
          n.x += n.vx
          n.y += n.vy
          if (n.x <= 0 || n.x >= width) n.vx *= -1
          if (n.y <= 0 || n.y >= height) n.vy *= -1
        }
      } else {
        rot += F.rot * galaxySpeed
      }
      draw()
      raf = requestAnimationFrame(step)
    }

    resize()
    applyOpacity()
    if (reduce) draw()
    else raf = requestAnimationFrame(step)

    const ro = new ResizeObserver(resize)
    ro.observe(parent)

    const mo = new MutationObserver(() => {
      const next = getMode()
      if (next !== mode) {
        mode = next
        rot = 0
        build()
        applyOpacity()
        if (reduce) draw()
      }
    })
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      mo.disconnect()
    }
  }, [showy, showyGalaxy, showyNeural, neuralSpeed, galaxySpeed])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
