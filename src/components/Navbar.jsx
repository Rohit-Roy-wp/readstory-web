'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: 'rgba(250, 247, 242, 0.88)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid #e0d5c5',
        }}>
            <div style={{
                maxWidth: '64rem',
                margin: '0 auto',
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    <BookOpen style={{ width: '22px', height: '22px', color: '#c8823a' }} />
                    <span className="gradient-text" style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '1.4rem',
                        fontWeight: '700',
                    }}>
                        ReadStory
                    </span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                    <Link
                        href="/"
                        style={{
                            textDecoration: 'none',
                            color: pathname === '/' ? '#c8823a' : '#7a6a5a',
                            transition: 'color 0.2s',
                        }}
                    >
                        Stories
                    </Link>
                </div>
            </div>
        </nav>
    );
}