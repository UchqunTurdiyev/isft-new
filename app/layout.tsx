import type { Metadata } from 'next'
import './globals.css';



export const metadata: Metadata = {
  title: 'ISFT Instituti — Qabul',
  description: '4 yil — 2 diplom. Xalqaro akkreditatsiya, 70+ davlatda tan olinadi.',
  openGraph: {
    title: 'ISFT Instituti — Qabul',
    description: '4 yil — 2 diplom. Xalqaro akkreditatsiya, 70+ davlatda tan olinadi.',
    type: 'website',
  },
  alternates: { languages: { 'uz-UZ': '/', 'ru-RU': '/' } },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body className="bg-white text-zinc-900 antialiased">{children}</body>
    </html>
  )
}
