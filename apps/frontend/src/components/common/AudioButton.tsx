import React, { useState, useRef, useEffect } from 'react';
import { MEDIA_BASE_URL } from '../../config';

interface AudioButtonProps {
    filename?: string;
    src?: string;
    className?: string;
    style?: React.CSSProperties;
    size?: number;
}

const AudioButton: React.FC<AudioButtonProps> = ({ filename, src, className = '', style, size }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Construct the full source URL reliably
    const audioSrc = src || (filename ? `${MEDIA_BASE_URL}/${filename}` : '');

    useEffect(() => {
        if (!audioSrc) return;

        const audio = new Audio(audioSrc);
        audioRef.current = audio;

        // Explicit handlers for each state
        const onPlay = () => setIsPlaying(true);
        const onStop = () => setIsPlaying(false); // Handles pause, ended, error

        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onStop);
        audio.addEventListener('ended', onStop);
        audio.addEventListener('error', onStop);

        // Cleanup
        return () => {
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onStop);
            audio.removeEventListener('ended', onStop);
            audio.removeEventListener('error', onStop);
            audio.pause();
            audioRef.current = null;
        };
    }, [audioSrc]);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        const audio = audioRef.current;

        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            audio.currentTime = 0;
        } else {
            // Reset logic in case it was finished
            if (audio.ended) audio.currentTime = 0;

            audio.play().catch(err => {
                console.error("Play failed:", err);
                setIsPlaying(false);
            });
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
