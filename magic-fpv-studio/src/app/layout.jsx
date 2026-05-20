import './globals.css';

export const metadata = {
  metadataBase: new URL('https://magicfpvstudio.com'),
  title: {
    default: 'Magic FPV Studio | Professional FPV Video Production',
    template: '%s | Magic FPV Studio'
  },
  description: 'Magic FPV Studio blends dynamic FPV flights with intimate handheld storytelling for brands, events and individuals across the UK and beyond.',
  keywords: ['FPV video', 'drone videography', 'cinematic video production', 'UK video production', 'wedding videography', 'corporate videos', 'aerial filming'],
  authors: [{ name: 'Aleks Kozlowski' }],
  creator: 'Aleks Kozlowski',
  publisher: 'Magic FPV Studio',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://magicfpvstudio.com',
    siteName: 'Magic FPV Studio',
    title: 'Magic FPV Studio | Professional FPV Video Production',
    description: 'Professional cinematic FPV and handheld video production across the UK',
    images: [
      {
        url: '/photos/Logo.png',
        width: 1200,
        height: 630,
        alt: 'Magic FPV Studio Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Magic FPV Studio | Professional FPV Video Production',
    description: 'Professional cinematic FPV and handheld video production across the UK',
    images: ['/photos/Logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/photos/Logo16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/photos/Logo32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/photos/Logo192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/photos/Logo180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics - dodaj swój tracking ID */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
