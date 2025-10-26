"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

// Import desktop sections (unchanged for web view)
import { HeroSection } from "@/components/sections/hero-section"
import { WhoWeAreSection } from "@/components/sections/who-we-are-section"
import { LeadershipSection } from "@/components/sections/leadership-section"
import { ProductEcosystemSection } from "@/components/sections/product-ecosystem-section"
import { InternationalSection } from "@/components/sections/international-section"

// Import mobile-optimized sections (no stuttering)
import { MobileHeroSection } from "@/components/sections/mobile-hero-section"
import { MobileWhoWeAreSection } from "@/components/sections/mobile-who-we-are-section"
import { MobileLeadershipSection } from "@/components/sections/mobile-leadership-section"
import { MobileProductEcosystemSection } from "@/components/sections/mobile-product-ecosystem-section"

import { useState, useEffect } from "react"

export default function Home() {
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

        {/* Hero Section - Mobile Optimized */}
        {isMobile ? (
          <MobileHeroSection />
        ) : (
          <HeroSection />
        )}

        {/* Who We Are Section - Mobile Optimized */}
        {isMobile ? (
          <MobileWhoWeAreSection />
        ) : (
          <WhoWeAreSection />
        )}

        {/* Leadership Excellence Section - Mobile Optimized */}
        {isMobile ? (
          <MobileLeadershipSection />
        ) : (
          <LeadershipSection />
        )}

        {/* Product Ecosystem Section - Mobile Optimized */}
        {isMobile ? (
          <MobileProductEcosystemSection />
        ) : (
          <ProductEcosystemSection />
        )}

        {/* International Expansion Section - Desktop Only */}
        {!isMobile && <InternationalSection />}

        <Footer />
      </main>
    </MobileLayout>
  )
}