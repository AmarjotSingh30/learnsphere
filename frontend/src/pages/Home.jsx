// frontend/src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, Play, ArrowRight, BookOpen, Shield, Zap, 
  Code, Cpu, Layout, Quote, GraduationCap, Trophy,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';

const heroImages = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
];

const testimonials = [
  {
    quote: "Transitioning from basic PHP projects to the modern MERN stack was seamless with LearnSphere. The distraction-free classroom helped me focus on building real full-stack systems.",
    name: "Rahul S.", role: "Full-Stack Developer", initial: "R"
  },
  {
    quote: "The instructor tools are incredible. I migrated my entire software architecture curriculum over in one weekend. Adding automated quizzes to each module saves me hours of manual grading.",
    name: "Amit P.", role: "Course Instructor", initial: "A"
  },
  {
    quote: "I tried learning Machine Learning from random tutorials, but the structured milestones here changed everything. The PDF certificates actually helped me land my first internship!",
    name: "Sneha M.", role: "Data Science Intern", initial: "S"
  }
];

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [testIndex, setTestIndex] = useState(0);

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(heroTimer);
  }, []);

  const nextHero = () => setHeroIndex((prev) => (prev + 1) % heroImages.length);
  const prevHero = () => setHeroIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  const nextTestimonial = () => setTestIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setTestIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  // --- ANIMATION VARIANTS ---
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#09090b]">
        <div className="absolute inset-0 w-full h-full z-0">
          <AnimatePresence initial={false}>
            <motion.img 
              key={heroIndex}
              src={heroImages[heroIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              alt="Background" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-40"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-[#09090b]/80 z-10"></div>
        </div>

        <button onClick={prevHero} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/10 hover:border-white/30 text-white flex items-center justify-center bg-[#09090b]/50 transition-all opacity-70 hover:opacity-100">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextHero} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/10 hover:border-white/30 text-white flex items-center justify-center bg-[#09090b]/50 transition-all opacity-70 hover:opacity-100">
          <ChevronRight size={24} />
        </button>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center pt-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center">
            
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 text-white text-sm font-semibold mb-8 tracking-wide">
              <span className="flex h-2 w-2 rounded-full bg-primary-500"></span>
              LearnSphere 2.0 is now live
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              Learn without <br className="hidden md:block" />
              <span className="text-primary-500">limits.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-medium">
              Master high-income skills through interactive, milestone-driven courses built by industry veterans.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              <Link to="/register" className="group inline-flex items-center justify-center gap-3 bg-primary-500 text-white px-8 py-4 font-bold text-lg hover:bg-primary-600 transition-colors rounded-none">
                Start Learning Free
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/catalog" className="inline-flex items-center justify-center gap-3 bg-transparent border border-zinc-700 text-white px-8 py-4 font-bold text-lg hover:bg-zinc-800 transition-colors rounded-none">
                <Play size={20} className="text-primary-500" />
                Explore Catalog
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* 2. STATS SECTION */}
      <section className="py-16 border-b border-zinc-200 bg-white relative z-20">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "120+", label: "Expert Instructors" },
            { value: "4.9/5", label: "Average Rating" },
            { value: "50k+", label: "Active Learners" },
            { value: "Weekly", label: "New Content" }
          ].map((stat, i) => (
            <motion.div variants={fadeUp} key={i}>
              <div className="text-4xl font-extrabold text-[#09090b] mb-2">{stat.value}</div>
              <div className="text-sm text-zinc-500 font-semibold tracking-wide uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section className="py-24 lg:py-32 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-zinc-200 pb-8"
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#09090b] mb-4">Master in-demand skills.</h2>
              <p className="text-zinc-500 text-lg">From complex architectural metrics to training custom neural networks.</p>
            </div>
            <Link to="/catalog" className="text-primary-600 font-bold hover:text-primary-700 flex items-center gap-2 mt-4 md:mt-0 uppercase text-sm tracking-wide">
              View all categories <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: Code, title: "Full-Stack Web Dev", desc: "React, Node.js, and scaling modern web apps." },
              { icon: Cpu, title: "Machine Learning", desc: "Build CNN models and dive into computer vision." },
              { icon: Layout, title: "Software Engineering", desc: "System design, UML, and architectural patterns." }
            ].map((cat, i) => (
              <motion.div variants={fadeUp} key={i} className="bg-white border border-zinc-200 p-8 hover:border-primary-500 transition-colors cursor-pointer group rounded-none">
                <div className={`w-12 h-12 bg-zinc-100 text-[#09090b] flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors`}>
                  <cat.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#09090b] mb-2">{cat.title}</h3>
                <p className="text-zinc-500 font-medium">{cat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section className="py-24 lg:py-32 bg-[#09090b] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="text-3xl md:text-5xl font-extrabold mb-20 text-center"
          >
            Your path to mastery.
          </motion.h2>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 relative"
          >
            <div className="hidden md:block absolute top-6 left-[15%] right-[15%] h-px bg-zinc-800 z-0"></div>
            {[
              { icon: BookOpen, title: "01. Enroll & Learn", desc: "Gain instant access to video lectures, reading materials, and interactive code snippets." },
              { icon: Zap, title: "02. Practice & Quiz", desc: "Test your knowledge with automated milestone quizzes to ensure retention." },
              { icon: GraduationCap, title: "03. Get Certified", desc: "Pass the final assessments to earn a verified PDF certificate for your resume." }
            ].map((step, i) => (
              <motion.div variants={fadeUp} key={i} className="relative z-10 flex flex-col">
                <div className="w-12 h-12 bg-[#09090b] border border-zinc-700 flex items-center justify-center text-primary-500 mb-6">
                  <step.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-zinc-400 font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. TESTIMONIAL SLIDER SECTION */}
      <section className="py-24 lg:py-32 bg-[#fafafa] border-b border-zinc-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#09090b] mb-4">Student Success Stories</h2>
            <p className="text-zinc-500 text-lg">Join thousands of developers upgrading their careers.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
            className="relative bg-white border border-zinc-200 p-8 md:p-16 min-h-[300px] flex items-center rounded-none"
          >
            <Quote size={60} className="text-zinc-100 absolute top-8 left-8" />
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={testIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-full"
              >
                <p className="text-[#09090b] mb-10 text-xl md:text-3xl font-medium leading-tight">
                  "{testimonials[testIndex].quote}"
                </p>
                
                <div className="flex items-center gap-4 border-t border-zinc-100 pt-6">
                  <div className="w-12 h-12 bg-[#09090b] text-white flex items-center justify-center font-bold text-xl">
                    {testimonials[testIndex].initial}
                  </div>
                  <div>
                    <h4 className="text-[#09090b] font-bold text-lg">{testimonials[testIndex].name}</h4>
                    <p className="text-zinc-500 text-sm font-semibold tracking-wide uppercase">{testimonials[testIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-8 right-8 flex gap-2">
              <button onClick={prevTestimonial} className="w-10 h-10 bg-zinc-100 hover:bg-zinc-200 text-[#09090b] flex items-center justify-center transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextTestimonial} className="w-10 h-10 bg-zinc-100 hover:bg-zinc-200 text-[#09090b] flex items-center justify-center transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. PRICING SECTION */}
      <section className="py-24 lg:py-32 bg-white" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="text-center mb-16 border-b border-zinc-200 pb-8 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#09090b] mb-4">Invest in yourself.</h2>
            <p className="text-xl text-zinc-500">Cancel anytime. No hidden fees.</p>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp} className="border border-zinc-200 p-10 flex flex-col rounded-none">
              <h3 className="text-2xl font-bold text-[#09090b] mb-2">Explorer</h3>
              <p className="text-zinc-500 mb-8">Learn the basics for free.</p>
              <div className="text-5xl font-black mb-10 text-[#09090b]">$0<span className="text-lg text-zinc-400 font-medium">/mo</span></div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-[#09090b] font-medium"><CheckCircle size={20} className="text-zinc-300" /> Access to free catalog</li>
                <li className="flex items-center gap-3 text-[#09090b] font-medium"><CheckCircle size={20} className="text-zinc-300" /> Basic progress tracking</li>
              </ul>
              <Link to="/register" className="w-full text-center border border-zinc-300 text-[#09090b] py-4 font-bold hover:bg-zinc-50 transition-colors">Create Free Account</Link>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-[#09090b] border border-[#09090b] p-10 flex flex-col relative rounded-none">
              <div className="absolute top-6 right-6 bg-primary-500 text-white text-xs font-bold px-3 py-1 uppercase tracking-widest">Pro</div>
              <h3 className="text-2xl font-bold text-white mb-2">Mastery</h3>
              <p className="text-zinc-400 mb-8">For serious professionals upskilling.</p>
              <div className="text-5xl font-black mb-10 text-white">$19<span className="text-lg text-zinc-500 font-medium">/mo</span></div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-zinc-200 font-medium"><CheckCircle size={20} className="text-primary-500" /> Unlimited premium courses</li>
                <li className="flex items-center gap-3 text-zinc-200 font-medium"><CheckCircle size={20} className="text-primary-500" /> Automated Quiz Scoring</li>
                <li className="flex items-center gap-3 text-zinc-200 font-medium"><CheckCircle size={20} className="text-primary-500" /> Verifiable Certificates</li>
              </ul>
              <Link to="/register" className="w-full text-center bg-primary-500 text-white py-4 font-bold hover:bg-primary-600 transition-colors">
                Unlock Everything
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-24 lg:py-32 bg-[#09090b] text-center px-4">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to start building?</h2>
          <p className="text-zinc-400 text-lg md:text-xl mb-10">Join today and transform your theoretical knowledge into production-ready skills.</p>
          <Link to="/register" className="inline-block bg-primary-500 text-white font-bold text-lg px-10 py-4 hover:bg-primary-600 transition-colors rounded-none">
            Create Your Free Account
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}