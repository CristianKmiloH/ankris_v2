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
        let text = html;
        const media: MediaItem[] = [];

        // Extract Images: <img src="...">
        const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/g;
        let imgMatch;
        while ((imgMatch = imgRegex.exec(html)) !== null) {
            const fullTag = imgMatch[0];
            let src = imgMatch[1];

            // Fix relative paths for preview
            let previewSrc = src;
            if (!src.startsWith('http') && !src.startsWith('data:')) {
                previewSrc = `${MEDIA_BASE_URL}/${src}`;
            }

            media.push({
                type: 'image',
                src: previewSrc,
                originalTag: fullTag, // Keep full tag to preserve classes/styles if any
                isNew: false
            });
            text = text.replace(fullTag, ''); // Remove from text
        }

        // Extract Audio/Video: [sound:...]
        const soundRegex = /\[sound:(.*?)\]/g;
        let soundMatch;
        while ((soundMatch = soundRegex.exec(html)) !== null) {
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
            text = text.replace(fullTag, '');
        }

        // Clean up text (trim brs)
        text = text.replace(/^(<br\s*\/?>)+|(<br\s*\/?>)+$/gi, '').trim();

        return { text, media };
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

        <button onClick={onRemove} style={styles.removeBtn}>×</button>
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
        padding: '16px' // Reduce padding for small screens
    },
    modal: {
        backgroundColor: '#1E1E24',
        width: '100%', maxWidth: '440px', // Slightly narrower for better proportion
        maxHeight: '85vh',
        borderRadius: '28px', // More modern curve
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 80px -12px rgba(0, 0, 0, 0.9)',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden'
    },
    header: {
        padding: '24px 28px 16px', // Balanced padding
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'transparent' // Cleaner look without separator line
    },
    title: { margin: 0, color: '#fff', fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.02em' },
    closeBtn: {
        background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff',
        width: '36px', height: '36px', borderRadius: '50%', // Strict circle
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '20px', cursor: 'pointer', transition: 'all 0.2s',
        lineHeight: 1, padding: 0, flexShrink: 0
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
        position: 'relative', width: '64px', height: '64px',
        borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)',
        backgroundColor: '#000', boxShadow: '0 2px 5px rgba(0,0,0,0.4)'
    },
    thumb: { width: '100%', height: '100%', objectFit: 'cover' },
    audioThumb: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' },
    removeBtn: {
        position: 'absolute', top: 3, right: 3,
        width: '18px', height: '18px', borderRadius: '50%',
        backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)',
        color: '#ff4d4d', border: 'none', // Red tint for delete
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '14px', padding: 0,
        boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
    },
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
        flex: 1, fontWeight: '700', fontSize: '0.9rem', transition: 'background 0.2s'
    },
    saveBtn: {
        padding: '14px 0', borderRadius: '30px', border: 'none',
        backgroundColor: 'var(--accent-cyan)', color: '#09090b', fontWeight: '800', cursor: 'pointer',
        flex: 1, fontSize: '0.9rem', boxShadow: '0 8px 20px -6px rgba(var(--accent-cyan-rgb), 0.5)',
        letterSpacing: '0.03em'
    }
};

export default EditCardModal;
