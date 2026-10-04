'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

export default function ShareButton({ title, url }) {
    const [copied, setCopied] = useState(false);
    const [isSharing, setIsSharing] = useState(false);

    const handleShare = async () => {
        // Prevent double-clicks while share dialog is open
        if (isSharing) return;

        const shareUrl = url || window.location.href;
        const shareData = {
            title: title,
            text: `Read "${title}" on ReadStory`,
            url: shareUrl,
        };

        // Use Web Share API if available (mobile)
        if (navigator.share) {
            try {
                setIsSharing(true);
                await navigator.share(shareData);
            } catch (err) {
                // AbortError = user cancelled the share dialog (not a real error)
                if (err.name !== 'AbortError' && err.name !== 'InvalidStateError') {
                    console.error('Share failed:', err);
                }
            } finally {
                setIsSharing(false);
            }
        } else {
            // Fallback: copy to clipboard (desktop)
            try {
                await navigator.clipboard.writeText(shareUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Copy failed:', err);
            }
        }
    };

    return (
        <button
            onClick={handleShare}
            disabled={isSharing}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: '500',
                background: copied ? '#c8823a' : '#ffffff',
                color: copied ? '#ffffff' : '#7a6a5a',
                border: '1px solid',
                borderColor: copied ? '#c8823a' : '#e0d5c5',
                cursor: isSharing ? 'wait' : 'pointer',
                opacity: isSharing ? 0.6 : 1,
                transition: 'all 0.2s',
            }}
        >
            {copied ? (
                <>
                    <Check style={{ width: '16px', height: '16px' }} />
                    Copied!
                </>
            ) : (
                <>
                    <Share2 style={{ width: '16px', height: '16px' }} />
                    {isSharing ? 'Sharing...' : 'Share'}
                </>
            )}
        </button>
    );
}