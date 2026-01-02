// Determina la URL base según el entorno (desarrollo o producción)
//'https://api.trapichedigital.com.mx'
const API_BASE_URL = /* process.env.NEXT_PUBLIC_API_BASE_URL  || */ 'http://localhost:8101/api' ;

const API_ENDPOINTS = {
    // ============================================================================
    // PUBLIC ENDPOINTS - No authentication required
    // ============================================================================
  
    // Posts endpoints (public)
    fetchPosts: `${API_BASE_URL}/public/posts/list.php`,
    fetchPostById: (id: string) => `${API_BASE_URL}/public/posts/read.php?id=${id}`,
    
    // ============================================================================
    // ADMIN ENDPOINTS - Authentication required
    // ============================================================================

    // Authentication endpoints
    login: `${API_BASE_URL}/admin/auth/login.php`,
    logout: `${API_BASE_URL}/admin/auth/logout.php`,
    // validateSession: `${API_BASE_URL}/admin/auth.php?action=validate`,

    // Dashboard endpoints (statistics & analytics)
    userProfile: `${API_BASE_URL}/admin/dashboard/profile.php`,
    dashboardStats: `${API_BASE_URL}/admin/dashboard/stats.php`,
    dashboardPosts: `${API_BASE_URL}/admin/dashboard/posts.php`,
    dashboardVisits: `${API_BASE_URL}/admin/dashboard/visits.php`,
    
    // Posts management endpoints (CRUD)
    createPost: `${API_BASE_URL}/admin/posts/create.php`,
    updatePost: `${API_BASE_URL}/admin/posts/update.php`,
    deletePost: `${API_BASE_URL}/admin/posts/delete.php`,
    getPostBySlug: (slug: string) => `${API_BASE_URL}/admin/posts/get.php?slug=${slug}`,
    // ============================================================================
    // BACKWARDS COMPATIBILITY - Legacy endpoint names
    // ============================================================================
    
    // Keep old names for backwards compatibility during transition
    adminPosts: `${API_BASE_URL}/admin/dashboard/posts.php`, // Alias for dashboardPosts
    visitsData: `${API_BASE_URL}/admin/dashboard/visits.php`, // Alias for dashboardVisits
};

export { API_BASE_URL, API_ENDPOINTS };