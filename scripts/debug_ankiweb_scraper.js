const axios = require('axios');
const cheerio = require('cheerio');

// DEBUG ANKIWEB SCRAPER (Node.js version)
const BASE_URL = 'https://ankiweb.net';
const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};

async function testSearch(query) {
    console.log(`--- Testing Search: '${query}' ---`);
    const url = `${BASE_URL}/shared/decks/${encodeURIComponent(query)}`;

    try {
        const { data } = await axios.get(url, { headers: HEADERS });
        // console.log("HTML Start:", data.substring(0, 500));
        const $ = cheerio.load(data);
        console.log("BODY Preview:", $('body').html().substring(0, 1000));

        // Strategy: Inspect all links containing /shared/info/
        const links = $('a[href*="/shared/info/"]');
        console.log(`Found ${links.length} deck links.`);

        let foundId = null;

        links.each((i, el) => {
            if (i >= 3) return; // limit log
            const link = $(el);
            const title = link.text().trim();
            const href = link.attr('href');
            console.log(`[${i}] Title: "${title}" | Href: ${href}`);

            if (!foundId && href) {
                foundId = href.split('/').pop();
            }
        });

        return foundId;

    } catch (e) {
        console.error("Search Error:", e.message);
    }
}

async function testDownloadPage(deckId) {
    if (!deckId) {
        console.log("No ID to test download.");
        return;
    }
    console.log(`\n--- Testing Download Page: ID ${deckId} ---`);
    const url = `${BASE_URL}/shared/info/${deckId}`;

    try {
        const { data } = await axios.get(url, { headers: HEADERS });
        const $ = cheerio.load(data);

        const form = $('form[action*="download"]');
        if (form.length) {
            console.log(`Found FORM. Action: ${form.attr('action')}`);
            form.find('input').each((i, el) => {
                console.log(`Input: name=${$(el).attr('name')}, value=${$(el).attr('value')}`);
            });
        } else {
            console.log("WARNING: No download form found.");
            // Dump partial HTML to see what's wrong
            // console.log(data.substring(0, 500)); 
        }

    } catch (e) {
        console.error("Download Page Error:", e.message);
    }
}

(async () => {
    // Verify sample download
    const sampleUrl = "https://raw.githubusercontent.com/nplien/anki-decks/master/Geography/Capitals.apkg";
    console.log("Testing Sample Download...");
    try {
        const res = await axios.get(sampleUrl, { responseType: 'arraybuffer' });
        console.log("Sample Download Status:", res.status);
        console.log("Sample Size:", res.data.length);
    } catch (e) {
        console.error("Test Download Failed:", e.message);
    }
})();
