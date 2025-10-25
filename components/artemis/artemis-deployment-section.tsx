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

export function ArtemisDeploymentSection() {
  const { isMobile, isReducedMotion, getParticleCount } = useMobileOptimization()
  const { fadeInUp, staggerContainer, staggerItem, particleAnimation } = useOptimizedAnimations()
  const particleCount = getParticleCount()
  
  const particlePositions = useMemo(() => generateParticlePositions(particleCount), [particleCount])

  const deploymentCases = [
    {
      title: "Critical Infrastructure Protection",
      description: "Protecting $13+ billion in critical infrastructure across Africa with real-time threat detection and automated response systems.",
      metrics: ["$13B+ Protected", "99.5% Accuracy", "24/7 Monitoring", "Real-time Response"],
      color: "primary",
      icon: "🏗️"
    },
    {
      title: "Border Security Operations",
      description: "Advanced border monitoring with autonomous patrol systems and intelligent threat detection capabilities.",
      metrics: ["1000+ km Coverage", "24/7 Operations", "Autonomous Patrols", "Threat Detection"],
      color: "blue",
      icon: "🛡️"
    },
    {
      title: "Urban Security Networks",
      description: "Comprehensive urban security with integrated surveillance, communication, and response systems.",
      metrics: ["Multi-City Coverage", "Integrated Systems", "Real-time Alerts", "Coordinated Response"],
      color: "green",
      icon: "🏙️"
    },
    {
      title: "Maritime Defense",
      description: "Coastal and maritime security with advanced radar systems and autonomous patrol capabilities.",
      metrics: ["Coastal Coverage", "Maritime Patrols", "Radar Systems", "Autonomous Operations"],
      color: "purple",
      icon: "🌊"
    }
  ]

  return (
    <section className="relative py-24 bg-gradient-to-b from-charcoal via-background to-charcoal overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Deployment Network Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0px 0px', '100px 100px']
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
        {/* Floating Deployment Nodes */}
        {!isReducedMotion && particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full"
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
            <span className="text-sm font-medium text-primary">Real-World Deployment</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Proven</span>
            <span className="block bg-gradient-to-r from-primary via-blue-500 to-green-400 bg-clip-text text-transparent">
              Performance
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            ArtemisOS is actively deployed across Africa, protecting critical infrastructure 
            and providing real-world defense solutions with proven results
          </motion.p>
        </motion.div>

        {/* Deployment Cases Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {deploymentCases.map((deployment, index) => (
            <motion.div
              key={deployment.title}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 p-8 backdrop-blur-sm"
              variants={staggerItem}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/10"
                animate={isReducedMotion ? {} : {
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3 + index * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1
                }}
              />
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center mb-6"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-2xl">{deployment.icon}</span>
                </motion.div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {deployment.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {deployment.description}
                </p>
                
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  {deployment.metrics.map((metric, mIndex) => (
                    <motion.div
                      key={mIndex}
                      className="text-center p-3 rounded-xl bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * mIndex, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-sm font-bold text-primary">{metric}</div>
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

        {/* Deployment Statistics */}
        <motion.div
          className="bg-gradient-to-r from-card/50 to-card/30 rounded-3xl border border-border/20 p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-4">Deployment Statistics</h3>
            <p className="text-muted-foreground">
              Real-world performance metrics from active ArtemisOS deployments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <motion.div
                className="text-4xl md:text-5xl font-black text-primary mb-2"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
              >
                $13B+
              </motion.div>
              <div className="text-sm text-muted-foreground">Infrastructure Protected</div>
            </div>
            
            <div className="text-center">
              <motion.div
                className="text-4xl md:text-5xl font-black text-blue-500 mb-2"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                viewport={{ once: true }}
              >
                1000+
              </motion.div>
              <div className="text-sm text-muted-foreground">Systems Deployed</div>
            </div>
            
            <div className="text-center">
              <motion.div
                className="text-4xl md:text-5xl font-black text-green-400 mb-2"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                viewport={{ once: true }}
              >
                99.5%
              </motion.div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            
            <div className="text-center">
              <motion.div
                className="text-4xl md:text-5xl font-black text-purple-500 mb-2"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                24/7
              </motion.div>
              <div className="text-sm text-muted-foreground">Operations</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
