const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

const toggleLessonCompletion = async (req, res, next) => {
  try {
    const { lessonId } = req.params;

    const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
    if (!lesson) {
      return sendError(res, 'Lesson not found', 404);
    }

    const existingProgress = await prisma.lessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: req.user.id,
          lessonId,
        },
      },
    });

    let completed = true;
    if (existingProgress) {
      completed = !existingProgress.isCompleted;
      await prisma.lessonProgress.update({
        where: { id: existingProgress.id },
        data: { isCompleted: completed },
      });
    } else {
      await prisma.lessonProgress.create({
        data: {
          userId: req.user.id,
          lessonId,
          isCompleted: true,
        },
      });
    }

    return sendSuccess(res, { lessonId, isCompleted: completed }, 'Lesson progress updated');
  } catch (error) {
    next(error);
  }
};

const getCourseProgress = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          include: { lessons: { select: { id: true } } },
        },
      },
    });

    if (!course) {
      return sendError(res, 'Course not found', 404);
    }

    const lessonIds = [];
    course.modules.forEach((m) => {
      m.lessons.forEach((l) => lessonIds.push(l.id));
    });

    const userProgress = await prisma.lessonProgress.findMany({
      where: {
        userId: req.user.id,
        lessonId: { in: lessonIds },
        isCompleted: true,
      },
    });

    const completedLessonIds = userProgress.map((p) => p.lessonId);
    const totalLessons = lessonIds.length;
    const completedCount = completedLessonIds.length;
    const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    return sendSuccess(res, {
      courseId,
      totalLessons,
      completedCount,
      percentage,
      completedLessonIds,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  toggleLessonCompletion,
  getCourseProgress,
};
