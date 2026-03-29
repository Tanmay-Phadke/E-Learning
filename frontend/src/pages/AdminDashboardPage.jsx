import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Users, BookOpen, ShoppingBag, DollarSign, ArrowUpRight, Loader2, Play, PlusCircle, LayoutDashboard, Settings, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ users: 0, courses: 0, orders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: users } = await axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${user.token}` } });
        const { data: courses } = await axios.get('/api/courses');
        const { data: orders } = await axios.get('/api/admin/orders', { headers: { Authorization: `Bearer ${user.token}` } });
        const revenue = orders.reduce((acc, order) => acc + order.amountPaid, 0);
        setStats({ users: users.length, courses: courses.length, orders: orders.length, revenue });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user.token]);

  const cards = [
    { title: 'Total Users', value: stats.users, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', darkBg: 'dark:bg-blue-900/30' },
    { title: 'Total Courses', value: stats.courses, icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-100', darkBg: 'dark:bg-purple-900/30' },
    { title: 'Total Orders', value: stats.orders, icon: ShoppingBag, color: 'text-green-600', bg: 'bg-green-100', darkBg: 'dark:bg-green-900/30' },
    { title: 'Total Revenue', value: `$${stats.revenue.toFixed(2)}`, icon: DollarSign, color: 'text-orange-600', bg: 'bg-orange-100', darkBg: 'dark:bg-orange-900/30' },
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-blue-600" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border dark:border-gray-700">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center gap-3"><LayoutDashboard className="h-10 w-10 text-blue-600" />Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Monitor your platform’s growth and success metrics.</p>
        </div>
        <div className="flex gap-4 mt-6 md:mt-0">
          <Link to="/admin/courses/add" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl active:scale-95 transition-all"><PlusCircle className="h-5 w-5" />New Course</Link>
          <Link to="/admin/courses" className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg"><Settings className="h-5 w-5" />Manage Catalog</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border dark:border-gray-700 hover:shadow-2xl transition-all group overflow-hidden relative">
            <div className={`p-4 rounded-2xl ${card.bg} ${card.darkBg} ${card.color} w-fit mb-6 group-hover:scale-110 transition-transform`}><card.icon className="h-8 w-8" /></div>
            <h3 className="text-lg font-bold text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-100 transition-colors">{card.title}</h3>
            <p className="text-4xl font-black text-gray-900 dark:text-white mt-1">{card.value}</p>
            <ArrowUpRight className="absolute top-6 right-6 h-6 w-6 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl border dark:border-gray-700">
            <h2 className="text-2xl font-bold dark:text-white mb-6 underline decoration-blue-500 decoration-4 underline-offset-4">Recent Sales</h2>
            <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border dark:border-gray-700 flex items-center justify-between group hover:bg-blue-600 transition-all text-gray-900 dark:text-white hover:text-white font-bold">
                    <div className="flex items-center gap-4"><div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-white group-hover:text-blue-600"><DollarSign className="h-5 w-5" /></div><span>Course Growth Pro Enrollments</span></div>
                    <ChevronRight className="h-5 w-5 opacity-50 group-hover:opacity-100" />
                </div>
            </div>
        </div>
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-10 rounded-3xl shadow-2xl text-white relative flex flex-col justify-end min-h-[400px]">
            <PlusCircle className="h-24 w-24 text-white/10 absolute -top-8 -right-8 rotate-12" />
            <h2 className="text-3xl font-black mb-4">Start Scaling Your Catalog</h2>
            <p className="text-indigo-100 mb-8 font-medium">Create engaging lessons, upload resources, and monetize your content with our simplified course creator.</p>
            <Link to="/admin/courses/add" className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-center shadow-2xl hover:bg-indigo-50 transition-all active:scale-95">Create New Content</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
