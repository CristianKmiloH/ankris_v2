import { Router } from 'express';
import * as NoteService from '../notes/note.service';
import * as CardService from '../cards/card.service';
import { authenticateToken, AuthRequest } from '../../middleware/auth.middleware';

const router = Router();
router.use(authenticateToken);

// --- NOTES ---
// --- CONFIG MULTER ---
import multer from 'multer';
import path from 'path';
import fs from 'fs';
const { StorageService } = require('../../services/storage.service');
const storageService = StorageService.getInstance();

// Use Memory Storage for Supabase Uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- NOTES ---
// modified to accept files
const cpUpload = upload.fields([{ name: 'media_front', maxCount: 4 }, { name: 'media_back', maxCount: 4 }]);

router.post('/notes', cpUpload, async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.userId;
        let { deckId, front, back } = req.body;

        // --- Process Files ---
        // Force strings (multer might make them something else if undefined)
        front = front || '';
        back = back || '';

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        if (files) {
            // Helper to process uploads
            const processFiles = async (fileList: Express.Multer.File[]) => {
                const processedTags: string[] = [];
                for (const file of fileList) {
                    console.log(`Processing file: ${file.originalname}, Size: ${file.size} bytes, Type: ${file.mimetype}`);

                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    const ext = path.extname(file.originalname);
                    const filename = `upload_${uniqueSuffix}${ext}`; // Consistent naming

                    // Upload Buffer to Supabase -> Returns Full Public URL
                    const publicUrl = await storageService.uploadBuffer(file.buffer, filename, file.mimetype);
                    console.log(`Uploaded to: ${publicUrl}`);

                    if (file.mimetype.startsWith('image/')) {
                        processedTags.push(`<br><img src="${publicUrl}">`);
                    } else if (file.mimetype.startsWith('audio/') || file.mimetype.startsWith('video/')) {
                        // Use full URL for sound tag as well. Frontend supports http/https src.
                        processedTags.push(` [sound:${publicUrl}]`);
                    }
                }
                return processedTags;
            };

            // Append Front Media
            if (files['media_front']) {
                const frontTags = await processFiles(files['media_front']);
                front += frontTags.join('');
            }
            // Append Back Media
            if (files['media_back']) {
                const backTags = await processFiles(files['media_back']);
                back += backTags.join('');
            }
        }

        let { noteType, ...otherFields } = req.body;

        // Fallback: Check Query Param if Body failed
        if (!noteType && req.query.noteType) {
            noteType = req.query.noteType;
        }

        console.log("Create Note Body:", { noteType, otherKeys: Object.keys(otherFields) });
        console.log("Files received:", Object.keys(files || {}));

        // Collect extra fields that are not standard (e.g. 'addReverse', 'extra')

        // Collect extra fields that are not standard (e.g. 'addReverse', 'extra')
        // We exclude standard fields that we already handled or extracted 
        const extraFields: Record<string, string> = {};
        Object.keys(otherFields).forEach(key => {
            if (['media_front', 'media_back', 'deckId', 'front', 'back', 'userId'].includes(key)) return;
            extraFields[key] = otherFields[key] as string;
        });

        // Also map standard fields if strategy needs them by specific names? 
        // Strategy expects 'Front', 'Back', etc. service layer handles mapping front/back args to those keys.
        // We just need to pass dynamic ones like 'Add Reverse'.

        // Check if we need to map 'addReverse' from body to 'Add Reverse' key expected by strategy?
        // Frontend likely sends 'addReverse'. Strategy expects 'Add Reverse'.
        if (extraFields['addReverse']) {
            extraFields['Add Reverse'] = extraFields['addReverse'];
        }
        if (extraFields['extra']) {
            extraFields['Extra'] = extraFields['extra'];
        }

        const result = await NoteService.createNote(userId, deckId, front, back, noteType as string, extraFields);
        res.json(result);
    } catch (error: any) {
        console.error("Create note error:", error);
        res.status(500).json({ error: error.message });
    }
});

// --- CARDS (STUDY) ---
router.get('/decks/:deckId/due', async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.userId;
        const deckId = req.params.deckId;
        const type = req.query.type as string; // 'standard', 'all' (cram), 'favorites'

        let cards;
        if (type === 'favorites') {
            cards = await CardService.getFavoriteCards(userId, deckId);
        } else if (type === 'all') {
            cards = await CardService.getCardsForStudy(userId, deckId);
        } else {
            // standard / due
            cards = await CardService.getDueCards(userId, deckId);
        }

        res.json(cards);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/custom-session', async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.userId;
        const { cardIds } = req.body;

        if (!cardIds || !Array.isArray(cardIds)) {
            return res.status(400).json({ error: "Invalid cardIds" });
        }

        const cards = await CardService.getCardsByIds(userId, cardIds);
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
