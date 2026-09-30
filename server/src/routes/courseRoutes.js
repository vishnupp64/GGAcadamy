const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
  addModule,
  addLesson,
} = require('../controllers/courseController');
const { toggleLessonCompletion, getCourseProgress } = require('../controllers/progressController');
const { optionalAuth, authenticate, requireAdmin } = require('../middleware/auth');

router.get('/', getCourses);
router.get('/:slug', optionalAuth, getCourseBySlug);

// Progress routes
router.get('/:courseId/progress', authenticate, getCourseProgress);
router.post('/lessons/:lessonId/complete', authenticate, toggleLessonCompletion);

// Admin Routes
router.post('/', authenticate, requireAdmin, createCourse);
router.put('/:id', authenticate, requireAdmin, updateCourse);
router.delete('/:id', authenticate, requireAdmin, deleteCourse);
router.post('/:courseId/modules', authenticate, requireAdmin, addModule);
router.post('/modules/:moduleId/lessons', authenticate, requireAdmin, addLesson);

module.exports = router;
