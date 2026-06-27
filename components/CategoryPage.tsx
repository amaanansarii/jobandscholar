import NotificationCard from '@/components/NotificationCard';
import { Notification } from '@/types';
import { LucideIcon } from 'lucide-react';

interface Props {
  notifications: Notification[];
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accentColor: string;
  emptyMessage: string;
}

export default function CategoryPage({ notifications, title, subtitle, icon: Icon, accentColor, emptyMessage }: Props) {
  return (
    <div>
      {/* Page Header */}
      <div className="py-10" style={{ background: `linear-gradient(135deg, var(--primary-dark), var(--primary))` }}>
        <div className="container-main text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: accentColor + '30' }}>
              <Icon size={28} style={{ color: accentColor }} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-black">{title}</h1>
              <p className="opacity-70 text-sm mt-1">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-main py-10">
        {/* Count badge */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ background: accentColor + '15', color: accentColor }}>
            {notifications.length} Notification{notifications.length !== 1 ? 's' : ''} Found
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Updated daily from Google Sheets</span>
        </div>

        {notifications.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {notifications.map(n => <NotificationCard key={n.id} notification={n} />)}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl" style={{ background: '#f8fafc', border: '2px dashed var(--border)' }}>
            <div className="text-5xl mb-4">📋</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--primary)' }}>No Notifications Yet</h3>
            <p style={{ color: 'var(--text-muted)' }}>{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
