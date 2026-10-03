import StoryCard from '@/components/StoryCard';
import { getAllStories } from '@/lib/stories';
import { Sparkles, BookOpen } from 'lucide-react';

export default function HomePage() {
  const stories = getAllStories();

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{
        maxWidth: '48rem',
        margin: '0 auto',
        padding: '4rem 1.5rem 3rem',
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
          background: '#f0e8d8',
          color: '#c8823a',
          border: '1px solid #e0c898',
        }}>
          <Sparkles style={{ width: '12px', height: '12px' }} />
          Fresh Stories Weekly
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: '900',
          lineHeight: '1.1',
          marginBottom: '1.25rem',
          color: '#1a1208',
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
          color: '#7a6a5a',
        }}>
          Short reads for long days. Handpicked tales of mystery, love, loss, and life.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#9a8a7a' }}>
          <BookOpen style={{ width: '16px', height: '16px', color: '#c8823a' }} />
          <span>{stories.length} stories and counting</span>
        </div>
      </section>

      {/* Stories grid */}
      <section style={{
        maxWidth: '64rem',
        margin: '0 auto',
        padding: '0 1.5rem 5rem',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 22rem), 1fr))',
          gap: '1.25rem',
          alignItems: 'stretch',
        }}>
          {stories.map((story, i) => (
            <StoryCard key={story.slug} story={story} index={i} />
          ))}
        </div>

        {stories.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: '#9a8a7a' }}>
            <p>Koi story nahi hai. Add karo content/stories/ me.</p>
          </div>
        )}
      </section>
    </div>
  );
}