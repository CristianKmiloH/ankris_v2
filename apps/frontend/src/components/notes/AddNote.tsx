import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createNote } from '../../services/noteService';
import { useTranslation } from '../../i18n/useTranslation';
import Layout from '../layout/Layout';

type NoteType = 'BASIC' | 'BASIC_REVERSED' | 'BASIC_OPTIONAL_REVERSED' | 'BASIC_TYPE_ANSWER' | 'CLOZE';

interface MediaItem {
    type: 'image' | 'audio' | 'video';
    file: File;
    preview: string;
    target: 'front' | 'back'; // New field
}

const AddNote: React.FC = () => {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [noteType, setNoteType] = useState<NoteType>('BASIC');
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [addReverse, setAddReverse] = useState('');
    const [clozeText, setClozeText] = useState('');
    const [extra, setExtra] = useState('');

    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedClozeText, setSelectedClozeText] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (deckId) {
                let processedFront = '';
                let processedBack = '';

                // Build content based on note type
                if (noteType === 'CLOZE') {
                    processedFront = clozeText.replace(/\n/g, '<br>');
                    processedBack = extra.replace(/\n/g, '<br>');
                } else {
                    processedFront = front.replace(/\n/g, '<br>');
                    processedBack = back.replace(/\n/g, '<br>');
                }

                // Split media items
                // Split media items
                const frontFiles = mediaItems.filter(m => m.target === 'front').map(m => m.file);
                const backFiles = mediaItems.filter(m => m.target === 'back').map(m => m.file);

                await createNote(
                    deckId,
                    processedFront,
                    processedBack,
                    noteType,
                    { front: frontFiles, back: backFiles },
                    {
                        addReverse,
                        extra
                    }
                );

                setShowSuccess(true);
                setTimeout(() => navigate('/'), 1500);
            }
        } catch (err) {
            console.error(err);
            alert("Error saving note"); // Feedback on error
        }
    };

    const handleMediaUpload = (type: 'image' | 'audio' | 'video') => {
        const input = document.createElement('input');
        input.type = 'file';

        if (type === 'image') input.accept = 'image/*';
        if (type === 'audio') input.accept = 'audio/*';
        if (type === 'video') input.accept = 'video/*';

        input.onchange = (e: any) => {
            const file = e.target?.files?.[0];
            if (file) {
                const preview = URL.createObjectURL(file);
                // Default to 'back' as answers usually have the media, or front if it's a "Show this image" question.
                // Let's default to BACK as requested implicitly by Anki usage patterns, but user can toggle.
                setMediaItems([...mediaItems, { type, file, preview, target: 'back' }]);
            }
        };
        input.click();
    };

    const removeMedia = (index: number) => {
        setMediaItems(mediaItems.filter((_, i) => i !== index));
    };

    const toggleMediaTarget = (index: number) => {
        const newItems = [...mediaItems];
        newItems[index].target = newItems[index].target === 'front' ? 'back' : 'front';
        setMediaItems(newItems);
    };

    const insertCloze = () => {
        if (selectedClozeText) {
            const newText = clozeText.replace(
                selectedClozeText,
                `{{c1::${selectedClozeText}}}`
            );
            setClozeText(newText);
            setSelectedClozeText('');
        }
    };

    const renderFieldsForType = () => {
        switch (noteType) {
            case 'CLOZE':
                return (
                    <>
                        <div style={styles.fieldGroup}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <label style={styles.label}>{t('text') || 'Text'}</label>
                                {/* Removed inline button to avoid overlap */}
                            </div>

                            {/* Toolbar for Cloze */}
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                                <button
                                    type="button"
                                    onClick={insertCloze}
                                    style={styles.clozeButton}
                                    title="Wrap selected text in cloze deletion"
                                    disabled={!selectedClozeText}
                                >
                                    ✂️ [...] Make Cloze
                                </button>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                                    {selectedClozeText ? `Selected: "${selectedClozeText.substring(0, 15)}..."` : 'Select text below'}
                                </span>
                            </div>

                            <textarea
                                style={styles.textArea}
                                value={clozeText}
                                onChange={e => {
                                    setClozeText(e.target.value);
                                    // Monitor selection on change/mouseup/keyup ideally, but here simplicity
                                }}
                                onSelect={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    const selection = target.value.substring(target.selectionStart, target.selectionEnd);
                                    if (selection) setSelectedClozeText(selection);
                                    else setSelectedClozeText('');
                                }}
                                placeholder="Type text here. Select text then click Make Cloze button above."
                            />
                            <p style={styles.hint}>💡 Example: The capital of France is {{ c1::Paris}}.</p>
                        </div>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>{t('extra') || 'Extra (Optional)'}</label>
                            <textarea
                                style={{ ...styles.textArea, flex: 0.5 }}
                                value={extra}
                                onChange={e => setExtra(e.target.value)}
                                placeholder="Additional info..."
                            />
                        </div>
                    </>
                );

            case 'BASIC_OPTIONAL_REVERSED':
                return (
                    <>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>{t('front')}</label>
                            <textarea
                                style={styles.textArea}
                                value={front}
                                onChange={e => setFront(e.target.value)}
                                placeholder="Question..."
                            />
                        </div>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>{t('back')}</label>
                            <textarea
                                style={styles.textArea}
                                value={back}
                                onChange={e => setBack(e.target.value)}
                                placeholder="Answer..."
                            />
                        </div>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Add Reverse?</label>
                            <input
                                style={styles.input}
                                value={addReverse}
                                onChange={e => setAddReverse(e.target.value)}
                                placeholder="Type anything to enable reverse card"
                            />
                            <p style={styles.hint}>💡 Leave empty for 1 card, fill for 2 cards</p>
                        </div>
                    </>
                );

            default:
                return (
                    <>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>{t('front')}</label>
                            <textarea
                                style={styles.textArea}
                                value={front}
                                onChange={e => setFront(e.target.value)}
                                placeholder="Question..."
                            />
                        </div>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>{t('back')}</label>
                            <textarea
                                style={styles.textArea}
                                value={back}
                                onChange={e => setBack(e.target.value)}
                                placeholder="Answer..."
                            />
                        </div>
                    </>
                );
        }
    };

    return (
        <Layout activeTab="library" className="fade-in" disableScroll={true}>
            <div style={styles.container}>
                {/* Fixed Header */}
                <div style={styles.header}>
                    <button
                        onClick={() => navigate(-1)}
                        style={styles.backButton}
                        title={t('back') || 'Go Back'}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div>
                        <h1 style={styles.pageTitle}>{t('addNote')}</h1>
                        <p style={styles.subtitle}>{t('createFlashcards') || 'CREATE NEW FLASHCARDS'}</p>
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div style={styles.scrollContainer}>
                    <div style={styles.cardWrapper}>
                        <form onSubmit={handleSubmit} style={styles.formCard}>
                            {/* Note Type Selector */}
                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>📝 Note Type</label>
                                <select
                                    style={styles.select}
                                    value={noteType}
                                    onChange={e => setNoteType(e.target.value as NoteType)}
                                >
                                    <option value="BASIC">Basic (Front → Back)</option>
                                    <option value="BASIC_REVERSED">Basic + Reversed</option>
                                    <option value="BASIC_OPTIONAL_REVERSED">Basic (Optional Reverse)</option>
                                    <option value="BASIC_TYPE_ANSWER">Type Answer</option>
                                    <option value="CLOZE">Cloze (Fill in the blank)</option>
                                </select>
                            </div>

                            {/* Dynamic Fields */}
                            {renderFieldsForType()}

                            {/* Media Upload Buttons */}
                            <div style={styles.mediaSection}>
                                <label style={styles.label}>🎨 Add Media</label>
                                <div style={styles.mediaButtons}>
                                    <button
                                        type="button"
                                        onClick={() => handleMediaUpload('image')}
                                        style={styles.mediaBtn}
                                        className="btn-glass"
                                    >
                                        🖼️ Image
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleMediaUpload('audio')}
                                        style={styles.mediaBtn}
                                        className="btn-glass"
                                    >
                                        🔊 Audio
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleMediaUpload('video')}
                                        style={styles.mediaBtn}
                                        className="btn-glass"
                                    >
                                        🎥 Video
                                    </button>
                                </div>

                                {/* Media Preview */}
                                {mediaItems.length > 0 && (
                                    <div style={styles.mediaPreview}>
                                        {mediaItems.map((item, i) => (
                                            <div key={i} style={{ ...styles.mediaItem, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {/* content */}
                                                <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                                                    {item.type === 'image' && <img src={item.preview} alt="preview" style={styles.previewImg} />}
                                                    {item.type === 'audio' && <audio src={item.preview} controls style={styles.previewAudio} />}
                                                    {item.type === 'video' && <video src={item.preview} controls style={styles.previewVideo} />}

                                                    <button
                                                        type="button"
                                                        onClick={() => removeMedia(i)}
                                                        style={styles.removeBtn}
                                                    >
                                                        ×
                                                    </button>
                                                </div>

                                                {/* Toggle Badge - Relative Position Below */}
                                                <button
                                                    type="button"
                                                    onClick={() => toggleMediaTarget(i)}
                                                    style={{
                                                        width: '100%',
                                                        background: item.target === 'front' ? 'var(--accent-cyan)' : 'var(--accent-purple)',
                                                        color: '#000',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        padding: '6px 8px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 'bold',
                                                        cursor: 'pointer',
                                                        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px'
                                                    }}
                                                >
                                                    {item.target === 'front' ? 'Position: FRONT' : 'Position: BACK'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Fixed Footer Actions */}
                <div style={styles.actionsFooter}>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn-secondary"
                        style={styles.cancelButton}
                    >
                        {t('cancel')}
                    </button>
                    <button
                        onClick={handleSubmit}
                        style={styles.saveButton}
                        className="btn-primary"
                    >
                        {t('save')}
                    </button>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div style={styles.successOverlay}>
                    <div style={styles.successContent}>
                        <div style={styles.checkCircle}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h3 style={styles.successText}>{t('saved') || 'Guardado'}</h3>
                    </div>
                </div>
            )}
        </Layout>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        overflow: 'hidden',
        position: 'relative',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '20px 24px',
        flexShrink: 0,
        zIndex: 10,
    },
    backButton: {
        width: '48px',
        height: '48px',
        minWidth: '48px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'var(--text-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
        backdropFilter: 'blur(5px)',
        padding: 0,
    },
    pageTitle: {
        fontSize: '2rem',
        fontWeight: '900',
        color: 'var(--text-primary)',
        margin: 0,
        lineHeight: '1.1',
        letterSpacing: '-0.02em',
        textShadow: '0 0 20px rgba(0, 217, 255, 0.2)',
    },
    subtitle: {
        color: 'var(--accent-cyan)',
        fontSize: '0.85rem',
        fontWeight: '700',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginTop: '6px',
    },
    scrollContainer: {
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '10px 24px',
    },
    cardWrapper: {
        flex: 1,
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        minHeight: 0,
    },
    formCard: {
        width: '100%',
        backgroundColor: 'var(--bg-card)',
        padding: '24px',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    fieldGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    label: {
        color: 'var(--text-secondary)',
        fontSize: '0.95rem',
        fontWeight: '600',
        marginLeft: '4px',
    },
    select: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '14px 16px',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        outline: 'none',
        transition: 'all 0.2s',
        cursor: 'pointer',
    },
    input: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '14px 16px',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        outline: 'none',
        transition: 'all 0.2s',
    },
    textArea: {
        width: '100%',
        minHeight: '120px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '16px',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        lineHeight: '1.5',
        resize: 'vertical',
        outline: 'none',
        transition: 'all 0.2s',
    },
    hint: {
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        marginTop: '-5px',
        fontStyle: 'italic',
    },
    clozeButton: {
        padding: '6px 12px',
        backgroundColor: 'rgba(0, 217, 255, 0.1)',
        border: '1px solid var(--accent-cyan)',
        borderRadius: '8px',
        color: 'var(--accent-cyan)',
        fontSize: '0.85rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    mediaSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    mediaButtons: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
    },
    mediaBtn: {
        flex: 1,
        minWidth: '100px',
        padding: '12px 16px',
        fontSize: '0.9rem',
        fontWeight: '600',
    },
    mediaPreview: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        marginTop: '12px',
        padding: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '12px',
    },
    mediaItem: {
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '2px solid rgba(0, 217, 255, 0.3)',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: '4px',
    },
    previewImg: {
        width: '120px',
        height: '120px',
        objectFit: 'cover',
        borderRadius: '8px',
        display: 'block',
    },
    previewAudio: {
        width: '250px',
        height: '40px',
        borderRadius: '8px',
    },
    previewVideo: {
        width: '220px',
        height: '165px',
        borderRadius: '8px',
        display: 'block',
    },
    removeBtn: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        width: '28px',
        height: '28px',
        minWidth: '28px',
        minHeight: '28px',
        borderRadius: '50%',
        backgroundColor: 'rgba(220, 38, 38, 0.9)',
        border: '2px solid white',
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        transition: 'all 0.2s',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        aspectRatio: '1 / 1',
        flexShrink: 0,
    },
    actionsFooter: {
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        padding: '16px 24px',
        paddingBottom: 'calc(16px + 72px)',
        flexShrink: 0,
        width: '100%',
        background: 'linear-gradient(to top, var(--bg-app) 90%, transparent)',
        zIndex: 20,
    },
    cancelButton: {
        minWidth: '120px',
    },
    saveButton: {
        cursor: 'pointer',
        minWidth: '160px',
    },
    successOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(5px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.2s ease-out',
    },
    successContent: {
        backgroundColor: 'rgba(23, 23, 28, 0.95)',
        borderRadius: '24px',
        padding: '32px 48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        transform: 'scale(0.9)',
        animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
    },
    checkCircle: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'var(--accent-green, #10b981)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
    },
    successText: {
        color: '#fff',
        fontSize: '1.5rem',
        fontWeight: '700',
        margin: 0,
    }
};

export default AddNote;
