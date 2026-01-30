const fs = require('fs');
const path = require('path');

const decksPath = path.join(__dirname, '../apps/backend/data/decks.json');
const cardsPath = path.join(__dirname, '../apps/backend/data/cards.json');

try {
    console.log('--- Cleaning Empty "Predeterminado" Decks ---');

    if (!fs.existsSync(decksPath) || !fs.existsSync(cardsPath)) {
        console.log('Files not found.');
        process.exit(0);
    }

    const decks = JSON.parse(fs.readFileSync(decksPath, 'utf8'));
    const cards = JSON.parse(fs.readFileSync(cardsPath, 'utf8'));

    // Find decks to delete: Name is "Predeterminado" AND has 0 cards
    const decksToDelete = decks.filter(d => {
        const isDefaultName = d.name === 'Predeterminado' || d.name === 'Default';
        const deckCards = cards.filter(c => c.deckId === d.id);

        if (isDefaultName && deckCards.length === 0) {
            return true;
        }
        return false;
    });

    if (decksToDelete.length === 0) {
        console.log('✅ No empty default decks found.');
    } else {
        console.log(`🗑️ Found ${decksToDelete.length} empty decks to delete.`);
        const idsToDelete = new Set(decksToDelete.map(d => d.id));

        const newDecks = decks.filter(d => !idsToDelete.has(d.id));
        fs.writeFileSync(decksPath, JSON.stringify(newDecks, null, 2));
        console.log('✅ Decks removed.');
    }

} catch (error) {
    console.error('❌ Error cleaning decks:', error);
}
