const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  ======================================================
  🚀 GG ACADEMY SERVER RUNNING ON PORT: ${PORT}
  📡 API Base URL: http://localhost:${PORT}/api
  ======================================================
  `);
});
