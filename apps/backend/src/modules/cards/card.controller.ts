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

// --- CONFIG MULTER ---
import multer from 'multer';
import path from 'path';
const { StorageService } = require('../../services/storage.service');
const storageService = StorageService.getInstance();

// Use Memory Storage for Supabase Uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const cpUpload = upload.fields([
    { name: 'new_media_front', maxCount: 4 },
    { name: 'new_media_back', maxCount: 4 }
]);

// PATCH /api/cards/:id -> Update card
router.patch('/:id', cpUpload, async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.userId;
        const cardId = req.params.id;
        let { front, back } = req.body;

        // Force strings
        front = front || '';
        back = back || '';

        // --- Process New Files ---
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        if (files) {
            // Helper to process uploads
            const processFiles = async (fileList: Express.Multer.File[]) => {
                const processedTags: string[] = [];
                for (const file of fileList) {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    const ext = path.extname(file.originalname);
                    const filename = `up_edit_${uniqueSuffix}${ext}`;

                    // Upload Buffer to Supabase
                    await storageService.uploadBuffer(file.buffer, filename, file.mimetype);

                    if (file.mimetype.startsWith('image/')) {
                        processedTags.push(`<br><img src="${filename}">`);
                    } else if (file.mimetype.startsWith('audio/') || file.mimetype.startsWith('video/')) {
                        processedTags.push(` [sound:${filename}]`);
                    }
                }
                return processedTags;
            };

            // Append Front Media
            if (files['new_media_front']) {
                const tags = await processFiles(files['new_media_front']);
                front += tags.join('');
            }
            // Append Back Media
            if (files['new_media_back']) {
                const tags = await processFiles(files['new_media_back']);
                back += tags.join('');
            }
        }

        const updates = { front, back };
        const updatedCard = await CardService.updateCard(userId, cardId, updates);
        res.json(updatedCard);
    } catch (error: any) {
        console.error("Update card error:", error);
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

// PUT /api/cards/:id/favorite -> Toggle favorite status
router.put('/:id/favorite', async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.userId;
        const cardId = req.params.id;
        const updatedCard = await CardService.toggleFavorite(userId, cardId);
        res.json(updatedCard);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
