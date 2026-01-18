"use client"

import { useEffect, useRef } from 'react'

type Node = {
  x: number
  y: number
  vx: number
  vy: number
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // On mobile, keep things simpler
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
    let width = canvas.clientWidth * dpr
    let height = canvas.clientHeight * dpr
    canvas.width = width
    canvas.height = height

    const nodeCount = prefersReducedMotion ? 0 : isMobile ? 18 : 32
    const particleCount = prefersReducedMotion ? 0 : isMobile ? 12 : 24
    const maxDistance = isMobile ? 110 : 160

    const nodes: Node[] = []
    const particles: Node[] = []

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: rand(0, width),
        y: rand(0, height),
        vx: rand(-0.04, 0.04),
        vy: rand(-0.04, 0.04),
      })
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: rand(0, width),
        y: rand(0, height),
        vx: rand(0.02, 0.06),
        vy: rand(-0.02, -0.06),
      })
    }

    let animationFrame: number

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Very subtle grid
      const gridSpacing = isMobile ? 60 : 70
      ctx.save()
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.10)'
      ctx.lineWidth = 0.3
      for (let x = 0; x < width; x += gridSpacing * dpr) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSpacing * dpr) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
      ctx.restore()

      // Connections between nodes
      ctx.save()
      ctx.lineWidth = 0.5
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j]
          const dx = n1.x - n2.x
          const dy = n1.y - n2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDistance) {
            const alpha = 0.12 * (1 - dist / maxDistance)
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(n1.x, n1.y)
            ctx.quadraticCurveTo(
              (n1.x + n2.x) / 2 + dx * 0.08,
              (n1.y + n2.y) / 2 - dy * 0.08,
              n2.x,
              n2.y
            )
            ctx.stroke()
          }
        }
      }

      // Nodes (glowing points)
      for (const n of nodes) {
        const radial = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 10 * dpr)
        radial.addColorStop(0, 'rgba(129, 140, 248, 0.35)')
        radial.addColorStop(1, 'rgba(129, 140, 248, 0)')
        ctx.fillStyle = radial
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.4 * dpr, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      // Diagonal particles
      ctx.save()
      ctx.fillStyle = 'rgba(56, 189, 248, 0.5)'
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 0.8 * dpr, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      // Update positions
      const tick = prefersReducedMotion ? 0 : 1
      for (const n of nodes) {
        n.x += n.vx * tick
        n.y += n.vy * tick
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
      }

      for (const p of particles) {
        p.x += p.vx * tick
        p.y += p.vy * tick
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
      }

      animationFrame = requestAnimationFrame(draw)
    }

    // Only animate if not reduced motion
    if (!prefersReducedMotion) {
      animationFrame = requestAnimationFrame(draw)
    } else {
      // Still render one frame for the static look
      draw()
    }

    const handleResize = () => {
      width = canvas.clientWidth * dpr
      height = canvas.clientHeight * dpr
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full opacity-70"
      aria-hidden="true"
    />
  )
}



