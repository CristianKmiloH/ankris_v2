const Groq = require('groq-sdk');

async function testGroqConnection(apiKey) {
    if (!apiKey) {
        console.log('❌ No API key provided. Get one at: https://console.groq.com/keys');
        return;
    }

    try {
        console.log('🔄 Testing Groq API connection...\n');
        const groq = new Groq({ apiKey });

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: `Generate 3 flashcards about photosynthesis. Return ONLY a JSON array:
                    [{"front": "question", "back": "answer"}]`
                }
            ],
            model: 'llama-3.1-70b-versatile',
            temperature: 0.7,
            max_tokens: 512,
            response_format: { type: 'json_object' }
        });

        const response = completion.choices[0]?.message?.content;

        console.log('✅ SUCCESS! Groq API is working!\n');
        console.log('Generated flashcards:');
        console.log(response);

        const parsed = JSON.parse(response);
        const cards = Array.isArray(parsed) ? parsed : (parsed.cards || parsed.flashcards || []);

        console.log(`\n📊 Generated ${cards.length} cards`);
        cards.forEach((card, i) => {
            console.log(`\nCard ${i + 1}:`);
            console.log(`  Q: ${card.front}`);
            console.log(`  A: ${card.back}`);
        });

    } catch (error) {
        console.log('❌ FAILED:', error.message);
        if (error.status === 401) {
            console.log('\n⚠️  Invalid API key. Please check your Groq API key.');
        }
    }
}

// Usage: node test-groq-connection.js YOUR_API_KEY
const apiKey = process.argv[2];
testGroqConnection(apiKey);
