import express from 'express';
import path from 'path';
import cors from 'cors';
import authRoutes from './modules/auth/auth.controller';
import deckRoutes from './modules/decks/deck.controller';
import studyRoutes from './modules/study/study.controller';
import aiRoutes from './modules/ai/ai.controller';
import statsRoutes from './modules/stats/stats.controller';
import cardRoutes from './modules/cards/card.controller';
import importRoutes from './modules/import/import.controller'; // New module
import ankiwebRoutes from './modules/ankiweb/ankiweb.controller';
import { FSRSScheduler } from './modules/fsrs/scheduler';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'ankris-backend' });
});

app.use('/api/auth', authRoutes);
app.use('/decks', deckRoutes); // TODO: Move to /api/decks for consistency? Leaving as is for now.
app.use('/api/cards', cardRoutes); // New endpoint for Browser
app.use('/api', studyRoutes);
// Serve uploaded media files
// Serve uploaded media files - DEPRECATED: Using Supabase Storage now
// app.use('/media', express.static(path.join(process.cwd(), 'public/media')));
app.use('/api/ai', aiRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/import', importRoutes); // Registered import route
app.use('/api/ankiweb', ankiwebRoutes); // AnkiWeb Module

// Temporary FSRS Test Endpoint
app.post('/fsrs/next', (req, res) => {
    const { currentD, currentS, grade } = req.body;
    const scheduler = new FSRSScheduler();
    const result = scheduler.calculateNextState(currentD || 2.5, currentS || 1.0, grade, 1);
    res.json(result);
});

export default app;
