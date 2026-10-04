import StoriesGrid from '@/components/StoriesGrid';
import LanguageTabs from '@/components/LanguageTabs';
import { getAllStories } from '@/lib/stories';
import { Sparkles, BookOpen } from 'lucide-react';

export default function HomePage() {
  const stories = getAllStories('en');

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{
        maxWidth: '48rem',
        margin: '0 auto',
        padding: '4rem 1.5rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          padding: '0.375rem 1rem',
          borderRadius: '9999px',
          fontSize: '0.7rem',
          fontWeight: '600',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          background: 'var(--bg-tag)',
          color: 'var(--accent)',
          border: '1px solid var(--border-tag)',
        }}>
          <Sparkles style={{ width: '12px', height: '12px' }} />
          Fresh Stories Weekly
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: '900',
          lineHeight: '1.1',
          marginBottom: '1.25rem',
          color: 'var(--text-primary)',
          fontSize: 'clamp(2.2rem, 6vw, 4rem)',
        }}>
          Stories that{' '}
          <span className="gradient-text" style={{ fontStyle: 'italic' }}>stay</span>
          {' '}with you
        </h1>

        <p style={{
          maxWidth: '36rem',
          margin: '0 auto 1.5rem',
          fontSize: '1.05rem',
          lineHeight: '1.75',
          color: 'var(--text-muted)',
        }}>
          Short reads for long days. Handpicked tales of mystery, love, loss, and life.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-light)' }}>
          <BookOpen style={{ width: '16px', height: '16px', color: 'var(--accent)' }} />
          <span>{stories.length} stories and counting</span>
        </div>
      </section>

      <LanguageTabs currentLang="en" />
      <StoriesGrid stories={stories} lang="en" />
    </div>
  );
}