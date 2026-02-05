import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const BUCKET_NAME = 'ankris-media';

// Initialize Supabase Client with Service Role for backend access
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
    }
});

export class StorageService {
    private static instance: StorageService;

    private constructor() {
        if (!supabaseUrl || !supabaseKey) {
            console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
        }
    }

    public static getInstance(): StorageService {
        if (!StorageService.instance) {
            StorageService.instance = new StorageService();
        }
        return StorageService.instance;
    }

    /**
     * Uploads a file to Supabase Storage
     * @param filePath Local path to the file
     * @param destinationFileName Name to save as in the bucket
     * @param contentType MIME type
     */
    public async uploadFile(filePath: string, destinationFileName: string, contentType?: string): Promise<string> {
        try {
            const fileBuffer = fs.readFileSync(filePath);

            const { data, error } = await supabase
                .storage
                .from(BUCKET_NAME)
                .upload(destinationFileName, fileBuffer, {
                    contentType: contentType || 'application/octet-stream',
                    upsert: true
                });

            if (error) {
                throw error;
            }

            return this.getPublicUrl(destinationFileName);
        } catch (error) {
            console.error(`Failed to upload ${destinationFileName}:`, error);
            throw error;
        }
    }

    /**
     * Uploads a buffer directly
     */
    public async uploadBuffer(buffer: Buffer, destinationFileName: string, contentType?: string): Promise<string> {
        try {
            const { data, error } = await supabase
                .storage
                .from(BUCKET_NAME)
                .upload(destinationFileName, buffer, {
                    contentType: contentType || 'application/octet-stream',
                    upsert: true
                });

            if (error) {
                throw error;
            }

            return this.getPublicUrl(destinationFileName);
        } catch (error) {
            console.error(`Failed to upload buffer ${destinationFileName}:`, error);
            throw error;
        }
    }

    /**
     * Get the public URL for a file
     */
    public getPublicUrl(fileName: string): string {
        const { data } = supabase
            .storage
            .from(BUCKET_NAME)
            .getPublicUrl(fileName);

        return data.publicUrl;
    }
}
