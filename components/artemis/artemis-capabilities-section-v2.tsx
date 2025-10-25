"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

export function ArtemisCapabilitiesSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()

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
      color: "primary"
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
      color: "red"
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
      color: "blue"
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
      color: "green"
    }
  ]

  return (
    <section className="relative py-24 bg-gradient-to-b from-charcoal via-background to-charcoal overflow-hidden">
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5" />
      
      <div className="relative z-10 max-w-[80vw] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-3 h-3 bg-primary rounded-full" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              className="group relative overflow-hidden rounded-3xl bg-card/50 border border-border/20 p-8 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Static Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/10" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center mb-6">
                  <div className="w-8 h-8 bg-white rounded-lg" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {capability.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {capability.description}
                </p>
                
                {/* Features List */}
                <div className="space-y-3">
                  {capability.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Performance Metrics */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-primary mb-2">
              &lt;1s
            </div>
            <div className="text-sm text-muted-foreground">Response Time</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-blue-500 mb-2">
              99.5%
            </div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-green-400 mb-2">
              1000+
            </div>
            <div className="text-sm text-muted-foreground">Systems</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-purple-500 mb-2">
              99.9%
            </div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
