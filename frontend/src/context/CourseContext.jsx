import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CourseContext = createContext();
export const useCourse = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = async (keyword = '') => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/courses?keyword=${keyword}`);
      setCourses(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch courses');
      setLoading(false);
    }
  };

  const getCourseDetails = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/courses/${id}`);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      throw err.response?.data?.message || 'Failed to fetch details';
    }
  };

  const getLessonDetails = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/lessons/${id}`);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      throw err.response?.data?.message || 'Failed to fetch lesson';
    }
  };

  return (
    <CourseContext.Provider value={{ courses, fetchCourses, getCourseDetails, getLessonDetails, loading, error }}>
      {children}
    </CourseContext.Provider>
  );
};
