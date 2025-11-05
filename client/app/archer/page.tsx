"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Lazy load Archer sections with threshold for mobile optimization
const ArcherHeroSection = dynamic(() => import("@/components/archer/archer-hero-section").then(mod => ({ default: mod.ArcherHeroSection })), {
  loading: () => <div className="h-screen bg-background" />,
  ssr: false
})

const ArcherCapabilitiesSection = dynamic(() => import("@/components/archer/archer-capabilities-section").then(mod => ({ default: mod.ArcherCapabilitiesSection })), {
  loading: () => <div className="h-96 bg-background" />,
  ssr: false
})

const ArcherSpecificationsSection = dynamic(() => import("@/components/archer/archer-specifications-section").then(mod => ({ default: mod.ArcherSpecificationsSection })), {
  loading: () => <div className="h-96 bg-background" />,
  ssr: false
})

const ArcherApplicationsSection = dynamic(() => import("@/components/archer/archer-applications-section").then(mod => ({ default: mod.ArcherApplicationsSection })), {
  loading: () => <div className="h-96 bg-background" />,
  ssr: false
})

const MobileArcherSlideshow = dynamic(() => import("@/components/mobile-archer-slideshow").then(mod => ({ default: mod.MobileArcherSlideshow })), {
  loading: () => <div className="h-96 bg-background" />,
  ssr: false
})

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

        {/* Archer Hero Section - Always visible */}
        <ArcherHeroSection />

        {/* Mobile: Combined Flight Capabilities & Technical Specifications Slideshow */}
        {isMobile ? (
          <MobileArcherSlideshow />
        ) : (
          <>
            {/* Desktop: Individual Sections */}
            <ArcherCapabilitiesSection />
            <ArcherSpecificationsSection />
          </>
        )}

        {/* Mission Applications Section */}
        <ArcherApplicationsSection />

        <Footer />
      </main>
    </MobileLayout>
  )
}
