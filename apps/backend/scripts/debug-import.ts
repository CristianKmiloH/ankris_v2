
import { importAnkiDeck } from '../src/modules/import/import.service';
import { downloadDeck } from '../src/modules/ankiweb/ankiweb.service';
import path from 'path';

// Mock DB or dependencies if necessary?
// importAnkiDeck imports DeckService.
// DeckService imports prisma.
// If we run this script with ts-node, it executes normally.
// Prerequisite: DB is accessible.

async function run() {
    console.log('--- Starting Debug Import ---');
    try {
        // Repo: FelipeMasil/anki-ingles (User reported silent failure)
        const repoId = 'github:FelipeMasil/anki-ingles';

        console.log(`1. Downloading deck: ${repoId}`);
        const filePath = await downloadDeck(repoId);
        console.log(`   Downloaded to: ${filePath}`);

        console.log('2. Importing deck...');
        // Use a dummy user ID or existing one.
        // It might fail on DB constraints if user doesn't exist.
        // But we want to test the UNZIP logic first, which happens BEFORE DB writes (mostly).
        // Actually, creating deck happens after unzip.
        // So checking if unzip works is key.

        await importAnkiDeck('debug-user-id', filePath);

        console.log('--- Import Successful ---');
    } catch (e: any) {
        console.error('--- Import FAILED ---');
        console.error(e);
        // If it failed, check the log file we created
        const logPath = path.join(process.cwd(), '.tmp', 'import_debug_v2.log');
        console.log(`\nCheck log file at: ${logPath}`);
        // Read log file content?
        // import fs from 'fs';
        // if(fs.existsSync(logPath)) console.log(fs.readFileSync(logPath, 'utf8'));
    }
}

run();
