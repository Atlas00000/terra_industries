"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroBackground } from "@/components/hero-background"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useState, useEffect } from "react"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Slideshow navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 5)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 5) % 5)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Header />

      {/* Hero Section - Visual Marvel */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background Layers */}
        <div className="absolute inset-0">
          <HeroBackground />
          
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
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Main Content Container */}
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
          style={{ y, opacity, scale }}
        >
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-12"
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm"
            >
              <motion.div
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-primary">Securing Africa's Future</span>
            </motion.div>

            {/* Main Headline with Dynamic Effects */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              className="space-y-6"
            >
              <motion.h1 
                className="text-7xl md:text-9xl font-black tracking-tighter font-display text-foreground leading-none"
                style={{
                  textShadow: '0 0 40px rgba(74, 144, 226, 0.3)'
                }}
              >
                <motion.span 
                  className="block"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  Protecting
                </motion.span>
                <motion.span 
                  className="block relative"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 100 }}
                >
                  <span className="gradient-text glow-text">$13+ Billion</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.span>
                <motion.span 
                  className="block text-5xl md:text-6xl mt-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  in Critical Infrastructure
                </motion.span>
                <motion.span 
                  className="block text-3xl md:text-4xl mt-6 text-primary"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  Across Africa
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* Subheadline with Typewriter Effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <motion.p 
                className="text-2xl md:text-3xl text-muted-foreground leading-relaxed font-light"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #c0c0c0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Advanced Autonomous Defense Systems for Africa's Most Critical Assets
              </motion.p>
            </motion.div>

            {/* Interactive CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="pt-8"
            >
              <motion.button
                className="group relative inline-flex items-center gap-4 px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-primary to-terra-steel-blue rounded-2xl overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(74, 144, 226, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow: '0 10px 30px rgba(74, 144, 226, 0.3)'
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-terra-steel-blue to-primary"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Explore Our Defense Ecosystem</span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Dynamic Stats Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              {[
                { value: '$13B+', label: 'Infrastructure Protected', color: 'from-primary to-terra-steel-blue' },
                { value: '20', label: 'Drones Per Day', color: 'from-terra-silver to-terra-chrome' },
                { value: '5', label: 'Integrated Systems', color: 'from-terra-cold-blue to-primary' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="group relative p-8 rounded-2xl border border-border/20 bg-card/50 backdrop-blur-sm"
                  whileHover={{ 
                    y: -10,
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(74, 144, 226, 0.1)'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 + index * 0.2, duration: 0.8 }}
                >
                  <motion.div
                    className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider mt-2 font-medium">
                    {stat.label}
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-primary/20"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Interactive Mouse Follower */}
        <motion.div
          className="fixed w-6 h-6 border-2 border-primary rounded-full pointer-events-none z-50"
          style={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Animated Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col items-center gap-4"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Scroll to Explore</div>
            <motion.div
              className="w-8 h-12 border-2 border-primary rounded-full flex justify-center relative"
              animate={{ borderColor: ['rgba(74, 144, 226, 0.3)', 'rgba(74, 144, 226, 1)', 'rgba(74, 144, 226, 0.3)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div 
                className="w-1 h-4 bg-primary rounded-full mt-2"
                animate={{ 
                  y: [0, 16, 0],
                  opacity: [1, 0, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Leadership Excellence Section - Dynamic Story Slideshow */}
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
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
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
              <span className="block">The Leadership</span>
              <span className="block gradient-text glow-text">Journey</span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              From founding to $13B+ infrastructure protection - the real story of Terra Industries' leadership evolution
            </motion.p>
          </motion.div>

          {/* Leadership Journey Slideshow */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Slideshow Container */}
            <div className="relative w-full h-[600px] bg-gradient-to-br from-card to-charcoal rounded-3xl overflow-hidden border border-border/20">
              {/* Slide Navigation */}
              <div className="absolute top-6 left-6 right-6 z-20">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 4].map((index) => (
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
                  <div className="text-sm text-muted-foreground">Leadership Timeline</div>
                </div>
              </div>

              {/* Slide Content */}
              <div className="relative h-full">
                {/* Slide 1: Company Founding */}
                <motion.div
                  className="absolute inset-0 p-12 flex items-center"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: currentSlide === 0 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                      <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-500 text-sm font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                      >
                        <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                        2024 - Company Founding
                      </motion.div>
                      
                      <h3 className="text-4xl font-bold text-foreground">
                        <span className="block">The Beginning</span>
                        <span className="block gradient-text">Terra Industries Founded</span>
                      </h3>
                      
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Founded in 2024 with a vision to protect Africa's critical infrastructure through autonomous defense systems. 
                        The journey from concept to reality began with a clear mission: secure Africa's future.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div className="text-center p-4 rounded-xl bg-card/50">
                          <div className="text-2xl font-bold text-primary">2024</div>
                          <div className="text-sm text-muted-foreground">Founded</div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-card/50">
                          <div className="text-2xl font-bold text-primary">$0</div>
                          <div className="text-sm text-muted-foreground">Initial Value</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <motion.div
                        className="w-full h-80 bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 rounded-2xl flex items-center justify-center"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <div className="text-center">
                          <div className="text-6xl mb-4">🚀</div>
                          <div className="text-2xl font-bold text-foreground">Vision to Reality</div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Slide 2: Engineering Leadership */}
                <motion.div
                  className="absolute inset-0 p-12 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentSlide === 1 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                      <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-500 text-sm font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        Engineering Leadership Addition
                      </motion.div>
                      
                      <h3 className="text-4xl font-bold text-foreground">
                        <span className="block">Engr. Mansur Ahmed</span>
                        <span className="block gradient-text">Joins Engineering Team</span>
                      </h3>
                      
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Extensive technical expertise and engineering leadership driving innovation in autonomous defense systems. 
                        Strengthened technical capabilities and product development focus.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <motion.div
                            className="w-2 h-2 bg-primary rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span className="text-muted-foreground">Enhanced technical team capabilities</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <motion.div
                            className="w-2 h-2 bg-primary rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          />
                          <span className="text-muted-foreground">Advanced product development</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <motion.div
                            className="w-2 h-2 bg-primary rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                          />
                          <span className="text-muted-foreground">Engineering excellence focus</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <motion.div
                        className="w-full h-80 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center"
                        animate={{ rotate: [0, 2, -2, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <div className="text-center">
                          <div className="text-6xl mb-4">⚙️</div>
                          <div className="text-2xl font-bold text-foreground">Engineering Excellence</div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Slide 3: Military Leadership */}
                <motion.div
                  className="absolute inset-0 p-12 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentSlide === 2 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                      <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-500 text-sm font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                        Military Leadership Addition
                      </motion.div>
                      
                      <h3 className="text-4xl font-bold text-foreground">
                        <span className="block">Retired Air Vice Marshal</span>
                        <span className="block gradient-text">Ayoola Jolasinmi</span>
                      </h3>
                      
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Distinguished career in the Nigerian Air Force with extensive experience in defense operations and strategic planning. 
                        Former Director of Operations, Chief of Defence Space Administration.
                      </p>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 rounded-xl bg-card/50 border border-border/20">
                          <div className="text-sm text-primary font-medium mb-1">Key Positions</div>
                          <div className="text-sm text-muted-foreground">Director of Operations, Chief of Defence Space Administration</div>
                        </div>
                        <div className="p-4 rounded-xl bg-card/50 border border-border/20">
                          <div className="text-sm text-primary font-medium mb-1">Strategic Value</div>
                          <div className="text-sm text-muted-foreground">Enhanced credibility and government relations</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <motion.div
                        className="w-full h-80 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <div className="text-center">
                          <div className="text-6xl mb-4">🎖️</div>
                          <div className="text-2xl font-bold text-foreground">Military Excellence</div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Slide 4: Royal Leadership */}
                <motion.div
                  className="absolute inset-0 p-12 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentSlide === 3 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                      <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-500 text-sm font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                      >
                        <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                        Royal Leadership Addition
                      </motion.div>
                      
                      <h3 className="text-4xl font-bold text-foreground">
                        <span className="block">His Imperial Majesty</span>
                        <span className="block gradient-text">The Ooni of Ife</span>
                      </h3>
                      
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        One of Africa's most powerful kings joins the Board of Directors, bringing deep passion for Nigeria's 
                        industrial and economic prosperity. Enhanced credibility and market positioning.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 rounded-xl bg-card/50">
                          <div className="text-2xl font-bold text-yellow-500">225+</div>
                          <div className="text-sm text-muted-foreground">LinkedIn Engagement</div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-card/50">
                          <div className="text-2xl font-bold text-yellow-500">10+</div>
                          <div className="text-sm text-muted-foreground">Comments</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <motion.div
                        className="w-full h-80 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-2xl flex items-center justify-center"
                        animate={{ rotate: [0, 1, -1, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                      >
                        <div className="text-center">
                          <div className="text-6xl mb-4">👑</div>
                          <div className="text-2xl font-bold text-foreground">Royal Authority</div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Slide 5: Current Impact */}
                <motion.div
                  className="absolute inset-0 p-12 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentSlide === 4 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                      <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                      >
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        Current Impact
                      </motion.div>
                      
                      <h3 className="text-4xl font-bold text-foreground">
                        <span className="block">$13+ Billion</span>
                        <span className="block gradient-text">Infrastructure Protected</span>
                      </h3>
                      
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Combined leadership excellence has resulted in protecting over $13 billion in critical infrastructure 
                        across Africa, with the largest contract being $1.2 million for hydroelectric plant security.
                      </p>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 rounded-xl bg-card/50">
                          <div className="text-2xl font-bold text-primary">$13B+</div>
                          <div className="text-sm text-muted-foreground">Infrastructure</div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-card/50">
                          <div className="text-2xl font-bold text-primary">$1.2M</div>
                          <div className="text-sm text-muted-foreground">Largest Contract</div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-card/50">
                          <div className="text-2xl font-bold text-primary">3</div>
                          <div className="text-sm text-muted-foreground">Key Leaders</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <motion.div
                        className="w-full h-80 bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 rounded-2xl flex items-center justify-center"
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="text-center">
                          <div className="text-6xl mb-4">🛡️</div>
                          <div className="text-2xl font-bold text-foreground">Protecting Africa</div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Slide Controls */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                <motion.button
                  onClick={prevSlide}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/20 text-sm font-medium hover:bg-card/80 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← Previous
                </motion.button>
                
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <motion.button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-primary' : 'bg-primary/30'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
                
                <motion.button
                  onClick={nextSlide}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/20 text-sm font-medium hover:bg-card/80 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next →
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="group relative inline-flex items-center gap-4 px-12 py-6 text-lg font-bold text-white bg-gradient-to-r from-primary to-terra-steel-blue rounded-2xl overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(74, 144, 226, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 10px 30px rgba(74, 144, 226, 0.3)'
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-terra-steel-blue to-primary"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Explore Our Leadership Story</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.button>
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

        <div className="relative z-10 max-w-7xl mx-auto px-6">
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
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
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
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center text-3xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    🧠
                  </motion.div>
                  <div>
                    <h3 className="text-4xl font-bold text-foreground">ArtemisOS</h3>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-medium">
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      AI-Powered Central Intelligence Platform
                    </div>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Central intelligence platform for all autonomous systems with real-time threat detection, 
                  autonomous mission planning, and fleet management capabilities. Powers the entire ecosystem.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground">Key Capabilities</h4>
                    <div className="space-y-2">
                      {["Autonomous Mission Planning", "Real-Time Threat Detection", "Fleet Coordination", "AES-256 Encryption"].map((feature, index) => (
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
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground">Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Response Time</span>
                        <span className="text-sm font-medium text-primary">&lt;1 second</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Accuracy</span>
                        <span className="text-sm font-medium text-primary">99.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Uptime</span>
                        <span className="text-sm font-medium text-primary">99.9%</span>
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
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-3xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    🚁
                  </motion.div>
                  <div>
                    <h3 className="text-4xl font-bold text-foreground">Archer VTOL</h3>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-sm font-medium">
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      Modular Multi-Mission UAV Platform
                    </div>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Modular, quiet, and mass-producible UAV platform with enhanced terrain performance and AI-assisted operations. 
                  Built with 3K Carbon Fiber Monocoque frame for maximum durability.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground">Specifications</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Frame</span>
                        <span className="text-sm font-medium text-primary">3K Carbon Fiber</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Payload</span>
                        <span className="text-sm font-medium text-primary">4kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Flight Time</span>
                        <span className="text-sm font-medium text-primary">34 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Range</span>
                        <span className="text-sm font-medium text-primary">15km</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground">Features</h4>
                    <div className="space-y-2">
                      {["Enhanced Terrain Performance", "AI-Assisted Operations", "Modular Payload", "Weather Resistance"].map((feature, index) => (
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
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center text-3xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    🚁
                  </motion.div>
                  <div>
                    <h3 className="text-4xl font-bold text-foreground">Iroko UAV</h3>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium">
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      First Response Quadcopter
                    </div>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Modular, mass-producible quadcopter purpose-built for first response and infrastructure inspection. 
                  Can be deployed in 90 seconds with minimal operator training.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground">Specifications</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Deployment</span>
                        <span className="text-sm font-medium text-primary">90 seconds</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Endurance</span>
                        <span className="text-sm font-medium text-primary">50 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Max Speed</span>
                        <span className="text-sm font-medium text-primary">70 km/h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Payload</span>
                        <span className="text-sm font-medium text-primary">1.5kg</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground">Production</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Daily Production</span>
                        <span className="text-sm font-medium text-primary">20 units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Material</span>
                        <span className="text-sm font-medium text-primary">Carbon Fiber</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Local Sourcing</span>
                        <span className="text-sm font-medium text-primary">80%</span>
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
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center text-3xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    🤖
                  </motion.div>
                  <div>
                    <h3 className="text-4xl font-bold text-foreground">Duma UGV</h3>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-medium">
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      Ground Surveillance Platform
                    </div>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Modular, mass-producible UGV platform for ground surveillance and site protection in hazardous environments. 
                  Removes the need for human operators in dangerous situations.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground">Specifications</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Protection</span>
                        <span className="text-sm font-medium text-primary">IP54</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Camera</span>
                        <span className="text-sm font-medium text-primary">4K Video</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Payload</span>
                        <span className="text-sm font-medium text-primary">4kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Range</span>
                        <span className="text-sm font-medium text-primary">15km</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground">Applications</h4>
                    <div className="space-y-2">
                      {["Mine Operations", "Oil & Gas Pipeline", "Power Plant Security", "Hazardous Environments"].map((feature, index) => (
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
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center text-3xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    🗼
                  </motion.div>
                  <div>
                    <h3 className="text-4xl font-bold text-foreground">Kallon Tower</h3>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-sm font-medium">
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      AI-Powered Sentry System
                    </div>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Solar-powered, AI-enabled sentry tower with 24/7 surveillance and multi-tower coordination capabilities. 
                  Detects and tracks threats up to 3km away with advanced edge AI processing.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground">Specifications</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Detection Range</span>
                        <span className="text-sm font-medium text-primary">3km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Power</span>
                        <span className="text-sm font-medium text-primary">Solar + Battery</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Zoom</span>
                        <span className="text-sm font-medium text-primary">30x Optical</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Weather</span>
                        <span className="text-sm font-medium text-primary">IP67</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground">Features</h4>
                    <div className="space-y-2">
                      {["24/7 AI Surveillance", "Multi-Tower Coordination", "Self-Sustaining Power", "Edge AI Processing"].map((feature, index) => (
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

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="group relative inline-flex items-center gap-4 px-12 py-6 text-lg font-bold text-white bg-gradient-to-r from-primary to-terra-steel-blue rounded-2xl overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(74, 144, 226, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 10px 30px rgba(74, 144, 226, 0.3)'
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-terra-steel-blue to-primary"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Explore Our Products</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.button>
          </motion.div>
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
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
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
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              From concept to reality in 11 months - the largest drone manufacturing facility on the African continent, producing 20 Iroko drones daily with 80% local sourcing
            </motion.p>
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

          {/* Manufacturing Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              {
                number: "20",
                label: "Iroko Drones Per Day",
                description: "Daily production capacity at full operation",
                icon: "🏭",
                color: "from-blue-500 to-cyan-600"
              },
              {
                number: "80%",
                label: "Local Component Sourcing",
                description: "Made in Africa competitive advantage",
                icon: "🇳🇬",
                color: "from-green-500 to-emerald-600"
              },
              {
                number: "11",
                label: "Months Journey",
                description: "From concept to operational factory",
                icon: "⚡",
                color: "from-yellow-500 to-orange-600"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="group relative p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/20"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.2), transparent, rgba(74, 144, 226, 0.2))',
                    padding: '2px'
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full rounded-3xl bg-card/50 backdrop-blur-sm" />
                </motion.div>

                <div className="relative z-10 text-center">
                  <motion.div
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div
                    className="text-4xl font-black text-primary mb-2"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 1.8 + index * 0.2, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{stat.label}</h3>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </div>
              </motion.div>
            ))}
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
                <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
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

          {/* Bottom CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="group relative inline-flex items-center gap-4 px-12 py-6 text-lg font-bold text-white bg-gradient-to-r from-primary to-terra-steel-blue rounded-2xl overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(74, 144, 226, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 10px 30px rgba(74, 144, 226, 0.3)'
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-terra-steel-blue to-primary"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Explore Our Manufacturing</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Infrastructure Protection Section */}
      <section className="relative py-32 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Security Grid Pattern */}
          <motion.div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(0deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '100px 100px']
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          
          {/* Security Particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
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
              <span className="text-sm font-medium text-primary">Infrastructure Protection</span>
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
              <span className="block">$13+ Billion in</span>
              <span className="block gradient-text glow-text">Critical Infrastructure Protected</span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Real impact, real results - protecting Africa's most critical assets across multiple sectors
            </motion.p>
          </motion.div>

          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                value: "$13B+",
                unit: "Infrastructure Protected",
                description: "Total value of critical assets under our protection",
                icon: "🛡️",
                color: "from-blue-500 to-cyan-600",
                glowColor: "rgba(59, 130, 246, 0.3)"
              },
              {
                value: "$1.2M",
                unit: "Largest Contract",
                description: "Hydroelectric plant security contract with Nethawk Solutions",
                icon: "⚡",
                color: "from-yellow-500 to-orange-600",
                glowColor: "rgba(245, 158, 11, 0.3)"
              },
              {
                value: "4",
                unit: "Power Plants",
                description: "Major power facilities currently under protection",
                icon: "🏭",
                color: "from-green-500 to-emerald-600",
                glowColor: "rgba(16, 185, 129, 0.3)"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                {/* Card Container */}
                <div className="relative p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/20 overflow-hidden">
                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: `linear-gradient(135deg, ${stat.glowColor}, transparent, ${stat.glowColor})`,
                      padding: '2px'
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full h-full rounded-3xl bg-card/50 backdrop-blur-sm" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Icon */}
                    <motion.div
                      className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 flex items-center justify-center text-4xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.icon}
                    </motion.div>

                    {/* Value */}
                    <motion.div
                      className={`text-6xl md:text-7xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-4`}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {stat.value}
                    </motion.div>

                    {/* Unit */}
                    <div className="text-lg font-semibold text-foreground mb-2">
                      {stat.unit}
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {stat.description}
                    </p>
                  </div>

                  {/* Hover Effects */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Case Studies */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Case Study 1 */}
            <motion.div
              className="group relative"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/20 overflow-hidden">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center text-3xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    ⚡
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Hydroelectric Plant Security</h3>
                    <div className="text-primary font-semibold">$1.2M Contract</div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Securing two major hydroelectric power plants in Nigeria with a comprehensive fleet of drones and sentry towers for real-time threat detection and response.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Real-time Monitoring", "AI Threat Detection", "24/7 Surveillance", "Emergency Response"].map((feature, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Case Study 2 */}
            <motion.div
              className="group relative"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/20 overflow-hidden">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center text-3xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    🏭
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Power Plant Network</h3>
                    <div className="text-primary font-semibold">4 Facilities Protected</div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Comprehensive protection of critical power infrastructure including substations and transmission lines across multiple locations.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Perimeter Security", "Asset Monitoring", "Threat Assessment", "Coordinated Response"].map((feature, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Protected Assets Map */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-foreground mb-4">Protected Assets Across Africa</h3>
              <p className="text-muted-foreground text-lg">Critical infrastructure under Terra Industries protection</p>
            </div>

          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="group relative inline-flex items-center gap-4 px-12 py-6 text-lg font-bold text-white bg-gradient-to-r from-primary to-terra-steel-blue rounded-2xl overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(74, 144, 226, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 10px 30px rgba(74, 144, 226, 0.3)'
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-terra-steel-blue to-primary"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Secure Your Infrastructure</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Technology Innovation Section */}
      <section className="relative py-32 bg-gradient-to-b from-charcoal via-background to-charcoal overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* AI Circuit Pattern */}
          <motion.div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(74, 144, 226, 0.1) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(74, 144, 226, 0.1) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(74, 144, 226, 0.1) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(74, 144, 226, 0.1) 75%)
              `,
              backgroundSize: '60px 60px',
              backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
            }}
            animate={{
              backgroundPosition: ['0 0, 0 30px, 30px -30px, -30px 0px', '60px 60px, 60px 90px, 90px 30px, 30px 60px']
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          
          {/* AI Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -60, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
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
              <span className="text-sm font-medium text-primary">Technology Innovation</span>
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
              <span className="block">ArtemisOS in</span>
              <span className="block gradient-text glow-text">Real-Time Action</span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              AI-powered threat detection, autonomous mission planning, and fleet coordination in real-time
            </motion.p>
          </motion.div>

          {/* Live Dashboard Simulation */}
          <motion.div
            className="relative mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-96 bg-gradient-to-br from-card to-charcoal rounded-3xl overflow-hidden border border-border/20">
              {/* Dashboard Header */}
              <div className="absolute top-4 left-4 right-4 bg-card/80 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="text-sm font-medium text-foreground">ArtemisOS Live Dashboard</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Real-time Monitoring</div>
                </div>
              </div>

              {/* Live Data Streams */}
              <div className="absolute top-20 left-4 right-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Active Drones", value: "12", status: "operational", color: "text-green-500" },
                  { label: "Threats Detected", value: "3", status: "monitoring", color: "text-yellow-500" },
                  { label: "Mission Success", value: "98%", status: "excellent", color: "text-blue-500" }
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                    <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                    <div className="text-xs text-primary">{metric.status}</div>
                  </motion.div>
                ))}
              </div>

              {/* AI Processing Visualization */}
              <div className="absolute bottom-4 left-4 right-4 bg-card/80 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">AI Processing Status</span>
                  <motion.div
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {[
                    { label: "Mission Planning", progress: 85 },
                    { label: "Threat Analysis", progress: 92 },
                    { label: "Fleet Coordination", progress: 78 },
                    { label: "Encryption", progress: 100 }
                  ].map((process, index) => (
                    <div key={index}>
                      <div className="text-xs text-muted-foreground mb-1">{process.label}</div>
                      <div className="w-full bg-border rounded-full h-2">
                        <motion.div
                          className="bg-primary h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${process.progress}%` }}
                          transition={{ delay: 1.2 + index * 0.1, duration: 1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                      <div className="text-xs text-primary font-medium mt-1">{process.progress}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ArtemisOS Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Autonomous Mission Planning",
                description: "AI-driven mission planning with real-time adaptation to changing conditions and threat levels",
                icon: "🧠",
                features: ["Dynamic Route Optimization", "Threat Assessment", "Resource Allocation", "Mission Success Prediction"],
                color: "from-purple-500 to-indigo-600",
                glowColor: "rgba(147, 51, 234, 0.3)"
              },
              {
                title: "Fleet Coordination",
                description: "Advanced swarm intelligence enabling coordinated operations across multiple autonomous systems",
                icon: "🚁",
                features: ["Swarm Intelligence", "Real-time Communication", "Distributed Decision Making", "Collision Avoidance"],
                color: "from-blue-500 to-cyan-600",
                glowColor: "rgba(59, 130, 246, 0.3)"
              },
              {
                title: "AES-256 Encryption",
                description: "Military-grade encryption ensuring secure communication and data protection across all systems",
                icon: "🔒",
                features: ["End-to-End Encryption", "Secure Key Management", "Quantum Resistance", "Zero-Trust Architecture"],
                color: "from-green-500 to-emerald-600",
                glowColor: "rgba(16, 185, 129, 0.3)"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                {/* Card Container */}
                <div className="relative p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/20 overflow-hidden h-full">
                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: `linear-gradient(135deg, ${feature.glowColor}, transparent, ${feature.glowColor})`,
                      padding: '2px'
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full h-full rounded-3xl bg-card/50 backdrop-blur-sm" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon and Title */}
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 flex items-center justify-center text-3xl"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {feature.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${feature.color} text-white text-xs font-medium`}>
                          <motion.div
                            className="w-1.5 h-1.5 bg-white rounded-full"
                            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          AI-Powered
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                      {feature.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {feature.features.map((item, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className="flex items-center gap-3 text-xs text-muted-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.4 + index * 0.2 + featureIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <motion.div
                            className="w-1.5 h-1.5 bg-primary rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: featureIndex * 0.2 }}
                          />
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Hover Effects */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="group relative inline-flex items-center gap-4 px-12 py-6 text-lg font-bold text-white bg-gradient-to-r from-primary to-terra-steel-blue rounded-2xl overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(74, 144, 226, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 10px 30px rgba(74, 144, 226, 0.3)'
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-terra-steel-blue to-primary"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Experience ArtemisOS</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* International Expansion Section */}
      <section className="relative py-32 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Global Grid Pattern */}
          <motion.div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(0deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '120px 120px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '120px 120px']
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          
          {/* Global Particles */}
          {[...Array(35)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -120, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
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
              <span className="text-sm font-medium text-primary">International Expansion</span>
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
              <span className="block">From Nigeria to</span>
              <span className="block gradient-text glow-text">the World</span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Successfully exporting to South Africa and expanding across Africa with pan-African security solutions
            </motion.p>
          </motion.div>


          {/* Expansion Strategy */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Strategy Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold text-foreground">
                <span className="block">Pan-African</span>
                <span className="block gradient-text">Expansion Strategy</span>
              </h3>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Building a network of drone factories across Africa, starting with our successful expansion to South Africa 
                and targeting key markets for critical infrastructure protection.
              </p>

              {/* Expansion Phases */}
              <div className="space-y-6">
                {[
                  { phase: "Phase 1", title: "South Africa Success", status: "Completed", description: "Successfully established operations and secured contracts" },
                  { phase: "Phase 2", title: "West Africa Expansion", status: "In Progress", description: "Ghana and Nigeria market consolidation" },
                  { phase: "Phase 3", title: "East Africa Entry", status: "Planned", description: "Kenya and Tanzania market entry" },
                  { phase: "Phase 4", title: "North Africa", status: "Future", description: "Egypt and Morocco expansion" }
                ].map((phase, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/20"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6 + index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        phase.status === "Completed" ? "bg-green-500" :
                        phase.status === "In Progress" ? "bg-blue-500" :
                        phase.status === "Planned" ? "bg-yellow-500" : "bg-gray-500"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {index + 1}
                    </motion.div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-primary">{phase.phase}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          phase.status === "Completed" ? "bg-green-500/20 text-green-500" :
                          phase.status === "In Progress" ? "bg-blue-500/20 text-blue-500" :
                          phase.status === "Planned" ? "bg-yellow-500/20 text-yellow-500" : "bg-gray-500/20 text-gray-500"
                        }`}>
                          {phase.status}
                        </span>
                      </div>
                      <h4 className="font-semibold text-foreground">{phase.title}</h4>
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Success Metrics */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-foreground">Expansion Success</h3>

              {/* Success Stats */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "100%", label: "South Africa Success Rate", color: "text-green-500" },
                  { value: "3x", label: "Revenue Growth", color: "text-blue-500" },
                  { value: "15+", label: "New Contracts", color: "text-primary" },
                  { value: "5", label: "Countries Targeted", color: "text-yellow-500" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Key Achievements */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground">Key Achievements</h4>
                {[
                  "Successfully established South African operations",
                  "Secured multiple government contracts",
                  "Built local manufacturing partnerships",
                  "Expanded product portfolio for regional needs"
                ].map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2 + index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-primary rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    />
                    <span className="text-muted-foreground">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="group relative inline-flex items-center gap-4 px-12 py-6 text-lg font-bold text-white bg-gradient-to-r from-primary to-terra-steel-blue rounded-2xl overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(74, 144, 226, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 10px 30px rgba(74, 144, 226, 0.3)'
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-terra-steel-blue to-primary"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Join Our Global Expansion</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
