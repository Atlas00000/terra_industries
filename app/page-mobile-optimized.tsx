"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

// Import mobile-optimized sections
import { MobileHeroSection } from "@/components/sections/mobile-hero-section"
import { MobileWhoWeAreSection } from "@/components/sections/mobile-who-we-are-section"
import { MobileLeadershipSection } from "@/components/sections/mobile-leadership-section"
import { MobileProductEcosystemSection } from "@/components/sections/mobile-product-ecosystem-section"

import { useState, useEffect } from "react"

export default function MobileOptimizedHome() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  
  // Mobile optimization
  const { isMobile } = useMobileOptimization()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleLoadingComplete = () => {
    setShowLoading(false)
  }

  if (showLoading) {
    return <Loading onComplete={handleLoadingComplete} />
  }

  return (
    <MobileLayout>
      <main className="min-h-screen bg-background text-foreground overflow-hidden">
        {isMobile ? <MobileHeader /> : <Header />}

        {/* Mobile-Optimized Hero Section */}
        {isMobile ? (
          <MobileHeroSection />
        ) : (
          // Fallback to original hero for desktop
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-charcoal via-background to-charcoal">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-foreground">Desktop Hero</h1>
              <p className="text-muted-foreground">This is the desktop version</p>
            </div>
          </div>
        )}

        {/* Mobile-Optimized Who We Are Section */}
        {isMobile ? (
          <MobileWhoWeAreSection />
        ) : (
          // Fallback to original for desktop
          <div className="py-24 bg-gradient-to-b from-background via-charcoal to-background">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-foreground">Desktop Who We Are</h2>
            </div>
          </div>
        )}

        {/* Mobile-Optimized Leadership Section */}
        {isMobile ? (
          <MobileLeadershipSection />
        ) : (
          // Fallback to original for desktop
          <div className="py-24 bg-gradient-to-b from-background to-charcoal">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-foreground">Desktop Leadership</h2>
            </div>
          </div>
        )}

        {/* Mobile-Optimized Product Ecosystem Section */}
        {isMobile ? (
          <MobileProductEcosystemSection />
        ) : (
          // Fallback to original for desktop
          <div className="py-24 bg-gradient-to-b from-charcoal to-background">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-foreground">Desktop Products</h2>
            </div>
          </div>
        )}

        <Footer />
      </main>
    </MobileLayout>
  )
}
