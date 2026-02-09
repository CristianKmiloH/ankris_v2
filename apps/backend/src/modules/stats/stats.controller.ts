import { Router } from 'express';
import { getUserStats, getStudyHistory } from './stats.service';
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

router.get('/history', async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.userId;
        const { start, end } = req.query;

        const startDate = start ? new Date(start as string) : new Date(new Date().setDate(new Date().getDate() - 30));
        const endDate = end ? new Date(end as string) : new Date();

        const history = await getStudyHistory(userId, startDate, endDate);
        res.json(history);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
