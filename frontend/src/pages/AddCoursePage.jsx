import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, Trash2, Save, ArrowLeft, Loader2, Play, BookOpen, Layers, CheckCircle, Search, Settings, DollarSign, LayoutDashboard, FileText, Video } from 'lucide-react';
import toast from 'react-hot-toast';

const AddCoursePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ title: '', description: '', price: 0, thumbnail: '', type: 'Free', lessons: [] });

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        try {
          const { data } = await axios.get(`/api/courses/${id}`);
          setCourse(data);
        } catch (err) {
          toast.error('Failed to load course');
        }
      };
      fetch();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await axios.put(`/api/admin/courses/${id}`, course, { headers: { Authorization: `Bearer ${user.token}` } });
        toast.success('Course updated');
      } else {
        await axios.post('/api/admin/courses', course, { headers: { Authorization: `Bearer ${user.token}` } });
        toast.success('Course created');
      }
      navigate('/admin/courses');
    } catch (err) {
      toast.error('Save failed');
    } finally {
      setLoading(false);
    }
  };

  const addLesson = async () => {
    if (!id) return toast.error('Save course first before adding lessons');
    const title = prompt('Lesson Title');
    const description = prompt('Lesson Description');
    const videoUrl = prompt('Lesson Video URL');
    const notes = prompt('Lesson Notes');
    if (title && videoUrl) {
        try {
            await axios.post(`/api/admin/courses/${id}/lessons`, { title, description, videoUrl, notes }, { headers: { Authorization: `Bearer ${user.token}` } });
            toast.success('Lesson added');
            const { data } = await axios.get(`/api/courses/${id}`);
            setCourse(data);
        } catch (err) {
            toast.error('Add lesson failed');
        }
    }
  };

  const deleteLesson = async (lId) => {
    if (window.confirm('Delete lesson?')) {
        try {
            await axios.delete(`/api/admin/lessons/${lId}`, { headers: { Authorization: `Bearer ${user.token}` } });
            toast.success('Lesson deleted');
            const { data } = await axios.get(`/api/courses/${id}`);
            setCourse(data);
        } catch (err) {
            toast.error('Delete lesson failed');
        }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-12 flex items-center justify-between dark:bg-gray-800 p-8 rounded-3xl shadow-xl border dark:border-gray-700">
        <Link to="/admin/courses" className="flex items-center gap-2 font-bold dark:text-gray-300 hover:text-blue-500 transition-colors"><ArrowLeft className="h-5 w-5" /><span>Back to Catalog</span></Link>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter shadow-blue-500/10 drop-shadow-xl">{id ? 'Edit Course' : 'Create New Course'}</h1>
        <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center font-black animate-pulse text-white shadow-xl shadow-blue-600/50">!</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-10 bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2"><label className="block text-sm font-black dark:text-gray-300 mb-2 uppercase tracking-tight">Title</label><input type="text" className="w-full bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border dark:border-gray-700 dark:text-white focus:border-blue-500 outline-none transition-all font-bold" value={course.title} onChange={(e) => setCourse({ ...course, title: e.target.value })} required /></div>
            <div className="md:col-span-2"><label className="block text-sm font-black dark:text-gray-300 mb-2 uppercase tracking-tight">Description</label><textarea className="w-full bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border dark:border-gray-700 dark:text-white focus:border-blue-500 outline-none transition-all font-bold min-h-[150px]" value={course.description} onChange={(e) => setCourse({ ...course, description: e.target.value })} required /></div>
            <div><label className="block text-sm font-black dark:text-gray-300 mb-2 uppercase tracking-tight">Price ($)</label><input type="number" className="w-full bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border dark:border-gray-700 dark:text-white focus:border-blue-500 outline-none transition-all font-bold" value={course.price} onChange={(e) => setCourse({ ...course, price: e.target.value })} required /></div>
            <div>
              <label className="block text-sm font-black dark:text-gray-300 mb-2 uppercase tracking-tight">Type</label>
              <select className="w-full bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border dark:border-gray-700 dark:text-white focus:border-blue-500 outline-none transition-all font-bold" value={course.type} onChange={(e) => setCourse({ ...course, type: e.target.value })}>
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
            <div className="md:col-span-2"><label className="block text-sm font-black dark:text-gray-300 mb-2 uppercase tracking-tight">Thumbnail URL</label><input type="text" className="w-full bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border dark:border-gray-700 dark:text-white focus:border-blue-500 outline-none transition-all font-bold" value={course.thumbnail} onChange={(e) => setCourse({ ...course, thumbnail: e.target.value })} required /></div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-blue-600/20">{loading ? <Loader2 className="animate-spin h-6 w-6" /> : <><Save className="h-6 w-6" /><span>Save Course Details</span></>}</button>
        </form>

        <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border dark:border-gray-700">
                <div className="flex items-center justify-between mb-8 pb-4 border-b dark:border-gray-700">
                    <h2 className="text-xl font-bold dark:text-white flex items-center gap-2 underline decoration-blue-500 decoration-4 underline-offset-4"><Video className="h-5 w-5 text-blue-500" />Curriculum</h2>
                    <button onClick={addLesson} className="p-2 bg-blue-50 dark:bg-blue-600 text-blue-600 dark:text-white rounded-lg hover:scale-110 shadow transition-all"><PlusCircle className="h-5 w-5" /></button>
                </div>
                <div className="space-y-4">
                    {course.lessons.map((lesson, idx) => (
                        <div key={lesson._id} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border dark:border-gray-700 flex items-center justify-between group">
                            <div className="flex items-center gap-4"><span className="text-xl font-black text-gray-200 dark:text-gray-700">{(idx + 1).toString().padStart(2, '0')}</span><div><h4 className="font-bold dark:text-white group-hover:text-blue-500 transition-all">{lesson.title}</h4></div></div>
                            <button onClick={() => deleteLesson(lesson._id)} className="p-2 text-gray-400 hover:text-red-500 transition-all"><Trash2 className="h-5 w-5" /></button>
                        </div>
                    ))}
                    {course.lessons.length === 0 && <p className="text-center text-gray-500 font-medium py-10 opacity-50">No lessons added yet.</p>}
                </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden group hover:scale-[1.02] transition-all">
                <div className="relative z-10">
                    <h2 className="text-xl font-bold mb-2">Pro Tip</h2>
                    <p className="text-blue-100 mb-6 text-sm">Always add a descriptive title and high-quality video URL to keep students engaged.</p>
                </div>
                <LayoutDashboard className="absolute -right-4 -bottom-4 h-24 w-24 text-blue-400 opacity-20 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-700" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddCoursePage;
