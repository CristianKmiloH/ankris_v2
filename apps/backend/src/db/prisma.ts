import { PrismaClient } from '../generated/client';

const getDatabaseUrl = () => {
    const url = process.env.DATABASE_URL;
    if (url && !url.includes('pgbouncer=true') && !url.includes('localhost')) {
        const separator = url.includes('?') ? '&' : '?';
        console.log('[DB] Appending pgbouncer=true to connection string for Render/Supabase compatibility.');
        return `${url}${separator}pgbouncer=true`;
    }
    return url;
};

export const prisma = new PrismaClient({
    datasources: {
        db: {
            url: getDatabaseUrl(),
        },
    },
});
