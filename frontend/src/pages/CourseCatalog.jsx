// frontend/src/pages/CourseCatalog.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Search, BookOpen, ArrowRight, User, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CourseCatalog() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/courses');
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = ['All', ...new Set(courses.map(c => c.category))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <div className="text-[#09090b] font-extrabold uppercase tracking-widest animate-pulse">Loading Catalog...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-primary-500 selection:text-white font-sans flex flex-col">
      
      {/* Brutalist Header */}
      <header className="bg-[#09090b] text-white py-20 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">
              <LayoutGrid size={14} /> Global Catalog
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Explore the <span className="text-primary-500">curriculum.</span>
            </h1>
            <p className="text-xl text-zinc-400 font-medium">
              Production-grade courses engineered by industry veterans.
            </p>
          </div>
        </div>
      </header>

      {/* Search & Filter Bar */}
      <div className="border-b-2 border-zinc-200 bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <input 
                type="text" 
                placeholder="Search for skills, topics, or courses..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-50 border-2 border-zinc-200 pl-12 pr-4 py-4 font-bold text-[#09090b] placeholder-zinc-400 focus:outline-none focus:border-[#09090b] transition-colors rounded-none"
              />
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 font-extrabold text-sm uppercase tracking-widest whitespace-nowrap transition-colors border-2 rounded-none ${
                    activeCategory === cat 
                      ? 'bg-[#09090b] text-white border-[#09090b]' 
                      : 'bg-white text-zinc-500 border-zinc-200 hover:border-[#09090b] hover:text-[#09090b]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-32 border-2 border-dashed border-zinc-300">
            <BookOpen size={48} className="mx-auto text-zinc-300 mb-6" />
            <h3 className="text-2xl font-extrabold text-[#09090b] mb-2">No Courses Found</h3>
            <p className="text-zinc-500 font-medium">Try adjusting your search terms or category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={course._id} 
                className="bg-white border-2 border-zinc-200 flex flex-col group rounded-none hover:border-[#09090b] transition-colors shadow-[8px_8px_0px_0px_rgba(228,228,231,1)] hover:shadow-[8px_8px_0px_0px_rgba(9,9,11,1)]"
              >
                {/* Card Top: Category & Modules */}
                <div className="p-6 border-b-2 border-zinc-100 flex justify-between items-center bg-zinc-50">
                  <span className="text-xs font-black text-primary-500 uppercase tracking-widest">{course.category}</span>
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{course.lessons?.length || 0} Modules</span>
                </div>
                
                {/* Card Body */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-extrabold text-[#09090b] leading-tight mb-4 group-hover:text-primary-500 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-zinc-500 font-medium mb-6 line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-3 pt-6 border-t border-zinc-100">
                    <div className="w-10 h-10 bg-[#09090b] text-white flex items-center justify-center font-bold text-lg rounded-none">
                      {course.instructor?.name?.charAt(0) || <User size={20} />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Instructor</p>
                      <p className="font-extrabold text-[#09090b] text-sm">{course.instructor?.name || 'Unknown'}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Link 
                  to={`/course/${course._id}`}
                  className="w-full bg-[#09090b] text-white py-4 font-extrabold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-primary-500 transition-colors group-hover:gap-4"
                >
                  View Curriculum <ArrowRight size={18} className="transition-all" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}