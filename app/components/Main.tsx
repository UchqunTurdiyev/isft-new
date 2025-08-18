'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';

const normalizePhone = (v: string) => v.replace(/\D/g, '').slice(0, 12);

export default function Page() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // TODO: /api/lead yo'li bilan CRM'ga forward qilish
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { fullName, phone, program, source: 'ISFT Landing' };
      // Misol uchun API chaqiruvi (keyin uncomment qiling):
      // const res = await fetch('/api/lead', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // });
      // if (!res.ok) throw new Error('Failed');

      // Demo: soxta kechikish
      await new Promise<void>((resolve) => setTimeout(resolve, 600));
      setSubmitted(true);
    } catch (err) {
      alert("Xatolik yuz berdi. Iltimos, yana urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-dvh flex items-center justify-center p-6">
        <p className="text-green-700">Rahmat! Operatorlarimiz tez orada siz bilan bog‘lanadi.</p>
      </main>
    );
  }

  return (
    <main className="min-h-dvh flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 border p-6 rounded-2xl">
        <div>
          <label className="text-sm">F.I.Sh</label>
          <input
            required
            value={fullName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            placeholder="Ism familiya"
          />
        </div>

        <div>
          <label className="text-sm">Telefon</label>
          <input
            required
            value={phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(normalizePhone(e.target.value))}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            placeholder="99855xxxxxx"
            inputMode="numeric"
            pattern="\d*"
          />
          <p className="mt-1 text-xs text-zinc-500">Format: 99855xxxxxx (faqat raqam)</p>
        </div>

        <div>
          <label className="text-sm">Yo‘nalish</label>
          <select
            value={program}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setProgram(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
          >
            <option value="">Tanlang</option>
            <option>Moliya boshqaruvi</option>
            <option>Raqamli texnologiyalar</option>
            <option>Biznes va menejment</option>
            <option>Boshqa</option>
          </select>
        </div>

        <button
          disabled={loading}
          className="w-full rounded-xl bg-zinc-900 px-5 py-3 text-white disabled:opacity-60"
        >
          {loading ? 'Yuborilmoqda…' : 'Ariza topshirish'}
        </button>

        <p className="text-xs text-zinc-500">
          Yuborish orqali shaxsiy ma’lumotlarni qayta ishlashga rozilik bildirasiz.
        </p>
      </form>
    </main>
  );
}
