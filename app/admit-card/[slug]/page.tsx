import { notFound } from 'next/navigation';
import { fetchBySlug, fetchAllNotifications } from '@/lib/sheets';
import NotificationDetail from '@/components/NotificationDetail';
import type { Metadata } from 'next';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = await fetchBySlug(slug);
  if (!n || n.category !== 'admit-card') return { title: 'Admit Card Not Found' };
  return {
    title: `${n.title} – Download Hall Ticket`,
    description: n.overview?.slice(0, 160) || `Download ${n.title} from ${n.department}`,
  };
}

export async function generateStaticParams() {
  const all = await fetchAllNotifications();
  return all.filter(n => n.category === 'admit-card').map(n => ({ slug: n.slug }));
}

export default async function AdmitCardDetailPage({ params }: Props) {
  const { slug } = await params;
  const n = await fetchBySlug(slug);
  if (!n || n.category !== 'admit-card') notFound();
  return <NotificationDetail notification={n} />;
}
