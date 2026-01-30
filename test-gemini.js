const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = 'AIzaSyCaTFTA-Bh2Jv0darQqhft1JBWinr4mkPA';
const genAI = new GoogleGenerativeAI(apiKey);

async function testModels() {
    const models = ['gemini-pro', 'gemini-1.5-pro', 'gemini-1.5-flash'];

    for (const modelName of models) {
        try {
            console.log(`\n Testing ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent('Say hello in one word');
            const response = await result.response;
            console.log(`✅ ${modelName} works! Response: ${response.text()}`);
            break; // Exit on first success
        } catch (error) {
            console.log(`❌ ${modelName} failed: ${error.message}`);
        }
    }
}

testModels();
