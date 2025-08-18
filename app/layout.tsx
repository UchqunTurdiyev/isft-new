import type { Metadata } from 'next'
import './globals.css';



export const metadata: Metadata = {
  title: 'ISFT Instituti — Qabul',
  description: '4Xalqaro akkreditatsiya, 70+ davlatda tan olinadi.',
  icons: {
    icon: "./logo-isft.png", // Favicon yo‘li
  },
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
              <head>
       
       {/* ✅ Meta Pixel Code */}
       <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '8613965172038503');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=978023020768370&ev=PageView&noscript=1"
            />
          </noscript>
          {/* ✅ End Meta Pixel Code */}
        </head>
      <body className="bg-white text-zinc-900 antialiased">{children}</body>
    </html>
  )
}
