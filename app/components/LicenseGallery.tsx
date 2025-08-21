'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const IMAGES = ['/l1.webp','/l2.webp','/l3.webp','/acc.webp'];

export default function LicenseGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // ESC, ←, → tugmalari
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i === null ? 0 : (i + 1) % IMAGES.length));
      if (e.key === 'ArrowLeft') setOpenIndex((i) => (i === null ? 0 : (i - 1 + IMAGES.length) % IMAGES.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIndex]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-2xl md:text-3xl font-semibold">Litsenziya va sertifikatlar</h2>

      {/* Grid – thumbnails */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {IMAGES.map((src, idx) => (
          <button
            key={src}
            onClick={() => setOpenIndex(idx)}
            aria-label="Rasmni to‘liq ko‘rish"
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden border bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900"
          >
            <Image
              src={src}
              alt="Litsenziya yoki sertifikat"
              fill
              className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(min-width: 768px) 33vw, 50vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox modal */}
      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.currentTarget === e.target) setOpenIndex(null); // backdrop click
          }}
        >
          <div className="relative w-full max-w-4xl aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden bg-black">
            <Image
              src={IMAGES[openIndex]}
              alt="Litsenziya yoki sertifikat (to‘liq)"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />

            {/* Close */}
            <button
              onClick={() => setOpenIndex(null)}
              aria-label="Yopish"
              className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-2 text-sm hover:bg-white"
            >
              Yopish ✕
            </button>

            {/* Prev / Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) => (i === null ? 0 : (i - 1 + IMAGES.length) % IMAGES.length));
              }}
              aria-label="Oldingi rasm"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm hover:bg-white"
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) => (i === null ? 0 : (i + 1) % IMAGES.length));
              }}
              aria-label="Keyingi rasm"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm hover:bg-white"
            >
              →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
