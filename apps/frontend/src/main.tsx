import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('Mounting Main...');
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
