import { Router } from 'express';
import * as DeckService from './deck.service';
import { authenticateToken, AuthRequest } from '../../middleware/auth.middleware';

const router = Router();

// Apply auth middleware to all routes
router.use(authenticateToken);

router.post('/', async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.userId;
        const { name, description, parentId } = req.body;
        const deck = await DeckService.createDeck(userId, name, description, parentId);
        res.json(deck);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.userId;
        const decks = await DeckService.getDecks(userId);
        res.json(decks);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.userId;
        const deck = await DeckService.getDeckById(userId, req.params.id);
        if (!deck) return res.status(404).json({ error: "Deck not found" });
        res.json(deck);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Update a deck
router.put('/:id', async (req: AuthRequest, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const { name, description } = req.body;
        const deckId = req.params.id;

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const updatedDeck = await DeckService.updateDeck(userId, deckId, name, description);
        if (!updatedDeck) {
            return res.status(404).json({ error: 'Deck not found' });
        }
        res.json(updatedDeck);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update deck' });
    }
});

// Delete a deck
router.delete('/:id', async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.userId;
        const success = await DeckService.deleteDeck(userId, req.params.id);
        if (!success) return res.status(404).json({ error: "Deck not found" });
        res.json({ message: "Deck deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
