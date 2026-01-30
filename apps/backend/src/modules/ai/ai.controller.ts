import { Router } from 'express';
import { generateCardsFromText } from './ai.service';
import { authenticateToken, AuthRequest } from '../../middleware/auth.middleware';

const router = Router();
router.use(authenticateToken);

router.post('/generate', async (req: AuthRequest, res) => {
    try {
        const { text, language = 'en' } = req.body;
        if (!text) return res.status(400).json({ error: 'Text is required' });

        const cards = await generateCardsFromText(text, language);
        res.json(cards);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
