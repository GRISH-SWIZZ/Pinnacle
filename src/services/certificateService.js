import axiosInstance from '../config/axiosConfig';

export const certificateService = {
  async getCertificates() {
    const response = await axiosInstance.get('/certificates');
    return response.data;
  },

  async getCertificateById(certificateId) {
    const response = await axiosInstance.get(`/certificates/${certificateId}`);
    return response.data;
  },

  async downloadCertificate(certificateId) {
    const response = await axiosInstance.get(`/certificates/${certificateId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  async verifyCertificate(certificateId) {
    const response = await axiosInstance.get(`/certificates/${certificateId}/verify`);
    return response.data;
  },
};