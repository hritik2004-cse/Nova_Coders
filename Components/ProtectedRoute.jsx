"use client"

import React from 'react';

// Basic ProtectedRoute component
export function ProtectedRoute({ children, requiredRole, fallbackUrl }) {
  // For build purposes, just render children
  // In actual use, this would check authentication and roles
  return <>{children}</>;
}

// PermissionGate component
export function PermissionGate({ action, children, fallback = null }) {
  // For build purposes, just render children
  // In actual use, this would check permissions
  return <>{children}</>;
}

// Default export
export default ProtectedRoute;