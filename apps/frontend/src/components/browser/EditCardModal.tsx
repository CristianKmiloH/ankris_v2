import React, { useState, useEffect } from 'react';
import type { Card } from '../../services/cardService';
import { useTranslation } from '../../i18n/useTranslation';
import { MEDIA_BASE_URL } from '../../config';

interface EditCardModalProps {
    card: Card;
    onClose: () => void;
    onSave: (id: string, front: string, back: string, newFiles?: { front?: File[], back?: File[] }) => Promise<void>;
}

interface MediaItem {
    type: 'image' | 'audio' | 'video';
    src: string; // URL string or Preview Blob URL
    originalTag?: string; // If existing media, this is the original HTML tag to reconstruct
    isNew: boolean;
    file?: File; // Only for new
}

const EditCardModal: React.FC<EditCardModalProps> = ({ card, onClose, onSave }) => {
    const { t } = useTranslation();
    const [frontText, setFrontText] = useState('');
    const [backText, setBackText] = useState('');
    const [frontMedia, setFrontMedia] = useState<MediaItem[]>([]);
    const [backMedia, setBackMedia] = useState<MediaItem[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    const htmlToText = (html: string) => {
        let text = html.replace(/<br\s*\/?>/gi, '\n');
        text = text.replace(/<[^>]+>/g, '');
        text = text.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        return text.trim();
    };

    const textToHtml = (text: string) => {
        return text.replace(/\n/g, '<br>');
    };

    useEffect(() => {
        // Parse Initial Content
        const parsedFront = parseContent(card.front);
        setFrontText(htmlToText(parsedFront.text));
        setFrontMedia(parsedFront.media);

        const parsedBack = parseContent(card.back);
        setBackText(htmlToText(parsedBack.text));
        setBackMedia(parsedBack.media);
    }, [card]);

    const parseContent = (html: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const media: MediaItem[] = [];

        // 1. Images
        const images = doc.querySelectorAll('img');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                let previewSrc = src;
                if (!src.startsWith('http') && !src.startsWith('data:')) {
                    previewSrc = `${MEDIA_BASE_URL}/${src}`;
                }

                // Construct the "Tag" that will be removed from text
                // Since we are parsing DOM, the easiest way to remove is to remove element from DOM and then get textContent of body
                media.push({
                    type: 'image',
                    src: previewSrc,
                    originalTag: img.outerHTML,
                    isNew: false
                });
                img.remove();
            }
        });

        // 2. Audio/Video
        // Legacy [sound:...] might be pure text, so we check text content?
        // Actually, htmlToText cleans text.
        // Let's first check for standard <audio> / <video> tags
        const audios = doc.querySelectorAll('audio');
        audios.forEach(audio => {
            const src = audio.getAttribute('src') || audio.querySelector('source')?.getAttribute('src');
            if (src) {
                // Ensure src is valid
                let previewSrc = src;
                if (!src.startsWith('http') && !src.startsWith('data:')) {
                    previewSrc = `${MEDIA_BASE_URL}/${src}`;
                }

                media.push({
                    type: 'audio',
                    src: previewSrc,
                    originalTag: audio.outerHTML,
                    isNew: false
                });
                audio.remove();
            }
        });

        // 3. Legacy [sound:...] check on the remaining HTML text content?
        // Actually, if it's text, it won't be in a tag.
        // But [sound:...] usually isn't parsed into a tag unless backend did it.
        // The previous regex was robust enough for [sound:...] text.
        // We can run regex on the innerHTML of body remaining?
        let remainingHtml = doc.body.innerHTML;

        const soundRegex = /\[sound:(.*?)\]/g;
        let soundMatch;
        while ((soundMatch = soundRegex.exec(remainingHtml)) !== null) {
            const fullTag = soundMatch[0];
            const filename = soundMatch[1];
            const isVideo = /\.(mp4|webm|mov)$/i.test(filename);

            let previewSrc = filename;
            if (!filename.startsWith('http')) {
                previewSrc = `${MEDIA_BASE_URL}/${filename}`;
            }

            media.push({
                type: isVideo ? 'video' : 'audio',
                src: previewSrc,
                originalTag: fullTag,
                isNew: false
            });
            remainingHtml = remainingHtml.replace(fullTag, '');
        }

        // Finally convert remaining HTML to clean text
        let text = remainingHtml.replace(/<br\s*\/?>/gi, '\n');
        text = text.replace(/<[^>]+>/g, '');
        text = text.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

        return { text: text.trim(), media };
    };

    const handleFileAdd = (files: FileList | null, side: 'front' | 'back') => {
        if (!files) return;
        const newItems: MediaItem[] = Array.from(files).map(file => {
            const isImage = file.type.startsWith('image/');
            const isVideo = file.type.startsWith('video/');
            const type = isImage ? 'image' : isVideo ? 'video' : 'audio';
            return {
                type,
                src: URL.createObjectURL(file), // Preview
                isNew: true,
                file: file
            };
        });

        if (side === 'front') {
            setFrontMedia([...frontMedia, ...newItems]);
        } else {
            setBackMedia([...backMedia, ...newItems]);
        }
    };

    const removeMedia = (index: number, side: 'front' | 'back') => {
        if (side === 'front') {
            setFrontMedia(frontMedia.filter((_, i) => i !== index));
        } else {
            setBackMedia(backMedia.filter((_, i) => i !== index));
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Reconstruct HTML for existing media ONLY
            // New media will be appended by Backend
            let finalFront = textToHtml(frontText);
            const frontFiles: File[] = [];

            frontMedia.forEach(m => {
                if (m.isNew && m.file) {
                    frontFiles.push(m.file);
                    // Do NOT append tag here, backend does it
                } else if (!m.isNew && m.originalTag) {
                    finalFront += `<br>${m.originalTag}`;
                }
            });

            let finalBack = textToHtml(backText);
            const backFiles: File[] = [];

            backMedia.forEach(m => {
                if (m.isNew && m.file) {
                    backFiles.push(m.file);
                } else if (!m.isNew && m.originalTag) {
                    finalBack += `<br>${m.originalTag}`;
                }
            });

            await onSave(card.id, finalFront, finalBack, { front: frontFiles, back: backFiles });
            onClose();
        } catch (error) {
            console.error(error);
            alert("Error saving card");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h3 style={styles.title}>{t('editCard') || 'Edit Card'} ✏️</h3>
                    <div style={{ display: 'flex' }}>
                        <button onClick={onClose} style={styles.closeBtn}>×</button>
                    </div>
                </div>

                <div style={styles.content}>
                    {/* FRONT */}
                    <div style={styles.section}>
                        <div style={styles.labelRow}>
                            <label style={styles.label}>{t('question')} (Front)</label>
                            <label style={styles.uploadBtn}>
                                <span style={{ fontSize: '1.2em', marginRight: '4px' }}>+</span> Media
                                <input
                                    type="file"
                                    multiple
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleFileAdd(e.target.files, 'front')}
                                />
                            </label>
                        </div>
                        <textarea
                            style={styles.textArea}
                            value={frontText}
                            onChange={e => setFrontText(e.target.value)}
                            placeholder="Enter text..."
                        />
                        {/* Media Grid */}
                        <div style={styles.mediaGrid}>
                            {frontMedia.map((m, i) => (
                                <MediaPreview key={i} item={m} onRemove={() => removeMedia(i, 'front')} />
                            ))}
                        </div>
                    </div>

                    {/* BACK */}
                    <div style={styles.section}>
                        <div style={styles.labelRow}>
                            <label style={styles.label}>{t('answer')} (Back)</label>
                            <label style={styles.uploadBtn}>
                                <span style={{ fontSize: '1.2em', marginRight: '4px' }}>+</span> Media
                                <input
                                    type="file"
                                    multiple
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleFileAdd(e.target.files, 'back')}
                                />
                            </label>
                        </div>
                        <textarea
                            style={styles.textArea}
                            value={backText}
                            onChange={e => setBackText(e.target.value)}
                            placeholder="Enter text..."
                        />
                        <div style={styles.mediaGrid}>
                            {backMedia.map((m, i) => (
                                <MediaPreview key={i} item={m} onRemove={() => removeMedia(i, 'back')} />
                            ))}
                        </div>
                    </div>
                </div>

                <div style={styles.footer}>
                    <button onClick={onClose} style={styles.cancelBtn}>{t('cancel')}</button>
                    <button onClick={handleSave} style={styles.saveBtn} disabled={isSaving}>
                        {isSaving ? 'Saving...' : t('save')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const MediaPreview: React.FC<{ item: MediaItem, onRemove: () => void }> = ({ item, onRemove }) => (
    <div style={styles.previewItem}>
        {item.type === 'image' && <img src={item.src} style={styles.thumb} />}
        {item.type === 'video' && <video src={item.src} style={styles.thumb} />}
        {item.type === 'audio' && <div style={styles.audioThumb}>🔊</div>}

        {/* Remove Button - Strictly Circular & High Contrast */}
        <button onClick={onRemove} className="btn-icon-reset btn-icon-circular btn-remove-media size-22" style={{ position: 'absolute', top: '2px', right: '2px', zIndex: 20 }}>
            <span style={{ marginTop: '-2px' }}>×</span>
        </button>
        {item.isNew && <span style={styles.newBadge}>NEW</span>}
    </div>
);

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px'
    },
    modal: {
        backgroundColor: '#1E1E24',
        width: '100%', maxWidth: '440px',
        maxHeight: '85vh',
        borderRadius: '28px',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 80px -12px rgba(0, 0, 0, 0.9)',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden'
    },
    header: {
        padding: '24px 28px 16px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'transparent'
    },
    title: { margin: 0, color: '#fff', fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.02em' },
    closeBtn: {
        background: 'rgba(255,255,255,0.1)',
        border: 'none', color: '#fff',
        width: '36px', height: '36px',
        minWidth: '36px', // Strict override
        minHeight: '36px',
        borderRadius: '50%', // Perfect circle
        padding: 0, // Remove global padding
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '20px', cursor: 'pointer', transition: 'all 0.2s',
        lineHeight: 1, flexShrink: 0,
        boxShadow: 'none', // Remove global shadow
        aspectRatio: '1'
    },
    content: {
        padding: '0 28px 28px',
        overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: '24px'
    },
    section: { display: 'flex', flexDirection: 'column', gap: '10px' },
    labelRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' },
    label: { color: 'var(--accent-cyan)', fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.9 },
    uploadBtn: {
        fontSize: '0.75rem', color: '#fff', cursor: 'pointer',
        backgroundColor: 'rgba(255,255,255,0.06)', padding: '6px 14px', borderRadius: '20px',
        display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', transition: 'background 0.2s',
        border: '1px solid rgba(255,255,255,0.05)'
    },
    textArea: {
        width: '100%', minHeight: '90px',
        backgroundColor: '#151519', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '18px', color: '#eee', padding: '16px', fontSize: '1rem',
        resize: 'vertical', lineHeight: '1.6', fontFamily: 'inherit',
        outline: 'none', transition: 'border-color 0.2s'
    },
    mediaGrid: {
        display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '6px'
    },
    previewItem: {
        position: 'relative', width: '70px', height: '70px',
        borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)',
        backgroundColor: '#2A2A30', // Lighter bg for visibility
        boxShadow: '0 2px 5px rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    thumb: { width: '100%', height: '100%', objectFit: 'cover' },
    audioThumb: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' },

    newBadge: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(16, 185, 129, 0.9), rgba(16, 185, 129, 0.7))',
        color: '#fff', fontSize: '0.55rem', fontWeight: 'bold',
        textAlign: 'center', padding: '2px 0', backdropFilter: 'blur(2px)'
    },
    footer: {
        padding: '20px 28px 28px',
        background: 'linear-gradient(to top, #1E1E24, rgba(30,30,36,0))',
        display: 'flex', justifyContent: 'space-between', gap: '12px'
    },
    cancelBtn: {
        padding: '14px 0', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(255,255,255,0.03)', color: '#ccc', cursor: 'pointer',
        flex: 1, fontWeight: '700', fontSize: '0.9rem', transition: 'background 0.2s',
        minWidth: 'auto' // Allow shrink
    },
    saveBtn: {
        padding: '14px 0', borderRadius: '30px', border: 'none',
        backgroundColor: 'var(--accent-cyan)', color: '#09090b', fontWeight: '800', cursor: 'pointer',
        flex: 1, fontSize: '0.9rem', boxShadow: '0 8px 20px -6px rgba(var(--accent-cyan-rgb), 0.5)',
        letterSpacing: '0.03em',
        minWidth: 'auto' // Allow shrink
    }
};

export default EditCardModal;
