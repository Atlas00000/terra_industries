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

// Import critical sections (Hero and Who We Are - above the fold)
import { HeroSection } from "@/components/sections/hero-section"
import { WhoWeAreSection } from "@/components/sections/who-we-are-section"

// Lazy load non-critical sections (3+)
const LeadershipSection = dynamic(() => import("@/components/sections/leadership-section").then(mod => ({ default: mod.LeadershipSection })), {
  loading: () => <div className="h-96 bg-gradient-to-b from-background via-charcoal to-background animate-pulse" />
})

const ProductEcosystemSection = dynamic(() => import("@/components/sections/product-ecosystem-section").then(mod => ({ default: mod.ProductEcosystemSection })), {
  loading: () => <div className="h-96 bg-gradient-to-b from-background to-charcoal animate-pulse" />
})


const InternationalSection = dynamic(() => import("@/components/sections/international-section").then(mod => ({ default: mod.InternationalSection })), {
  loading: () => <div className="h-96 bg-gradient-to-b from-background via-charcoal to-background animate-pulse" />
})

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

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