// Determina la URL base según el entorno (desarrollo o producción)
//'https://api.trapichedigital.com.mx'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8101';

const API_ENDPOINTS = {
    fetchPosts: `${API_BASE_URL}/api_post_index.php`,
    fetchPostById: (id: string) => `${API_BASE_URL}/api_post_read.php?id=${id}`,
    createPost: `${API_BASE_URL}/api_post_create.php`,
    updatePost: `${API_BASE_URL}/api_post_update.php`,
    deletePost: (id: string) => `${API_BASE_URL}/api_post_delete.php?id=${id}`,
    login: `${API_BASE_URL}/login.php`,
};

export { API_BASE_URL, API_ENDPOINTS };