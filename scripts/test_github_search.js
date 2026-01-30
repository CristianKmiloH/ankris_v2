const axios = require('axios');

async function search() {
    try {
        const query = 'ingles';
        const githubQuery = `${query} anki`;
        // Mimic the exact URL used in the service
        const searchUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(githubQuery)}&sort=stars&order=desc`;

        console.log(`Testing GitHub Search for '${query}': ${searchUrl}`);

        const { data } = await axios.get(searchUrl, {
            headers: {
                'User-Agent': 'Ankris-App-Test',
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        console.log('Status:', 200);
        console.log('Items found:', data.items ? data.items.length : 0);

        if (data.items && data.items.length > 0) {
            console.log('--- Top 3 Results ---');
            data.items.slice(0, 3).forEach(item => {
                console.log(`- ${item.name} (${item.stargazers_count} stars): ${item.html_url}`);
            });
        } else {
            console.log('No items found. Code logic might be too strict or GitHub has no results.');
        }

    } catch (error) {
        console.error('Search failed:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            // Verify rate limit
            console.error('Rate Limit Remaining:', error.response.headers['x-ratelimit-remaining']);
        }
    }
}

search();
