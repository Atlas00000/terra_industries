"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden flex flex-col">
      <Header />

      <div className="flex-1" />

      <Footer />
    </main>
  )
}
