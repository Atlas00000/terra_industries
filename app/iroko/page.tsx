"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"

// Import Iroko sections
import { IrokoHeroSection } from "@/components/iroko/iroko-hero-section"
import { IrokoApplicationsSection } from "@/components/iroko/iroko-applications-section"
import { IrokoSpecificationsSection } from "@/components/iroko/iroko-specifications-section"
import { IrokoOperationsSection } from "@/components/iroko/iroko-operations-section"
import { IrokoMarketSection } from "@/components/iroko/iroko-market-section"

export default function IrokoPage() {
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

        {/* Iroko Hero Section */}
        <IrokoHeroSection />

        {/* Mission Applications Section */}
        <IrokoApplicationsSection />

        {/* Technical Specifications Section */}
        <IrokoSpecificationsSection />

        {/* Operations Section */}
        <IrokoOperationsSection />

        {/* Market Section - Use Cases & Competitive Advantages */}
        <IrokoMarketSection />

        <Footer />
      </main>
    </MobileLayout>
  )
}
