import jwt from 'jsonwebtoken';
import { config } from '../../config/env';
import { prisma } from '../../db/prisma';
import bcrypt from 'bcryptjs';

const hashPassword = async (p: string) => {
    return await bcrypt.hash(p, 10);
};

const verifyPassword = async (p: string, hash: string) => {
    return await bcrypt.compare(p, hash);
};

export const register = async (email: string, password: string, username: string) => {
    const normalizedEmail = email.toLowerCase().trim();

    const existing = await prisma.user.findUnique({
        where: { email: normalizedEmail }
    });

    if (existing) {
        console.log(`[AUTH] Register failed: User ${normalizedEmail} already exists`);
        throw new Error('User already exists');
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            email: normalizedEmail,
            passwordHash,
            username,
        }
    });

    console.log(`[AUTH] Registered new user: ${normalizedEmail}`);
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '7d' });

    // Return user without sensitive data
    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser, token };
};

export const login = async (email: string, password: string) => {
    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
        where: { email: normalizedEmail }
    });

    if (!user) {
        console.log(`[AUTH] Login failed: User ${normalizedEmail} not found`);
        throw new Error('Invalid credentials');
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
        console.log(`[AUTH] Login failed: Invalid password for ${normalizedEmail}`);
        throw new Error('Invalid credentials');
    }

    console.log(`[AUTH] User logged in: ${normalizedEmail}`);
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '7d' });

    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser, token };
};
