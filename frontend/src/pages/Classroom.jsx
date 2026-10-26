// frontend/src/pages/Classroom.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
// Added BookOpen to the imports here!
import { ArrowLeft, PlayCircle, CheckCircle, Check, X, ChevronRight, Lock, BookOpen } from 'lucide-react';

export default function Classroom() {
  const { enrollmentId } = useParams();
  const [enrollment, setEnrollment] = useState(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Quiz State
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  const fetchEnrollment = async () => {
    try {
      const { data } = await api.get('/enrollments');
      const current = data.find(e => e._id === enrollmentId);
      setEnrollment(current);
    } catch (error) {
      console.error("Failed to fetch enrollment", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollment();
  }, [enrollmentId]);

  // Reset quiz state when changing lessons
  useEffect(() => {
    setSelectedAnswer(null);
    setQuizResult(null);
  }, [activeLessonIndex]);

  const handleMarkComplete = async (lessonId) => {
    try {
      await api.put(`/enrollments/${enrollmentId}/complete`, { lessonId });
      fetchEnrollment(); 
      // Auto-advance to next lesson if available
      if (enrollment.course?.lessons && activeLessonIndex < enrollment.course.lessons.length - 1) {
        setActiveLessonIndex(prev => prev + 1);
      }
    } catch (error) {
      alert("Failed to mark lesson complete");
    }
  };

  const handleQuizSubmit = (correctIndex) => {
    if (selectedAnswer === correctIndex) {
      setQuizResult('pass');
    } else {
      setQuizResult('fail');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <div className="text-[#09090b] font-extrabold uppercase tracking-widest animate-pulse">Loading Environment...</div>
    </div>
  );
  
  if (!enrollment || !enrollment.course) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <div className="bg-red-50 text-red-600 border border-red-200 p-6 font-bold uppercase tracking-widest">Course data not found.</div>
    </div>
  );

  const course = enrollment.course;
  const lessons = course.lessons || [];
  const activeLesson = lessons[activeLessonIndex];
  const isCompleted = activeLesson ? enrollment.completedLessons.includes(activeLesson._id) : false;

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      
      {/* Top Navbar / Header */}
      <header className="bg-[#09090b] text-white border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 font-bold text-sm uppercase tracking-widest border-r border-zinc-800 pr-4">
              <ArrowLeft size={16} /> Exit
            </Link>
            <h1 className="font-extrabold tracking-tight truncate max-w-md hidden sm:block">{course.title}</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Progress</span>
              <span className="font-black text-primary-500">{enrollment.progressPercentage}%</span>
            </div>
            <div className="w-32 md:w-48 bg-zinc-800 h-2 rounded-none overflow-hidden">
              <div 
                className="bg-primary-500 h-full transition-all duration-700 ease-out"
                style={{ width: `${enrollment.progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-grow max-w-[1600px] mx-auto w-full">
        
        {/* Left Sidebar: Syllabus */}
        <div className="w-full lg:w-1/4 xl:w-1/5 bg-white border-r border-zinc-200 flex flex-col h-auto lg:min-h-[calc(100vh-4rem)]">
          <div className="p-6 border-b border-zinc-200">
            <h2 className="text-xs font-extrabold text-[#09090b] uppercase tracking-widest">Curriculum Index</h2>
          </div>
          <div className="flex flex-col overflow-y-auto">
            {lessons.map((lesson, index) => {
              const isFinished = enrollment.completedLessons.includes(lesson._id);
              const isActive = activeLessonIndex === index;
              return (
                <button
                  key={lesson._id}
                  onClick={() => setActiveLessonIndex(index)}
                  className={`p-4 text-left border-b border-zinc-100 transition-all flex items-center justify-between group
                    ${isActive 
                      ? 'bg-[#09090b] text-white border-l-4 border-l-primary-500' 
                      : 'hover:bg-zinc-50 text-zinc-600 border-l-4 border-l-transparent'
                    }`}
                >
                  <div className="flex items-start gap-3 overflow-hidden">
                    <span className={`text-xs font-black mt-1 ${isActive ? 'text-primary-500' : 'text-zinc-400'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={`font-bold truncate ${isFinished && !isActive ? 'text-zinc-400 line-through' : ''}`}>
                      {lesson.title}
                    </span>
                  </div>
                  {isFinished && <CheckCircle size={16} className={isActive ? 'text-primary-500' : 'text-zinc-300'} />}
                </button>
              );
            })}
            {lessons.length === 0 && (
              <div className="p-6 text-zinc-500 font-medium text-sm">Instructor hasn't added lessons yet.</div>
            )}
          </div>
        </div>

        {/* Right Main Area: Lesson Content */}
        <div className="w-full lg:w-3/4 xl:w-4/5 p-6 md:p-12 lg:p-20 bg-[#fafafa]">
          <div className="max-w-4xl mx-auto">
            
            {activeLesson ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-4 text-primary-500 font-extrabold text-sm uppercase tracking-widest">
                  Module {String(activeLessonIndex + 1).padStart(2, '0')}
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#09090b] mb-10 tracking-tight leading-tight">
                  {activeLesson.title}
                </h1>
                
                {activeLesson.videoUrl && (
                  <div className="mb-12">
                    <a 
                      href={activeLesson.videoUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="group inline-flex items-center gap-3 bg-[#09090b] text-white px-8 py-4 font-bold hover:bg-primary-500 transition-colors shadow-xl"
                    >
                      <PlayCircle size={24} />
                      Watch Video Lesson
                    </a>
                  </div>
                )}

                <div className="prose prose-zinc max-w-none mb-16 text-lg text-zinc-700 leading-relaxed whitespace-pre-wrap font-medium">
                  {activeLesson.content}
                </div>

                {/* --- BRUTALIST QUIZ SECTION --- */}
                {activeLesson.quiz && activeLesson.quiz.length > 0 && (
                  <div className="mt-16 bg-white border-2 border-[#09090b] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(9,9,11,1)] mb-16 relative">
                    <div className="absolute -top-4 left-8 bg-primary-500 text-white px-4 py-1 font-black uppercase tracking-widest text-sm border-2 border-[#09090b]">
                      Knowledge Check
                    </div>
                    
                    <h3 className="text-2xl font-extrabold text-[#09090b] mb-8 leading-tight">
                      {activeLesson.quiz[0].question}
                    </h3>
                    
                    <div className="flex flex-col gap-4 mb-8">
                      {activeLesson.quiz[0].options.map((option, idx) => {
                        const isSelected = selectedAnswer === idx;
                        return (
                          <label 
                            key={idx} 
                            className={`p-5 border-2 cursor-pointer transition-all flex items-center gap-4 font-bold
                              ${isSelected 
                                ? 'bg-primary-50 border-primary-500 text-[#09090b]' 
                                : 'bg-white border-zinc-200 text-zinc-600 hover:border-[#09090b] hover:text-[#09090b]'
                              }`}
                          >
                            <div className={`w-5 h-5 border-2 flex items-center justify-center rounded-full
                              ${isSelected ? 'border-primary-500' : 'border-zinc-300'}`}>
                              {isSelected && <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />}
                            </div>
                            <input 
                              type="radio" 
                              name="quiz" 
                              value={idx}
                              checked={isSelected}
                              onChange={() => setSelectedAnswer(idx)}
                              className="hidden"
                            />
                            {option}
                          </label>
                        );
                      })}
                    </div>

                    {!quizResult ? (
                      <button 
                        onClick={() => handleQuizSubmit(activeLesson.quiz[0].correctAnswerIndex)}
                        disabled={selectedAnswer === null}
                        className="bg-[#09090b] text-white px-8 py-4 font-extrabold uppercase tracking-widest disabled:opacity-50 transition-opacity hover:bg-zinc-800"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <div className={`p-6 border-2 font-bold flex flex-col sm:flex-row items-center justify-between gap-4 
                        ${quizResult === 'pass' 
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-500' 
                          : 'bg-red-50 text-red-900 border-red-500'
                        }`}>
                        <div className="flex items-center gap-3">
                          {quizResult === 'pass' ? <Check size={24} className="text-emerald-600"/> : <X size={24} className="text-red-600"/>}
                          <span className="text-lg">
                            {quizResult === 'pass' ? 'Correct. You may proceed.' : 'Incorrect. Review the material and try again.'}
                          </span>
                        </div>
                        {quizResult === 'fail' && (
                          <button 
                            onClick={() => setQuizResult(null)} 
                            className="bg-[#09090b] text-white px-6 py-2 uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors"
                          >
                            Retry
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
                {/* ------------------------- */}

                {/* Bottom Navigation & Completion */}
                <div className="mt-16 pt-8 border-t-2 border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                  
                  <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
                    Lesson {activeLessonIndex + 1} of {lessons.length}
                  </div>

                  <button
                    onClick={() => handleMarkComplete(activeLesson._id)}
                    disabled={isCompleted || (activeLesson.quiz?.length > 0 && quizResult !== 'pass')}
                    className={`px-8 py-4 font-extrabold uppercase tracking-widest transition-all flex items-center gap-2 group
                      ${isCompleted 
                        ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed border-2 border-zinc-200' 
                        : (activeLesson.quiz?.length > 0 && quizResult !== 'pass')
                          ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed border-2 border-zinc-200'
                          : 'bg-primary-500 text-white hover:bg-primary-600 border-2 border-primary-500 shadow-[4px_4px_0px_0px_rgba(9,9,11,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1'
                    }`}
                  >
                    {isCompleted ? (
                      <><CheckCircle size={18} /> Completed</>
                    ) : (activeLesson.quiz?.length > 0 && quizResult !== 'pass') ? (
                      <><Lock size={18} /> Pass Quiz to Advance</>
                    ) : (
                      <>Complete & Continue <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </div>
                
              </div>
            ) : (
              <div className="text-center py-32">
                <BookOpen size={48} className="mx-auto text-zinc-300 mb-6" />
                <h3 className="text-2xl font-extrabold text-[#09090b] mb-2">No Content Selected</h3>
                <p className="text-zinc-500 font-medium">Select a module from the curriculum index to begin.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}