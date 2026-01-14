import axiosInstance from "../config/axiosConfig";

export const progressService = {

  async getRoadmapProgress(courseId) {
    const res = await axiosInstance.get(`/progress/roadmap/${courseId}`);
    return res.data.data || res.data || { completedLevels: [], percentage: 0 };
  },

  async completeLevel(courseId, levelId) {
    const res = await axiosInstance.post(`/progress/complete`, {
      courseId,
      levelId
    });
    return res.data;
  }

};
