'use client';

import Link from 'next/link';
import { Languages } from 'lucide-react';
import { useEffect } from 'react';

export default function LanguageTabs({ currentLang = 'en' }) {
    // Save preference to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('readstory-lang', currentLang);
        } catch (err) {
            // Ignore
        }
    }, [currentLang]);

    const handleLangClick = (lang) => {
        try {
            localStorage.setItem('readstory-lang', lang);
        } catch (err) {
            // Ignore
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', padding: '0 1.5rem' }}>
            <div style={{
                display: 'inline-flex',
                gap: '0.25rem',
                padding: '0.25rem',
                background: 'var(--bg-tag)',
                borderRadius: '9999px',
                border: '1px solid var(--border-tag)',
            }}>
                <Link
                    href="/"
                    onClick={() => handleLangClick('en')}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        padding: '0.5rem 1.25rem',
                        borderRadius: '9999px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        textDecoration: 'none',
                        background: currentLang === 'en' ? 'var(--accent)' : 'transparent',
                        color: currentLang === 'en' ? 'var(--text-on-accent)' : 'var(--text-muted)',
                        transition: 'all 0.2s',
                    }}
                >
                    <Languages style={{ width: '14px', height: '14px' }} />
                    English
                </Link>
                <Link
                    href="/hinglish"
                    onClick={() => handleLangClick('hi')}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        padding: '0.5rem 1.25rem',
                        borderRadius: '9999px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        textDecoration: 'none',
                        background: currentLang === 'hi' ? 'var(--accent)' : 'transparent',
                        color: currentLang === 'hi' ? 'var(--text-on-accent)' : 'var(--text-muted)',
                        transition: 'all 0.2s',
                    }}
                >
                    Hinglish
                </Link>
            </div>
        </div>
    );
}