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
        padding: '20px'
    },
    modal: {
        backgroundColor: '#1E1E24',
        width: '100%', maxWidth: '500px',
        maxHeight: '90vh',
        borderRadius: '24px',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden'
    },
    header: {
        padding: '20px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(255,255,255,0.02)'
    },
    title: { margin: 0, color: '#fff', fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.025em' },
    closeBtn: {
        background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
        width: '32px', height: '32px', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '18px', cursor: 'pointer', transition: 'all 0.2s',
        lineHeight: 1
    },
    content: {
        padding: '24px',
        overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: '24px'
    },
    section: { display: 'flex', flexDirection: 'column', gap: '8px' },
    labelRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' },
    label: { color: 'var(--accent-cyan)', fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9 },
    uploadBtn: {
        fontSize: '0.8rem', color: '#fff', cursor: 'pointer',
        backgroundColor: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px',
        display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500', transition: 'background 0.2s'
    },
    textArea: {
        width: '100%', minHeight: '100px',
        backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px', color: '#eee', padding: '16px', fontSize: '1rem',
        resize: 'vertical', lineHeight: '1.6', fontFamily: 'inherit',
        outline: 'none', transition: 'border-color 0.2s'
    },
    mediaGrid: {
        display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '4px'
    },
    previewItem: {
        position: 'relative', width: '70px', height: '70px',
        borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)',
        backgroundColor: '#111', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
    },
    thumb: { width: '100%', height: '100%', objectFit: 'cover' },
    audioThumb: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' },
    removeBtn: {
        position: 'absolute', top: 4, right: 4,
        width: '20px', height: '20px', borderRadius: '50%',
        backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
        color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px', padding: 0
    },
    newBadge: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: '#10b981', color: '#000', fontSize: '0.6rem', fontWeight: 'bold',
        textAlign: 'center', padding: '2px 0'
    },
    footer: {
        padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.02)',
        display: 'flex', justifyContent: 'space-between', gap: '16px'
    },
    cancelBtn: {
        padding: '12px 0', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)',
        backgroundColor: 'transparent', color: '#ccc', cursor: 'pointer',
        flex: 1, fontWeight: '600', fontSize: '0.95rem', transition: 'background 0.2s'
    },
    saveBtn: {
        padding: '12px 0', borderRadius: '12px', border: 'none',
        backgroundColor: 'var(--accent-cyan)', color: '#000', fontWeight: '700', cursor: 'pointer',
        flex: 1, fontSize: '0.95rem', boxShadow: '0 0 15px rgba(var(--accent-cyan-rgb), 0.3)'
    }
};

export default EditCardModal;
