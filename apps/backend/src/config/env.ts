import dotenv from 'dotenv';
import path from 'path';

// Load .env from project root or backend root
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
// Also try local .env
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET || 'super-secret-key',
    groqKey: process.env.GROQ_API_KEY
};
