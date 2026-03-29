import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Book, Play, CheckCircle, Clock, Loader2, Award } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolled = async () => {
      try {
        const { data } = await axios.get('/api/courses/enrolled', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrolled();
  }, [user.token]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 underline decoration-blue-500 decoration-8 underline-offset-8">Hello, {user.name}!</h1>
          <p className="text-gray-600 dark:text-gray-400">Keep going! You have {courses.length} active courses.</p>
        </div>
        {user.isAdmin && (
          <Link to="/admin" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl shadow-xl transition-all font-bold flex items-center space-x-2"><Award className="h-5 w-5" /><span>Admin Console</span></Link>
        )}
      </div>

      <div className="flex items-center justify-between mb-8 border-b dark:border-gray-800 pb-4">
        <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2"><Book className="h-6 w-6 text-blue-500" />Enrolled Courses</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin h-12 w-12 text-blue-600" /></div>
      ) : courses.length === 0 ? (
        <div className="bg-gray-100 dark:bg-gray-800 p-12 rounded-3xl text-center shadow-inner">
          <Book className="h-16 w-16 text-gray-400 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold dark:text-white mb-2">No courses enrolled yet</h3>
          <p className="text-gray-500 mb-6">Explore our catalog and start your learning journey today!</p>
          <Link to="/courses" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition-all shadow-lg font-bold">Browse Courses</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course._id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all border dark:border-gray-700">
              <div className="relative h-48">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold line-clamp-1">{course.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400"><Clock className="h-4 w-4 mr-1" /><span>Ready to Learn</span></div>
                  <div className="flex items-center text-sm font-medium text-green-600 dark:text-green-400"><CheckCircle className="h-4 w-4 mr-1" /><span>{course.lessons.length} Lessons</span></div>
                </div>
                <Link to={`/courses/${course._id}`} className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white hover:bg-blue-600 hover:text-white py-3 rounded-2xl flex items-center justify-center font-bold transition-all group-hover:bg-blue-600 group-hover:text-white">
                  <Play className="h-5 w-5 mr-2" /><span>Resume Learning</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
