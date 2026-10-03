import { BookOpen, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer
            style={{
                marginTop: '2rem',
                borderTop: '1px solid #e0d5c5',
                background: '#f5f0e8',
            }}
        >
            <div
                style={{
                    maxWidth: '64rem',
                    margin: '0 auto',
                    padding: '1rem 1.5rem',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                    }}
                >
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <BookOpen style={{ width: '20px', height: '20px', color: '#c8823a' }} />
                        <span
                            className="gradient-text"
                            style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontSize: '1.1rem',
                                fontWeight: '700',
                            }}
                        >
                            ReadStory
                        </span>
                    </div>

                    {/* Made with love */}
                    <p
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            fontSize: '0.875rem',
                            color: '#7a6a5a',
                        }}
                    >
                        Made with{' '}
                        <Heart
                            style={{
                                width: '16px',
                                height: '16px',
                                color: '#c8823a',
                                fill: '#c8823a',
                            }}
                        />{' '}
                        by Rohit
                    </p>

                    {/* Copyright */}
                    <p style={{ fontSize: '0.75rem', color: '#9a8a7a' }}>
                        © {new Date().getFullYear()} ReadStory
                    </p>
                </div>
            </div>
        </footer>
    );
}