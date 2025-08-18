"use client";
import { useEffect } from "react";
import Script from "next/script";

export default function AmoForm() {
  useEffect(() => {
    // iframe paydo bo‘lishini kuzatib, topilgach ko‘chirib qo‘yish
    const container = document.getElementById("amoforms_container");
    if (!container) return;

    const move = () => {
      const iframe = document.querySelector('iframe[src*="forms.amocrm.ru"]') as HTMLIFrameElement | null;
      if (iframe && !container.contains(iframe)) {
        iframe.style.position = "static";
        iframe.style.width = "100%";
        iframe.style.maxWidth = "560px";       // xohishga ko‘ra
        iframe.style.minHeight = "480px";      // xohishga ko‘ra
        container.appendChild(iframe);
      }
    };

    // DOM o‘zgarganda kuzatish
    const obs = new MutationObserver(move);
    obs.observe(document.body, { childList: true, subtree: true });

    // birinchi urinish
    move();
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Formani qo‘ymoqchi bo‘lgan joyingiz — aynan shu div */}
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
