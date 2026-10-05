'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'readstory-bookmarks';

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState([]);
    const [mounted, setMounted] = useState(false);

    // Load bookmarks from localStorage
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

    // Save bookmarks to localStorage
    const saveBookmarks = (newBookmarks) => {
        setBookmarks(newBookmarks);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
        } catch (err) {
            console.error('Failed to save bookmarks:', err);
        }
    };

    // Toggle bookmark
    const toggleBookmark = (story, lang = 'en') => {
        const key = `${lang}:${story.slug}`;
        const exists = bookmarks.find((b) => b.key === key);

        if (exists) {
            // Remove
            const updated = bookmarks.filter((b) => b.key !== key);
            saveBookmarks(updated);
        } else {
            // Add
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

    // Check if bookmarked
    const isBookmarked = (slug, lang = 'en') => {
        return bookmarks.some((b) => b.key === `${lang}:${slug}`);
    };

    return {
        bookmarks,
        toggleBookmark,
        isBookmarked,
        mounted,
    };
}