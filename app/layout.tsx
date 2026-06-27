import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://jobscholar.in'),
  title: {
    default: 'Job & Scholar – Latest Sarkari Naukri, Admit Card, Results 2026',
    template: '%s | Job & Scholar',
  },
  description: "Job & Scholar is India's trusted government job portal. Get latest Sarkari Naukri, Admit Cards, Results, Syllabus and Exam Updates.",
  keywords: ['sarkari naukri', 'government jobs', 'admit card', 'results', 'SSC', 'UPSC', 'railway jobs'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Job & Scholar',
    title: 'Job & Scholar – Latest Sarkari Naukri, Admit Card & Results 2026',
    description: "India's trusted government job portal.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
