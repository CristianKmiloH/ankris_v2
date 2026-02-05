import React, { useState, useRef, useEffect } from 'react';
import { MEDIA_BASE_URL } from '../../config';

interface AudioButtonProps {
    filename?: string; // Option 1: Just the filename (we prepend base url)
    src?: string;      // Option 2: Full URL (overrides filename)
    className?: string;
    style?: React.CSSProperties;
    size?: number;     // Optional custom size, defaults to 40px via CSS
}

const AudioButton: React.FC<AudioButtonProps> = ({ filename, src, className = '', style, size }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Determine the full source URL
    const audioSrc = src || (filename ? `${MEDIA_BASE_URL}/${filename}` : '');

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!audioSrc) return;

        if (isPlaying && audioRef.current) {
            // Stop if playing
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        } else {
            // Start playing
            // Create new instance or reuse? Reusing is better for performance if rapid fire,
            // but for simplicity and robustness (avoiding stale state), new instance is often safer.
            // Let's reuse ref.
            if (!audioRef.current || audioRef.current.src !== audioSrc) {
                audioRef.current = new Audio(audioSrc);
                // Attach event listeners
                audioRef.current.onended = () => {
                    setIsPlaying(false);
                };
                audioRef.current.onpause = () => {
                    // Catch external pauses? Not needed for simple button
                };
                audioRef.current.onerror = (err) => {
                    console.error("Audio play error", err);
                    setIsPlaying(false);
                };
            }

            audioRef.current.play().catch(err => {
                console.error("Audio play failed", err);
                setIsPlaying(false);
            });
            setIsPlaying(true);
        }
    };

    if (!audioSrc) return null;

    const sizeStyle = size ? { width: size, height: size, minWidth: size } : {};

    return (
        <button
            className={`anim-audio-btn ${isPlaying ? 'playing' : ''} ${className}`}
            style={{ ...style, ...sizeStyle }}
            onClick={togglePlay}
            title="Play Audio"
            type="button"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Speaker Body - Always Visible */}
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.2"></polygon>
                {/* Small Wave */}
                <path className="wave-1" d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                {/* Large Wave */}
                <path className="wave-2" d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
        </button>
    );
};

export default AudioButton;
