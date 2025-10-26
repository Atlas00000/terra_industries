"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Lazy load Artemis sections with threshold for mobile optimization
const ArtemisHeroSection = dynamic(() => import("@/components/artemis/artemis-hero-section-v2").then(mod => ({ default: mod.ArtemisHeroSection })), {
  loading: () => <div className="h-screen bg-background" />,
  ssr: false
})

const ArtemisIntelligenceSection = dynamic(() => import("@/components/artemis/artemis-intelligence-section-v2").then(mod => ({ default: mod.ArtemisIntelligenceSection })), {
  loading: () => <div className="h-96 bg-background" />,
  ssr: false
})

const ArtemisCapabilitiesSection = dynamic(() => import("@/components/artemis/artemis-capabilities-section-v2").then(mod => ({ default: mod.ArtemisCapabilitiesSection })), {
  loading: () => <div className="h-96 bg-background" />,
  ssr: false
})

const ArtemisIntegrationSection = dynamic(() => import("@/components/artemis/artemis-integration-section-v2").then(mod => ({ default: mod.ArtemisIntegrationSection })), {
  loading: () => <div className="h-96 bg-background" />,
  ssr: false
})

const MobileArtemisSlideshow = dynamic(() => import("@/components/mobile-artemis-slideshow").then(mod => ({ default: mod.MobileArtemisSlideshow })), {
  loading: () => <div className="h-96 bg-background" />,
  ssr: false
})

export default function ArtemisPage() {
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

        {/* Artemis Hero Section - Always visible */}
        <ArtemisHeroSection />

        {/* Mobile: Combined AI Intelligence & System Integration Slideshow */}
        {isMobile ? (
          <MobileArtemisSlideshow />
        ) : (
          <>
            {/* Desktop: Individual Sections */}
            <ArtemisIntelligenceSection />
            <ArtemisCapabilitiesSection />
            <ArtemisIntegrationSection />
          </>
        )}

        <Footer />
      </main>
    </MobileLayout>
  )
}
