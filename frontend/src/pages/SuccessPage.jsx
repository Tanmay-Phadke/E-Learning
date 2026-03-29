import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, ArrowRight, Loader2, Home, BookOpen, PartyPopper } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const SuccessPage = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verify = async () => {
            if (!sessionId) return navigate('/dashboard');
            try {
                await axios.post('/api/orders/verify', { sessionId }, { headers: { Authorization: `Bearer ${user.token}` } });
                toast.success('Course Enrolled Successfully!');
            } catch (err) {
                toast.error(err.response?.data?.message || 'Verification failed');
            } finally {
                setLoading(false);
            }
        };
        verify();
    }, [sessionId, user.token, navigate]);

    if (loading) return <div className="min-h-screen flex flex-col justify-center items-center"><Loader2 className="animate-spin h-10 w-10 text-blue-600 mb-4" /><p className="text-gray-600 dark:text-gray-400 font-bold">Verifying your purchase...</p></div>;

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none overflow-hidden select-none"><div className="grid grid-cols-6 gap-8 rotate-12 scale-150">{[...Array(60)].map((_, i) => <PartyPopper key={i} className="h-20 w-20 text-blue-500" />)}</div></div>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center border dark:border-gray-700 relative z-10 overflow-hidden">
                <div className="mb-8 relative"><div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 animate-pulse"></div><CheckCircle className="h-24 w-24 text-green-500 mx-auto relative z-10" /></div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Congrats, {user.name}!</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed font-medium">Your enrollment is confirmed. Start your learning journey today and master new skills!</p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/dashboard" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center space-x-2 active:scale-95"><BookOpen className="h-5 w-5" /><span>My Dashboard</span></Link>
                    <Link to="/" className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 active:scale-95"><Home className="h-5 w-5" /><span>Go Home</span></Link>
                </div>
            </motion.div>
        </div>
    );
};

export default SuccessPage;
