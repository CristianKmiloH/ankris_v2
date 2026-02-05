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

// Ensure media directory exists
const mediaDir = path.join(process.cwd(), 'public/media');
if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, mediaDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `import_${uniqueSuffix}${ext}`);
    }
});

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
            // Append Front Media
            if (files['media_front']) {
                files['media_front'].forEach(file => {
                    if (file.mimetype.startsWith('image/')) {
                        front += `<br><img src="${file.filename}">`;
                    } else if (file.mimetype.startsWith('audio/') || file.mimetype.startsWith('video/')) {
                        // Anki sound/video tag
                        front += ` [sound:${file.filename}]`;
                    }
                });
            }
            // Append Back Media
            if (files['media_back']) {
                files['media_back'].forEach(file => {
                    if (file.mimetype.startsWith('image/')) {
                        back += `<br><img src="${file.filename}">`;
                    } else if (file.mimetype.startsWith('audio/') || file.mimetype.startsWith('video/')) {
                        back += ` [sound:${file.filename}]`;
                    }
                });
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
