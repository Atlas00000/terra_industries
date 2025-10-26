"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"
import { CompanyExcellenceSection } from "@/components/company/company-excellence-section"
import { CompanyPartnershipsSection } from "@/components/company/company-partnerships-section"
import { CompanyMarketSection } from "@/components/company/company-market-section"
import { CompanyNewsSection } from "@/components/company/company-news-section"

export default function CompanyPage() {
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

        <CompanyExcellenceSection />
        <CompanyPartnershipsSection />
        <CompanyMarketSection />
        <CompanyNewsSection />

        <Footer />
      </main>
    </MobileLayout>
  )
}
