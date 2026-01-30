
import axios from 'axios';
import { searchDecks } from '../src/modules/ankiweb/ankiweb.service';

async function run() {
    const queries = [
        'aleman anki',
        'aleman topic:anki',
        'anki aleman',
        'aleman extension:apkg'
    ];

    for (const q of queries) {
        console.log(`\n--- Testing: "${q}" ---`);
        try {
            const response = await axios.get(`https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc`, {
                headers: { 'User-Agent': 'Ankris-App', 'Accept': 'application/vnd.github.v3+json' }
            });
            console.log(`Total Count: ${response.data.total_count}`);
            if (response.data.items.length > 0) {
                console.log(`First item: ${response.data.items[0].full_name} (Stars: ${response.data.items[0].stargazers_count})`);
                // Print descriptions to see if they are relevant
                console.log(`Desc: ${response.data.items[0].description}`);
            }
        } catch (e: any) {
            console.log('Error:', e.message);
        }
    }
}

run();
