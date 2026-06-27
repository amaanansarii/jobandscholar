'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Briefcase, FileText, Award, BookOpen, Calendar, Phone, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Latest Jobs', href: '/jobs', icon: Briefcase },
  { label: 'Admit Card', href: '/admit-card', icon: FileText },
  { label: 'Results', href: '/results', icon: Award },
  { label: 'Syllabus', href: '/syllabus', icon: BookOpen },
  { label: 'Upcoming Exams', href: '/upcoming-exams', icon: Calendar },
  { label: 'Contact Us', href: '/contact', icon: Phone },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-md" style={{ background: 'var(--primary-dark)' }}>
      {/* Top bar */}
      <div style={{ background: 'var(--accent)', padding: '4px 0' }}>
        <div className="container-main flex items-center justify-between text-white text-xs font-medium">
          <span>🇮🇳 India&apos;s Trusted Government Job Portal</span>
          <span>📧 contact@jobscholar.in</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-main">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 text-white no-underline">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-light))' }}>
              JS
            </div>
            <div>
              <div className="text-xl font-black tracking-tight leading-none">Job &amp; Scholar</div>
              <div className="text-xs opacity-70 leading-none">Sarkari Naukri Portal</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-colors no-underline">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden mobile-menu-enter border-t border-white/10" style={{ background: 'var(--primary)' }}>
          <div className="container-main py-3 flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-white/90 hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-md text-sm font-medium flex items-center gap-3 transition-colors no-underline">
                  {Icon && <Icon size={16} />}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
