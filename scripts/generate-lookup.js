const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(process.cwd(), 'content');

function getStories(lang) {
    const dir = path.join(contentDir, lang === 'hi' ? 'stories-hi' : 'stories');
    if (!fs.existsSync(dir)) return [];

    return fs.readdirSync(dir)
        .filter((f) => f.endsWith('.mdx'))
        .map((filename) => {
            const slug = filename.replace('.mdx', '');
            const filePath = path.join(dir, filename);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const { data } = matter(fileContent);
            return {
                slug,
                title: data.title || 'Untitled',
                excerpt: data.excerpt || '',
                cover: data.cover || '/images/temp.jpg',
                author: data.author || 'Unknown',
                readTime: data.readTime || '5 min',
                tags: data.tags || [],
            };
        });
}

function generateLookup() {
    const enStories = getStories('en');
    const hiStories = getStories('hi');

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

    const outDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(
        path.join(outDir, 'story-lookup.json'),
        JSON.stringify(lookup, null, 2)
    );

    console.log(`✅ Generated story-lookup.json with ${Object.keys(lookup).length} stories`);
}

generateLookup();