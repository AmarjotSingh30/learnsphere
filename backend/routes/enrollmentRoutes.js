const express = require('express');
const router = express.Router();
const {
  enrollInCourse,
  getMyEnrollments,
  markLessonComplete,
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, enrollInCourse)
  .get(protect, getMyEnrollments);

router.route('/:id/complete')
  .put(protect, markLessonComplete);

module.exports = router;