"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const productData = [
  {
    id: 1,
    name: "ArtemisOS",
    title: "AI-Powered Central Intelligence Platform",
    image: "/ArtemisOS/autonomous_mission_planning.png",
    description: "Terrahaptix's flagship AI-powered, open operating system serving as the central intelligence platform for all autonomous defense systems.",
    features: [
      "Autonomous Mission Planning",
      "Real-Time Threat Detection", 
      "Drone Fleet Management",
      "AI-Powered Target Identification"
    ],
    metrics: {
      responseTime: "<1 second",
      accuracy: "99.5%",
      uptime: "99.9%",
      systems: "1000+"
    },
    color: "purple",
    href: "/artemis"
  },
  {
    id: 2,
    name: "Archer VTOL",
    title: "Vertical Takeoff & Landing Drone",
    image: "/archer_vtol/archer_vtol_1.png",
    description: "Advanced vertical takeoff and landing drone designed for versatile deployment in challenging environments.",
    features: [
      "Vertical Takeoff & Landing",
      "Extended Flight Range",
      "Precision Landing Systems",
      "Autonomous Flight Control"
    ],
    metrics: {
      range: "50+ km",
      endurance: "2+ hours",
      payload: "5kg",
      speed: "120 km/h"
    },
    color: "blue",
    href: "/archer"
  },
  {
    id: 3,
    name: "Iroko UAV",
    title: "Intelligence, Surveillance & Reconnaissance",
    image: "/Iroko_UAV/Iroko_UAV .png",
    description: "High-performance unmanned aerial vehicle designed for intelligence, surveillance, and reconnaissance missions.",
    features: [
      "Advanced Sensor Suites",
      "Long-Endurance Flight",
      "Real-Time Data Transmission",
      "Multi-Mission Capability"
    ],
    metrics: {
      endurance: "8+ hours",
      range: "100+ km",
      altitude: "5000m",
      sensors: "Multi-spectral"
    },
    color: "green",
    href: "/iroko"
  },
  {
    id: 4,
    name: "Duma UGV",
    title: "Unmanned Ground Vehicle",
    image: "/Duma_ground_drone/Duma_ground_drone.png",
    description: "Autonomous unmanned ground vehicle designed for ground-based security operations.",
    features: [
      "All-Terrain Capabilities",
      "Autonomous Navigation",
      "Integrated Weapon Systems",
      "Ground Security Operations"
    ],
    metrics: {
      speed: "40 km/h",
      range: "200+ km",
      payload: "100kg",
      terrain: "All-terrain"
    },
    color: "orange",
    href: "/duma"
  },
  {
    id: 5,
    name: "Kallon Tower",
    title: "Surveillance & Communication Tower",
    image: "/kallon(sentry_tower)/kallon.png",
    description: "Advanced surveillance and communication tower system providing 360-degree monitoring capabilities.",
    features: [
      "360-Degree Monitoring",
      "Integrated Radar Systems",
      "Communication Arrays",
      "Autonomous Threat Detection"
    ],
    metrics: {
      range: "10+ km",
      altitude: "50m",
      coverage: "360°",
      uptime: "24/7"
    },
    color: "red",
    href: "/kallon"
  }
]

export function MobileProductEcosystemSection() {
  return (
    <section className="relative py-16 bg-gradient-to-b from-charcoal to-background">
      {/* Static background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-foreground">
            Product Ecosystem
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive suite of autonomous defense systems designed to address modern security challenges with cutting-edge technology.
          </p>
        </motion.div>

        {/* Product Cards */}
        <div className="space-y-8">
          {productData.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32 mx-auto md:mx-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {product.name}
                    </h3>
                    <p className="text-primary font-medium">
                      {product.title}
                    </p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {Object.entries(product.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-primary">
                          {value}
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <Link
                      href={product.href}
                      className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary/20 transition-colors duration-300"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
