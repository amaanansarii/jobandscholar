import Link from 'next/link';
import { ExternalLink, Calendar, Building2, ChevronRight, Download, FileText, Globe, Award } from 'lucide-react';
import { Notification } from '@/types';

interface Props { notification: Notification }

interface Section { title: string; content: string; emoji: string }

function InfoSection({ title, content, emoji }: Section) {
  if (!content?.trim()) return null;
  return (
    <div className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid var(--border)' }}>
      <div className="px-5 py-3 font-bold flex items-center gap-2 text-sm"
        style={{ background: 'linear-gradient(90deg, #eff6ff, #fff)', color: 'var(--primary)', borderBottom: '1px solid var(--border)' }}>
        <span>{emoji}</span> {title}
      </div>
      <div className="px-5 py-4 text-sm prose-content" style={{ color: 'var(--text)', lineHeight: 1.8 }}>
        {content}
      </div>
    </div>
  );
}

export default function NotificationDetail({ notification: n }: Props) {
  const categoryLabel: Record<string, string> = {
    'jobs': 'Government Job',
    'admit-card': 'Admit Card',
    'results': 'Result',
    'syllabus': 'Syllabus',
    'upcoming-exams': 'Upcoming Exam',
  };

  const importantLinks = [
    { label: 'Official Notification', href: n.officialNotificationLink, icon: FileText, color: '#1a3c6e', bg: '#eff6ff' },
    { label: 'Apply Online', href: n.applyLink, icon: ExternalLink, color: '#059669', bg: '#f0fdf4' },
    { label: 'Official Website', href: n.officialWebsiteLink, icon: Globe, color: '#7c3aed', bg: '#faf5ff' },
    { label: 'Download Admit Card', href: n.admitCardLink, icon: Download, color: '#d97706', bg: '#fffbeb' },
    { label: 'Check Result', href: n.resultLink, icon: Award, color: '#dc2626', bg: '#fef2f2' },
  ].filter(l => l.href?.trim());

  return (
    <div>
      {/* Breadcrumb */}
      <div className="py-2 text-xs" style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
        <div className="container-main flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
          <Link href="/" className="hover:underline no-underline" style={{ color: 'var(--text-muted)' }}>Home</Link>
          <ChevronRight size={12} />
          <Link href={`/${n.category}`} className="hover:underline no-underline capitalize" style={{ color: 'var(--text-muted)' }}>
            {categoryLabel[n.category] || n.category}
          </Link>
          <ChevronRight size={12} />
          <span className="truncate max-w-xs">{n.title}</span>
        </div>
      </div>

      {/* Title block */}
      <div className="py-8" style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))' }}>
        <div className="container-main text-white">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
              {categoryLabel[n.category]}
            </span>
            {n.featured && <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#e85d04' }}>🔥 Featured</span>}
            <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: n.status === 'active' ? '#059669' : n.status === 'upcoming' ? '#0ea5e9' : '#6b7280' }}>
              {n.status}
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black leading-tight mb-3">{n.title}</h1>
          <div className="flex flex-wrap gap-5 text-sm opacity-80">
            <span className="flex items-center gap-1.5"><Building2 size={14} />{n.department}</span>
            {n.publishDate && <span className="flex items-center gap-1.5"><Calendar size={14} />Published: {n.publishDate}</span>}
            {n.lastDate && <span className="flex items-center gap-1.5"><Calendar size={14} />Last Date: {n.lastDate}</span>}
          </div>
        </div>
      </div>

      <div className="container-main py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <InfoSection title="Overview" content={n.overview} emoji="📋" />
            <InfoSection title="Important Dates" content={n.importantDates} emoji="📅" />
            <InfoSection title="Application Fee" content={n.applicationFee} emoji="💰" />
            <InfoSection title="Age Limit" content={n.ageLimit} emoji="🎂" />
            <InfoSection title="Vacancy Details" content={n.vacancyDetails} emoji="📊" />
            <InfoSection title="Eligibility Criteria" content={n.eligibility} emoji="✅" />
            <InfoSection title="Selection Process" content={n.selectionProcess} emoji="🎯" />
            <InfoSection title="Exam Pattern" content={n.examPattern} emoji="📝" />
            <InfoSection title="Syllabus" content={n.syllabusContent} emoji="📚" />

            {/* Important Instructions */}
            <div className="rounded-xl p-5 text-sm" style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}>
              <div className="font-bold mb-2 flex items-center gap-2" style={{ color: '#c2410c' }}>
                ⚠️ Important Instructions
              </div>
              <ul className="space-y-1.5" style={{ color: '#7c2d12' }}>
                <li>• Read the official notification carefully before applying.</li>
                <li>• Ensure you meet all eligibility criteria before submitting the application.</li>
                <li>• Keep a printout of your application form for future reference.</li>
                <li>• Apply before the last date to avoid server load issues.</li>
                <li>• All information provided must be accurate and verifiable.</li>
              </ul>
            </div>
          </div>

          {/* Sidebar: Important Links */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="rounded-2xl overflow-hidden" style={{ border: '2px solid var(--primary)', boxShadow: '0 4px 20px rgba(26,60,110,0.1)' }}>
                <div className="px-5 py-4 font-black text-white text-sm" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-light))' }}>
                  🔗 Important Links
                </div>
                <div className="p-4 space-y-3 bg-white">
                  {importantLinks.length > 0 ? importantLinks.map((link, i) => {
                    const Icon = link.icon;
                    return (
                      <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl no-underline font-semibold text-sm hover:scale-102 transition-all hover:shadow-sm"
                        style={{ background: link.bg, color: link.color, border: `1px solid ${link.color}25` }}>
                        <Icon size={16} />
                        <span className="flex-1">{link.label}</span>
                        <ExternalLink size={12} style={{ opacity: 0.6 }} />
                      </a>
                    );
                  }) : (
                    <p className="text-sm text-center py-4" style={{ color: 'var(--text-muted)' }}>Links will appear here once added to the Google Sheet.</p>
                  )}
                </div>
              </div>

              {/* Quick info card */}
              <div className="mt-4 rounded-xl p-5 text-sm space-y-3" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                <div className="font-bold" style={{ color: '#166534' }}>📌 Quick Info</div>
                {n.lastDate && (
                  <div className="flex justify-between">
                    <span style={{ color: '#166534' }}>Last Date:</span>
                    <span className="font-semibold" style={{ color: '#166534' }}>{n.lastDate}</span>
                  </div>
                )}
                {n.department && (
                  <div className="flex justify-between gap-3">
                    <span style={{ color: '#166534' }}>Dept:</span>
                    <span className="font-semibold text-right" style={{ color: '#166534' }}>{n.department}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span style={{ color: '#166534' }}>Status:</span>
                  <span className="font-semibold capitalize" style={{ color: '#166534' }}>{n.status}</span>
                </div>
              </div>

              {/* Share / Back */}
              <Link href={`/${n.category}`}
                className="mt-4 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold no-underline transition-all hover:opacity-80"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                ← Back to {categoryLabel[n.category]}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
