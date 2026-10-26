// frontend/src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { BookOpen, Globe, MessageSquare, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <BookOpen size={24} className="text-primary-500" />
            <span className="text-xl font-bold text-white tracking-tight">Learn<span className="text-primary-500">Sphere</span></span>
          </Link>
          <p className="text-sm text-gray-400 mb-4">Empowering learners and educators worldwide with a seamless, interactive digital classroom experience.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition" title="Website"><Globe size={20} /></a>
            <a href="#" className="hover:text-white transition" title="Community"><MessageSquare size={20} /></a>
            <a href="#" className="hover:text-white transition" title="Contact"><Mail size={20} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/catalog" className="hover:text-primary-400 transition">Browse Courses</Link></li>
            <li><Link to="/pricing" className="hover:text-primary-400 transition">Pricing</Link></li>
            <li><a href="#" className="hover:text-primary-400 transition">Instructor Guide</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary-400 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary-400 transition">Contact</Link></li>
            <li><a href="#" className="hover:text-primary-400 transition">Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-primary-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary-400 transition">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
        &copy; {new Date().getFullYear()} LearnSphere Inc. All rights reserved.
      </div>
    </footer>
  );
}