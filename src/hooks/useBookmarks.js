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

    // Load bookmarks on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                setBookmarks(JSON.parse(saved));
            }
        } catch (err) {
            console.error('Failed to load bookmarks:', err);
        }
        setMounted(true);
    }, []);

    // Sync across tabs/windows (optional but nice)
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

    const toggleBookmark = (story, lang = 'en') => {
        const key = `${lang}:${story.slug}`;
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
                    lang,
                    savedAt: new Date().toISOString(),
                },
            ];
            saveBookmarks(updated);
        }
    };

    const isBookmarked = (slug, lang = 'en') => {
        return bookmarks.some((b) => b.key === `${lang}:${slug}`);
    };

    return (
        <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked, mounted }}>
            {children}
        </BookmarkContext.Provider>
    );
}

// Hook to use in components
export function useBookmarks() {
    return useContext(BookmarkContext);
}