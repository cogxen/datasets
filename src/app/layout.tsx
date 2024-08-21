import type { Metadata } from "next"

// Stylesheets
import "../assets/css/globals.css"

import { Space_Grotesk } from "next/font/google"

const globalFont = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Datasets • Collected by Cogxen",
  description:
    "Curated collection of publicly available datasets designed to support student experimentation and data analysis projects.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`h-screen w-screen p-8 bg-slate-200 ${globalFont.className}`}>
        {children}
      </body>
    </html>
  )
}
