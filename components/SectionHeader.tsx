import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  viewAllHref?: string;
  accentColor?: string;
}

export default function SectionHeader({ title, subtitle, icon: Icon, viewAllHref, accentColor = '#e85d04' }: Props) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {Icon && (
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: accentColor + '15' }}>
              <Icon size={18} style={{ color: accentColor }} />
            </div>
          )}
          <h2 className="text-xl font-black" style={{ color: 'var(--primary)' }}>{title}</h2>
        </div>
        {subtitle && <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>}
        <div className="mt-2 h-0.5 w-16 rounded-full" style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)` }} />
      </div>
      {viewAllHref && (
        <Link href={viewAllHref}
          className="flex items-center gap-1 text-sm font-semibold no-underline hover:opacity-80 transition-opacity"
          style={{ color: 'var(--primary-light)' }}>
          View All <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}
