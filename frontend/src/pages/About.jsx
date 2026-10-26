// frontend/src/pages/About.jsx
import Footer from '../components/Footer';
import { Target, Lightbulb, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Democratizing Education for the Digital Age</h1>
          <p className="text-xl text-gray-600">LearnSphere was founded on a simple belief: quality education should be accessible, interactive, and structured for everyone, everywhere.</p>
        </div>

        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="Team collaborating" 
          className="w-full h-[400px] object-cover rounded-3xl shadow-xl mb-20"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-600">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-600">To bridge the gap between passionate educators and eager learners through robust, intuitive technology.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-600">
              <Lightbulb size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-600">A world where anyone can master a new skill, earn recognized credentials, and advance their career from home.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-600">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Our Values</h3>
            <p className="text-gray-600">We believe in transparency, continuous improvement, and putting the student's learning experience first.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}