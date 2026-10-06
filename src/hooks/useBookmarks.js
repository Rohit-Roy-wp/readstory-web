'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'readstory-bookmarks';

const BookmarkContext = createContext({
    bookmarks: [],
    toggleBookmark: () => { },
    isBookmarked: () => false,
    mounted: false,
});

export function BookmarkProvider({ children }) {
    const [bookmarks, setBookmarks] = useState([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Migrate old keys (with lang prefix) to new format (slug only)
                const migrated = parsed.map((b) => {
                    if (b.key && b.key.includes(':')) {
                        return { ...b, key: b.slug };
                    }
                    return b;
                });
                // Remove duplicates (same slug)
                const unique = migrated.filter(
                    (b, i, arr) => arr.findIndex((x) => x.slug === b.slug) === i
                );
                setBookmarks(unique);
                // Save migrated version
                localStorage.setItem(STORAGE_KEY, JSON.stringify(unique));
            }
        } catch (err) {
            console.error('Failed to load bookmarks:', err);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleStorage = (e) => {
            if (e.key === STORAGE_KEY && e.newValue) {
                try {
                    setBookmarks(JSON.parse(e.newValue));
                } catch (err) {
                    console.error('Failed to sync bookmarks:', err);
                }
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const saveBookmarks = (newBookmarks) => {
        setBookmarks(newBookmarks);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
        } catch (err) {
            console.error('Failed to save bookmarks:', err);
        }
    };

    const toggleBookmark = (story) => {
        const key = story.slug; // Slug only — language agnostic
        const exists = bookmarks.find((b) => b.key === key);

        if (exists) {
            const updated = bookmarks.filter((b) => b.key !== key);
            saveBookmarks(updated);
        } else {
            const updated = [
                ...bookmarks,
                {
                    key,
                    slug: story.slug,
                    title: story.title,
                    excerpt: story.excerpt,
                    cover: story.cover,
                    author: story.author,
                    readTime: story.readTime,
                    tags: story.tags,
                    // Note: lang nahi save kar rahe — language dynamic decide hogi
                    savedAt: new Date().toISOString(),
                },
            ];
            saveBookmarks(updated);
        }
    };

    const isBookmarked = (slug) => {
        return bookmarks.some((b) => b.key === slug);
    };

    return (
        <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked, mounted }}>
            {children}
        </BookmarkContext.Provider>
    );
}

export function useBookmarks() {
    return useContext(BookmarkContext);
}