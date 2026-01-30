import fs from 'fs';
import path from 'path';

// PERSISTENT STORE
const BACKEND_ROOT = path.resolve(__dirname, '../../../');
const DATA_DIR = path.join(BACKEND_ROOT, 'data');
const DECKS_FILE = path.join(DATA_DIR, 'decks.json');

const loadDecks = (): Deck[] => {
    if (!fs.existsSync(DECKS_FILE)) return [];
    try {
        const data = JSON.parse(fs.readFileSync(DECKS_FILE, 'utf-8'));
        // Restore Date objects
        return data.map((d: any) => ({
            ...d,
            createdAt: new Date(d.createdAt),
            updatedAt: new Date(d.updatedAt)
        }));
    } catch { return []; }
};

const saveDecks = (decks: Deck[]) => {
    try {
        if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
        fs.writeFileSync(DECKS_FILE, JSON.stringify(decks, null, 2));
    } catch (e) {
        console.error("Failed to save decks", e);
    }
};

interface Deck {
    id: string;
    userId: string;
    name: string;
    description?: string;
    parentId?: string;
    createdAt: Date;
    updatedAt: Date;
    _count?: { cards: number };
    children?: Deck[];
    cards?: any[];
}

export const createDeck = async (userId: string, name: string, description?: string, parentId?: string) => {
    const decks = loadDecks();
    const newDeck: Deck = {
        id: Math.random().toString(36).substring(7),
        userId,
        name,
        description,
        parentId,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    decks.push(newDeck);
    saveDecks(decks);
    return newDeck;
};


import { countCardsByDeckId, deleteCardsByDeckId } from '../cards/card.service';

export const getDecks = async (userId: string) => {
    const decks = loadDecks();
    return decks
        .filter(d => d.userId === userId)
        .map(d => ({
            ...d,
            _count: { cards: countCardsByDeckId(d.id) }
        }));
};

export const getDeckById = async (userId: string, deckId: string) => {
    const decks = loadDecks();
    const deck = decks.find(d => d.id === deckId && d.userId === userId);
    return deck || null;
};

export const deleteDeck = async (userId: string, deckId: string) => {
    console.log(`[SERVICE] Attempting DELETE deckId: ${deckId} for userId: ${userId}`);
    const decks = loadDecks();
    const index = decks.findIndex(d => d.id === deckId && d.userId === userId);
    console.log(`[SERVICE] Found index: ${index}`);
    if (index !== -1) {
        // Prevent Zombie Cards: Delete all cards belonging to this deck
        deleteCardsByDeckId(deckId);

        decks.splice(index, 1);
        saveDecks(decks);
        return true;
    }
    return false;
};

export const updateDeck = async (userId: string, deckId: string, name: string, description?: string) => {
    const decks = loadDecks();
    const index = decks.findIndex(d => d.id === deckId && d.userId === userId);
    if (index !== -1) {
        decks[index].name = name;
        if (description !== undefined) decks[index].description = description;
        decks[index].updatedAt = new Date();
        saveDecks(decks);
        return decks[index];
    }
    return null;
};
