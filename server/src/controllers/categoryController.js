const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

const getCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: 'asc' },
    });
    return sendSuccess(res, { categories }, 'Categories list');
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, slug, description } = req.body;

    if (!name) {
      return sendError(res, 'Category name is required', 400);
    }

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const category = await prisma.category.create({
      data: {
        name,
        slug: generatedSlug,
        description: description || '',
      },
    });

    return sendSuccess(res, { category }, 'Category created', 201);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, slug, description } = req.body;

    const category = await prisma.category.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(description !== undefined && { description }),
      },
    });

    return sendSuccess(res, { category }, 'Category updated');
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({ where: { id } });
    return sendSuccess(res, {}, 'Category deleted');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
