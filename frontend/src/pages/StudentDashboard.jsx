// frontend/src/pages/StudentDashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function StudentDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  if (loading) return <div className="p-8">Loading your learning journey...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Learning Journey</h2>
        <Link 
          to="/catalog" 
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Browse More Courses
        </Link>
      </div>

      {enrollments.length === 0 ? (
        <div className="bg-white p-8 rounded border text-center text-gray-500">
          You are not enrolled in any courses yet. <Link to="/catalog" className="text-indigo-600 underline">Find a course!</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrollments.map(enrollment => (
            <div key={enrollment._id} className="bg-white p-6 rounded border shadow-sm">
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                {enrollment.course?.category}
              </span>
              <h3 className="text-xl font-bold mt-2 mb-4">{enrollment.course?.title}</h3>
              
              {/* Progress Bar */}
              <div className="mb-2 flex justify-between text-sm font-medium text-gray-700">
                <span>Progress</span>
                <span>{enrollment.progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${enrollment.progressPercentage}%` }}
                ></div>
              </div>
              
              {/* Updated Link to Classroom */}
              <Link 
                to={`/learn/${enrollment._id}`}
                className="block w-full text-center bg-indigo-50 text-indigo-700 border border-indigo-200 py-2 rounded hover:bg-indigo-100 transition font-medium"
              >
                Continue Learning &rarr;
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}