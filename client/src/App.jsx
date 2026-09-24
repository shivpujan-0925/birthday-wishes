import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MusicProvider } from './context/MusicContext';
import AmbientBackground from './components/AmbientBackground';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
  return (
    <AuthProvider>
      <MusicProvider>
        <BrowserRouter>
          <div className="relative min-h-screen text-gray-800">
            <AmbientBackground />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </BrowserRouter>
      </MusicProvider>
    </AuthProvider>
  );
}

export default App;

