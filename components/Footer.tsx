import Link from 'next/link';
import { ExternalLink, MapPin, Phone, Mail, Video, Send } from 'lucide-react';

const importantLinks = [
  { label: 'Latest Jobs', href: '/jobs' },
  { label: 'Admit Card', href: '/admit-card' },
  { label: 'Results', href: '/results' },
  { label: 'Syllabus', href: '/syllabus' },
  { label: 'Upcoming Exams', href: '/upcoming-exams' },
  { label: 'Answer Key', href: '/results' },
];

const govLinks = [
  { label: 'UPSC', href: 'https://upsc.gov.in' },
  { label: 'SSC', href: 'https://ssc.gov.in' },
  { label: 'IBPS', href: 'https://ibps.in' },
  { label: 'Indian Railway', href: 'https://indianrailways.gov.in' },
  { label: 'NDA', href: 'https://upsc.gov.in' },
  { label: 'UKPSC', href: 'https://ukpsc.gov.in' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--primary-dark)', color: '#94a3b8' }} className="mt-12">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-white text-lg"
                style={{ background: 'linear-gradient(135deg, #e85d04, #f48c06)' }}>
                JS
              </div>
              <div>
                <div className="text-white font-black text-lg leading-none">Job &amp; Scholar</div>
                <div className="text-xs opacity-60">Sarkari Naukri Portal</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              India&apos;s most trusted government job portal. We bring you the latest Sarkari Naukri, Admit Cards, Results, and Exam Updates.
            </p>
            <div className="flex gap-3">
              {[
                { label: 'YT', href: '#', color: '#ff0000' },
                { label: 'FB', href: '#', color: '#1877f2' },
                { label: 'TW', href: '#', color: '#1da1f2' },
                { label: 'IG', href: '#', color: '#e1306c' },
                { label: 'TG', href: '#', color: '#0088cc' },
              ].map(({ label, href, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 text-xs font-black"
                  style={{ background: 'rgba(255,255,255,0.08)', color }}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-white/10 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {importantLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white hover:translate-x-1 inline-block transition-all no-underline" style={{ color: '#94a3b8' }}>
                    → {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Govt Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-white/10 pb-2">Govt. Bodies</h3>
            <ul className="space-y-2">
              {govLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors no-underline" style={{ color: '#94a3b8' }}>
                    → {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-white/10 pb-2">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: '#e85d04' }} />
                <span>Dehradun, Uttarakhand, India</span>
              </div>
              <div className="flex gap-3">
                <Mail size={15} className="mt-0.5 shrink-0" style={{ color: '#e85d04' }} />
                <span>contact@jobscholar.in</span>
              </div>
              <div className="flex gap-3">
                <Phone size={15} className="mt-0.5 shrink-0" style={{ color: '#e85d04' }} />
                <span>+91-XXXX-XXXXXX</span>
              </div>
            </div>
            <a href="#" target="_blank" rel="noopener noreferrer"
              className="mt-5 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white w-fit transition-all hover:scale-105"
              style={{ background: '#ff0000' }}>
              <Video size={16} /> YouTube Channel
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4">
        <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>© 2026 Job &amp; Scholar. All rights reserved.</span>
          <div className="flex gap-5">
            {['About Us', 'Privacy Policy', 'Terms & Conditions', 'Contact Us'].map((t) => (
              <Link key={t} href="/contact" className="hover:text-white transition-colors no-underline" style={{ color: '#94a3b8' }}>
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
