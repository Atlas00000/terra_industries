"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useOptimizedAnimations } from "@/utils/animation-utils"

// Helper function to generate consistent particle positions
const generateParticlePositions = (count: number) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    const hash = (i * 2654435761) % 1000000;
    positions.push({
      left: (hash % 90) + 5,
      top: ((hash * 7) % 90) + 5,
      duration: 4 + (i % 2),
      delay: (i % 3) * 0.8
    });
  }
  return positions;
};

export function ArtemisHeroSection() {
  const { isMobile, isReducedMotion, getParticleCount } = useMobileOptimization()
  const { fadeInUp, particleAnimation, particleTransition } = useOptimizedAnimations()
  const particleCount = getParticleCount()
  
  const particlePositions = useMemo(() => generateParticlePositions(particleCount), [particleCount])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic AI Network Background */}
      <div className="absolute inset-0">
        {/* Neural Network Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(74, 144, 226, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(0, 255, 127, 0.2) 0%, transparent 50%)
            `
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Data Nodes */}
        {!isReducedMotion && particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-primary to-purple-500 rounded-full"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
            animate={particleAnimation}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay
            }}
          />
        ))}

        {/* Connection Lines */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 48%, rgba(74, 144, 226, 0.1) 49%, rgba(74, 144, 226, 0.1) 51%, transparent 52%),
              linear-gradient(-45deg, transparent 48%, rgba(138, 43, 226, 0.1) 49%, rgba(138, 43, 226, 0.1) 51%, transparent 52%)
            `,
            backgroundSize: '100px 100px'
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0px 0px', '100px 100px']
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      <div className="relative z-10 max-w-[80vw] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            className="space-y-8"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-purple-500/10 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-3 h-3 bg-gradient-to-r from-primary to-purple-500 rounded-full"
                animate={isReducedMotion ? {} : { 
                  scale: [1, 1.3, 1], 
                  opacity: [1, 0.7, 1] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-primary">AI-Powered Intelligence Platform</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="block">ArtemisOS</span>
              <span className="block bg-gradient-to-r from-primary via-purple-500 to-green-400 bg-clip-text text-transparent">
                Central Intelligence
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              The flagship AI-powered operating system serving as the central intelligence platform 
              for all autonomous defense systems. Real-time threat detection, autonomous mission 
              planning, and fleet management capabilities.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30">
                <div className="text-2xl font-bold text-primary">&lt;1s</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
              <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500/20 to-green-400/20 border border-purple-500/30">
                <div className="text-2xl font-bold text-purple-500">99.5%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-green-400/20 to-primary/20 border border-green-400/30">
                <div className="text-2xl font-bold text-green-400">1000+</div>
                <div className="text-sm text-muted-foreground">Systems</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-96 lg:h-[500px]">
              <Image
                src="/ArtemisOS/autonomous_mission_planning.png"
                alt="ArtemisOS AI Intelligence Platform"
                fill
                className="object-cover rounded-3xl"
                priority
              />
              
              {/* Overlay with AI Network Visualization */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-3xl" />
              
              {/* Floating AI Nodes */}
              {!isReducedMotion && (
                <>
                  <motion.div
                    className="absolute top-8 left-8 w-4 h-4 bg-primary rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute top-16 right-12 w-3 h-3 bg-purple-500 rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute bottom-20 left-16 w-5 h-5 bg-green-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
                  />
                </>
              )}
              
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-2xl font-bold">ArtemisOS Dashboard</div>
                <div className="text-sm opacity-90">Real-time AI Operations</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
