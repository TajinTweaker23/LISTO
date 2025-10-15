// Google Fonts unavailable in this environment, using system fonts
// import { Inter } from 'next/font/google';
import './globals.css';
import '../styles/design-system.css';
import '../styles/neurodivergent-features.css';
import '../styles/mobile-optimized.css';
import '../styles/premium-design-tokens.css';
import '../styles/premium-components.css';

// const inter = Inter({ 
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600', '700', '800'],
//   variable: '--font-inter'
// });

export const metadata = {
  title: 'LISTO - Your Health & Wellness Companion',
  description: 'Comprehensive health tracking with medical education, disease prevention, and administrative assistance',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LISTO',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f7f6' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-sans">
      <body className="antialiased">
        <div className="min-h-screen bg-gradient-to-br from-sage-50 via-warm-gray-50 to-sage-100">
          {children}
        </div>
      </body>
    </html>
  );
}
