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

export function InternationalSection() {
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
              linear-gradient(45deg, rgba(74, 144, 226, 0.1) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(74, 144, 226, 0.1) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(74, 144, 226, 0.1) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(74, 144, 226, 0.1) 75%)
            `,
            backgroundSize: '60px 60px'
          }}
          animate={!isReducedMotion ? {
            backgroundPosition: ['0 0, 0 30px, 30px -30px, -30px 0px', '60px 60px, 60px 90px, 90px 30px, 30px 60px']
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
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={!isReducedMotion ? { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary">International Expansion</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            style={{ willChange: 'transform, opacity' }}
          >
            <span className="block">From Nigeria to</span>
            <span className="block gradient-text">the World</span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Expanding across Africa and beyond, establishing Nigeria as a global exporter of autonomous defense systems
          </motion.p>
        </motion.div>

        {/* South Africa Export Success */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-12 text-center">South Africa Export Success</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="p-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <h4 className="text-2xl font-bold text-foreground mb-6">First International Expansion</h4>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Successfully announced export of drones to South Africa, marking our first international 
                    expansion and market penetration beyond Nigeria. This milestone demonstrates our export 
                    capabilities and pan-African market strategy.
                  </p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Export Market</span>
                      <span className="text-sm font-medium text-primary">South Africa</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Product Type</span>
                      <span className="text-sm font-medium text-primary">Iroko UAV</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <span className="text-sm font-medium text-primary">Active Export</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                  <h4 className="text-2xl font-bold text-foreground mb-6">Pan-African Strategy</h4>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Our expansion strategy focuses on establishing a pan-African presence, leveraging 
                    regional partnerships and local manufacturing capabilities to serve markets across 
                    the continent.
                  </p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Target Markets</span>
                      <span className="text-sm font-medium text-primary">15+ Countries</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Manufacturing</span>
                      <span className="text-sm font-medium text-primary">Local Production</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Partnerships</span>
                      <span className="text-sm font-medium text-primary">Strategic Alliances</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Global Vision */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-12 text-center">
              <span className="block">Global Vision</span>
              <span className="block gradient-text">$1 Trillion Protection Goal</span>
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* African Leadership */}
              <motion.div
                className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-center mb-6">
                  <div className="text-4xl font-black text-purple-500 mb-2">Africa</div>
                  <h4 className="text-xl font-bold text-foreground">Regional Leadership</h4>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-center mb-6">
                    Establishing Africa as the global leader in autonomous defense systems
                  </p>
                  <div className="space-y-3">
                    {[
                      "Pan-African manufacturing network",
                      "Regional defense partnerships",
                      "Local technology development",
                      "Economic sovereignty"
                    ].map((goal, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span className="text-sm text-muted-foreground">{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Global Expansion */}
              <motion.div
                className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-center mb-6">
                  <div className="text-4xl font-black text-blue-500 mb-2">Global</div>
                  <h4 className="text-xl font-bold text-foreground">Worldwide Reach</h4>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-center mb-6">
                    Expanding to international markets with strategic partnerships
                  </p>
                  <div className="space-y-3">
                    {[
                      "International partnerships",
                      "Global export operations",
                      "Technology licensing",
                      "Joint ventures"
                    ].map((goal, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="text-sm text-muted-foreground">{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Technology Innovation */}
              <motion.div
                className="p-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-center mb-6">
                  <div className="text-4xl font-black text-green-500 mb-2">Innovation</div>
                  <h4 className="text-xl font-bold text-foreground">Technology Leadership</h4>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-center mb-6">
                    Driving innovation in autonomous defense technology
                  </p>
                  <div className="space-y-3">
                    {[
                      "R&D investment",
                      "Patent development",
                      "Technology transfer",
                      "Innovation partnerships"
                    ].map((goal, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-muted-foreground">{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Expansion Impact */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-8">Expansion Impact</h3>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Our international expansion is not just about market penetration—it's about establishing 
              Africa as a global leader in defense technology, creating sustainable economic growth, 
              and building a more secure world through autonomous systems.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Target Countries</div>
              </motion.div>
              
              <motion.div
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-3xl font-bold text-primary mb-2">$1T</div>
                <div className="text-sm text-muted-foreground">Protection Goal</div>
              </motion.div>
              
              <motion.div
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Partnerships</div>
              </motion.div>
              
              <motion.div
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Global Operations</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
