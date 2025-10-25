"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Products", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50"
          : "bg-gradient-to-b from-background/80 to-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <motion.div
            className="w-12 h-12 rounded-lg flex items-center justify-center border border-terra-silver/30 glow-pulse overflow-hidden"
            style={{
              backgroundImage: "linear-gradient(135deg, rgba(74, 144, 226, 0.2) 0%, rgba(46, 91, 186, 0.1) 100%)",
            }}
            whileHover={{
              boxShadow: "0 0 30px rgba(74, 144, 226, 0.5)",
            }}
          >
            <Image
              src="/terra-logo.png"
              alt="Terra Industries Logo"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.span
            className="text-2xl font-black text-foreground tracking-widest font-display"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            TERRAINDUSTRIES
          </motion.span>
        </motion.div>

        <nav className="flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="relative text-muted-foreground hover:text-primary transition-colors duration-300 font-medium text-sm tracking-wide"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              {item.label}
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-terra-steel-blue"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </nav>

        <motion.button
          className="btn-cta text-sm font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Get Started
        </motion.button>
      </div>

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
