import { Router } from 'express';
import * as AuthService from './auth.service';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const result = await AuthService.register(email, password, username);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.login(email, password);
        res.json(result);
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
});

export default router;
