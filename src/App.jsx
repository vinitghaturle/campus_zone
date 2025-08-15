import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import LostFound from './pages/LostFound';
import UploadDemo from './pages/UploadDemo';
import ProtectedRoute from './routes/ProtectedRoute';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Navigation />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" replace />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/lostfound"
            element={<ProtectedRoute><LostFound /></ProtectedRoute>}
          />
          <Route
            path="/events"
            element={<ProtectedRoute>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                <h2 className="text-2xl font-bold">Events Coming Soon</h2>
              </div>
            </ProtectedRoute>}
          />
          <Route
            path="/pyq"
            element={<ProtectedRoute>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                <h2 className="text-2xl font-bold">PYQ Zone Coming Soon</h2>
              </div>
            </ProtectedRoute>}
          />

          {/* Storage demo */}
          <Route
            path="/upload-demo"
            element={<ProtectedRoute><UploadDemo /></ProtectedRoute>}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {user && <Footer />}
    </div>
  );
}
