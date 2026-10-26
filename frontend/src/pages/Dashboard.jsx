// frontend/src/pages/Dashboard.jsx
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Play, CheckCircle, Clock, BookOpen, ArrowRight, Award } from 'lucide-react';
import InstructorDashboard from './InstructorDashboard';
import { downloadCertificate } from '../utils/generateCertificate'; // NEW IMPORT

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'Instructor') {
      setLoading(false);
      return;
    }

    const fetchEnrollments = async () => {
      try {
        const { data } = await api.get('/enrollments');
        setEnrollments(data);
      } catch (error) {
        console.error("Failed to fetch enrollments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, [user]);

  if (user?.role === 'Instructor') {
    return <InstructorDashboard />;
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <div className="text-[#09090b] font-extrabold uppercase tracking-widest animate-pulse">Initializing Workspace...</div>
    </div>
  );

  const activeCourses = enrollments.filter(e => e.progressPercentage < 100);
  const completedCourses = enrollments.filter(e => e.progressPercentage === 100);

  // Handler for the Certificate Download button
  const handleDownloadCertificate = (courseTitle) => {
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    downloadCertificate(user.name, courseTitle, today);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-primary-500 selection:text-white font-sans py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 border-b border-zinc-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 text-[#09090b] text-xs font-bold uppercase tracking-widest mb-4">
              Student Workspace
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#09090b] tracking-tight">
              Welcome back, <span className="text-primary-500">{user.name.split(' ')[0]}</span>.
            </h1>
          </div>
          <Link to="/catalog" className="inline-flex items-center gap-2 bg-[#09090b] text-white px-6 py-3 font-bold hover:bg-zinc-800 transition-colors rounded-none">
            Browse Catalog <ArrowRight size={18} />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white border border-zinc-200 p-8 rounded-none">
            <BookOpen size={24} className="text-primary-500 mb-4" />
            <div className="text-4xl font-black text-[#09090b] mb-1">{enrollments.length}</div>
            <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Total Enrollments</div>
          </div>
          <div className="bg-white border border-zinc-200 p-8 rounded-none">
            <Clock size={24} className="text-primary-500 mb-4" />
            <div className="text-4xl font-black text-[#09090b] mb-1">{activeCourses.length}</div>
            <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest">In Progress</div>
          </div>
          <div className="bg-[#09090b] border border-[#09090b] p-8 rounded-none text-white">
            <CheckCircle size={24} className="text-primary-500 mb-4" />
            <div className="text-4xl font-black mb-1">{completedCourses.length}</div>
            <div className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Completed</div>
          </div>
        </div>

        {/* ACTIVE COURSES SECTION */}
        <h2 className="text-2xl font-extrabold text-[#09090b] mb-6 tracking-tight">Active Learning</h2>
        
        {activeCourses.length === 0 ? (
          <div className="bg-white border border-zinc-200 p-12 text-center rounded-none mb-16">
            <p className="text-zinc-500 font-medium mb-4">You have no active courses.</p>
            <Link to="/catalog" className="text-primary-600 font-bold hover:text-primary-700 transition-colors">Find a course to start &rarr;</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {activeCourses.map(enrollment => (
              <div key={enrollment._id} className="bg-white border border-zinc-200 hover:border-primary-500 transition-colors p-6 rounded-none flex flex-col group">
                <div className="flex-grow mb-8">
                  <div className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-2">{enrollment.course?.category || 'General'}</div>
                  <h3 className="text-xl font-bold text-[#09090b] leading-tight mb-2">{enrollment.course?.title}</h3>
                  <p className="text-zinc-500 text-sm line-clamp-2">{enrollment.course?.description}</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-[#09090b] mb-2 uppercase tracking-widest">
                    <span>Progress</span>
                    <span>{enrollment.progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-2 mb-6 rounded-none overflow-hidden">
                    <div 
                      className="bg-primary-500 h-full transition-all duration-1000 ease-out"
                      style={{ width: `${enrollment.progressPercentage}%` }}
                    ></div>
                  </div>
                  
                  <Link 
                    to={`/learn/${enrollment._id}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#09090b] text-white py-3 font-bold group-hover:bg-primary-500 transition-colors rounded-none"
                  >
                    <Play size={16} /> Resume Course
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* COMPLETED COURSES SECTION */}
        {completedCourses.length > 0 && (
          <>
            <div className="border-t border-zinc-200 pt-16 mb-6 flex justify-between items-end">
              <h2 className="text-2xl font-extrabold text-[#09090b] tracking-tight">Completed Courses</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {completedCourses.map(enrollment => (
                <div key={enrollment._id} className="bg-zinc-50 border border-zinc-200 p-6 rounded-none flex flex-col relative overflow-hidden group">
                  
                  <div className="absolute -right-10 top-6 bg-primary-500 text-white text-xs font-black uppercase tracking-widest py-1 px-10 rotate-45">
                    Completed
                  </div>

                  <div className="flex-grow mb-8 relative z-10">
                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">{enrollment.course?.category || 'General'}</div>
                    <h3 className="text-xl font-bold text-[#09090b] leading-tight mb-2 pr-6">{enrollment.course?.title}</h3>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex gap-3">
                      <Link 
                        to={`/learn/${enrollment._id}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-zinc-300 text-[#09090b] py-3 font-bold hover:bg-zinc-100 transition-colors rounded-none text-sm"
                      >
                        <BookOpen size={16} /> Review
                      </Link>
                      
                      {/* NOW ACTIVE: Triggers PDF Download */}
                      <button 
                        onClick={() => handleDownloadCertificate(enrollment.course?.title)}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-500 text-white py-3 font-bold hover:bg-primary-600 transition-colors rounded-none text-sm shadow-[2px_2px_0px_0px_rgba(9,9,11,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 border border-[#09090b]"
                      >
                        <Award size={16} /> Certificate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}