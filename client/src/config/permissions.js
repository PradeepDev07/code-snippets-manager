export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const PERMISSIONS = {
  CREATE_SNIPPET: 'create:snippet',
  READ_SNIPPET: 'read:snippet',
  UPDATE_SNIPPET: 'update:snippet',
  DELETE_SNIPPET: 'delete:snippet',
  READ_USER: 'read:user',
  
  // User specific (ownership based)
  CREATE_OWN_SNIPPET: 'create:ownsnippet',
  UPDATE_OWN_SNIPPET: 'update:ownsnippet',
  DELETE_OWN_SNIPPET: 'delete:ownsnippet',
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.CREATE_SNIPPET,
    PERMISSIONS.READ_SNIPPET,
    PERMISSIONS.UPDATE_SNIPPET,
    PERMISSIONS.DELETE_SNIPPET,
    PERMISSIONS.READ_USER,
  ],
  [ROLES.USER]: [
    PERMISSIONS.READ_SNIPPET,
    PERMISSIONS.CREATE_OWN_SNIPPET,
    PERMISSIONS.UPDATE_OWN_SNIPPET,
    PERMISSIONS.DELETE_OWN_SNIPPET,
  ],
};


export const hasPermission = (user, permission, resourceOwnerId = null) => {
  if (!user || !user.role) return false;

  const userPermissions = ROLE_PERMISSIONS[user.role] || [];

  // 1. Check for direct permission match
  if (userPermissions.includes(permission)) {
    return true;
  }

  // 2. Check for ownership-based permissions
  // If the user is trying to update/delete, and they have the "own" permission,
  // check if they are the owner.
  if (resourceOwnerId && user._id === resourceOwnerId) {
    if (permission === PERMISSIONS.UPDATE_SNIPPET && userPermissions.includes(PERMISSIONS.UPDATE_OWN_SNIPPET)) {
      return true;
    }
    if (permission === PERMISSIONS.DELETE_SNIPPET && userPermissions.includes(PERMISSIONS.DELETE_OWN_SNIPPET)) {
      return true;
    }
  }

  return false;
};
