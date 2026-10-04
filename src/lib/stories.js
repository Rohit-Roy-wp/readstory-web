import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

function getContentDir(lang = 'en') {
    return path.join(contentDir, lang === 'hi' ? 'stories-hi' : 'stories');
}

export function getAllStories(lang = 'en') {
    const dir = getContentDir(lang);
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

    const stories = files.map((filename) => {
        const slug = filename.replace('.mdx', '');
        const filePath = path.join(dir, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);

        return {
            slug,
            title: data.title || 'Untitled',
            excerpt: data.excerpt || '',
            author: data.author || 'Unknown',
            date: data.date || '',
            readTime: data.readTime || '5 min',
            cover: data.cover || '/images/temp.jpg',
            tags: data.tags || [],
            language: lang,
        };
    });

    return stories.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getStoryBySlug(slug, lang = 'en') {
    const dir = getContentDir(lang);
    const filePath = path.join(dir, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        author: data.author || 'Unknown',
        date: data.date || '',
        readTime: data.readTime || '5 min',
        cover: data.cover || '/images/temp.jpg',
        tags: data.tags || [],
        language: lang,
        content,
    };
}

export function getAllSlugs(lang = 'en') {
    const dir = getContentDir(lang);
    if (!fs.existsSync(dir)) return [];

    return fs.readdirSync(dir)
        .filter((f) => f.endsWith('.mdx'))
        .map((filename) => ({
            slug: filename.replace('.mdx', ''),
        }));
}