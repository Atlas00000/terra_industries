"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroBackground } from "@/components/hero-background"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useState, useEffect } from "react"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
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

      {/* Leadership Excellence Section */}
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
              <span className="block">Led by Africa's</span>
              <span className="block gradient-text glow-text">Most Influential Leaders</span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Royal authority, military expertise, and engineering excellence driving Africa's defense technology revolution
            </motion.p>
          </motion.div>

          {/* Leadership Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                name: "His Imperial Majesty, the Ooni of Ife",
                title: "Board of Directors",
                description: "One of Africa's most powerful kings, bringing deep passion for Nigeria's industrial and economic prosperity",
                expertise: "Royal Leadership & Economic Vision",
                image: "/placeholder-user.jpg",
                color: "from-yellow-400 to-amber-500",
                glowColor: "rgba(251, 191, 36, 0.3)"
              },
              {
                name: "Retired Air Vice Marshal Ayoola Jolasinmi",
                title: "Military Expertise",
                description: "Distinguished career in the Nigerian Air Force with extensive experience in defense operations and strategic planning",
                expertise: "Defense Strategy & Military Operations",
                image: "/placeholder-user.jpg",
                color: "from-blue-500 to-blue-700",
                glowColor: "rgba(59, 130, 246, 0.3)"
              },
              {
                name: "Engr. Mansur Ahmed",
                title: "Engineering Leadership",
                description: "Extensive technical expertise and engineering leadership driving innovation in autonomous defense systems",
                expertise: "Technical Innovation & Product Development",
                image: "/placeholder-user.jpg",
                color: "from-green-500 to-emerald-600",
                glowColor: "rgba(16, 185, 129, 0.3)"
              }
            ].map((leader, index) => (
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
                      background: `linear-gradient(135deg, ${leader.glowColor}, transparent, ${leader.glowColor})`,
                      padding: '2px'
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full h-full rounded-3xl bg-card/50 backdrop-blur-sm" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Portrait Container */}
                    <motion.div
                      className="relative w-32 h-32 mx-auto mb-8 rounded-2xl overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Image */}
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 flex items-center justify-center">
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">
                            {leader.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Glow Effect */}
                      <motion.div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${leader.color} opacity-0`}
                        whileHover={{ opacity: 0.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>

                    {/* Name */}
                    <motion.h3
                      className="text-2xl font-bold text-foreground mb-2 text-center"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      {leader.name}
                    </motion.h3>

                    {/* Title */}
                    <motion.div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${leader.color} text-white text-sm font-medium mx-auto mb-6`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      {leader.title}
                    </motion.div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 text-center">
                      {leader.description}
                    </p>

                    {/* Expertise */}
                    <motion.div
                      className="text-center"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-xs text-primary font-medium uppercase tracking-wider">
                        {leader.expertise}
                      </div>
                    </motion.div>
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
              <span className="relative z-10">Meet Our Leadership Team</span>
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

      {/* Product Ecosystem Section */}
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
              Complete autonomous defense ecosystem protecting Africa's critical infrastructure
            </motion.p>
          </motion.div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "ArtemisOS",
                title: "AI-Powered Central Intelligence Platform",
                description: "Central intelligence platform for all autonomous systems with real-time threat detection and fleet management",
                features: ["Autonomous Mission Planning", "Real-Time Threat Detection", "Fleet Coordination", "AES-256 Encryption"],
                icon: "🧠",
                color: "from-purple-500 to-indigo-600",
                glowColor: "rgba(147, 51, 234, 0.3)"
              },
              {
                name: "Archer VTOL",
                title: "Modular Multi-Mission UAV Platform",
                description: "Modular, quiet, and mass-producible UAV platform with enhanced terrain performance and AI-assisted operations",
                features: ["3K Carbon Fiber Frame", "4kg Payload Capacity", "34min Flight Time", "15km Range"],
                icon: "🚁",
                color: "from-blue-500 to-cyan-600",
                glowColor: "rgba(59, 130, 246, 0.3)"
              },
              {
                name: "Iroko UAV",
                title: "First Response Quadcopter - 90 Second Deployment",
                description: "Modular, mass-producible quadcopter purpose-built for first response and infrastructure inspection",
                features: ["90 Second Deployment", "50min Endurance", "70km/h Max Speed", "1.5kg Payload"],
                icon: "🚁",
                color: "from-green-500 to-emerald-600",
                glowColor: "rgba(16, 185, 129, 0.3)"
              },
              {
                name: "Duma UGV",
                title: "Ground Surveillance Platform",
                description: "Modular, mass-producible UGV platform for ground surveillance and site protection in hazardous environments",
                features: ["IP54 Protection", "4K Video Recording", "4kg Payload", "15km Range"],
                icon: "🤖",
                color: "from-orange-500 to-red-600",
                glowColor: "rgba(249, 115, 22, 0.3)"
              },
              {
                name: "Kallon Tower",
                title: "AI-Powered Sentry System - 3km Detection Range",
                description: "Solar-powered, AI-enabled sentry tower with 24/7 surveillance and multi-tower coordination capabilities",
                features: ["3km Detection Range", "Solar Powered", "30x Optical Zoom", "IP67 Weather Resistance"],
                icon: "🗼",
                color: "from-yellow-500 to-orange-600",
                glowColor: "rgba(245, 158, 11, 0.3)"
              }
            ].map((product, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                {/* Card Container */}
                <div className="relative p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/20 overflow-hidden h-full">
                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: `linear-gradient(135deg, ${product.glowColor}, transparent, ${product.glowColor})`,
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
                    {/* Icon and Name */}
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 flex items-center justify-center text-3xl"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {product.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{product.name}</h3>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${product.color} text-white text-xs font-medium`}>
                          <motion.div
                            className="w-1.5 h-1.5 bg-white rounded-full"
                            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          {product.title}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {product.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className="flex items-center gap-3 text-xs text-muted-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1 + index * 0.1 + featureIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <motion.div
                            className="w-1.5 h-1.5 bg-primary rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: featureIndex * 0.2 }}
                          />
                          {feature}
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

      {/* Manufacturing Excellence Section */}
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
              backgroundSize: '80px 80px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '80px 80px']
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          
          {/* Manufacturing Particles */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -80, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3
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
              "Made in Africa" competitive advantage with 80% local sourcing and mass production capabilities
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                value: "20",
                unit: "Drones Per Day",
                description: "Production capacity of Iroko drones",
                icon: "🏭",
                color: "from-blue-500 to-cyan-600",
                glowColor: "rgba(59, 130, 246, 0.3)"
              },
              {
                value: "80%",
                unit: "Local Sourcing",
                description: "Components manufactured or sourced within Nigeria",
                icon: "🇳🇬",
                color: "from-green-500 to-emerald-600",
                glowColor: "rgba(16, 185, 129, 0.3)"
              },
              {
                value: "11",
                unit: "Months",
                description: "Journey from conceptualization to realization",
                icon: "⚡",
                color: "from-yellow-500 to-orange-600",
                glowColor: "rgba(245, 158, 11, 0.3)"
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

          {/* Manufacturing Process */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Content */}
            <div className="space-y-8">
              <motion.h3
                className="text-4xl md:text-5xl font-bold text-foreground"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="block">From Concept to</span>
                <span className="block gradient-text">Reality in 11 Months</span>
              </motion.h3>

              <motion.p
                className="text-lg text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                viewport={{ once: true }}
              >
                Our manufacturing facility represents the largest drone factory on the African continent, 
                demonstrating our commitment to local production and "Made in Africa" excellence.
              </motion.p>

              {/* Process Steps */}
              <div className="space-y-4">
                {[
                  "Conceptualization & Design",
                  "Local Component Sourcing",
                  "Assembly Line Setup",
                  "Quality Control & Testing",
                  "Mass Production Launch"
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-terra-steel-blue flex items-center justify-center text-white text-sm font-bold"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {index + 1}
                    </motion.div>
                    <span className="text-foreground font-medium">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Visual Representation */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Factory Visualization */}
              <div className="relative w-full h-96 bg-gradient-to-br from-card to-charcoal rounded-3xl overflow-hidden border border-border/20">
                {/* Assembly Line Animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                
                {/* Robotic Arms */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2 + i * 0.5, 
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  >
                    <span className="text-2xl">🤖</span>
                  </motion.div>
                ))}

                {/* Production Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-card/80 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-muted-foreground">Current Production</div>
                      <div className="text-2xl font-bold text-foreground">20/day</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Local Sourcing</div>
                      <div className="text-2xl font-bold text-primary">80%</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
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
              <span className="relative z-10">Visit Our Manufacturing Facility</span>
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

            {/* Interactive Map Visualization */}
            <div className="relative w-full h-96 bg-gradient-to-br from-card to-charcoal rounded-3xl overflow-hidden border border-border/20">
              {/* Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              
              {/* Protected Assets */}
              {[
                { name: "Nigeria", type: "Power Plants", count: 4, x: "20%", y: "60%" },
                { name: "South Africa", type: "Mining Operations", count: 2, x: "75%", y: "80%" },
                { name: "Ghana", type: "Oil Refineries", count: 1, x: "15%", y: "45%" },
                { name: "Kenya", type: "Telecommunications", count: 1, x: "70%", y: "35%" }
              ].map((asset, index) => (
                <motion.div
                  key={index}
                  className="absolute w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ left: asset.x, top: asset.y }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    boxShadow: ['0 0 0 rgba(74, 144, 226, 0.3)', '0 0 20px rgba(74, 144, 226, 0.6)', '0 0 0 rgba(74, 144, 226, 0.3)']
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: index * 0.5 
                  }}
                  whileHover={{ scale: 1.3 }}
                >
                  {asset.count}
                </motion.div>
              ))}

              {/* Connection Lines */}
              <motion.svg
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
                viewport={{ once: true }}
              >
                <motion.line
                  x1="20%"
                  y1="60%"
                  x2="75%"
                  y2="80%"
                  stroke="rgba(74, 144, 226, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  animate={{ strokeDashoffset: [0, 10] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.line
                  x1="20%"
                  y1="60%"
                  x2="15%"
                  y2="45%"
                  stroke="rgba(74, 144, 226, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  animate={{ strokeDashoffset: [0, 10] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
              </motion.svg>

              {/* Stats Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-card/80 backdrop-blur-sm rounded-2xl p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Countries</div>
                    <div className="text-2xl font-bold text-foreground">4</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Assets Protected</div>
                    <div className="text-2xl font-bold text-primary">8</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Value</div>
                    <div className="text-2xl font-bold text-foreground">$13B+</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Coverage</div>
                    <div className="text-2xl font-bold text-primary">24/7</div>
                  </div>
                </div>
              </div>
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

          {/* World Map Visualization */}
          <motion.div
            className="relative mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-96 bg-gradient-to-br from-card to-charcoal rounded-3xl overflow-hidden border border-border/20">
              {/* Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              
              {/* Country Markers */}
              {[
                { name: "Nigeria", status: "Headquarters", x: "45%", y: "65%", color: "bg-primary", size: "w-8 h-8" },
                { name: "South Africa", status: "Active Operations", x: "60%", y: "85%", color: "bg-green-500", size: "w-6 h-6" },
                { name: "Ghana", status: "Expansion Target", x: "40%", y: "55%", color: "bg-yellow-500", size: "w-4 h-4" },
                { name: "Kenya", status: "Expansion Target", x: "65%", y: "45%", color: "bg-yellow-500", size: "w-4 h-4" },
                { name: "Egypt", status: "Future Market", x: "55%", y: "35%", color: "bg-gray-500", size: "w-3 h-3" }
              ].map((country, index) => (
                <motion.div
                  key={index}
                  className={`absolute ${country.color} rounded-full flex items-center justify-center text-white text-xs font-bold ${country.size}`}
                  style={{ left: country.x, top: country.y }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    boxShadow: ['0 0 0 rgba(74, 144, 226, 0.3)', '0 0 20px rgba(74, 144, 226, 0.6)', '0 0 0 rgba(74, 144, 226, 0.3)']
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: index * 0.3 
                  }}
                  whileHover={{ scale: 1.3 }}
                >
                  {country.name === "Nigeria" ? "🇳🇬" : country.name === "South Africa" ? "🇿🇦" : "📍"}
                </motion.div>
              ))}

              {/* Connection Lines */}
              <motion.svg
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                viewport={{ once: true }}
              >
                <motion.line
                  x1="45%"
                  y1="65%"
                  x2="60%"
                  y2="85%"
                  stroke="rgba(74, 144, 226, 0.5)"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  animate={{ strokeDashoffset: [0, 10] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.line
                  x1="45%"
                  y1="65%"
                  x2="40%"
                  y2="55%"
                  stroke="rgba(245, 158, 11, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="3,3"
                  animate={{ strokeDashoffset: [0, 6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.line
                  x1="45%"
                  y1="65%"
                  x2="65%"
                  y2="45%"
                  stroke="rgba(245, 158, 11, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="3,3"
                  animate={{ strokeDashoffset: [0, 6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </motion.svg>

              {/* Expansion Timeline */}
              <div className="absolute bottom-4 left-4 right-4 bg-card/80 backdrop-blur-sm rounded-2xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Current Markets</div>
                    <div className="text-2xl font-bold text-foreground">2</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Expansion Targets</div>
                    <div className="text-2xl font-bold text-yellow-500">3</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Future Markets</div>
                    <div className="text-2xl font-bold text-gray-500">5+</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Pan-African Vision</div>
                    <div className="text-2xl font-bold text-primary">54</div>
                  </div>
                </div>
              </div>
            </div>
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
