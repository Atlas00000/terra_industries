"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

export function MobileHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isMobile, getTouchSettings, getAnimationSettings } = useMobileOptimization()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20) // Lower threshold for mobile
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Artemis", href: "/artemis" },
    { label: "Archer", href: "/archer" },
    { label: "Iroko", href: "/iroko" },
    { label: "Duma", href: "/duma" },
    { label: "Kallon", href: "/kallon" },
    { label: "Company", href: "/company" },
  ]

  const animationSettings = getAnimationSettings()
  const touchSettings = getTouchSettings()

  if (!isMobile) {
    return null // Use regular header on desktop
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50"
          : "bg-background/80 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.div 
            className="flex items-center gap-2 cursor-pointer" 
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-10 h-10 rounded-lg flex items-center justify-center border border-terra-silver/30 overflow-hidden"
              style={{
                backgroundImage: "linear-gradient(135deg, rgba(74, 144, 226, 0.2) 0%, rgba(46, 91, 186, 0.1) 100%)",
              }}
            >
              <Image
                src="/terra-logo.png"
                alt="Terra Industries Logo"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.span
              className="text-lg font-black text-foreground tracking-wide font-display"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              TERRA
            </motion.span>
          </motion.div>
        </Link>

        {/* Mobile Menu Button */}
        <motion.button
          className="relative w-10 h-10 flex items-center justify-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.95 }}
          style={touchSettings}
        >
          <motion.div
            className="w-6 h-0.5 bg-foreground"
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 0 : -4
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute w-6 h-0.5 bg-foreground"
            animate={{
              opacity: isMenuOpen ? 0 : 1
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="w-6 h-0.5 bg-foreground"
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? 0 : 4
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full px-6">
              {/* Close Button */}
              <motion.button
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center"
                onClick={() => setIsMenuOpen(false)}
                whileTap={{ scale: 0.95 }}
                style={touchSettings}
              >
                <div className="w-6 h-0.5 bg-foreground rotate-45" />
                <div className="w-6 h-0.5 bg-foreground -rotate-45 absolute" />
              </motion.button>

              {/* Navigation Items */}
              <div className="space-y-6 text-center">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="block text-xl font-semibold text-foreground hover:text-primary transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-primary/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onClick={() => setIsMenuOpen(false)}
                    style={touchSettings}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      {isScrolled && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.header>
  )
}
