'use client';

import { useState, useMemo } from 'react';
import StoryCard from '@/components/StoryCard';
import { Search, X } from 'lucide-react';

export default function StoriesGrid({ stories, lang = 'en' }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTag, setActiveTag] = useState('All');

    // Get all unique tags
    const allTags = useMemo(() => {
        const tagSet = new Set();
        stories.forEach((s) => s.tags?.forEach((t) => tagSet.add(t)));
        return ['All', ...Array.from(tagSet).sort()];
    }, [stories]);

    // Filter stories
    const filteredStories = useMemo(() => {
        let result = stories;

        if (activeTag !== 'All') {
            result = result.filter((s) => s.tags?.includes(activeTag));
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (s) =>
                    s.title.toLowerCase().includes(q) ||
                    s.excerpt.toLowerCase().includes(q) ||
                    s.tags?.some((t) => t.toLowerCase().includes(q))
            );
        }

        return result;
    }, [stories, activeTag, searchQuery]);

    return (
        <>
            {/* Search + Filter Section */}
            <section style={{
                maxWidth: '64rem',
                margin: '0 auto',
                padding: '0 1.5rem 2rem',
            }}>
                {/* Search Bar */}
                <div style={{
                    position: 'relative',
                    maxWidth: '32rem',
                    margin: '0 auto 1.5rem',
                }}>
                    <Search style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '18px',
                        height: '18px',
                        color: '#9a8a7a',
                        pointerEvents: 'none',
                    }} />
                    <input
                        type="text"
                        placeholder={lang === 'hi' ? 'Kahaniyan dhundho...' : 'Search stories...'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 2.5rem 0.75rem 2.75rem',
                            borderRadius: '9999px',
                            border: '1px solid #e0d5c5',
                            background: '#ffffff',
                            color: '#1a1208',
                            fontSize: '0.9rem',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#c8823a'}
                        onBlur={(e) => e.target.style.borderColor = '#e0d5c5'}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            style={{
                                position: 'absolute',
                                right: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#9a8a7a',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <X style={{ width: '16px', height: '16px' }} />
                        </button>
                    )}
                </div>

                {/* Tag Chips */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                }}>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            style={{
                                padding: '0.4rem 1rem',
                                borderRadius: '9999px',
                                fontSize: '0.8rem',
                                fontWeight: '500',
                                border: activeTag === tag ? '1px solid #c8823a' : '1px solid #e0d5c5',
                                background: activeTag === tag ? '#c8823a' : '#ffffff',
                                color: activeTag === tag ? '#ffffff' : '#7a6a5a',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Result Count */}
                {(searchQuery || activeTag !== 'All') && (
                    <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#9a8a7a' }}>
                        {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} found
                    </p>
                )}
            </section>

            {/* Stories Grid */}
            <section style={{
                maxWidth: '64rem',
                margin: '0 auto',
                padding: '0 1.5rem 5rem',
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 22rem), 1fr))',
                    gap: '1.5rem',
                    alignItems: 'stretch',
                }}>
                    {filteredStories.map((story, i) => (
                        <StoryCard key={story.slug} story={story} index={i} lang={lang} />
                    ))}
                </div>

                {filteredStories.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: '5rem 0',
                        color: '#9a8a7a',
                    }}>
                        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                            {lang === 'hi' ? 'Koi kahani nahi mili' : 'No stories found'}
                        </p>
                        <p style={{ fontSize: '0.85rem' }}>
                            {lang === 'hi' ? 'Kuch aur try karo' : 'Try different search or clear filters'}
                        </p>
                    </div>
                )}
            </section>
        </>
    );
}