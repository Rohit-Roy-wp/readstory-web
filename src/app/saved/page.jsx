'use client';

import Link from 'next/link';
import { Bookmark, ArrowLeft } from 'lucide-react';
import StoryCard from '@/components/StoryCard';
import { useBookmarks } from '@/hooks/useBookmarks';

export default function SavedPage() {
    const { bookmarks, mounted } = useBookmarks();

    if (!mounted) {
        return (
            <div style={{ minHeight: '100vh', padding: '4rem 1.5rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
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
                    <Bookmark style={{ width: '12px', height: '12px' }} />
                    Your Collection
                </div>

                <h1 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: '900',
                    lineHeight: '1.1',
                    marginBottom: '1.25rem',
                    color: 'var(--text-primary)',
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                }}>
                    Saved Stories
                </h1>

                <p style={{
                    maxWidth: '36rem',
                    margin: '0 auto 1.5rem',
                    fontSize: '1rem',
                    lineHeight: '1.75',
                    color: 'var(--text-muted)',
                }}>
                    {bookmarks.length === 0
                        ? 'Abhi tak koi story save nahi ki. Bookmark icon pe click karke save karo.'
                        : `${bookmarks.length} ${bookmarks.length === 1 ? 'story' : 'stories'} saved`}
                </p>

                {bookmarks.length > 0 && (
                    <Link
                        href="/"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            fontSize: '0.875rem',
                            color: 'var(--text-muted)',
                            textDecoration: 'none',
                        }}
                    >
                        <ArrowLeft style={{ width: '16px', height: '16px' }} />
                        Explore more stories
                    </Link>
                )}
            </section>

            {bookmarks.length > 0 && (
                <section style={{
                    maxWidth: '64rem',
                    margin: '0 auto',
                    padding: '0 1.5rem',
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 22rem), 1fr))',
                        gap: '1.5rem',
                        alignItems: 'stretch',
                    }}>
                        {bookmarks.map((story, i) => (
                            <StoryCard key={story.key} story={story} index={i} lang={story.lang} />
                        ))}
                    </div>
                </section>
            )}

            {bookmarks.length === 0 && (
                <section style={{
                    maxWidth: '32rem',
                    margin: '2rem auto 0',
                    padding: '0 1.5rem',
                    textAlign: 'center',
                }}>
                    <div style={{
                        padding: '3rem 2rem',
                        borderRadius: '1rem',
                        border: '2px dashed var(--border-color)',
                        background: 'var(--bg-card)',
                    }}>
                        <Bookmark style={{
                            width: '48px',
                            height: '48px',
                            color: 'var(--text-light)',
                            margin: '0 auto 1rem',
                        }} />
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            Saved stories yahan dikhengi. Kisi bhi story card pe bookmark icon pe click karo.
                        </p>
                        <Link
                            href="/"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.6rem 1.25rem',
                                borderRadius: '9999px',
                                background: 'var(--accent)',
                                color: 'var(--text-on-accent)',
                                textDecoration: 'none',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                            }}
                        >
                            Explore Stories
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
}