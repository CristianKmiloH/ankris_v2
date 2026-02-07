import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DeckList from './components/decks/DeckList';
import AddNote from './components/notes/AddNote';
import Study from './components/study/Study';
import Browser from './components/browser/Browser';
import Stats from './pages/Stats';
import Settings from './pages/Settings';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import './anki-types.css'; // Cloze, Type Answer, etc.

// NUCLEAR OPTION: Inject styles directly to bypass CSS file caching/bundling issues
const StrictStyles = () => (
  <style>{`
    /* ===== STRICT UTILITIES FOR ICON BUTTONS (INJECTED) ===== */
    .btn-icon-reset {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      padding: 0 !important;
      margin: 0 !important;
      min-width: 0 !important;
      width: auto !important;
      height: auto !important;
      border-radius: 0 !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      line-height: 1 !important;
    }
    .btn-icon-reset:hover {
      transform: none !important;
      filter: none !important;
    }
    .btn-icon-circular {
      border-radius: 50% !important;
      aspect-ratio: 1/1 !important;
      flex-shrink: 0 !important;
    }
    .size-20 { width: 20px !important; height: 20px !important; }
    .size-22 { width: 22px !important; height: 22px !important; }
    .size-24 { width: 24px !important; height: 24px !important; }
    
    .btn-remove-media {
      background-color: #ef4444 !important;
      color: white !important;
      box-shadow: 0 2px 4px rgba(0,0,0,0.5) !important;
      transition: transform 0.2s ease !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    .btn-remove-media:hover {
      background-color: #dc2626 !important;
      transform: scale(1.1) !important;
    }

    /* Eye Icon Fix */
    .btn-eye-toggle {
        position: absolute !important;
        right: 0px !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
        z-index: 10 !important;
        width: 40px !important;
        height: 100% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        color: var(--text-secondary) !important;
        background: transparent !important;
        min-width: 40px !important;
        padding: 0 !important;
        border: none !important;
        box-shadow: none !important;
    }
    .btn-eye-toggle:hover {
        color: var(--text-primary) !important;
        background: transparent !important;
        transform: translateY(-50%) !important;
    }
  `}</style>
);


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DeckList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/decks/:deckId/add"
        element={
          <ProtectedRoute>
            <AddNote />
          </ProtectedRoute>
        }
      />
      <Route
        path="/decks/:deckId/study"
        element={
          <ProtectedRoute>
            <Study />
          </ProtectedRoute>
        }
      />
      <Route
        path="/study"
        element={
          <ProtectedRoute>
            <Study />
          </ProtectedRoute>
        }
      />
      <Route
        path="/browser"
        element={
          <ProtectedRoute>
            <Browser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/stats"
        element={
          <ProtectedRoute>
            <Stats />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0A0A0A', // Deep dark theme
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999, // Above everything
      }}>
        <div className="splash-logo fade-in" style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: '900',
            color: '#EAEAEA',
            margin: 0,
            letterSpacing: '-0.02em',
            animation: 'pulse 2s infinite'
          }}>Ankris</h1>
          <p style={{
            color: '#00D9FF', // Cyan accent
            fontSize: '1.2rem',
            fontWeight: '600',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginTop: '10px'
          }}>Modern Learning</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div style={styles.appContainer}>
        <AppRoutes />
      </div>
    </Router>
  );
}

function App() {
  console.log('Rendering Full App');
  return (
    <SettingsProvider>
      <StrictStyles />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SettingsProvider>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  appContainer: {
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
    left: 0,
  },
};

export default App;
