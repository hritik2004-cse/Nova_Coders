// Utility functions for role-based access control on the frontend

export const ROLES = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    MEMBER: 'member',
    INTERN: 'intern',
    GUEST: 'guest'
};

export const PERMISSIONS = {
    // Admin Permissions
    CAN_ACCESS_ADMIN_PANEL: 'canAccessAdminPanel',
    CAN_MANAGE_USERS: 'canManageUsers',
    CAN_MANAGE_ROLES: 'canManageRoles',
    CAN_VIEW_ANALYTICS: 'canViewAnalytics',
    CAN_MANAGE_SETTINGS: 'canManageSettings',
    
    // Content Permissions
    CAN_CREATE_CONTENT: 'canCreateContent',
    CAN_EDIT_CONTENT: 'canEditContent',
    CAN_DELETE_CONTENT: 'canDeleteContent',
    CAN_PUBLISH_CONTENT: 'canPublishContent',
    CAN_MODERATE_CONTENT: 'canModerateContent',
    
    // Member Management
    CAN_VIEW_MEMBERS: 'canViewMembers',
    CAN_EDIT_MEMBERS: 'canEditMembers',
    CAN_DELETE_MEMBERS: 'canDeleteMembers',
    CAN_INVITE_MEMBERS: 'canInviteMembers',
    
    // Service Management
    CAN_MANAGE_SERVICES: 'canManageServices',
    CAN_VIEW_SERVICES: 'canViewServices',
    
    // Project Management
    CAN_CREATE_PROJECTS: 'canCreateProjects',
    CAN_MANAGE_PROJECTS: 'canManageProjects',
    CAN_VIEW_PROJECTS: 'canViewProjects',
    
    // Event Management
    CAN_CREATE_EVENTS: 'canCreateEvents',
    CAN_MANAGE_EVENTS: 'canManageEvents',
    CAN_VIEW_EVENTS: 'canViewEvents',
    
    // Newsletter Management
    CAN_MANAGE_NEWSLETTER: 'canManageNewsletter',
    CAN_VIEW_SUBSCRIBERS: 'canViewSubscribers',
    
    // Intern Management
    CAN_MANAGE_INTERNS: 'canManageInterns',
    CAN_VIEW_INTERN_PROGRESS: 'canViewInternProgress',
    CAN_ASSIGN_TASKS: 'canAssignTasks'
};

// Role hierarchy (higher roles include permissions of lower roles)
export const ROLE_HIERARCHY = {
    [ROLES.SUPER_ADMIN]: 5,
    [ROLES.ADMIN]: 4,
    [ROLES.MODERATOR]: 3,
    [ROLES.MEMBER]: 2,
    [ROLES.INTERN]: 1,
    [ROLES.GUEST]: 0
};

/**
 * Check if user has a specific role
 * @param {Object} user - User object with role property
 * @param {string} requiredRole - Required role
 * @returns {boolean}
 */
export const hasRole = (user, requiredRole) => {
    if (!user || !user.role) return false;
    return user.role === requiredRole;
};

/**
 * Check if user has any of the specified roles
 * @param {Object} user - User object with role property
 * @param {Array} roles - Array of roles to check
 * @returns {boolean}
 */
export const hasAnyRole = (user, roles) => {
    if (!user || !user.role) return false;
    return roles.includes(user.role);
};

/**
 * Check if user's role is at least as high as the required role
 * @param {Object} user - User object with role property
 * @param {string} requiredRole - Minimum required role
 * @returns {boolean}
 */
export const hasMinimumRole = (user, requiredRole) => {
    if (!user || !user.role) return false;
    
    const userLevel = ROLE_HIERARCHY[user.role] || 0;
    const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0;
    
    return userLevel >= requiredLevel;
};

/**
 * Check if user has a specific permission
 * @param {Object} user - User object with permissions property
 * @param {string} permission - Permission to check
 * @returns {boolean}
 */
export const hasPermission = (user, permission) => {
    if (!user) return false;
    
    // Super admin has all permissions
    if (user.role === ROLES.SUPER_ADMIN) return true;
    
    // Check specific permission
    return user.permissions && user.permissions[permission] === true;
};

/**
 * Check if user has any of the specified permissions
 * @param {Object} user - User object with permissions property
 * @param {Array} permissions - Array of permissions to check
 * @returns {boolean}
 */
export const hasAnyPermission = (user, permissions) => {
    if (!user) return false;
    
    // Super admin has all permissions
    if (user.role === ROLES.SUPER_ADMIN) return true;
    
    // Check if user has any of the permissions
    return permissions.some(permission => hasPermission(user, permission));
};

/**
 * Check if user has all of the specified permissions
 * @param {Object} user - User object with permissions property
 * @param {Array} permissions - Array of permissions to check
 * @returns {boolean}
 */
export const hasAllPermissions = (user, permissions) => {
    if (!user) return false;
    
    // Super admin has all permissions
    if (user.role === ROLES.SUPER_ADMIN) return true;
    
    // Check if user has all permissions
    return permissions.every(permission => hasPermission(user, permission));
};

/**
 * Check if user can access admin panel
 * @param {Object} user - User object
 * @returns {boolean}
 */
export const canAccessAdmin = (user) => {
    return hasPermission(user, PERMISSIONS.CAN_ACCESS_ADMIN_PANEL);
};

/**
 * Check if user can manage other users
 * @param {Object} user - User object
 * @returns {boolean}
 */
export const canManageUsers = (user) => {
    return hasPermission(user, PERMISSIONS.CAN_MANAGE_USERS);
};

/**
 * Check if user can manage content
 * @param {Object} user - User object
 * @returns {boolean}
 */
export const canManageContent = (user) => {
    return hasAnyPermission(user, [
        PERMISSIONS.CAN_CREATE_CONTENT,
        PERMISSIONS.CAN_EDIT_CONTENT,
        PERMISSIONS.CAN_DELETE_CONTENT,
        PERMISSIONS.CAN_PUBLISH_CONTENT,
        PERMISSIONS.CAN_MODERATE_CONTENT
    ]);
};

/**
 * Check if user owns a resource or has permission
 * @param {Object} user - User object
 * @param {string} resourceUserId - User ID of resource owner
 * @param {string} permission - Permission to check as fallback
 * @returns {boolean}
 */
export const canAccessResource = (user, resourceUserId, permission) => {
    if (!user) return false;
    
    // Super admin can access everything
    if (user.role === ROLES.SUPER_ADMIN) return true;
    
    // User owns the resource
    if (user._id === resourceUserId) return true;
    
    // User has the required permission
    if (permission && hasPermission(user, permission)) return true;
    
    return false;
};

/**
 * Get user's role display name
 * @param {string} role - Role key
 * @returns {string}
 */
export const getRoleDisplayName = (role) => {
    const roleNames = {
        [ROLES.SUPER_ADMIN]: 'Super Admin',
        [ROLES.ADMIN]: 'Administrator',
        [ROLES.MODERATOR]: 'Moderator',
        [ROLES.MEMBER]: 'Member',
        [ROLES.INTERN]: 'Intern',
        [ROLES.GUEST]: 'Guest'
    };
    
    return roleNames[role] || 'Unknown';
};

/**
 * Get user's available actions based on their permissions
 * @param {Object} user - User object
 * @returns {Object} - Object with available actions
 */
export const getUserActions = (user) => {
    if (!user) return {};
    
    return {
        canAccessAdminPanel: canAccessAdmin(user),
        canManageUsers: canManageUsers(user),
        canManageContent: canManageContent(user),
        canViewAnalytics: hasPermission(user, PERMISSIONS.CAN_VIEW_ANALYTICS),
        canManageServices: hasPermission(user, PERMISSIONS.CAN_MANAGE_SERVICES),
        canManageProjects: hasPermission(user, PERMISSIONS.CAN_MANAGE_PROJECTS),
        canManageEvents: hasPermission(user, PERMISSIONS.CAN_MANAGE_EVENTS),
        canManageInterns: hasPermission(user, PERMISSIONS.CAN_MANAGE_INTERNS),
        canManageNewsletter: hasPermission(user, PERMISSIONS.CAN_MANAGE_NEWSLETTER),
        
        // View permissions
        canViewMembers: hasPermission(user, PERMISSIONS.CAN_VIEW_MEMBERS),
        canViewServices: hasPermission(user, PERMISSIONS.CAN_VIEW_SERVICES),
        canViewProjects: hasPermission(user, PERMISSIONS.CAN_VIEW_PROJECTS),
        canViewEvents: hasPermission(user, PERMISSIONS.CAN_VIEW_EVENTS),
        canViewInternProgress: hasPermission(user, PERMISSIONS.CAN_VIEW_INTERN_PROGRESS),
        canViewSubscribers: hasPermission(user, PERMISSIONS.CAN_VIEW_SUBSCRIBERS)
    };
};

// Default export for better ESLint compatibility
const rbacUtils = {
    ROLES,
    PERMISSIONS,
    ROLE_HIERARCHY,
    hasRole,
    hasAnyRole,
    hasMinimumRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccessAdmin,
    canManageUsers,
    canManageContent,
    canAccessResource,
    getRoleDisplayName,
    getUserActions
};

export default rbacUtils;
