const axios = require('axios');

async function testDownloadLogic(owner, repo) {
    console.log(`\nTesting Download Logic for: ${owner}/${repo}`);
    try {
        const contentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;
        console.log(`1. Fetching contents: ${contentsUrl}`);

        const { data: contents } = await axios.get(contentsUrl, {
            headers: { 'User-Agent': 'Ankris-Test' }
        });

        const apkgFile = Array.isArray(contents)
            ? contents.find(f => f.name.toLowerCase().endsWith('.apkg'))
            : null;

        if (!apkgFile) {
            console.log('❌ No .apkg file found in root.');
            // List files found for clarity
            console.log('Files found:', contents.map(f => f.name).join(', '));
            return;
        }

        console.log(`✅ Found file: ${apkgFile.name}`);
        console.log(`   Download URL: ${apkgFile.download_url}`);

        // Test fetch header (lightweight check)
        const res = await axios.head(apkgFile.download_url);
        console.log(`   File Accessibility: ${res.status} OK`);

    } catch (e) {
        console.error('❌ Error:', e.response?.data?.message || e.message);
    }
}

async function runTests() {
    // Test 1: A repo known to have an .apkg in root (hopefully)
    // Finding one via search first
    try {
        const search = await axios.get(
            `https://api.github.com/search/repositories?q=anki+deck&per_page=1&sort=stars`,
            { headers: { 'User-Agent': 'Ankris-Test' } }
        );

        if (search.data.items.length > 0) {
            const repo = search.data.items[0];
            console.log(`Discovered popular repo: ${repo.full_name}`);
            await testDownloadLogic(repo.owner.login, repo.name);
        }
    } catch (e) {
        console.log('Search failed, skipping dynamic test');
    }
}

runTests();
