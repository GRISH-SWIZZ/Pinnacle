import axiosInstance from '../config/axiosConfig';

export const examService = {
  async getExam(examId) {
    const response = await axiosInstance.get(`/exams/${examId}`);
    return response.data;
  },

  async getCourseExam(courseId) {
    const response = await axiosInstance.get(`/courses/${courseId}/exam`);
    return response.data;
  },

  async submitExam(examId, answers) {
    const response = await axiosInstance.post(`/exams/${examId}/submit`, {
      answers,
      submittedAt: new Date().toISOString(),
    });
    return response.data;
  },

  async getExamResult(examId) {
    const response = await axiosInstance.get(`/exams/${examId}/result`);
    return response.data;
  },

  async getAllExamResults() {
    const response = await axiosInstance.get('/exams/results');
    return response.data;
  },
};