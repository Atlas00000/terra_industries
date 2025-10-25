"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"

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

        {/* Basic Duma Page - Ready for components */}
        <section className="relative py-24 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
          <div className="relative z-10 max-w-[80vw] mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8">
                <span className="block">Duma UGV</span>
                <span className="block bg-gradient-to-r from-primary via-orange-500 to-red-400 bg-clip-text text-transparent">
                  Unmanned Ground Vehicle
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Autonomous unmanned ground vehicle designed for ground-based security operations 
                with all-terrain capabilities and integrated weapon systems.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </MobileLayout>
  )
}
