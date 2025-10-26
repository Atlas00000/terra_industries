"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { HeroBackground } from "@/components/hero-background"

// Simplified hero data - no complex animations
const heroSlides = [
  {
    id: 1,
    title: "Defense Technology",
    subtitle: "Revolutionary",
    description: "Advanced autonomous defense systems for modern security challenges",
    image: "/ArtemisOS/autonomous_mission_planning.png",
    color: "from-blue-600/20 to-purple-600/20"
  },
  {
    id: 2,
    title: "AI-Powered",
    subtitle: "Intelligence",
    description: "Next-generation artificial intelligence for autonomous operations",
    image: "/archer_vtol/archer_vtol_1.png",
    color: "from-purple-600/20 to-blue-600/20"
  },
  {
    id: 3,
    title: "Autonomous",
    subtitle: "Systems",
    description: "Self-operating defense platforms for enhanced security",
    image: "/Iroko_UAV/Iroko_UAV .png",
    color: "from-green-600/20 to-blue-600/20"
  }
]

export function MobileHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Simple auto-rotation without complex animations
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000) // 5 seconds per slide

    return () => clearInterval(interval)
  }, [])

  // Preload images to prevent stuttering
  useEffect(() => {
    const preloadImages = () => {
      heroSlides.forEach((slide) => {
        const img = new window.Image()
        img.src = slide.image
      })
    }
    preloadImages()
    setIsLoaded(true)
  }, [])

  const currentHero = heroSlides[currentSlide]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Static background - no complex animations */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-background to-charcoal" />
      
      {/* Grid pattern - static */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="space-y-8">
          {/* Image */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            <Image
              src={currentHero.image}
              alt={currentHero.title}
              fill
              className="object-contain"
              priority={currentSlide === 0}
              loading={currentSlide === 0 ? "eager" : "lazy"}
            />
          </div>

          {/* Text content */}
          <div className="space-y-4">
            <motion.h1 
              className="text-4xl md:text-5xl font-black text-foreground tracking-tight"
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="block text-primary">{currentHero.subtitle}</span>
              <span className="block">{currentHero.title}</span>
            </motion.h1>

            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {currentHero.description}
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.div
            key={`cta-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300">
              Explore Our Technology
            </button>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center space-x-2 mt-12">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentSlide ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
