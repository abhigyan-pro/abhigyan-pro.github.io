import { useEffect, useRef } from 'react'
import styles from './NeuralBackground.module.css'

// Subtle animated "neural network": drifting nodes connected by thin lines.
// Sized to its parent, accent-tinted, and static under reduced-motion.
export default function NeuralBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const COLOR = '90, 150, 255' // accent-ish blue
    const MAX_DIST = 135

    let width = 0
    let height = 0
    let nodes = []
    let raf = 0

    function resize() {
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(70, Math.max(22, Math.round((width * height) / 22000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < MAX_DIST) {
            ctx.strokeStyle = `rgba(${COLOR}, ${(1 - d / MAX_DIST) * 0.32})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${COLOR}, 0.85)`
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function step() {
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x <= 0 || n.x >= width) n.vx *= -1
        if (n.y <= 0 || n.y >= height) n.vy *= -1
      }
      draw()
      raf = requestAnimationFrame(step)
    }

    resize()
    if (reduce) draw()
    else raf = requestAnimationFrame(step)

    const ro = new ResizeObserver(resize)
    ro.observe(parent)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
