'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'   // ✅ qo'shildi

const IG_URL = 'https://instagram.com/your_instagram_here'
const REDIRECT_AFTER = 5

export default function ThanksPage() {
  const [left, setLeft] = useState(REDIRECT_AFTER)

  useEffect(() => {
    const t = setTimeout(() => {
      window.location.href = IG_URL
    }, REDIRECT_AFTER * 1000)
    const i = setInterval(() => setLeft(s => (s > 0 ? s - 1 : 0)), 1000)
    return () => { clearTimeout(t); clearInterval(i) }
  }, [])

  const progress = ((REDIRECT_AFTER - left) / REDIRECT_AFTER) * 100

  return (
    <main className="min-h-dvh bg-gradient-to-b from-white to-zinc-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="rounded-3xl border bg-white shadow-sm p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M20 7L9 18l-5-5" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">Rahmat! ✅</h1>
          <p className="mt-3 text-zinc-600">
            Arizangiz qabul qilindi. <span className="font-medium">Mutaxassislarimiz</span> tez orada siz bilan bog‘lanadi.
          </p>

          <div className="mt-5 text-sm text-zinc-500">
            {left} soniya ichida Instagram sahifamizga yo‘naltirilasiz.
          </div>

          <div className="mt-3 h-2 w-full rounded-full bg-zinc-200 overflow-hidden">
            <div className="h-full bg-zinc-900 transition-[width] duration-300" style={{ width: `${progress}%` }} />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            {/* Tashqi link => <a> to'g'ri */}
            <a href={IG_URL} className="inline-block rounded-xl bg-zinc-900 px-5 py-3 text-white" target="_blank" rel="noopener noreferrer">
              Instagramga o‘tish (hoziroq)
            </a>
            {/* Ichki link => <Link/> kerak */}
            <Link href="/" className="inline-block rounded-xl border border-zinc-300 px-5 py-3">
              Bosh sahifaga qaytish
            </Link>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-zinc-400">
          Agar avtomatik o‘tmasa, yuqoridagi “Instagramga o‘tish” tugmasini bosing.
        </p>
      </div>
    </main>
  )
}
