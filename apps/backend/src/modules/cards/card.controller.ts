import { Router } from 'express';
import { authenticateToken, AuthRequest } from '../../middleware/auth.middleware';
import * as CardService from './card.service';

const router = Router();
router.use(authenticateToken);

// GET /api/cards -> Get all cards for the user (for Browser)
router.get('/', async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.userId;
        const cards = await CardService.getAllCards(userId);
        res.json(cards);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// PATCH /api/cards/:id -> Update card
router.patch('/:id', async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.userId;
        const cardId = req.params.id;
        const updates = req.body;
        const updatedCard = await CardService.updateCard(userId, cardId, updates);
        res.json(updatedCard);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/cards/:id -> Delete card
router.delete('/:id', async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.userId;
        const cardId = req.params.id;
        await CardService.deleteCard(userId, cardId);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
