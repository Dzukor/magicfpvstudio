import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Our Services',
  description: 'Professional cinematic video production: Corporate films, Real Estate showcases, Weddings, and Custom video production tailored to your needs.',
  openGraph: {
    title: 'Our Services | Magic FPV Studio',
    description: 'Professional cinematic video production tailored to your needs',
    url: 'https://magicfpvstudio.com/services',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Video Production',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Magic FPV Studio',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United Kingdom',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Video Production Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Corporate & Promotional Films',
          description: 'High-end cinematic videos for brands and businesses',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Real Estate & Property Showcase',
          description: 'Aerial and ground footage for properties and hotels',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Weddings & Special Events',
          description: 'Emotional storytelling for your most important moments',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Video Production',
          description: 'Tailored solutions for unique projects',
        },
      },
    ],
  },
};

export default function Services() {
  const services = [
    {
      title: 'Corporate & Promotional Films',
      description: 'High-end cinematic videos for brands and businesses. From scripting and filming to post-production and delivery.'
    },
    {
      title: 'Real Estate & Property Showcase',
      description: 'Aerial and ground footage designed to highlight properties, hotels and unique spaces with cinematic quality.'
    },
    {
      title: 'Weddings & Special Events',
      description: 'Emotional storytelling capturing your most important moments with creativity and cinematic precision.'
    },
    {
      title: 'Custom Video Production',
      description: 'Tailored solutions for unique projects, personal stories and creative visions.'
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navbar />
      
      <main id="top" className="container">
        <Hero 
          title="Our Services" 
          subtitle="Professional cinematic video production tailored to your needs."
        />
        
        <section className="services-grid">
          {services.map((service, index) => (
            <article key={index} className="service-card">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </article>
          ))}
        </section>

        <div className="back-wrapper">
          <Link href="/" className="btn">← Back to home</Link>
        </div>
      </main>
      
      <Footer />
    </>
  );
}