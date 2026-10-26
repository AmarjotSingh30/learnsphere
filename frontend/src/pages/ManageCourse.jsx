// frontend/src/pages/ManageCourse.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

export default function ManageCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  
  // State for new lesson including quiz fields
  const [lessonData, setLessonData] = useState({ 
    title: '', content: '', videoUrl: '', order: 1,
    quizQuestion: '', quizOption0: '', quizOption1: '', quizOption2: '', quizOption3: '', correctAnswerIndex: 0
  });

  const fetchCourse = async () => {
    try {
      const { data } = await api.get(`/courses/${id}`);
      setCourse(data);
      setLessonData(prev => ({ ...prev, order: (data.lessons?.length || 0) + 1 }));
    } catch (error) {
      console.error("Failed to fetch course", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const handleAddLesson = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      // Format payload for backend
      const payload = {
        title: lessonData.title,
        content: lessonData.content,
        videoUrl: lessonData.videoUrl,
        order: lessonData.order,
        quiz: lessonData.quizQuestion ? [{
          question: lessonData.quizQuestion,
          options: [lessonData.quizOption0, lessonData.quizOption1, lessonData.quizOption2, lessonData.quizOption3],
          correctAnswerIndex: Number(lessonData.correctAnswerIndex)
        }] : []
      };

      await api.post(`/courses/${id}/lessons`, payload);
      
      // Reset form
      setLessonData({ 
        title: '', content: '', videoUrl: '', order: course.lessons.length + 2,
        quizQuestion: '', quizOption0: '', quizOption1: '', quizOption2: '', quizOption3: '', correctAnswerIndex: 0
      });
      fetchCourse(); 
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add lesson');
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;
    try {
      await api.delete(`/courses/${id}/lessons/${lessonId}`);
      fetchCourse(); 
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete lesson');
    }
  };

  if (loading) return <div className="p-8">Loading course details...</div>;
  if (!course) return <div className="p-8 text-red-500">Course not found.</div>;

  return (
    <div className="max-w-6xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{course.title}</h2>
          <p className="text-gray-600 mt-1">{course.description}</p>
        </div>
        <Link to="/dashboard" className="text-indigo-600 hover:underline font-medium">
          &larr; Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Existing Lessons */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold mb-4 border-b pb-2">Course Content</h3>
          {course.lessons?.length === 0 ? (
            <p className="text-gray-500 bg-white p-6 rounded border text-center">No lessons added yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {course.lessons.map((lesson, index) => (
                <div key={lesson._id} className="bg-white p-4 rounded border shadow-sm flex items-start gap-4 relative">
                  
                  <button 
                    onClick={() => handleDeleteLesson(lesson._id)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>

                  <div className="bg-indigo-100 text-indigo-800 w-8 h-8 flex items-center justify-center rounded-full font-bold shrink-0">
                    {index + 1}
                  </div>
                  <div className="pr-12">
                    <h4 className="font-bold text-lg">{lesson.title}</h4>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{lesson.content}</p>
                    {lesson.videoUrl && (
                      <a href={lesson.videoUrl} target="_blank" rel="noreferrer" className="text-indigo-500 text-sm hover:underline mt-2 inline-block">
                        View Video Link
                      </a>
                    )}
                    {lesson.quiz && lesson.quiz.length > 0 && (
                      <span className="block mt-2 text-xs font-bold bg-green-100 text-green-700 w-max px-2 py-1 rounded">
                        Contains Quiz
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Add New Lesson Form */}
        <div>
          <div className="bg-white p-6 rounded border shadow-sm sticky top-6">
            <h3 className="text-lg font-bold mb-4">Add New Lesson</h3>
            <form onSubmit={handleAddLesson} className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Lesson Title</label>
                <input 
                  type="text" required className="w-full border p-2 rounded focus:outline-indigo-500 text-sm"
                  value={lessonData.title} onChange={(e) => setLessonData({...lessonData, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Text Content</label>
                <textarea 
                  required rows="4" className="w-full border p-2 rounded focus:outline-indigo-500 text-sm"
                  value={lessonData.content} onChange={(e) => setLessonData({...lessonData, content: e.target.value})}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Video URL (Optional)</label>
                <input 
                  type="url" placeholder="https://youtube.com/..." className="w-full border p-2 rounded focus:outline-indigo-500 text-sm"
                  value={lessonData.videoUrl} onChange={(e) => setLessonData({...lessonData, videoUrl: e.target.value})}
                />
              </div>

              {/* Quiz Section */}
              <div className="border-t pt-3 mt-2">
                <h4 className="font-bold text-sm text-gray-700 mb-2">Attach a Quiz (Optional)</h4>
                <input 
                  type="text" placeholder="Quiz Question" className="w-full border p-2 rounded mb-2 text-sm focus:outline-indigo-500"
                  value={lessonData.quizQuestion} onChange={(e) => setLessonData({...lessonData, quizQuestion: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <input type="text" placeholder="Option 1" className="border p-2 rounded text-sm focus:outline-indigo-500" value={lessonData.quizOption0} onChange={(e) => setLessonData({...lessonData, quizOption0: e.target.value})} />
                  <input type="text" placeholder="Option 2" className="border p-2 rounded text-sm focus:outline-indigo-500" value={lessonData.quizOption1} onChange={(e) => setLessonData({...lessonData, quizOption1: e.target.value})} />
                  <input type="text" placeholder="Option 3" className="border p-2 rounded text-sm focus:outline-indigo-500" value={lessonData.quizOption2} onChange={(e) => setLessonData({...lessonData, quizOption2: e.target.value})} />
                  <input type="text" placeholder="Option 4" className="border p-2 rounded text-sm focus:outline-indigo-500" value={lessonData.quizOption3} onChange={(e) => setLessonData({...lessonData, quizOption3: e.target.value})} />
                </div>
                <select 
                  className="w-full border p-2 rounded text-sm focus:outline-indigo-500"
                  value={lessonData.correctAnswerIndex} onChange={(e) => setLessonData({...lessonData, correctAnswerIndex: e.target.value})}
                >
                  <option value={0}>Correct Answer: Option 1</option>
                  <option value={1}>Correct Answer: Option 2</option>
                  <option value={2}>Correct Answer: Option 3</option>
                  <option value={3}>Correct Answer: Option 4</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={adding}
                className="bg-indigo-600 text-white p-2 rounded mt-4 hover:bg-indigo-700 transition font-bold disabled:bg-indigo-400"
              >
                {adding ? 'Adding...' : 'Add Lesson to Course'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}