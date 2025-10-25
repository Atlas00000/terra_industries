"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"

// Import Artemis sections
import { ArtemisHeroSection } from "@/components/artemis/artemis-hero-section-v2"
import { ArtemisIntelligenceSection } from "@/components/artemis/artemis-intelligence-section-v2"
import { ArtemisCapabilitiesSection } from "@/components/artemis/artemis-capabilities-section-v2"
import { ArtemisIntegrationSection } from "@/components/artemis/artemis-integration-section-v2"

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

        {/* Artemis Hero Section */}
        <ArtemisHeroSection />

        {/* AI Intelligence Core */}
        <ArtemisIntelligenceSection />

        {/* Core Capabilities */}
        <ArtemisCapabilitiesSection />

        {/* System Integration */}
        <ArtemisIntegrationSection />

        <Footer />
      </main>
    </MobileLayout>
  )
}
