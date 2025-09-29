// // @/services/ApiClient.js
// import axios from 'axios';
// // Create API client instance
// const apiClient = axios.create({
//     baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:8080',
//     timeout: 10000,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });
// // Request interceptor to add auth token
// apiClient.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );
// // Response interceptor for error handling
// apiClient.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             // Redirect to login on unauthorized
//             localStorage.removeItem('authToken');
//             sessionStorage.removeItem('authToken');
//             // You can use Vue Router here if available
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );
// export default apiClient;