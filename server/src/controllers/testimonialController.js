const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
    });
    return sendSuccess(res, { testimonials });
  } catch (error) {
    next(error);
  }
};

const createTestimonial = async (req, res, next) => {
  try {
    const { name, location, rating, comment, avatar, order, isPublished } = req.body;

    if (!name || !comment) {
      return sendError(res, 'Name and comment are required', 400);
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        location: location || '',
        rating: rating ? parseInt(rating) : 5,
        comment,
        avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        order: order ? parseInt(order) : 0,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
    });

    return sendSuccess(res, { testimonial }, 'Testimonial created', 201);
  } catch (error) {
    next(error);
  }
};

const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, location, rating, comment, avatar, order, isPublished } = req.body;

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(location !== undefined && { location }),
        ...(rating !== undefined && { rating: parseInt(rating) }),
        ...(comment && { comment }),
        ...(avatar && { avatar }),
        ...(order !== undefined && { order: parseInt(order) }),
        ...(isPublished !== undefined && { isPublished: Boolean(isPublished) }),
      },
    });

    return sendSuccess(res, { testimonial }, 'Testimonial updated');
  } catch (error) {
    next(error);
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.testimonial.delete({ where: { id } });
    return sendSuccess(res, {}, 'Testimonial deleted');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
