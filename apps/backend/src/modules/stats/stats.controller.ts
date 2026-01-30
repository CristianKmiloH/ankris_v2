import { Router } from 'express';
import { getUserStats } from './stats.service';
import { authenticateToken, AuthRequest } from '../../middleware/auth.middleware';

const router = Router();
router.use(authenticateToken);

router.get('/user', async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.userId;
        const stats = await getUserStats(userId);
        res.json(stats);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
