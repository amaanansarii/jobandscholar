import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-96 flex flex-col items-center justify-center text-center py-20 container-main">
      <div className="text-7xl mb-6">🔍</div>
      <h1 className="text-4xl font-black mb-3" style={{ color: 'var(--primary)' }}>404</h1>
      <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>Page Not Found</h2>
      <p className="max-w-md mb-8" style={{ color: 'var(--text-muted)' }}>
        The notification you are looking for may have been removed or the URL may be incorrect.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/" className="px-6 py-3 rounded-xl font-bold text-white no-underline" style={{ background: 'var(--primary)' }}>
          Go to Home
        </Link>
        <Link href="/jobs" className="px-6 py-3 rounded-xl font-bold no-underline" style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}>
          Browse Jobs
        </Link>
      </div>
    </div>
  );
}
