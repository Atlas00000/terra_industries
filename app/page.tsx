"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { MobileLeadershipSlideshow } from "@/components/mobile-leadership-slideshow"
import { MobileProductSlideshow } from "@/components/mobile-product-slideshow"
import { MobileExpansionSlideshow } from "@/components/mobile-expansion-slideshow"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

// Import critical sections (Hero, Who We Are, Leadership, Product Ecosystem, International Expansion)
import { HeroSection } from "@/components/sections/hero-section"
import { WhoWeAreSection } from "@/components/sections/who-we-are-section"
import { LeadershipSection } from "@/components/sections/leadership-section"
import { ProductEcosystemSection } from "@/components/sections/product-ecosystem-section"
import { InternationalSection } from "@/components/sections/international-section"

// Lazy load non-critical sections (5+ - if any future sections are added)

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  
  // Mobile optimization
  const { isMobile } = useMobileOptimization()

  useEffect(() => {
    setIsLoaded(true)
    
    // Preload critical images to prevent stuttering in production
    const criticalImages = [
      '/stories/hero-image.jpg',
      '/stories/company-image.jpg',
      '/stories/leadership-image.jpg',
      '/stories/product-image.jpg',
      '/stories/expansion-image.jpg'
    ]
    
    criticalImages.forEach(src => {
      const img = new window.Image()
      img.src = src
    })
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

        {/* Hero Section */}
        <HeroSection />

        {/* Who We Are Section */}
        <WhoWeAreSection />

        {/* Leadership Excellence Section */}
        {!isMobile ? (
          <LeadershipSection />
        ) : (
          <MobileLeadershipSlideshow />
        )}

        {/* Product Ecosystem Section */}
        {!isMobile ? (
          <ProductEcosystemSection />
        ) : (
          <MobileProductSlideshow />
        )}

        {/* International Expansion Section - Desktop Only */}
        {!isMobile && <InternationalSection />}

        <Footer />
      </main>
    </MobileLayout>
  )
}