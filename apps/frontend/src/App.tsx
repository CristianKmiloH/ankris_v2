import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
