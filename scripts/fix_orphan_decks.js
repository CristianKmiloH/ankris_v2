const fs = require('fs');
const path = require('path');

const decksPath = path.join(__dirname, '../apps/backend/data/decks.json');

try {
    const data = fs.readFileSync(decksPath, 'utf8');
    const decks = JSON.parse(data);

    // Find User ID for Cami (igzx1) - hardcoded for fix
    const targetUserId = 'igzx1';

    // Update 'default_user' decks to 'igzx1'
    let count = 0;
    const updatedDecks = decks.map(d => {
        if (d.userId === 'default_user') {
            count++;
            return { ...d, userId: targetUserId };
        }
        return d;
    });

    if (count > 0) {
        fs.writeFileSync(decksPath, JSON.stringify(updatedDecks, null, 2));
        console.log(`✅ Fixed ${count} decks assigned to 'default_user' -> '${targetUserId}'`);
    } else {
        console.log('ℹ️ No decks to fix.');
    }

} catch (e) {
    console.error('Error fixing decks:', e);
}
