import api from './api';

export const courseService = {
  getCourses: async () => {
    return await api.get('/courses');
  },

  getCourseBySlug: async (slug) => {
    return await api.get(`/courses/${slug}`);
  },

  getMyEnrollments: async () => {
    return await api.get('/enrollments');
  },

  toggleLessonCompletion: async (lessonId) => {
    return await api.post(`/courses/lessons/${lessonId}/complete`);
  },

  createCourse: async (courseData) => {
    return await api.post('/courses', courseData);
  },

  updateCourse: async (id, courseData) => {
    return await api.put(`/courses/${id}`, courseData);
  },

  deleteCourse: async (id) => {
    return await api.delete(`/courses/${id}`);
  },

  addModule: async (courseId, moduleData) => {
    return await api.post(`/courses/${courseId}/modules`, moduleData);
  },

  addLesson: async (moduleId, lessonData) => {
    return await api.post(`/courses/modules/${moduleId}/lessons`, lessonData);
  },
};
