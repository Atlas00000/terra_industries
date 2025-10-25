"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"
import { DumaHeroSection } from "@/components/duma/duma-hero-section"
import { DumaApplicationsSection } from "@/components/duma/duma-applications-section"
import { DumaSpecificationsSection } from "@/components/duma/duma-specifications-section"
import { DumaOperationsSection } from "@/components/duma/duma-operations-section"
import { DumaMarketSection } from "@/components/duma/duma-market-section"

export default function DumaPage() {
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

        <DumaHeroSection />
        <DumaApplicationsSection />
        <DumaSpecificationsSection />
        <DumaOperationsSection />
        <DumaMarketSection />

        <Footer />
      </main>
    </MobileLayout>
  )
}
