const axios = require('axios');

async function testDirectGitHub() {
    console.log('=== Testing GitHub API Directly ===\n');

    const query = 'aleman';
    const searchUrl = `https://api.github.com/search/code?q=${encodeURIComponent(query)}+extension:apkg&per_page=5`;

    console.log(`URL: ${searchUrl}\n`);

    try {
        const response = await axios.get(searchUrl, {
            headers: {
                'Accept': 'application/vnd.github+json',
                'User-Agent': 'Ankris-App'
            }
        });

        console.log(`✅ Status: ${response.status}`);
        console.log(`Total results: ${response.data.total_count || 0}`);
        console.log(`Items returned: ${response.data.items?.length || 0}\n`);

        if (response.data.items && response.data.items.length > 0) {
            console.log('Results:');
            response.data.items.forEach((item, i) => {
                console.log(`${i + 1}. ${item.name}`);
                console.log(`   Repo: ${item.repository.full_name}`);
                console.log(`   Stars: ${item.repository.stargazers_count || 0}\n`);
            });
        } else {
            console.log('⚠️ No items found\n');
        }

        // Check rate limit
        const rateLimitUrl = 'https://api.github.com/rate_limit';
        const rateResponse = await axios.get(rateLimitUrl, {
            headers: { 'User-Agent': 'Ankris-App' }
        });

        console.log('Rate Limit Info:');
        console.log(`Remaining: ${rateResponse.data.rate.remaining}`);
        console.log(`Limit: ${rateResponse.data.rate.limit}`);
        console.log(`Reset: ${new Date(rateResponse.data.rate.reset * 1000).toLocaleString()}`);

    } catch (error) {
        console.error('❌ Error:', error.response?.status || error.message);
        if (error.response?.data) {
            console.error('Response:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

testDirectGitHub();
