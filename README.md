# GG Academy - Full-Stack Gaming E-Learning & E-Commerce Platform

A production-ready full-stack website inspired by and functionally replicating the GG Academy website ([ggacademy.in](https://ggacademy.in)).

Built with a dark gaming aesthetic, React + Vite frontend, Express REST API backend, PostgreSQL database, Prisma ORM, and JWT authentication.

---

## 🚀 Features Summary

- **Gaming UI & Dark Aesthetic**: Modern neon glow effects, glassmorphism cards, responsive layouts.
- **E-Commerce Store**: Product listings, custom sensitivity presets, HUD configurations, category filters, search, price range filter, sorting.
- **Cart & Merging**: Real cart with guest localStorage support, auto-merging guest cart into database cart upon account login.
- **Checkout & Payment Abstraction**: Full checkout flow backed by `paymentService.js` abstraction layer (ready for Razorpay/Stripe).
- **Student Mastery Dashboard (`/my-courses`)**: Track course completion progress, lesson checklists, video module player (`/courses/:slug`).
- **Comprehensive Admin Console (`/admin`)**:
  - Dashboard metrics (Total Revenue, Orders, Users, Products, Courses, Enrollments, Unread Messages)
  - CRUD Products & Image Management
  - CRUD Courses, Modules & Video Lessons
  - Order Management & Status Updater
  - User Search & Role Switcher (`USER` / `ADMIN`)
  - Testimonial Reviews & FAQ Accordion Manager
  - Contact Inquiries & Unread Message Counter
  - Global Site Settings (Dynamic top Announcement Bar text, Student statistics count, Hero heading)
- **Contact & Inquiries**: Form submission stored directly in PostgreSQL database.
- **JWT & Role Security**: Secure password hashing with bcrypt, role-based authorization middleware.

---

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, React Router v6, Axios, Lucide React, Modern CSS (Variables & Glassmorphism)
- **Backend**: Node.js, Express.js, REST API, Helmet, CORS, Rate Limiting, Multer File Uploads
- **Database & ORM**: PostgreSQL, Prisma ORM
- **Auth**: JWT (JSON Web Tokens), bcryptjs password hashing

---

## 📖 Step-by-Step Installation & Operational Guide

### Step 1: Install Dependencies

From the project root (`/d:/GGAcadamy`), install root, client, and server dependencies:

```bash
# Install root orchestrator package
npm install

# Install backend dependencies
cd server
npm install
cd ..

# Install frontend dependencies
cd client
npm install
cd ..
```

Or run the automated setup script:
```bash
npm run setup
```

---

### Step 2: Create PostgreSQL Database

Ensure PostgreSQL is running locally on your system. Create a database named `ggacademy`:

```sql
CREATE DATABASE ggacademy;
```

---

### Step 3: Configure Environment Variables

Create `.env` in the root directory (or copy from `.env.example`):

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ggacademy?schema=public"
PORT=5000
NODE_ENV=development
JWT_SECRET="ggacademy_super_secret_jwt_key_2026_gaming_pro"
JWT_EXPIRES_IN="7d"
CLIENT_URL="http://localhost:5173"
PAYMENT_SECRET="gg_pay_sec_demo_987654321"
```

*Note: Update username and password in `DATABASE_URL` if your local PostgreSQL setup differs.*

---

### Step 4: Run Prisma Database Push / Migrations

Generate Prisma Client and push schema tables to PostgreSQL:

```bash
# Generate Prisma Client
npx prisma generate

# Push database schema to PostgreSQL
npx prisma db push
```

---

### Step 5: Seed Demo Data

Populate the database with initial Admin, Student, Categories, Products, Courses, Modules, Lessons, FAQs, Testimonials, and Site Settings:

```bash
node prisma/seed.js
```

---

### Step 6: Start the Platform

Run both Express Backend API and React Vite Frontend concurrently from the root directory:

```bash
npm run dev
```

- **Frontend UI**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000/api`

---

### Step 7: Access Credentials & Admin Console

You can log in with the pre-configured demo credentials:

#### 👑 Admin Console (`/admin`)
- **Email**: `admin@ggacademy.in`
- **Password**: `Admin@123`

#### 🎮 Student Account (`/my-courses`)
- **Email**: `student@ggacademy.in`
- **Password**: `Student@123`

---

### Step 8: Production Build

To build the optimized client bundle for production deployment:

```bash
npm run build
```

The production assets will be generated in `client/dist`.

---

## 📁 Project Directory Tree

```
d:/GGAcadamy
├── client/                     # React + Vite Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components (Header, Hero, FeatureGrid, TestimonialSlider, FAQAccordion, ComparisonTable, ProductCard, CartItem, PriceDisplay, LoadingSpinner, EmptyState, etc.)
│   │   ├── context/            # AuthContext & CartContext (guest + DB cart sync)
│   │   ├── layouts/            # MainLayout & AdminLayout
│   │   ├── pages/              # Home, Shop, Collection, ProductDetails, Cart, Checkout, MyCourses, CourseView, Account, Contact, Legal, Admin Sub-Pages
│   │   ├── services/           # Axios API services
│   │   ├── App.jsx             # React Router definitions
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Dark gaming design system
├── server/                     # Express REST API Server
│   ├── src/
│   │   ├── config/             # Prisma client instance
│   │   ├── controllers/        # Auth, Product, Cart, Order, Course, Admin, Content, Contact, Settings
│   │   ├── middleware/         # Auth JWT, Admin guard, Error handler, Upload middleware
│   │   ├── routes/             # Express API routes
│   │   └── services/           # Payment service abstraction layer
│   ├── app.js
│   └── server.js
├── prisma/
│   ├── schema.prisma           # Complete PostgreSQL schema definition
│   └── seed.js                 # Database seed script
├── .env.example
├── package.json
└── README.md
```
