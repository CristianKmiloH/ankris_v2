import axios from 'axios';

export interface AnkiWebDeck {
    id: string;
    title: string;
    noteCount: number;
    repo?: string;         // GitHub repository name
    stars?: number;        // GitHub stars count
    downloadUrl?: string;  // Direct download URL
    thumbnailUrl?: string;
    updatedAt?: string;
}

export const searchDecks = async (query: string): Promise<AnkiWebDeck[]> => {
    try {
        // Use GitHub API to find repositories related to the query + "anki"
        // This avoids scraping AnkiWeb directly which has strict protections.
        const githubQuery = `${query} anki`;
        const searchUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(githubQuery)}&sort=stars&order=desc`;

        console.log(`[AnkiWeb Service] Searching GitHub: ${searchUrl}`);

        const { data } = await axios.get(searchUrl, {
            headers: {
                // User-Agent is required by GitHub API
                'User-Agent': 'Ankris-App',
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const decks: AnkiWebDeck[] = [];

        if (data && data.items) {
            for (const item of data.items) {
                // Filter out obviously non-deck repos if possible, but generally trust the search
                // GitHub items provide: name, full_name, description, html_url, stargazers_count

                // Construct a standardized deck object
                decks.push({
                    id: `github:${item.full_name}`, // Unique ID based on repo
                    title: item.name.replace(/[-_]/g, ' ').replace(/\banki\b/gi, '').trim() || item.name, // Clean title
                    repo: item.full_name,
                    noteCount: 0, // GitHub API doesn't give this, use 0 or estimate
                    stars: item.stargazers_count,
                    downloadUrl: item.html_url, // Link to repo for now, logic will handle download
                    updatedAt: item.updated_at
                });
            }
        }

        return decks;

    } catch (error) {
        console.error('Error searching GitHub for decks:', error);
        return [];
    }
};

export const getDeckDownloadUrl = async (id: string): Promise<string | null> => {
    // ID format: "github:username/repo"
    if (!id.startsWith('github:')) return null;

    // For GitHub, we just return the repo URL or a specific release URL if we wanted to be fancy.
    // The frontend logic usually handles "is it a github url? open it".
    const repoPath = id.replace('github:', '');
    // Request ZIP archive of the repo (works for "downloading" the codebase)
    return `https://api.github.com/repos/${repoPath}/zipball`;
};

import path from 'path';
import fs from 'fs';

export const downloadDeck = async (id: string): Promise<string> => {
    // 1. Get URL
    const url = await getDeckDownloadUrl(id);
    if (!url) throw new Error('Invalid deck ID');

    console.log(`[AnkiWeb Service] Downloading from: ${url}`);

    // 2. Download file
    // Note: GitHub URLs for files are tricky. If it's a blob url "github.com/user/repo/blob/..." 
    // we need "raw=true" or "raw.githubusercontent.com".
    // For now, let's assume the user will be redirected or we try to append ?raw=true if it looks like a blob.

    let downloadUrl = url;
    if (url.includes('/blob/') && !url.includes('raw=true')) {
        downloadUrl += '?raw=true';
    }

    const tempDir = path.join(process.cwd(), '.tmp');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    const fileName = `anki_import_${Date.now()}.apkg`;
    const filePath = path.join(tempDir, fileName);

    const response = await axios({
        url: downloadUrl,
        method: 'GET',
        responseType: 'stream',
        headers: { 'User-Agent': 'Ankris-App' },
        validateStatus: () => true // Handle errors manually
    });

    // 4. Download file
    const response = await axios({
        url: downloadUrl,
        method: 'GET',
        responseType: 'stream',
        headers: { 'User-Agent': 'Ankris-App' },
        validateStatus: () => true // Handle errors manually
    });

    const log = (msg: string) => console.log(`[AnkiWeb Service] ${new Date().toISOString()} ${msg}`);

    log(`Downloading from: ${downloadUrl}`);
    log(`Response Status: ${response.status}`);
    log(`Response Headers: ${JSON.stringify(response.headers)}`);

    if (response.status !== 200) {
        log(`Download failed with status ${response.status}`);
        // Read stream to get error message if possible
        const errMsg = await new Promise<string>(resolve => {
            let data = '';
            response.data.on('data', (chunk: any) => data += chunk.toString());
            response.data.on('end', () => resolve(data.substring(0, 200))); // Limit length
        });
        log(`Error Body: ${errMsg}`);
        throw new Error(`Download failed: ${response.status}`);
    }

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', () => {
            log(`Download complete: ${filePath}, Size: ${fs.statSync(filePath).size}`);
            resolve(filePath);
        });
        writer.on('error', (err) => {
            log(`Download write error: ${err.message}`);
            reject(err);
        });
    });
};
