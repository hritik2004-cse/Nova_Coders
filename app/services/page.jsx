'use client';

// Simple optimized services page for testing performance improvements
import dynamic from 'next/dynamic';

// Lazy load components
const Nav = dynamic(() => import('@/Components/Nav'), {
  loading: () => <div className="h-16 bg-gray-100 dark:bg-gray-800 animate-pulse" />,
});

const Footer = dynamic(() => import('@/Components/FooterClient'), {
  loading: () => <div className="h-20 bg-gray-100 dark:bg-gray-800 animate-pulse" />,
  ssr: false,
});

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Nav />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional software development services tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Cards */}
          {[
            {
              title: "Web Development",
              description: "Custom web applications built with modern technologies",
              icon: "🌐"
            },
            {
              title: "Mobile Apps",
              description: "Native and cross-platform mobile applications",
              icon: "📱"
            },
            {
              title: "Enterprise Software",
              description: "Scalable enterprise solutions for large organizations",
              icon: "🏢"
            },
            {
              title: "Cloud Solutions",
              description: "Cloud-native applications and migration services",
              icon: "☁️"
            },
            {
              title: "API Development",
              description: "RESTful and GraphQL APIs for seamless integration",
              icon: "🔗"
            },
            {
              title: "Consulting",
              description: "Technology consulting and architecture design",
              icon: "💡"
            }
          ].map((service, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
