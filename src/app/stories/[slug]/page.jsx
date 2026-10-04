import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';
import { getStoryBySlug, getAllSlugs } from '@/lib/stories';
import ReadingProgress from '@/components/ReadingProgress';
import ShareButton from '@/components/ShareButton';

export async function generateStaticParams() {
    return getAllSlugs('en');
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const story = getStoryBySlug(slug, 'en');
    if (!story) return { title: 'Story not found' };

    return {
        title: `${story.title} — ReadStory`,
        description: story.excerpt,
    };
}

export default async function StoryPage({ params }) {
    const { slug } = await params;
    const story = getStoryBySlug(slug, 'en');

    if (!story) notFound();

    return (
        <article style={{ minHeight: '100vh', paddingBottom: '1rem' }}>
            <ReadingProgress />

            <div style={{ position: 'relative', overflow: 'hidden', height: 'clamp(220px, 40vw, 400px)' }}>
                <img
                    src={story.cover}
                    alt={story.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 70%)',
                    opacity: 0.92,
                }} />
            </div>

            <div style={{
                maxWidth: '44rem',
                margin: '0 auto',
                padding: '0 1.5rem',
                marginTop: '-5rem',
                position: 'relative',
            }}>
                <Link
                    href="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        marginBottom: '1.25rem',
                        textDecoration: 'none',
                    }}
                >
                    <ArrowLeft style={{ width: '16px', height: '16px' }} />
                    All stories
                </Link>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                    {story.tags.map((tag) => (
                        <span
                            key={tag}
                            style={{
                                fontSize: '0.75rem',
                                padding: '0.2rem 0.75rem',
                                borderRadius: '9999px',
                                fontWeight: '500',
                                background: 'var(--bg-tag)',
                                color: 'var(--accent-dark)',
                                border: '1px solid var(--border-tag)',
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h1 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: '900',
                    lineHeight: '1.15',
                    marginBottom: '1.25rem',
                    color: 'var(--text-primary)',
                    fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                }}>
                    {story.title}
                </h1>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '1.25rem',
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    marginBottom: '2rem',
                    paddingBottom: '1.5rem',
                    borderBottom: '1px solid var(--border-color)',
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <User style={{ width: '16px', height: '16px', color: 'var(--accent)' }} />
                        {story.author}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <Clock style={{ width: '16px', height: '16px', color: 'var(--accent)' }} />
                        {story.readTime}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <Calendar style={{ width: '16px', height: '16px', color: 'var(--accent)' }} />
                        {new Date(story.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        })}
                    </span>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <ShareButton
                        title={story.title}
                        url={`https://readstory-web.vercel.app/stories/${slug}`}
                    />
                </div>

                <div className="prose-story">
                    <MDXRemote source={story.content} />
                </div>

                <div style={{ textAlign: 'center', margin: '2rem 0 2rem', fontSize: '1.5rem', color: 'var(--accent)' }}>
                    ✦ ✦ ✦
                </div>

                <div style={{ textAlign: 'center' }}>
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
                        Read more stories
                    </Link>
                </div>
            </div>
        </article>
    );
}