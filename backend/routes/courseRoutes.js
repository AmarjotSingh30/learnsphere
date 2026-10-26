// backend/routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const {
  createCourse,
  getCourses,
  getCourseById,
  addLesson,
  deleteLesson
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Removed 'protect' from the GET route so the public catalog works
router.route('/')
  .get(getCourses)
  .post(protect, authorize('Instructor', 'Admin'), createCourse);

// Removed 'protect' from the GET by ID route so public course detail pages work later
router.route('/:id')
  .get(getCourseById);

router.route('/:id/lessons')
  .post(protect, authorize('Instructor', 'Admin'), addLesson);

router.route('/:courseId/lessons/:lessonId')
  .delete(protect, authorize('Instructor', 'Admin'), deleteLesson);

module.exports = router;