// frontend/src/components/Navbar.jsx
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, LayoutDashboard, LogOut, Compass, User } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        
        {/* Left Side: Logo & Public Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary-500 text-white p-2 rounded-xl group-hover:bg-primary-600 transition">
              <BookOpen size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Learn<span className="text-primary-500">Sphere</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-bold text-gray-600 hover:text-primary-600 transition">Home</Link>
            <Link to="/about" className="text-sm font-bold text-gray-600 hover:text-primary-600 transition">About</Link>
            <Link to="/contact" className="text-sm font-bold text-gray-600 hover:text-primary-600 transition">Contact</Link>
            <Link to="/catalog" className="text-sm font-bold text-gray-600 hover:text-primary-600 transition flex items-center gap-1">
               <Compass size={16} /> Catalog
            </Link>
          </div>
        </div>

        {/* Right Side: Auth / Dashboard Actions */}
        <div>
          {user ? (
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-primary-600 font-bold transition">
                <LayoutDashboard size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              
              <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
              
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-bold text-gray-900 leading-tight">{user.name}</span>
                  <span className="text-xs text-primary-600 font-bold">{user.role}</span>
                </div>
                <div className="bg-primary-50 text-primary-600 w-9 h-9 rounded-full flex items-center justify-center border border-primary-100">
                  <User size={18} />
                </div>
                <button 
                  onClick={handleLogout}
                  className="ml-2 text-gray-400 hover:text-red-500 transition p-1"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-600 hover:text-primary-600 font-bold transition">Login</Link>
              <Link to="/register" className="bg-primary-500 text-white px-5 py-2 rounded-lg font-bold hover:bg-primary-600 transition shadow-sm shadow-primary-500/30">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}