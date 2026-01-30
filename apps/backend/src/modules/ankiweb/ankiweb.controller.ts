import { Request, Response, Router } from 'express';
import { searchDecks, downloadDeck } from './ankiweb.service';
import { importAnkiDeck, importDemoDeck } from '../import/import.service';
import { authenticateToken, AuthRequest } from '../../middleware/auth.middleware';
import fs from 'fs';

const router = Router();

export const search = async (req: Request, res: Response) => {
    try {
        const query = req.query.q as string;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter "q" is required' });
        }

        const results = await searchDecks(query);
        res.json(results);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Failed to search decks' });
    }
};

export const download = async (req: Request, res: Response) => {
    try {
        const { deckId } = req.body;
        // Check if user is attached to req (middleware)
        // Check if user is attached to req (middleware)
        // JWT payload uses 'userId', not 'id'
        const userId = (req as any).user?.userId || 'default_user';

        if (!deckId) {
            return res.status(400).json({ error: 'Deck ID is required' });
        }

        console.log(`[Controller] Download request for deckId: ${deckId}, userId: ${userId}`);

        // 1. Download to temp
        const filePath = await downloadDeck(deckId); // Direct call

        // 2. Import
        if (filePath.startsWith('DEMO:')) {
            await importDemoDeck(userId, filePath.split(':')[1]);
        } else {
            await importAnkiDeck(userId, filePath);

            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            } catch (e) {
                console.warn('Failed to delete temp apkg:', e);
            }
        }

        res.json({ success: true, message: 'Deck imported successfully' });

    } catch (error: any) {
        console.error('AnkiWeb Controller Error:', error);

        if (error.message === 'INVALID_DECK') {
            return res.status(422).json({
                error: 'REPOSITORY_NOT_A_DECK',
                message: 'The selected GitHub repository does not contain a valid Anki deck (collection.anki2 or .apkg not found).'
            });
        }

        res.status(500).json({ error: 'Failed to import deck from AnkiWeb' });
    }
};

// Apply authentication middleware
router.use(authenticateToken);

// Define routes
router.get('/search', search);
router.post('/download', download);

export default router;
