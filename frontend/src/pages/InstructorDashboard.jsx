// frontend/src/pages/InstructorDashboard.jsx
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Settings, Users, BookOpen, ArrowRight, Plus } from 'lucide-react';

export default function InstructorDashboard() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/courses');
        const myCourses = data.filter(course => course.instructor._id === user._id);
        setCourses(myCourses);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [user._id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <div className="text-[#09090b] font-extrabold uppercase tracking-widest animate-pulse">Loading Command Center...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-primary-500 selection:text-white font-sans py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 border-b border-zinc-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 text-[#09090b] text-xs font-bold uppercase tracking-widest mb-4">
              Instructor Command Center
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#09090b] tracking-tight">
              Manage your <span className="text-primary-500">curriculum.</span>
            </h1>
          </div>
          <Link to="/create-course" className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 font-bold hover:bg-primary-600 transition-colors rounded-none shadow-[0_0_20px_rgba(255,79,0,0.3)]">
            <Plus size={18} /> New Course
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#09090b] border border-[#09090b] p-8 rounded-none text-white">
            <BookOpen size={24} className="text-primary-500 mb-4" />
            <div className="text-4xl font-black mb-1">{courses.length}</div>
            <div className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Published Courses</div>
          </div>
          <div className="bg-white border border-zinc-200 p-8 rounded-none">
            <Users size={24} className="text-primary-500 mb-4" />
            <div className="text-4xl font-black text-[#09090b] mb-1">--</div>
            <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Total Students</div>
          </div>
          <div className="bg-white border border-zinc-200 p-8 rounded-none">
            <Settings size={24} className="text-primary-500 mb-4" />
            <div className="text-4xl font-black text-[#09090b] mb-1">Active</div>
            <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest">System Status</div>
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-[#09090b] mb-6 tracking-tight">Your Courses</h2>

        {courses.length === 0 ? (
          <div className="bg-white border border-zinc-200 p-12 text-center rounded-none">
            <p className="text-zinc-500 font-medium mb-4">You haven't created any courses yet.</p>
            <Link to="/create-course" className="text-primary-600 font-bold hover:text-primary-700 transition-colors">Create your first course &rarr;</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div key={course._id} className="bg-white border border-zinc-200 hover:border-[#09090b] transition-colors p-6 rounded-none flex flex-col group">
                <div className="flex-grow mb-6">
                  <div className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-2">
                    {course.category}
                  </div>
                  <h3 className="text-xl font-bold text-[#09090b] leading-tight mb-2">{course.title}</h3>
                  <p className="text-zinc-500 text-sm line-clamp-3">{course.description}</p>
                </div>
                
                <div className="pt-4 border-t border-zinc-100 flex justify-between items-center mt-auto">
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    {course.lessons?.length || 0} Modules
                  </div>
                  <Link 
                    to={`/manage-course/${course._id}`}
                    className="inline-flex items-center gap-1 text-[#09090b] font-extrabold text-sm hover:text-primary-500 transition-colors group-hover:underline underline-offset-4"
                  >
                    Manage Content <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}