import app from './app';
import { config } from './config/env';

const server = app.listen(Number(config.port), '0.0.0.0', () => {
    console.log(`Server running on port ${config.port}`);
});

// Increase timeout to 10 minutes for large imports (media decks)
server.setTimeout(600000);
