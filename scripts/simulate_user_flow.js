const axios = require('axios');
const fs = require('fs');

const API_URL = 'http://localhost:3000/api';
const EMAIL = 'cami@gmail.com';
const PASSWORD = 'Password123!';
const USERNAME = 'Cami';

async function runFlow() {
    console.log('🚀 Starting User Flow Simulation...\n');
    let token = '';
    let userId = '';

    // 1. Register or Login
    try {
        console.log('1. Attempting Registration...');
        const regRes = await axios.post(`${API_URL}/auth/register`, {
            email: EMAIL, password: PASSWORD, username: USERNAME
        });
        console.log('✅ Registration Successful!');
        token = regRes.data.token;
        userId = regRes.data.user.id;
    } catch (e) {
        if (e.response?.data?.error === 'User already exists') {
            console.log('ℹ️ User exists, logging in...');
            try {
                const loginRes = await axios.post(`${API_URL}/auth/login`, {
                    email: EMAIL, password: PASSWORD
                });
                console.log('✅ Login Successful!');
                token = loginRes.data.token;
                userId = loginRes.data.user.id;
            } catch (loginErr) {
                console.error('❌ Login Failed:', loginErr.response?.data || loginErr.message);
                return;
            }
        } else {
            console.error('❌ Registration Failed:', e.response?.data || e.message);
            return;
        }
    }

    const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

    // 2. Search
    try {
        console.log('\n2. Searching for "ortografia"...');
        const searchRes = await axios.get(`${API_URL}/ankiweb/search?q=ortografia`, authHeaders);
        console.log(`✅ Search returned ${searchRes.data.length} results.`);

        if (searchRes.data.length === 0) {
            console.log('⚠️ No results found. Cannot proceed with download.');
            return;
        }

        const deckToDownload = searchRes.data.find(d => d.repo && !d.id.startsWith('demo_')) || searchRes.data[0];
        console.log(`   Selected Deck: ${deckToDownload.title} (${deckToDownload.id})`);

        // 3. Download
        console.log(`\n3. Downloading Deck: ${deckToDownload.id}...`);
        console.time('DownloadDuration');
        const dlRes = await axios.post(`${API_URL}/ankiweb/download`, { deckId: deckToDownload.id }, authHeaders);
        console.timeEnd('DownloadDuration');
        console.log('✅ Download/Import Response:', dlRes.data);

        // 4. Verify Deck in Library
        console.log('\n4. Verifying Deck in Library...');
        // We assume there's an endpoint to get decks, likely GET /api/decks
        // Looking at codebase, usually it's GET /api/decks
        const decksRes = await axios.get(`${API_URL}/decks`, authHeaders);
        const decks = decksRes.data;

        const importedDeck = decks.find(d => d.name === deckToDownload.title || d.description?.includes('Imported from Anki'));

        if (importedDeck) {
            console.log(`✅ SUCCESS! Found imported deck: "${importedDeck.name}" (ID: ${importedDeck.id})`);
            console.log(`   Cards count: ${importedDeck._count?.cards || 'N/A'}`);
        } else {
            console.error('❌ FAILURE: Imported deck NOT found in library.');
            console.log('Current Decks:', decks.map(d => d.name).join(', '));
        }

    } catch (e) {
        console.error('❌ Error in flow:', e.response?.data || e.message);
    }
}

runFlow();
