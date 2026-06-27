import { Award } from 'lucide-react';
import { fetchByCategory } from '@/lib/sheets';
import CategoryPage from '@/components/CategoryPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exam Results 2026 – Check Sarkari Results',
  description: 'Check latest government exam results for SSC, UPSC, Railway, Banking and other competitive exams.',
};

export default async function ResultsPage() {
  const results = await fetchByCategory('results');
  return (
    <CategoryPage
      notifications={results}
      title="Exam Results 2026"
      subtitle="Check latest government exam results"
      icon={Award}
      accentColor="#059669"
      emptyMessage="No results declared yet. Check back after exams."
    />
  );
}
