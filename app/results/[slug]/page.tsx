import { notFound } from 'next/navigation';
import { fetchBySlug, fetchAllNotifications } from '@/lib/sheets';
import NotificationDetail from '@/components/NotificationDetail';
import type { Metadata } from 'next';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = await fetchBySlug(slug);
  if (!n || n.category !== 'results') return { title: 'Result Not Found' };
  return {
    title: `${n.title} – Check Result`,
    description: n.overview?.slice(0, 160) || `Check ${n.title} declared by ${n.department}`,
  };
}

export async function generateStaticParams() {
  const all = await fetchAllNotifications();
  return all.filter(n => n.category === 'results').map(n => ({ slug: n.slug }));
}

export default async function ResultDetailPage({ params }: Props) {
  const { slug } = await params;
  const n = await fetchBySlug(slug);
  if (!n || n.category !== 'results') notFound();
  return <NotificationDetail notification={n} />;
}
