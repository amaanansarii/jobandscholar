import { MetadataRoute } from 'next';
import { fetchAllNotifications } from '@/lib/sheets';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://jobscholar.in';
  const notifications = await fetchAllNotifications();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/jobs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/admit-card`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/results`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/syllabus`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/upcoming-exams`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const dynamicPages: MetadataRoute.Sitemap = notifications.map(n => ({
    url: `${baseUrl}/${n.category}/${n.slug}`,
    lastModified: new Date(n.publishDate || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: n.featured ? 0.8 : 0.7,
  }));

  return [...staticPages, ...dynamicPages];
}
