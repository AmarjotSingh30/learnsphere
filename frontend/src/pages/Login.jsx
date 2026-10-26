// frontend/src/pages/Login.jsx
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex selection:bg-primary-500 selection:text-white font-sans bg-[#fafafa]">
      
      {/* Left Panel: Manifesto (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-[#09090b] relative flex-col justify-between p-12 overflow-hidden border-r border-zinc-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-10 grayscale"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent"></div>
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 text-white w-fit hover:opacity-80 transition-opacity">
            <BookOpen size={28} className="text-primary-500" />
            <span className="text-2xl font-extrabold tracking-tight">Learn<span className="text-primary-500">Sphere</span></span>
          </Link>
        </div>
        
        <div className="relative z-10 mb-10">
          <h2 className="text-5xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
            Welcome back to <br />
            <span className="text-primary-500">deep work.</span>
          </h2>
          <p className="text-zinc-400 text-xl max-w-md font-medium">
            Pick up right where you left off. Your next milestone is waiting.
          </p>
        </div>
      </div>

      {/* Right Panel: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-10 flex items-center gap-2 text-[#09090b]">
            <BookOpen size={28} className="text-primary-500" />
            <span className="text-2xl font-extrabold tracking-tight">Learn<span className="text-primary-500">Sphere</span></span>
          </div>

          <h1 className="text-3xl font-extrabold text-[#09090b] mb-2 tracking-tight">Sign In</h1>
          <p className="text-zinc-500 font-medium mb-8">Enter your credentials to access your dashboard.</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 mb-6 flex items-start gap-3 rounded-none">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <span className="font-bold text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-xs font-extrabold text-[#09090b] mb-2 uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                required 
                className="w-full bg-white border border-zinc-300 p-4 text-[#09090b] placeholder-zinc-400 rounded-none focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-medium"
                placeholder="you@example.com"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-extrabold text-[#09090b] uppercase tracking-widest">Password</label>
                <a href="#" className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors">Forgot?</a>
              </div>
              <input 
                type="password" 
                required 
                className="w-full bg-white border border-zinc-300 p-4 text-[#09090b] placeholder-zinc-400 rounded-none focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-medium"
                placeholder="••••••••"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary-500 text-white font-extrabold text-lg py-4 rounded-none hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 mt-4 disabled:bg-primary-300"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-zinc-500 font-medium">
              Don't have an account? <Link to="/register" className="text-[#09090b] font-extrabold border-b-2 border-primary-500 hover:text-primary-600 transition-colors pb-0.5">Create one</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}