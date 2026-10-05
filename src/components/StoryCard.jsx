'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Bookmark } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';

export default function StoryCard({ story, index = 0, lang = 'en' }) {
    const { toggleBookmark, isBookmarked, mounted } = useBookmarks();

    const storyUrl = lang === 'hi'
        ? `/stories-hi/${story.slug}`
        : `/stories/${story.slug}`;

    const bookmarked = mounted && isBookmarked(story.slug, lang);

    const handleBookmark = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(story, lang);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="h-full"
        >
            <Link href={storyUrl} className="group block h-full">
                <div
                    className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                >
                    {/* Cover image */}
                    <div className="relative overflow-hidden flex-shrink-0" style={{ height: '200px' }}>
                        <img
                            src={story.cover}
                            alt={story.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div
                            className="absolute inset-0"
                            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%)' }}
                        />

                        {/* Bookmark Button — Top Right */}
                        <button
                            onClick={handleBookmark}
                            aria-label={bookmarked ? 'Remove bookmark' : 'Save story'}
                            style={{
                                position: 'absolute',
                                top: '0.75rem',
                                right: '0.75rem',
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                border: 'none',
                                background: bookmarked ? 'var(--accent)' : 'rgba(0,0,0,0.55)',
                                color: '#ffffff',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                transition: 'all 0.2s',
                                zIndex: 10,
                            }}
                        >
                            <Bookmark
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    fill: bookmarked ? '#ffffff' : 'transparent',
                                    transition: 'fill 0.2s',
                                }}
                            />
                        </button>

                        {/* Tags */}
                        <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap">
                            {story.tags.slice(0, 2).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs text-white px-2.5 py-0.5 rounded-full font-medium"
                                    style={{ background: 'rgba(25,25,25,0.7)', backdropFilter: 'blur(4px)' }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Card content */}
                    <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>

                        <h3
                            className="font-serif text-xl font-bold"
                            style={{
                                color: 'var(--text-primary)',
                                lineHeight: '1.4',
                                height: '3.5rem',
                                overflow: 'hidden',
                                marginBottom: '0.5rem',
                                width: '100%',
                            }}
                        >
                            {story.title}
                        </h3>

                        <p
                            className="text-sm"
                            style={{
                                color: 'var(--text-muted)',
                                lineHeight: '1.4',
                                height: '2.8rem',
                                overflow: 'hidden',
                                marginBottom: '0.75rem',
                                width: '100%',
                            }}
                        >
                            {story.excerpt}
                        </p>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                fontSize: '0.75rem',
                                borderTop: '1px solid var(--border-light)',
                                color: 'var(--text-light)',
                                paddingTop: '0.75rem',
                                marginTop: 'auto',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    {story.author}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <Clock style={{ width: '12px', height: '12px' }} />
                                    {story.readTime}
                                </span>
                            </div>
                            <ArrowRight
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0"
                                style={{ color: 'var(--accent)' }}
                            />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}