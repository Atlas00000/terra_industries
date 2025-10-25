"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"

// Import Archer sections
import { ArcherHeroSection } from "@/components/archer/archer-hero-section"
import { ArcherCapabilitiesSection } from "@/components/archer/archer-capabilities-section"
import { ArcherSpecificationsSection } from "@/components/archer/archer-specifications-section"
import { ArcherApplicationsSection } from "@/components/archer/archer-applications-section"

export default function ArcherPage() {
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

        {/* Archer Hero Section */}
        <ArcherHeroSection />

        {/* Flight Capabilities Section */}
        <ArcherCapabilitiesSection />

        {/* Technical Specifications Section */}
        <ArcherSpecificationsSection />

        {/* Mission Applications Section */}
        <ArcherApplicationsSection />

        <Footer />
      </main>
    </MobileLayout>
  )
}
