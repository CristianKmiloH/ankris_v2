
import fs from 'fs';
import path from 'path';

// Adjust path based on execution. Assuming execution from backend root.
const DATA_DIR = path.join(__dirname, '../../data');
const CARDS_FILE = path.join(DATA_DIR, 'cards.json');
const DECKS_FILE = path.join(DATA_DIR, 'decks.json');

console.log(`[CLEANUP] Starting cleanup...`);
console.log(`[CLEANUP] Data Dir: ${DATA_DIR}`);

if (!fs.existsSync(CARDS_FILE) || !fs.existsSync(DECKS_FILE)) {
    console.error(`[ERROR] Files not found. Cards: ${fs.existsSync(CARDS_FILE)}, Decks: ${fs.existsSync(DECKS_FILE)}`);
    process.exit(1);
}

try {
    const cards = JSON.parse(fs.readFileSync(CARDS_FILE, 'utf-8'));
    const decks = JSON.parse(fs.readFileSync(DECKS_FILE, 'utf-8'));

    // Create Set of valid deck IDs
    const validDeckIds = new Set(decks.map((d: any) => d.id));

    console.log(`[CLEANUP] Found ${decks.length} valid decks.`);
    console.log(`[CLEANUP] Total cards before: ${cards.length}`);

    // Filter cards
    const validCards = cards.filter((c: any) => validDeckIds.has(c.deckId));
    const deletedCount = cards.length - validCards.length;

    console.log(`[CLEANUP] Valid cards: ${validCards.length}`);
    console.log(`[CLEANUP] Orphan cards deleted: ${deletedCount}`);

    if (deletedCount > 0) {
        fs.writeFileSync(CARDS_FILE, JSON.stringify(validCards, null, 2));
        console.log(`[CLEANUP] Saved clean cards.json successfully.`);
    } else {
        console.log(`[CLEANUP] No orphans found. System clean.`);
    }

} catch (error: any) {
    console.error(`[ERROR] Cleanup failed:`, error.message);
}
