const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '../apps/backend/data/users.json');

try {
    console.log('--- Cleaning Auth Data ---');
    if (fs.existsSync(usersPath)) {
        const data = fs.readFileSync(usersPath, 'utf8');
        const users = JSON.parse(data);
        // Remove cami@gmail.com to allow fresh registration
        const filtered = users.filter(u => u.email !== 'cami@gmail.com');
        fs.writeFileSync(usersPath, JSON.stringify(filtered, null, 2));
        console.log(`✅ Removed 'cami@gmail.com'. Users count: ${filtered.length}`);
    } else {
        console.log('ℹ️ users.json not found, skipping clean.');
    }
} catch (error) {
    console.error('❌ Error cleaning users.json:', error);
}
