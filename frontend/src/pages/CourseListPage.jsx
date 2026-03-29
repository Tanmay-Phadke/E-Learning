import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCourse } from '../context/CourseContext';
import { BookOpen, MapPin, Clock, Search, ChevronRight, Loader2 } from 'lucide-react';

const CourseListPage = () => {
  const { courses, fetchCourses, loading } = useCourse();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCourses(searchTerm);
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Explore our courses</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Master new skills and advance your career with our professional-grade content.</p>
        <div className="mt-8 max-w-xl mx-auto relative">
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input type="text" className="w-full pl-10 pr-4 py-3 rounded-xl border-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:border-blue-500 outline-none transition-all" placeholder="Search courses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin h-10 w-10 text-blue-600" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border dark:border-gray-700 hover:shadow-2xl transition-all group">
              <div className="h-48 relative overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase ${course.type === 'Free' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{course.type}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold dark:text-white mb-2 line-clamp-1">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{course.type === 'Free' ? '$0' : `$${course.price}`}</span>
                    <Link to={`/courses/${course._id}`} className="flex items-center text-sm font-semibold hover:text-blue-600 transition-colors">View Details <ChevronRight className="ml-1 h-4 w-4" /></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseListPage;
