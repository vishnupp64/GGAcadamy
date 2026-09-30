const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

const getMyEnrollments = async (req, res, next) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: req.user.id },
      include: {
        course: {
          include: {
            modules: {
              include: {
                lessons: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Fetch user progress for lesson calculations
    const userProgress = await prisma.lessonProgress.findMany({
      where: { userId: req.user.id, isCompleted: true },
      select: { lessonId: true },
    });
    const completedLessonIds = new Set(userProgress.map((p) => p.lessonId));

    const formattedEnrollments = enrollments.map((e) => {
      let totalLessons = 0;
      let completedLessons = 0;

      e.course.modules.forEach((mod) => {
        mod.lessons.forEach((les) => {
          totalLessons++;
          if (completedLessonIds.has(les.id)) {
            completedLessons++;
          }
        });
      });

      const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

      return {
        id: e.id,
        course: e.course,
        totalLessons,
        completedLessons,
        progressPercentage,
        enrolledAt: e.createdAt,
      };
    });

    return sendSuccess(res, { enrollments: formattedEnrollments }, 'Student enrolled courses');
  } catch (error) {
    next(error);
  }
};

const createEnrollment = async (req, res, next) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return sendError(res, 'courseId is required', 400);
    }

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return sendError(res, 'Course not found', 404);
    }

    const existing = await prisma.enrollment.findFirst({
      where: { userId: req.user.id, courseId },
    });

    if (existing) {
      return sendSuccess(res, { enrollment: existing }, 'Already enrolled');
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: req.user.id,
        courseId,
      },
      include: { course: true },
    });

    return sendSuccess(res, { enrollment }, 'Enrolled successfully', 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyEnrollments,
  createEnrollment,
};
