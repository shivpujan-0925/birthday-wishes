import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, KeyRound, Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { authApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginAdmin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await authApi.adminLogin(username, password);
      if (res.data.success) {
        loginAdmin(res.data.token);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card rounded-3xl p-8 sm:p-10 shadow-2xl border border-pink-200"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 hover:text-pink-700 mb-6 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Birthday Site</span>
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 font-serifTitle">Owner Dashboard</h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Manage photos, wishes & personal letter
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none text-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In as Admin'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Default login credentials: <span className="text-gray-600 font-semibold">admin</span> / <span className="text-gray-600 font-semibold">tanisha2026</span>
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
