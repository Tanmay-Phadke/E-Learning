const express = require('express');
const router = express.Router();
const { createCourse, updateCourse, deleteCourse, addLesson, deleteLesson, getUsers, getOrders } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect);
router.use(admin);

router.post('/courses', createCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);
router.post('/courses/:id/lessons', addLesson);
router.delete('/lessons/:id', deleteLesson);
router.get('/users', getUsers);
router.get('/orders', getOrders);

module.exports = router;
