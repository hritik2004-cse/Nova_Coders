import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/Components/theme-provider";
import { AuthProvider } from "@/lib/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Nova Coders - Professional Web Development & Software Solutions",
    template: "%s | Nova Coders"
  },
  description: "Nova Coders is a leading software development company offering custom web applications, mobile solutions, and enterprise software. Expert developers delivering innovative technology solutions for businesses worldwide.",
  keywords: ["web development", "software development", "mobile apps", "custom software", "enterprise solutions", "technology consulting", "Nova Coders"],
  authors: [{ name: "Nova Coders Team" }],
  creator: "Nova Coders",
  publisher: "Nova Coders",
  metadataBase: new URL('https://novacoders.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Nova Coders - Professional Web Development & Software Solutions",
    description: "Expert software development services including web applications, mobile solutions, and enterprise software. Transform your business with innovative technology solutions.",
    type: "website",
    locale: "en_US",
    url: "https://novacoders.com",
    siteName: "Nova Coders",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nova Coders - Professional Software Development"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova Coders - Professional Web Development",
    description: "Expert software development services for modern businesses. Custom solutions, innovative technology.",
    images: ["/twitter-image.jpg"]
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
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico', sizes: '48x48' }
    ],
    shortcut: '/favicon.ico',
    apple: '/icon/apple-touch-icon.png',
  },
  other: {
    'msapplication-TileColor': '#3b82f6',
  }
};

export const viewport = {
  themeColor: '#3b82f6',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical routes for faster navigation */}
        <link rel="prefetch" href="/services" />
        <link rel="prefetch" href="/admin/dashboard" />
        <link rel="prefetch" href="/intern/dashboard" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//api.emailjs.com" />
        
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}