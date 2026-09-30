const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const errorMiddleware = require('./src/middleware/errorMiddleware');

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const courseRoutes = require('./src/routes/courseRoutes');
const enrollmentRoutes = require('./src/routes/enrollmentRoutes');
const testimonialRoutes = require('./src/routes/testimonialRoutes');
const faqRoutes = require('./src/routes/faqRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const settingRoutes = require('./src/routes/settingRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

const app = express();

// Security Header settings
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration
const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:5173', 'http://127.0.0.1:5173'];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow during dev
      }
    },
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per windowMs
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
});
app.use('/api', limiter);

// Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'GG Academy API Server operational 🚀' });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/admin', adminRoutes);

// Centralized Error Middleware
app.use(errorMiddleware);

// Serve static client assets in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/dist');
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

module.exports = app;
