const asyncHandler = require('express-async-handler');
const Course = require('../models/courseModel');
const Lesson = require('../models/lessonModel');
const User = require('../models/userModel');

const getCourses = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? { title: { $regex: req.query.keyword, $options: 'i' } }
    : {};
  const courses = await Course.find({ ...keyword }).populate('lessons');
  res.json(courses);
});

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate('lessons');
  if (course) {
    res.json(course);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

const getEnrolledCourses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: 'enrolledCourses',
    populate: 'lessons',
  });
  if (user) {
    res.json(user.enrolledCourses);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = { getCourses, getCourseById, getEnrolledCourses };
