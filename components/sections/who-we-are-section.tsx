"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

// Helper function to generate consistent particle positions (reduced count)
const generateParticlePositions = (count: number) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    const hash = (i * 2654435761) % 1000000;
    positions.push({
      left: (hash % 90) + 5,
      top: ((hash * 7) % 90) + 5,
      duration: 4 + (i % 2), // Slower animations
      delay: (i % 3) * 0.8
    });
  }
  return positions;
};

export function WhoWeAreSection() {
  const { isMobile, isReducedMotion, getParticleCount } = useMobileOptimization()
  const particleCount = getParticleCount()

  return (
    <section className="relative py-24 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
      {/* Background Effects (reduced particles) */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
          animate={!isReducedMotion ? {
            backgroundPosition: ['0px 0px', '60px 60px']
          } : {}}
          transition={{
            duration: 30, // Slower animation
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
        {/* Floating Particles (reduced count) */}
        {!isReducedMotion && generateParticlePositions(particleCount).map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              willChange: 'transform, opacity'
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 0.8, 0]
            }}
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            style={{ willChange: 'transform, opacity' }}
          >
            <span className="block">Who We Are</span>
            <span className="block gradient-text">Terra Industries</span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Africa's premier autonomous defense systems manufacturer, protecting critical infrastructure 
            and advancing the continent's technological sovereignty through cutting-edge AI and robotics.
          </motion.p>
        </motion.div>

        {/* Company Story */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Our Story</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Founded with a vision to secure Africa's future through autonomous defense technology, 
                  Terra Industries has emerged as the continent's leading manufacturer of AI-powered 
                  defense systems, protecting over $13 billion in critical infrastructure.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our journey began with a simple yet powerful mission: to develop world-class 
                  autonomous defense systems that would not only protect critical assets but 
                  also establish Africa as a global leader in defense technology innovation.
                </p>
              </div>
              <div className="space-y-8">
                <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/20">
                  <h4 className="text-xl font-bold text-foreground mb-4">Mission</h4>
                  <p className="text-muted-foreground">
                    To develop and deploy autonomous defense systems that protect critical infrastructure 
                    while advancing Africa's technological sovereignty and economic independence.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/20">
                  <h4 className="text-xl font-bold text-foreground mb-4">Vision</h4>
                  <p className="text-muted-foreground">
                    To become Africa's premier defense technology company, establishing the continent 
                    as a global leader in autonomous systems and critical infrastructure protection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Statistics */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Key Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 border border-primary/30 text-center"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-4xl font-black text-primary mb-4">$13B+</div>
                <div className="text-lg font-bold text-foreground mb-2">Infrastructure Protected</div>
                <div className="text-muted-foreground">Critical assets under our protection</div>
              </motion.div>
              
              <motion.div
                className="p-8 rounded-3xl bg-gradient-to-br from-terra-steel-blue/20 to-primary/20 border border-terra-steel-blue/30 text-center"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-4xl font-black text-terra-steel-blue mb-4">20</div>
                <div className="text-lg font-bold text-foreground mb-2">Drones Per Day</div>
                <div className="text-muted-foreground">Manufacturing capacity</div>
              </motion.div>
              
              <motion.div
                className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 border border-primary/30 text-center"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-4xl font-black text-primary mb-4">80%</div>
                <div className="text-lg font-bold text-foreground mb-2">Local Sourcing</div>
                <div className="text-muted-foreground">African component sourcing</div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Impact Statement */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-8">Our Impact</h3>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Through our innovative autonomous defense systems, we're not just protecting infrastructure—we're 
              building Africa's technological future, creating jobs, fostering innovation, and establishing 
              the continent as a global leader in defense technology.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
