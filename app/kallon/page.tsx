"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"
import { KallonHeroSection } from "@/components/kallon/kallon-hero-section"
import { KallonApplicationsSection } from "@/components/kallon/kallon-applications-section"
import { KallonSpecificationsSection } from "@/components/kallon/kallon-specifications-section"
import { KallonIntelligenceSection } from "@/components/kallon/kallon-intelligence-section"
import { KallonSupportSection } from "@/components/kallon/kallon-support-section"

export default function KallonPage() {
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

        <KallonHeroSection />
        <KallonApplicationsSection />
        <KallonSpecificationsSection />
        <KallonIntelligenceSection />
        <KallonSupportSection />

        <Footer />
      </main>
    </MobileLayout>
  )
}
