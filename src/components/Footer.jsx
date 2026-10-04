import { BookOpen, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer
            style={{
                marginTop: '1rem',
                borderTop: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
            }}
        >
            <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <BookOpen style={{ width: '20px', height: '20px', color: 'var(--accent)' }} />
                        <span className="gradient-text" style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: '1.1rem',
                            fontWeight: '700',
                        }}>
                            ReadStory
                        </span>
                    </div>

                    <p style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                    }}>
                        Made with{' '}
                        <Heart style={{ width: '16px', height: '16px', color: 'var(--accent)', fill: 'var(--accent)' }} />{' '}
                        by Rohit
                    </p>

                    <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                        © {new Date().getFullYear()} ReadStory
                    </p>
                </div>
            </div>
        </footer>
    );
}