const asyncHandler = require('express-async-handler');
const Course = require('../models/courseModel');
const Lesson = require('../models/lessonModel');
const User = require('../models/userModel');
const Order = require('../models/orderModel');

const createCourse = asyncHandler(async (req, res) => {
  const { title, description, price, thumbnail, type } = req.body;
  const course = new Course({ title, description, price, thumbnail, type, user: req.user._id });
  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
});

const updateCourse = asyncHandler(async (req, res) => {
  const { title, description, price, thumbnail, type } = req.body;
  const course = await Course.findById(req.params.id);
  if (course) {
    course.title = title || course.title;
    course.description = description || course.description;
    course.price = price || course.price;
    course.thumbnail = thumbnail || course.thumbnail;
    course.type = type || course.type;
    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (course) {
    await Lesson.deleteMany({ course: req.params.id });
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course removed' });
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

const addLesson = asyncHandler(async (req, res) => {
  const { title, description, videoUrl, notes } = req.body;
  const course = await Course.findById(req.params.id);
  if (course) {
    const lesson = new Lesson({ title, description, videoUrl, notes, course: req.params.id });
    const createdLesson = await lesson.save();
    course.lessons.push(createdLesson._id);
    await course.save();
    res.status(201).json(createdLesson);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

const deleteLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);
  if (lesson) {
    const course = await Course.findById(lesson.course);
    if (course) {
      course.lessons = course.lessons.filter((l) => l.toString() !== req.params.id);
      await course.save();
    }
    await Lesson.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lesson removed' });
  } else {
    res.status(404);
    throw new Error('Lesson not found');
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).populate('enrolledCourses');
  res.json(users);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user').populate('course');
  res.json(orders);
});

module.exports = { createCourse, updateCourse, deleteCourse, addLesson, deleteLesson, getUsers, getOrders };
