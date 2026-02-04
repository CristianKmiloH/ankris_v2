
import { importAnkiDeck } from '../src/modules/import/import.service';
import { prisma } from '../src/db/prisma';

// Mock userId for testing
const TEST_USER_ID = 'test-user-verification-verify';
// Use the exact path found in the user's Downloads folder
const LOCAL_FILE_PATH = 'C:/Users/crist/Downloads/Essential_French.apkg';

async function testImport() {
    console.log(`🚀 Starting verification for local file: ${LOCAL_FILE_PATH}`);

    try {
        console.log('📥 Initiating local import...');

        // Directly call the import logic with the local file path
        await importAnkiDeck(TEST_USER_ID, LOCAL_FILE_PATH);

        console.log('✅ Import completed successfully!');

        // Verify data in DB
        const decks = await prisma.deck.findMany({
            where: { userId: TEST_USER_ID },
            include: { cards: true, notes: true }
        });

        console.log(`📚 Decks found for test user: ${decks.length}`);
        decks.forEach((d: any) => {
            console.log(`   - Deck: ${d.name}`);
            console.log(`     Cards: ${d.cards.length}`);
            console.log(`     Notes: ${d.notes.length}`);
        });

    } catch (error) {
        console.error('❌ Import FAILED:', error);
        if (error instanceof Error) {
            console.error('Stack:', error.stack);
        }
    } finally {
        await prisma.$disconnect();
    }
}

testImport();
