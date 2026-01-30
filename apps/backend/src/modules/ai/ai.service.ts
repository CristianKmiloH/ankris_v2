import Groq from 'groq-sdk';
import { config } from '../../config/env';

// Initialize Groq (FREE AI API)
// Get your free API key at: https://console.groq.com
const groq = config.groqKey ? new Groq({ apiKey: config.groqKey }) : null;

export const generateCardsFromText = async (text: string, language: string = 'en') => {
    if (!groq) {
        console.warn("Groq API Key missing. Returning Mock Data.");
        return mockGeneration(text, language);
    }

    try {
        // Detect if input is a topic (short) or long text
        const isShortTopic = text.length < 100;

        const languageInstruction = language === 'es'
            ? 'Generate all questions and answers in Spanish language.'
            : 'Generate all questions and answers in English language.';

        const prompt = isShortTopic
            ? `Generate 5-8 educational flashcards about: "${text}"
               
               ${languageInstruction}
               
               Return ONLY a JSON array with this structure:
               [{"front": "Question here?", "back": "Answer here"}]
               
               Make questions clear and answers concise. Focus on key concepts.`
            : `Extract 5-8 key concepts from this text and create flashcards:
               
               "${text.substring(0, 5000)}"
               
               ${languageInstruction}
               
               Return ONLY a JSON array with this structure:
               [{"front": "Question here?", "back": "Answer here"}]`;

        const completion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama-3.3-70b-versatile', // Updated active model
            temperature: 0.7,
            max_tokens: 1024,
            response_format: { type: 'json_object' }
        });

        const response = completion.choices[0]?.message?.content;
        if (!response) throw new Error('No response from Groq');

        // Parse JSON response
        const parsed = JSON.parse(response);
        // Groq might return {cards: [...]} or just [...]
        return Array.isArray(parsed) ? parsed : (parsed.cards || parsed.flashcards || []);

    } catch (error) {
        console.error("Groq Generation Failed:", error);
        return mockGeneration(text, language);
    }
};

const mockGeneration = (text: string, language: string = 'en') => {
    if (language === 'es') {
        return [
            { front: "¿Cuál es el tema principal?", back: text.substring(0, 50) + "..." },
            { front: "Concepto Simulado 1", back: "Esta es una definición generada para pruebas." },
            { front: "Concepto Simulado 2", back: "Otra tarjeta generada por IA (Simulada)." }
        ];
    }
    return [
        { front: "What is the main topic?", back: text.substring(0, 50) + "..." },
        { front: "Mock Concept 1", back: "This is a generated definition for testing." },
        { front: "Mock Concept 2", back: "Another AI generated card (Mocked)." }
    ];
};
