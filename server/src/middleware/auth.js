const { verifyToken } = require('../utils/jwt');
const { sendError } = require('../utils/response');
const prisma = require('../config/db');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'Authentication required. No token provided.', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return sendError(res, 'User no longer exists.', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return sendError(res, 'Invalid or expired token.', 401);
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, firstName: true, lastName: true, email: true, role: true },
      });
      if (user) req.user = user;
    }
  } catch (err) {
    // Ignore errors for optional auth
  }
  next();
};

const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return sendError(res, 'Access denied. Admin rights required.', 403);
  }
  next();
};

module.exports = {
  authenticate,
  optionalAuth,
  requireAdmin,
};
