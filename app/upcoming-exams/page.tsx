import { Calendar } from 'lucide-react';
import { fetchByCategory } from '@/lib/sheets';
import CategoryPage from '@/components/CategoryPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upcoming Exams 2026 – Exam Calendar Schedule',
  description: 'Complete upcoming government exam schedule and calendar for 2026. SSC, UPSC, Railway, Banking, Defence exams.',
};

export default async function UpcomingExamsPage() {
  const exams = await fetchByCategory('upcoming-exams');
  return (
    <CategoryPage
      notifications={exams}
      title="Upcoming Exams 2026"
      subtitle="Complete exam calendar and schedule for government exams"
      icon={Calendar}
      accentColor="#0f766e"
      emptyMessage="No upcoming exams scheduled. Add entries via your Google Sheet."
    />
  );
}
