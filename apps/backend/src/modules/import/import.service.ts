import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import Database from 'better-sqlite3';
import * as DeckService from '../decks/deck.service';
import * as CardService from '../cards/card.service';
import { prisma } from '../../db/prisma';

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

        let dbPath: string | null = null;
        const potentialDb21 = path.join(tempDir, 'collection.anki21');
        const potentialDb2 = path.join(tempDir, 'collection.anki2');

        // Helper to find file recursively
        const findFile = (dir: string, extOrName: string, isExtension: boolean = false): string | null => {
            const files = fs.readdirSync(dir);
            for (const file of files) {
                const fullPath = path.join(dir, file);
                try {
                    if (fs.statSync(fullPath).isDirectory()) {
                        const found = findFile(fullPath, extOrName, isExtension);
                        if (found) return found;
                    } else {
                        if (isExtension ? file.endsWith(extOrName) : file === extOrName) {
                            return fullPath;
                        }
                    }
                } catch (e) {
                    // Ignore access errors
                }
            }
            return null;
        };

        // 1. Priority: collection.anki21 (Newer Anki)
        if (fs.existsSync(potentialDb21)) {
            dbPath = potentialDb21;
            log(`Found collection.anki21 at root: ${dbPath}`);
        } else {
            // Recursive search for .anki21
            const foundDb21 = findFile(tempDir, 'collection.anki21');
            if (foundDb21) {
                dbPath = foundDb21;
                log(`Found collection.anki21 recursively at: ${dbPath}`);
            }
        }

        // 2. Fallback: collection.anki2 (Legacy or Stub)
        if (!dbPath) {
            if (fs.existsSync(potentialDb2)) {
                dbPath = potentialDb2;
                log(`Found collection.anki2 at root: ${dbPath}`);
            } else {
                const foundDb2 = findFile(tempDir, 'collection.anki2');
                if (foundDb2) {
                    dbPath = foundDb2;
                    log(`Found collection.anki2 recursively at: ${dbPath}`);
                }
            }
        }

        if (dbPath) {
            // We have a DB, proceed
            log(`Using DB: ${dbPath}`);
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
                const { StorageService } = require('../../services/storage.service');
                const storageService = StorageService.getInstance();

                // Convert to array for batch processing
                const mediaEntries = Object.entries(mediaMap);
                console.log(`[Import] Processing ${mediaEntries.length} media files to Supabase...`);
                let mediaCount = 0;
                const BATCH_SIZE = 10; // Reduced batch size for network uploads

                for (let i = 0; i < mediaEntries.length; i += BATCH_SIZE) {
                    const batch = mediaEntries.slice(i, i + BATCH_SIZE);
                    await Promise.all(batch.map(async ([numericName, originalName]) => {
                        const srcPath = path.join(workingDir, numericName);
                        // Async check and upload
                        try {
                            // Use promises to check access instead of existsSync
                            await fs.promises.access(srcPath);

                            // Upload to Supabase
                            console.log(`[Import] Uploading media: ${originalName} (${numericName})...`);
                            await storageService.uploadFile(srcPath, originalName as string);
                            mediaCount++;
                        } catch (err: any) {
                            console.warn(`[Import] Failed to process media "${originalName}" (ZIP name: ${numericName}): ${err.message}`);
                            // Ignore missing files or upload errors to allow import to continue
                        }
                    }));
                }

                console.log(`[Import] Successfully uploaded ${mediaCount} out of ${mediaEntries.length} media files.`);
            } catch (mediaErr) {
                console.error('[Import] Critical Error during media processing:', mediaErr);
                // Don't fail the whole import, just log it
            }
        }

        // 3. Get Decks
        console.log('[Import] Reading decks from DB...');
        const col: any = db.prepare('SELECT decks FROM col').get();
        const ankiDecksMap = JSON.parse(col.decks);

        console.log('[Import] Found decks in map:', Object.keys(ankiDecksMap).length);

        // Map Anki Deck ID to Ankris Deck ID
        const deckIdMap = new Map<number, string>();
        const deckNameMap = new Map<number, string>();

        for (const key in ankiDecksMap) {
            const d = ankiDecksMap[key];
            if (d.id === 1 && d.name === 'Default') continue;

            console.log(`[Import] Creating deck: ${d.name}`);
            deckNameMap.set(Number(d.id), d.name);
            const createdDeck = await DeckService.createDeck(userId, d.name, `Imported from Anki`);
            deckIdMap.set(Number(d.id), createdDeck.id);
            importStats.decks++;
        }

        // 4. Get MODELS (Note Types) from Anki
        console.log('[Import] Reading note types (models)...');
        const colData: any = db.prepare('SELECT models FROM col').get();
        const ankiModelsMap = JSON.parse(colData.models);

        // Map Model ID -> Model Name
        const modelNameMap = new Map<number, string>();
        for (const key in ankiModelsMap) {
            const model = ankiModelsMap[key];
            modelNameMap.set(Number(model.id), model.name || 'Unknown');
            console.log(`[Import] Detected Model: ID=${model.id}, Name=${model.name}`);
        }

        // 5. Get Notes
        console.log('[Import] Reading notes...');
        const notes = db.prepare('SELECT id, mid, flds FROM notes').all() as AnkiNote[];
        console.log(`[Import] Found ${notes.length} notes`);

        // Import the Note Type Registry
        const { NoteTypeRegistry } = require('../notes/NoteTypeRegistry');
        const registry = NoteTypeRegistry.getInstance();
        const { StorageService } = require('../../services/storage.service');
        const storageService = StorageService.getInstance();

        // Map Note ID to Generated Cards
        interface NoteData {
            modelName: string;
            fields: Record<string, string>;
            generatedCards: any[]; // Array of {ord, front, back}
        }
        const noteDataMap = new Map<number, NoteData>();

        notes.forEach(n => {
            const fields = n.flds.split('\x1f');
            const modelName = modelNameMap.get(n.mid) || 'Basic';

            // Detect the Note Type
            const noteType = registry.detectTypeFromAnkiName(modelName);

            // Build field map (Anki models define field names, but we don't have that metadata here easily)
            // For simplicity, we'll use generic field names based on the note type
            let fieldMap: Record<string, string> = {};

            if (noteType.typeId === 'CLOZE') {
                // For Cloze, the first field is "Text", second is "Extra"
                fieldMap = {
                    'Text': fields[0] || '',
                    'Extra': fields[1] || ''
                };
            } else {
                // For Basic types, assume "Front" and "Back"
                fieldMap = {
                    'Front': fields[0] || 'Empty Front',
                    'Back': fields.slice(1).join('<br>') || 'Empty Back'
                };
            }

            // [FIX] Inject Media URLs
            // Anki uses <img src="file.jpg"> and [sound:file.mp3]. wWe need to replace these with Supabase URLs.
            Object.keys(fieldMap).forEach(key => {
                let content = fieldMap[key];

                // 1. Replace Images: <img src="filename.ext"> -> <img src="https://.../filename.ext">
                content = content.replace(/<img src="([^"]+)"/g, (match, filename) => {
                    const publicUrl = storageService.getPublicUrl(filename);
                    return `<img src="${publicUrl}" style="max-width: 100%; height: auto;">`;
                });

                // 2. Replace Audio: [sound:filename.ext] -> <audio controls src="https://.../filename.ext"></audio>
                content = content.replace(/\[sound:([^\]]+)\]/g, (match, filename) => {
                    const publicUrl = storageService.getPublicUrl(filename);
                    return `<audio controls src="${publicUrl}"></audio>`; // Add controls for playback
                });

                fieldMap[key] = content;
            });

            // Generate cards using the Note Type logic
            const generatedCards = noteType.generateCards(fieldMap);

            noteDataMap.set(n.id, {
                modelName,
                fields: fieldMap,
                generatedCards
            });
        });

        // 6. Get Cards
        const cards = db.prepare('SELECT id, nid, did, ord, type, queue, due, ivl, factor, reps, lapses FROM cards').all() as AnkiCard[];

        // Track processed Note IDs to enforce "One Card Per Note" rule requested by user
        const processedNoteIds = new Set<number>();

        for (const c of cards) {
            // STRICT DUPLICATE PREVENTION:
            // User requested "Solo debe generarse solo una carta" per note.
            // If we have already processed a card for this Note ID in this batch, skip it.
            // This prevents "Acteur" -> "Actor" AND "Acteur" -> "Actor (Image)" showing up as duplicates.
            if (processedNoteIds.has(c.nid)) {
                continue;
            }

            const noteData = noteDataMap.get(c.nid);
            if (!noteData) {
                console.warn(`[Import] Warning: Note ${c.nid} not found, skipping card`);
                continue;
            }

            let targetDeckId = deckIdMap.get(c.did);

            // If deck not mapped, create it
            if (!targetDeckId) {
                const deckName = deckNameMap.get(c.did) || `Imported Deck ${new Date().toLocaleDateString()}`;
                const newDeck = await DeckService.createDeck(userId, deckName, "Imported from Anki");
                deckIdMap.set(c.did, newDeck.id);
                deckNameMap.set(c.did, deckName);
                targetDeckId = newDeck.id;
                importStats.decks++;
            }

            // Mark this note as processed so we don't import sibling cards
            processedNoteIds.add(c.nid);

            // IMPORTANT: For Cloze and other multi-card types, we generate ALL cards from the note
            // For Basic types, there's usually only 1 card in generatedCards
            const cardsToImport = noteData.generatedCards;

            if (cardsToImport.length === 0) {
                console.warn(`[Import] Note ${c.nid} generated 0 cards, skipping`);
                continue;
            }

            // CLEANUP helper (preserving existing logic)
            const cleanContent = (html: string) => {
                if (!html) return "";
                // 1. Remove style blocks
                html = html.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gim, "");

                // 2. Remove specific Anki classes/ids (except cloze-related)
                html = html.replace(/class="(?!cloze).*?"/g, "");
                html = html.replace(/id="(?!answer).*?"/g, "");

                return html.trim();
            };

            // Import each generated card
            for (const genCard of cardsToImport) {
                const front = cleanContent(genCard.front);
                const back = cleanContent(genCard.back);
                const ord = genCard.ord;

                if (!front && !back) {
                    console.warn(`[Import] Card ${c.id} has empty content, skipping`);
                    continue;
                }

                // CHECK DUPLICATES
                const existingCards = await CardService.getAllCards(userId);
                const noteIdStr = String(c.nid);
                const isDuplicate = existingCards.some((ec: any) =>
                    ec.deckId === targetDeckId &&
                    ec.noteId === noteIdStr &&
                    ec.ord === ord
                );

                if (isDuplicate) {
                    continue;
                }

                // ENSURE PARENT NOTE EXISTS
                try {
                    await prisma.note.upsert({
                        where: { id: noteIdStr },
                        update: {}, // No-op if exists
                        create: {
                            id: noteIdStr,
                            userId: userId,
                            deckId: targetDeckId!,
                            content: JSON.stringify(noteData.fields),
                            tags: "", // Tags logic pending Anki parsing
                            noteType: registry.detectTypeFromAnkiName(noteData.modelName).typeId
                        }
                    });
                } catch (noteErr) {
                    console.warn(`[Import] Failed to upsert note ${noteIdStr}:`, noteErr);
                }

                // CREATE CARD
                await CardService.createCard(
                    userId,
                    targetDeckId!,
                    noteIdStr,
                    front,
                    back,
                    ord
                );

                importStats.cards++;
                importStats.cardsByDeck[targetDeckId!] = (importStats.cardsByDeck[targetDeckId!] || 0) + 1;
            }

            // TODO: Map detailed SRS state if possible
            // c.type: 0=new, 1=learning, 2=review, 3=relearning
            importStats.cards++;
            importStats.cardsByDeck[targetDeckId!] = (importStats.cardsByDeck[targetDeckId!] || 0) + 1;
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
