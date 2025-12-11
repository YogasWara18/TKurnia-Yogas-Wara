"use client"

export default function Footer() {
  return (
    <footer className="py-6 px-6 border-t border-border bg-checkerboard flex items-center justify-center">
      <p className="text-muted-foreground text-sm text-center">
        ©{new Date().getFullYear()} Portfolio | Yogas Wara | All Rights Reserved.
      </p>
    </footer>
  )
}