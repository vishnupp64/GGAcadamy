const { sendError } = require('../utils/response');

const errorMiddleware = (err, req, res, next) => {
  console.error('🔥 Server Error Handler:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return sendError(res, message, statusCode);
};

module.exports = errorMiddleware;
