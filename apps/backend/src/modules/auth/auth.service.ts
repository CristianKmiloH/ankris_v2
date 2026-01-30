import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { config } from '../../config/env';

// PERSISTENT MOCK USER STORE
// Resolve path relative to this file to ensure consistency regardless of CWD
// src/modules/auth/auth.service.ts -> ../../../ -> src -> ../ -> backend
const BACKEND_ROOT = path.resolve(__dirname, '../../../');
const DATA_DIR = path.join(BACKEND_ROOT, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

console.log(`[AUTH] User persistence file: ${USERS_FILE}`);

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Load users helper
const loadUsers = (): any[] => {
    if (!fs.existsSync(USERS_FILE)) return [];
    try {
        return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    } catch (e) {
        console.error('[AUTH] Failed to load users file', e);
        return [];
    }
};

// Save users helper
const saveUsers = (users: any[]) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    } catch (e) {
        console.error('[AUTH] Failed to save users file', e);
    }
};

const hashPassword = (p: string) => p;
const verifyPassword = (p: string, hash: string) => p === hash;

export const register = async (email: string, password: string, username: string) => {
    const normalizedEmail = email.toLowerCase().trim();
    const users = loadUsers();

    const existing = users.find(u => u.email === normalizedEmail);
    if (existing) {
        console.log(`[AUTH] Register failed: User ${normalizedEmail} already exists`);
        throw new Error('User already exists');
    }

    const user = {
        id: Math.random().toString(36).substring(7),
        email: normalizedEmail,
        passwordHash: hashPassword(password),
        username,
    };
    users.push(user);
    saveUsers(users);

    console.log(`[AUTH] Registered new user: ${normalizedEmail}`);
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '7d' });
    return { user, token };
};

export const login = async (email: string, password: string) => {
    const normalizedEmail = email.toLowerCase().trim();
    const users = loadUsers();

    const user = users.find(u => u.email === normalizedEmail);
    if (!user) {
        console.log(`[AUTH] Login failed: User ${normalizedEmail} not found`);
        throw new Error('Invalid credentials');
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
        console.log(`[AUTH] Login failed: Invalid password for ${normalizedEmail}`);
        throw new Error('Invalid credentials');
    }

    console.log(`[AUTH] User logged in: ${normalizedEmail}`);
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '7d' });
    return { user, token };
};
