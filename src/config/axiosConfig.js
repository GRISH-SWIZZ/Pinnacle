import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    // Attach JWT if present
    if (token && token !== 'null' && token !== 'undefined') {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    // Attach UserId (REQUIRED by backend)
    if (userId && userId !== 'null' && userId !== 'undefined') {
      config.headers['X-User-Id'] = userId;
    } else {
      console.warn("⚠️ X-User-Id missing in request");
      delete config.headers['X-User-Id'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API ERROR:", error.response.data);

      return Promise.reject({
        status: error.response.status,
        message: error.response.data?.message || 'API Error',
        data: error.response.data,
      });
    }

    if (error.request) {
      console.error("NETWORK ERROR: Backend unreachable");
      return Promise.reject({
        status: 0,
        message: 'Backend not reachable',
      });
    }

    return Promise.reject({
      status: 0,
      message: error.message || 'Unknown error',
    });
  }
);

export default axiosInstance;
