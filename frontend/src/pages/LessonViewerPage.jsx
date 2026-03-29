import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCourse } from '../context/CourseContext';
import { Play, FileText, CheckCircle, ChevronLeft, Loader2, BookOpen, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const LessonViewerPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { getLessonDetails } = useCourse();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getLessonDetails(id);
                setLesson(data);
            } catch (err) {
                toast.error(err);
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id, getLessonDetails, navigate]);

    if (loading) return <div className="min-h-screen flex justify-center items-center"><Loader2 className="animate-spin h-10 w-10 text-blue-600" /></div>;
    if (!lesson) return <div className="min-h-screen flex justify-center items-center dark:text-white">Lesson not found</div>;

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-20">
            <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 py-6 mb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6">
                    <Link to={`/courses/${lesson.course}`} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><ChevronLeft className="h-5 w-5" /></Link>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{lesson.title}</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-10">
                    <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white dark:ring-gray-800">
                        {lesson.videoUrl.includes('youtube.com') || lesson.videoUrl.includes('youtu.be') ? (
                            <iframe className="w-full h-full" src={lesson.videoUrl.replace('watch?v=', 'embed/')} title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        ) : (
                            <video controls className="w-full h-full"><source src={lesson.videoUrl} type="video/mp4" />Your browser does not support the video tag.</video>
                        )}
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 underline decoration-blue-500 decoration-4 underline-offset-4"><FileText className="h-6 w-6 text-blue-500" />Lesson Notes</h2>
                        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed">{lesson.notes || 'No notes provided for this lesson.'}</p>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border dark:border-gray-700">
                        <h2 className="text-xl font-bold dark:text-white mb-6 underline decoration-blue-500 decoration-4 underline-offset-4 flex items-center gap-2"><BookOpen className="h-5 w-5 text-blue-500" />Lesson Details</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400"><Clock className="h-5 w-5 text-green-500" /><span>Duration: 15 mins</span></div>
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400"><CheckCircle className="h-5 w-5 text-blue-500" /><span>Free Access</span></div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden group hover:scale-[1.02] transition-all">
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold mb-2">Need Help?</h2>
                            <p className="text-blue-100 mb-6 text-sm">Our mentors are here to help you in the course forum.</p>
                            <button className="bg-white text-blue-600 px-6 py-2 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all">Ask Question</button>
                        </div>
                        <Rocket className="absolute -right-4 -bottom-4 h-24 w-24 text-blue-400 opacity-20 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-700" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonViewerPage;
