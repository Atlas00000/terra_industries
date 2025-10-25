"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

export function ArtemisIntegrationSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()

  const integratedSystems = [
    {
      name: "Archer VTOL",
      description: "Vertical takeoff and landing drone with autonomous flight capabilities",
      features: ["Autonomous Flight", "Precision Landing", "Extended Range", "Payload Management"],
      color: "blue"
    },
    {
      name: "Iroko UAV",
      description: "High-performance unmanned aerial vehicle for intelligence and surveillance",
      features: ["ISR Operations", "Long Endurance", "Multi-Sensor", "Real-time Data"],
      color: "green"
    },
    {
      name: "Duma UGV",
      description: "Autonomous ground vehicle for ground-based security operations",
      features: ["All-Terrain", "Autonomous Navigation", "Weapon Systems", "Hazardous Ops"],
      color: "orange"
    },
    {
      name: "Kallon Tower",
      description: "Surveillance and communication tower with 360-degree monitoring",
      features: ["360° Monitoring", "Radar Systems", "Communication", "Edge AI"],
      color: "purple"
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
            <span className="text-sm font-medium text-primary">System Integration</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Seamless</span>
            <span className="block bg-gradient-to-r from-primary via-blue-500 to-green-400 bg-clip-text text-transparent">
              Integration
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            ArtemisOS serves as the central intelligence platform, seamlessly integrating 
            with all defense systems to create a unified, coordinated defense network
          </motion.p>
        </motion.div>

        {/* Integration Visualization */}
        <motion.div
          className="relative mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Central ArtemisOS Node */}
          <div className="relative flex items-center justify-center mb-16">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center border-4 border-white/20 shadow-2xl">
              <span className="text-2xl font-bold text-white">AI</span>
            </div>
            
            <div className="absolute -bottom-8 text-center">
              <div className="text-lg font-bold text-foreground">ArtemisOS</div>
              <div className="text-sm text-muted-foreground">Central Intelligence</div>
            </div>
          </div>

          {/* Connected Systems */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {integratedSystems.map((system, index) => (
              <motion.div
                key={system.name}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="group relative overflow-hidden rounded-2xl bg-card/50 border border-border/20 p-6 backdrop-blur-sm"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/10" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center mb-4">
                      <div className="w-6 h-6 bg-white rounded-lg" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {system.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {system.description}
                    </p>
                    
                    <div className="space-y-2">
                      {system.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span className="text-xs text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Integration Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="text-center p-8 rounded-2xl bg-primary/10 border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔄</span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Unified Control</h3>
            <p className="text-muted-foreground">
              Single platform to control and coordinate all defense systems with real-time synchronization
            </p>
          </motion.div>

          <motion.div
            className="text-center p-8 rounded-2xl bg-green-400/10 border border-green-400/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-primary flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Real-time Communication</h3>
            <p className="text-muted-foreground">
              Instant data sharing and communication between all systems for coordinated operations
            </p>
          </motion.div>

          <motion.div
            className="text-center p-8 rounded-2xl bg-purple-500/10 border border-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🧠</span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Intelligent Coordination</h3>
            <p className="text-muted-foreground">
              AI-powered decision making that optimizes system performance and mission outcomes
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
