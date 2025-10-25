"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

export function ArtemisIntelligenceSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()

  return (
    <section className="relative py-24 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5" />
      
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
            <span className="text-sm font-medium text-primary">AI Intelligence Core</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Neural Network</span>
            <span className="block bg-gradient-to-r from-primary via-purple-500 to-green-400 bg-clip-text text-transparent">
              Architecture
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Advanced AI processing with 1000+ TOPS computing power, 50+ neural network layers, 
            and 10M+ training samples for autonomous decision-making and threat detection
          </motion.p>
        </motion.div>

        {/* AI Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Neural Processing */}
          <motion.div
            className="group relative overflow-hidden rounded-3xl bg-card/50 border border-border/20 p-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/10" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mb-6">
                <div className="w-8 h-8 bg-white rounded-lg" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">Neural Processing</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                50+ layer deep neural network with 1000+ TOPS processing power for 
                real-time AI decision-making and pattern recognition.
              </p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Processing Power</span>
                  <span className="text-sm font-bold text-primary">1000+ TOPS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Neural Layers</span>
                  <span className="text-sm font-bold text-primary">50+ Layers</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Training Data</span>
                  <span className="text-sm font-bold text-primary">10M+ Samples</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Machine Learning */}
          <motion.div
            className="group relative overflow-hidden rounded-3xl bg-card/50 border border-border/20 p-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-green-400/10" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-green-400 flex items-center justify-center mb-6">
                <div className="w-8 h-8 bg-white rounded-lg" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">Machine Learning</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Continuous learning algorithms that adapt and improve threat detection 
                accuracy through real-world deployment data and feedback loops.
              </p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Learning Rate</span>
                  <span className="text-sm font-bold text-purple-500">Adaptive</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Accuracy</span>
                  <span className="text-sm font-bold text-purple-500">99.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Improvement</span>
                  <span className="text-sm font-bold text-purple-500">Continuous</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Predictive Analytics */}
          <motion.div
            className="group relative overflow-hidden rounded-3xl bg-card/50 border border-border/20 p-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-primary/10" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-primary flex items-center justify-center mb-6">
                <div className="w-8 h-8 bg-white rounded-lg" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">Predictive Analytics</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Advanced pattern recognition and predictive modeling to anticipate 
                threats before they materialize, enabling proactive defense strategies.
              </p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Prediction Time</span>
                  <span className="text-sm font-bold text-green-400">&lt;1 second</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pattern Recognition</span>
                  <span className="text-sm font-bold text-green-400">Real-time</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Accuracy</span>
                  <span className="text-sm font-bold text-green-400">99.5%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
