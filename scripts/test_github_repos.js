const axios = require('axios');

async function testRepoSearch() {
    console.log('=== Testing GitHub Repositories Search API ===\n');

    // Testing the same query as the user
    const query = 'espacio';
    const searchQuery = `${query} anki deck`;
    const searchUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}&per_page=5&sort=stars`;

    console.log(`Query: "${searchQuery}"`);
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
            response.data.items.forEach((repo, i) => {
                console.log(`${i + 1}. ${repo.full_name}`);
                console.log(`   Desc: ${repo.description ? repo.description.substring(0, 50) + '...' : 'No description'}`);
                console.log(`   Stars: ${repo.stargazers_count}`);
                console.log(`   URL: ${repo.html_url}\n`);
            });
        } else {
            console.log('⚠️ No items found for this query.\n');
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Headers:', JSON.stringify(error.response.headers['x-ratelimit-remaining'], null, 2));
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

testRepoSearch();
