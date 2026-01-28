"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-6 px-6 border-t border-border bg-checkerboard flex items-center justify-center">
      <p className="text-sm mt-1 text-center">
          © {new Date().getFullYear()}. All Rights Reserved By <Link href="https://www.linkedin.com/in/t-kurnia-yogas-wara-604b64338/" className="transition-all duration-300 text-(--prim) font-semibold text-md hover:text-gray-800 ">T. Kurnia Yogas Wara</Link>
        </p>
    </footer>
  )
}