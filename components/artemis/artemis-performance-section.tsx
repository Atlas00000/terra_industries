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

export function ArtemisPerformanceSection() {
  const { isMobile, isReducedMotion, getParticleCount } = useMobileOptimization()
  const { fadeInUp, staggerContainer, staggerItem, particleAnimation } = useOptimizedAnimations()
  const particleCount = getParticleCount()
  
  const particlePositions = useMemo(() => generateParticlePositions(particleCount), [particleCount])

  const performanceMetrics = [
    {
      title: "Processing Power",
      value: "1000+ TOPS",
      description: "Neural network processing power for real-time AI operations",
      color: "primary",
      icon: "⚡"
    },
    {
      title: "Response Time",
      value: "<1 second",
      description: "Ultra-fast threat detection and response capabilities",
      color: "green",
      icon: "🚀"
    },
    {
      title: "Accuracy Rate",
      value: "99.5%",
      description: "Exceptional accuracy in threat detection and classification",
      color: "blue",
      icon: "🎯"
    },
    {
      title: "System Uptime",
      value: "99.9%",
      description: "Reliable 24/7 operation with minimal downtime",
      color: "purple",
      icon: "⏰"
    },
    {
      title: "Neural Layers",
      value: "50+",
      description: "Deep learning architecture for complex pattern recognition",
      color: "orange",
      icon: "🧠"
    },
    {
      title: "Training Data",
      value: "10M+",
      description: "Extensive training dataset for superior AI performance",
      color: "red",
      icon: "📊"
    }
  ]

  return (
    <section className="relative py-24 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Performance Visualization Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-10"
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
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        
        {/* Floating Performance Indicators */}
        {!isReducedMotion && particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary to-green-400 rounded-full"
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
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-green-400/10 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-3 h-3 bg-gradient-to-r from-primary to-green-400 rounded-full"
              animate={isReducedMotion ? {} : { 
                scale: [1, 1.3, 1], 
                opacity: [1, 0.7, 1] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary">Performance Metrics</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Exceptional</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
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
            Industry-leading performance metrics that demonstrate the superior capabilities 
            of ArtemisOS in real-world defense applications
          </motion.p>
        </motion.div>

        {/* Performance Metrics Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
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
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-green-400 flex items-center justify-center mb-6"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-2xl">{metric.icon}</span>
                </motion.div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {metric.title}
                </h3>
                
                <motion.div
                  className="text-3xl md:text-4xl font-black text-primary mb-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {metric.value}
                </motion.div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {metric.description}
                </p>
              </div>
              
              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Performance Comparison */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-card/50 to-card/30 rounded-3xl border border-border/20 p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Performance Comparison</h3>
            <p className="text-muted-foreground">
              ArtemisOS outperforms traditional defense systems in key metrics
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10x</div>
              <div className="text-sm text-muted-foreground">Faster Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">5x</div>
              <div className="text-sm text-muted-foreground">Higher Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">3x</div>
              <div className="text-sm text-muted-foreground">Better Efficiency</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
