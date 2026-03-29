const express = require('express');
const router = express.Router();
const { getLessonDetails } = require('../controllers/lessonController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:id', protect, getLessonDetails);

module.exports = router;
