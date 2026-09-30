const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

const getSettingsAndAnnouncement = async (req, res, next) => {
  try {
    const [settings, announcement] = await Promise.all([
      prisma.siteSetting.findMany(),
      prisma.announcement.findFirst({
        where: { isActive: true },
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    const settingsObj = {};
    settings.forEach((s) => {
      settingsObj[s.key] = s.value;
    });

    return sendSuccess(res, {
      settings: settingsObj,
      announcement: announcement ? announcement.text : '20% OFF ON ALL SENSI',
      announcementLink: announcement ? announcement.link : '/shop',
    });
  } catch (error) {
    next(error);
  }
};

const updateSiteSettings = async (req, res, next) => {
  try {
    const { settings, announcementText } = req.body;

    if (settings && typeof settings === 'object') {
      for (const [key, value] of Object.entries(settings)) {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        });
      }
    }

    if (announcementText) {
      const activeAnnouncement = await prisma.announcement.findFirst({
        where: { isActive: true },
      });

      if (activeAnnouncement) {
        await prisma.announcement.update({
          where: { id: activeAnnouncement.id },
          data: { text: announcementText },
        });
      } else {
        await prisma.announcement.create({
          data: { text: announcementText, isActive: true },
        });
      }
    }

    return sendSuccess(res, {}, 'Site settings updated successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettingsAndAnnouncement,
  updateSiteSettings,
};
