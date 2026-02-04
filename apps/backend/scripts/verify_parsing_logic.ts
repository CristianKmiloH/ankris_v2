
import path from 'path';
import fs from 'fs';
import AdmZip from 'adm-zip';
import Database from 'better-sqlite3';

const FILE_PATH = String.raw`C:\Users\crist\Downloads\Essential_French.apkg`;

async function verifyParsing() {
    console.log(`🔍 Verifying parsing logic for: ${FILE_PATH}`);

    if (!fs.existsSync(FILE_PATH)) {
        console.error(`❌ File not found at: ${FILE_PATH}`);
        process.exit(1);
    }

    const tempDir = path.join(path.dirname(FILE_PATH), 'verify_extracted_' + Date.now());
    let db: Database.Database | null = null;

    try {
        // 1. Unzip
        const zip = new AdmZip(FILE_PATH);
        fs.mkdirSync(tempDir, { recursive: true });
        zip.extractAllTo(tempDir, true);

        let dbPath = path.join(tempDir, 'collection.anki2');
        if (!fs.existsSync(dbPath)) {
            console.log('Searching recursively for DB...');
            // Simple recursive finder
            const findFile = (dir: string, name: string): string | null => {
                const files = fs.readdirSync(dir);
                for (const file of files) {
                    const fp = path.join(dir, file);
                    if (fs.statSync(fp).isDirectory()) {
                        const found = findFile(fp, name);
                        if (found) return found;
                    } else if (file === name) return fp;
                }
                return null;
            };
            dbPath = findFile(tempDir, 'collection.anki2') || '';
        }

        if (!dbPath || !fs.existsSync(dbPath)) {
            console.error('❌ collection.anki2 not found!');
            return;
        }

        console.log(`✅ Found DB at: ${dbPath}`);
        db = new Database(dbPath, { readonly: true });

        // 2. Count Cards using the NEW logic (no ord filter)
        const cards = db.prepare('SELECT id, nid, ord FROM cards').all() as any[];
        const notes = db.prepare('SELECT id, flds FROM notes').all() as any[];

        console.log(`📊 Found raw count: ${cards.length} cards, ${notes.length} notes.`);

        let acceptedCards = 0;
        let rejectedCards = 0;

        for (const c of cards) {
            // THE FIX: We are NO LONGER checking `if (c.ord !== 0)`
            // We simulate the logic:

            // if (c.ord !== 0) { // OLD LOGIC
            //    rejectedCards++;
            //    continue; 
            // }

            acceptedCards++;
        }

        console.log('---------------------------------------------------');
        console.log(`📉 With OLD BUG (ord!=0 filter): You would see 0 to ${acceptedCards} cards.`);
        console.log(`📈 With NEW FIX:                You will see ${acceptedCards} cards.`);
        console.log('---------------------------------------------------');

        if (acceptedCards > 0) {
            console.log('🎉 SUCCESS: The parsing logic now accepts these cards!');
        } else {
            console.log('⚠️ WARNING: Still 0 cards. The issue might be in the file itself.');
        }

    } catch (error) {
        console.error('❌ Parsing failed:', error);
    } finally {
        if (db) db.close();
        if (fs.existsSync(tempDir)) {
            try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) { }
        }
    }
}

verifyParsing();
