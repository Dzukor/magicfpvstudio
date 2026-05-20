import FormClient from './FormClient';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
 
export const metadata = {
  title: "Book Your FPV Video | Magic FPV Studio",
  description:
    "Ready to bring your vision to life? Book a free consultation with Magic FPV Studio. Tell us about your project and get a custom quote for cinematic FPV videography.",
  keywords: [
    "book FPV videographer",
    "FPV video quote",
    "hire drone videographer",
    "FPV consultation",
    "video production inquiry",
    "custom FPV project",
  ],
  openGraph: {
    title: "Book Your Cinematic FPV Video",
    description:
      "Share your vision with us. Get a personalized quote and start creating unforgettable aerial stories.",
    url: "https://magicfpvstudio.com/form",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://magicfpvstudio.com/#organization",

  name: "Magic FPV Studio",
  description: "Professional FPV and cinematic video production",
  url: "https://magicfpvstudio.com",
  logo: "https://magicfpvstudio.com/photos/Logo.png",
  image: "https://magicfpvstudio.com/photos/Logo.png",

  telephone: "+447718330652",
  email: "magicfpvstudio@gmail.com",

  address: {
    "@type": "PostalAddress",
    addressCountry: "GB",
  },

  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },

  sameAs: [
    "https://www.facebook.com/Magicfpvstudio",
    "https://www.instagram.com/magicfpvstudio/",
    "https://www.youtube.com/@Magicfpvstudio",
    "https://www.tiktok.com/@maciejkozl",
  ],

  priceRange: "$$",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FormClient />
        <div className="back-wrapper">
          <Link href="/" className="btn">← Back to home</Link>
        </div>
      <Footer />
    </>
  );
}
