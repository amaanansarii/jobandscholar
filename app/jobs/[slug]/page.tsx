import { notFound } from 'next/navigation';
import { fetchBySlug, fetchAllNotifications } from '@/lib/sheets';
import NotificationDetail from '@/components/NotificationDetail';
import type { Metadata } from 'next';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = await fetchBySlug(slug);
  if (!n || n.category !== 'jobs') return { title: 'Job Not Found' };
  return {
    title: `${n.title} – Apply Online`,
    description: n.overview?.slice(0, 160) || `${n.title} recruitment notification by ${n.department}`,
    openGraph: { title: n.title, description: n.overview?.slice(0, 160) },
  };
}

export async function generateStaticParams() {
  const all = await fetchAllNotifications();
  return all.filter(n => n.category === 'jobs').map(n => ({ slug: n.slug }));
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const n = await fetchBySlug(slug);
  if (!n || n.category !== 'jobs') notFound();
  return <NotificationDetail notification={n} />;
}
