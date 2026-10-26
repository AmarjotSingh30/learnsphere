// frontend/src/pages/CreateCourse.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { ArrowLeft, ArrowRight, AlertCircle, BookOpen } from 'lucide-react';

export default function CreateCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Ensure we are sending the correct payload
      await api.post('/courses', { title, description, category });
      // Force a hard navigation back to dashboard to refresh data
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      
      {/* Top Navbar */}
      <header className="bg-[#09090b] text-white border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <Link to="/dashboard" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 font-bold text-sm uppercase tracking-widest">
            <ArrowLeft size={16} /> Cancel
          </Link>
          <div className="flex items-center gap-2 text-white w-fit">
            <BookOpen size={20} className="text-primary-500" />
            <span className="text-lg font-extrabold tracking-tight">Learn<span className="text-primary-500">Sphere</span></span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-2xl bg-white border border-zinc-200 p-8 md:p-12 rounded-none shadow-[8px_8px_0px_0px_rgba(9,9,11,1)]">
          
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 text-[#09090b] text-xs font-bold uppercase tracking-widest mb-4">
              Curriculum Builder
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#09090b] tracking-tight">
              Create a new course.
            </h1>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-500 text-red-900 p-4 mb-8 flex items-start gap-3 rounded-none font-bold">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-xs font-extrabold text-[#09090b] mb-2 uppercase tracking-widest">Course Title</label>
              <input 
                type="text" 
                required 
                className="w-full bg-white border-2 border-zinc-300 p-4 text-[#09090b] placeholder-zinc-400 rounded-none focus:outline-none focus:border-[#09090b] transition-colors font-bold"
                placeholder="e.g. Advanced React Patterns"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-xs font-extrabold text-[#09090b] mb-2 uppercase tracking-widest">Description</label>
              <textarea 
                required 
                rows="4"
                className="w-full bg-white border-2 border-zinc-300 p-4 text-[#09090b] placeholder-zinc-400 rounded-none focus:outline-none focus:border-[#09090b] transition-colors font-medium resize-none"
                placeholder="What will students learn in this course?"
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#09090b] mb-2 uppercase tracking-widest">Category</label>
              <select 
                className="w-full bg-white border-2 border-zinc-300 p-4 text-[#09090b] rounded-none focus:outline-none focus:border-[#09090b] transition-colors font-bold cursor-pointer"
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Web Development">Web Development</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Data Science">Data Science</option>
                <option value="Design">Design</option>
              </select>
            </div>

            <div className="pt-6 border-t border-zinc-200 mt-2">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary-500 text-white font-extrabold text-lg py-4 rounded-none hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 disabled:bg-primary-300"
              >
                {loading ? 'Initializing Course...' : 'Create Course'}
                {!loading && <ArrowRight size={20} />}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}