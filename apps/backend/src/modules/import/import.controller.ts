import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import * as ImportService from './import.service';
import { authenticateToken, AuthRequest } from '../../middleware/auth.middleware';

const router = Router();

const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    fileFilter: (req, file, cb) => {
        if (file.originalname.endsWith('.apkg') || file.originalname.endsWith('.zip')) {
            cb(null, true);
        } else {
            cb(new Error('Only .apkg files are allowed'));
        }
    }
});

router.use(authenticateToken);

router.post('/anki', upload.single('file'), async (req: any, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const userId = req.user!.userId;
        const filePath = req.file.path;

        console.log(`[Import] User ${userId} uploading ${filePath}`);

        const result = await ImportService.importAnkiDeck(userId, filePath);

        res.json({ status: 'success', ...result });

    } catch (error: any) {
        console.error("Import failed:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
