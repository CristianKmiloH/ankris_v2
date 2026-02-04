
import { importAnkiDeck } from '../src/modules/import/import.service';
import { prisma } from '../src/db/prisma';
import path from 'path';
import fs from 'fs';

const USER_ID = 'test_debug_user';
const FILE_PATH = String.raw`C:\Users\crist\Downloads\Essential_French.apkg`;

async function debugImport() {
    console.log(`🔍 Debugging import for: ${FILE_PATH}`);

    if (!fs.existsSync(FILE_PATH)) {
        console.error(`❌ File not found at: ${FILE_PATH}`);
        process.exit(1);
    }

    try {
        // Ensure user exists
        let user = await prisma.user.findFirst({ where: { email: 'debug@test.com' } });
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: 'debug@test.com',
                    username: 'DebugUser',
                    passwordHash: 'placeholder'
                }
            });
        }

        console.log(`👤 Using user: ${user.id}`);

        // Run Import
        const result = await importAnkiDeck(user.id, FILE_PATH);

        console.log('✅ Import Result:', JSON.stringify(result, null, 2));

        if (result.cards === 0) {
            console.error('⚠️  WARNING: 0 Cards imported! The issue is reproduced.');
        } else {
            console.log(`🎉 Success! ${result.cards} cards imported.`);
        }

    } catch (error) {
        console.error('❌ Import execution failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

debugImport();
