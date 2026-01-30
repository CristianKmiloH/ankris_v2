const axios = require('axios');

async function testLocalEndpoint() {
    try {
        const query = 'ingles';
        const url = `http://localhost:3000/api/ankiweb/search?q=${encodeURIComponent(query)}`;

        console.log(`Testing Local Backend Endpoint: ${url}`);

        // We need to simulate a valid request. If auth is required, this might fail 401.
        // But let's see if we get 401 or 200 with empty list.
        // We might need a token. Let's try without first, as search might be public?
        // Checking controller... router.use(authenticateToken) is likely used.
        // We need a token. I'll login first using the mocked auth service or just try and see.

        // Actually, let's try to login first if I can, or hardcode a fake token if the auth middleware is naive.
        // The previous auth implementation was file-based.

        // Step 1: Login to get token (if possible)
        // If not, I will just try with a likely fake token or skip if I can't easily login via script.
        // Let's assume I need a token.

        console.log('Attempting search without token...');
        try {
            await axios.get(url);
        } catch (e) {
            console.log('Search without token status:', e.response ? e.response.status : e.message);
        }

    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

testLocalEndpoint();
