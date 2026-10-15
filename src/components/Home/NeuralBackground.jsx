import { useEffect, useRef } from 'react'
import styles from './NeuralBackground.module.css'

// Hero background that adapts to the theme:
//   dark  -> drifting "neural network" of connected nodes
//   light -> slowly spinning spiral galaxy
// Accent-tinted, sized to its parent, and static under reduced-motion.
export default function NeuralBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const MAX_DIST = 135

    const getMode = () =>
      document.documentElement.getAttribute('data-theme') === 'dark'
        ? 'neural'
        : 'galaxy'

    let mode = getMode()
    let width = 0
    let height = 0
    let nodes = [] // neural
    let stars = [] // galaxy
    let rot = 0
    let raf = 0

    function build() {
      if (mode === 'neural') {
        const count = Math.min(70, Math.max(22, Math.round((width * height) / 22000)))
        nodes = Array.from({ length: count }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
        }))
      } else {
        const maxR = Math.hypot(width, height) * 0.46
        const ARMS = 3
        const WIND = 3.2 // how tightly arms wind
        const count = Math.min(420, Math.max(160, Math.round((width * height) / 3200)))
        stars = Array.from({ length: count }, () => {
          const t = Math.pow(Math.random(), 0.7) // bias slightly outward
          const arm = Math.floor(Math.random() * ARMS)
          const angle =
            arm * ((2 * Math.PI) / ARMS) +
            t * WIND +
            (Math.random() - 0.5) * 0.5
          return {
            radius: t * maxR,
            angle,
            size: Math.random() * 1.3 + 0.4,
            alpha: (1 - t) * 0.5 + 0.12,
          }
        })
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
          if (d < MAX_DIST) {
            ctx.strokeStyle = `rgba(${C}, ${(1 - d / MAX_DIST) * 0.32})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${C}, 0.85)`
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawGalaxy() {
      const cx = width / 2
      const cy = height / 2
      const C = '46, 60, 140' // indigo, reads on near-white

      // Soft core glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, height * 0.28)
      glow.addColorStop(0, 'rgba(90, 110, 220, 0.16)')
      glow.addColorStop(1, 'rgba(90, 110, 220, 0)')
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
        rot += 0.0009 // slow spin
      }
      draw()
      raf = requestAnimationFrame(step)
    }

    resize()
    if (reduce) draw()
    else raf = requestAnimationFrame(step)

    const ro = new ResizeObserver(resize)
    ro.observe(parent)

    // Swap effect when the theme changes.
    const mo = new MutationObserver(() => {
      const next = getMode()
      if (next !== mode) {
        mode = next
        rot = 0
        build()
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
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
