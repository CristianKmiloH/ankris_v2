import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import { getDecks, createDeck, deleteDeck, importDeck, updateDeck, toggleFavorite, type Deck } from '../../services/deckService';
import GeneratorModal from '../ai/GeneratorModal';
import Layout from '../layout/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { motion, AnimatePresence, LayoutGroup, Reorder, useDragControls } from 'framer-motion';

interface AnkiWebResult {
    id: string;
    title: string;
    noteCount: number;
    repo?: string;
    stars?: number;
}

// Import Modal
import ErrorModal from '../common/ErrorModal';

const DeckList: React.FC = () => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [newDeckName, setNewDeckName] = useState('');
    const [isImporting, setIsImporting] = useState(false);
    const [ankiWebResults, setAnkiWebResults] = useState<AnkiWebResult[]>([]);
    const [isSearchingAnkiWeb, setIsSearchingAnkiWeb] = useState(false);
    const [ankiWebQuery, setAnkiWebQuery] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeFilterId, setActiveFilterId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [isImportHovered, setIsImportHovered] = useState(false);
    const [hoveredDeckId, setHoveredDeckId] = useState<string | null>(null); // Track hovered study button
    const [draggedDeckId, setDraggedDeckId] = useState<string | null>(null); // Track dragged deck for live reordering
    const searchInputRef = React.useRef<HTMLInputElement>(null);


    // Error Modal State
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorTitle, setErrorTitle] = useState('Error');

    const navigate = useNavigate();
    const { t } = useTranslation();

    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        loadDecks();
    }, []);

    const loadDecks = async () => {
        try {
            setFetchError(null);
            setIsLoading(true);
            const data = await getDecks();
            setDecks(data);
        } catch (err) {
            console.error(err);
            setFetchError('Failed to load decks. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newDeckName) return; // Fallback, native validation should catch this
        try {
            await createDeck(newDeckName);
            setNewDeckName('');
            loadDecks();
        } catch (err) {
            alert('Failed to create deck');
        }
    };

    const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
    const [showAiModal, setShowAiModal] = useState(false);

    const handleAiSuccess = () => {
        loadDecks();
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deckToDelete, setDeckToDelete] = useState<string | null>(null);

    const openDeleteModal = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Ensure we stop here
        console.log('Delete clicked for:', id);
        setDeckToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (deckToDelete) {
            try {
                await deleteDeck(deckToDelete);
                loadDecks();
                setShowDeleteModal(false);
                setDeckToDelete(null);
            } catch (error) {
                console.error("Failed to delete", error);
                alert("Failed to delete deck");
            }
        }
    };

    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    const handleToggleFavorite = async (e: React.MouseEvent, deck: Deck) => {
        e.stopPropagation();
        try {
            // Optimistic update
            const newStatus = !deck.isFavorite;
            setDecks(prev => prev.map(d => d.id === deck.id ? { ...d, isFavorite: newStatus } : d));

            await toggleFavorite(deck.id, newStatus);
        } catch (error) {
            console.error("Failed to toggle favorite", error);
            // Revert on failure
            loadDecks();
        }
    };


    // --- Edit Functionality ---
    const [showEditModal, setShowEditModal] = useState(false);
    const [deckToEdit, setDeckToEdit] = useState<Deck | null>(null);
    const [editName, setEditName] = useState('');

    const openEditModal = (deck: Deck, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDeckToEdit(deck);
        setEditName(deck.name);
        setShowEditModal(true);
    };

    const handleUpdateDeck = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!deckToEdit || !editName.trim()) return;

        try {
            await updateDeck(deckToEdit.id, editName);
            loadDecks();
            setShowEditModal(false);
            setDeckToEdit(null);
        } catch (error) {
            console.error("Failed to update", error);
            alert("Failed to update deck");
        }
    };

    // Import functionality
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Open the new Modal instead of direct click
    const handleImportClick = () => {
        setIsImportModalOpen(true);
    };

    // Helper to trigger the hidden input from within the modal
    // AnkiWeb Search Handler
    // Validation for search
    const handleAnkiWebSearch = async () => {
        if (!ankiWebQuery.trim()) {
            if (searchInputRef.current) {
                searchInputRef.current.setCustomValidity('Completa este campo');
                searchInputRef.current.reportValidity();
            }
            return;
        }

        setIsSearchingAnkiWeb(true);
        setHasSearched(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API_BASE_URL}/api/ankiweb/search?q=${encodeURIComponent(ankiWebQuery)}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAnkiWebResults(res.data);
        } catch (error) {
            console.error('Online search failed:', error);
            setAnkiWebResults([]);
        } finally {
            setIsSearchingAnkiWeb(false);
            setHasSearched(true);
        }
    };

    const handleClearSearch = () => {
        setAnkiWebQuery('');
        setAnkiWebResults([]);
        setIsSearchingAnkiWeb(false);
        setHasSearched(false);
    };

    const handleAnkiWebDownload = async (deckId: string) => {
        setIsImporting(true); // Re-use the importing loading screen
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_BASE_URL}/api/ankiweb/download`, { deckId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Refresh decks
            loadDecks();
            setIsImportModalOpen(false); // Close the modal
            setIsImporting(false);
            // Maybe show success toast
        } catch (error: any) {
            console.error(error);
            setIsImporting(false);

            const status = error.response?.status;
            const errCode = error.response?.data?.error;

            if (status === 422 && errCode === 'REPOSITORY_NOT_A_DECK') {
                setErrorTitle('⚠️ Archivo Incompatible');
                setErrorMessage('Este repositorio no es un mazo válido.\n\nEl archivo descargado no contiene "collection.anki2" ni archivos .apkg.\n\nAsegúrate de que el enlace de GitHub contenga un mazo de Anki exportado correctamente.');
                setErrorModalOpen(true);
            } else {
                setErrorTitle('Error de Descarga');
                setErrorMessage('No se pudo descargar el mazo.\nPor favor verifica tu conexión o intenta con otro enlace.');
                setErrorModalOpen(true);
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setIsImportModalOpen(false); // Close selection modal immediately
            setIsImporting(true); // Show loading modal

            // Basic UI feedback - could be improved with a spinner state
            const btn = document.querySelector('.anim-header-import') as HTMLButtonElement;
            if (btn) btn.disabled = true;

            await importDeck(file);
            // alert(t('success') || 'Success!'); // Remove alert that blocks UI
            await loadDecks();
        } catch (error: any) {
            alert(error.message || 'Import failed');
        } finally {
            setIsImporting(false);
            const btn = document.querySelector('.anim-header-import') as HTMLButtonElement;
            if (btn) btn.disabled = false;
            event.target.value = ''; // Reset input to allow same file selection again
        }
    };

    const HeaderButtons = () => (
        <div style={styles.headerButtons}>
            <button
                onClick={handleImportClick}
                className="btn-icon-round anim-header-import"
                title={t('importModalTitle') || "Import / Download"}
            >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ overflow: 'visible' }}>
                    <g className="arrow-group">
                        <path className="arrow-shaft" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v10" />
                        <path className="arrow-head" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12l-4 4 -4-4" />
                    </g>
                    <path className="icon-tray" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1" />
                </svg>
            </button>
            <button
                onClick={() => setIsSearchOpen(true)}
                className="btn-icon-round anim-header-search"
                title={t('searchDecks') || "Search Decks"}
                style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0.5) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
                    color: 'var(--accent-cyan)',
                }}
            >
                <svg className="glass-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>

            {/* Stats and Filter Column */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <button
                    onClick={() => navigate('/stats')}
                    className="btn-icon-round anim-header-stats"
                    title={t('statistics')}
                >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ overflow: 'visible' }}>
                        <path className="bar-1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z" />
                        <path className="bar-2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z" />
                        <path className="bar-3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 19V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                    </svg>
                </button>
                <FilterToggle />
            </div>
        </div>
    );

    const FilterToggle = () => (
        <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className="btn-icon-round"
            title={showFavoritesOnly ? "Show All Decks" : "Show Favorites Only"}
            style={{
                width: '54px',
                height: '54px',
                minWidth: '54px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: showFavoritesOnly
                    ? 'radial-gradient(circle at 50% 50%, rgba(255, 223, 0, 0.25) 0%, rgba(0, 0, 0, 0.4) 100%)'
                    : 'rgba(255,255,255,0.05)',
                border: showFavoritesOnly
                    ? '1px solid rgba(255, 215, 0, 0.5)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                color: showFavoritesOnly ? '#FFD700' : 'rgba(255, 255, 255, 0.4)',
                boxShadow: showFavoritesOnly
                    ? '0 0 10px rgba(255, 215, 0, 0.2)'
                    : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
            }}
        >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={showFavoritesOnly ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
        </button>
    );

    return (
        <Layout
            activeTab="home"
            title={t('myDecks')}
            subtitle={t('startJourney')}
            headerAction={
                <HeaderButtons />
            }
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <div style={styles.container}>
                {/* AI Generator Modal */}
                {showAiModal && selectedDeckId && (
                    <div style={styles.modalOverlay}>
                        <React.Suspense fallback={<div className="loading">Loading...</div>}>
                            <GeneratorModal
                                deckId={selectedDeckId}
                                onClose={() => setShowAiModal(false)}
                                onSuccess={handleAiSuccess}
                            />
                        </React.Suspense>
                    </div>
                )}

                {/* Initial Loading Modal */}
                {isLoading && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.loadingBox}>
                            <span className="loading" style={{ fontSize: '3rem' }}>⏳</span>
                            <p style={styles.loadingText}>{t('loadingDecks') || 'Cargando biblioteca...'}</p>
                        </div>
                    </div>
                )}

                {/* Import Loading Modal */}
                {/* Import Loading Modal MOVED TO BOTTOM */}

                {/* IMPORT & DOWNLOAD MODAL */}
                {isImportModalOpen && (
                    <div style={styles.modalOverlay} onClick={() => setIsImportModalOpen(false)}>
                        <div style={styles.importModalContent} onClick={(e) => e.stopPropagation()}>
                            <div style={styles.modalHeader}>
                                <h2 style={styles.modalTitle}>
                                    {t('importModalTitle') || 'Import / Download'}
                                </h2>
                            </div>

                            <div style={styles.importSectionsContainer}>
                                {/* Section 1: Local Import */}
                                {/* Section 1: Local Import */}
                                <div style={styles.importSection}>
                                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', textAlign: 'center', marginBottom: '15px', padding: '0 20px' }}>
                                        {t('importInstruction').split('https://ankiweb.net/shared/decks').map((part, index, array) => (
                                            <React.Fragment key={index}>
                                                {part}
                                                {index < array.length - 1 && (
                                                    <a href="https://ankiweb.net/shared/decks" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>
                                                        https://ankiweb.net/shared/decks
                                                    </a>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </p>
                                    <button
                                        onClick={triggerFileInput}
                                        className="btn-primary"
                                        onMouseEnter={() => setIsImportHovered(true)}
                                        onMouseLeave={() => setIsImportHovered(false)}
                                        style={{
                                            ...styles.importDeviceButton,
                                            background: 'linear-gradient(135deg, var(--accent-cyan), #00b8e6)', // Force distinct gradient
                                            border: '1px solid rgba(255,255,255,0.3)', // Visible border
                                            color: '#000000', // Black text for maximum visibility
                                            fontWeight: 'bold',
                                            textShadow: '0 1px 0 rgba(255,255,255,0.4)',
                                            boxShadow: isImportHovered
                                                ? '0 0 25px rgba(0, 217, 255, 0.6)' // Strong neon glow on hover
                                                : '0 10px 20px -5px rgba(0, 217, 255, 0.15)', // Reduced intensity base
                                            transition: 'all 0.3s ease', // Smooth transition
                                            transform: isImportHovered ? 'scale(1.02)' : 'scale(1)',
                                        }}
                                    >
                                        <span style={{ fontSize: '1.4rem', marginRight: '10px' }}>📂</span>
                                        {t('importApkg')}
                                    </button>
                                </div>

                                <div style={styles.divider}></div>

                                {/* Section 2: Online Search */}
                                <div style={styles.importSectionSpread}>
                                    <h3 style={styles.sectionTitle}>{t('searchOnline') || 'Search Online'}</h3>
                                    <div style={styles.onlineSearchBox}>
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            style={styles.onlineSearchInput}
                                            placeholder={t('searchPlaceholderOnline') || 'Search for decks...'}
                                            value={ankiWebQuery}
                                            onChange={(e) => {
                                                e.target.setCustomValidity(''); // Clear custom error immediately
                                                setAnkiWebQuery(e.target.value);
                                                setHasSearched(false); // Reset to "typing" state
                                            }}
                                            onKeyDown={(e) => e.key === 'Enter' && handleAnkiWebSearch()}
                                            required
                                        />
                                        {ankiWebQuery && (
                                            <button
                                                style={styles.clearButton}
                                                className="btn-orb-clear"
                                                onClick={handleClearSearch}
                                                title={t('clearSearch') || "Clear"}
                                            >
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                </svg>
                                            </button>
                                        )}
                                        <button
                                            style={{
                                                ...styles.onlineSearchButton,
                                                background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0.6) 100%)', // Brighter highlight
                                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                                boxShadow: '0 10px 20px rgba(0,0,0,0.5), inset 0 3px 6px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.3)', // Enhanced 3D depth
                                                color: 'var(--accent-cyan)',
                                            }}
                                            className="btn-orb-exact"
                                            onClick={handleAnkiWebSearch}
                                        >
                                            {/* Exact Reference Icon: Simple Circle + Stick */}
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="11" cy="11" r="8"></circle>
                                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                            </svg>
                                        </button>
                                    </div>
                                    <div style={styles.searchResultsContainer}>
                                        {isSearchingAnkiWeb ? (
                                            <div style={{ color: 'var(--text-primary)', textAlign: 'center', padding: '20px' }}>Loading...</div>
                                        ) : hasSearched && ankiWebResults.length === 0 ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', opacity: 0.7, color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>
                                                <p>{t('noResults') || 'No decks found'}</p>
                                                <a
                                                    href="https://ankiweb.net/shared/decks"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ color: 'var(--accent-cyan)', textDecoration: 'underline', fontSize: '0.9rem', marginTop: '8px' }}
                                                >
                                                    https://ankiweb.net/shared/decks
                                                </a>
                                            </div>
                                        ) : hasSearched && ankiWebResults.length > 0 ? (
                                            ankiWebResults.map(deck => (
                                                <div key={deck.id} style={styles.resultItem}>
                                                    <div style={styles.resultInfo}>
                                                        <div style={styles.resultTitle} title={deck.title}>{deck.title}</div>
                                                        <div style={styles.resultMeta}>
                                                            {deck.repo && `📦 ${deck.repo}`}
                                                            {deck.stars !== undefined && deck.stars > 0 && ` • ⭐ ${deck.stars}`}
                                                            {deck.noteCount > 0 && ` • ${deck.noteCount} cards`}
                                                        </div>
                                                    </div>
                                                    <button
                                                        style={styles.downloadButton}
                                                        onClick={() => handleAnkiWebDownload(deck.id)}
                                                    >
                                                        DOWNLOAD
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', opacity: 0.6, color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>
                                                <span style={{ fontSize: '2rem', marginBottom: '10px' }}>🔍</span>
                                                <p>{t('searchPrompt') || 'Type above to search AnkiWeb shared decks'}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Cancel Button - Outside the card */}
                        <button onClick={() => setIsImportModalOpen(false)} style={styles.cancelButtonOutside}>
                            {t('cancel')}
                        </button>
                    </div >
                )}

                {/* Fixed Create Section */}
                <div style={styles.fixedHeader}>
                    <form onSubmit={handleCreate} style={styles.createForm}>
                        <input
                            type="text"
                            value={newDeckName}
                            onChange={(e) => setNewDeckName(e.target.value)}
                            placeholder={t('deckName')}
                            style={styles.input}
                            required
                        />
                        <button type="submit" className="btn-primary" style={styles.createButton}>
                            {t('createDeck')}
                        </button>
                    </form>
                </div>

                {/* Scrollable Content */}
                <div style={styles.scrollableContent}>

                    {/* Active Filter Indicator - Floating Action Style */}
                    {activeFilterId && (
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            marginBottom: '16px',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            animation: 'fadeIn 0.3s ease'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: 'rgba(0, 242, 255, 0.1)',
                                padding: '6px 6px 6px 16px',
                                borderRadius: '99px',
                                border: '1px solid rgba(0, 242, 255, 0.3)'
                            }}>
                                <span style={{
                                    color: 'var(--accent-cyan)',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    maxWidth: '150px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {decks.find(d => d.id === activeFilterId)?.name}
                                </span>
                                <button
                                    onClick={() => setActiveFilterId(null)}
                                    className="btn-icon-round"
                                    style={{
                                        width: '28px',
                                        height: '28px',
                                        minWidth: '28px',
                                        background: 'rgba(0, 0, 0, 0.2)',
                                        color: '#fff',
                                        border: 'none',
                                        fontSize: '0.8rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer'
                                    }}
                                    title="Clear Filter"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}

                    <div style={styles.deckGrid}>
                        <Reorder.Group
                            axis="y"
                            values={decks}
                            onReorder={setDecks}
                            style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 600px)', gap: '20px', justifyContent: 'center', listStyle: 'none', padding: 0 }}
                        >
                            <AnimatePresence mode="popLayout">
                                {decks
                                    .filter(d => activeFilterId ? d.id === activeFilterId : true)
                                    .filter(d => showFavoritesOnly ? d.isFavorite : true)
                                    .map((deck) => (
                                        <DeckItem
                                            key={deck.id}
                                            deck={deck}
                                            activeFilterId={activeFilterId}
                                            showFavoritesOnly={showFavoritesOnly}
                                            t={t}
                                            navigate={navigate}
                                            styles={styles}
                                            hoveredDeckId={hoveredDeckId}
                                            setHoveredDeckId={setHoveredDeckId}
                                            handleToggleFavorite={handleToggleFavorite}
                                            openEditModal={openEditModal}
                                            openDeleteModal={openDeleteModal}
                                            setSelectedDeckId={setSelectedDeckId}
                                            setShowAiModal={setShowAiModal}
                                        />
                                    ))}
                            </AnimatePresence>
                        </Reorder.Group>
                    </div>
                </div>
                {fetchError && !isLoading && (
                    <div style={{
                        gridColumn: '1 / -1',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        padding: '40px', gap: '16px', color: '#ff4d4d', opacity: 0.8
                    }}>
                        <span style={{ fontSize: '2rem' }}>⚠️</span>
                        <p style={{ fontSize: '1.1rem', margin: 0 }}>{t('connectionError') || 'Connection Error'}</p>
                        <button
                            onClick={loadDecks}
                            className="btn-primary"
                            style={{ padding: '8px 24px', borderRadius: '20px', background: 'rgba(255,255,255,0.1)' }}
                        >
                            {t('retry') || 'Retry'}
                        </button>
                    </div>
                )}

                {!fetchError && decks.length === 0 && !isLoading && (
                    <div style={styles.emptyState}>
                        <p style={styles.emptyText}>{t('noDecksYet')}</p>
                    </div>
                )}
            </div>


            {/* Import Loading Modal (Placed here to be on top of others) */}
            {
                isImporting && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.loadingBox}>
                            <span className="loading" style={{ fontSize: '3rem' }}>⏳</span>
                            <p style={styles.loadingText}>{t('importing') || 'Importing Deck...'}</p>
                        </div>
                    </div>
                )
            }

            {/* Delete Confirmation Modal */}
            {
                showDeleteModal && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.deleteModal}>
                            <h3 style={styles.deleteTitle}>{t('deleteDeck')}?</h3>
                            <p style={styles.deleteMessage}>{t('deleteConfirm') || "¿Estás seguro de eliminar este mazo?"}</p>
                            <div style={styles.deleteActions}>
                                <button onClick={() => setShowDeleteModal(false)} style={styles.cancelButton}>
                                    {t('cancel')}
                                </button>
                                <button onClick={confirmDelete} style={styles.confirmButton}>
                                    {t('delete')}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Edit Deck Modal */}
            {
                showEditModal && (
                    <div style={styles.modalOverlay} onClick={() => setShowEditModal(false)}>
                        <div style={styles.searchModalContent} onClick={(e) => e.stopPropagation()}>
                            <div style={styles.searchHeader}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                                    {t('editDeck') || 'Editar Mazo'}
                                </h2>
                                <button onClick={() => setShowEditModal(false)} style={styles.closeSearch}>✕</button>
                            </div>

                            <form onSubmit={handleUpdateDeck} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t('deckName') || 'Nombre del Mazo'}</label>
                                    <input
                                        autoFocus
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        style={styles.searchInput} // Reuse input style
                                        placeholder="Nombre del mazo"
                                    />
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                    <button type="button" onClick={() => setShowEditModal(false)} style={styles.cancelButton}>
                                        {t('cancel')}
                                    </button>
                                    <button type="submit" className="btn-primary" style={{ ...styles.createButton, height: '40px', minWidth: '100px' }}>
                                        {t('save') || 'Guardar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {/* Search Modal - Premium Redesign */}
            {
                isSearchOpen && (
                    <div
                        className="glass-overlay"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 9999,
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(8px)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingTop: '100px', // Push down from top
                            animation: 'fadeIn 0.2s ease-out'
                        }}
                        onClick={() => setIsSearchOpen(false)}
                    >
                        <div
                            className="glass-panel"
                            style={{
                                width: '90%',
                                maxWidth: '500px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                padding: '24px',
                                borderRadius: '28px', // More rounded card look
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                transform: 'translateY(10px)',
                                animation: 'slideUp 0.3s ease-out'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 className="text-cyan" style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', letterSpacing: '0.5px' }}>
                                    {t('searchDecks') || 'Search Decks'}
                                </h2>
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="btn-icon-round"
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        minWidth: '36px', // Force circle
                                        padding: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'rgba(255,255,255,0.1)',
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>

                            <div style={{ position: 'relative', width: '100%' }}>
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder={t('searchPlaceholder') || "Type to filter..."}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '18px 24px',
                                        paddingLeft: '56px',
                                        borderRadius: '24px',
                                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        color: 'white',
                                        fontSize: '1.2rem',
                                        outline: 'none',
                                        boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)';
                                        e.target.style.borderColor = 'var(--accent-cyan)';
                                        e.target.style.boxShadow = '0 0 20px rgba(0, 242, 255, 0.2), inset 0 2px 5px rgba(0,0,0,0.2)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)';
                                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                        e.target.style.boxShadow = 'inset 0 4px 10px rgba(0,0,0,0.2)';
                                    }}
                                />
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    style={{
                                        position: 'absolute',
                                        left: '20px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--accent-cyan)', // Highlight icon
                                        pointerEvents: 'none',
                                        filter: 'drop-shadow(0 0 5px rgba(0, 242, 255, 0.5))'
                                    }}
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                                maxHeight: '300px',
                                overflowY: 'auto',
                                paddingRight: '4px' // Space for scrollbar
                            }}>
                                {decks.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                                    decks
                                        .filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map(deck => (
                                            <div
                                                key={deck.id}
                                                onClick={() => {
                                                    setActiveFilterId(deck.id);
                                                    setIsSearchOpen(false);
                                                    setSearchQuery('');
                                                }}
                                                className="search-item"
                                                style={{
                                                    padding: '16px',
                                                    borderRadius: '12px',
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    border: '1px solid transparent',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                                    e.currentTarget.style.borderColor = 'transparent';
                                                }}
                                            >
                                                <span style={{ fontWeight: '600', fontSize: '1rem' }}>{deck.name}</span>
                                                <span style={{
                                                    fontSize: '0.8rem',
                                                    background: 'rgba(255,255,255,0.1)',
                                                    padding: '4px 10px',
                                                    borderRadius: '99px',
                                                    color: 'rgba(255,255,255,0.7)'
                                                }}>{deck._count?.cards || 0}</span>
                                            </div>
                                        ))
                                ) : (
                                    <div style={{ padding: '40px', textAlign: 'center', opacity: 0.5 }}>
                                        No matching decks found
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Error Modal */}
            <ErrorModal
                isOpen={errorModalOpen}
                title={errorTitle}
                message={errorMessage}
                onClose={() => setErrorModalOpen(false)}
            />

        </Layout>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        height: 'auto', // FIXED: Was '100%' forcing full height expansion
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    fixedHeader: {
        flexShrink: 0,
        paddingBottom: '0px', // Zero spacing
    },
    scrollableContent: {
        flex: '0 1 auto', // Only take needed space, don't force expansion
        overflowY: 'auto',
        paddingBottom: '8px',
        // Hide scrollbar but keep functionality
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
    },
    headerButtons: {
        display: 'flex',
        gap: '12px',
    },
    createForm: {
        display: 'flex',
        flexWrap: 'wrap', // Allow wrapping on small screens
        gap: '8px',
        marginBottom: '16px', // Added vertical spacing
        backgroundColor: 'var(--bg-card)',
        padding: '6px',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        width: '100%', // Ensure it takes available width
    },
    input: {
        flex: '1 1 200px', // Allow shrink/grow but set base basis
        minWidth: '200px', // Force wrap if less than this
        padding: '12px 20px',
        borderRadius: '14px',
        border: 'none',
        backgroundColor: 'transparent',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        outline: 'none',
    },
    deckGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // Use auto-fit to expand single cards
        gap: '12px', // Comfortable gap
        paddingBottom: '120px',
        width: '100%',
    },
    deckCard: {
        transition: 'transform 0.2s',
        margin: 0,
        padding: '20px', // Increased padding to prevent text touching edges
        width: '100%',
        boxSizing: 'border-box',
    },
    deckHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start', // Align top for multiline titles
        marginBottom: '12px', // More breathing room
        minHeight: '42px',
    },
    deckTitle: {
        fontSize: '1.2rem', // Restored size
        fontWeight: 'bold',
        marginBottom: '4px',
        color: 'var(--text-primary)',
        lineHeight: '1.3',
        wordBreak: 'break-word', // prevent overflow
        paddingRight: '12px', // Space from trash icon
    },
    // Search Modal Styles
    importModalContent: {
        background: 'var(--bg-card)',
        padding: '20px', // Reduced from 24px
        borderRadius: '24px',
        width: '95%',
        maxWidth: '550px',
        flex: 1,
        height: 'auto',
        maxHeight: '85vh', // Slightly increased max-height allowance
        marginBottom: '4px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    },
    importSectionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px', // Reduced from 20px
        marginTop: '5px', // Reduced from 10px
        flex: 1,
        minHeight: 0,
        marginBottom: '10px', // Reduced from 15px
    },
    importSectionAuto: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        flex: '0 0 auto', // Don't grow
    },
    importSectionSpread: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        flex: 1, // Grow to fill space
        minHeight: 0,
        marginBottom: '10px', // Space above cancel button
    },
    divider: {
        height: '1px', // ensure horizontal divider
        width: '100%',
        background: 'var(--border-color)',
        flexShrink: 0,
    },
    importDeviceButton: {
        width: '100%',
        height: '56px', // Match Cancel Button Height
        flex: '0 0 auto',
        borderRadius: '28px', // Match Cancel Button Radius
        border: '1px solid rgba(255, 255, 255, 0.2)',
        background: 'rgba(20, 20, 20, 0.95)', // Match Cancel Button Background
        backdropFilter: 'blur(10px)',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0', // Gap handled by margin in icon
        padding: '0 20px',
        transition: 'all 0.3s ease',
        fontSize: '1rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        boxSizing: 'border-box',
    },
    onlineSearchBox: {
        display: 'flex',
        gap: '10px',
        flexShrink: 0,
    },
    onlineSearchInput: {
        flex: 1,
        // Match Orb Height (60px) for perfect alignment
        height: '60px',
        padding: '0 24px',
        borderRadius: '30px', /* Half of 60px */
        background: 'var(--bg-input-custom)', // Adaptive background
        border: '1px solid var(--border-glass)',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        outline: 'none',
        minWidth: 0,
        boxSizing: 'border-box',
        boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)', /* Softer inner depth */
    },
    onlineSearchButton: {
        // Layout props only - visual props via class
        width: '60px',
        height: '60px',
        minWidth: '60px', /* FORCE override of global min-width: 200px */
        maxWidth: '60px',
        flex: '0 0 60px',
        marginLeft: '12px',
        padding: 0,
        border: 'none',
        background: 'transparent', // Let CSS class handle it
    },
    clearButton: {
        width: '60px',
        height: '60px',
        minWidth: '60px', /* FORCE override of global min-width: 200px */
        maxWidth: '60px',
        flex: '0 0 60px',
        marginLeft: '12px',
        padding: 0,
        border: 'none',
        background: 'transparent',
    },
    searchResultsContainer: {
        flex: 1, // Fill remaining vertical space
        width: '100%', // FORCE strict width
        boxSizing: 'border-box', // Include padding in width
        overflowX: 'hidden', // Prevent horizontal scroll
        overflowY: 'auto',
        backgroundColor: 'var(--bg-result-container)',
        borderRadius: '12px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',

        /* Custom Scrollbar for results */
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--accent-cyan) var(--bg-dark)',
    },
    modalHeader: {
        marginBottom: '10px',
        textAlign: 'center',
    },
    modalTitle: {
        margin: 0,
        fontSize: '1.5rem',
        background: 'linear-gradient(to right, #00f2ff, #00c3ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    sectionTitle: {
        fontSize: '1.1rem',
        color: 'var(--text-secondary)',
        margin: 0,
    },
    resultItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px',
        backgroundColor: 'var(--bg-result-item)',
        borderRadius: '12px',
        gap: '10px',
        border: '1px solid var(--border-glass)',
        color: 'var(--text-primary)',
    },
    resultInfo: {
        flex: 1, // Take available space
        minWidth: 0, // Enable truncation
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '4px',
    },
    resultTitle: {
        color: 'var(--text-primary)',
        fontSize: '0.95rem',
        fontWeight: '600',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    resultMeta: {
        color: 'var(--text-secondary)',
        fontSize: '0.8rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    downloadButton: {
        padding: '8px 16px',
        borderRadius: '12px', // Slight rounding for smaller buttons
        background: 'rgba(0, 195, 255, 0.1)',
        border: '1px solid rgba(0, 195, 255, 0.3)',
        color: '#00f2ff',
        cursor: 'pointer',
        fontSize: '0.75rem',
        fontWeight: '700',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
    },

    deckCount: {
        color: 'var(--text-secondary)',
        fontSize: '0.85rem',
        fontWeight: '500',
    },
    createButton: {
        height: '50px',
        padding: '0 24px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '120px',
        flex: '0 0 auto',
        border: 'none', // Reset default
    },
    deckActions: {
        display: 'flex',
        gap: '10px',
        width: '100%',
        marginTop: 'auto', // Push to bottom if height varies
    },
    studyButton: {
        flex: 2,
        minWidth: '120px',
        height: '50px',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        flex: 1,
        minWidth: '50px',
        height: '50px',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        gridColumn: 'unset',
        border: 'none',
        color: 'var(--text-primary)', // Ensure icon is visible
    },

    magicButton: {
        flex: 1,
        minWidth: '50px',
        height: '50px',
        padding: 0,
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-inverse)', // Icon should be white on the gradient
        gridColumn: 'unset',
    },

    magicIcon: {
        fontSize: '1.1rem',
    },
    emptyState: {
        gridColumn: '1 / -1',
        padding: '30px 20px', // Reduced from 48px to prevent overflow
        textAlign: 'center',
        backgroundColor: 'var(--bg-card)',
        borderRadius: '24px',
        border: '1px dashed rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: 'var(--text-secondary)',
        fontSize: '1.125rem',
    },
    modalOverlay: {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(12px)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // Center vertically
        padding: '16px', // Standard padding
        paddingBottom: '24px', // Minimal bottom padding, effectively covering the nav area
        gap: '12px',
    },
    loadingBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        padding: '40px',
        backgroundColor: 'var(--bg-card)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
    },
    loadingText: {
        fontSize: '1.2rem',
        color: 'var(--text-primary)',
        fontWeight: 'bold',
    },
    editButton: {
        width: '42px',
        height: '42px',
        minWidth: 'unset',
        padding: 0,
        borderRadius: '21px', // Circle
        border: '1px solid rgba(0, 217, 255, 0.3)', // Cyan border using correct RGB
        backgroundColor: 'rgba(0, 217, 255, 0.05)',
        color: 'var(--accent-cyan)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    deleteButton: {
        width: '42px',
        height: '42px',
        minWidth: 'unset', // Override global button min-width
        padding: 0,
        borderRadius: '21px', // Circle
        border: '1px solid rgba(139, 46, 58, 0.3)', // Subtle red border
        backgroundColor: 'rgba(139, 46, 58, 0.1)',
        color: 'var(--accent-red)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        overflow: 'hidden', // Clip the neon glow to the circle
    },
    deleteModal: {
        backgroundColor: 'var(--bg-card)',
        padding: '24px',
        borderRadius: '24px',
        width: '90%',
        maxWidth: 'min(90%, 480px)', // Increased width + responsive cap
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    },
    deleteTitle: {
        margin: '0 0 12px 0',
        color: 'var(--text-primary)',
        fontSize: '1.25rem',
    },
    deleteMessage: {
        margin: '0 0 24px 0',
        color: 'var(--text-secondary)',
        fontSize: '1rem',
    },
    deleteActions: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        flexWrap: 'wrap', // Allow wrapping on small screens
    },
    cancelButtonOutside: {
        width: '95%', // Match card width roughly
        maxWidth: '550px',
        height: '56px',
        borderRadius: '28px',
        border: '1px solid var(--border-glass)',
        background: 'var(--bg-card-elevated)', // Adaptive background
        backdropFilter: 'blur(10px)',
        color: 'var(--text-primary)', // Adaptive text

        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        flexShrink: 0,
        marginTop: '0', // Handled by gap
        zIndex: 10000,
    },
    confirmButton: {
        padding: '10px 20px',
        borderRadius: '9999px',
        border: 'none',
        background: 'var(--accent-red)',
        color: 'white',
        cursor: 'pointer',
        fontWeight: '600',
    },

    // Restored Modal Styles (Edit/Search)
    searchModalContent: {
        backgroundColor: 'var(--bg-card)',
        padding: '24px',
        borderRadius: '24px',
        width: '90%',
        maxWidth: '400px', // Compact for Edit Modal
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
    },
    searchHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    closeSearch: {
        // defined as 'btn-icon-round' in CSS but overriding here for specific modal look
        background: 'linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderTop: '1px solid rgba(255, 255, 255, 0.4)', // Highlight top
        borderBottom: '1px solid rgba(0, 0, 0, 0.3)',    // Shadow bottom
        color: 'var(--text-primary)',
        width: '38px',
        height: '38px',
        minWidth: '38px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '1.2rem',
        padding: 0,
        transition: 'all 0.2s ease',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
    },
    searchInput: {
        width: '100%',
        padding: '16px',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        outline: 'none',
        boxSizing: 'border-box', // Ensure padding doesn't overflow
    },
    cancelButton: {
        padding: '12px 24px', // Taller hit area
        borderRadius: '24px', // Pill shape
        border: 'none',
        background: 'rgba(255, 255, 255, 0.1)', // Neutral gray background
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        minWidth: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },

};

// Extracted DeckItem Component for isolated drag controls
const DeckItem = ({
    deck,
    activeFilterId,
    showFavoritesOnly,
    t,
    navigate,
    styles,
    hoveredDeckId,
    setHoveredDeckId,
    handleToggleFavorite,
    openEditModal,
    openDeleteModal,
    setSelectedDeckId,
    setShowAiModal
}: {
    deck: any,
    activeFilterId: any,
    showFavoritesOnly: any,
    t: any,
    navigate: any,
    styles: any,
    hoveredDeckId: any,
    setHoveredDeckId: any,
    handleToggleFavorite: any,
    openEditModal: any,
    openDeleteModal: any,
    setSelectedDeckId: any,
    setShowAiModal: any
}) => {
    const dragControls = useDragControls();

    return (
        <Reorder.Item
            value={deck}
            dragListener={false} // Disable auto-drag
            dragControls={dragControls} // Manual control
            dragMomentum={false} // Prevents "slip" and jumping after release
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileDrag={{
                scale: 1.05, // Slightly larger lift
                zIndex: 100,
                boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
                backgroundColor: 'rgb(30, 30, 32)',
                opacity: 1,
                cursor: 'grabbing'
            }}
            transition={{
                layout: { duration: 0.28, ease: "easeOut" }, // Smooth, predictable slide. No spring snap.
                opacity: { duration: 0.2 }
            }}
            style={{
                ...styles.deckCard,
                // Cursor logic: if filtering, default. If not filtering, auto (handled by listeners)
                cursor: (!activeFilterId && !showFavoritesOnly) ? 'default' : 'default',
                position: 'relative',
                touchAction: 'none'
            }}
            className="card-large deck-item"
        >
            {/* Drag Handle Indicator (6 Dots - 3x2 Horizontal Grid) */}
            <div
                onPointerDown={(e) => {
                    // Check if drag is allowed (not filtering)
                    if (!activeFilterId && !showFavoritesOnly) {
                        dragControls.start(e);
                    }
                }}
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '0', // Larger hit area top
                    height: '35px', // Larger hit area height
                    width: '60px', // Larger hit area width
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: (!activeFilterId && !showFavoritesOnly) ? 'grab' : 'default',
                    zIndex: 20, // ensure top
                }}
            >
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '3px',
                    opacity: 0.4,
                    pointerEvents: 'none',
                }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.7)' }}></div>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.7)' }}></div>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.7)' }}></div>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.7)' }}></div>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.7)' }}></div>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.7)' }}></div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px', marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <p style={{
                        margin: 0,
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        {deck._count?.cards || 0} {deck._count?.cards === 1 ? t('cardCount') : t('cardsCount')}
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => handleToggleFavorite(e, deck)}
                            className="btn-icon-circular"
                            style={{
                                width: '32px', height: '32px', minWidth: '32px', padding: 0,
                                borderRadius: '50%',
                                background: deck.isFavorite ? 'rgba(255, 215, 0, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                                border: deck.isFavorite ? '1px solid rgba(255, 215, 0, 0.6)' : 'none',
                                color: deck.isFavorite ? '#FFD700' : 'rgba(255, 255, 255, 0.4)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                zIndex: 5
                            }}
                            title={deck.isFavorite ? t('removeFromFavorites' as any) : t('addToFavorites' as any)}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill={deck.isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                        </button>
                        <button
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => openEditModal(deck, e)}
                            className="anim-edit-blue btn-icon-circular"
                            title={t('editDeck') || 'Editar'}
                            style={{
                                ...styles.editButton,
                                width: '32px', height: '32px', minWidth: '32px', padding: 0,
                                borderColor: 'var(--accent-cyan)',
                                color: 'var(--accent-cyan)',
                                backgroundColor: 'rgba(0, 217, 255, 0.05)',
                                zIndex: 100, pointerEvents: 'auto',
                            }}
                        >
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" style={{ overflow: 'visible' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                        <button
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => openDeleteModal(deck.id, e)}
                            className="anim-trash btn-icon-circular"
                            title={t('deleteDeck')}
                            style={{
                                ...styles.deleteButton,
                                width: '32px', height: '32px', minWidth: '32px', padding: 0,
                                zIndex: 100, pointerEvents: 'auto',
                            }}
                        >
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" className="trash-icon" style={{ overflow: 'visible', pointerEvents: 'none' }}>
                                <defs>
                                    <radialGradient id={`trashLight-${deck.id}`} cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                                        <stop offset="0%" stopColor="#FFF" stopOpacity="0.9" />
                                        <stop offset="40%" stopColor="var(--accent-red)" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="var(--accent-red)" stopOpacity="0" />
                                    </radialGradient>
                                </defs>
                                <ellipse className="trash-glow" cx="12" cy="10" rx="4" ry="2" fill={`url(#trashLight-${deck.id})`} opacity="0" />
                                <path className="trash-can" fill="var(--bg-card)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7M10 11v6M14 11v6" />
                                <path className="trash-lid" fill="var(--bg-card)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                            </svg>
                        </button>
                    </div>
                </div>

                <h2 style={{
                    ...styles.deckTitle,
                    width: '100%',
                    display: 'block',
                    margin: 0,
                    fontSize: '1.5rem',
                    lineHeight: 1.2,
                    whiteSpace: 'normal',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }} title={deck.name}>
                    {deck.name}
                </h2>
            </div>

            <div style={styles.deckActions}>
                <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => navigate(`/decks/${deck.id}/study`)}
                    className="btn-easy"
                    onMouseEnter={() => setHoveredDeckId(deck.id)}
                    onMouseLeave={() => setHoveredDeckId(null)}
                    style={{
                        ...styles.studyButton,
                        background: 'linear-gradient(135deg, rgba(30, 80, 40, 0.9), rgba(20, 50, 25, 1))',
                        transition: 'all 0.3s ease',
                        transform: hoveredDeckId === deck.id ? 'scale(1.02)' : 'scale(1)',
                        boxShadow: hoveredDeckId === deck.id
                            ? '0 0 25px rgba(0, 255, 128, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)'
                            : '0 4px 15px rgba(0,0,0,0.3)'
                    }}
                >
                    {t('study')}
                </button>

                <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => { setSelectedDeckId(deck.id); setShowAiModal(true); }}
                    style={styles.magicButton}
                    className="magic-button"
                    title={t('generateWithAI')}
                >
                    <svg className="magic-icon" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                        <path className="star-1" d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
                        <path className="star-2" d="M18 2L19 6L23 7L19 8L18 12L17 8L13 7L17 6L18 2Z" />
                        <path className="star-3" d="M6 16L7 19L10 20L7 21L6 24L5 21L2 20L5 19L6 16Z" />
                    </svg>
                </button>

                <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/decks/${deck.id}/add`);
                    }}
                    className="btn-glass"
                    style={{
                        ...styles.magicButton,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: 'none'
                    }}
                    title={t('addCards')}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" style={{ color: 'var(--text-inverse)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
        </Reorder.Item>
    );
};

export default DeckList;
