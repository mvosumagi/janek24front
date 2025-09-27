// @/services/ServiceProviderService.js
import apiClient from './ApiClient'; // Adjust import path as needed

export default {
    /**
     * Create a new service
     * @param {FormData} formData - Service data including image file
     * @returns {Promise}
     */
    createService(formData) {
        return apiClient.post('/api/services', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    /**
     * Get all services for current user
     * @returns {Promise}
     */
    getMyServices() {
        return apiClient.get('/api/user/services');
    },

    /**
     * Update an existing service
     * @param {number} serviceId
     * @param {FormData} formData
     * @returns {Promise}
     */
    updateService(serviceId, formData) {
        return apiClient.put(`/api/services/${serviceId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    /**
     * Delete a service
     * @param {number} serviceId
     * @returns {Promise}
     */
    deleteService(serviceId) {
        return apiClient.delete(`/api/services/${serviceId}`);
    },

    /**
     * Get available service categories
     * @returns {Promise}
     */
    getServiceCategories() {
        return apiClient.get('/api/service-categories');
    },

    /**
     * Get available services for dropdown
     * @returns {Promise}
     */
    getAvailableServices() {
        return apiClient.get('/api/available-services');
    },

    /**
     * Upload service image
     * @param {File} file
     * @returns {Promise}
     */
    uploadServiceImage(file) {
        const formData = new FormData();
        formData.append('image', file);

        return apiClient.post('/api/services/upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
};