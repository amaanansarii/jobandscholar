import { FileText } from 'lucide-react';
import { fetchByCategory } from '@/lib/sheets';
import CategoryPage from '@/components/CategoryPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admit Card 2026 – Download Hall Ticket',
  description: 'Download latest admit cards and hall tickets for SSC, UPSC, Railway, Banking, and other government exams.',
};

export default async function AdmitCardPage() {
  const admitCards = await fetchByCategory('admit-card');
  return (
    <CategoryPage
      notifications={admitCards}
      title="Admit Cards 2026"
      subtitle="Download hall tickets for upcoming government exams"
      icon={FileText}
      accentColor="#7c3aed"
      emptyMessage="No admit cards available right now. Check back soon!"
    />
  );
}
