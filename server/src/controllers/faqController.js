const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

const getFAQs = async (req, res, next) => {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
    });
    return sendSuccess(res, { faqs });
  } catch (error) {
    next(error);
  }
};

const createFAQ = async (req, res, next) => {
  try {
    const { question, answer, order, isPublished } = req.body;

    if (!question || !answer) {
      return sendError(res, 'Question and answer are required', 400);
    }

    const faq = await prisma.fAQ.create({
      data: {
        question,
        answer,
        order: order ? parseInt(order) : 0,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
    });

    return sendSuccess(res, { faq }, 'FAQ created', 201);
  } catch (error) {
    next(error);
  }
};

const updateFAQ = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { question, answer, order, isPublished } = req.body;

    const faq = await prisma.fAQ.update({
      where: { id },
      data: {
        ...(question && { question }),
        ...(answer && { answer }),
        ...(order !== undefined && { order: parseInt(order) }),
        ...(isPublished !== undefined && { isPublished: Boolean(isPublished) }),
      },
    });

    return sendSuccess(res, { faq }, 'FAQ updated');
  } catch (error) {
    next(error);
  }
};

const deleteFAQ = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.fAQ.delete({ where: { id } });
    return sendSuccess(res, {}, 'FAQ deleted');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
};
