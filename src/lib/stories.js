import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const STORIES_DIR = path.join(process.cwd(), 'content/stories');

export function getAllStories() {
    if (!fs.existsSync(STORIES_DIR)) return [];
    const files = fs.readdirSync(STORIES_DIR);
    return files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => {
            const slug = file.replace(/\.mdx$/, '');
            const filePath = path.join(STORIES_DIR, file);
            const raw = fs.readFileSync(filePath, 'utf-8');
            const { data } = matter(raw);
            return {
                slug,
                title: data.title || 'Untitled',
                excerpt: data.excerpt || '',
                author: data.author || 'Anonymous',
                date: data.date || '',
                tags: data.tags || [],
                cover: data.cover || '/images/placeholder.jpg',
                readTime: data.readTime || '5 min',
            };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getStoryBySlug(slug) {
    const filePath = path.join(STORIES_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    return {
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        author: data.author || 'Anonymous',
        date: data.date || '',
        tags: data.tags || [],
        cover: data.cover || '/images/placeholder.jpg',
        readTime: data.readTime || '5 min',
        content,
    };
}

export function getAllSlugs() {
    if (!fs.existsSync(STORIES_DIR)) return [];
    return fs
        .readdirSync(STORIES_DIR)
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => ({
            slug: file.replace(/\.mdx$/, ''),
        }));
}