"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import Image from "next/image"

export function ArtemisHeroSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5" />
      
      <div className="relative z-10 max-w-[80vw] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-3 h-3 bg-primary rounded-full" />
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
              <div className="px-6 py-3 rounded-2xl bg-primary/20 border border-primary/30">
                <div className="text-2xl font-bold text-primary">&lt;1s</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
              <div className="px-6 py-3 rounded-2xl bg-purple-500/20 border border-purple-500/30">
                <div className="text-2xl font-bold text-purple-500">99.5%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="px-6 py-3 rounded-2xl bg-green-400/20 border border-green-400/30">
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
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-3xl" />
              
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
