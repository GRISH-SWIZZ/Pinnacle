import axiosInstance from '../config/axiosConfig';

export const contentService = {

    async getByLevel(levelId) {
        const res = await axiosInstance.get(`/contents/level/${levelId}`);
        return res.data.data;
    }

};
