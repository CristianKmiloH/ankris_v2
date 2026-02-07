import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createNote } from '../../services/noteService';
import { useTranslation } from '../../i18n/useTranslation';
import Layout from '../layout/Layout';

type NoteType = 'BASIC' | 'BASIC_REVERSED' | 'BASIC_OPTIONAL_REVERSED' | 'BASIC_TYPE_ANSWER' | 'CLOZE';

interface MediaItem {
    type: 'image' | 'audio' | 'video';
    file: File;
    src: string; // Preview URL
    isNew: boolean;
}

const AddNote: React.FC = () => {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [noteType, setNoteType] = useState<NoteType>('BASIC');

    // Text State
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [addReverse, setAddReverse] = useState('');
    const [clozeText, setClozeText] = useState('');
    const [extra, setExtra] = useState('');
    const [selectedClozeText, setSelectedClozeText] = useState('');

    // Media State (Split to match EditCardModal)
    const [frontMedia, setFrontMedia] = useState<MediaItem[]>([]);
    const [backMedia, setBackMedia] = useState<MediaItem[]>([]);

    // Recording State
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [activeSide, setActiveSide] = useState<'front' | 'back' | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<number | null>(null);

    const [showSuccess, setShowSuccess] = useState(false);

    // --- Recording Logic (Ported from EditCardModal) ---
    const startRecording = async (side: 'front' | 'back') => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const audioFile = new File([audioBlob], `recording_${Date.now()}.webm`, { type: 'audio/webm' });

                const fileList = {
                    0: audioFile,
                    length: 1,
                    item: (index: number) => audioFile
                } as unknown as FileList;

                handleFileAdd(fileList, side);

                stream.getTracks().forEach(track => track.stop());
                setIsRecording(false);
                setRecordingTime(0);
                setActiveSide(null);
                if (timerRef.current) clearInterval(timerRef.current);
            };

            mediaRecorder.start();
            setIsRecording(true);
            setActiveSide(side);

            setRecordingTime(0);
            timerRef.current = window.setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

        } catch (error) {
            console.error("Error accessing microphone:", error);
            alert("Could not access microphone. Please check permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // --- Media Handling ---
    const handleFileAdd = (files: FileList | null, side: 'front' | 'back') => {
        if (!files) return;
        const newItems: MediaItem[] = Array.from(files).map(file => {
            const isImage = file.type.startsWith('image/');
            const isVideo = file.type.startsWith('video/');
            const type = isImage ? 'image' : isVideo ? 'video' : 'audio';
            return {
                type,
                file,
                src: URL.createObjectURL(file),
                isNew: true
            };
        });

        if (side === 'front') {
            setFrontMedia([...frontMedia, ...newItems]);
        } else {
            setBackMedia([...backMedia, ...newItems]);
        }
    };

    const removeMedia = (index: number, side: 'front' | 'back') => {
        if (side === 'front') setFrontMedia(frontMedia.filter((_, i) => i !== index));
        else setBackMedia(backMedia.filter((_, i) => i !== index));
    };

    // --- Submission ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (deckId) {
                let processedFront = '';
                let processedBack = '';

                if (noteType === 'CLOZE') {
                    processedFront = clozeText.replace(/\n/g, '<br>');
                    processedBack = extra.replace(/\n/g, '<br>');
                } else {
                    processedFront = front.replace(/\n/g, '<br>');
                    processedBack = back.replace(/\n/g, '<br>');
                }

                const frontFiles = frontMedia.map(m => m.file);
                const backFiles = backMedia.map(m => m.file);

                await createNote(
                    deckId,
                    processedFront,
                    processedBack,
                    noteType,
                    { front: frontFiles, back: backFiles },
                    { addReverse, extra }
                );

                setShowSuccess(true);
                setTimeout(() => navigate('/'), 1500);
            }
        } catch (err) {
            console.error(err);
            alert("Error saving note");
        }
    };

    // --- Render Helpers ---
    const insertCloze = () => {
        if (selectedClozeText) {
            const newText = clozeText.replace(selectedClozeText, `{{c1::${selectedClozeText}}}`);
            setClozeText(newText);
            setSelectedClozeText('');
        }
    };

    const renderField = (
        label: string,
        value: string,
        setValue: (val: string) => void,
        side: 'front' | 'back',
        placeholder: string,
        isClozeField = false
    ) => (
        <div style={styles.section}>
            <div style={styles.labelRow}>
                <label style={styles.label}>{label}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Recording Timer */}
                    {isRecording && activeSide === side && (
                        <span style={{
                            color: '#ef4444',
                            fontWeight: 'bold',
                            fontFamily: 'monospace',
                            fontSize: '0.9rem',
                            animation: 'pulse 1s infinite'
                        }}>
                            ● {formatTime(recordingTime)}
                        </span>
                    )}

                    {/* Circular Mic/Stop Button */}
                    <button
                        type="button"
                        onClick={() => isRecording && activeSide === side ? stopRecording() : startRecording(side)}
                        className={`btn-icon-reset btn-icon-circular size-40 ${isRecording && activeSide === side ? 'btn-recording-active' : 'btn-recording-red'}`}
                        disabled={isRecording && activeSide !== side}
                        title={isRecording ? "Stop Recording" : "Start Voice Recording"}
                    >
                        {isRecording && activeSide === side ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="6" y="6" width="12" height="12" rx="2" />
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                <line x1="12" y1="19" x2="12" y2="23"></line>
                                <line x1="8" y1="23" x2="16" y2="23"></line>
                            </svg>
                        )}
                    </button>

                    {/* Media Button */}
                    <label style={styles.uploadBtn}>
                        <span style={{ fontSize: '1.2em', marginRight: '4px' }}>+</span> Media
                        <input
                            type="file"
                            multiple
                            accept="image/*,video/*,audio/*"
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileAdd(e.target.files, side)}
                        />
                    </label>
                </div>
            </div>

            {/* Special Toolbar for Cloze */}
            {isClozeField && (
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <button
                        type="button"
                        onClick={insertCloze}
                        style={styles.clozeButton}
                        disabled={!selectedClozeText}
                    >
                        ✂️ [...] Make Cloze
                    </button>
                </div>
            )}

            <textarea
                style={styles.textArea}
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={placeholder}
                onSelect={(e) => {
                    if (isClozeField) {
                        const target = e.target as HTMLTextAreaElement;
                        const selection = target.value.substring(target.selectionStart, target.selectionEnd);
                        if (selection) setSelectedClozeText(selection);
                        else setSelectedClozeText('');
                    }
                }}
            />

            {/* Media Grid */}
            <div style={styles.mediaGrid}>
                {(side === 'front' ? frontMedia : backMedia).map((m, i) => (
                    <MediaPreview key={i} item={m} onRemove={() => removeMedia(i, side)} />
                ))}
            </div>
        </div>
    );

    const renderFieldsForType = () => {
        switch (noteType) {
            case 'CLOZE':
                return (
                    <>
                        {renderField(t('text') || 'Text', clozeText, setClozeText, 'front', "Type text for cloze deletion...", true)}
                        {renderField(t('extra') || 'Extra (Back)', extra, setExtra, 'back', "Extra info (shown after answer)...")}
                    </>
                );
            case 'BASIC_OPTIONAL_REVERSED':
                return (
                    <>
                        {renderField(t('front'), front, setFront, 'front', "Question...")}
                        {renderField(t('back'), back, setBack, 'back', "Answer...")}
                        <div style={styles.section}>
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
            default: // BASIC, etc.
                return (
                    <>
                        {renderField(t('front'), front, setFront, 'front', "Question...")}
                        {renderField(t('back'), back, setBack, 'back', "Answer...")}
                    </>
                );
        }
    };

    return (
        <Layout activeTab="library" className="fade-in" disableScroll={true}>
            <div style={styles.container}>
                {/* Fixed Header */}
                <div style={styles.header}>
                    <button onClick={() => navigate(-1)} style={styles.backButton}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div>
                        <h1 style={styles.pageTitle}>{t('addNote')}</h1>
                        <p style={styles.subtitle}>{t('createFlashcards') || 'CREATE NEW FLASHCARDS'}</p>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div style={styles.scrollContainer}>
                    <div style={styles.cardWrapper}>
                        <form onSubmit={handleSubmit} style={styles.formCard}>
                            {/* Note Type Selector */}
                            <div style={styles.section}>
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

                            {renderFieldsForType()}
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div style={styles.actionsFooter}>
                    <button onClick={() => navigate(-1)} className="btn-secondary" style={styles.cancelButton}>
                        {t('cancel')}
                    </button>
                    <button onClick={handleSubmit} style={styles.saveButton} className="btn-primary">
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

// --- Reusable Media Preview (Identical to EditCardModal) ---
const MediaPreview: React.FC<{ item: MediaItem, onRemove: () => void }> = ({ item, onRemove }) => {
    const isAudio = item.type === 'audio';

    return (
        <div style={isAudio ? styles.previewItemAudio : styles.previewItem}>
            {item.type === 'image' && <img src={item.src} style={styles.thumb} />}
            {item.type === 'video' && <video src={item.src} style={styles.thumb} />}
            {item.type === 'audio' && (
                <audio
                    controls
                    src={item.src}
                    style={{ width: '100%', height: '32px' }}
                />
            )}

            <button
                type="button"
                onClick={onRemove}
                className="btn-icon-reset btn-icon-circular btn-remove-media size-22"
                style={{
                    position: 'absolute',
                    top: isAudio ? '-8px' : '2px',
                    right: isAudio ? '-8px' : '2px',
                    zIndex: 20
                }}
            >
                <span style={{ marginTop: '-2px' }}>×</span>
            </button>
            {item.isNew && <span style={styles.newBadge}>NEW</span>}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    // Layout
    container: { display: 'flex', flexDirection: 'column', height: '100dvh', overflow: 'hidden', position: 'relative' },
    header: { display: 'flex', alignItems: 'center', gap: '20px', padding: '20px 24px', flexShrink: 0, zIndex: 10 },
    backButton: { width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
    pageTitle: { fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)', margin: 0, lineHeight: '1.1' },
    subtitle: { color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.1em', uppercase: 'true', marginTop: '6px' },

    // Content
    scrollContainer: { flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', width: '100%', padding: '10px 24px' },
    cardWrapper: { flex: 1, width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', margin: '0 auto' },
    formCard: { width: '100%', backgroundColor: 'var(--bg-card)', padding: '24px', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', flexDirection: 'column', gap: '24px' },

    // Inputs
    section: { display: 'flex', flexDirection: 'column', gap: '10px' },
    labelRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' },
    label: { color: 'var(--accent-cyan)', fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.9 },

    select: { width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '14px 16px', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' },
    input: { width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '14px 16px', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' },
    textArea: { width: '100%', minHeight: '120px', backgroundColor: '#151519', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', color: '#eee', padding: '16px', fontSize: '1rem', lineHeight: '1.6', resize: 'vertical', outline: 'none' },

    // Media & Buttons
    uploadBtn: { fontSize: '0.75rem', color: '#fff', cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.06)', padding: '6px 14px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', border: '1px solid rgba(255,255,255,0.05)' },

    mediaGrid: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '6px' },
    previewItem: { position: 'relative', width: '70px', height: '70px', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#2A2A30', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    previewItemAudio: { position: 'relative', width: '100%', height: 'auto', borderRadius: '24px', overflow: 'visible', backgroundColor: '#2A2A30', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8px' },

    thumb: { width: '100%', height: '100%', objectFit: 'cover' },
    newBadge: { position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(16, 185, 129, 0.9), rgba(16, 185, 129, 0.7))', color: '#fff', fontSize: '0.55rem', fontWeight: 'bold', textAlign: 'center', padding: '2px 0', backdropFilter: 'blur(2px)' },

    // Cloze
    clozeButton: { padding: '6px 12px', backgroundColor: 'rgba(0, 217, 255, 0.1)', border: '1px solid var(--accent-cyan)', borderRadius: '8px', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' },
    hint: { fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '-5px', fontStyle: 'italic' },

    // Footer
    actionsFooter: { display: 'flex', justifyContent: 'center', gap: '16px', padding: '16px 24px', paddingBottom: 'calc(16px + 72px)', flexShrink: 0, width: '100%', background: 'linear-gradient(to top, var(--bg-app) 90%, transparent)', zIndex: 20 },
    cancelButton: { minWidth: '120px' },
    saveButton: { cursor: 'pointer', minWidth: '160px' },

    // Success
    successOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(5px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s ease-out' },
    successContent: { backgroundColor: 'rgba(23, 23, 28, 0.95)', borderRadius: '24px', padding: '32px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', border: '1px solid rgba(255, 255, 255, 0.1)', transform: 'scale(0.9)', animation: 'popIn 0.3s forwards' },
    checkCircle: { width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--accent-green, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' },
    successText: { color: '#fff', fontSize: '1.5rem', fontWeight: '700', margin: 0 }
};

export default AddNote;
