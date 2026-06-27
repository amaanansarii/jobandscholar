import { BookOpen } from 'lucide-react';
import { fetchByCategory } from '@/lib/sheets';
import CategoryPage from '@/components/CategoryPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Syllabus 2026 – Exam Pattern & Study Material',
  description: 'Download latest exam syllabus and exam patterns for SSC, UPSC, Railway, Banking and other government exams.',
};

export default async function SyllabusPage() {
  const syllabi = await fetchByCategory('syllabus');
  return (
    <CategoryPage
      notifications={syllabi}
      title="Syllabus & Exam Pattern 2026"
      subtitle="Complete syllabus and study material for all government exams"
      icon={BookOpen}
      accentColor="#0ea5e9"
      emptyMessage="No syllabus updates right now."
    />
  );
}
