const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/ankiweb';

async function testMockFlow() {
    console.log("--- 1. Testing Search Fallback ---");
    try {
        const res = await axios.get(`${BASE_URL}/search?q=anything`);
        console.log("Search Status:", res.status);
        console.log("Search Results:", res.data);

        const demoDeck = res.data.find(d => d.id.startsWith('demo_'));
        if (demoDeck) {
            console.log("SUCCESS: Found Demo Deck:", demoDeck.title);

            console.log("\n--- 2. Testing Mock Download/Import ---");
            const dlRes = await axios.post(`${BASE_URL}/download`, { deckId: demoDeck.id });
            console.log("Download Status:", dlRes.status);
            console.log("Download Response:", dlRes.data);

            if (dlRes.data.success) {
                console.log("SUCCESS: Demo flow completed!");
            }
        } else {
            console.error("FAILURE: No demo decks returned.");
        }

    } catch (e) {
        console.error("API Error:", e.message);
        if (e.response) {
            console.error("Response Data:", e.response.data);
        }
    }
}

testMockFlow();
