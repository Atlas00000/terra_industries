"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"
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

export function ArtemisCapabilitiesSection() {
  const { isMobile, isReducedMotion, getParticleCount } = useMobileOptimization()
  const { fadeInUp, staggerContainer, staggerItem, particleAnimation } = useOptimizedAnimations()
  const particleCount = getParticleCount()
  
  const particlePositions = useMemo(() => generateParticlePositions(particleCount), [particleCount])

  const capabilities = [
    {
      title: "Autonomous Mission Planning",
      description: "AI-powered mission planning that analyzes threat levels, environmental conditions, and resource availability to create optimal defense strategies without human intervention.",
      features: [
        "Real-time threat assessment",
        "Environmental analysis",
        "Resource optimization",
        "Mission adaptation"
      ],
      color: "primary",
      icon: "🎯"
    },
    {
      title: "Real-Time Threat Detection",
      description: "Advanced sensor fusion and AI analysis to detect and classify threats in real-time, providing instant alerts and automated response protocols.",
      features: [
        "Multi-sensor fusion",
        "Threat classification",
        "Instant alerts",
        "Automated response"
      ],
      color: "red",
      icon: "🔍"
    },
    {
      title: "Fleet Coordination",
      description: "Intelligent coordination of multiple defense systems, ensuring seamless communication and synchronized operations across all deployed assets.",
      features: [
        "Multi-system coordination",
        "Communication protocols",
        "Synchronized operations",
        "Asset management"
      ],
      color: "blue",
      icon: "🚁"
    },
    {
      title: "AI-Powered Target Identification",
      description: "Machine learning algorithms that identify and classify targets with 99.5% accuracy, distinguishing between threats and non-threats in complex environments.",
      features: [
        "Target classification",
        "99.5% accuracy",
        "Complex environment analysis",
        "Threat differentiation"
      ],
      color: "green",
      icon: "🎯"
    }
  ]

  return (
    <section className="relative py-24 bg-gradient-to-b from-charcoal via-background to-charcoal overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Dynamic Grid Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0px 0px', '60px 60px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
        {/* Floating Data Points */}
        {!isReducedMotion && particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full"
            style={{
              left: pos.left + '%',
              top: pos.top + '%',
            }}
            animate={particleAnimation}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[80vw] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          {...fadeInUp}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-blue-500/10 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-3 h-3 bg-gradient-to-r from-primary to-blue-500 rounded-full"
              animate={isReducedMotion ? {} : { 
                scale: [1, 1.3, 1], 
                opacity: [1, 0.7, 1] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary">Core Capabilities</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">AI-Powered</span>
            <span className="block bg-gradient-to-r from-primary via-blue-500 to-green-400 bg-clip-text text-transparent">
              Defense Systems
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Advanced AI capabilities that enable autonomous decision-making, real-time threat detection, 
            and coordinated defense operations across all deployed systems
          </motion.p>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 p-8 backdrop-blur-sm"
              variants={staggerItem}
              whileHover={{ y: -12, scale: 1.02 }}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/10"
                animate={isReducedMotion ? {} : {
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
              />
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center mb-6"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-3xl">{capability.icon}</span>
                </motion.div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {capability.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {capability.description}
                </p>
                
                {/* Features List */}
                <div className="space-y-3">
                  {capability.features.map((feature, fIndex) => (
                    <motion.div
                      key={fIndex}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * fIndex, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className={`w-2 h-2 bg-${capability.color}-500 rounded-full`} />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <motion.div
              className="text-4xl md:text-5xl font-black text-primary mb-2"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
            >
              &lt;1s
            </motion.div>
            <div className="text-sm text-muted-foreground">Response Time</div>
          </div>
          
          <div className="text-center">
            <motion.div
              className="text-4xl md:text-5xl font-black text-blue-500 mb-2"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              viewport={{ once: true }}
            >
              99.5%
            </motion.div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>
          
          <div className="text-center">
            <motion.div
              className="text-4xl md:text-5xl font-black text-green-400 mb-2"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              viewport={{ once: true }}
            >
              1000+
            </motion.div>
            <div className="text-sm text-muted-foreground">Systems</div>
          </div>
          
          <div className="text-center">
            <motion.div
              className="text-4xl md:text-5xl font-black text-purple-500 mb-2"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              99.9%
            </motion.div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
