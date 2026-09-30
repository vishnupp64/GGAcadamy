const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

const submitContactMessage = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    if (!firstName || !lastName || !email || !subject || !message) {
      return sendError(res, 'Please complete all required fields.', 400);
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase().trim(),
        phone: phone || null,
        subject,
        message,
      },
    });

    return sendSuccess(res, { contactMessage }, 'Message sent successfully! We will get back to you shortly.', 201);
  } catch (error) {
    next(error);
  }
};

const getContactMessages = async (req, res, next) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return sendSuccess(res, { messages });
  } catch (error) {
    next(error);
  }
};

const markMessageAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
    return sendSuccess(res, { message: updated }, 'Marked as read');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContactMessage,
  getContactMessages,
  markMessageAsRead,
};
