const prisma = require('../config/db');
const { sendSuccess } = require('../utils/response');

const getAdminDashboardStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      revenueResult,
      totalCourses,
      totalEnrollments,
      totalMessages,
      unreadMessages,
      recentOrders,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { amount: true },
        where: { paymentStatus: 'PAID' },
      }),
      prisma.course.count(),
      prisma.enrollment.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { firstName: true, lastName: true, email: true } },
        },
      }),
    ]);

    return sendSuccess(res, {
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: revenueResult._sum.amount || 0,
        totalCourses,
        totalEnrollments,
        totalMessages,
        unreadMessages,
      },
      recentOrders,
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where = {};
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
          _count: {
            select: { orders: true, enrollments: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
      prisma.user.count({ where }),
    ]);

    return sendSuccess(res, {
      users,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['USER', 'ADMIN'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, firstName: true, email: true, role: true },
    });

    return sendSuccess(res, { user: updated }, 'User role updated');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminDashboardStats,
  getUsers,
  updateUserRole,
};
