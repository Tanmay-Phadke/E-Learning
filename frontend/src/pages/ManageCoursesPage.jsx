import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Trash2, Edit, Plus, Loader2, BookOpen, Layers, CheckCircle, Search, Settings, DollarSign, LayoutDashboard } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageCoursesPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get('/api/courses');
      setCourses(data);
    } catch (err) {
      toast.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`/api/admin/courses/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
        toast.success('Course deleted');
        fetchCourses();
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  const filteredCourses = courses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 dark:bg-gray-800 p-8 rounded-3xl shadow-xl border dark:border-gray-700">
        <div><h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center gap-3"><Layers className="h-10 w-10 text-blue-600" />Manage Catalog</h1><p className="text-gray-500 dark:text-gray-400 mt-1">Control and organize your courses and lessons.</p></div>
        <Link to="/admin/courses/add" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl active:scale-95 transition-all"><Plus className="h-5 w-5" />New Course</Link>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border dark:border-gray-700 mb-12">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2"><BookOpen className="h-6 w-6 text-blue-500" />Course Inventory</h2>
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input type="text" placeholder="Filter courses..." className="w-full pl-10 pr-4 py-2 rounded-xl border-2 dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:border-blue-500 outline-none transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin h-12 w-12 text-blue-600" /></div>
        ) : (
          <div className="overflow-x-auto rounded-2xl">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider">
                <tr><th className="px-6 py-4">Course</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Price</th><th className="px-6 py-4">Actions</th></tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {filteredCourses.map((course) => (
                  <tr key={course._id} className="hover:bg-gray-100 dark:hover:bg-gray-900 transition-all font-bold group">
                    <td className="px-6 py-6"><div className="flex items-center gap-4"><img src={course.thumbnail} className="h-12 w-20 rounded-lg object-cover shadow-md" alt="" /><span className="dark:text-white group-hover:text-blue-600 transition-colors">{course.title}</span></div></td>
                    <td className="px-6 py-6"><span className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase shadow-sm ${course.type === 'Free' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{course.type}</span></td>
                    <td className="px-6 py-6 text-2xl dark:text-white text-blue-600 font-black">${course.price}</td>
                    <td className="px-6 py-6 flex gap-3">
                      <Link to={`/admin/courses/edit/${course._id}`} className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-md"><Edit className="h-5 w-5" /></Link>
                      <button onClick={() => deleteHandler(course._id)} className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-md"><Trash2 className="h-5 w-5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCoursesPage;
