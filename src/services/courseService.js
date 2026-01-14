import axiosInstance from '../config/axiosConfig';

export const courseService = {

  async getAllCourses() {
    const res = await axiosInstance.get('/courses');
    return res.data.data;
  },

  async getCourseById(courseId) {
    const res = await axiosInstance.get(`/courses/${courseId}`);
    return res.data.data;
  },

  async enrollCourse(courseId) {
    const res = await axiosInstance.post('/enrollments', {
      courseId
    });
    return res.data.data;
  },

  async getEnrolledCourses() {
    const res = await axiosInstance.get('/enrollments');
    return res.data.data;
  },

  async unenrollCourse(enrollmentId) {
    const res = await axiosInstance.delete(`/enrollments/${enrollmentId}`);
    return res.data.data;
  },

  async getCourseProgress(courseId) {
    const res = await axiosInstance.get(`/progress/courses/${courseId}`);
    return res.data.data;
  },

  async getCourseRoadmap(courseId) {
    const res = await axiosInstance.get(`/levels/course/${courseId}`);
    return res.data.data;
  },

};
