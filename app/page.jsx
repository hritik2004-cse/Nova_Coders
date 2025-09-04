'use client';

import dynamic from 'next/dynamic';
import Nav from '@/Components/Nav';
import HeroSection from '@/Components/HeroSection';

// Lazy load components that are below the fold
const Newsletter = dynamic(() => import('@/Components/Newsletter'), {
  loading: () => (
    <div className="min-h-[400px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" 
         role="progressbar" 
         aria-label="Loading newsletter section" />
  ),
  ssr: false, // Don't SSR heavy components below the fold
});

const Accordion = dynamic(() => import('@/Components/Utility/Accordion'), {
  loading: () => (
    <div className="min-h-[300px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"
         role="progressbar"
         aria-label="Loading FAQ section" />
  ),
  ssr: false,
});

const FooterClient = dynamic(() => import('@/Components/FooterClient'), {
  loading: () => (
    <div className="min-h-[200px] bg-gray-100 dark:bg-gray-800 animate-pulse"
         role="progressbar"
         aria-label="Loading footer" />
  ),
  ssr: false,
});

// Add structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nova Coders",
  "description": "Professional software development company offering custom web applications, mobile solutions, and enterprise software.",
  "url": "https://novacoders.com",
  "logo": "https://novacoders.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-234-567-8900",
    "contactType": "Customer Service",
    "availableLanguage": "English"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Tech Street",
    "addressLocality": "Tech City",
    "addressRegion": "TC",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://twitter.com/novacoders",
    "https://linkedin.com/company/novacoders",
    "https://github.com/novacoders"
  ]
};

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen">
        <Nav />
        <main role="main">
          <HeroSection />
          <Newsletter />
          <Accordion />
        </main>
        <FooterClient />
      </div>
    </>
  );
}
