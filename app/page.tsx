import Link from 'next/link';
import { Briefcase, FileText, Award, BookOpen, Key, GraduationCap, Calendar, Bell, ExternalLink } from 'lucide-react';
import NotificationCard from '@/components/NotificationCard';
import SectionHeader from '@/components/SectionHeader';
import { fetchByCategory } from '@/lib/sheets';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Job & Scholar – Latest Sarkari Naukri, Admit Card, Results 2026',
  description: "India's #1 Government Job Portal. Get Latest Sarkari Naukri 2026, Admit Cards, Results, Syllabus, and Exam Updates.",
};

const quickCards = [
  { label: 'Latest Jobs', href: '/jobs', gradient: 'linear-gradient(135deg,#1a3c6e,#2d5ba3)', emoji: '💼' },
  { label: 'Admit Card', href: '/admit-card', gradient: 'linear-gradient(135deg,#7c3aed,#a855f7)', emoji: '🎫' },
  { label: 'Results', href: '/results', gradient: 'linear-gradient(135deg,#059669,#34d399)', emoji: '🏆' },
  { label: 'Syllabus', href: '/syllabus', gradient: 'linear-gradient(135deg,#0ea5e9,#38bdf8)', emoji: '📚' },
  { label: 'Answer Key', href: '/results', gradient: 'linear-gradient(135deg,#dc2626,#f87171)', emoji: '🔑' },
  { label: 'Admissions', href: '/upcoming-exams', gradient: 'linear-gradient(135deg,#d97706,#fbbf24)', emoji: '🎓' },
  { label: 'Upcoming Exams', href: '/upcoming-exams', gradient: 'linear-gradient(135deg,#0f766e,#14b8a6)', emoji: '📅' },
  { label: 'Important Updates', href: '/jobs', gradient: 'linear-gradient(135deg,#be185d,#ec4899)', emoji: '🔔' },
];

const govLinks = [
  { name: 'UPSC', url: 'https://upsc.gov.in', desc: 'Civil Services, NDA, CDS' },
  { name: 'SSC', url: 'https://ssc.gov.in', desc: 'CGL, CHSL, MTS, GD' },
  { name: 'IBPS', url: 'https://ibps.in', desc: 'PO, Clerk, SO, RRB' },
  { name: 'Railway', url: 'https://indianrailways.gov.in', desc: 'NTPC, Group D, ALP' },
  { name: 'NDA', url: 'https://upsc.gov.in', desc: 'Army, Navy, Air Force' },
  { name: 'CDS', url: 'https://upsc.gov.in', desc: 'Defence Services' },
  { name: 'UKPSC', url: 'https://ukpsc.gov.in', desc: 'Uttarakhand PSC' },
  { name: 'State PSC', url: 'https://upsc.gov.in', desc: 'All State Services' },
];

export default async function HomePage() {
  const [jobs, admitCards, results, syllabi, upcomingExams] = await Promise.all([
    fetchByCategory('jobs'),
    fetchByCategory('admit-card'),
    fetchByCategory('results'),
    fetchByCategory('syllabus'),
    fetchByCategory('upcoming-exams'),
  ]);

  const tickerItems = [...jobs.slice(0,3), ...admitCards.slice(0,2), ...results.slice(0,2)];

  return (
    <>
      {/* TICKER */}
      <div className="py-2 text-sm font-medium" style={{background:'#fff3cd',borderBottom:'2px solid #ffc107'}}>
        <div className="container-main flex items-center gap-3">
          <span className="shrink-0 font-black text-xs px-2 py-0.5 rounded" style={{background:'#e85d04',color:'#fff'}}>LIVE</span>
          <div className="ticker-wrap flex-1">
            <div className="ticker-move">
              {tickerItems.map((n,i) => (
                <span key={n.id}>
                  <Link href={`/${n.category}/${n.slug}`} className="hover:underline no-underline" style={{color:'#0f172a'}}>{n.title}</Link>
                  {i < tickerItems.length-1 && <span className="mx-6" style={{color:'#e85d04'}}>⬥</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section style={{background:'linear-gradient(135deg,#0f2547 0%,#1a3c6e 50%,#2d5ba3 100%)'}} className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:'radial-gradient(circle at 20% 20%,#fff 0%,transparent 50%),radial-gradient(circle at 80% 80%,#fff 0%,transparent 50%)'}} />
        <div className="container-main py-16 text-white text-center relative">
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-black text-3xl shadow-2xl" style={{background:'linear-gradient(135deg,#e85d04,#f48c06)'}}>JS</div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-3 tracking-tight">Job &amp; Scholar</h1>
          <p className="text-lg lg:text-xl mb-8 opacity-85 max-w-2xl mx-auto">Latest Government Jobs, Admit Cards, Results &amp; Exam Updates</p>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {[{label:'Active Jobs',value:jobs.length+'+'},{label:'Admit Cards',value:admitCards.length+'+'},{label:'Results',value:results.length+'+'},{label:'Exams',value:(syllabi.length+upcomingExams.length)+'+'}].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black" style={{color:'#f48c06'}}>{s.value}</div>
                <div className="text-xs opacity-70 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/jobs" className="px-6 py-3 rounded-xl font-bold text-white no-underline hover:scale-105 transition-all" style={{background:'linear-gradient(135deg,#e85d04,#f48c06)'}}>Browse Latest Jobs →</Link>
            <Link href="/upcoming-exams" className="px-6 py-3 rounded-xl font-bold no-underline hover:scale-105 transition-all" style={{background:'rgba(255,255,255,0.15)',color:'#fff',border:'1px solid rgba(255,255,255,0.3)'}}>Upcoming Exams</Link>
          </div>
        </div>
      </section>

      {/* QUICK ACCESS */}
      <section className="py-10 container-main">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black mb-1" style={{color:'var(--primary)'}}>Quick Access</h2>
          <p className="text-sm" style={{color:'var(--text-muted)'}}>Find what you need in one click</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {quickCards.map((card) => (
            <Link key={card.label} href={card.href}
              className="card-hover flex flex-col items-center justify-center gap-2 py-6 px-3 rounded-2xl text-white font-bold text-center no-underline shadow-md hover:shadow-xl"
              style={{background:card.gradient}}>
              <span className="text-3xl">{card.emoji}</span>
              <span className="text-xs leading-tight">{card.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="container-main space-y-12 pb-12">
        {/* LATEST JOBS */}
        <section>
          <SectionHeader title="Latest Government Jobs" subtitle="New Sarkari Naukri notifications" icon={Briefcase} viewAllHref="/jobs" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.slice(0,6).map(n => <NotificationCard key={n.id} notification={n} />)}
          </div>
        </section>

        {/* ADMIT CARDS */}
        <section>
          <SectionHeader title="Admit Cards" subtitle="Download your hall tickets" icon={FileText} viewAllHref="/admit-card" accentColor="#7c3aed" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {admitCards.length > 0 ? admitCards.slice(0,3).map(n => <NotificationCard key={n.id} notification={n} />) : (
              <div className="col-span-3 text-center py-8 rounded-xl" style={{background:'#f8fafc',color:'var(--text-muted)'}}>No admit cards available right now.</div>
            )}
          </div>
        </section>

        {/* RESULTS */}
        <section>
          <SectionHeader title="Latest Results" subtitle="Check your exam results" icon={Award} viewAllHref="/results" accentColor="#059669" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.length > 0 ? results.slice(0,3).map(n => <NotificationCard key={n.id} notification={n} />) : (
              <div className="col-span-3 text-center py-8 rounded-xl" style={{background:'#f8fafc',color:'var(--text-muted)'}}>No results available right now.</div>
            )}
          </div>
        </section>

        {/* SYLLABUS */}
        <section>
          <SectionHeader title="Syllabus & Exam Pattern" subtitle="Study materials and guides" icon={BookOpen} viewAllHref="/syllabus" accentColor="#0ea5e9" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {syllabi.length > 0 ? syllabi.slice(0,3).map(n => <NotificationCard key={n.id} notification={n} />) : (
              <div className="col-span-3 text-center py-8 rounded-xl" style={{background:'#f8fafc',color:'var(--text-muted)'}}>No syllabus updates right now.</div>
            )}
          </div>
        </section>

        {/* UPCOMING EXAMS */}
        <section>
          <SectionHeader title="Upcoming Exams 2026" subtitle="Exam calendar & schedules" icon={Calendar} viewAllHref="/upcoming-exams" accentColor="#0f766e" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingExams.length > 0 ? upcomingExams.slice(0,3).map(n => <NotificationCard key={n.id} notification={n} />) : (
              <div className="col-span-3 text-center py-8 rounded-xl" style={{background:'#f8fafc',color:'var(--text-muted)'}}>No upcoming exams listed.</div>
            )}
          </div>
        </section>

        {/* GOVT LINKS */}
        <section>
          <SectionHeader title="Important Government Links" subtitle="Official government websites" icon={ExternalLink} accentColor="#be185d" />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {govLinks.map(g => (
              <a key={g.name} href={g.url} target="_blank" rel="noopener noreferrer"
                className="card-hover flex flex-col items-center text-center p-4 rounded-xl no-underline"
                style={{background:'#fff',border:'1px solid var(--border)'}}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm mb-2" style={{background:'linear-gradient(135deg,var(--primary),var(--primary-light))',color:'#fff'}}>{g.name.slice(0,2)}</div>
                <div className="font-bold text-xs mb-0.5" style={{color:'var(--primary)'}}>{g.name}</div>
                <div className="text-xs leading-tight" style={{color:'var(--text-muted)'}}>{g.desc}</div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
