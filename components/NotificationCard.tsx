import Link from 'next/link';
import { Calendar, Building2, ArrowRight, Clock } from 'lucide-react';
import { Notification } from '@/types';

interface Props {
  notification: Notification;
  showCategory?: boolean;
}

function getDaysLeft(dateStr: string): number | null {
  if (!dateStr) return null;
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getCategoryPath(cat: string) {
  return `/${cat}`;
}

export default function NotificationCard({ notification: n, showCategory }: Props) {
  const daysLeft = getDaysLeft(n.lastDate);
  const href = `${getCategoryPath(n.category)}/${n.slug}`;

  const urgencyColor = daysLeft !== null
    ? daysLeft <= 3 ? '#dc2626' : daysLeft <= 7 ? '#d97706' : '#059669'
    : '#64748b';

  return (
    <div className="card-hover bg-white rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
      {/* Top accent bar */}
      <div className="h-1" style={{ background: n.featured ? 'linear-gradient(90deg, var(--accent), var(--accent-light))' : 'var(--primary-light)' }} />

      <div className="p-5">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {n.featured && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#fff7ed', color: '#c2410c' }}>
              🔥 HOT
            </span>
          )}
          {showCategory && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full capitalize" style={{ background: '#eff6ff', color: '#1d4ed8' }}>
              {n.category.replace('-', ' ')}
            </span>
          )}
          {n.status === 'upcoming' && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: '#f0fdf4', color: '#166534' }}>
              📅 Upcoming
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={href} className="no-underline">
          <h3 className="font-bold text-base leading-snug mb-2 hover:text-blue-700 transition-colors line-clamp-2" style={{ color: 'var(--primary)' }}>
            {n.title}
          </h3>
        </Link>

        {/* Department */}
        <div className="flex items-center gap-1.5 text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
          <Building2 size={13} />
          <span className="truncate">{n.department}</span>
        </div>

        {/* Overview snippet */}
        {n.overview && (
          <p className="text-xs mb-4 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
            {n.overview}
          </p>
        )}

        {/* Dates */}
        <div className="flex items-center justify-between text-xs border-t pt-3" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
            <Calendar size={12} />
            <span>Published: {n.publishDate}</span>
          </div>

          {n.lastDate && (
            <div className="flex items-center gap-1 font-semibold" style={{ color: urgencyColor }}>
              <Clock size={12} />
              <span>
                {daysLeft !== null && daysLeft >= 0
                  ? daysLeft === 0 ? 'Last Day!' : `${daysLeft}d left`
                  : 'Closed'}
              </span>
            </div>
          )}
        </div>

        {/* CTA */}
        <Link href={href}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 no-underline"
          style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-light))' }}>
          View Details <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
