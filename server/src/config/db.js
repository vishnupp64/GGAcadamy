let PrismaClient;

try {
  // First attempt standard root import
  const prismaModule = require('../../../node_modules/@prisma/client');
  PrismaClient = prismaModule.PrismaClient;
} catch (err1) {
  try {
    const prismaModule = require('@prisma/client');
    PrismaClient = prismaModule.PrismaClient;
  } catch (err2) {
    console.error('Failed requiring @prisma/client:', err2);
    throw err2;
  }
}

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

module.exports = prisma;
