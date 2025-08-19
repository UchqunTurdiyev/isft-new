'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// ✅ fbq global tipi (TS xatosini bartaraf etadi)
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export default function AmoForm() {
  useEffect(() => {
    const container = document.getElementById('amoforms_container');
    if (!container) return;

    // Iframe'ni topib konteynerga ko'chirish
    const move = () => {
      const iframe = document.querySelector<HTMLIFrameElement>('iframe[src*="forms.amocrm.ru"]');
      if (iframe && !container.contains(iframe)) {
        iframe.style.position = 'static';
        iframe.style.width = '100%';
        iframe.style.maxWidth = '560px';   // xohishga ko'ra
        iframe.style.minHeight = '480px';  // xohishga ko'ra
        container.appendChild(iframe);
      }
    };

    const obs = new MutationObserver(move);
    obs.observe(document.body, { childList: true, subtree: true });
    move();

    // ⚠️ Eslatma: iframe ichini o‘qish cross-domain sababli odatda ruxsat etilmaydi.
    // Agar Kommo (amoCRM) success holatida postMessage yuborsa, bu yerda tinglashingiz mumkin.
    // Hozircha “inline success”ni aniqlashga urinib ko‘ramiz (ko‘p holatda catch bo‘ladi):
    const successObserver = new MutationObserver(() => {
      const iframe = document.querySelector<HTMLIFrameElement>('iframe[src*="forms.amocrm.ru"]');
      if (!iframe) return;
      try {
        const innerDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (innerDoc && innerDoc.querySelector('.amoforms__success-message')) {
          // ✅ Meta Pixel Lead event (agar mavjud bo'lsa)
          window.fbq?.('track', 'Lead', { source: 'amocrm' });

          // 0.5s keyin Instagram'ga yo‘naltirish
          setTimeout(() => {
            window.location.href = 'https://instagram.com/your_profile';
          }, 500);
        }
      } catch {
        // Cross-domain — normal holat, e'tibor bermaymiz
      }
    });
    successObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
      successObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Formani ko‘rsatmoqchi bo‘lgan joy */}
      <div id="amoforms_container" className="mx-auto" style={{ minHeight: 480 }} />

      {/* amoCRM init */}
      <Script id="amo-form-init" strategy="afterInteractive">
        {`
          !function(a,m,o,c,r,m){
            a[o+c]=a[o+c]||{setMeta:function(p){this.params=(this.params||[]).concat([p])}};
            a[o+r]=a[o+r]||function(f){a[o+r].f=(a[o+r].f||[]).concat([f])};
            a[o+r]({id:"1545470",hash:"6d892112fee08f3851105f1bdbe6ebd2",locale:"ru"});
            a[o+m]=a[o+m]||function(f,k){a[o+m].f=(a[o+m].f||[]).concat([[f,k]])}
          }(window,0,"amo_forms_","params","load","loaded");
        `}
      </Script>
      <Script
        id="amo-form-loader"
        src="https://forms.amocrm.ru/forms/assets/js/amoforms.js?1755501271"
        strategy="afterInteractive"
      />
    </>
  );
}
