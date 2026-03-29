import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CourseListPage from './pages/CourseListPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import LessonViewerPage from './pages/LessonViewerPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManageCoursesPage from './pages/ManageCoursesPage';
import AddCoursePage from './pages/AddCoursePage';
import SuccessPage from './pages/SuccessPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/courses" element={<CourseListPage />} />
              <Route path="/courses/:id" element={<CourseDetailsPage />} />
              <Route path="/lessons/:id" element={<LessonViewerPage />} />
              <Route path="/success" element={<SuccessPage />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/courses" element={<ManageCoursesPage />} />
              <Route path="/admin/courses/add" element={<AddCoursePage />} />
              <Route path="/admin/courses/edit/:id" element={<AddCoursePage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
