import { Link } from 'react-router-dom';
import { BookOpen, Award, Users, Search, Rocket, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl">Master New Skills with <span className="text-blue-600 dark:text-blue-400">InoLearn</span></h1>
              <p className="mt-6 text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">Join our premium E-learning platform and unlock access to high-quality courses designed by industry experts. Learn at your own pace, anywhere, anytime.</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/courses" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl transition-all flex items-center group">Explore Courses <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /></Link>
                <Link to="/register" className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl text-lg font-semibold border-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 transition-all flex items-center shadow-lg">Join for Free</Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="E-learning" className="relative rounded-3xl shadow-2xl object-cover w-full h-[500px]" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
