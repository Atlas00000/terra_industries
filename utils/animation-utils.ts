import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

export function useOptimizedAnimations() {
  const { isReducedMotion, isMobile } = useMobileOptimization()

  // Base animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: isReducedMotion ? 0 : 0.6, ease: "easeOut" },
    viewport: { once: true }
  }

  const staggerContainer = {
    initial: "initial",
    whileInView: "animate",
    viewport: { once: true }
  }

  const staggerItem = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: isReducedMotion ? 0 : 0.5, ease: "easeOut" }
  }

  // Particle animation
  const particleAnimation = isReducedMotion ? {} : {
    y: [0, -100, 0],
    opacity: [0, 1, 0],
    scale: [0, 1, 0]
  }

  const particleTransition = {
    duration: isReducedMotion ? 0 : 3,
    repeat: isReducedMotion ? 0 : Infinity,
    ease: "easeInOut"
  }

  return {
    fadeInUp,
    staggerContainer,
    staggerItem,
    particleAnimation,
    particleTransition
  }
}