"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function MobileWhoWeAreSection() {
  return (
    <section className="relative py-16 bg-gradient-to-b from-background via-charcoal to-background">
      {/* Static background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              Who We Are
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Terrahaptix Industries is a pioneering defense technology company specializing in autonomous systems and AI-powered solutions for modern security challenges.
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary rounded-sm" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To revolutionize defense technology through innovative autonomous systems, 
                  artificial intelligence, and cutting-edge manufacturing capabilities that 
                  enhance national security and economic prosperity.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-terra-steel-blue/20 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-terra-steel-blue rounded-sm" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become Africa's leading defense technology manufacturer, 
                  establishing Nigeria as a global hub for autonomous systems 
                  and advanced manufacturing excellence.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          >
            {[
              { label: "Products", value: "5+" },
              { label: "Years Experience", value: "10+" },
              { label: "AI Accuracy", value: "99.5%" },
              { label: "Uptime", value: "99.9%" }
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
