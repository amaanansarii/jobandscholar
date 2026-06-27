import { Briefcase } from 'lucide-react';
import { fetchByCategory } from '@/lib/sheets';
import CategoryPage from '@/components/CategoryPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Latest Government Jobs 2026 – Sarkari Naukri',
  description: 'Find the latest government job notifications for SSC, UPSC, Railway, Banking, Defence and State PSC. Apply online for Sarkari Naukri 2026.',
};

export default async function JobsPage() {
  const jobs = await fetchByCategory('jobs');
  return (
    <CategoryPage
      notifications={jobs}
      title="Latest Government Jobs 2026"
      subtitle="Sarkari Naukri notifications – Updated daily"
      icon={Briefcase}
      accentColor="#1a3c6e"
      emptyMessage="No active job notifications right now. Connect your Google Sheet to start adding notifications."
    />
  );
}
