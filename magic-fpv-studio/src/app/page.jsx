import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Socials from '@/components/Socials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Link from 'next/link';

// SEO dla tej konkretnej strony
export const metadata = {
  title: 'Professional FPV Video Production',
  description: 'From the first shot to the last emotion. Dynamic FPV flights with intimate handheld storytelling for brands, events and individuals.',
  openGraph: {
    title: 'Professional FPV Video Production | Magic FPV Studio',
    description: 'From the first shot to the last emotion. Dynamic FPV flights with intimate handheld storytelling.',
    url: 'https://magicfpvstudio.com',
    images: ['/photos/Logo.png'],
  },
};

// Structured Data (Schema.org) dla lepszego SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Magic FPV Studio',
  description: 'Professional FPV and cinematic video production',
  url: 'https://magicfpvstudio.com',
  telephone: '+447718330652',
  email: 'magicfpvstudio@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'GB',
  },
  sameAs: [
    'https://www.facebook.com/Magicfpvstudio',
    'https://www.instagram.com/magicfpvstudio/',
    'https://www.youtube.com/@Magicfpvstudio',
    'https://www.tiktok.com/@maciejkozl'
  ],
  priceRange: '$$',
  image: 'https://magicfpvstudio.com/photos/Logo.png',
};

export default function Home() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navbar />
      
      <main id="top" className="container">
        <Hero title="From the first shot to the last emotion." />
        <Link href="/form" className="cta-button">Book Your FPV Video</Link>
        <About />
        <Portfolio />
        
        <section className="grid">
          <Socials />
          <Contact />
        </section>
      </main>
      
      <Footer />
    </>
  );
}