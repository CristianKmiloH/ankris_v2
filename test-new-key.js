const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = 'AIzaSyBqQze0rMIf6J2JLm0TfXqSJK14I_OSZLI';
const genAI = new GoogleGenerativeAI(apiKey);

async function testAPI() {
    try {
        console.log('Testing new API key with gemini-pro...');
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent('Generate 2 flashcards about photosynthesis in JSON format: [{"front":"question","back":"answer"}]');
        const response = await result.response;
        console.log('\n✅ SUCCESS! Response:');
        console.log(response.text());
    } catch (error) {
        console.log('\n❌ FAILED:', error.message);
        console.log('Full error:', error);
    }
}

testAPI();
