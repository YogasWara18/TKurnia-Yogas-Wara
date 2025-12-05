"use client"

import { useEffect, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface GSAPProviderProps {
  children: ReactNode
}

export default function GSAPProvider({ children }: GSAPProviderProps) {
  useEffect(() => {
    // Refresh ScrollTrigger after all content is loaded
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return <>{children}</>
}
