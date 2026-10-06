import { getAllStories } from '@/lib/stories';

export const dynamic = 'force-static';

export async function GET() {
    // Get all stories from both languages
    const enStories = getAllStories('en');
    const hiStories = getAllStories('hi');

    // Build a lookup map: { slug: { en: {...}, hi: {...} } }
    const lookup = {};

    enStories.forEach((s) => {
        if (!lookup[s.slug]) lookup[s.slug] = {};
        lookup[s.slug].en = {
            title: s.title,
            excerpt: s.excerpt,
            cover: s.cover,
            author: s.author,
            readTime: s.readTime,
            tags: s.tags,
        };
    });

    hiStories.forEach((s) => {
        if (!lookup[s.slug]) lookup[s.slug] = {};
        lookup[s.slug].hi = {
            title: s.title,
            excerpt: s.excerpt,
            cover: s.cover,
            author: s.author,
            readTime: s.readTime,
            tags: s.tags,
        };
    });

    return Response.json(lookup);
}