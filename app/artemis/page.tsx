"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"

// Import Artemis sections
import { ArtemisCapabilitiesSection } from "@/components/artemis/artemis-capabilities-section"

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

        {/* Basic Artemis Page - Ready for components */}
        <section className="relative py-24 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
          <div className="relative z-10 max-w-[80vw] mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8">
                <span className="block">ArtemisOS</span>
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-green-400 bg-clip-text text-transparent">
                  Central Intelligence
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                The flagship AI-powered operating system serving as the central intelligence platform 
                for all autonomous defense systems.
              </p>
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <ArtemisCapabilitiesSection />

        <Footer />
      </main>
    </MobileLayout>
  )
}
