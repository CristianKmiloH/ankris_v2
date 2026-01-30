const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '../apps/backend/data/users.json');

try {
    const data = fs.readFileSync(usersPath, 'utf8');
    const users = JSON.parse(data);

    const emailToRemove = 'cami@gmail.com';
    const initialLength = users.length;

    const newUsers = users.filter(u => u.email !== emailToRemove);

    if (newUsers.length < initialLength) {
        fs.writeFileSync(usersPath, JSON.stringify(newUsers, null, 2));
        console.log(`✅ Successfully removed user: ${emailToRemove}`);
    } else {
        console.log(`⚠️ User not found: ${emailToRemove}`);
    }

} catch (error) {
    console.error('Error modifying users.json:', error);
}
