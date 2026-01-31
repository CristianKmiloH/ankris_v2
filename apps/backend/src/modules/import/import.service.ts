import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import Database from 'better-sqlite3';
import * as DeckService from '../decks/deck.service';
import * as CardService from '../cards/card.service';

interface AnkiDeck {
    id: number;
    name: string;
}

interface AnkiNote {
    id: number;
    mid: number; // Model ID
    flds: string; // "Front\x1fBack"
}

interface AnkiCard {
    id: number;
    nid: number; // Note ID
    did: number; // Deck ID
    ord: number;
    type: number; // 0=new, 1=learning, 2=review
    queue: number;
    due: number;
    ivl: number;
    factor: number;
    reps: number;
    lapses: number;
}

export const importAnkiDeck = async (userId: string, filePath: string) => {
    console.log(`[Import] Starting import for user: ${userId}, file: ${filePath}`);
    const importStats = {
        decks: 0,
        cards: 0,
        cardsByDeck: {} as Record<string, number>,
        errors: [] as string[]
    };

    const tempDir = path.join(path.dirname(filePath), 'extracted_' + Date.now());
    const log = (msg: string) => console.log(`[Import Log] ${msg}`);
    let db: Database.Database | null = null;

    try {
        // 1. Unzip
        console.log('[Import] Unzipping file...');
        log(`Unzipping file: ${filePath}`);
        const zip = new AdmZip(filePath);
        fs.mkdirSync(tempDir, { recursive: true });
        zip.extractAllTo(tempDir, true);

        // Log extracted files
        const listFiles = (dir: string): string[] => {
            let results: string[] = [];
            const list = fs.readdirSync(dir);
            list.forEach(file => {
                file = path.join(dir, file);
                const stat = fs.statSync(file);
                if (stat && stat.isDirectory()) {
                    results = results.concat(listFiles(file));
                } else {
                    results.push(file);
                }
            });
            return results;
        };
        try {
            const allFiles = listFiles(tempDir);
            log(`Extracted files count: ${allFiles.length}`);
            log(`First 10 files: ${JSON.stringify(allFiles.slice(0, 10))}`);
        } catch (e) { log(`Error listing files: ${e}`); }

        let dbPath = path.join(tempDir, 'collection.anki2');

        // If not at root, search recursively (GitHub zips put everything in a subfolder)
        // 1. Check for collection.anki2 directly or recursively
        // 1. Check for collection.anki2 directly or recursively
        if (!fs.existsSync(dbPath)) {
            // Helper to find file recursively
            const findFile = (dir: string, extOrName: string, isExtension: boolean = false): string | null => {
                const files = fs.readdirSync(dir);
                for (const file of files) {
                    const fullPath = path.join(dir, file);
                    if (fs.statSync(fullPath).isDirectory()) {
                        const found = findFile(fullPath, extOrName, isExtension);
                        if (found) return found;
                    } else {
                        if (isExtension ? file.endsWith(extOrName) : file === extOrName) {
                            return fullPath;
                        }
                    }
                }
                return null;
            };

            const foundDb = findFile(tempDir, 'collection.anki2');
            if (foundDb) {
                dbPath = foundDb;
                log(`Found DB recursively at: ${dbPath}`);
            } else {
                // 2. Check for nested .apkg (common in GitHub zipballs)
                log('collection.anki2 not found. Searching for nested .apkg...');
                const foundApkg = findFile(tempDir, '.apkg', true);

                if (foundApkg) {
                    log(`Found nested APKG at: ${foundApkg}`);
                    // We need to unzip THIS apkg to a new location and use that as the source
                    const innerTempDir = path.join(tempDir, 'inner_extracted');
                    fs.mkdirSync(innerTempDir, { recursive: true });
                    const innerZip = new AdmZip(foundApkg);
                    innerZip.extractAllTo(innerTempDir, true);

                    // Now look for DB in there
                    dbPath = path.join(innerTempDir, 'collection.anki2');
                } else {
                    log(`collection.anki2 AND .apkg not found in: ${tempDir}`);
                    throw new Error('INVALID_DECK');
                }
            }
        }

        // 2. Open SQLite
        console.log('[Import] Opening SQLite DB...');
        const db = new Database(dbPath, { readonly: true });

        // MEDIA PROCESSING
        // Anki stores media mapping in a 'media' file (JSON) where keys are numeric filenames in the zip
        // and values are the original filenames used in card fields (e.g. "1": "myimage.jpg").
        // MEDIA PROCESSING
        // Use the directory where dbPath was found as the source for media
        const workingDir = path.dirname(dbPath);
        const mediaJsonPath = path.join(workingDir, 'media');

        if (fs.existsSync(mediaJsonPath)) {
            try {
                const mediaMap = JSON.parse(fs.readFileSync(mediaJsonPath, 'utf-8'));
                const mediaDestDir = path.join(__dirname, '../../../public/media');

                // Ensure media dir exists
                if (!fs.existsSync(mediaDestDir)) {
                    fs.mkdirSync(mediaDestDir, { recursive: true });
                }

                console.log(`[Import] Processing media files...`);
                let mediaCount = 0;

                for (const [numericName, originalName] of Object.entries(mediaMap)) {
                    const srcPath = path.join(workingDir, numericName);
                    if (fs.existsSync(srcPath)) {
                        const destPath = path.join(mediaDestDir, originalName as string);
                        // Copy instead of rename to avoid permission issues across devices/partitions
                        fs.copyFileSync(srcPath, destPath);
                        mediaCount++;
                    }
                }
                console.log(`[Import] Processed ${mediaCount} media files.`);
            } catch (mediaErr) {
                console.error('[Import] Error processing media:', mediaErr);
                // Don't fail the hole import, just log it
            }
        }

        // 3. Get Decks
        console.log('[Import] Reading decks from DB...');
        const col: any = db.prepare('SELECT decks FROM col').get();
        const ankiDecksMap = JSON.parse(col.decks);

        console.log('[Import] Found decks in map:', Object.keys(ankiDecksMap).length);

        // Map Anki Deck ID to Ankris Deck ID
        const deckIdMap = new Map<number, string>();

        for (const key in ankiDecksMap) {
            const d = ankiDecksMap[key];
            if (d.id === 1 && d.name === 'Default') continue;

            console.log(`[Import] Creating deck: ${d.name}`);
            const createdDeck = await DeckService.createDeck(userId, d.name, `Imported from Anki`);
            deckIdMap.set(Number(d.id), createdDeck.id);
            importStats.decks++;
        }

        // 4. Get Notes
        console.log('[Import] Reading notes...');
        const notes = db.prepare('SELECT id, mid, flds FROM notes').all() as AnkiNote[];
        console.log(`[Import] Found ${notes.length} notes`);

        // Map Note ID to Content
        const noteMap = new Map<number, { front: string, back: string }>();

        notes.forEach(n => {
            const fields = n.flds.split('\x1f');
            const front = fields[0] || "Empty Front";
            const back = fields.slice(1).join('<br>') || "Empty Back";
            noteMap.set(n.id, { front, back });
        });

        // 5. Get Cards
        const cards = db.prepare('SELECT id, nid, did, ord, type, queue, due, ivl, factor, reps, lapses FROM cards').all() as AnkiCard[];

        for (const c of cards) {
            const content = noteMap.get(c.nid);
            const targetDeckId = deckIdMap.get(c.did);

            // If deck not mapped (maybe Default), try to map to first created or skip
            // For MVP: Skip if deck not found
            if (!content || !targetDeckId) continue;



            // Handle Reversed Cards (Heuristic based on ord)
            // USER FEEDBACK: "Solo debe generarse solo una carta".
            // The user considers reversed cards (ord > 0) as unwanted duplicates.
            // Strict fix: Skip any card that is not the primary card (ord 0).
            if (c.ord !== 0) {
                continue;
            }

            let front = content.front;
            let back = content.back;


            // CHECK DUPLICATES: Check if a card with this Anki Note ID and Ordinal already exists in this deck
            // This relies on CardService having a way to check.
            const existingCards = await CardService.getAllCards(userId);
            const isDuplicate = existingCards.some(ec =>
                ec.deckId === targetDeckId &&
                ec.noteId === String(c.nid) &&
                (ec.ord === c.ord || (ec.ord === undefined && ec.front === front)) // Fallback to front check if ord is missing in old cards
            );

            if (isDuplicate) {
                // Skip duplicate
                continue;
            }

            const newCard = await CardService.createCard(
                userId,
                targetDeckId,
                String(c.nid),
                front,
                back,
                c.ord
            );

            // TODO: Map detailed SRS state if possible
            // c.type: 0=new, 1=learning, 2=review, 3=relearning
            importStats.cards++;
            importStats.cardsByDeck[targetDeckId] = (importStats.cardsByDeck[targetDeckId] || 0) + 1;
        }

        // 6. Cleanup: Delete any imported decks that ended up empty
        // This prevents the "Predeterminado" (Default) deck from appearing if it wasn't used
        console.log('[Import] Cleaning up empty decks...');
        for (const [ankiId, ankrisDeckId] of deckIdMap.entries()) {
            const cardCount = importStats.cardsByDeck[ankrisDeckId] || 0;
            if (cardCount === 0) {
                console.log(`[Import] Deleting empty deck: ${ankrisDeckId} (Anki ID: ${ankiId})`);
                await DeckService.deleteDeck(userId, ankrisDeckId);
                importStats.decks--;
            }
        }

        console.log('[Import] Cleanup complete.');
        console.log(`[Import] Stats: ${importStats.decks} decks, ${importStats.cards} cards`);

        return importStats;

    } catch (e: any) {
        importStats.errors.push(e.message);
        console.error('Import Error:', e);
        throw e;
    } finally {
        // Cleanup
        try {
            if (db) {
                db.close();
            }
            if (fs.existsSync(tempDir)) {
                fs.rmSync(tempDir, { recursive: true, force: true });
            }
            // Optional: delete uploaded .apkg
            // fs.unlinkSync(filePath); 
        } catch (cleanupErr) {
            // EPERM is common on Windows if DB is still flushing. 
            // We don't want to fail the request for this.
            console.warn("Cleanup warning (non-fatal):", cleanupErr);
        }
    }
};

export const importDemoDeck = async (userId: string, demoId: string) => {
    // Simulate Processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    let deckName = 'Demo Deck';
    let cards = [];

    if (demoId.includes('spanish')) {
        deckName = 'Essential Spanish (Demo)';
        cards = [
            { front: 'Hello', back: 'Hola' },
            { front: 'Cat', back: 'Gato' },
            { front: 'Dog', back: 'Perro' },
            { front: 'House', back: 'Casa' },
            { front: 'Thank you', back: 'Gracias' }
        ];
    } else if (demoId.includes('capitals')) {
        deckName = 'World Capitals (Demo)';
        cards = [
            { front: 'France', back: 'Paris' },
            { front: 'Spain', back: 'Madrid' },
            { front: 'Japan', back: 'Tokyo' },
            { front: 'Germany', back: 'Berlin' },
            { front: 'Italy', back: 'Rome' }
        ];
    } else {
        deckName = 'Anatomy Demo';
        cards = [
            { front: 'Skull', back: 'Cranium' },
            { front: 'Heart', back: 'Cardio' }
        ];
    }

    const deck = await DeckService.createDeck(userId, deckName, 'Imported via AnkiWeb Demo');

    // Create cards
    for (const c of cards) {
        await CardService.createCard(userId, deck.id, Date.now().toString() + Math.random(), c.front, c.back, 0);
    }

    return { decks: 1, cards: cards.length, errors: [] };
};
