// app/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// --- Simple phone mask (UZ) ---
const normalizePhone = (v) => String(v).replace(/\D/g, '').slice(0, 12)

export default function Page() {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [program, setProgram] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

// Submit to our API route -> AmoCRM
const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { fullName, phone, program, source: 'ISFT Landing' }
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch (err) {
      alert('Xatolik yuz berdi. Iltimos, yana urinib ko‘ring.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-dvh bg-white text-zinc-900">
      {/* Top notice / urgency banner */}
      <div className="w-full bg-amber-100 text-amber-900 text-sm">
        <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between gap-4">
          <p className="truncate">Qabul ochiq. Joylar cheklangan — hozirroq ariza topshiring.</p>
          <a href="#lead" className="shrink-0 rounded-xl bg-amber-900 px-4 py-2 text-white hover:opacity-90">Ariza topshirish</a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-zinc-100">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo-isft.svg" alt="ISFT" width={36} height={36} />
            <span className="font-semibold">ISFT Instituti</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-600">
            <a href="#about" className="hover:text-zinc-900">Institut</a>
            <a href="#programs" className="hover:text-zinc-900">Yo‘nalishlar</a>
            <a href="#benefits" className="hover:text-zinc-900">Afzalliklar</a>
            <a href="#faq" className="hover:text-zinc-900">Savollar</a>
            <a href="#contact" className="hover:text-zinc-900">Aloqa</a>
          </nav>
          <a href="#lead" className="rounded-xl bg-zinc-900 px-4 py-2 text-white text-sm">Ariza</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
              4 yil – 2 diplom: O‘zbekistonda ham, chet elda ham tan olinadigan ta’lim
            </h1>
            <p className="mt-4 text-zinc-600 text-base md:text-lg">
              Xalqaro akkreditatsiya, 70+ davlatda tan olinadigan diplom va kuchli amaliyotlar. Qabul ochiq — bugun ariza topshiring.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#lead" className="rounded-xl bg-zinc-900 px-5 py-3 text-white">Ariza topshirish</a>
              <a href="#about" className="rounded-xl border border-zinc-300 px-5 py-3">Batafsil ma’lumot</a>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-2xl border p-4"><div className="text-2xl font-semibold">70+</div><div className="text-xs text-zinc-500">Davlatda tan olinadi</div></div>
              <div className="rounded-2xl border p-4"><div className="text-2xl font-semibold">3 til</div><div className="text-xs text-zinc-500">UZ / RU / EN</div></div>
              <div className="rounded-2xl border p-4"><div className="text-2xl font-semibold">2+2</div><div className="text-xs text-zinc-500">Songwon Univ. hamkorlik</div></div>
            </div>
          </div>
          <div className="relative aspect-[4/3] md:aspect-[5/4] rounded-3xl overflow-hidden shadow-sm border">
            <Image src="/hero-campus.jpg" alt="ISFT kampus" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-y bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {['ECAQA akkreditatsiya', 'HEMIS tizimi', 'Hamkor bank/soliq', 'ACCA/IELTS qo‘llab-quvvatlash'].map((t) => (
            <div key={t} className="rounded-2xl bg-white border p-4 text-center text-sm">{t}</div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-semibold">Yo‘nalishlar</h2>
        <p className="mt-2 text-zinc-600">Eng talab yuqori bo‘lgan sohalar bo‘yicha chuqurlashtirilgan ta’lim.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            {title:'Moliya boshqaruvi', desc:'Bank, audit va buxgalteriya amaliyoti bilan.'},
            {title:'Raqamli texnologiyalar', desc:'IT, axborot tizimlari va data asoslari.'},
            {title:'Biznes va menejment', desc:'Strategiya, marketing va loyihalash.'},
          ].map((p)=> (
            <div key={p.title} className="rounded-2xl border p-6">
              <div className="text-lg font-medium">{p.title}</div>
              <p className="mt-2 text-sm text-zinc-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="bg-gradient-to-b from-white to-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-14 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Nega ISFT?</h2>
            <ul className="mt-4 space-y-3 text-zinc-700">
              <li>• 2 barobar imkoniyat: xalqaro va milliy diplom</li>
              <li>• Amaliyot: Bank va Soliq qo‘mitasi bilan hamkorlik</li>
              <li>• Chet el almashuv va summer school dasturlari</li>
              <li>• Masofaviy va kunduzgi ta’lim formatlari</li>
            </ul>
          </div>
          {/* Lead form */}
          <div id="lead" className="rounded-3xl border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">1 daqiqada ariza qoldiring</h3>
            {submitted ? (
              <p className="mt-4 text-green-700">Rahmat! Operatorlarimiz tez orada siz bilan bog‘lanadi.</p>
            ) : (

                <AmoForm />
            //   <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            //     <div>
            //       <label className="text-sm">F.I.Sh</label>
            //       <input required value={fullName} onChange={(e)=>setFullName(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900" placeholder="Ism familiya" />
            //     </div>
            //     <div>
            //       <label className="text-sm">Telefon</label>
            //       <input required value={phone} onChange={(e)=>setPhone(normalizePhone(e.target.value))} className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900" placeholder="998551234567" inputMode="numeric" />
            //       <p className="mt-1 text-xs text-zinc-500">Format: 99855xxxxxx</p>
            //     </div>
            //     <div>
            //       <label className="text-sm">Yo‘nalish</label>
            //       <select value={program} onChange={(e)=>setProgram(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2">
            //         <option value="">Tanlang</option>
            //         <option>Moliya boshqaruvi</option>
            //         <option>Raqamli texnologiyalar</option>
            //         <option>Biznes va menejment</option>
            //         <option>Boshqa</option>
            //       </select>
            //     </div>
            //     <button disabled={loading} className="w-full rounded-xl bg-zinc-900 px-5 py-3 text-white disabled:opacity-60">
            //       {loading ? 'Yuborilmoqda…' : 'Ariza topshirish'}
            //     </button>
            //     <p className="text-xs text-zinc-500">Yuborish orqali shaxsiy ma’lumotlarni qayta ishlashga rozilik bildirasiz.</p>
            //   </form>
            )}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-semibold">Talabalar va bitiruvchilar fikri</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[1,2,3].map((i)=> (
            <div key={i} className="rounded-2xl border p-6">
              <div className="text-sm text-zinc-600">“ISFT hayotimni o‘zgartirdi. Darslar amaliy, o‘qituvchilar kuchli.”</div>
              <div className="mt-4 text-xs text-zinc-500">⭐️⭐️⭐️⭐️⭐️  — Talaba</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-semibold">Ko‘p so‘raladigan savollar</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {[
              {q:'Diplom tan olinadimi?', a:'Xalqaro akkreditatsiya mavjud. Diplom HEMIS tizimi orqali rasmiylashtiriladi.'},
              {q:'Ish topish imkoni?', a:'Bank va Soliq qo‘mitasi bilan hamkorlikda amaliyotlar, ish rezerviga qo‘shish.'},
              {q:'Grantlar bormi?', a:'IELTS/SAT sertifikatiga ega abiturientlar uchun tanlov asosida.'},
              {q:'Ta’lim tillari?', a:'UZ / RU / EN.'},
            ].map((f)=> (
              <div key={f.q} className="rounded-2xl border bg-white p-6">
                <div className="font-medium">{f.q}</div>
                <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Aloqa</h2>
            <p className="mt-2 text-zinc-600">Samarqand, Mirzo Bedil ko‘chasi, 24-uy</p>
            <p className="mt-1"><a href="tel:+998555187070" className="underline">+998 55 518 70 70</a></p>
            <div className="mt-6 flex gap-3">
              <Link href="https://t.me/" className="rounded-xl border px-4 py-2">Telegram</Link>
              <Link href="https://wa.me/998555187070" className="rounded-xl border px-4 py-2">WhatsApp</Link>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden border aspect-video">
            <iframe
              className="w-full h-full"
              loading="lazy"
              src="https://www.google.com/maps?q=Samarqand%20Mirzo%20Bedil%2024&output=embed"
              title="ISFT manzil"
            />
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-zinc-500">
          © {new Date().getFullYear()} ISFT. Barcha huquqlar himoyalangan.
        </div>
      </footer>

      {/* Floating CTA on mobile */}
      <a href="#lead" className="fixed bottom-5 right-5 md:hidden rounded-full shadow-lg bg-zinc-900 text-white px-5 py-3">Ariza</a>

      {/* Meta Pixel example event (replace with your real implementation) */}
      {/* <script dangerouslySetInnerHTML={{ __html: `fbq('track', 'Lead');` }} /> */}
    </main>
  )
}

// --- Notes ---
// 1) TailwindCSS kerak: globals.css ichida @tailwind base; @tailwind components; @tailwind utilities; bo‘lsin.
// 2) public/ ichiga logo-isft.svg va hero-campus.jpg joylashtiring.
// 3) API integratsiya: /app/api/lead/route.ts yozib, AmoCRM webhook’iga forward qiling.
// 4) SEO: app/layout.tsx da metadata, OG va JSON-LD qo‘shing (quyida namuna).

/*
// app/layout.tsx (qisqa namuna)
export const metadata: Metadata = {
  title: 'ISFT Instituti — Qabul',
  description: '4 yil — 2 diplom. Xalqaro akkreditatsiya, 70+ davlatda tan olinadi.',
  openGraph: { title: 'ISFT Instituti — Qabul', type: 'website' },
  alternates: { languages: { 'uz-UZ': '/', 'ru-RU': '/ru' } },
}
*/
