// app/thanks-ig/page.tsx
"use client";
import { useEffect } from "react";

export default function ThanksIG() {
  useEffect(() => {
    // Meta Pixel: Lead event (dedup uchun paramlar qo‘shsangiz ham bo‘ladi)
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        source: "amocrm",
        redirect: "instagram"
      });
    }
    // 500ms dan so‘ng Instagram’ga o‘tkazish
    const t = setTimeout(() => {
      // Profil manzilingiz:
      window.location.href = "https://instagram.com/your_profile";
    }, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{padding:"48px 16px", textAlign:"center"}}>
      <h1>Rahmat!</h1>
      <p>So‘rovingiz qabul qilindi. Sizni Instagram sahifamizga yo‘naltiryapmiz…</p>
    </main>
  );
}
