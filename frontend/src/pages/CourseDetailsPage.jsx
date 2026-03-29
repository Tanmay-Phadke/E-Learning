import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCourse } from '../context/CourseContext';
import { BookOpen, Rocket, Lock, CheckCircle, Clock, ChevronRight, Loader2, Play } from 'lucide-react';
import toast from 'react-hot-toast';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { getCourseDetails } = useCourse();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCourseDetails(id);
        setCourse(data);
      } catch (err) {
        toast.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, getCourseDetails]);

  const handleEnroll = async () => {
    if (!user) return navigate('/login');
    if (course.type === 'Free') {
        setProcessing(true);
        try {
            await axios.post(`/api/orders/checkout-session`, { courseId: id }, { headers: { Authorization: `Bearer ${user.token}` } });
            toast.success('Course Enrolled Successfully');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Enrollment failed');
        } finally {
            setProcessing(false);
        }
    } else {
        setProcessing(true);
        try {
            const { data } = await axios.post(`/api/orders/checkout-session`, { courseId: id }, { headers: { Authorization: `Bearer ${user.token}` } });
            window.location.href = data.url;
        } catch (err) {
            toast.error(err.response?.data?.message || 'Payment failed');
        } finally {
            setProcessing(false);
        }
    }
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center"><Loader2 className="animate-spin h-10 w-10 text-blue-600" /></div>;
  if (!course) return <div className="min-h-screen flex justify-center items-center dark:text-white">Course not found</div>;

  const isEnrolled = user && user.enrolledCourses?.includes(course._id);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">{course.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">{course.description}</p>
            <div className="flex items-center gap-6 mb-10 text-sm font-medium text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1"><BookOpen className="h-5 w-5 text-blue-500" /> {course.lessons.length} Lessons</span>
              <span className="flex items-center gap-1"><Clock className="h-5 w-5 text-green-500" /> Lifetime Access</span>
            </div>
            {isEnrolled ? (
              <div className="flex items-center gap-4 text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/30 px-6 py-4 rounded-xl inline-flex"><CheckCircle className="h-6 w-6" /><span>You are enrolled in this course</span></div>
            ) : (
                <button onClick={handleEnroll} disabled={processing} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-2xl transition-all shadow-blue-500/20 active:scale-95 disabled:bg-gray-400">
                    {processing ? <Loader2 className="animate-spin h-6 w-6" /> : course.type === 'Free' ? 'Enroll for Free' : `Buy Now ($${course.price})`}
                </button>
            )}
          </div>
          <div className="w-full md:w-1/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700 aspect-video"><img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" /></div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-3xl font-bold dark:text-white mb-8 border-l-4 border-blue-600 pl-4 underline decoration-blue-500 decoration-8 underline-offset-8">Course Curriculum</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {course.lessons.map((lesson, idx) => (
            <div key={lesson._id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border dark:border-gray-700 shadow-sm flex items-center justify-between group hover:border-blue-500 transition-all">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-gray-200 dark:text-gray-700">{(idx + 1).toString().padStart(2, '0')}</span>
                <div><h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{lesson.title}</h3><p className="text-sm text-gray-500 dark:text-gray-400">{lesson.description}</p></div>
              </div>
              {isEnrolled ? <Link to={`/lessons/${lesson._id}`} className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-md"><Play className="h-5 w-5" /></Link> : <Lock className="h-5 w-5 text-gray-400" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
