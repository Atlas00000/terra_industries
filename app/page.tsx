"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroBackground } from "@/components/hero-background"
import { Loading } from "@/components/loading"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"

// Helper function to generate consistent particle positions
const generateParticlePositions = (count: number) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    // Use a simple hash of the index to generate consistent positions
    const hash = (i * 2654435761) % 1000000;
    positions.push({
      left: (hash % 90) + 5, // 5-95% range
      top: ((hash * 7) % 90) + 5, // 5-95% range
      duration: 3 + (i % 3),
      delay: (i % 4) * 0.5
    });
  }
  return positions;
};

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleLoadingComplete = () => {
    setShowLoading(false)
  }

  // Auto-rotation effect
  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 7)
    }, 8000) // Change slide every 8 seconds

    return () => clearInterval(interval)
  }, [isPaused])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Slideshow navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 7)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 7) % 7)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsPaused(true)
    // Resume auto-rotation after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000)
  }

  if (showLoading) {
    return <Loading onComplete={handleLoadingComplete} />
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Header />

      {/* Hero Section - Dynamic Story Slideshow */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <HeroBackground />
        </div>

        {/* Animated Grid Overlay */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

          {/* Floating Particles */}
          {generateParticlePositions(20).map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: pos.duration,
                repeat: Infinity,
                delay: pos.delay
              }}
            />
          ))}

        <div className="relative z-10 max-w-[80vw] mx-auto px-6 w-full">
          {/* Story Slideshow Container */}
          <div className="relative w-full h-[75vh] md:h-[80vh] rounded-3xl overflow-hidden border border-border/20">
            {/* Slide Navigation */}
            <div className="absolute top-6 left-6 right-6 z-20">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                    <motion.button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-primary' : 'bg-primary/30'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
                <div className="text-sm text-white/80 backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full">
                  Terra Industries Stories
                </div>
              </div>
            </div>

            {/* Slide Content */}
            <div className="relative h-full">
              {/* Slide 1: $13 Billion Infrastructure Protection */}
              <motion.div
                className="absolute inset-0 flex flex-col cursor-pointer"
                initial={{ opacity: 1 }}
                animate={{ opacity: currentSlide === 0 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => goToSlide(0)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {/* Full-form Image */}
                <div className="relative h-1/2 md:h-2/3 w-full">
                  <motion.div
                    className="w-full h-full"
                  >
                    <img 
                      src="/stories/$13-Billion-Critical_Infrastructure.jpeg" 
                      alt="$13 Billion Critical Infrastructure Protection"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </motion.div>
                </div>
                
                {/* Content Under Image */}
                <div className="h-1/2 md:h-1/3 p-4 md:p-8 bg-gradient-to-b from-black/80 to-black flex items-center">
                  <div className="w-full space-y-3 md:space-y-6">
                    <motion.div
                      className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-2 rounded-full bg-green-500/20 text-green-500 text-xs md:text-sm font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      Major Milestone
                    </motion.div>
                    
                    <h3 className="text-2xl md:text-4xl font-bold text-white">
                      <span className="block">$13+ Billion in</span>
                      <span className="block gradient-text">Critical Infrastructure</span>
                    </h3>
                    
                    <p className="text-sm md:text-lg text-white/90 leading-relaxed max-w-2xl">
                      Our systems now protect over $13 billion worth of critical infrastructure across Africa, 
                      demonstrating significant market penetration and impact in safeguarding the global economy.
                    </p>
                    
                  </div>
                </div>
              </motion.div>

              {/* Slide 2: Ooni of Ife Joins Board */}
              <motion.div
                className="absolute inset-0 flex flex-col cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: currentSlide === 1 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => goToSlide(1)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {/* Full-form Image */}
                <div className="relative h-1/2 md:h-2/3 w-full">
                  <motion.div
                    className="w-full h-full"
                  >
                    <img 
                      src="/stories/Ooni_to_Board1.jpeg" 
                      alt="Ooni of Ife Joins Board of Directors"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </motion.div>
                </div>
                
                {/* Content Under Image */}
                <div className="h-1/2 md:h-1/3 p-4 md:p-8 bg-gradient-to-b from-black/80 to-black flex items-center">
                  <div className="w-full space-y-3 md:space-y-6">
                    <motion.div
                      className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-2 rounded-full bg-yellow-500/20 text-yellow-500 text-xs md:text-sm font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                    >
                      <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                      Royal Leadership
                    </motion.div>
                    
                    <h3 className="text-2xl md:text-4xl font-bold text-white">
                      <span className="block">His Imperial Majesty</span>
                      <span className="block gradient-text">Ooni of Ife</span>
                    </h3>
                    
                    <p className="text-sm md:text-lg text-white/90 leading-relaxed max-w-2xl">
                      One of Africa's most powerful kings joins our Board of Directors, bringing deep passion 
                      for Nigeria's industrial and economic prosperity to our leadership team.
                    </p>
                    
                  </div>
                </div>
              </motion.div>

              {/* Slide 3: Largest Drone Factory */}
              <motion.div
                className="absolute inset-0 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: currentSlide === 2 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Full-form Image */}
                <div className="relative h-1/2 md:h-2/3 w-full">
                  <motion.div
                    className="w-full h-full"
                  >
                    <img 
                      src="/stories/Upgraded_Drone_Factory.jpeg" 
                      alt="Upgraded Drone Factory in Abuja"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </motion.div>
                </div>
                
                {/* Content Under Image */}
                <div className="h-1/2 md:h-1/3 p-4 md:p-8 bg-gradient-to-b from-black/80 to-black flex items-center">
                  <div className="w-full space-y-3 md:space-y-6">
                    <motion.div
                      className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-2 rounded-full bg-blue-500/20 text-blue-500 text-xs md:text-sm font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      Manufacturing Excellence
                    </motion.div>
                    
                    <h3 className="text-2xl md:text-4xl font-bold text-white">
                      <span className="block">Africa's Largest</span>
                      <span className="block gradient-text">Drone Factory</span>
                    </h3>
                    
                    <p className="text-sm md:text-lg text-white/90 leading-relaxed max-w-2xl">
                      Unveiled our upgraded drone manufacturing facility in Abuja, establishing the largest 
                      drone factory on the African continent with 20 Iroko drones per day production capacity.
                    </p>
                    
                  </div>
                </div>
              </motion.div>

              {/* Slide 4: $1.2M Contract Success */}
              <motion.div
                className="absolute inset-0 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: currentSlide === 3 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Full-form Image */}
                <div className="relative h-1/2 md:h-2/3 w-full">
                  <motion.div
                    className="w-full h-full"
                  >
                    <img 
                      src="/stories/Largest_Contract_Achievement.jpeg" 
                      alt="$1.2 Million Hydroelectric Contract"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </motion.div>
                </div>
                
                {/* Content Under Image */}
                <div className="h-1/2 md:h-1/3 p-4 md:p-8 bg-gradient-to-b from-black/80 to-black flex items-center">
                  <div className="w-full space-y-3 md:space-y-6">
                    <motion.div
                      className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-2 rounded-full bg-green-500/20 text-green-500 text-xs md:text-sm font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      Contract Success
                    </motion.div>
                    
                    <h3 className="text-2xl md:text-4xl font-bold text-white">
                      <span className="block">$1.2 Million</span>
                      <span className="block gradient-text">Hydroelectric Contract</span>
                    </h3>
                    
                    <p className="text-sm md:text-lg text-white/90 leading-relaxed max-w-2xl">
                      Secured our largest contract to date, protecting two major hydroelectric power plants 
                      in Nigeria with a comprehensive fleet of AI-powered drones and sentry towers.
                    </p>
                    
                  </div>
                </div>
              </motion.div>

              {/* Slide 5: South Africa Export Success */}
              <motion.div
                className="absolute inset-0 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: currentSlide === 4 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Full-form Image */}
                <div className="relative h-1/2 md:h-2/3 w-full">
                  <motion.div
                    className="w-full h-full"
                  >
                    <img 
                      src="/stories/South_Africa_Export_Success.jpeg" 
                      alt="South Africa Export Success"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </motion.div>
                </div>
                
                {/* Content Under Image */}
                <div className="h-1/2 md:h-1/3 p-4 md:p-8 bg-gradient-to-b from-black/80 to-black flex items-center">
                  <div className="w-full space-y-3 md:space-y-6">
                    <motion.div
                      className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-2 rounded-full bg-blue-500/20 text-blue-500 text-xs md:text-sm font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      International Expansion
                    </motion.div>
                    
                    <h3 className="text-2xl md:text-4xl font-bold text-white">
                      <span className="block">South Africa</span>
                      <span className="block gradient-text">Export Success</span>
                    </h3>
                    
                    <p className="text-sm md:text-lg text-white/90 leading-relaxed max-w-2xl">
                      Successfully announced export of drones to South Africa, marking our first international 
                      expansion and market penetration beyond Nigeria in our pan-African strategy.
                    </p>
                    
                  </div>
                </div>
              </motion.div>

              {/* Slide 6: ArtemisOS Real-Time Demo */}
              <motion.div
                className="absolute inset-0 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: currentSlide === 5 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Full-form Image */}
                <div className="relative h-1/2 md:h-2/3 w-full">
                  <motion.div
                    className="w-full h-full"
                  >
                    <img 
                      src="/stories/ArtemisOS_Real_Time_Capabilities_Demonstration.jpeg" 
                      alt="ArtemisOS Real-Time Capabilities Demonstration"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </motion.div>
                </div>
                
                {/* Content Under Image */}
                <div className="h-1/2 md:h-1/3 p-4 md:p-8 bg-gradient-to-b from-black/80 to-black flex items-center">
                  <div className="w-full space-y-3 md:space-y-6">
                    <motion.div
                      className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-2 rounded-full bg-purple-500/20 text-purple-500 text-xs md:text-sm font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                    >
                      <span className="w-2 h-2 bg-purple-500 rounded-full" />
                      Technology Innovation
                    </motion.div>
                    
                    <h3 className="text-2xl md:text-4xl font-bold text-white">
                      <span className="block">ArtemisOS</span>
                      <span className="block gradient-text">Real-Time Demo</span>
                    </h3>
                    
                    <p className="text-sm md:text-lg text-white/90 leading-relaxed max-w-2xl">
                      Showcased advanced AI-powered threat detection and autonomous mission planning capabilities 
                      with four power plants and several substations under active protection.
                    </p>
                    
                  </div>
                </div>
              </motion.div>

              {/* Slide 7: Made in Africa Innovation */}
              <motion.div
                className="absolute inset-0 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: currentSlide === 6 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Full-form Image */}
                <div className="relative h-1/2 md:h-2/3 w-full">
                  <motion.div
                    className="w-full h-full"
                  >
                    <img 
                      src="/stories/Made_in_Africa_Innovation.jpeg" 
                      alt="Made in Africa Innovation"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </motion.div>
                </div>
                
                {/* Content Under Image */}
                <div className="h-1/2 md:h-1/3 p-4 md:p-8 bg-gradient-to-b from-black/80 to-black flex items-center">
                  <div className="w-full space-y-3 md:space-y-6">
                    <motion.div
                      className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-2 rounded-full bg-orange-500/20 text-orange-500 text-xs md:text-sm font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                    >
                      <span className="w-2 h-2 bg-orange-500 rounded-full" />
                      African Innovation
                    </motion.div>
                    
                    <h3 className="text-2xl md:text-4xl font-bold text-white">
                      <span className="block">Made in Africa</span>
                      <span className="block gradient-text">Innovation</span>
                    </h3>
                    
                    <p className="text-sm md:text-lg text-white/90 leading-relaxed max-w-2xl">
                      Showcasing local manufacturing capabilities and African innovation in autonomous systems, 
                      positioning Terra Industries as leaders in "Made in Africa" technology.
                    </p>
                    
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Slide Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-primary' : 'bg-white/30'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Who We Are Section */}
      <section className="relative py-32 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Animated Grid */}
          <motion.div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '60px 60px']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          
          {/* Floating Particles */}
          {generateParticlePositions(15).map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
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
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="w-2 h-2 bg-primary rounded-full" />
              Company Overview
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-8">
              <span className="block">Who We Are</span>
              <span className="block gradient-text">Terra Industries</span>
            </h2>
            
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Securing Africa's Future Through Advanced Autonomous Defense Technology
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Company Story */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-foreground">
                  <span className="block">Transforming Africa's</span>
                  <span className="block gradient-text">Defense Landscape</span>
                </h3>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Founded in 2024, Terra Industries has rapidly established itself as Nigeria's premier 
                  defense technology company, protecting over $13 billion worth of critical infrastructure 
                  across Africa. Our mission is to secure Africa's most vital assets through advanced 
                  autonomous defense systems.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  From our headquarters in Abuja, we're building the future of African defense manufacturing, 
                  with a vision to turn Nigeria into a global drone producer and exporter while protecting 
                  the continent's critical industries including oil & gas, mining, and agriculture.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our rapid growth and strategic positioning have made us a key player in the African defense 
                  manufacturing sector, with successful international expansion to South Africa and plans for 
                  pan-African market penetration. We're transforming how Africa protects its most critical 
                  infrastructure through cutting-edge autonomous technology.
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/20"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl font-bold text-primary mb-2">$13B+</div>
                  <div className="text-sm text-muted-foreground">Infrastructure Protected</div>
                </motion.div>
                
                <motion.div
                  className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/20"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl font-bold text-primary mb-2">20</div>
                  <div className="text-sm text-muted-foreground">Drones Per Day</div>
                </motion.div>
                
                <motion.div
                  className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/20"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl font-bold text-primary mb-2">80%</div>
                  <div className="text-sm text-muted-foreground">Local Sourcing</div>
                </motion.div>
                
                <motion.div
                  className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/20"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl font-bold text-primary mb-2">$1.2M</div>
                  <div className="text-sm text-muted-foreground">Largest Contract</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Mission & Vision */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-terra-steel-blue/10 border border-primary/20">
                <h4 className="text-2xl font-bold text-foreground mb-4">Our Mission</h4>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Build autonomous defense systems to protect Africa's critical infrastructure, 
                  transforming the continent's most vital industries through advanced technology.
                </p>
                <p className="text-sm text-muted-foreground">
                  We focus on protecting mines, refineries, power plants, and other critical assets 
                  that form the backbone of Africa's economy, ensuring their security through 
                  cutting-edge autonomous defense solutions.
                </p>
              </div>
              
              <div className="p-8 rounded-3xl bg-gradient-to-br from-terra-steel-blue/10 to-primary/10 border border-terra-steel-blue/20">
                <h4 className="text-2xl font-bold text-foreground mb-4">Our Vision</h4>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Secure Africa's critical infrastructure through advanced autonomous technology, 
                  establishing Nigeria as a global leader in defense manufacturing.
                </p>
                <p className="text-sm text-muted-foreground">
                  We envision a future where Nigeria becomes a global drone producer and exporter, 
                  with a network of drone factories across Africa, protecting over $1 trillion 
                  worth of emerging market infrastructure.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-terra-steel-blue/5 border border-border/20">
                <h4 className="text-2xl font-bold text-foreground mb-4">Our Impact</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Since our founding, we've successfully protected critical infrastructure worth 
                  over $13 billion across Africa, with our largest contract valued at $1.2 million 
                  for hydroelectric plant security. Our manufacturing capabilities include producing 
                  20 Iroko drones per day with 80% local component sourcing, establishing Nigeria 
                  as Africa's premier defense manufacturing hub.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Leadership Excellence Section - Real Leadership Stories */}
      <section className="relative py-32 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Animated Grid */}
          <motion.div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '60px 60px']
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          
          {/* Floating Elements */}
          {generateParticlePositions(15).map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-primary">Leadership Excellence</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              style={{
                textShadow: '0 0 40px rgba(74, 144, 226, 0.2)'
              }}
            >
              <span className="block">Royal & Military</span>
              <span className="block gradient-text glow-text">Command</span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Led by Africa's most influential leaders - from royal authority to military expertise, 
              our leadership team combines centuries of tradition with cutting-edge defense technology
            </motion.p>
          </motion.div>

          {/* Leadership Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {/* Ooni of Ife */}
            <motion.div
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/10 to-primary/10 border border-purple-500/20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="p-8">
                <div className="mb-6">
                  <Image
                    src="/stories/Ooni_to_Board1.jpeg"
                    alt="His Imperial Majesty, the Ooni of Ife"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-2xl mb-4"
                  />
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-500 text-sm font-medium mb-4">
                    <span className="w-2 h-2 bg-purple-500 rounded-full" />
                    Board of Directors
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  His Imperial Majesty,<br />
                  <span className="gradient-text">the Ooni of Ife</span>
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  One of Africa's most powerful kings, bringing deep passion for Nigeria's industrial 
                  and economic prosperity. His royal authority enhances our credibility and government 
                  relations, with a global vision to turn Nigeria into a global drone producer.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className="text-sm text-muted-foreground">Royal Authority & Influence</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className="text-sm text-muted-foreground">Economic Development Vision</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className="text-sm text-muted-foreground">Government Relations</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AVM Jolasinmi */}
            <motion.div
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 to-primary/10 border border-blue-500/20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="p-8">
                <div className="mb-6">
                  <Image
                    src="/stories/Ayoola_Jolasinmi_Joins_Board.jpeg"
                    alt="Retired Air Vice Marshal Ayoola Jolasinmi"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-2xl mb-4"
                  />
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 text-sm font-medium mb-4">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                    Board of Directors
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Retired Air Vice Marshal<br />
                  <span className="gradient-text">Ayoola Jolasinmi</span>
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Distinguished career in the Nigerian Air Force with key positions including Director of Operations, 
                  Chief of Defence Space Administration, and Chief of Defence Policy & Plans at Defence Headquarters.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm text-muted-foreground">Military Leadership</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm text-muted-foreground">Strategic Defense Planning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm text-muted-foreground">Space Administration</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Engr. Mansur Ahmed */}
            <motion.div
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500/10 to-primary/10 border border-green-500/20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="p-8">
                <div className="mb-6">
                  <Image
                    src="/stories/Addition_Engr_Mansur_Ahmed.jpeg"
                    alt="Engr. Mansur Ahmed"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-2xl mb-4"
                  />
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-sm font-medium mb-4">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Engineering Leadership
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  <span className="gradient-text">Engr. Mansur Ahmed</span>
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Extensive technical expertise and engineering leadership, strengthening our product 
                  development and technical innovation capabilities. Focus on engineering excellence 
                  and technical innovation.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-muted-foreground">Technical Expertise</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-muted-foreground">Product Development</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-muted-foreground">Engineering Excellence</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Leadership Impact */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <h3 className="text-4xl font-bold text-foreground mb-8">
                <span className="block">Leadership Impact</span>
                <span className="block gradient-text">$13B+ Infrastructure Protected</span>
              </h3>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                Under this exceptional leadership team, Terra Industries has successfully protected 
                over $13 billion worth of critical infrastructure across Africa, establishing Nigeria 
                as a premier defense manufacturing hub with 20 drones per day production capacity.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl font-bold text-primary mb-2">$13B+</div>
                  <div className="text-sm text-muted-foreground">Infrastructure Protected</div>
                </motion.div>
                
                <motion.div
                  className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl font-bold text-primary mb-2">20</div>
                  <div className="text-sm text-muted-foreground">Drones Per Day</div>
                </motion.div>
                
                <motion.div
                  className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl font-bold text-primary mb-2">80%</div>
                  <div className="text-sm text-muted-foreground">Local Sourcing</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Ecosystem Section - Real Product Showcase */}
      <section className="relative py-32 bg-gradient-to-b from-background to-charcoal overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Animated Circuit Pattern */}
          <motion.div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(74, 144, 226, 0.1) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(74, 144, 226, 0.1) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(74, 144, 226, 0.1) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(74, 144, 226, 0.1) 75%)
              `,
              backgroundSize: '40px 40px',
              backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
            }}
            animate={{
              backgroundPosition: ['0 0, 0 20px, 20px -20px, -20px 0px', '40px 40px, 40px 60px, 60px 20px, 20px 40px']
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        </div>

        <div className="relative z-10 max-w-[80vw] mx-auto px-6">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-primary">Product Ecosystem</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              style={{
                textShadow: '0 0 40px rgba(74, 144, 226, 0.2)'
              }}
            >
              <span className="block">Five Integrated</span>
              <span className="block gradient-text glow-text">Defense Systems</span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Complete autonomous defense ecosystem protecting Africa's critical infrastructure with real-world deployments
            </motion.p>
          </motion.div>

          {/* Product Showcase */}
          <div className="space-y-24">
            {/* ArtemisOS */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-4xl font-bold text-foreground mb-4">ArtemisOS</h3>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs md:text-sm font-medium">
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    AI-Powered Central Intelligence Platform
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Terrahaptix's flagship AI-powered, open operating system serving as the central intelligence platform 
                  for all autonomous defense systems. Provides real-time threat detection, autonomous mission planning, 
                  and fleet management capabilities across the entire product ecosystem.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Core Capabilities</h4>
                      <div className="space-y-3">
                        {[
                          "Autonomous Mission Planning & Decision-Making",
                          "Real-Time Threat Detection & Analysis", 
                          "Drone Fleet Management & Swarm Operations",
                          "AI-Powered Target Identification & Tracking",
                          "AES-256 Encryption & Security",
                          "Predictive Analytics & Pattern Recognition"
                        ].map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 + index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <motion.div
                              className="w-2 h-2 bg-primary rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                            />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Use Cases</h4>
                      <div className="space-y-2">
                        {["Critical Infrastructure Protection", "Border Security & Surveillance", "Industrial Security", "Environmental Monitoring"].map((useCase, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-terra-steel-blue rounded-full" />
                            <span className="text-sm text-muted-foreground">{useCase}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Performance Metrics</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Response Time</span>
                          <span className="text-sm font-medium text-primary">&lt;1 second</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Threat Detection Accuracy</span>
                          <span className="text-sm font-medium text-primary">99.5%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">System Uptime</span>
                          <span className="text-sm font-medium text-primary">99.9%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Concurrent Systems</span>
                          <span className="text-sm font-medium text-primary">1000+</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Business Impact</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Cost Reduction</span>
                          <span className="text-sm font-medium text-primary">40-60%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Efficiency Gains</span>
                          <span className="text-sm font-medium text-primary">3x</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Training Reduction</span>
                          <span className="text-sm font-medium text-primary">70%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">ROI (18 months)</span>
                          <span className="text-sm font-medium text-primary">300%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-80 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-3xl flex items-center justify-center border border-border/20 overflow-hidden">
                  <img 
                    src="/ArtemisOS/autonomous_mission_planning.png" 
                    alt="ArtemisOS AI-Powered Intelligence Platform"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl" />
                  <div className="absolute bottom-6 left-6 right-6 text-center">
                    <div className="text-2xl font-bold text-white">ArtemisOS Dashboard</div>
                    <div className="text-sm text-white/80 mt-1">AI-Powered Intelligence Platform</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Archer VTOL */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative order-2 lg:order-1"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-80 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl flex items-center justify-center border border-border/20 overflow-hidden">
                  <img 
                    src="/archer_vtol/archer_vtol_1.png" 
                    alt="Archer VTOL Modular Multi-Mission UAV"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl" />
                  <div className="absolute bottom-6 left-6 right-6 text-center">
                    <div className="text-2xl font-bold text-white">Archer VTOL</div>
                    <div className="text-sm text-white/80 mt-1">Modular Multi-Mission UAV</div>
                  </div>
                </div>
              </motion.div>

              <div className="space-y-8 order-1 lg:order-2">
                <div>
                  <h3 className="text-4xl font-bold text-foreground mb-4">Archer VTOL</h3>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-xs md:text-sm font-medium">
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    Modular Multi-Mission UAV Platform
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Modular, quiet, and mass-producible UAV platform purpose-built for reconnaissance and site protection. 
                  Leverages ArtemisOS to automate mission planning, threat detection, and flight operations, significantly 
                  reducing training burden for operators.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Key Capabilities</h4>
                      <div className="space-y-3">
                        {[
                          "Enhanced Terrain Performance & Off-Road Optimization",
                          "AI-Assisted Operations & Mission Automation", 
                          "Modular Multi-Mission Payload System",
                          "Weather Resistance (IP54 Protection)",
                          "Remote Operations & Threat Detection",
                          "Advanced Flight Control Systems"
                        ].map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2 + index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <motion.div
                              className="w-2 h-2 bg-primary rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                            />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Primary Applications</h4>
                      <div className="space-y-2">
                        {["Border Surveillance & Perimeter Monitoring", "Infrastructure Inspection & Maintenance", "Search & Rescue Operations", "Environmental Monitoring"].map((useCase, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-terra-steel-blue rounded-full" />
                            <span className="text-sm text-muted-foreground">{useCase}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Technical Specifications</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Frame Material</span>
                          <span className="text-sm font-medium text-primary">3K Carbon Fiber</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Wingspan</span>
                          <span className="text-sm font-medium text-primary">1900mm</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Max Takeoff Weight</span>
                          <span className="text-sm font-medium text-primary">11.5 kg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Payload Capacity</span>
                          <span className="text-sm font-medium text-primary">4 kg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Flight Time</span>
                          <span className="text-sm font-medium text-primary">34 minutes</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Operational Range</span>
                          <span className="text-sm font-medium text-primary">15-50 km</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Camera & Connectivity</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Camera Resolution</span>
                          <span className="text-sm font-medium text-primary">48 MP / 4K 60fps</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Connectivity</span>
                          <span className="text-sm font-medium text-primary">Wi-Fi 2.4/5.8GHz</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Charging Time</span>
                          <span className="text-sm font-medium text-primary">90 minutes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Iroko UAV */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-4xl font-bold text-foreground mb-4">Iroko UAV</h3>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs md:text-sm font-medium">
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    First Response Quadcopter
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Modular, mass-producible quadcopter purpose-built for first response and infrastructure inspection. 
                  Delivers autonomy and threat response capabilities, balancing extended range and multi-payload capacity 
                  for diverse mission requirements with 90-second deployment.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Key Capabilities</h4>
                      <div className="space-y-3">
                        {[
                          "90-Second Rapid Deployment",
                          "ArtemisOS Integration & Autonomy", 
                          "Modular Multi-Payload Capacity",
                          "Minimal Training Requirements",
                          "Emergency Response Optimization",
                          "Weather Resistance (IP54)"
                        ].map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.4 + index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <motion.div
                              className="w-2 h-2 bg-primary rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                            />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Primary Applications</h4>
                      <div className="space-y-2">
                        {["Surveillance & Perimeter Monitoring", "Infrastructure Inspection & Assessment", "Search & Rescue Operations", "Logistics & Payload Delivery"].map((useCase, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-terra-steel-blue rounded-full" />
                            <span className="text-sm text-muted-foreground">{useCase}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Technical Specifications</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Material</span>
                          <span className="text-sm font-medium text-primary">Carbon Fiber Composite</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Max Takeoff Weight</span>
                          <span className="text-sm font-medium text-primary">5 kg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Max Speed</span>
                          <span className="text-sm font-medium text-primary">70 km/h</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Endurance</span>
                          <span className="text-sm font-medium text-primary">50 minutes</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Range</span>
                          <span className="text-sm font-medium text-primary">20 km</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Max Payload</span>
                          <span className="text-sm font-medium text-primary">1.5 kg</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Production & Manufacturing</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Daily Production</span>
                          <span className="text-sm font-medium text-primary">20 units</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Local Sourcing</span>
                          <span className="text-sm font-medium text-primary">80%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Battery Type</span>
                          <span className="text-sm font-medium text-primary">LiPo 6S</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Communication</span>
                          <span className="text-sm font-medium text-primary">AES-256 Encrypted</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-80 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl flex items-center justify-center border border-border/20 overflow-hidden">
                  <img 
                    src="/Iroko_UAV/Iroko_UAV .png" 
                    alt="Iroko UAV First Response Quadcopter"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl" />
                  <div className="absolute bottom-6 left-6 right-6 text-center">
                    <div className="text-2xl font-bold text-white">Iroko UAV</div>
                    <div className="text-sm text-white/80 mt-1">90 Second Deployment</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Duma UGV */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative order-2 lg:order-1"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-80 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl flex items-center justify-center border border-border/20 overflow-hidden">
                  <img 
                    src="/Duma_ground_drone/Duma_ground_drone.png" 
                    alt="Duma UGV Ground Surveillance Platform"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl" />
                  <div className="absolute bottom-6 left-6 right-6 text-center">
                    <div className="text-2xl font-bold text-white">Duma UGV</div>
                    <div className="text-sm text-white/80 mt-1">Ground Surveillance Platform</div>
                  </div>
                </div>
              </motion.div>

              <div className="space-y-8 order-1 lg:order-2">
                <div>
                  <h3 className="text-4xl font-bold text-foreground mb-4">Duma UGV</h3>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs md:text-sm font-medium">
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    Ground Surveillance Platform
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Modular, mass-producible UGV platform purpose-built for ground surveillance and site protection. 
                  Leverages ArtemisOS to automate mission planning, threat detection, and ground operations, removing 
                  the need for human operators in hazardous environments.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Key Capabilities</h4>
                      <div className="space-y-3">
                        {[
                          "Open Architecture & Easy Configuration",
                          "ArtemisOS Integration & Autonomy", 
                          "Modular Multi-Mission Payload System",
                          "Enhanced Situational Awareness",
                          "Operational Independence",
                          "Hazardous Environment Operations"
                        ].map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.6 + index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <motion.div
                              className="w-2 h-2 bg-primary rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                            />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Primary Applications</h4>
                      <div className="space-y-2">
                        {["Mine Operations & Underground Surveillance", "Oil & Gas Pipeline Monitoring", "Power Plant Asset Protection", "Farmland Operations & Agriculture"].map((useCase, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-terra-steel-blue rounded-full" />
                            <span className="text-sm text-muted-foreground">{useCase}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Technical Specifications</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Frame Material</span>
                          <span className="text-sm font-medium text-primary">3K Carbon Fiber</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Protection Level</span>
                          <span className="text-sm font-medium text-primary">IP54</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Camera System</span>
                          <span className="text-sm font-medium text-primary">48 MP / 4K 60fps</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Payload Capacity</span>
                          <span className="text-sm font-medium text-primary">4 kg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Operational Range</span>
                          <span className="text-sm font-medium text-primary">15-50 km</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Battery Life</span>
                          <span className="text-sm font-medium text-primary">34 minutes</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Connectivity & Security</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Connectivity</span>
                          <span className="text-sm font-medium text-primary">Wi-Fi 2.4/5.8GHz</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Bluetooth</span>
                          <span className="text-sm font-medium text-primary">5.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Security</span>
                          <span className="text-sm font-medium text-primary">AES-256 Encryption</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Charging Time</span>
                          <span className="text-sm font-medium text-primary">90 minutes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Kallon Tower */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-4xl font-bold text-foreground mb-4">Kallon Tower</h3>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-xs md:text-sm font-medium">
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    AI-Powered Sentry System
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Solar-powered, AI-enabled sentry tower that leverages ArtemisOS to detect and track threats up to 3km away. 
                  With AI-enabled edge processing, 360-degree pan capability, and a variety of sensors, Kallon brings 
                  increased security to borders, mines, oil pipelines, and other critical infrastructure.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Key Capabilities</h4>
                      <div className="space-y-3">
                        {[
                          "24/7 AI-Powered Surveillance & Monitoring",
                          "Multi-Tower Coordination & Networked Intelligence", 
                          "Self-Sustaining Solar Power & Battery Backup",
                          "Edge AI Processing & Real-Time Analysis",
                          "360-Degree Pan Capability",
                          "Continuous Operation & Uninterrupted Surveillance"
                        ].map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.8 + index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <motion.div
                              className="w-2 h-2 bg-primary rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                            />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Primary Applications</h4>
                      <div className="space-y-2">
                        {["Border Surveillance & Perimeter Monitoring", "Infrastructure Protection & Asset Security", "Oil & Gas Pipeline Monitoring", "Public Safety & Urban Security"].map((useCase, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-terra-steel-blue rounded-full" />
                            <span className="text-sm text-muted-foreground">{useCase}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Technical Specifications</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Material</span>
                          <span className="text-sm font-medium text-primary">Reinforced Composite</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Height</span>
                          <span className="text-sm font-medium text-primary">6m (Extendable)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Detection Range</span>
                          <span className="text-sm font-medium text-primary">3km</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Camera System</span>
                          <span className="text-sm font-medium text-primary">Multi-Sensor EO/IR</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Zoom Capability</span>
                          <span className="text-sm font-medium text-primary">30x Optical / 12x Digital</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Weather Resistance</span>
                          <span className="text-sm font-medium text-primary">IP67 (-30°C to +55°C)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Power & Connectivity</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Power Supply</span>
                          <span className="text-sm font-medium text-primary">Solar + LiFePO4 Battery</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Connectivity</span>
                          <span className="text-sm font-medium text-primary">LTE/5G + Wi-Fi + Satellite</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Security</span>
                          <span className="text-sm font-medium text-primary">AES-256 Encryption</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">AI Capabilities</span>
                          <span className="text-sm font-medium text-primary">Object Detection & Tracking</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-80 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-3xl flex items-center justify-center border border-border/20 overflow-hidden">
                  <img 
                    src="/kallon(sentry_tower)/kallon.png" 
                    alt="Kallon Tower AI-Powered Sentry System"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl" />
                  <div className="absolute bottom-6 left-6 right-6 text-center">
                    <div className="text-2xl font-bold text-white">Kallon Tower</div>
                    <div className="text-sm text-white/80 mt-1">3km Detection Range</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Manufacturing Excellence Section - Real Manufacturing Story */}
      <section className="relative py-32 bg-gradient-to-b from-charcoal via-background to-charcoal overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Industrial Grid Pattern */}
          <motion.div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '60px 60px']
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          
          {/* Manufacturing Particles */}
          {generateParticlePositions(20).map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-primary">Manufacturing Excellence</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              style={{
                textShadow: '0 0 40px rgba(74, 144, 226, 0.2)'
              }}
            >
              <span className="block">Africa's Largest</span>
              <span className="block gradient-text glow-text">Drone Factory</span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              From concept to reality in 11 months - the largest drone manufacturing facility on the African continent, producing 20 Iroko drones daily with 80% local sourcing, establishing Nigeria as Africa's premier defense manufacturing hub
            </motion.p>
          </motion.div>

          {/* Manufacturing Overview */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Manufacturing Story */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-6">
                    <span className="block">Revolutionizing African</span>
                    <span className="block gradient-text">Manufacturing Excellence</span>
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Terra Industries has achieved what many considered impossible - building Africa's largest drone manufacturing facility 
                    in just 11 months. This remarkable achievement represents more than just industrial capacity; it's a testament to 
                    African innovation, determination, and the vision of transforming Nigeria into a global drone producer.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our upgraded drone factory in Abuja stands as the cornerstone of our ambitious three-year expansion plan, 
                    demonstrating that "Made in Africa" can compete globally while creating local economic opportunities 
                    and protecting the continent's most critical infrastructure.
                  </p>
                </div>

                {/* Key Achievements */}
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-foreground">Manufacturing Achievements</h4>
                  <div className="space-y-4">
                    {[
                      "Largest drone factory on the African continent",
                      "20 Iroko drones per day production capacity", 
                      "80% local component sourcing and manufacturing",
                      "11-month journey from concept to operational factory",
                      "Job creation and local economic development",
                      "Enhanced capacity to protect Africa's critical resources"
                    ].map((achievement, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-primary rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        />
                        <span className="text-sm text-muted-foreground">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Manufacturing Impact */}
              <div className="space-y-8">
                <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-terra-steel-blue/10 border border-primary/20">
                  <h4 className="text-2xl font-bold text-foreground mb-4">Economic Impact</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Local Job Creation</span>
                      <span className="text-lg font-bold text-primary">Hundreds of Jobs</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Local Sourcing</span>
                      <span className="text-lg font-bold text-primary">80%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Daily Production</span>
                      <span className="text-lg font-bold text-primary">20 Drones</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Timeline</span>
                      <span className="text-lg font-bold text-primary">11 Months</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-gradient-to-br from-terra-steel-blue/10 to-primary/10 border border-terra-steel-blue/20">
                  <h4 className="text-2xl font-bold text-foreground mb-4">Strategic Positioning</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-terra-steel-blue rounded-full" />
                      <span className="text-sm text-muted-foreground">"Made in Africa" competitive advantage</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-terra-steel-blue rounded-full" />
                      <span className="text-sm text-muted-foreground">Enhanced infrastructure protection capacity</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-terra-steel-blue rounded-full" />
                      <span className="text-sm text-muted-foreground">Global export potential</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-terra-steel-blue rounded-full" />
                      <span className="text-sm text-muted-foreground">Technology transfer and knowledge sharing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Manufacturing Journey Timeline */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-terra-steel-blue" />
              
              {/* Timeline Items */}
              <div className="space-y-12">
                {/* Month 1-3: Conceptualization */}
                <motion.div
                  className="relative flex items-center gap-8"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border-2 border-primary/30">
                    <span className="text-2xl">💡</span>
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-500 text-sm font-medium mb-4">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                      Months 1-3: Conceptualization
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Vision to Reality</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      From initial concept to detailed planning, Terra Industries began its ambitious journey to build Africa's largest drone manufacturing facility. The vision: transform Nigeria into a global drone producer and exporter.
                    </p>
                  </div>
                </motion.div>

                {/* Month 4-8: Development */}
                <motion.div
                  className="relative flex items-center gap-8"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border-2 border-primary/30">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-500 text-sm font-medium mb-4">
                      <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      Months 4-8: Development & Setup
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Infrastructure Development</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Intensive development phase focusing on facility setup, equipment procurement, and establishing local supply chains. 80% of components sourced locally, creating a true "Made in Africa" advantage.
                    </p>
                  </div>
                </motion.div>

                {/* Month 9-11: Launch */}
                <motion.div
                  className="relative flex items-center gap-8"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border-2 border-primary/30">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-500 text-sm font-medium mb-4">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      Months 9-11: Launch & Production
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Factory Launch</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Successful launch of Africa's largest drone factory in Abuja. Achieved 20 Iroko drones per day production capacity, marking a historic milestone in African manufacturing and defense technology.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>



          {/* Future Vision - Detailed Three-Year Expansion Plan */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold text-foreground mb-6">Three-Year Expansion Plan</h3>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-6xl mx-auto">
                  Building on our success, Terra Industries is committed to constructing a network of drone factories across Africa, 
                  establishing Nigeria as the continent's premier defense manufacturing hub and a global exporter of autonomous systems.
                </p>
              </div>
              
              {/* Expansion Timeline */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {/* Year 1 */}
                <motion.div
                  className="p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.4, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-2xl">
                      <span className="text-blue-500 font-bold">1</span>
                    </div>
                    <h4 className="text-2xl font-bold text-foreground">Year 1: Foundation</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <p className="text-muted-foreground">Scale current Abuja facility to 50 drones per day</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <p className="text-muted-foreground">Establish supply chain partnerships across West Africa</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <p className="text-muted-foreground">Launch first international factory in Ghana</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <p className="text-muted-foreground">Achieve 90% local component sourcing</p>
                    </div>
                  </div>
                </motion.div>

                {/* Year 2 */}
                <motion.div
                  className="p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.6, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center text-2xl">
                      <span className="text-green-500 font-bold">2</span>
                    </div>
                    <h4 className="text-2xl font-bold text-foreground">Year 2: Expansion</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <p className="text-muted-foreground">Launch factories in Kenya and South Africa</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <p className="text-muted-foreground">Establish pan-African distribution network</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <p className="text-muted-foreground">Begin exports to Middle East and Europe</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <p className="text-muted-foreground">Achieve 200 drones per day total capacity</p>
                    </div>
                  </div>
                </motion.div>

                {/* Year 3 */}
                <motion.div
                  className="p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.8, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center text-2xl">
                      <span className="text-yellow-500 font-bold">3</span>
                    </div>
                    <h4 className="text-2xl font-bold text-foreground">Year 3: Global Leadership</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <p className="text-muted-foreground">Complete African factory network (8 countries)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <p className="text-muted-foreground">Launch global export operations</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <p className="text-muted-foreground">Prepare for IPO and public offering</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <p className="text-muted-foreground">Achieve 500+ drones per day capacity</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Strategic Goals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-terra-steel-blue/10 border border-primary/20"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 flex items-center justify-center">
                      <span className="text-2xl">🌍</span>
                    </div>
                    <h4 className="text-2xl font-bold text-foreground">Pan-African Network</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Strategic expansion across multiple African countries to serve continental infrastructure protection needs, 
                    creating a unified defense manufacturing ecosystem.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>8 African countries by Year 3</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>500+ drones daily capacity</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>95% local sourcing across network</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="p-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <h4 className="text-2xl font-bold text-foreground">Global Export Hub</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Positioning Nigeria as a global drone producer and exporter, competing on the international stage 
                    with world-class autonomous defense systems.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      <span>Export to 15+ countries globally</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      <span>$1 trillion infrastructure protection goal</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      <span>IPO preparation and public offering</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Infrastructure Protection Section - Visual Marvel */}
      <section className="relative py-32 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
        {/* Dynamic Background Effects */}
        <div className="absolute inset-0">
          {/* Animated Security Grid */}
          <motion.div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(0deg, rgba(74, 144, 226, 0.3) 2px, transparent 2px),
                linear-gradient(90deg, rgba(74, 144, 226, 0.3) 2px, transparent 2px)
              `,
              backgroundSize: '80px 80px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '80px 80px']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          
          {/* Floating Security Particles */}
          {generateParticlePositions(25).map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                boxShadow: '0 0 20px rgba(74, 144, 226, 0.5)'
              }}
              animate={{
                y: [0, -150, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                rotate: [0, 360, 0]
              }}
              transition={{
                duration: pos.duration + 4,
                repeat: Infinity,
                delay: pos.delay * 1.5
              }}
            />
          ))}

          {/* Security Scan Lines */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(74, 144, 226, 0.1) 50%, transparent 100%)',
              width: '2px',
              height: '100%',
              left: '20%'
            }}
            animate={{
              x: ['0%', '100%', '0%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>

        <div className="relative z-10 max-w-[80vw] mx-auto px-6">
          {/* Section Header */}
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-3 h-3 bg-primary rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1], 
                  opacity: [1, 0.5, 1],
                  boxShadow: ['0 0 0px rgba(74, 144, 226, 0)', '0 0 20px rgba(74, 144, 226, 0.8)', '0 0 0px rgba(74, 144, 226, 0)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-lg font-semibold text-primary">Infrastructure Protection</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              className="text-6xl md:text-8xl font-black tracking-tighter font-display text-foreground mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              style={{
                textShadow: '0 0 60px rgba(74, 144, 226, 0.3)'
              }}
            >
              <motion.span 
                className="block"
                animate={{ 
                  textShadow: [
                    '0 0 20px rgba(74, 144, 226, 0.3)',
                    '0 0 40px rgba(74, 144, 226, 0.6)',
                    '0 0 20px rgba(74, 144, 226, 0.3)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                $13+ Billion in
              </motion.span>
              <motion.span 
                className="block gradient-text glow-text"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Critical Infrastructure Protected
              </motion.span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              className="text-2xl md:text-3xl text-muted-foreground max-w-7xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Real impact, real results - protecting Africa's most critical assets across multiple sectors with proven autonomous defense systems
            </motion.p>
          </motion.div>

          {/* Impact Showcase - Visual Marvel */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* $13B+ Infrastructure Protected */}
              <motion.div
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 backdrop-blur-sm"
                whileHover={{ y: -15, scale: 1.03 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity
                  }}
                />
                <div className="relative z-10 p-8">
                  <motion.div
                    className="text-7xl font-black bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent mb-4"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    $13B+
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Infrastructure Protected</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Total value of critical assets under our protection across Africa, safeguarding the global economy
                  </p>
                </div>
              </motion.div>

              {/* $1.2M Largest Contract */}
              <motion.div
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 backdrop-blur-sm"
                whileHover={{ y: -15, scale: 1.03 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 1
                  }}
                />
                <div className="relative z-10 p-8">
                  <motion.div
                    className="text-7xl font-black bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent mb-4"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    $1.2M
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Largest Contract</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Hydroelectric plant security contract with Nethawk Solutions, establishing recurring revenue
                  </p>
                </div>
              </motion.div>

              {/* 4 Power Plants */}
              <motion.div
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 backdrop-blur-sm"
                whileHover={{ y: -15, scale: 1.03 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 2
                  }}
                />
                <div className="relative z-10 p-8">
                  <motion.div
                    className="text-7xl font-black bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-4"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    4
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Power Plants</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Major power facilities currently under protection, our fastest-growing market segment
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Real Case Studies - Enhanced */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <motion.h3 
                className="text-5xl font-bold text-foreground mb-8"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(74, 144, 226, 0.3)',
                    '0 0 40px rgba(74, 144, 226, 0.6)',
                    '0 0 20px rgba(74, 144, 226, 0.3)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Real Impact, Real Results
              </motion.h3>
              <p className="text-2xl text-muted-foreground leading-relaxed max-w-7xl mx-auto">
                Our systems are actively protecting critical infrastructure across Africa, with proven results and measurable impact
              </p>
            </div>
            
            {/* Case Studies Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Hydroelectric Plant Security */}
              <motion.div
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 border border-blue-500/40 backdrop-blur-sm"
                whileHover={{ y: -20, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5"
                  animate={{
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity
                  }}
                />
                <div className="relative z-10 p-10">
                  <motion.div
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-500/20 text-blue-500 text-lg font-semibold mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="w-3 h-3 bg-blue-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    $1.2M Contract
                  </motion.div>
                  <h4 className="text-3xl font-bold text-foreground mb-6">
                    Hydroelectric Plant Security
                  </h4>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    Our largest contract to date, protecting two major hydroelectric power plants in Nigeria. 
                    Deployed a large fleet of drones and sentry towers for real-time threat detection and response.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                      <span className="text-muted-foreground">Client</span>
                      <span className="text-lg font-bold text-primary">Nethawk Solutions</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                      <span className="text-muted-foreground">Technology</span>
                      <span className="text-lg font-bold text-primary">AI-Powered Drones & Sentry Towers</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                      <span className="text-muted-foreground">Integration</span>
                      <span className="text-lg font-bold text-primary">ArtemisOS Platform</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                      <span className="text-muted-foreground">Revenue Model</span>
                      <span className="text-lg font-bold text-primary">Annual Software Subscriptions</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Power Infrastructure Protection */}
              <motion.div
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500/15 to-emerald-500/15 border border-green-500/40 backdrop-blur-sm"
                whileHover={{ y: -20, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"
                  animate={{
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: 2
                  }}
                />
                <div className="relative z-10 p-10">
                  <motion.div
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/20 text-green-500 text-lg font-semibold mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                    Power Industry Focus
                  </motion.div>
                  <h4 className="text-3xl font-bold text-foreground mb-6">
                    Power Infrastructure Protection
                  </h4>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    Four power plants and several substations currently under our protection, 
                    demonstrating our growing presence in the power industry - our fastest-growing market segment.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                      <span className="text-muted-foreground">Power Plants</span>
                      <span className="text-lg font-bold text-primary">4 Facilities</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                      <span className="text-muted-foreground">Substations</span>
                      <span className="text-lg font-bold text-primary">Multiple Locations</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                      <span className="text-muted-foreground">Market Growth</span>
                      <span className="text-lg font-bold text-primary">Fastest Growing Segment</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                      <span className="text-muted-foreground">Technology</span>
                      <span className="text-lg font-bold text-primary">ArtemisOS + Archer Drones</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Future Vision - Enhanced */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-7xl mx-auto">
              <motion.h3 
                className="text-6xl font-bold text-foreground mb-12"
                animate={{
                  textShadow: [
                    '0 0 30px rgba(74, 144, 226, 0.3)',
                    '0 0 60px rgba(74, 144, 226, 0.6)',
                    '0 0 30px rgba(74, 144, 226, 0.3)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="block">Protecting $1 Trillion in</span>
                <span className="block gradient-text">Emerging Markets</span>
              </motion.h3>
              <motion.p 
                className="text-2xl text-muted-foreground leading-relaxed mb-16"
                animate={{
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Our five-year goal is to protect up to $1 trillion in critical assets across emerging markets, 
                accelerating Africa's industrialization efforts and safeguarding the global economy.
              </motion.p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <motion.div
                  className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 border border-primary/30 backdrop-blur-sm"
                  whileHover={{ y: -15, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-5xl font-black text-primary mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    $1T
                  </motion.div>
                  <div className="text-xl font-bold text-foreground mb-2">Five-Year Protection Goal</div>
                  <div className="text-muted-foreground">Critical assets across emerging markets</div>
                </motion.div>
                
                <motion.div
                  className="p-8 rounded-3xl bg-gradient-to-br from-terra-steel-blue/20 to-primary/20 border border-terra-steel-blue/30 backdrop-blur-sm"
                  whileHover={{ y: -15, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-5xl font-black text-terra-steel-blue mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    Global
                  </motion.div>
                  <div className="text-xl font-bold text-foreground mb-2">Emerging Markets Focus</div>
                  <div className="text-muted-foreground">Expanding beyond Africa</div>
                </motion.div>
                
                <motion.div
                  className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 border border-primary/30 backdrop-blur-sm"
                  whileHover={{ y: -15, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-5xl font-black text-primary mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    Industrialization
                  </motion.div>
                  <div className="text-xl font-bold text-foreground mb-2">Accelerating Africa's Growth</div>
                  <div className="text-muted-foreground">Transforming the continent</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology Innovation Section - Visual Marvel */}
      <section className="relative py-32 bg-gradient-to-b from-charcoal via-background to-charcoal overflow-hidden">
        {/* Dynamic Background Effects */}
        <div className="absolute inset-0">
          {/* Animated AI Circuit Pattern */}
          <motion.div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(74, 144, 226, 0.4) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(74, 144, 226, 0.4) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(74, 144, 226, 0.4) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(74, 144, 226, 0.4) 75%)
              `,
              backgroundSize: '80px 80px',
              backgroundPosition: '0 0, 0 40px, 40px -40px, -40px 0px'
            }}
            animate={{
              backgroundPosition: ['0 0, 0 40px, 40px -40px, -40px 0px', '80px 80px, 80px 120px, 120px 40px, 40px 80px']
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          
          {/* Floating AI Particles */}
          {generateParticlePositions(30).map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                boxShadow: '0 0 25px rgba(74, 144, 226, 0.6)'
              }}
              animate={{
                y: [0, -120, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.8, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: pos.duration + 3,
                repeat: Infinity,
                delay: pos.delay * 1.2
              }}
            />
          ))}

          {/* AI Data Streams */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(74, 144, 226, 0.1) 50%, transparent 100%)',
              width: '3px',
              height: '100%',
              left: '15%'
            }}
            animate={{
              x: ['0%', '100%', '0%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(74, 144, 226, 0.1) 50%, transparent 100%)',
              width: '3px',
              height: '100%',
              left: '85%'
            }}
            animate={{
              x: ['0%', '-100%', '0%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3
            }}
          />
        </div>

        <div className="relative z-10 max-w-[80vw] mx-auto px-6">
          {/* Section Header */}
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-3 h-3 bg-primary rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1], 
                  opacity: [1, 0.5, 1],
                  boxShadow: ['0 0 0px rgba(74, 144, 226, 0)', '0 0 25px rgba(74, 144, 226, 0.8)', '0 0 0px rgba(74, 144, 226, 0)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-lg font-semibold text-primary">Technology Innovation</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              className="text-6xl md:text-8xl font-black tracking-tighter font-display text-foreground mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              style={{
                textShadow: '0 0 60px rgba(74, 144, 226, 0.3)'
              }}
            >
              <motion.span 
                className="block"
                animate={{ 
                  textShadow: [
                    '0 0 20px rgba(74, 144, 226, 0.3)',
                    '0 0 40px rgba(74, 144, 226, 0.6)',
                    '0 0 20px rgba(74, 144, 226, 0.3)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ArtemisOS in
              </motion.span>
              <motion.span 
                className="block gradient-text glow-text"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Real-Time Action
              </motion.span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              className="text-2xl md:text-3xl text-muted-foreground max-w-7xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              AI-powered threat detection, autonomous mission planning, and fleet coordination in real-time across critical infrastructure
            </motion.p>
          </motion.div>

          {/* Technology Showcase - Visual Marvel */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Real-Time Capabilities Demo */}
              <motion.div
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 backdrop-blur-sm"
                whileHover={{ y: -20, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10"
                  animate={{
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity
                  }}
                />
                <div className="relative z-10 p-10">
                  <motion.div
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-purple-500/20 text-purple-500 text-lg font-semibold mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="w-3 h-3 bg-purple-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    Live Demonstration
                  </motion.div>
                  <h4 className="text-3xl font-bold text-foreground mb-6">
                    ArtemisOS Real-Time Demo
                  </h4>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    Successfully showcased ArtemisOS real-time capabilities, demonstrating advanced AI-powered threat detection 
                    and autonomous mission planning with four power plants and several substations under active protection.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                      <span className="text-muted-foreground">Power Plants</span>
                      <span className="text-lg font-bold text-primary">4 Under Protection</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                      <span className="text-muted-foreground">Processing</span>
                      <span className="text-lg font-bold text-primary">Real-Time AI</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                      <span className="text-muted-foreground">Integration</span>
                      <span className="text-lg font-bold text-primary">Archer Drones</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                      <span className="text-muted-foreground">Market</span>
                      <span className="text-lg font-bold text-primary">Fastest Growing</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Software-Only Contract Success */}
              <motion.div
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 backdrop-blur-sm"
                whileHover={{ y: -20, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"
                  animate={{
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: 2
                  }}
                />
                <div className="relative z-10 p-10">
                  <motion.div
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/20 text-green-500 text-lg font-semibold mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                    Market Recognition
                  </motion.div>
                  <h4 className="text-3xl font-bold text-foreground mb-6">
                    Software-Only Contract
                  </h4>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    Secured our first software-only contract to integrate ArtemisOS with existing surveillance systems 
                    at Aba Power ring fence, demonstrating growing recognition of our software capabilities.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                      <span className="text-muted-foreground">Client</span>
                      <span className="text-lg font-bold text-primary">Aba Power</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                      <span className="text-muted-foreground">Contract Type</span>
                      <span className="text-lg font-bold text-primary">Software-Only</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                      <span className="text-muted-foreground">Technology</span>
                      <span className="text-lg font-bold text-primary">Real-Time Detection</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                      <span className="text-muted-foreground">Impact</span>
                      <span className="text-lg font-bold text-primary">Enhanced Autonomy</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Technology Innovation Focus - Enhanced */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <motion.h3 
                  className="text-5xl font-bold text-foreground mb-8"
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(74, 144, 226, 0.3)',
                      '0 0 40px rgba(74, 144, 226, 0.6)',
                      '0 0 20px rgba(74, 144, 226, 0.3)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Technology & AI Innovation Focus
                </motion.h3>
                <p className="text-2xl text-muted-foreground leading-relaxed max-w-6xl mx-auto">
                  Terra Industries is committed to cutting-edge autonomous defense systems, focusing on AI and technology innovation 
                  to advance defense technology and maintain technical leadership in the industry.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <motion.div
                  className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 border border-primary/30 backdrop-blur-sm"
                  whileHover={{ y: -15, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-4xl font-black text-primary mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    AI Innovation
                  </motion.div>
                  <div className="text-lg font-bold text-foreground mb-2">Advanced AI Systems</div>
                  <div className="text-muted-foreground">Cutting-edge artificial intelligence</div>
                </motion.div>
                
                <motion.div
                  className="p-8 rounded-3xl bg-gradient-to-br from-terra-steel-blue/20 to-primary/20 border border-terra-steel-blue/30 backdrop-blur-sm"
                  whileHover={{ y: -15, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-4xl font-black text-terra-steel-blue mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    Autonomous
                  </motion.div>
                  <div className="text-lg font-bold text-foreground mb-2">Self-Operating Technology</div>
                  <div className="text-muted-foreground">Independent system operations</div>
                </motion.div>
                
                <motion.div
                  className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 border border-primary/30 backdrop-blur-sm"
                  whileHover={{ y: -15, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-4xl font-black text-primary mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    Defense
                  </motion.div>
                  <div className="text-lg font-bold text-foreground mb-2">Military-Grade Solutions</div>
                  <div className="text-muted-foreground">Advanced defense technology</div>
                </motion.div>
                
                <motion.div
                  className="p-8 rounded-3xl bg-gradient-to-br from-terra-steel-blue/20 to-primary/20 border border-terra-steel-blue/30 backdrop-blur-sm"
                  whileHover={{ y: -15, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-4xl font-black text-terra-steel-blue mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  >
                    R&D Focus
                  </motion.div>
                  <div className="text-lg font-bold text-foreground mb-2">Research & Development</div>
                  <div className="text-muted-foreground">Continuous innovation</div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* ArtemisOS Core Features - Enhanced */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-7xl mx-auto">
              <motion.h3 
                className="text-6xl font-bold text-foreground mb-12"
                animate={{
                  textShadow: [
                    '0 0 30px rgba(74, 144, 226, 0.3)',
                    '0 0 60px rgba(74, 144, 226, 0.6)',
                    '0 0 30px rgba(74, 144, 226, 0.3)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="block">ArtemisOS Core</span>
                <span className="block gradient-text">Features</span>
              </motion.h3>
              <motion.p 
                className="text-2xl text-muted-foreground leading-relaxed mb-16"
                animate={{
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Advanced AI-powered operating system capabilities for autonomous defense operations
              </motion.p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <motion.div
                  className="p-10 rounded-3xl bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 border border-primary/30 backdrop-blur-sm"
                  whileHover={{ y: -20, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h4 
                    className="text-2xl font-bold text-foreground mb-6"
                    animate={{
                      textShadow: [
                        '0 0 10px rgba(74, 144, 226, 0.3)',
                        '0 0 20px rgba(74, 144, 226, 0.6)',
                        '0 0 10px rgba(74, 144, 226, 0.3)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Autonomous Mission Planning
                  </motion.h4>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    AI-driven decision making and mission execution without human intervention, 
                    enabling fully autonomous defense operations across multiple scenarios.
                  </p>
                </motion.div>
                
                <motion.div
                  className="p-10 rounded-3xl bg-gradient-to-br from-terra-steel-blue/20 to-primary/20 border border-terra-steel-blue/30 backdrop-blur-sm"
                  whileHover={{ y: -20, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h4 
                    className="text-2xl font-bold text-foreground mb-6"
                    animate={{
                      textShadow: [
                        '0 0 10px rgba(74, 144, 226, 0.3)',
                        '0 0 20px rgba(74, 144, 226, 0.6)',
                        '0 0 10px rgba(74, 144, 226, 0.3)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    Fleet Coordination
                  </motion.h4>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Seamless coordination of multiple drones and systems for comprehensive coverage, 
                    ensuring optimal resource allocation and mission effectiveness.
                  </p>
                </motion.div>
                
                <motion.div
                  className="p-10 rounded-3xl bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 border border-primary/30 backdrop-blur-sm"
                  whileHover={{ y: -20, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h4 
                    className="text-2xl font-bold text-foreground mb-6"
                    animate={{
                      textShadow: [
                        '0 0 10px rgba(74, 144, 226, 0.3)',
                        '0 0 20px rgba(74, 144, 226, 0.6)',
                        '0 0 10px rgba(74, 144, 226, 0.3)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  >
                    AES-256 Encryption
                  </motion.h4>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Military-grade security and cybersecurity for all communications and data, 
                    ensuring maximum protection of sensitive defense operations.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* International Expansion Section - Visual Marvel */}
      <section className="relative py-32 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
        {/* Dynamic Background Effects */}
        <div className="absolute inset-0">
          {/* Animated Global Grid */}
          <motion.div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `
                linear-gradient(0deg, rgba(74, 144, 226, 0.3) 2px, transparent 2px),
                linear-gradient(90deg, rgba(74, 144, 226, 0.3) 2px, transparent 2px)
              `,
              backgroundSize: '100px 100px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '100px 100px']
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          
          {/* Floating Global Particles */}
          {generateParticlePositions(40).map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                boxShadow: '0 0 30px rgba(74, 144, 226, 0.7)'
              }}
              animate={{
                y: [0, -150, 0],
                opacity: [0, 1, 0],
                scale: [0, 2, 0],
                rotate: [0, 360, 0]
              }}
              transition={{
                duration: pos.duration + 5,
                repeat: Infinity,
                delay: pos.delay * 2
              }}
            />
          ))}

          {/* Global Connection Lines */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(45deg, transparent 0%, rgba(74, 144, 226, 0.1) 50%, transparent 100%)',
              width: '4px',
              height: '100%',
              left: '25%'
            }}
            animate={{
              x: ['0%', '100%', '0%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(-45deg, transparent 0%, rgba(74, 144, 226, 0.1) 50%, transparent 100%)',
              width: '4px',
              height: '100%',
              left: '75%'
            }}
            animate={{
              x: ['0%', '-100%', '0%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 4
            }}
          />
        </div>

        <div className="relative z-10 max-w-[80vw] mx-auto px-6">
          {/* Section Header */}
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-3 h-3 bg-primary rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1], 
                  opacity: [1, 0.5, 1],
                  boxShadow: ['0 0 0px rgba(74, 144, 226, 0)', '0 0 25px rgba(74, 144, 226, 0.8)', '0 0 0px rgba(74, 144, 226, 0)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-lg font-semibold text-primary">International Expansion</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              className="text-6xl md:text-8xl font-black tracking-tighter font-display text-foreground mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              style={{
                textShadow: '0 0 60px rgba(74, 144, 226, 0.3)'
              }}
            >
              <motion.span 
                className="block"
                animate={{ 
                  textShadow: [
                    '0 0 20px rgba(74, 144, 226, 0.3)',
                    '0 0 40px rgba(74, 144, 226, 0.6)',
                    '0 0 20px rgba(74, 144, 226, 0.3)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                From Nigeria to
              </motion.span>
              <motion.span 
                className="block gradient-text glow-text"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                the World
              </motion.span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              className="text-2xl md:text-3xl text-muted-foreground max-w-7xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Successfully exporting to South Africa and expanding across Africa with pan-African security solutions and global market penetration
            </motion.p>
          </motion.div>

          {/* International Success Showcase - Visual Marvel */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* South Africa Export Success */}
              <motion.div
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 backdrop-blur-sm"
                whileHover={{ y: -20, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"
                  animate={{
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity
                  }}
                />
                <div className="relative z-10 p-10">
                  <motion.div
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/20 text-green-500 text-lg font-semibold mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    International Milestone
                  </motion.div>
                  <h4 className="text-3xl font-bold text-foreground mb-6">
                    South Africa Export Success
                  </h4>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    Successfully announced export of drones to South Africa, marking our first international expansion 
                    and market penetration beyond Nigeria. This achievement represents a significant milestone in our 
                    pan-African market strategy and demonstrates our export capabilities.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                      <span className="text-muted-foreground">Market Entry</span>
                      <span className="text-lg font-bold text-primary">First International</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                      <span className="text-muted-foreground">Strategy</span>
                      <span className="text-lg font-bold text-primary">Pan-African Focus</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                      <span className="text-muted-foreground">Capabilities</span>
                      <span className="text-lg font-bold text-primary">Export Demonstration</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                      <span className="text-muted-foreground">Achievement</span>
                      <span className="text-lg font-bold text-primary">Strategic Milestone</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Pan-African Strategy */}
              <motion.div
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 backdrop-blur-sm"
                whileHover={{ y: -20, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"
                  animate={{
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: 2
                  }}
                />
                <div className="relative z-10 p-10">
                  <motion.div
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-500/20 text-blue-500 text-lg font-semibold mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="w-3 h-3 bg-blue-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                    Continental Expansion
                  </motion.div>
                  <h4 className="text-3xl font-bold text-foreground mb-6">
                    Pan-African Strategy
                  </h4>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    Building a network of drone factories across Africa with a three-year expansion plan, 
                    targeting key markets for critical infrastructure protection and local manufacturing 
                    to establish continental market leadership.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                      <span className="text-muted-foreground">Leadership</span>
                      <span className="text-lg font-bold text-primary">Pan-African Market</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                      <span className="text-muted-foreground">Manufacturing</span>
                      <span className="text-lg font-bold text-primary">Network of Factories</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                      <span className="text-muted-foreground">Alliances</span>
                      <span className="text-lg font-bold text-primary">Global Partnerships</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                      <span className="text-muted-foreground">Expansion</span>
                      <span className="text-lg font-bold text-primary">Additional Markets</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Global Vision - Enhanced */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <motion.h3 
                  className="text-5xl font-bold text-foreground mb-8"
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(74, 144, 226, 0.3)',
                      '0 0 40px rgba(74, 144, 226, 0.6)',
                      '0 0 20px rgba(74, 144, 226, 0.3)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Global Vision & Goals
                </motion.h3>
                <p className="text-2xl text-muted-foreground leading-relaxed max-w-6xl mx-auto">
                  Our five-year vision is to protect up to $1 trillion in critical assets across emerging markets, 
                  establishing Terra Industries as the global leader in infrastructure security.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div
                  className="p-10 rounded-3xl bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 border border-primary/30 backdrop-blur-sm"
                  whileHover={{ y: -15, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h4 
                    className="text-3xl font-bold text-foreground mb-6"
                    animate={{
                      textShadow: [
                        '0 0 10px rgba(74, 144, 226, 0.3)',
                        '0 0 20px rgba(74, 144, 226, 0.6)',
                        '0 0 10px rgba(74, 144, 226, 0.3)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Short-Term Goals (2025-2026)
                  </motion.h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10">
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-muted-foreground">Network of drone factories across Africa</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10">
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                      <span className="text-muted-foreground">Additional African markets expansion</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10">
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                      <span className="text-muted-foreground">Strategic alliances with global companies</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  className="p-10 rounded-3xl bg-gradient-to-br from-terra-steel-blue/20 to-primary/20 border border-terra-steel-blue/30 backdrop-blur-sm"
                  whileHover={{ y: -15, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h4 
                    className="text-3xl font-bold text-foreground mb-6"
                    animate={{
                      textShadow: [
                        '0 0 10px rgba(74, 144, 226, 0.3)',
                        '0 0 20px rgba(74, 144, 226, 0.6)',
                        '0 0 10px rgba(74, 144, 226, 0.3)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    Long-Term Vision (2026-2030)
                  </motion.h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-terra-steel-blue/10">
                      <motion.div
                        className="w-2 h-2 bg-terra-steel-blue rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-muted-foreground">Pan-African market leadership</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-terra-steel-blue/10">
                      <motion.div
                        className="w-2 h-2 bg-terra-steel-blue rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                      <span className="text-muted-foreground">Global market penetration</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-terra-steel-blue/10">
                      <motion.div
                        className="w-2 h-2 bg-terra-steel-blue rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                      <span className="text-muted-foreground">$1 trillion in critical assets protection</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Made in Africa Innovation - Enhanced */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-7xl mx-auto">
              <motion.h3 
                className="text-6xl font-bold text-foreground mb-12"
                animate={{
                  textShadow: [
                    '0 0 30px rgba(74, 144, 226, 0.3)',
                    '0 0 60px rgba(74, 144, 226, 0.6)',
                    '0 0 30px rgba(74, 144, 226, 0.3)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="block">Made in Africa</span>
                <span className="block gradient-text">Innovation</span>
              </motion.h3>
              <motion.p 
                className="text-2xl text-muted-foreground leading-relaxed mb-16"
                animate={{
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Local manufacturing capabilities and African innovation leadership in autonomous systems
              </motion.p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <motion.div
                  className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 border border-primary/30 backdrop-blur-sm"
                  whileHover={{ y: -15, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-4xl font-black text-primary mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Local
                  </motion.div>
                  <div className="text-lg font-bold text-foreground mb-2">Manufacturing</div>
                  <div className="text-muted-foreground">Local production capabilities</div>
                </motion.div>
                
                <motion.div
                  className="p-8 rounded-3xl bg-gradient-to-br from-terra-steel-blue/20 to-primary/20 border border-terra-steel-blue/30 backdrop-blur-sm"
                  whileHover={{ y: -15, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-4xl font-black text-terra-steel-blue mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    Innovation
                  </motion.div>
                  <div className="text-lg font-bold text-foreground mb-2">African Leadership</div>
                  <div className="text-muted-foreground">Technology sovereignty</div>
                </motion.div>
                
                <motion.div
                  className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 border border-primary/30 backdrop-blur-sm"
                  whileHover={{ y: -15, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-4xl font-black text-primary mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    Economic
                  </motion.div>
                  <div className="text-lg font-bold text-foreground mb-2">Local Impact</div>
                  <div className="text-muted-foreground">Economic development</div>
                </motion.div>
                
                <motion.div
                  className="p-8 rounded-3xl bg-gradient-to-br from-terra-steel-blue/20 to-primary/20 border border-terra-steel-blue/30 backdrop-blur-sm"
                  whileHover={{ y: -15, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-4xl font-black text-terra-steel-blue mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  >
                    Global
                  </motion.div>
                  <div className="text-lg font-bold text-foreground mb-2">Competitiveness</div>
                  <div className="text-muted-foreground">International standards</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
