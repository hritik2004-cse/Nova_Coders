"use client"

import UserManagement from "@/Components/UserManagement"
import { PermissionGate } from "@/Components/ProtectedRoute"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Alert, AlertDescription } from "@/Components/ui/alert"
import { ShieldIcon } from "lucide-react"

export default function AdminUsersPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2">
        <ShieldIcon className="h-6 w-6" />
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
      </div>
      
      <PermissionGate 
        permission="canManageUsers"
        fallback={
          <Alert>
            <ShieldIcon className="h-4 w-4" />
            <AlertDescription>
              You don&apos;t have permission to manage users. Contact your administrator for access.
            </AlertDescription>
          </Alert>
        }
      >
        <Card>
          <CardHeader>
            <CardTitle>Manage Users & Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <UserManagement />
          </CardContent>
        </Card>
      </PermissionGate>
    </div>
  )
}
