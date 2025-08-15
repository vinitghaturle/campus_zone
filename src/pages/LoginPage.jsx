import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login, signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === 'signup') {
        await signup(email, password, name || 'User');
      } else {
        await login(email, password);
      }
      navigate(from, { replace: true });
    } catch (err) {
      alert(err?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail('demo@example.com');
    setPassword('Demo@12345');
    setName('Demo User');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-blue-600 rounded-lg p-3 mb-4">
              <div className="w-8 h-8 bg-white rounded opacity-90"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to CampusZone</h2>
          <p className="text-gray-600">Sign {mode === 'login' ? 'in' : 'up'} to continue</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800 mb-2"><strong>Demo:</strong> Click to autofill</p>
            <button type="button" onClick={fillDemo} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Use Demo → 
            </button>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text" value={name} onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com" required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 pr-12"
                placeholder="••••••••" required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit" disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? (mode === 'login' ? 'Signing In…' : 'Creating…') : (mode === 'login' ? 'Sign In' : 'Sign Up')}
          </button>

          <div className="text-center text-sm">
            {mode === 'login' ? (
              <button type="button" className="text-blue-600" onClick={() => setMode('signup')}>
                Create an account
              </button>
            ) : (
              <button type="button" className="text-blue-600" onClick={() => setMode('login')}>
                Have an account? Sign in
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}