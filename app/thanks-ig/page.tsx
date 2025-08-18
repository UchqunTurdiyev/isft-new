"use client";
import { useEffect } from "react";

// Meta Pixel fbq uchun minimal, xavfsiz type
type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

export default function ThanksIG() {
  useEffect(() => {
    // Lead event
    window.fbq?.("track", "Lead", {
      source: "amocrm",
      redirect: "instagram",
    } as Record<string, unknown>);

    // 500ms keyin Instagram'ga yo'naltirish
    const t = window.setTimeout(() => {
      window.location.href = "https://instagram.com/isft_samarqand"; // <- profil linkingiz
    }, 2000);

    return () => window.clearTimeout(t);
  }, []);

  return (
    <main style={{ padding: "48px 16px", textAlign: "center" }}>
      <h1>Rahmat!</h1>
      <p>So‘rovingiz qabul qilindi. Instagram sahifamizga yo‘naltiryapmiz…</p>
    </main>
  );
}
