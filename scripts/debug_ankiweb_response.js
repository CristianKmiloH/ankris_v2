const axios = require('axios');
const fs = require('fs');

async function debug() {
    try {
        console.log('Fetching AnkiWeb...');
        const res = await axios.get('https://ankiweb.net/shared/decks?search=spanish', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        console.log('Status:', res.status);
        console.log('Length:', res.data.length);
        fs.writeFileSync('ankiweb_debug.html', res.data);
        console.log('Saved to ankiweb_debug.html');

        if (res.data.includes('Please log in')) {
            console.log('DETECTED: Login required error!');
        } else {
            console.log('Seems OK? Check html file.');
        }

    } catch (e) {
        console.error(e.message);
    }
}

debug();
