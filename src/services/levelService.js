import axiosInstance from "../config/axiosConfig";

export const levelService = {

  async getLevelsByCourse(courseId) {
    const res = await axiosInstance.get(`/levels/course/${courseId}`);
    return res.data.data || res.data || [];
  },

  async getLevel(courseId, code) {
    const levels = await this.getLevelsByCourse(courseId);
    return levels.find(l => l.code === code);
  }

};
