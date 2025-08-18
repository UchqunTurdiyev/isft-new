'use client'

import { useState, type FormEvent, type ChangeEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AmoForm from './components/AmoForm'

const normalizePhone = (v: string) => v.replace(/\D/g, '').slice(0, 12)

export default function Page() {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [program, setProgram] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      alert("Xatolik yuz berdi. Iltimos, yana urinib ko'ring.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-dvh">
      {/* Top notice */}
      <div className="w-full bg-amber-100 text-amber-900 text-sm">
        <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between gap-4">
          <p className="truncate">Qabul ochiq. Joylar cheklangan — hozirroq ariza topshiring.</p>
          <a href="#lead" className="shrink-0 rounded-xl bg-amber-900 px-4 py-2 text-white hover:opacity-90">Ariza</a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-zinc-100">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo-isft.png" alt="ISFT" width={36} height={36} />
            <span className="font-semibold">ISFT Instituti</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-600">
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
            70+ davlatda tan olinadigan diplom. O‘zbekistonda ham, chet elda ham tan olinadigan ta’lim
            </h1>
            <p className="mt-4 text-zinc-600 text-base md:text-lg">
              Xalqaro akkreditatsiya (ECAQA), 70+ davlatda tan olinadigan diplom va kuchli amaliyotlar. Qabul ochiq — 1 daqiqada ariza qoldiring.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#lead" className="rounded-xl bg-zinc-900 px-5 py-3 text-white">Ariza topshirish</a>
              <a href="#about" className="rounded-xl border border-zinc-300 px-5 py-3">Batafsil</a>
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

      {/* Benefits + Lead form */}
      <section id="benefits" className="bg-gradient-to-b from-white to-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-14 grid md:grid-cols-2 gap-8 items-start">
          <div id="about">
            <h2 className="text-2xl md:text-3xl font-semibold">Nega ISFT?</h2>
            <ul className="mt-4 space-y-3 text-zinc-700">
              <li>• 2 barobar imkoniyat: xalqaro va milliy diplom</li>
              <li>• Amaliyot: Bank va Soliq qo‘mitasi bilan hamkorlik</li>
              <li>• Chet el almashuv va summer school dasturlari</li>
              <li>• Masofaviy va kunduzgi ta’lim formatlari</li>
            </ul>

            <div className="mt-6 text-sm leading-6 text-zinc-700">
              <p className="font-medium">Sifatli ta’lim — barqaror kelajakning eng ishonchli sarmoyasi.</p>
              <p className="mt-2">ISFTda nazariya amaliyot bilan uyg‘unlashadi: darslar real loyihalar, ish beruvchilar bilan hamkorlik va amaliy topshiriqlar asosida olib boriladi. Talabalarimiz 1-kursdan boshlab mehnat bozorida zarur ko‘nikmalarni egallaydi.</p>
              <p className="mt-2">Diplomingiz 70+ davlatda tan olinadi — bu esa chet eldagi o‘qish va ish imkoniyatlaringizni kengaytiradi. Qabul ochiq, joylar cheklangan.</p>
            </div>
          </div>

          {/* Lead form */}
          <div id="lead" className="rounded-3xl border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">1 daqiqada ariza qoldiring</h3>
            {submitted ? (
              <p className="mt-4 text-green-700">Rahmat! Operatorlarimiz tez orada siz bilan bog‘lanadi.</p>
            ) : (
              <AmoForm />
              // <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              //   <div>
              //     <label className="text-sm">F.I.Sh</label>
              //     <input
              //       required
              //       value={fullName}
              //       onChange={(e: ChangeEvent<HTMLInputElement>)=>setFullName(e.target.value)}
              //       className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900"
              //       placeholder="Ism familiya"
              //     />
              //   </div>
              //   <div>
              //     <label className="text-sm">Telefon</label>
              //     <input
              //       required
              //       value={phone}
              //       onChange={(e: ChangeEvent<HTMLInputElement>)=>setPhone(normalizePhone(e.target.value))}
              //       className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900"
              //       placeholder="99855xxxxxx"
              //       inputMode="numeric"
              //       pattern="[0-9]*"
              //     />
              //     <p className="mt-1 text-xs text-zinc-500">Format: 99855xxxxxx</p>
              //   </div>
              //   <div>
              //     <label className="text-sm">Yo‘nalish</label>
              //     <select
              //       value={program}
              //       onChange={(e: ChangeEvent<HTMLSelectElement>)=>setProgram(e.target.value)}
              //       className="mt-1 w-full rounded-xl border px-3 py-2"
              //     >
              //       <option value="">Tanlang</option>
              //       <option>Moliya boshqaruvi</option>
              //       <option>Raqamli texnologiyalar</option>
              //       <option>Biznes va menejment</option>
              //       <option>Boshqa</option>
              //     </select>
              //   </div>
              //   <button
              //     disabled={loading}
              //     className="w-full rounded-xl bg-zinc-900 px-5 py-3 text-white disabled:opacity-60"
              //   >
              //     {loading ? 'Yuborilmoqda…' : 'Ariza topshirish'}
              //   </button>
              //   <p className="text-xs text-zinc-500">
              //     Yuborish orqali shaxsiy ma’lumotlarni qayta ishlashga rozilik bildirasiz.
              //   </p>
              // </form>
            )}
          </div>
        </div>
      </section>

{/* Licenses / gallery new */}
<section className="mx-auto max-w-6xl px-4 py-14">
  <h2 className="text-2xl md:text-3xl font-semibold">Litsenziya va sertifikatlar</h2>
  <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
    {['/l1.webp','/l2.webp','/l3.webp','/acc.webp'].map((src) => (
      <div
        key={src}
        className="relative aspect-[4/3] rounded-2xl overflow-hidden border bg-white"
      >
        {/* object-cover o'rniga object-contain + ozgina padding */}
        <Image
          src={src}
          alt="Litsenziya yoki sertifikat"
          fill
          className="object-contain p-2"
          sizes="(min-width: 768px) 33vw, 50vw"
          priority={false}
        />
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
              {q:'Ish topish imkoni?', a:'Hamkor tashkilotlarda amaliyot; ish rezerviga qo‘shish.'},
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
            <p className="mt-1">
              <a href="tel:+998555187070" className="underline">+998 55 518 70 70</a>
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="https://t.me/samarqand_isft" className="rounded-xl border px-4 py-2">Telegram</Link>
              <Link href="https://www.instagram.com/isft_samarqand" className="rounded-xl border px-4 py-2">Instagram</Link>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden border aspect-video">
            <iframe
              className="w-full h-full"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3071.1736011485486!2d66.9076939795546!3d39.66830930674267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d19c54a948e1b%3A0x9f085cadda5c85e5!2sISFT%20Instituti!5e0!3m2!1sru!2s!4v1741589692768!5m2!1sru!2s"
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
    </main>
  )
}
