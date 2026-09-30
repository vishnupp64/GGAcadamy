const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

const getCourses = async (req, res, next) => {
  try {
    const courses = await prisma.course.findMany({
      where: { isPublished: true },
      include: {
        modules: {
          include: {
            lessons: {
              select: { id: true, title: true, duration: true, isFreePreview: true },
            },
          },
          orderBy: { order: 'asc' },
        },
        _count: {
          select: { enrollments: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return sendSuccess(res, { courses }, 'Course catalog');
  } catch (error) {
    next(error);
  }
};

const getCourseBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!course) {
      return sendError(res, 'Course not found', 404);
    }

    let isEnrolled = false;
    let completedLessonIds = [];

    if (req.user) {
      const enrollment = await prisma.enrollment.findFirst({
        where: { userId: req.user.id, courseId: course.id },
      });
      if (enrollment) isEnrolled = true;

      const progress = await prisma.lessonProgress.findMany({
        where: { userId: req.user.id },
        select: { lessonId: true },
      });
      completedLessonIds = progress.map((p) => p.lessonId);
    }

    return sendSuccess(res, { course, isEnrolled, completedLessonIds }, 'Course details');
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const { title, slug, description, shortDescription, price, discountPrice, thumbnail, isPublished } = req.body;

    if (!title || price === undefined) {
      return sendError(res, 'Title and price are required', 400);
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const course = await prisma.course.create({
      data: {
        title,
        slug: generatedSlug,
        description: description || '',
        shortDescription: shortDescription || '',
        price: parseFloat(price),
        discountPrice: discountPrice ? parseFloat(discountPrice) : null,
        thumbnail: thumbnail || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
    });

    return sendSuccess(res, { course }, 'Course created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, slug, description, shortDescription, price, discountPrice, thumbnail, isPublished } = req.body;

    const course = await prisma.course.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(description !== undefined && { description }),
        ...(shortDescription !== undefined && { shortDescription }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(discountPrice !== undefined && { discountPrice: discountPrice ? parseFloat(discountPrice) : null }),
        ...(thumbnail && { thumbnail }),
        ...(isPublished !== undefined && { isPublished: Boolean(isPublished) }),
      },
    });

    return sendSuccess(res, { course }, 'Course updated');
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.course.delete({ where: { id } });
    return sendSuccess(res, {}, 'Course deleted');
  } catch (error) {
    next(error);
  }
};

const addModule = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { title, order } = req.body;

    const module = await prisma.courseModule.create({
      data: {
        title,
        order: order ? parseInt(order) : 1,
        courseId,
      },
    });

    return sendSuccess(res, { module }, 'Module added', 201);
  } catch (error) {
    next(error);
  }
};

const addLesson = async (req, res, next) => {
  try {
    const { moduleId } = req.params;
    const { title, videoUrl, duration, order, isFreePreview } = req.body;

    const lesson = await prisma.lesson.create({
      data: {
        title,
        videoUrl: videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: duration || '10:00',
        order: order ? parseInt(order) : 1,
        isFreePreview: Boolean(isFreePreview),
        moduleId,
      },
    });

    return sendSuccess(res, { lesson }, 'Lesson added', 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
  addModule,
  addLesson,
};
