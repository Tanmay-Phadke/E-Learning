const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, getEnrolledCourses } = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getCourses);
router.get('/enrolled', protect, getEnrolledCourses);
router.get('/:id', getCourseById);

module.exports = router;
