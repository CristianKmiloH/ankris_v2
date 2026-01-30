import { Router } from 'express';
import * as NoteService from '../notes/note.service';
import * as CardService from '../cards/card.service';
import { authenticateToken, AuthRequest } from '../../middleware/auth.middleware';

const router = Router();
router.use(authenticateToken);

// --- NOTES ---
router.post('/notes', async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.userId;
        const { deckId, front, back } = req.body;
        const result = await NoteService.createNote(userId, deckId, front, back);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// --- CARDS (STUDY) ---
router.get('/decks/:deckId/due', async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.userId;
        const type = req.query.type as string;

        // If type is 'all', return all cards sorted by due date for study
        const cards = type === 'all'
            ? await CardService.getCardsForStudy(userId, req.params.deckId)
            : await CardService.getDueCards(userId, req.params.deckId);

        res.json(cards);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/cards/:cardId/answer', async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.userId;
        const { grade } = req.body; // 1, 2, 3, 4
        const card = await CardService.answerCard(userId, req.params.cardId, grade);
        res.json(card);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
