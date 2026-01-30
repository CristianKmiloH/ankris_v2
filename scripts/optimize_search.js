const axios = require('axios');

async function testStrategies() {
    const term = 'ortografia';

    const strategies = [
        { name: 'Current', q: `${term} anki deck` },
        { name: 'Broader', q: `${term} anki` },
        { name: 'Extension', q: `${term} extension:apkg` }, // Note: Extension search requires auth usually, testing repo search
        { name: 'Topic', q: `${term} topic:anki` }
    ];

    console.log(`Testing search for term: "${term}"\n`);

    for (const strat of strategies) {
        // We are using REPOSITORY search, not CODE search (to avoid auth issues)
        const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(strat.q)}&per_page=5&sort=stars`;

        try {
            const res = await axios.get(url, { headers: { 'User-Agent': 'Ankris-Test' } });
            console.log(`strategy: [${strat.name}]`);
            console.log(`   Query: ${strat.q}`);
            console.log(`   Hits: ${res.data.total_count}`);
            if (res.data.items.length > 0) {
                console.log(`   Top result: ${res.data.items[0].full_name} (⭐ ${res.data.items[0].stargazers_count})`);
            } else {
                console.log(`   (No results)`);
            }
            console.log('-'.repeat(20));
        } catch (e) {
            console.log(`strategy: [${strat.name}] FAILED: ${e.response?.status || e.message}`);
        }
    }
}

testStrategies();
