const asyncHandler = require('express-async-handler');
const Lesson = require('../models/lessonModel');
const Course = require('../models/courseModel');
const User = require('../models/userModel');

const getLessonDetails = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);
  if (lesson) {
    const course = await Course.findById(lesson.course);
    if (!course) {
      res.status(404);
      throw new Error('Course not found');
    }
    if (course.type === 'Free') return res.json(lesson);
    const user = await User.findById(req.user._id);
    if (user && user.enrolledCourses.includes(course._id)) {
      res.json(lesson);
    } else {
      res.status(403);
      throw new Error('Not enrolled in this course');
    }
  } else {
    res.status(404);
    throw new Error('Lesson not found');
  }
});

module.exports = { getLessonDetails };
