'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Bookmark, ArrowLeft } from 'lucide-react';
import StoryCard from '@/components/StoryCard';
import { useBookmarks } from '@/hooks/useBookmarks';

export default function SavedPage() {
    const { bookmarks, mounted } = useBookmarks();
    const [currentLang, setCurrentLang] = useState('en');
    const [storyLookup, setStoryLookup] = useState({});

    // Load current language from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem('readstory-lang');
            if (saved === 'hi' || saved === 'en') {
                setCurrentLang(saved);
            }
        } catch (err) {
            // Ignore
        }
    }, []);

    // Fetch story lookup from API
    useEffect(() => {
        async function fetchLookup() {
            try {
                const res = await fetch('/api/story-lookup');
                if (res.ok) {
                    const data = await res.json();
                    setStoryLookup(data);
                }
            } catch (err) {
                console.error('Failed to fetch story lookup:', err);
            }
        }
        fetchLookup();
    }, []);

    if (!mounted) {
        return (
            <div style={{ minHeight: '100vh', padding: '4rem 1.5rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
            </div>
        );
    }

    // Merge bookmark data with current language content
    const mergedStories = bookmarks.map((b) => {
        const liveData = storyLookup[b.slug]?.[currentLang];
        return {
            ...b,
            // Override with current language content if available
            title: liveData?.title || b.title,
            excerpt: liveData?.excerpt || b.excerpt,
            cover: liveData?.cover || b.cover,
            author: liveData?.author || b.author,
            readTime: liveData?.readTime || b.readTime,
            tags: liveData?.tags || b.tags,
            lang: currentLang,
        };
    });

    // Text based on language
    const text = {
        en: {
            badge: 'Your Collection',
            title: 'Saved Stories',
            empty: 'No stories saved yet. Click the bookmark icon on any story to save it.',
            count: (n) => `${n} ${n === 1 ? 'story' : 'stories'} saved`,
            cta: 'Explore more stories',
            emptyCta: 'Explore Stories',
            emptyHint: 'Saved stories will appear here. Click the bookmark icon on any story card.',
        },
        hi: {
            badge: 'Aapka Collection',
            title: 'Saved Kahaniyan',
            empty: 'Abhi tak koi kahani save nahi ki. Kisi bhi story card pe bookmark icon pe click karo.',
            count: (n) => `${n} ${n === 1 ? 'kahani' : 'kahaniyan'} saved`,
            cta: 'Aur kahaniyan padho',
            emptyCta: 'Kahaniyan Explore Karo',
            emptyHint: 'Saved kahaniyan yahan dikhengi. Kisi bhi story card pe bookmark icon pe click karo.',
        },
    };

    const t = text[currentLang];

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
                    {t.badge}
                </div>

                <h1 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: '900',
                    lineHeight: '1.1',
                    marginBottom: '1.25rem',
                    color: 'var(--text-primary)',
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                }}>
                    {t.title}
                </h1>

                <p style={{
                    maxWidth: '36rem',
                    margin: '0 auto 1.5rem',
                    fontSize: '1rem',
                    lineHeight: '1.75',
                    color: 'var(--text-muted)',
                }}>
                    {mergedStories.length === 0 ? t.empty : t.count(mergedStories.length)}
                </p>

                {mergedStories.length > 0 && (
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
                        {t.cta}
                    </Link>
                )}
            </section>

            {mergedStories.length > 0 && (
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
                        {mergedStories.map((story, i) => (
                            <StoryCard key={story.key} story={story} index={i} lang={currentLang} />
                        ))}
                    </div>
                </section>
            )}

            {mergedStories.length === 0 && (
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
                            {t.emptyHint}
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
                            {t.emptyCta}
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
}