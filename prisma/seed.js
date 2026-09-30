const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting GG Academy Seed Data Population...');

  // Clear existing data in reverse order of dependencies
  await prisma.lessonProgress.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.courseModule.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.fAQ.deleteMany({});
  await prisma.contactMessage.deleteMany({});
  await prisma.siteSetting.deleteMany({});
  await prisma.announcement.deleteMany({});

  // 1. Create Users
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const studentPassword = await bcrypt.hash('Student@123', 10);

  const admin = await prisma.user.create({
    data: {
      firstName: 'GG',
      lastName: 'Admin',
      email: 'admin@ggacademy.in',
      phone: '+91 9876543210',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const student = await prisma.user.create({
    data: {
      firstName: 'Rahul',
      lastName: 'Sharma',
      email: 'student@ggacademy.in',
      phone: '+91 9812345678',
      password: studentPassword,
      role: 'USER',
    },
  });

  console.log('✅ Created Admin:', admin.email);
  console.log('✅ Created Student:', student.email);

  // 2. Create Categories
  const catSensi = await prisma.category.create({
    data: {
      name: 'Sensitivity Settings',
      slug: 'sensitivity-settings',
      description: 'Pro calibrated game sensitivity packs for headshot precision and auto aim control.',
    },
  });

  const catHud = await prisma.category.create({
    data: {
      name: 'HUD Configurations',
      slug: 'hud-configurations',
      description: 'Custom 2-finger, 3-finger, and 4-finger claw layout configurations.',
    },
  });

  const catCourses = await prisma.category.create({
    data: {
      name: 'Mastery Courses',
      slug: 'mastery-courses',
      description: 'Comprehensive video training modules from top esports creators.',
    },
  });

  const catTools = await prisma.category.create({
    data: {
      name: 'Drag & Gloo Wall Tools',
      slug: 'drag-gloo-tools',
      description: 'Elevator Gloo Wall technique guides and drag trick presets.',
    },
  });

  // 3. Create Products
  const prod1 = await prisma.product.create({
    data: {
      name: 'GG SENSI VIP PACK (Auto Headlock Edition)',
      slug: 'gg-sensi-vip-pack',
      description: 'The ultimate Free Fire sensitivity preset engineered for max headshot rate. Compatible with all Android & iOS devices. Includes DPI calibration calculator and smooth recoil suppression configuration.',
      shortDescription: 'Auto Headlock & Pro Game Sensitivity preset for 99% Headshot precision.',
      price: 999,
      discountPrice: 499,
      rating: 4.9,
      isPublished: true,
      features: JSON.stringify([
        'Auto Headlock Drag Techniques',
        'Device-Specific DPI Calibration',
        'Zero Recoil Sensitivity Preset',
        'Works on Low & High-End Devices',
        'Lifetime Free Updates'
      ]),
      compatibility: 'Android & iOS All Devices',
      categoryId: catSensi.id,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
            isPrimary: true,
          },
          {
            url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
            isPrimary: false,
          }
        ],
      },
    },
  });

  const prod2 = await prisma.product.create({
    data: {
      name: 'PRO HUD CONFIGURATION MAX (3 & 4 Finger Claw)',
      slug: 'pro-hud-configuration-max',
      description: 'Ergonomic Custom HUD layout designed for ultra-fast reflex action, 360 Gloo Wall placement, and instant weapon switches.',
      shortDescription: 'Optimized claw layouts for fastest Gloo Wall deployment and reflex movement.',
      price: 699,
      discountPrice: 349,
      rating: 4.8,
      isPublished: true,
      features: JSON.stringify([
        'Fast Gloo Button Position Guide',
        'Fast Scope + Shoot Finger Alignment',
        'Reduces Finger Fatigue',
        'Custom Code Import Ready'
      ]),
      compatibility: 'All Mobile Screen Sizes',
      categoryId: catHud.id,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
            isPrimary: true,
          }
        ],
      },
    },
  });

  const prod3 = await prisma.product.create({
    data: {
      name: 'ULTIMATE ELEVATOR GLOO WALL TACTICS PACK',
      slug: 'ultimate-elevator-gloo-wall-tactics',
      description: 'Learn the secret 0.1s Elevator Gloo Wall trick used by tournament champions. Protect yourself instantly while pushing enemies.',
      shortDescription: 'Master 0.1s Elevator Gloo Wall technique with step-by-step video breakdown.',
      price: 1299,
      discountPrice: 699,
      rating: 5.0,
      isPublished: true,
      features: JSON.stringify([
        '0.1s Fast Sit-Down Gloo Wall Technique',
        '360 Degree Cover Routine',
        '1v4 Survival Strategy',
        'Ranked Game Clutch Methods'
      ]),
      compatibility: 'Mobile & Emulator Supported',
      categoryId: catTools.id,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
            isPrimary: true,
          }
        ],
      },
    },
  });

  const prod4 = await prisma.product.create({
    data: {
      name: 'GOLD MASTERY COURSE BUNDLE',
      slug: 'gold-mastery-course-bundle',
      description: 'Complete access to all GG Academy modules: Sensitivity calibration, Custom HUD setup, Drag tricks, Tournament positioning, and mental match routines.',
      shortDescription: 'All-in-one mastery bundle with guaranteed gameplay improvement.',
      price: 2499,
      discountPrice: 1299,
      rating: 4.9,
      isPublished: true,
      features: JSON.stringify([
        'Full Course Access with 20+ HD Video Lessons',
        'Includes All Sensi Presets & HUD Files',
        'Direct Discord Community Access',
        'Certificate of Mastery Completion'
      ]),
      compatibility: 'All Platforms',
      categoryId: catCourses.id,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=800&q=80',
            isPrimary: true,
          }
        ],
      },
    },
  });

  console.log('✅ Created Products');

  // 4. Create Courses with Modules & Lessons
  const course1 = await prisma.course.create({
    data: {
      title: 'GG Academy Free Fire Headshot & Gloo Mastery',
      slug: 'free-fire-headshot-gloo-mastery',
      description: 'Master the mechanics of high-drag aiming, headshot locks, smooth movement speed, and instant Gloo Wall placement.',
      shortDescription: 'Step-by-step video academy from novice to tournament-grade player.',
      price: 1499,
      discountPrice: 799,
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      isPublished: true,
      modules: {
        create: [
          {
            title: 'Module 1: Foundations of Sensitivity & Drag Control',
            order: 1,
            lessons: {
              create: [
                {
                  title: '1.1 Understanding In-Game Sensitivity & DPI Settings',
                  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: '12:45',
                  order: 1,
                  isFreePreview: true,
                },
                {
                  title: '1.2 Perfecting the Drag Speed & Angle Formula',
                  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: '18:10',
                  order: 2,
                  isFreePreview: false,
                },
              ],
            },
          },
          {
            title: 'Module 2: Elevator Gloo Wall & Fast Defense',
            order: 2,
            lessons: {
              create: [
                {
                  title: '2.1 0.1s Fast Sit-Down Gloo Wall Secret',
                  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: '15:30',
                  order: 1,
                  isFreePreview: false,
                },
                {
                  title: '2.2 1v4 Clutch Positioning & HUD Muscle Memory',
                  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: '22:15',
                  order: 2,
                  isFreePreview: false,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Automatically enroll student in course 1
  await prisma.enrollment.create({
    data: {
      userId: student.id,
      courseId: course1.id,
    },
  });

  console.log('✅ Created Courses & Initial Student Enrollment');

  // 5. Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Aman V.',
        location: 'Delhi',
        rating: 5,
        comment: 'After applying GG SENSI VIP Pack, my headshot rate jumped from 32% to 68% in 3 days! Unbelievable precision.',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        order: 1,
      },
      {
        name: 'Rohan K.',
        location: 'Mumbai',
        rating: 5,
        comment: 'The Elevator Gloo Wall tutorial changed my game completely. I can now clutch 1v3 situations effortlessly.',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
        order: 2,
      },
      {
        name: 'Priya S.',
        location: 'Bengaluru',
        rating: 5,
        comment: 'Best HUD setup guide ever. Very easy to follow step-by-step videos and super friendly customer support!',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        order: 3,
      },
    ],
  });
  console.log('✅ Created Testimonials');

  // 6. FAQs
  await prisma.fAQ.createMany({
    data: [
      {
        question: 'What are the main features included in GG Academy products?',
        answer: 'Our packages include custom-calibrated sensitivity presets, optimized claw HUD layouts, step-by-step video training tutorials, DPI speed calculators, and lifetime access to future updates.',
        order: 1,
      },
      {
        question: 'How will this product improve my gameplay?',
        answer: 'By providing mathematically calibrated sensitivity settings and ergonomic HUD layouts, your headshot accuracy, drag speed, and Gloo Wall response time will dramatically improve.',
        order: 2,
      },
      {
        question: 'Is it suitable for all skill levels and devices?',
        answer: 'Yes! Whether you are a beginner on a 2GB RAM phone or an experienced player aiming for tournament glory, our settings work smoothly across all Android & iOS devices.',
        order: 3,
      },
      {
        question: 'How do I receive the product after purchase?',
        answer: 'Instant access! As soon as your order is completed, you get immediate download links in your account dashboard and email confirmation.',
        order: 4,
      },
    ],
  });
  console.log('✅ Created FAQs');

  // 7. Site Settings & Announcement
  await prisma.siteSetting.createMany({
    data: [
      { key: 'hero_heading', value: 'DOMINATE THE BATTLEFIELD WITH PRO SENSI & TACTICS' },
      { key: 'hero_description', value: 'Join over 30,000+ players using GG Academy presets to achieve 90%+ Headshot accuracy, 0.1s Gloo Wall speed, and tournament victory.' },
      { key: 'student_count', value: '30,000+' },
      { key: 'win_rate', value: '99.4%' },
      { key: 'contact_email', value: 'support@ggacademy.in' },
      { key: 'contact_phone', value: '+91 9876543210' },
    ],
  });

  await prisma.announcement.create({
    data: {
      text: '🔥 20% OFF ON ALL SENSI PACKS & COURSES - LIMITED TIME OFFER!',
      link: '/shop',
      isActive: true,
    },
  });
  console.log('✅ Created Site Settings & Announcement');

  console.log('🎉 Seed Data Population Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error Seeding Data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
