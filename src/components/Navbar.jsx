'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Moon, Sun, Bookmark } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useBookmarks } from '@/hooks/useBookmarks';

export default function Navbar() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const { bookmarks, mounted } = useBookmarks();

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: 'var(--bg-secondary)',
            opacity: 0.92,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border-color)',
            transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}>
            <div style={{
                maxWidth: '64rem',
                margin: '0 auto',
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    <BookOpen style={{ width: '22px', height: '22px', color: 'var(--accent)' }} />
                    <span className="gradient-text" style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '1.4rem',
                        fontWeight: '700',
                    }}>
                        ReadStory
                    </span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link
                        href="/"
                        style={{
                            textDecoration: 'none',
                            color: pathname === '/' ? 'var(--accent)' : 'var(--text-muted)',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            transition: 'color 0.2s',
                        }}
                    >
                        Stories
                    </Link>

                    {/* Saved Icon with Badge */}
                    <Link
                        href="/saved"
                        aria-label="Saved stories"
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-card)',
                            color: pathname === '/saved' ? 'var(--accent)' : 'var(--text-muted)',
                            textDecoration: 'none',
                            transition: 'all 0.2s',
                        }}
                    >
                        <Bookmark
                            style={{
                                width: '18px',
                                height: '18px',
                                fill: pathname === '/saved' ? 'var(--accent)' : 'transparent',
                            }}
                        />

                        {/* Count Badge — Top Right */}
                        {mounted && bookmarks.length > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-4px',
                                right: '-4px',
                                minWidth: '18px',
                                height: '18px',
                                padding: '0 4px',
                                borderRadius: '9999px',
                                background: 'var(--accent)',
                                color: '#ffffff',
                                fontSize: '0.65rem',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid var(--bg-secondary)',
                                lineHeight: 1,
                            }}>
                                {bookmarks.length > 9 ? '9+' : bookmarks.length}
                            </span>
                        )}
                    </Link>

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-card)',
                            color: 'var(--accent)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        {theme === 'dark' ? (
                            <Sun style={{ width: '18px', height: '18px' }} />
                        ) : (
                            <Moon style={{ width: '18px', height: '18px' }} />
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}