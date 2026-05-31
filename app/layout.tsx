import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ContentAI Agent System',
  description: 'AI-powered content creation with 7 intelligent agents',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100">{children}</body>
    </html>
  )
}
