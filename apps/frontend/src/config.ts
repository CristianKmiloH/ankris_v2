export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? 'https://ankris-backend.onrender.com' : 'http://localhost:3000');
export const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL || (import.meta.env.PROD ? 'https://ankris-backend.onrender.com/media' : 'https://pcllehkuuhczbywtgefh.supabase.co/storage/v1/object/public/ankris-media');
