import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, LayoutDashboard, Settings } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">InoLearn</Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/courses" className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center px-1 pt-1 text-sm font-medium">Courses</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors"><LayoutDashboard className="h-5 w-5" /></Link>
                {user.isAdmin && <Link to="/admin" className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors"><Settings className="h-5 w-5" /></Link>}
                <div className="flex items-center space-x-2"><User className="h-5 w-5 text-gray-400" /><span className="text-sm font-medium dark:text-white">{user.name}</span></div>
                <button onClick={handleLogout} className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"><LogOut className="h-5 w-5" /></button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-900 dark:text-gray-100 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-md">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
