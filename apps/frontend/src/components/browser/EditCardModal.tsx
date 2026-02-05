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

    useEffect(() => {
        // Parse Initial Content
        const parsedFront = parseContent(card.front);
        setFrontText(parsedFront.text);
        setFrontMedia(parsedFront.media);

        const parsedBack = parseContent(card.back);
        setBackText(parsedBack.text);
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
            let finalFront = frontText.replace(/\n/g, '<br>');
            const frontFiles: File[] = [];

            frontMedia.forEach(m => {
                if (m.isNew && m.file) {
                    frontFiles.push(m.file);
                    // Do NOT append tag here, backend does it
                } else if (!m.isNew && m.originalTag) {
                    finalFront += `<br>${m.originalTag}`;
                }
            });

            let finalBack = backText.replace(/\n/g, '<br>');
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
                    <button onClick={onClose} style={styles.closeBtn}>×</button>
                </div>

                <div style={styles.content}>
                    {/* FRONT */}
                    <div style={styles.section}>
                        <div style={styles.labelRow}>
                            <label style={styles.label}>{t('question')} (Front)</label>
                            <label style={styles.uploadBtn}>
                                📎 Add Media
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
                                📎 Add Media
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
        {item.type === 'audio' && <div style={styles.audioThumb}>🔊 Audio</div>}

        <button onClick={onRemove} style={styles.removeBtn}>×</button>
        {item.isNew && <span style={styles.newBadge}>NEW</span>}
    </div>
);

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px'
    },
    modal: {
        backgroundColor: '#1E1E24',
        width: '100%', maxWidth: '600px',
        maxHeight: '90vh',
        borderRadius: '16px',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.1)'
    },
    header: {
        padding: '16px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    },
    title: { margin: 0, color: '#fff' },
    closeBtn: { background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' },
    content: {
        padding: '24px',
        overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: '24px'
    },
    section: { display: 'flex', flexDirection: 'column', gap: '8px' },
    labelRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    label: { color: 'var(--accent-cyan)', fontWeight: 'bold', fontSize: '0.9rem' },
    uploadBtn: {
        fontSize: '0.8rem', color: '#fff', cursor: 'pointer',
        backgroundColor: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '4px'
    },
    textArea: {
        width: '100%', minHeight: '80px',
        backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px', color: '#fff', padding: '12px', fontSize: '1rem',
        resize: 'vertical'
    },
    mediaGrid: {
        display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '8px'
    },
    previewItem: {
        position: 'relative', width: '80px', height: '80px',
        borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)',
        backgroundColor: '#000'
    },
    thumb: { width: '100%', height: '100%', objectFit: 'cover' },
    audioThumb: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#aaa' },
    removeBtn: {
        position: 'absolute', top: 2, right: 2,
        width: '20px', height: '20px', borderRadius: '50%',
        backgroundColor: 'red', color: '#fff', border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '14px'
    },
    newBadge: {
        position: 'absolute', bottom: 2, right: 2,
        backgroundColor: '#10b981', color: '#fff', fontSize: '0.6rem',
        padding: '2px 4px', borderRadius: '4px'
    },
    footer: {
        padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', justifyContent: 'flex-end', gap: '12px'
    },
    cancelBtn: {
        padding: '10px 20px', borderRadius: '8px', border: 'none',
        backgroundColor: 'transparent', color: '#aaa', cursor: 'pointer'
    },
    saveBtn: {
        padding: '10px 24px', borderRadius: '8px', border: 'none',
        backgroundColor: 'var(--accent-cyan)', color: '#000', fontWeight: 'bold', cursor: 'pointer'
    }
};

export default EditCardModal;
