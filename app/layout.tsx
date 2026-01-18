import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AppHeader from '../components/AppHeader'
import data from '../data/data.json'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const siteConfig = (data as any).siteConfig || {}

export const metadata: Metadata = {
  title: siteConfig.title || 'Shivam Kumar Singh | AI & App Developer',
  description:
    siteConfig.description ||
    'B.Tech CSE student focused on AI, NLP, knowledge distillation, and Flutter-based ML applications.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={inter.className}>
        <div className="animated-bg" />
        <AppHeader />
        <main>{children}</main>
      </body>
    </html>
  )
}

