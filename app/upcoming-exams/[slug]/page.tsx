import { notFound } from 'next/navigation';
import { fetchBySlug, fetchAllNotifications } from '@/lib/sheets';
import NotificationDetail from '@/components/NotificationDetail';
import type { Metadata } from 'next';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = await fetchBySlug(slug);
  if (!n || n.category !== 'upcoming-exams') return { title: 'Exam Not Found' };
  return {
    title: `${n.title} – Exam Schedule & Details`,
    description: n.overview?.slice(0, 160) || `Complete details for ${n.title} by ${n.department}`,
  };
}

export async function generateStaticParams() {
  const all = await fetchAllNotifications();
  return all.filter(n => n.category === 'upcoming-exams').map(n => ({ slug: n.slug }));
}

export default async function UpcomingExamDetailPage({ params }: Props) {
  const { slug } = await params;
  const n = await fetchBySlug(slug);
  if (!n || n.category !== 'upcoming-exams') notFound();
  return <NotificationDetail notification={n} />;
}
