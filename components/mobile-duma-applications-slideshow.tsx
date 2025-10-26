"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import Image from "next/image"

export function MobileDumaApplicationsSlideshow() {
  const { isReducedMotion } = useMobileOptimization()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: "primary-applications",
      title: "Primary Applications",
      content: [
        "Ground Surveillance & Reconnaissance: Autonomous patrol missions",
        "Border Patrol Operations: 24/7 border monitoring",
        "Infrastructure Security: Critical asset protection",
        "Emergency Response Support: Disaster relief operations",
        "Site Protection: Industrial facility security",
        "Hazardous Environment Operations: Safe remote monitoring"
      ],
      image: "/Duma_ground_drone/Duma_ground_drone.png",
      color: "from-primary/20 to-blue-500/20",
      borderColor: "border-primary/30"
    },
    {
      id: "secondary-applications",
      title: "Secondary Applications",
      content: [
        "Industrial Monitoring: Manufacturing facility surveillance",
        "Agricultural Surveillance: Farm security and monitoring",
        "Environmental Monitoring: Ecological data collection",
        "Security Patrol Services: Commercial property protection",
        "Search & Rescue: Ground-based search operations",
        "Research & Development: Data collection missions"
      ],
      image: "/Duma_ground_drone/Duma_ground_drone.png",
      color: "from-green-400/20 to-emerald-500/20",
      borderColor: "border-green-400/30"
    },
    {
      id: "defense-operations",
      title: "Defense Operations",
      content: [
        "Military Base Security: Perimeter protection",
        "Tactical Reconnaissance: Battlefield intelligence",
        "Supply Route Monitoring: Logistics security",
        "Forward Operating Base Protection: Remote base security",
        "Counter-Intelligence: Surveillance operations",
        "Peacekeeping Missions: UN and international operations"
      ],
      image: "/Duma_ground_drone/Duma_ground_drone.png",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30"
    },
    {
      id: "civilian-operations",
      title: "Civilian Operations",
      content: [
        "Urban Surveillance: City monitoring systems",
        "Event Security: Large gathering protection",
        "Traffic Management: Road monitoring and control",
        "Public Safety: Emergency response coordination",
        "Infrastructure Inspection: Bridge and road assessment",
        "Environmental Protection: Wildlife and habitat monitoring"
      ],
      image: "/Duma_ground_drone/Duma_ground_drone.png",
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30"
    },
    {
      id: "specialized-missions",
      title: "Specialized Missions",
      content: [
        "Nuclear Facility Security: High-security installations",
        "Oil & Gas Protection: Energy infrastructure security",
        "Mining Operations: Remote site monitoring",
        "Port Security: Maritime facility protection",
        "Airport Security: Aviation facility monitoring",
        "Data Center Protection: Critical IT infrastructure"
      ],
      image: "/Duma_ground_drone/Duma_ground_drone.png",
      color: "from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-500/30"
    },
    {
      id: "emergency-response",
      title: "Emergency Response",
      content: [
        "Disaster Assessment: Post-disaster damage evaluation",
        "Search & Rescue: Missing person operations",
        "Hazmat Monitoring: Chemical spill response",
        "Fire Support: Wildfire monitoring and support",
        "Flood Monitoring: Water level and damage assessment",
        "Earthquake Response: Structural damage evaluation"
      ],
      image: "/Duma_ground_drone/Duma_ground_drone.png",
      color: "from-indigo-500/20 to-purple-500/20",
      borderColor: "border-indigo-500/30"
    }
  ]

  // Auto-rotation
  useEffect(() => {
    if (isReducedMotion) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 10000) // 10 seconds per slide

    return () => clearInterval(interval)
  }, [isReducedMotion, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative py-16 px-6 bg-gradient-to-br from-background via-background to-green-400/5">
      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 127, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 127, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
        animate={!isReducedMotion ? {
          backgroundPosition: ['0px 0px', '60px 60px']
        } : {}}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-400/10 border border-green-400/20 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-sm font-medium text-green-400">Mission Applications</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mission Applications
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Versatile ground surveillance platform for diverse operational requirements
          </p>
        </motion.div>

        {/* Slideshow Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="bg-gradient-to-br from-card/50 to-card/30 rounded-3xl border border-border/20 backdrop-blur-sm overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                {/* Content */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className={`text-2xl font-bold text-foreground bg-gradient-to-r ${slides[currentSlide].color} p-4 rounded-xl border ${slides[currentSlide].borderColor}`}>
                      {slides[currentSlide].title}
                    </h3>
                    
                    <div className="space-y-3">
                      {slides[currentSlide].content.map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-muted/30 to-muted/10 border border-border/10"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-foreground">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Slide Counter */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="text-sm text-muted-foreground">
                      {currentSlide + 1} of {slides.length}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={prevSlide}
                        className="p-2 rounded-lg bg-green-400/10 hover:bg-green-400/20 border border-green-400/20 transition-colors"
                        title="Previous slide"
                        aria-label="Previous slide"
                      >
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextSlide}
                        className="p-2 rounded-lg bg-green-400/10 hover:bg-green-400/20 border border-green-400/20 transition-colors"
                        title="Next slide"
                        aria-label="Next slide"
                      >
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Visual */}
                <div className="relative">
                  <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-muted/20 to-muted/10 border border-border/20">
                    <Image
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].title}
                      fill
                      className="object-contain p-4"
                      priority={currentSlide === 0}
                    />
                    
                    {/* Floating Indicators */}
                    {!isReducedMotion && (
                      <>
                        <motion.div
                          className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute bottom-4 left-4 w-2 h-2 bg-primary rounded-full"
                          animate={{ 
                            scale: [1, 1.4, 1],
                            opacity: [0.6, 1, 0.6]
                          }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                        />
                        <motion.div
                          className="absolute top-1/2 left-4 w-1 h-1 bg-purple-500 rounded-full"
                          animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        />
                      </>
                    )}
                  </div>

                  {/* Mission Badge */}
                  <motion.div
                    className="absolute -bottom-4 -right-4 px-4 py-2 rounded-full bg-gradient-to-r from-green-400/20 to-emerald-500/20 border border-green-400/30 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <div className="text-xs font-bold text-green-400">Mission Ready</div>
                    <div className="text-xs text-muted-foreground">Ground Operations</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-green-400 scale-125'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                title={`Go to slide ${index + 1}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
