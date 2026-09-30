const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

const getProducts = async (req, res, next) => {
  try {
    const { category, search, minPrice, maxPrice, rating, sortBy, page = 1, limit = 12 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where = { isPublished: true };

    if (category) {
      where.category = { slug: category };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    if (rating) {
      where.rating = { gte: parseFloat(rating) };
    }

    let orderBy = { createdAt: 'desc' };
    if (sortBy === 'price_low') orderBy = { price: 'asc' };
    if (sortBy === 'price_high') orderBy = { price: 'desc' };
    if (sortBy === 'rating') orderBy = { rating: 'desc' };
    if (sortBy === 'newest') orderBy = { createdAt: 'desc' };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          images: true,
        },
        orderBy,
        skip,
        take: limitNum,
      }),
      prisma.product.count({ where }),
    ]);

    return sendSuccess(
      res,
      {
        products,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
        },
      },
      'Products retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        images: true,
      },
    });

    if (!product) {
      return sendError(res, 'Product not found', 404);
    }

    // Get related products from same category
    const relatedProducts = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
        isPublished: true,
      },
      include: {
        category: true,
        images: true,
      },
      take: 4,
    });

    return sendSuccess(res, { product, relatedProducts }, 'Product details');
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      slug,
      description,
      shortDescription,
      price,
      discountPrice,
      rating,
      isPublished,
      features,
      compatibility,
      categoryId,
      imageUrls,
    } = req.body;

    if (!name || !price || !categoryId) {
      return sendError(res, 'Name, price, and categoryId are required.', 400);
    }

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-0]/g, '-').replace(/-+/g, '-');

    const product = await prisma.product.create({
      data: {
        name,
        slug: generatedSlug,
        description: description || '',
        shortDescription: shortDescription || '',
        price: parseFloat(price),
        discountPrice: discountPrice ? parseFloat(discountPrice) : null,
        rating: rating ? parseFloat(rating) : 5.0,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
        features: typeof features === 'object' ? JSON.stringify(features) : features,
        compatibility: compatibility || 'All Devices',
        categoryId,
        images: {
          create: Array.isArray(imageUrls) && imageUrls.length > 0
            ? imageUrls.map((url, idx) => ({ url, isPrimary: idx === 0 }))
            : [{ url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80', isPrimary: true }],
        },
      },
      include: {
        category: true,
        images: true,
      },
    });

    return sendSuccess(res, { product }, 'Product created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      slug,
      description,
      shortDescription,
      price,
      discountPrice,
      rating,
      isPublished,
      features,
      compatibility,
      categoryId,
    } = req.body;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return sendError(res, 'Product not found', 404);
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(description !== undefined && { description }),
        ...(shortDescription !== undefined && { shortDescription }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(discountPrice !== undefined && { discountPrice: discountPrice ? parseFloat(discountPrice) : null }),
        ...(rating !== undefined && { rating: parseFloat(rating) }),
        ...(isPublished !== undefined && { isPublished: Boolean(isPublished) }),
        ...(features !== undefined && { features: typeof features === 'object' ? JSON.stringify(features) : features }),
        ...(compatibility !== undefined && { compatibility }),
        ...(categoryId && { categoryId }),
      },
      include: {
        category: true,
        images: true,
      },
    });

    return sendSuccess(res, { product: updated }, 'Product updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return sendError(res, 'Product not found', 404);
    }

    await prisma.product.delete({ where: { id } });

    return sendSuccess(res, {}, 'Product deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
};
