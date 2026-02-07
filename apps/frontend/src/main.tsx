import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css' // MOVED to bottom for priority override

// Cache Buster: Strict UI Overrides applied
console.log('Mounting Main (Strict UI Patch v2)...');
const root = createRoot(document.getElementById('root')!);
try {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('Render call successful');
} catch (e) {
  console.error('Fatal Error:', e);
  root.render(<div style={{ color: 'red', padding: '20px' }}>Fatal Error: {String(e)}</div>);
}
